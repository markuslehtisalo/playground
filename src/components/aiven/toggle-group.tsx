"use client";

import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils";

type ToggleGroupRootProps = React.ComponentPropsWithoutRef<
  typeof BaseToggleGroup
>;

function ToggleGroupRoot({ className, ...props }: ToggleGroupRootProps) {
  return (
    <BaseToggleGroup
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-aiven-grey-10 bg-white p-0.5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100",
        className,
      )}
      {...props}
    />
  );
}

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle> {
  className?: string;
}

function ToggleGroupItem({ className, ...props }: ToggleGroupItemProps) {
  return (
    <BaseToggle
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors select-none outline-none cursor-pointer",
        "text-aiven-grey-40 hover:text-aiven-grey-60",
        "data-[pressed]:bg-aiven-grey-5 data-[pressed]:text-aiven-grey-100",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        "dark:text-aiven-grey-40 dark:hover:text-aiven-grey-20",
        "dark:data-[pressed]:bg-aiven-grey-90 dark:data-[pressed]:text-aiven-grey-0",
        className,
      )}
      {...props}
    />
  );
}

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});
