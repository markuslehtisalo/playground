"use client";

import { Select } from "@/components/aiven";
import { CLOUD_PROVIDERS, type CloudProvider } from "./pricing-data";

interface CloudRegionSelectProps {
  cloudProvider: CloudProvider;
  region: string;
  onCloudChange: (provider: CloudProvider) => void;
  onRegionChange: (region: string) => void;
}

export function CloudRegionSelect({
  cloudProvider,
  region,
  onCloudChange,
  onRegionChange,
}: CloudRegionSelectProps) {
  const currentCloud = CLOUD_PROVIDERS.find((c) => c.id === cloudProvider);
  const regions = currentCloud?.regions ?? [];
  const CloudIcon = currentCloud?.icon;
  const selectedRegion = regions.find((r) => r.id === region);

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-text-heading">
        Tailor your plan
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:w-auto sm:grid-cols-[14rem_14rem]">
      <div className="space-y-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          Cloud
        </span>
        <Select
          value={cloudProvider}
          onValueChange={(val) => onCloudChange(val as CloudProvider)}
        >
          <Select.Trigger className="w-full" aria-label="Cloud">
            <span className="flex items-center gap-2">
              {CloudIcon && <CloudIcon size={14} />}
              {currentCloud?.label ?? <Select.Value />}
            </span>
          </Select.Trigger>
          <Select.Portal>
            <Select.Popup>
              {CLOUD_PROVIDERS.map((cloud) => (
                <Select.Item key={cloud.id} value={cloud.id}>
                  <cloud.icon size={14} className="mr-2 inline-block" />
                  {cloud.label}
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Portal>
        </Select>
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
          Region
        </span>
        <Select
          value={region}
          onValueChange={(val) => onRegionChange(val as string)}
        >
          <Select.Trigger className="w-full" aria-label="Region">
            {selectedRegion ? (
              <span className="flex items-center gap-2">
                <span>{selectedRegion.flag}</span>
                {selectedRegion.label}
              </span>
            ) : (
              <Select.Value />
            )}
          </Select.Trigger>
          <Select.Portal>
            <Select.Popup>
              {regions.map((r) => (
                <Select.Item key={r.id} value={r.id}>
                  <span className="mr-2">{r.flag}</span>
                  {r.label}
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Portal>
        </Select>
      </div>
      </div>
    </div>
  );
}
