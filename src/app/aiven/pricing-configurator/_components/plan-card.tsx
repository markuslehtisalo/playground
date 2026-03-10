"use client";

import {
  IconServer,
  IconCpu,
  IconDeviceDesktop,
  IconDatabase,
} from "@tabler/icons-react";
import { Badge, AnimatedNumber } from "@/components/aiven";
import { cn } from "@/lib/utils";
import {
  type PlanDefinition,
  type PlanTier,
  type BillingPeriod,
  type ServiceId,
  calculatePrice,
  formatStorage,
  FREE_TIER_SPECS,
} from "./pricing-data";

interface PlanCardProps {
  plan: PlanDefinition;
  serviceId: ServiceId;
  isSelected: boolean;
  isRecommended: boolean;
  billing: BillingPeriod;
  cpu: number;
  ram: number;
  storage: number;
  onSelect: (tier: PlanTier) => void;
}

export function PlanCard({
  plan,
  serviceId,
  isSelected,
  isRecommended,
  billing,
  cpu,
  ram,
  storage,
  onSelect,
}: PlanCardProps) {
  const price = isSelected
    ? calculatePrice(plan, cpu, ram, storage, billing)
    : billing === "hourly"
      ? plan.baseHourly
      : plan.baseMonthly;

  const isFree = plan.tier === "free";
  const unit = billing === "hourly" ? "/hr" : "/mo";

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(plan.tier)}
      className={cn(
        "group w-full rounded-xl border-2 p-3 text-left outline-none transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        isSelected
          ? "scale-[1.02] border-aiven-primary-80 bg-aiven-primary-10/50 shadow-sm dark:border-aiven-primary-60 dark:bg-aiven-primary-80/10"
          : "border-transparent bg-white hover:-translate-y-0.5 hover:border-aiven-grey-10 hover:shadow-md dark:bg-aiven-grey-90 dark:hover:border-aiven-grey-70",
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-heading">
          {plan.label}
        </span>
        {isRecommended && !isSelected && (
          <Badge variant="success" className="text-[10px]">
            Consider
          </Badge>
        )}
        {isSelected && (
          <Badge variant="primary" className="text-[10px]">
            Selected
          </Badge>
        )}
      </div>

      {/* Price */}
      <div className="mb-2">
        {!isSelected && !isFree && (
          <span className="text-xs text-text-muted">from </span>
        )}
        <span className="text-2xl font-bold tabular-nums text-text-heading">
          {isFree ? (
            "$0"
          ) : (
            <>
              $<AnimatedNumber value={price} decimals={billing === "hourly" ? 2 : 0} />
            </>
          )}
        </span>
        {!isFree && (
          <span className="text-xs text-text-muted">{unit}</span>
        )}
      </div>

      {/* Tagline */}
      <p className="mb-2 text-xs text-text-muted">{plan.tagline}</p>

      {/* Specs */}
      <div className="space-y-1">
        {isFree ? (
          <>
            <SpecRow icon={<IconServer size={12} />} label={FREE_TIER_SPECS[serviceId].vm} />
            <SpecRow icon={<IconCpu size={12} />} label={FREE_TIER_SPECS[serviceId].cpu} />
            <SpecRow icon={<IconDeviceDesktop size={12} />} label={FREE_TIER_SPECS[serviceId].ram} />
            <SpecRow icon={<IconDatabase size={12} />} label={FREE_TIER_SPECS[serviceId].storage} />
          </>
        ) : (
          <>
            <SpecRow
              icon={<IconServer size={12} />}
              label={`${plan.resources.vms.min}${plan.resources.vms.max > plan.resources.vms.min ? `\u2013${plan.resources.vms.max}` : ""} VMs`}
            />
            <SpecRow
              icon={<IconCpu size={12} />}
              label={`${plan.resources.cpu.min}${plan.resources.cpu.max > plan.resources.cpu.min ? `\u2013${plan.resources.cpu.max}` : ""} vCPU`}
            />
            <SpecRow
              icon={<IconDeviceDesktop size={12} />}
              label={`${plan.resources.ram.min}${plan.resources.ram.max > plan.resources.ram.min ? `\u2013${plan.resources.ram.max}` : ""} GB RAM`}
            />
            <SpecRow
              icon={<IconDatabase size={12} />}
              label={`${formatStorage(plan.resources.storage.min)}${plan.resources.storage.max > plan.resources.storage.min ? `\u2013${formatStorage(plan.resources.storage.max)}` : ""}`}
            />
          </>
        )}
      </div>
    </button>
  );
}

function SpecRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-text-body">
      <span className="text-text-muted">{icon}</span>
      {label}
    </div>
  );
}
