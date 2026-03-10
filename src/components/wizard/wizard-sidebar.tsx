"use client";

import {
  IconCheck,
  IconPencil,
  IconAlertTriangle,
  IconRocket,
} from "@tabler/icons-react";
import { Progress } from "@/components/aiven";
import { cn } from "@/lib/utils";
import type { WizardState, WizardStep } from "@/lib/wizard-types";
import { STEP_ORDER, STEP_LABELS } from "@/lib/wizard-types";
import { CLOUD_PROVIDERS } from "@/lib/wizard-data";
import { motion, AnimatePresence } from "motion/react";

interface WizardSidebarProps {
  state: WizardState;
  onGoToStep: (step: WizardStep) => void;
}

export function getSummaryText(step: WizardStep, state: WizardState): string | null {
  switch (step) {
    case "service":
      return state.service?.name ?? null;
    case "cloud": {
      if (!state.cloudProvider && !state.region) return null;
      const provider = CLOUD_PROVIDERS.find(
        (p) => p.id === state.cloudProvider,
      );
      const parts: string[] = [];
      if (provider) parts.push(provider.shortName);
      if (state.region) parts.push(state.region.name);
      return parts.join(" / ");
    }
    case "plan":
      return state.plan?.name ?? null;
    case "configure":
      return state.config.serviceName || null;
    case "review":
      return null;
  }
}

function StepCircle({
  index,
  isActive,
  isCompleted,
}: {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <div
      className={cn(
        "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
        isCompleted
          ? "bg-aiven-primary-80 text-white"
          : isActive
            ? "border-2 border-aiven-primary-80 bg-white text-aiven-primary-80 dark:bg-aiven-grey-100"
            : "border-2 border-aiven-grey-20 bg-white text-aiven-grey-40 dark:border-aiven-grey-60 dark:bg-aiven-grey-100 dark:text-aiven-grey-40",
      )}
    >
      {isCompleted ? (
        <IconCheck size={12} strokeWidth={3} />
      ) : (
        <span>{index + 1}</span>
      )}
      {isActive && (
        <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-aiven-primary-80/40 motion-safe:animate-ping" />
      )}
    </div>
  );
}

export function WizardSidebar({ state, onGoToStep }: WizardSidebarProps) {
  const currentIdx = STEP_ORDER.indexOf(state.currentStep);
  const completedCount = state.completedSteps.length;

  // Progress line: fill up to the last completed step (or current step if further)
  const lastCompletedIdx = STEP_ORDER.reduce(
    (max, step, idx) => (state.completedSteps.includes(step) ? idx : max),
    -1,
  );
  const progressIdx = Math.max(lastCompletedIdx, currentIdx);

  return (
    <aside className="flex h-full flex-col border-r border-aiven-grey-10 bg-white dark:border-aiven-grey-80 dark:bg-aiven-grey-100">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-text-muted">
            Step {currentIdx + 1} of {STEP_ORDER.length}
          </span>
          <span className="text-xs text-text-muted">
            {Math.round((completedCount / STEP_ORDER.length) * 100)}% completed
          </span>
        </div>
        <Progress
          value={completedCount}
          max={STEP_ORDER.length}
          size="sm"
          variant="primary"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
        <div className="relative">
          {/* Continuous background line */}
          <div className="absolute left-4.75 top-5.5 bottom-5.5 w-0.5 rounded-full bg-aiven-grey-10 dark:bg-aiven-grey-80 transition-all duration-300" />
          {/* Progress overlay */}
          <div
            className="absolute left-4.75 top-5.5 w-0.5 rounded-full bg-aiven-primary-80 transition-all duration-300 dark:bg-aiven-primary-60"
            style={{ height: state.isLaunched ? "calc(100% - 44px)" : `${progressIdx * 58}px` }}
          />
          <ul>
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
                    onClick={() => isAccessible && onGoToStep(step)}
                    className={cn(
                      "group relative flex h-14.5 w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition-colors outline-none",
                      "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
                      isActive
                        ? "cursor-pointer text-aiven-primary-80 dark:text-aiven-primary-30"
                        : isCompleted
                          ? "cursor-pointer text-text-heading hover:bg-aiven-grey-0 dark:hover:bg-aiven-grey-90"
                          : "text-text-muted cursor-default",
                    )}
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <StepCircle
                        index={idx}
                        isActive={isActive && !state.isLaunched}
                        isCompleted={isCompleted}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">
                            {STEP_LABELS[step]}
                          </span>
                          {isCompleted && !isActive && (
                            <IconPencil
                              size={12}
                              className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                            />
                          )}
                        </div>
                        <AnimatePresence mode="wait">
                          {summaryText && (
                            <motion.p
                              key={summaryText}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.15 }}
                              className={cn(
                                "mt-0.5 text-xs truncate",
                                isActive
                                  ? "text-aiven-primary-60 dark:text-aiven-primary-40"
                                  : "text-text-muted",
                              )}
                            >
                              {summaryText}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 px-2 py-2.5">
            <div className="relative z-10 flex items-center gap-3">
              <div className={cn(
                "relative flex size-6 shrink-0 items-center justify-center rounded-full transition-colors",
                state.isLaunched
                  ? "bg-aiven-success-60 text-white dark:bg-aiven-success-40"
                  : "border-2 border-aiven-grey-20 bg-white text-aiven-grey-40 dark:border-aiven-grey-60 dark:bg-aiven-grey-100 dark:text-aiven-grey-40",
              )}>
                <IconRocket size={12} />
                {state.isLaunched && (
                  <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-aiven-success-60/40 motion-safe:animate-ping dark:border-aiven-success-40/40" />
                )}
              </div>
              <span className={cn(
                "text-sm font-medium",
                state.isLaunched
                  ? "text-aiven-success-60 dark:text-aiven-success-30"
                  : "text-text-muted",
              )}>
                Launched
              </span>
            </div>
          </div>
        </div>

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
      </nav>

    </aside>
  );
}
