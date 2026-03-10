"use client";

import { PlanCard } from "./plan-card";
import {
  type ServiceId,
  type PlanTier,
  type BillingPeriod,
  SERVICE_PLANS,
} from "./pricing-data";

interface PlanCardsGridProps {
  serviceId: ServiceId;
  selectedTier: PlanTier;
  recommendedTier: PlanTier | null;
  billing: BillingPeriod;
  cpu: number;
  ram: number;
  storage: number;
  onSelectTier: (tier: PlanTier) => void;
}

export function PlanCardsGrid({
  serviceId,
  selectedTier,
  recommendedTier,
  billing,
  cpu,
  ram,
  storage,
  onSelectTier,
}: PlanCardsGridProps) {
  const plans = SERVICE_PLANS[serviceId];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {plans.map((plan) => (
        <PlanCard
          key={plan.tier}
          plan={plan}
          serviceId={serviceId}
          isSelected={plan.tier === selectedTier}
          isRecommended={plan.tier === recommendedTier}
          billing={billing}
          cpu={cpu}
          ram={ram}
          storage={storage}
          onSelect={onSelectTier}
        />
      ))}
    </div>
  );
}
