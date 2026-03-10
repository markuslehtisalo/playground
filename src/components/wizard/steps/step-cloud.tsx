"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Select } from "@/components/aiven";
import {
  IconBrandAws,
  IconBrandGoogle,
  IconBrandAzure,
  IconChevronDown,
} from "@tabler/icons-react";
import { CLOUD_PROVIDERS, REGIONS } from "@/lib/wizard-data";
import type { CloudProvider, Region } from "@/lib/wizard-types";
import type { StepProps } from "../wizard-content";
import { SelectionCard } from "../selection-card";
import { cn } from "@/lib/utils";

const PROVIDER_ICONS: Record<CloudProvider, React.ComponentType<{ size?: number; className?: string }>> = {
  aws: IconBrandAws,
  gcp: IconBrandGoogle,
  azure: IconBrandAzure,
};

export function StepCloud({ state, dispatch }: StepProps) {
  const [providerOpen, setProviderOpen] = useState(!state.cloudProvider);
  const filteredRegions = state.cloudProvider
    ? REGIONS.filter((r) => r.provider === state.cloudProvider)
    : [];

  const regionsByContinent = filteredRegions.reduce<Record<string, Region[]>>(
    (acc, region) => {
      if (!acc[region.continent]) acc[region.continent] = [];
      acc[region.continent].push(region);
      return acc;
    },
    {},
  );

  function handleProviderSelect(provider: CloudProvider) {
    dispatch({ type: "SET_CLOUD_PROVIDER", payload: provider });
    setProviderOpen(false);
  }

  function handleRegionSelect(value: unknown) {
    const region = REGIONS.find((r) => r.id === value);
    if (region) dispatch({ type: "SET_REGION", payload: region });
  }

  const continentEntries = Object.entries(regionsByContinent);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        {/* On mobile: collapsible header when provider is selected */}
        {state.cloudProvider && !providerOpen ? (
          <button
            type="button"
            onClick={() => setProviderOpen(true)}
            className="flex w-full items-center justify-between rounded-lg border border-aiven-grey-10 bg-white px-4 py-3 text-left outline-none focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 dark:border-aiven-grey-80 dark:bg-aiven-grey-100 sm:hidden"
          >
            <div className="flex items-center gap-2.5">
              {(() => {
                const selectedProvider = CLOUD_PROVIDERS.find(p => p.id === state.cloudProvider);
                const Icon = PROVIDER_ICONS[state.cloudProvider];
                return (
                  <>
                    <Icon size={20} className="text-aiven-primary-80 dark:text-aiven-primary-30" />
                    <div>
                      <span className="text-sm font-medium text-text-heading">{selectedProvider?.shortName}</span>
                      <span className="ml-2 text-xs text-text-muted">
                        {selectedProvider?.multiplier === 1
                          ? "Base pricing"
                          : `+${Math.round((selectedProvider!.multiplier - 1) * 100)}%`}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
            <IconChevronDown size={16} className="text-text-muted" />
          </button>
        ) : null}

        {/* On mobile: hidden when collapsed; on desktop: always visible */}
        <div className={cn(
          !providerOpen && state.cloudProvider ? "hidden sm:block" : "block",
        )}>
          <h3 className="text-sm font-medium text-text-heading">
            Cloud Provider
          </h3>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {CLOUD_PROVIDERS.map((provider) => {
              const isSelected = state.cloudProvider === provider.id;
              const Icon = PROVIDER_ICONS[provider.id];
              return (
                <SelectionCard
                  key={provider.id}
                  selected={isSelected}
                  onClick={() => handleProviderSelect(provider.id)}
                  className="flex flex-col items-center gap-2 p-4"
                >
                  <Icon
                    size={24}
                    className={
                      isSelected
                        ? "text-aiven-primary-80 dark:text-aiven-primary-30"
                        : "text-aiven-grey-40"
                    }
                  />
                  <span className="text-sm font-medium text-text-heading">
                    {provider.shortName}
                  </span>
                  <span className="text-xs text-text-muted">
                    {provider.multiplier === 1
                      ? "Base pricing"
                      : `+${Math.round((provider.multiplier - 1) * 100)}%`}
                  </span>
                </SelectionCard>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {state.cloudProvider && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-heading">Region</h3>
              <p className="text-sm text-text-body">
                Choose a region closest to your users for lowest latency.
              </p>

              <Select
                value={state.region?.id ?? ""}
                onValueChange={handleRegionSelect}
              >
                <Select.Trigger className="w-full max-w-sm">
                  {state.region ? (
                    <span className="flex items-center gap-1.5">
                      <span>{state.region.flag}</span>
                      {state.region.name}
                      <span className="text-xs text-text-muted">({state.region.code})</span>
                    </span>
                  ) : (
                    <span className="text-aiven-grey-30 dark:text-aiven-grey-40">Select a region</span>
                  )}
                </Select.Trigger>
                <Select.Portal>
                  <Select.Popup>
                    {continentEntries.map(
                      ([continent, regions], groupIdx) => (
                        <div key={continent}>
                          {groupIdx > 0 && <Select.Separator />}
                          <Select.Group>
                            <Select.GroupLabel>{continent}</Select.GroupLabel>
                            {regions.map((region) => (
                              <Select.Item key={region.id} value={region.id}>
                                <span className="mr-1.5">{region.flag}</span>
                                {region.name}
                                <span className="ml-3 text-xs text-text-muted">
                                  {region.code}
                                </span>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </div>
                      ),
                    )}
                  </Select.Popup>
                </Select.Portal>
              </Select>

              {!state.region && (
                <p className="text-xs text-text-muted">
                  Select a region to continue
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
