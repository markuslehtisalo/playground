import { cn } from "@/lib/utils";
import type { Technology } from "@/lib/sanity/types";

interface TechnologyPillProps {
  technology: Technology;
  className?: string;
}

export function TechnologyPill({ technology, className }: TechnologyPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-aiven-grey-70 bg-aiven-grey-80 px-2.5 py-1 text-xs font-medium text-aiven-grey-20",
        className,
      )}
    >
      {technology.title}
    </span>
  );
}
