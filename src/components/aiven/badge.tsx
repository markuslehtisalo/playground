import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "error"
  | "outline"
  | "primary"
  | "success"
  | "warning";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-aiven-grey-0 text-aiven-grey-60 dark:bg-aiven-grey-90 dark:text-aiven-grey-20",
  error:
    "bg-aiven-error-0 text-aiven-error-80 dark:bg-aiven-error-100 dark:text-aiven-error-20",
  outline:
    "border border-aiven-grey-20 text-aiven-grey-60 dark:border-aiven-grey-60 dark:text-aiven-grey-20",
  primary:
    "bg-aiven-primary-5 text-aiven-primary-90 dark:bg-aiven-primary-100 dark:text-aiven-primary-20",
  success:
    "bg-aiven-success-0 text-aiven-success-80 dark:bg-aiven-success-100 dark:text-aiven-success-20",
  warning:
    "bg-aiven-warning-0 text-aiven-warning-80 dark:bg-aiven-warning-100 dark:text-aiven-warning-20",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "font-medium inline-flex cursor-pointer items-center px-2.5 py-0.5 rounded-full text-xs w-fit transition-colors duration-150",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
