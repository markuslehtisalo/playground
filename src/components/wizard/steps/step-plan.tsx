"use client";

import { AnimatedNumber, Badge } from "@/components/aiven";
import {
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { CLOUD_PROVIDERS, PLANS } from "@/lib/wizard-data";
import type { Plan } from "@/lib/wizard-types";
import type { StepProps } from "../wizard-content";
import { SelectionCard } from "../selection-card";

function getPlanPrice(plan: Plan, providerMultiplier: number): number {
  return Math.round(plan.basePrice * providerMultiplier * 100) / 100;
}

export function StepPlan({ state, dispatch }: StepProps) {
  const provider = CLOUD_PROVIDERS.find((p) => p.id === state.cloudProvider);
  const multiplier = provider?.multiplier ?? 1;

  const availablePlans = state.service
    ? PLANS.filter((p) => state.service!.availablePlans.includes(p.id))
    : PLANS;

  function handleSelect(plan: Plan) {
    dispatch({ type: "SET_PLAN", payload: plan });
  }

  return (
    <div className="space-y-6">
      {provider && multiplier !== 1 && (
        <p className="text-xs text-text-muted">
          Prices reflect {provider.shortName} pricing (+
          {Math.round((multiplier - 1) * 100)}% vs base).
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {availablePlans.map((plan) => {
          const isSelected = state.plan?.id === plan.id;
          const price = getPlanPrice(plan, multiplier);

          return (
            <SelectionCard
              key={plan.id}
              selected={isSelected}
              onClick={() => handleSelect(plan)}
              className="flex flex-col p-5"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-heading">
                  {plan.name}
                </span>
                {plan.recommended && (
                  <Badge variant="primary" className="motion-safe:animate-pulse">Recommended</Badge>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-text-heading">
                  ${price === 0 ? "0" : <AnimatedNumber value={price} />}
                </span>
                <span className="text-sm text-text-muted">/mo</span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-text-body">
                <div className="flex justify-between">
                  <span>CPU</span>
                  <span className="font-medium text-text-heading">
                    {plan.cpu} {plan.cpu === 1 ? "core" : "cores"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Memory</span>
                  <span className="font-medium text-text-heading">
                    {plan.memory}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Storage</span>
                  <span className="font-medium text-text-heading">
                    {plan.storage}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-aiven-grey-10 pt-3 dark:border-aiven-grey-80">
                <ul className="space-y-1.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-text-body"
                    >
                      <IconCheck
                        size={12}
                        className="shrink-0 text-aiven-success-60"
                      />
                      {feature}
                    </li>
                  ))}
                  {!plan.backups && (
                    <li className="flex items-center gap-2 text-xs text-text-muted">
                      <IconX size={12} className="shrink-0" />
                      No automated backups
                    </li>
                  )}
                  {!plan.ha && (
                    <li className="flex items-center gap-2 text-xs text-text-muted">
                      <IconX size={12} className="shrink-0" />
                      No high availability
                    </li>
                  )}
                </ul>
              </div>
            </SelectionCard>
          );
        })}
      </div>
    </div>
  );
}
