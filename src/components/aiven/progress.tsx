import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "@/lib/utils";

type ProgressSize = "sm" | "md" | "lg";
type ProgressVariant = "error" | "primary" | "success" | "warning";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root> {
  max?: number;
  size?: ProgressSize;
  value: number | null;
  variant?: ProgressVariant;
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const variantStyles: Record<ProgressVariant, string> = {
  error: "bg-aiven-error-60",
  primary: "bg-aiven-primary-80",
  success: "bg-aiven-success-60",
  warning: "bg-aiven-warning-60",
};

export function Progress({
  className,
  max = 100,
  size = "md",
  value,
  variant = "primary",
  ...props
}: ProgressProps) {
  return (
    <BaseProgress.Root
      className={cn("flex flex-col gap-1.5", className)}
      max={max}
      value={value}
      {...props}
    >
      <BaseProgress.Track
        className={cn(
          "overflow-hidden rounded-full bg-aiven-grey-5 dark:bg-aiven-grey-80",
          sizeStyles[size],
        )}
      >
        <BaseProgress.Indicator
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            variantStyles[variant],
          )}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
