"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import {
  IconCheck,
  IconRocket,
  IconRefresh,
} from "@tabler/icons-react";
import { Button, Progress, AnimatedNumber, Separator } from "@/components/aiven";
import { calculateCost } from "@/lib/wizard-reducer";
import { CLOUD_PROVIDERS, EXTRA_DISK_PRICE_PER_GIB } from "@/lib/wizard-data";
import type { StepProps } from "../wizard-content";

function SummaryItem({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string | null;
  onEdit?: () => void;
}) {
  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </span>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs text-text-accent hover:underline cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 rounded-sm"
          >
            Edit
          </button>
        )}
      </div>
      <p className="mt-1 text-sm font-medium text-text-heading">
        {value ?? "—"}
      </p>
    </div>
  );
}

export function StepReview({ state, dispatch }: StepProps) {
  const cost = calculateCost(state);
  const provider = CLOUD_PROVIDERS.find((p) => p.id === state.cloudProvider);
  const diskCost = state.config.extraDiskGiB * EXTRA_DISK_PRICE_PER_GIB;
  const baseCost = state.plan
    ? state.plan.basePrice * (provider?.multiplier ?? 1)
    : 0;

  useEffect(() => {
    if (state.isLaunching) {
      const timer = setTimeout(() => {
        dispatch({ type: "LAUNCH_COMPLETE" });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.isLaunching, dispatch]);

  if (state.isLaunched) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-aiven-success-0 dark:bg-aiven-success-100">
            <IconCheck
              size={32}
              className="text-aiven-success-60 dark:text-aiven-success-30"
            />
          </div>
          <h3 className="text-xl font-semibold text-text-heading">
            Service Created
          </h3>
          <p className="mt-2 text-sm text-text-body">
            <span className="font-medium">{state.config.serviceName}</span> is
            now being provisioned. It will be ready in a few minutes.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button
              variant="ghost"
              onClick={() => dispatch({ type: "RESET" })}
            >
              <IconRefresh size={16} />
              Create Another
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (state.isLaunching) {
    return (
      <div>
        <div className="max-w-md text-center">
          <IconRocket
            size={32}
            className="mx-auto mb-4 text-aiven-primary-80 dark:text-aiven-primary-30"
          />
          <h3 className="text-lg font-semibold text-text-heading">
            Launching {state.config.serviceName}...
          </h3>
          <div className="mt-6">
            <Progress value={null} variant="primary" size="md" />
          </div>
          <p className="mt-3 text-sm text-text-muted">
            Setting up your {state.service?.name} instance
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center">
      <div className="w-full max-w-lg space-y-6">
        <div className="rounded-lg border border-aiven-grey-10 bg-white p-5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100">
          <SummaryItem
            label="Service"
            value={state.service?.name ?? null}
            onEdit={() => dispatch({ type: "GO_TO_STEP", payload: "service" })}
          />
          <Separator />
          <SummaryItem
            label="Cloud & Region"
            value={
              provider && state.region
                ? `${provider.shortName} / ${state.region.name} (${state.region.code})`
                : null
            }
            onEdit={() => dispatch({ type: "GO_TO_STEP", payload: "cloud" })}
          />
          <Separator />
          <SummaryItem
            label="Plan"
            value={state.plan?.name ?? null}
            onEdit={() => dispatch({ type: "GO_TO_STEP", payload: "plan" })}
          />
          <Separator />
          <SummaryItem
            label="Service name"
            value={state.config.serviceName || null}
            onEdit={() =>
              dispatch({ type: "GO_TO_STEP", payload: "configure" })
            }
          />
          {state.config.extraDiskGiB > 0 && (
            <>
              <Separator />
              <SummaryItem
                label="Extra disk"
                value={`${state.config.extraDiskGiB} GiB`}
              />
            </>
          )}
          <Separator />
          <SummaryItem
            label="Notifications"
            value={state.config.notifications ? "Enabled" : "Disabled"}
          />
        </div>

        <div className="rounded-lg border border-aiven-grey-10 bg-white p-5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100">
          <h3 className="text-sm font-medium text-text-heading mb-3">
            Cost Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-body">
                {state.plan?.name} plan
                {provider && provider.multiplier !== 1 && (
                  <span className="text-text-muted">
                    {" "}
                    ({provider.shortName} +
                    {Math.round((provider.multiplier - 1) * 100)}%)
                  </span>
                )}
              </span>
              <span className="font-medium text-text-heading">
                ${baseCost.toFixed(2)}
              </span>
            </div>
            {diskCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-body">
                  Additional disk ({state.config.extraDiskGiB} GiB)
                </span>
                <span className="font-medium text-text-heading">
                  ${diskCost.toFixed(2)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between pt-1">
              <span className="font-medium text-text-heading">
                Estimated monthly
              </span>
              <span className="text-lg font-semibold text-text-heading">
                $<AnimatedNumber value={cost} />/mo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
