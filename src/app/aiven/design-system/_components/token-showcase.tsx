import { StaggerContainer, StaggerItem } from "./scroll-reveal";

const radii = [
  { name: "xs", class: "rounded-xs" },
  { name: "sm", class: "rounded-sm" },
  { name: "md", class: "rounded-md" },
  { name: "lg", class: "rounded-lg" },
  { name: "xl", class: "rounded-xl" },
  { name: "full", class: "rounded-full" },
];

const shadows = [
  { name: "xs", class: "shadow-xs" },
  { name: "sm", class: "shadow-sm" },
  { name: "md", class: "shadow-md" },
  { name: "lg", class: "shadow-lg" },
  { name: "xl", class: "shadow-xl" },
];

const transitions = [
  { name: "fast", duration: "duration-[--transition-fast]", ms: "150ms" },
  { name: "normal", duration: "duration-[--transition-normal]", ms: "200ms" },
  { name: "slow", duration: "duration-[--transition-slow]", ms: "300ms" },
];

export function TokenShowcase() {
  return (
    <div className="space-y-10">
      {/* Radius */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-text-heading">Radius</h4>
        <StaggerContainer className="flex flex-wrap gap-4" stagger={0.05}>
          {radii.map((r) => (
            <StaggerItem key={r.name}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`size-14 border-2 border-aiven-secondary-60 bg-aiven-secondary-5 dark:bg-aiven-secondary-100 ${r.class}`}
                />
                <span className="font-mono text-xs text-text-muted">
                  {r.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Shadows */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-text-heading">Shadows</h4>
        <StaggerContainer className="flex flex-wrap gap-4" stagger={0.05}>
          {shadows.map((s) => (
            <StaggerItem key={s.name}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`size-14 rounded-md bg-white dark:bg-aiven-grey-90 ${s.class}`}
                />
                <span className="font-mono text-xs text-text-muted">
                  {s.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Transitions */}
      <div>
        <h4 className="mb-4 text-sm font-medium text-text-heading">
          Transitions
        </h4>
        <p className="mb-4 text-xs text-text-muted">Hover to preview</p>
        <StaggerContainer className="flex flex-wrap gap-4" stagger={0.05}>
          {transitions.map((t) => (
            <StaggerItem key={t.name}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`size-14 cursor-pointer rounded-md bg-aiven-secondary-60 motion-safe:transition-transform motion-safe:hover:scale-125 ${t.duration}`}
                />
                <span className="font-mono text-xs text-text-muted">
                  {t.name}
                  <span className="ml-1 text-text-muted/60">{t.ms}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
