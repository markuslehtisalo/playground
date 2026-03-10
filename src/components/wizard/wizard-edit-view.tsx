"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { Accordion, AnimatedNumber, Badge, Button } from "@/components/aiven";
import type { WizardState, WizardStep, WizardDispatch } from "@/lib/wizard-types";
import { STEP_ORDER, STEP_LABELS } from "@/lib/wizard-types";
import { calculateCost } from "@/lib/wizard-reducer";
import { getSummaryText } from "./wizard-sidebar";
import type { StepProps } from "./wizard-content";
import { StepService } from "./steps/step-service";
import { StepCloud } from "./steps/step-cloud";
import { StepPlan } from "./steps/step-plan";
import { StepConfigure } from "./steps/step-configure";

const STEP_COMPONENTS: Record<
  Exclude<WizardStep, "review">,
  React.ComponentType<StepProps>
> = {
  service: StepService,
  cloud: StepCloud,
  plan: StepPlan,
  configure: StepConfigure,
};

const EDITABLE_STEPS = STEP_ORDER.filter(
  (s): s is Exclude<WizardStep, "review"> => s !== "review",
);

interface WizardEditViewProps {
  state: WizardState;
  dispatch: WizardDispatch;
}

export function WizardEditView({ state, dispatch }: WizardEditViewProps) {
  const cost = calculateCost(state);

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: "RESET" })}
          >
            <IconArrowLeft size={14} />
            Back to wizard
          </Button>
          <h2 className="mt-2 text-xl font-semibold text-text-heading">
            Service Configuration
          </h2>
        </div>

        <div className="text-right">
          <div className="text-xs text-text-muted">Estimated monthly cost</div>
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-2xl font-semibold text-text-heading">
              ${cost === 0 ? "0" : <AnimatedNumber value={cost} />}
            </span>
            <span className="text-sm text-text-muted">/mo</span>
          </div>
        </div>
      </div>

      <Accordion.Root defaultValue={["service"]}>
        {EDITABLE_STEPS.map((step) => {
          const StepComponent = STEP_COMPONENTS[step];
          const summary = getSummaryText(step, state);
          return (
            <Accordion.Item key={step} value={step}>
              <Accordion.Header>
                <Accordion.Trigger>
                  <span className="flex items-center gap-2">
                    {STEP_LABELS[step]}
                    {summary && (
                      <Badge variant="default" className="font-normal">
                        {summary}
                      </Badge>
                    )}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel>
                <div className="pb-4 pointer-events-none opacity-80">
                  <StepComponent state={state} dispatch={dispatch} />
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
