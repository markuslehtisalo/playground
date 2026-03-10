"use client";

import { useState } from "react";
import {
  IconCheck,
  IconPencil,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { AnimatedNumber, Dialog, Badge } from "@/components/aiven";
import { cn } from "@/lib/utils";
import { calculateCost } from "@/lib/wizard-reducer";
import type { WizardState, WizardStep } from "@/lib/wizard-types";
import { STEP_ORDER, STEP_LABELS } from "@/lib/wizard-types";
import { getSummaryText } from "./wizard-sidebar";
import { AnimatePresence, motion } from "motion/react";

interface WizardMobileBarProps {
  state: WizardState;
  onGoToStep: (step: WizardStep) => void;
}

export function WizardMobileBar({ state, onGoToStep }: WizardMobileBarProps) {
  const [open, setOpen] = useState(false);
  const currentIdx = STEP_ORDER.indexOf(state.currentStep);
  const cost = calculateCost(state);

  function handleStepClick(step: WizardStep) {
    onGoToStep(step);
    setOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-aiven-grey-10 bg-white px-4 py-2.5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex cursor-pointer items-center gap-2.5 text-sm text-text-heading outline-none focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 rounded-sm"
        >
          <span className="font-medium">
            Step {currentIdx + 1}/{STEP_ORDER.length}
          </span>
          <div className="flex items-center gap-1">
            {STEP_ORDER.map((step, idx) => {
              const isActive = idx === currentIdx;
              const isCompleted = state.completedSteps.includes(step);
              return (
                <span
                  key={step}
                  className={cn(
                    "rounded-full transition-all",
                    isActive
                      ? "size-2 bg-aiven-primary-80 dark:bg-aiven-primary-60"
                      : isCompleted
                        ? "size-1.5 bg-aiven-primary-80/50 dark:bg-aiven-primary-60/50"
                        : "size-1.5 bg-aiven-grey-20 dark:bg-aiven-grey-60",
                  )}
                />
              );
            })}
          </div>
        </button>

        {state.plan ? (
          <span className="text-sm font-semibold text-text-heading tabular-nums">
            ${cost === 0 ? "0" : <AnimatedNumber value={cost} />}/mo
          </span>
        ) : (
          <span className="text-xs text-text-muted">—</span>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup className="!top-auto !bottom-0 !translate-y-0 !translate-x-[-50%] !max-w-full !w-full !rounded-b-none !rounded-t-xl">
            <Dialog.Title className="mb-4">Navigation</Dialog.Title>
            <Dialog.Close />

            <ul className="space-y-1">
              {STEP_ORDER.map((step, idx) => {
                const isActive = step === state.currentStep;
                const isCompleted = state.completedSteps.includes(step);
                const isAccessible = isCompleted || idx <= currentIdx;
                const summaryText = getSummaryText(step, state);

                return (
                  <li key={step}>
                    <button
                      type="button"
                      disabled={!isAccessible}
                      onClick={() => isAccessible && handleStepClick(step)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors outline-none",
                        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
                        isActive
                          ? "bg-aiven-primary-5 text-aiven-primary-80 dark:bg-aiven-primary-100 dark:text-aiven-primary-30"
                          : isCompleted
                            ? "text-text-heading active:bg-aiven-grey-0 dark:active:bg-aiven-grey-90"
                            : "text-text-muted",
                        !isAccessible && "opacity-50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          isCompleted
                            ? "bg-aiven-primary-80 text-white dark:bg-aiven-primary-60"
                            : isActive
                              ? "border-2 border-aiven-primary-80 text-aiven-primary-80 dark:border-aiven-primary-60 dark:text-aiven-primary-30"
                              : "border-2 border-aiven-grey-20 text-aiven-grey-40 dark:border-aiven-grey-60",
                        )}
                      >
                        {isCompleted ? (
                          <IconCheck size={12} strokeWidth={3} />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="font-medium">{STEP_LABELS[step]}</span>
                        {summaryText && (
                          <p className={cn(
                            "text-xs truncate mt-0.5",
                            isActive ? "text-aiven-primary-60 dark:text-aiven-primary-40" : "text-text-muted",
                          )}>
                            {summaryText}
                          </p>
                        )}
                      </div>

                      {isCompleted && !isActive && (
                        <IconPencil size={12} className="shrink-0 text-text-muted" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <AnimatePresence>
              {state.dependencyWarning && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="flex items-start gap-2 rounded-lg border border-aiven-warning-30 bg-aiven-warning-0 p-3 text-xs text-aiven-warning-80 dark:border-aiven-warning-60 dark:bg-aiven-warning-100 dark:text-aiven-warning-30">
                    <IconAlertTriangle size={14} className="mt-0.5 shrink-0" />
                    <span>{state.dependencyWarning}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {state.plan && (
              <div className="mt-4 pt-4 border-t border-aiven-grey-10 dark:border-aiven-grey-80">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-text-muted">Estimated monthly cost</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-semibold text-text-heading">
                      ${cost === 0 ? "0" : <AnimatedNumber value={cost} />}
                    </span>
                    <span className="text-sm text-text-muted">/mo</span>
                    {cost === 0 && (
                      <Badge variant="success" className="ml-1">Free</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
