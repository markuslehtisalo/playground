"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactElement;
  className?: string;
  content: React.ReactNode;
  side?: "bottom" | "left" | "right" | "top";
  sideOffset?: number;
}

export function Tooltip({
  children,
  className,
  content,
  side = "top",
  sideOffset = 8,
}: TooltipProps) {
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
            <BaseTooltip.Popup
              className={cn(
                "bg-aiven-grey-100 duration-150 origin-(--transform-origin) px-2.5 py-1.5 rounded-md shadow-lg text-white text-xs transition-[opacity,transform] dark:bg-aiven-grey-0 dark:text-aiven-grey-100 data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95",
                className,
              )}
            >
              <BaseTooltip.Arrow className="text-aiven-grey-100 dark:text-aiven-grey-0">
                <svg
                  fill="currentColor"
                  height="5"
                  viewBox="0 0 10 5"
                  width="10"
                >
                  <path d="M0 0L5 5L10 0" />
                </svg>
              </BaseTooltip.Arrow>
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
