export type WizardStep =
  | "service"
  | "cloud"
  | "plan"
  | "configure"
  | "review";

export type CloudProvider = "aws" | "gcp" | "azure";

export type ServiceCategory =
  | "all"
  | "databases"
  | "streaming"
  | "search"
  | "monitoring";

export interface ServiceOption {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  availablePlans: string[];
}

export interface CloudProviderOption {
  id: CloudProvider;
  name: string;
  shortName: string;
  multiplier: number;
}

export interface Region {
  id: string;
  name: string;
  code: string;
  provider: CloudProvider;
  continent: string;
  flag: string;
}

export interface Plan {
  id: string;
  name: string;
  cpu: number;
  memory: string;
  storage: string;
  backups: boolean;
  ha: boolean;
  basePrice: number;
  features: string[];
  recommended?: boolean;
}

export interface WizardConfig {
  serviceName: string;
  extraDiskGiB: number;
  notifications: boolean;
}

export interface WizardState {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  direction: 1 | -1;
  service: ServiceOption | null;
  cloudProvider: CloudProvider | null;
  region: Region | null;
  plan: Plan | null;
  config: WizardConfig;
  isLaunching: boolean;
  isLaunched: boolean;
  dependencyWarning: string | null;
}

export type WizardAction =
  | { type: "SET_SERVICE"; payload: ServiceOption }
  | { type: "SET_CLOUD_PROVIDER"; payload: CloudProvider }
  | { type: "SET_REGION"; payload: Region }
  | { type: "SET_PLAN"; payload: Plan }
  | { type: "SET_CONFIG"; payload: Partial<WizardConfig> }
  | { type: "GO_TO_STEP"; payload: WizardStep }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "LAUNCH" }
  | { type: "LAUNCH_COMPLETE" }
  | { type: "DISMISS_WARNING" }
  | { type: "RESET" };

export const STEP_ORDER: WizardStep[] = [
  "service",
  "cloud",
  "plan",
  "configure",
  "review",
];

export type WizardDispatch = React.ActionDispatch<[action: WizardAction]>;

export const STEP_LABELS: Record<WizardStep, string> = {
  service: "Service",
  cloud: "Cloud & Region",
  plan: "Plan",
  configure: "Configure",
  review: "Review",
};

export const STEP_DESCRIPTIONS: Record<WizardStep, string> = {
  service: "Choose the managed service for your project",
  cloud: "Pick your infrastructure provider and data center",
  plan: "Select the resources that match your workload",
  configure: "Name your service and adjust settings",
  review: "Confirm your choices before launching",
};
