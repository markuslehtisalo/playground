import { cn } from "@/lib/utils";

interface SkeletonRailProps {
  cardCount?: number;
  className?: string;
}

export function SkeletonRail({ cardCount = 5, className }: SkeletonRailProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="mb-3 px-6">
        <div className="h-5 w-48 animate-pulse rounded bg-aiven-grey-80" />
        <div className="mt-2 h-3.5 w-72 animate-pulse rounded bg-aiven-grey-80/60" />
      </div>
      <div className="flex gap-4 overflow-hidden px-6">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="w-[272px] shrink-0 aspect-[4/5] animate-pulse rounded-lg bg-aiven-grey-80/40"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
