"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof BaseSwitch.Root
> {
  label?: string;
}

export function Switch({ className, label, ...props }: SwitchProps) {
  const switchElement = (
    <BaseSwitch.Root
      className={cn(
        "bg-aiven-grey-20 cursor-pointer flex h-6 items-center outline-none p-0.5 relative rounded-full shrink-0 transition-colors w-10 dark:bg-aiven-grey-60 data-checked:bg-aiven-primary-80 data-disabled:cursor-not-allowed data-disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="bg-white block rounded-full shadow-sm size-5 transition-transform data-checked:translate-x-4" />
    </BaseSwitch.Root>
  );

  if (!label) return switchElement;

  return (
    <label className="flex gap-2.5 items-center">
      {switchElement}
      <span className="text-aiven-grey-80 text-sm dark:text-aiven-grey-20">
        {label}
      </span>
    </label>
  );
}
