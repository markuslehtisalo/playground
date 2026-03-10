import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "@/lib/utils";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof BaseSeparator> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      className={cn(
        "bg-aiven-grey-10 dark:bg-aiven-grey-80",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      orientation={orientation}
      {...props}
    />
  );
}
