"use client";

import { useState } from "react";
import { Select, ToggleGroup } from "@/components/aiven";
import {
  IconSql,
  IconBrandMysql,
  IconDatabase,
  IconBrandElastic,
  IconBolt,
  IconChartBar,
  IconChartLine,
  IconApps,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/wizard-data";
import type { ServiceCategory, ServiceOption } from "@/lib/wizard-types";
import type { StepProps } from "../wizard-content";
import { SelectionCard } from "../selection-card";

const SERVICE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  pg: IconSql,
  mysql: IconBrandMysql,
  redis: IconDatabase,
  opensearch: IconBrandElastic,
  kafka: IconBolt,
  clickhouse: IconChartBar,
  grafana: IconChartLine,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  databases: {
    bg: "bg-aiven-info-5 dark:bg-aiven-info-100",
    text: "text-aiven-info-70 dark:text-aiven-info-30",
    badge: "bg-aiven-info-5 text-aiven-info-80 dark:bg-aiven-info-100 dark:text-aiven-info-20",
  },
  streaming: {
    bg: "bg-aiven-warning-5 dark:bg-aiven-warning-100",
    text: "text-aiven-warning-70 dark:text-aiven-warning-30",
    badge: "bg-aiven-warning-5 text-aiven-warning-80 dark:bg-aiven-warning-100 dark:text-aiven-warning-20",
  },
  search: {
    bg: "bg-aiven-secondary-5 dark:bg-[#3a2010]",
    text: "text-aiven-secondary-70 dark:text-aiven-secondary-30",
    badge: "bg-aiven-secondary-5 text-aiven-secondary-80 dark:bg-[#3a2010] dark:text-aiven-secondary-20",
  },
  monitoring: {
    bg: "bg-aiven-success-5 dark:bg-aiven-success-100",
    text: "text-aiven-success-70 dark:text-aiven-success-30",
    badge: "bg-aiven-success-5 text-aiven-success-80 dark:bg-aiven-success-100 dark:text-aiven-success-20",
  },
};

const CATEGORIES: { value: ServiceCategory; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { value: "all", label: "All", icon: IconApps },
  { value: "databases", label: "Databases", icon: IconDatabase },
  { value: "streaming", label: "Streaming", icon: IconBolt },
  { value: "search", label: "Search", icon: IconBrandElastic },
  { value: "monitoring", label: "Monitoring", icon: IconChartLine },
];

export function StepService({ state, dispatch }: StepProps) {
  const [filter, setFilter] = useState<ServiceCategory>("all");

  const filtered =
    filter === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === filter);

  function handleSelect(service: ServiceOption) {
    dispatch({ type: "SET_SERVICE", payload: service });
  }

  return (
    <div className="space-y-6">
      {/* Mobile: dropdown */}
      <div className="sm:hidden">
        <Select
          value={filter}
          onValueChange={(val) => setFilter(val as ServiceCategory)}
        >
          <Select.Trigger aria-label="Filter services">
            <Select.Value />
          </Select.Trigger>
          <Select.Portal>
            <Select.Popup>
              {CATEGORIES.map((cat) => (
                <Select.Item key={cat.value} value={cat.value}>
                  {cat.label}
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Portal>
        </Select>
      </div>
      {/* Desktop: toggle group */}
      <div className="hidden sm:block">
        <ToggleGroup
          value={[filter]}
          onValueChange={(values) => {
            const next = values[values.length - 1] as ServiceCategory | undefined;
            setFilter(next ?? "all");
          }}
        >
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <ToggleGroup.Item key={cat.value} value={cat.value} className="gap-1.5">
                <CatIcon size={14} />
                {cat.label}
              </ToggleGroup.Item>
            );
          })}
        </ToggleGroup>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => {
          const isSelected = state.service?.id === service.id;
          const Icon = SERVICE_ICONS[service.id] ?? IconDatabase;
          const colors = CATEGORY_COLORS[service.category];

          return (
            <SelectionCard
              key={service.id}
              selected={isSelected}
              onClick={() => handleSelect(service)}
              className="p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg",
                    isSelected
                      ? "bg-white text-aiven-primary-80 dark:bg-aiven-primary-100 dark:text-aiven-primary-30"
                      : colors
                        ? `${colors.bg} ${colors.text}`
                        : "bg-aiven-grey-0 text-aiven-grey-50 dark:bg-aiven-grey-90 dark:text-aiven-grey-30",
                  )}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-text-heading">
                      {service.name}
                    </span>
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium capitalize",
                      colors?.badge ?? "bg-aiven-grey-0 text-aiven-grey-60 dark:bg-aiven-grey-90 dark:text-aiven-grey-20",
                    )}>
                      {service.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-muted line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            </SelectionCard>
          );
        })}
      </div>
    </div>
  );
}
