"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { cn } from "@/lib/utils";

type ToggleSize = "sm" | "md" | "lg";
type ToggleVariant = "default" | "outline";

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof BaseToggle> {
  size?: ToggleSize;
  variant?: ToggleVariant;
}

const sizeStyles: Record<ToggleSize, string> = {
  sm: "gap-1.5 h-8 px-2.5 text-sm",
  md: "gap-2 h-10 px-3 text-sm",
  lg: "gap-2.5 h-12 px-4 text-base",
};

const variantStyles: Record<ToggleVariant, string> = {
  default:
    "bg-transparent text-aiven-grey-60 hover:bg-aiven-grey-0 dark:text-aiven-grey-20 dark:hover:bg-aiven-grey-90",
  outline:
    "border border-aiven-grey-20 text-aiven-grey-60 hover:bg-aiven-grey-0 dark:border-aiven-grey-60 dark:text-aiven-grey-20 dark:hover:bg-aiven-grey-90",
};

export function Toggle({
  className,
  size = "md",
  variant = "default",
  ...props
}: ToggleProps) {
  return (
    <BaseToggle
      className={cn(
        "cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition-colors select-none outline-none",
        "data-[pressed]:bg-aiven-primary-5 data-[pressed]:text-aiven-primary-80 dark:data-[pressed]:bg-aiven-primary-100 dark:data-[pressed]:text-aiven-primary-30",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
