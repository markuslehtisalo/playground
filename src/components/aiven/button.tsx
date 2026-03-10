import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";

type ButtonVariant = "ghost" | "destructive" | "primary" | "secondary";
type ButtonSize = "md" | "lg" | "sm";

interface ButtonProps extends React.ComponentPropsWithoutRef<
  typeof BaseButton
> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  destructive:
    "bg-aiven-error-60 text-white active:bg-aiven-error-80 data-[disabled]:bg-aiven-error-20 hover:bg-aiven-error-70",
  ghost:
    "bg-transparent text-aiven-grey-60 dark:hover:bg-aiven-grey-90 dark:text-aiven-grey-20 active:bg-aiven-grey-5 data-[disabled]:text-aiven-grey-30 hover:bg-aiven-grey-0",
  primary:
    "bg-aiven-primary-80 text-white active:bg-aiven-primary-90 data-[disabled]:bg-aiven-primary-20 hover:bg-aiven-primary-90",
  secondary:
    "bg-white border border-aiven-grey-20 text-aiven-grey-100 dark:bg-aiven-grey-100 dark:border-aiven-grey-60 dark:text-aiven-grey-0 active:bg-aiven-grey-0 data-[disabled]:text-aiven-grey-30 hover:bg-aiven-grey-0 dark:hover:bg-aiven-grey-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: "gap-2.5 h-12 px-6 text-base",
  md: "gap-2 h-10 px-4 text-sm",
  sm: "gap-1.5 h-8 px-3 text-sm",
};

export function Button({
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        "font-medium inline-flex items-center justify-center leading-normal rounded-md select-none transition-colors outline-none cursor-pointer data-disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        className,
        sizeStyles[size],
        variantStyles[variant],
      )}
      {...props}
    />
  );
}
