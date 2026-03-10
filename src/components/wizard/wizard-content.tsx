"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Button, Dialog, Tooltip } from "@/components/aiven";
import {
  IconArrowLeft,
  IconArrowRight,
  IconRocket,
  IconAlertCircle,
} from "@tabler/icons-react";
import { validateStep, calculateCost } from "@/lib/wizard-reducer";
import type { WizardState, WizardStep, WizardDispatch } from "@/lib/wizard-types";
import { STEP_ORDER, STEP_LABELS, STEP_DESCRIPTIONS } from "@/lib/wizard-types";
import { CLOUD_PROVIDERS } from "@/lib/wizard-data";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect, useCallback } from "react";

import { StepService } from "./steps/step-service";
import { StepCloud } from "./steps/step-cloud";
import { StepPlan } from "./steps/step-plan";
import { StepConfigure } from "./steps/step-configure";
import { StepReview } from "./steps/step-review";

export interface StepProps {
  state: WizardState;
  dispatch: WizardDispatch;
}

type WizardContentProps = StepProps;

const STEP_COMPONENTS: Record<WizardStep, React.ComponentType<StepProps>> = {
  service: StepService,
  cloud: StepCloud,
  plan: StepPlan,
  configure: StepConfigure,
  review: StepReview,
};

function StepDots({
  currentIdx,
  completedSteps,
  onGoToStep,
}: {
  currentIdx: number;
  completedSteps: WizardStep[];
  onGoToStep: (step: WizardStep) => void;
}) {
  return (
    <nav aria-label="Wizard steps" className="hidden sm:flex items-center gap-1.5">
      {STEP_ORDER.map((step, idx) => {
        const isActive = idx === currentIdx;
        const isCompleted = completedSteps.includes(step);
        const isAccessible = isCompleted || idx <= currentIdx;

        return (
          <button
            key={step}
            type="button"
            disabled={!isAccessible}
            onClick={() => isAccessible && onGoToStep(step)}
            aria-label={`${STEP_LABELS[step]}${isCompleted ? " (completed)" : isActive ? " (current)" : ""}`}
            className={cn(
              "rounded-full transition-all outline-none focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
              isActive
                ? "size-2.5 bg-aiven-primary-80 dark:bg-aiven-primary-60 cursor-pointer"
                : isCompleted
                  ? "size-2 bg-aiven-primary-80/50 dark:bg-aiven-primary-60/50 cursor-pointer hover:bg-aiven-primary-80 dark:hover:bg-aiven-primary-60"
                  : "size-2 bg-aiven-grey-20 dark:bg-aiven-grey-60",
              !isAccessible && "cursor-default",
            )}
          />
        );
      })}
    </nav>
  );
}

export function WizardContent({ state, dispatch }: WizardContentProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [showLaunchDialog, setShowLaunchDialog] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const currentIdx = STEP_ORDER.indexOf(state.currentStep);
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === STEP_ORDER.length - 1;

  const StepComponent = STEP_COMPONENTS[state.currentStep];

  useEffect(() => {
    headingRef.current?.focus();
  }, [state.currentStep]);

  const handleNext = useCallback(() => {
    const validation = validateStep(state.currentStep, state);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors([]);
    if (isLast) {
      setShowLaunchDialog(true);
      return;
    }
    dispatch({ type: "NEXT_STEP" });
  }, [isLast, state, dispatch]);

  const handlePrev = useCallback(() => {
    setErrors([]);
    dispatch({ type: "PREV_STEP" });
  }, [dispatch]);

  // Keyboard shortcuts — only fire when focus is on non-interactive elements
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const el = e.target as HTMLElement;

      if (
        el.closest(
          'input, textarea, select, button, a, [role="slider"], [role="switch"], [role="listbox"], [role="combobox"], [role="radio"], [role="tab"], [contenteditable="true"]',
        )
      ) {
        return;
      }

      // Let the dialog handle its own Escape
      if (e.key === "Escape" && showLaunchDialog) return;

      if (e.key === "Enter" && !state.isLaunching && !state.isLaunched) {
        e.preventDefault();
        handleNext();
      }
      if (e.key === "Escape" && !isFirst && !state.isLaunching && !state.isLaunched) {
        e.preventDefault();
        handlePrev();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev, isFirst, showLaunchDialog, state.isLaunching, state.isLaunched]);

  function handleLaunchConfirm() {
    const validation = validateStep("review", state);
    if (!validation.valid) {
      setShowLaunchDialog(false);
      setErrors(validation.errors);
      return;
    }
    setShowLaunchDialog(false);
    dispatch({ type: "LAUNCH" });
  }

  const cost = calculateCost(state);
  const provider = CLOUD_PROVIDERS.find((p) => p.id === state.cloudProvider);

  return (
    <main className="flex h-full flex-col overflow-y-auto bg-background">
      <div className={cn(
        "flex-1 p-6 pb-24 sm:pb-6 lg:p-8",
        (state.isLaunching || state.isLaunched) && "flex items-start justify-center sm:items-center sm:pt-0",
        state.isLaunching && !state.isLaunched && "pt-[25vh]",
        state.isLaunched && "pt-[20vh]",
      )}>
        {!state.isLaunching && !state.isLaunched && (
          <div className="mb-6">
            <h2
              ref={headingRef}
              className="text-xl lg:text-2xl font-semibold text-text-heading outline-none"
              tabIndex={-1}
            >
              {STEP_LABELS[state.currentStep]}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {STEP_DESCRIPTIONS[state.currentStep]}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={state.currentStep}
            initial={prefersReducedMotion ? false : { opacity: 0, x: state.direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: state.direction * -40 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepComponent state={state} dispatch={dispatch} />
          </motion.div>
        </AnimatePresence>
      </div>

      {!state.isLaunched && !state.isLaunching && (
        <div className="fixed bottom-0 left-0 right-0 z-10 sm:sticky sm:bottom-0 border-t border-aiven-grey-10 bg-white dark:border-aiven-grey-80 dark:bg-aiven-grey-100">
          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="border-y border-aiven-error-30 bg-aiven-error-0 px-6 py-3 dark:border-aiven-error-60 dark:bg-aiven-error-100">
                  {errors.map((error) => (
                    <div
                      key={error}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <IconAlertCircle size={14} className="shrink-0" />
                      {error}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {!isFirst && (
                <Tooltip content="Esc">
                  <Button variant="ghost" className="-ml-4" onClick={handlePrev}>
                    <IconArrowLeft size={16} />
                    Back
                  </Button>
                </Tooltip>
              )}
            </div>

            <StepDots
              currentIdx={currentIdx}
              completedSteps={state.completedSteps}
              onGoToStep={(step) => dispatch({ type: "GO_TO_STEP", payload: step })}
            />

            <div>
              {isLast ? (
                <Tooltip content="Enter">
                  <Button onClick={handleNext}>
                    <IconRocket size={16} />
                    Launch Service
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip content="Enter">
                  <Button onClick={handleNext}>
                    Continue
                    <IconArrowRight size={16} />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      )}

      <Dialog open={showLaunchDialog} onOpenChange={setShowLaunchDialog}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>Launch Service?</Dialog.Title>
            <Dialog.Description>
              You&apos;re about to create{" "}
              <span className="font-semibold text-text-heading">
                {state.config.serviceName}
              </span>
              {provider && state.region && (
                <>
                  {" "}on {provider.shortName} / {state.region.name}
                </>
              )}
              . Estimated cost:{" "}
              <span className="font-semibold text-text-heading">
                ${cost.toFixed(2)}/mo
              </span>
              .
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowLaunchDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleLaunchConfirm}>
                <IconRocket size={16} />
                Confirm &amp; Launch
              </Button>
            </div>
            <Dialog.Close />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog>
    </main>
  );
}
