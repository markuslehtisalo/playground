import { StaggerContainer, StaggerItem } from "./scroll-reveal";

const steps = [
  { class: "text-4xl", label: "Marketing headlines", sample: "Ship faster" },
  { class: "text-2xl", label: "Section headings", sample: "The architecture" },
  {
    class: "text-lg",
    label: "Marketing subheads / Product titles",
    sample: "Build resilient data infrastructure",
  },
  {
    class: "text-base",
    label: "Body text",
    sample: "Both teams reference the same scale.",
  },
  {
    class: "text-sm",
    label: "Product body / UI labels",
    sample: "3 nodes · eu-west-1 · 99.99% uptime",
  },
  {
    class: "text-xs",
    label: "Captions / metadata",
    sample: "Last deployed 2 hours ago",
  },
];

const accentWidths = ["w-8", "w-6", "w-4", "w-3", "w-2", "w-1.5"];

export function TypeScaleStrip() {
  return (
    <StaggerContainer className="overflow-hidden rounded-xl border border-aiven-grey-10 bg-aiven-grey-0/60 backdrop-blur-sm dark:border-aiven-grey-80 dark:bg-aiven-grey-90/60">
      {steps.map((step, i) => (
        <StaggerItem key={step.class}>
          <div
            className={`flex items-baseline gap-6 px-5 py-4 ${i !== steps.length - 1 ? "border-b border-aiven-grey-10/50 dark:border-aiven-grey-80/50" : ""}`}
          >
            <div className="flex w-20 shrink-0 items-center gap-2">
              <div
                className={`h-3 rounded-full bg-aiven-secondary-60/30 dark:bg-aiven-secondary-50/30 ${accentWidths[i]}`}
              />
              <span className="font-mono text-xs text-text-muted">
                {step.class.replace("text-", "")}
              </span>
            </div>
            <span className={`${step.class} font-medium text-text-heading`}>
              {step.sample}
            </span>
            <span className="ml-auto hidden shrink-0 text-xs text-text-muted sm:block">
              {step.label}
            </span>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
