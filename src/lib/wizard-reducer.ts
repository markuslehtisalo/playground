import {
  CLOUD_PROVIDERS,
  EXTRA_DISK_PRICE_PER_GIB,
  REGIONS,
} from "./wizard-data";
import type { WizardAction, WizardState, WizardStep } from "./wizard-types";
import { STEP_ORDER } from "./wizard-types";

export const INITIAL_STATE: WizardState = {
  currentStep: "service",
  completedSteps: [],
  direction: 1,
  service: null,
  cloudProvider: null,
  region: null,
  plan: null,
  config: {
    serviceName: "",
    extraDiskGiB: 0,
    notifications: true,
  },
  isLaunching: false,
  isLaunched: false,
  dependencyWarning: null,
};

function getStepIndex(step: WizardStep): number {
  return STEP_ORDER.indexOf(step);
}

function markCompleted(
  completedSteps: WizardStep[],
  step: WizardStep,
): WizardStep[] {
  if (completedSteps.includes(step)) return completedSteps;
  return [...completedSteps, step];
}

function pruneCompletedSteps(
  completedSteps: WizardStep[],
  ...stepsToPrune: WizardStep[]
): WizardStep[] {
  return completedSteps.filter((s) => !stepsToPrune.includes(s));
}

export function wizardReducer(
  state: WizardState,
  action: WizardAction,
): WizardState {
  switch (action.type) {
    case "SET_SERVICE": {
      const newService = action.payload;
      const planIncompatible =
        state.plan &&
        !newService.availablePlans.includes(state.plan.id);

      let completed = markCompleted(state.completedSteps, "service");
      if (planIncompatible) {
        completed = pruneCompletedSteps(completed, "plan", "review");
      }

      return {
        ...state,
        service: newService,
        plan: planIncompatible ? null : state.plan,
        completedSteps: completed,
        dependencyWarning: planIncompatible
          ? `${newService.name} doesn't support the ${state.plan!.name} plan. Please select a new plan.`
          : null,
      };
    }

    case "SET_CLOUD_PROVIDER": {
      if (state.cloudProvider === action.payload) return state;

      const regionInvalid =
        state.region && state.region.provider !== action.payload;
      const providerRegions = REGIONS.filter(
        (r) => r.provider === action.payload,
      );

      const completed = regionInvalid
        ? pruneCompletedSteps(state.completedSteps, "cloud", "review")
        : state.completedSteps;

      return {
        ...state,
        cloudProvider: action.payload,
        region: regionInvalid ? null : state.region,
        completedSteps: completed,
        dependencyWarning: regionInvalid
          ? `Switched to ${CLOUD_PROVIDERS.find((p) => p.id === action.payload)?.shortName}. Select a region from ${providerRegions.length} available locations.`
          : null,
      };
    }

    case "SET_REGION": {
      return {
        ...state,
        region: action.payload,
        completedSteps: state.cloudProvider
          ? markCompleted(state.completedSteps, "cloud")
          : state.completedSteps,
        dependencyWarning: null,
      };
    }

    case "SET_PLAN": {
      return {
        ...state,
        plan: action.payload,
        completedSteps: markCompleted(state.completedSteps, "plan"),
        dependencyWarning: null,
      };
    }

    case "SET_CONFIG": {
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    }

    case "GO_TO_STEP": {
      const target = action.payload;
      const currentIdx = getStepIndex(state.currentStep);
      const targetIdx = getStepIndex(target);

      return {
        ...state,
        currentStep: target,
        direction: targetIdx > currentIdx ? 1 : -1,
        dependencyWarning: null,
      };
    }

    case "NEXT_STEP": {
      const idx = getStepIndex(state.currentStep);
      if (idx >= STEP_ORDER.length - 1) return state;

      return {
        ...state,
        currentStep: STEP_ORDER[idx + 1],
        completedSteps: markCompleted(state.completedSteps, state.currentStep),
        direction: 1,
        dependencyWarning: null,
      };
    }

    case "PREV_STEP": {
      const idx = getStepIndex(state.currentStep);
      if (idx <= 0) return state;

      return {
        ...state,
        currentStep: STEP_ORDER[idx - 1],
        direction: -1,
        dependencyWarning: null,
      };
    }

    case "LAUNCH": {
      return {
        ...state,
        isLaunching: true,
        completedSteps: markCompleted(state.completedSteps, "review"),
      };
    }

    case "LAUNCH_COMPLETE": {
      return {
        ...state,
        isLaunching: false,
        isLaunched: true,
      };
    }

    case "DISMISS_WARNING": {
      return {
        ...state,
        dependencyWarning: null,
      };
    }

    case "RESET": {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
}

export function calculateCost(state: WizardState): number {
  if (!state.plan) return 0;

  const provider = state.cloudProvider
    ? CLOUD_PROVIDERS.find((p) => p.id === state.cloudProvider)
    : null;
  const multiplier = provider?.multiplier ?? 1;
  const baseCost = state.plan.basePrice * multiplier;
  const diskCost = state.config.extraDiskGiB * EXTRA_DISK_PRICE_PER_GIB;

  return Math.round((baseCost + diskCost) * 100) / 100;
}

export function validateStep(
  step: WizardStep,
  state: WizardState,
): { valid: boolean; errors: string[] } {
  switch (step) {
    case "service":
      return {
        valid: !!state.service,
        errors: state.service ? [] : ["Select a service to continue."],
      };

    case "cloud": {
      const errors: string[] = [];
      if (!state.cloudProvider) errors.push("Select a cloud provider.");
      if (!state.region) errors.push("Select a region.");
      return { valid: errors.length === 0, errors };
    }

    case "plan":
      return {
        valid: !!state.plan,
        errors: state.plan ? [] : ["Select a plan to continue."],
      };

    case "configure": {
      const name = state.config.serviceName;
      const nameValid = /^[a-z][a-z0-9-]{2,62}$/.test(name);
      return {
        valid: nameValid,
        errors: nameValid
          ? []
          : [
              "Service name must be 3–63 characters, start with a letter, and contain only lowercase letters, numbers, and hyphens.",
            ],
      };
    }

    case "review": {
      const errors: string[] = [];
      for (const s of STEP_ORDER) {
        if (s === "review") break;
        const result = validateStep(s, state);
        errors.push(...result.errors);
      }
      return { valid: errors.length === 0, errors };
    }
  }
}

export function generateServiceName(serviceId: string): string {
  const suffix = Math.random().toString(36).substring(2, 8);
  return `${serviceId}-${suffix}`;
}
