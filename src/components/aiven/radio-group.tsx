"use client";

import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cn } from "@/lib/utils";

type RadioGroupRootProps = React.ComponentPropsWithoutRef<
  typeof BaseRadioGroup
>;

function RadioGroupRoot({ className, ...props }: RadioGroupRootProps) {
  return (
    <BaseRadioGroup
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  className?: string;
}

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <BaseRadio.Root
      className={cn(
        "cursor-pointer flex size-5 items-center justify-center rounded-full border border-aiven-grey-20 bg-white transition-colors outline-none",
        "data-[checked]:border-aiven-primary-80 data-[checked]:bg-aiven-primary-80",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        "dark:border-aiven-grey-60 dark:bg-aiven-grey-100",
        "dark:data-[checked]:border-aiven-primary-60 dark:data-[checked]:bg-aiven-primary-80",
        className,
      )}
      {...props}
    />
  );
}

function RadioGroupIndicator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseRadio.Indicator>) {
  return (
    <BaseRadio.Indicator
      className={cn("size-2 rounded-full bg-white", className)}
      {...props}
    />
  );
}

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
});
