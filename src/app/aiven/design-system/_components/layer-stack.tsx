import { ScrollReveal } from "./scroll-reveal";

interface LayerProps {
  children?: React.ReactNode;
  description: string;
  number: number;
  title: string;
}

function Layer({ children, description, number, title }: LayerProps) {
  return (
    <ScrollReveal preset="fadeUp" delay={number * 0.12}>
      <div className="relative flex gap-6">
        {/* Vertical line + number */}
        <div className="flex flex-col items-center">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-aiven-secondary-60 bg-aiven-secondary-5 text-xs font-bold text-aiven-secondary-60 dark:border-aiven-secondary-50 dark:bg-aiven-secondary-100 dark:text-white">
            {number}
          </span>
          <div className="w-px grow bg-linear-to-b from-aiven-secondary-60/20 to-transparent dark:from-aiven-secondary-50/20" />
        </div>

        {/* Content */}
        <div className="pb-12">
          <h3 className="text-base font-semibold text-text-heading">{title}</h3>
          <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-text-body">
            {description}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </ScrollReveal>
  );
}

interface LayerStackProps {
  children: React.ReactNode;
}

export function LayerStack({ children }: LayerStackProps) {
  return <div className="flex flex-col">{children}</div>;
}

LayerStack.Layer = Layer;
