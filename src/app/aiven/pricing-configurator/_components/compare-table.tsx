"use client";

import { IconCheck, IconX } from "@tabler/icons-react";
import { Dialog, Tooltip } from "@/components/aiven";
import { cn } from "@/lib/utils";
import {
  type ServiceId,
  type PlanTier,
  SERVICE_FEATURES,
  SERVICE_PLANS,
  TIER_ORDER,
} from "./pricing-data";

interface CompareDrawerProps {
  serviceId: ServiceId;
  selectedTier: PlanTier;
  children: React.ReactElement;
}

export function CompareDrawer({
  serviceId,
  selectedTier,
  children,
}: CompareDrawerProps) {
  const features = SERVICE_FEATURES[serviceId];
  const plans = SERVICE_PLANS[serviceId];

  return (
    <Dialog>
      <Dialog.Trigger render={children} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup className="fixed inset-y-0 right-0 left-auto top-0 w-full max-w-4xl translate-x-0 translate-y-0 rounded-none rounded-l-xl border-l border-aiven-grey-10 p-0 transition-[opacity,transform] duration-300 data-ending-style:translate-x-full data-starting-style:translate-x-full dark:border-aiven-grey-80">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-aiven-grey-10 px-6 py-4 dark:border-aiven-grey-80">
              <Dialog.Title>Compare plans</Dialog.Title>
              <Dialog.Close />
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <table className="w-full text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap" aria-label="Plan feature comparison">
                <thead>
                  <tr className="border-b border-aiven-grey-10 dark:border-aiven-grey-80">
                    <th scope="col" className="sticky left-0 bg-white px-3 py-2 text-left font-medium text-text-muted dark:bg-aiven-grey-100">
                      Feature
                    </th>
                    {TIER_ORDER.map((tier) => {
                      const plan = plans.find((p) => p.tier === tier);
                      return (
                        <th
                          scope="col"
                          key={tier}
                          className={cn(
                            "px-3 py-2 text-center font-medium",
                            tier === selectedTier
                              ? "text-aiven-primary-80"
                              : "text-text-muted",
                          )}
                        >
                          {plan?.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.label}
                      className={cn(
                        "border-b border-aiven-grey-5 last:border-b-0 dark:border-aiven-grey-90",
                        i % 2 === 1 &&
                          "bg-aiven-grey-0/50 dark:bg-aiven-grey-90/50",
                      )}
                    >
                      <th scope="row" className="sticky left-0 bg-inherit px-3 py-2.5 text-left font-normal text-text-body">
                        {feature.tooltip ? (
                          <Tooltip content={feature.tooltip} side="right">
                            <span className="cursor-help border-b border-dotted border-aiven-grey-30">
                              {feature.label}
                            </span>
                          </Tooltip>
                        ) : (
                          feature.label
                        )}
                      </th>
                      {TIER_ORDER.map((tier) => {
                        const val = feature.values[tier];
                        return (
                          <td
                            key={tier}
                            className={cn(
                              "px-3 py-2.5 text-center",
                              tier === selectedTier &&
                                "bg-aiven-primary-10/30 dark:bg-aiven-primary-80/5",
                            )}
                          >
                            <CellValue value={val} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog>
  );
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <IconCheck
        size={14}
        aria-label="Yes"
        className="mx-auto text-aiven-success-60"
      />
    );
  }
  if (value === false) {
    return (
      <IconX
        size={14}
        aria-label="No"
        className="mx-auto text-aiven-grey-30 dark:text-aiven-grey-60"
      />
    );
  }
  return <span className="text-text-body">{value}</span>;
}
