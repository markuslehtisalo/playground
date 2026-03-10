"use client";

import { ToggleGroup } from "@/components/aiven";
import {
  SERVICE_CATEGORIES,
  type ServiceId,
} from "./pricing-data";

const SERVICES = SERVICE_CATEGORIES.flatMap((c) => c.services);

interface ServicePickerProps {
  serviceId: ServiceId;
  onServiceChange: (id: ServiceId) => void;
}

export function ServicePicker({
  serviceId,
  onServiceChange,
}: ServicePickerProps) {
  return (
    <ToggleGroup
      value={[serviceId]}
      onValueChange={(val) => {
        if (val.length > 0) onServiceChange(val[0] as ServiceId);
      }}
      className="w-full"
    >
      {SERVICES.map((service) => (
        <ToggleGroup.Item
          key={service.id}
          value={service.id}
          className="flex-1 gap-2"
        >
          <service.icon size={16} />
          {service.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
}
