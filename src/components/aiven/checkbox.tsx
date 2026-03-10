"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Field as BaseField } from "@base-ui/react/field";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  description?: string;
  label?: string;
}

export function Checkbox({
  className,
  description,
  label,
  ...props
}: CheckboxProps) {
  const checkbox = (
    <BaseCheckbox.Root
      className={cn(
        "flex size-5 items-center justify-center rounded border border-aiven-grey-20 bg-white transition-colors dark:border-aiven-grey-60 dark:bg-aiven-grey-100",
        "data-[checked]:border-aiven-primary-80 data-[checked]:bg-aiven-primary-80",
        "data-[indeterminate]:border-aiven-primary-80 data-[indeterminate]:bg-aiven-primary-80",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex text-white">
        <IconCheck size={14} stroke={3} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!label && !description) {
    return checkbox;
  }

  return (
    <BaseField.Root className="flex gap-2.5 items-start">
      {checkbox}
      <div className="flex flex-col gap-0.5">
        {label && (
          <BaseField.Label className="cursor-pointer text-sm font-medium text-aiven-grey-100 dark:text-aiven-grey-0">
            {label}
          </BaseField.Label>
        )}
        {description && (
          <BaseField.Description className="text-xs text-aiven-grey-40">
            {description}
          </BaseField.Description>
        )}
      </div>
    </BaseField.Root>
  );
}
