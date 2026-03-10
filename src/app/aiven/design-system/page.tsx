import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconCircleCheck } from "@tabler/icons-react";
import { SectionHeading, Prose } from "./_components/section-heading";
import { ScrollChevron } from "./_components/scroll-chevron";
import { ColorPalette } from "./_components/color-palette";
import { TokenShowcase } from "./_components/token-showcase";
import { TypeScaleStrip } from "./_components/type-scale-strip";
import { PrimitiveToStyled } from "./_components/primitive-to-styled";
import { ComponentGrid } from "./_components/component-grid";
import { ContextToggle } from "./_components/context-toggle";
import { DarkModeToggle } from "./_components/dark-mode-toggle";
import { LayerStack } from "./_components/layer-stack";
import { SectionWrapper } from "./_components/section-wrapper";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "./_components/scroll-reveal";

export const metadata: Metadata = {
  description:
    "A token-based design system that eliminates visual drift between marketing pages and product UI.",
  title: "Design System - Markus Lehtisalo",
};

const principles = [
  {
    title: "Shared tokens",
    description:
      "Color, typography, spacing, radius, and motion values defined in one place and consumed everywhere.",
  },
  {
    title: "Portable components",
    description:
      "Buttons, inputs, dialogs, and cards that render correctly in both marketing and product layouts.",
  },
  {
    title: "Context-specific composition",
    description:
      "Marketing and product use different layout density and rhythm while pulling from the same token set.",
  },
];

const guarantees = [
  {
    title: "Keyboard navigation",
    description:
      "Arrow keys, Enter, Escape, and Tab work correctly out of the box for every component.",
  },
  {
    title: "Focus management",
    description:
      "Focus trapping, restoration, and visible focus rings follow WAI-ARIA patterns automatically.",
  },
  {
    title: "Reliable state patterns",
    description:
      "Open/closed, selected, disabled, and error states are managed by the primitive, not re-invented per component.",
  },
];

const outcomes = [
  {
    label: "Unified tokens",
    text: "One token set consumed by both marketing pages and product UI.",
  },
  {
    label: "Reduced drift",
    text: "Shared primitives prevent per-team style overrides from diverging.",
  },
  {
    label: "Flexible composition",
    text: "Layout and density vary by context; components and tokens stay the same.",
  },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* ── Hero ── */}
        <SectionWrapper
          background="grid"
          className="flex min-h-screen flex-col"
          flexInner
          innerClassName="max-w-6xl"
          padding="pt-6 pb-20"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <Link
                className="inline-flex items-center gap-1.5 rounded-sm text-sm text-text-muted outline-none transition-colors hover:text-aiven-grey-60 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 dark:hover:text-aiven-grey-20"
                href="/aiven"
              >
                <IconArrowLeft size={14} />
                Back
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-text-heading translate-y-0.5">
              <Image
                src="/aiven-logo.png"
                alt="Aiven"
                width={24}
                height={24}
              />
              Aiven
            </div>
            <div className="flex flex-1 justify-end">
              <DarkModeToggle />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <StaggerContainer className="flex flex-col items-center space-y-8" stagger={0.12}>
              <StaggerItem>
                <SectionHeading
                  size="hero"
                  kicker="Design System"
                  gradient
                >
                  Solution for Marketing-Product Design Drift
                </SectionHeading>
              </StaggerItem>

              <StaggerItem>
                <p className="max-w-lg text-lg leading-relaxed text-text-body sm:text-xl">
                  A token-based system that keeps marketing pages and product UI
                  visually consistent.
                </p>
              </StaggerItem>

            </StaggerContainer>

            <ScrollReveal delay={0.5}>
              <dl className="mt-16 grid gap-8 border-t border-aiven-grey-10 pt-6 text-sm dark:border-aiven-grey-80 sm:grid-cols-3 sm:gap-12">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                    Scope
                  </dt>
                  <dd className="mt-2 text-text-heading">
                    Tokens, primitives, composition
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                    Library
                  </dt>
                  <dd className="mt-2 text-text-heading">
                    13 shared components
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                    Result
                  </dt>
                  <dd className="mt-2 text-text-heading">
                    Marketing + product, one token set
                  </dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>

          <ScrollChevron />
        </SectionWrapper>

        {/* ── Insight (unchanged) ── */}
        <SectionWrapper padding="py-20">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <SectionHeading kicker="Insight">
                Design drift starts at the token level, not the layout level.
              </SectionHeading>
              <Prose>
                <p>
                  When teams override colors, type scales, radii, or motion
                  values locally, the two surfaces stop looking like they belong
                  to the same product. The fix is shared tokens, not shared
                  layouts.
                </p>
              </Prose>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="mt-10 border-l-2 border-aiven-secondary-60 pl-6 dark:border-aiven-secondary-40">
                <blockquote className="max-w-2xl text-xl font-semibold tracking-tight text-text-heading sm:text-2xl">
                  Lock the tokens and primitives; let composition vary by
                  context.
                </blockquote>
              </div>
            </ScrollReveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {principles.map((principle, index) => (
                <ScrollReveal
                  delay={0.08 + index * 0.05}
                  key={principle.title}
                >
                  <div className="border-t border-aiven-grey-10 pt-4 dark:border-aiven-grey-80">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 text-base font-semibold text-text-heading">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-body">
                      {principle.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ── Architecture (unchanged) ── */}
        <SectionWrapper padding="py-24">
          <ScrollReveal>
            <SectionHeading
              kicker="Architecture"
              description="Strict at the token and behavior layers, flexible at the composition layer. Each layer has a single responsibility."
            >
              Four-layer architecture
            </SectionHeading>
          </ScrollReveal>

          <div className="mt-12">
            <LayerStack>
              <LayerStack.Layer
                number={1}
                title="Token layer"
                description="Colors, radii, shadows, and type defined once as CSS custom properties. Consumed by all components."
              >
                <div className="space-y-8">
                  <ColorPalette scales={["Primary", "Secondary", "Grey"]} />
                  <TokenShowcase />
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-text-heading">
                      Type scale
                    </h4>
                    <p className="mb-4 max-w-2xl text-sm leading-relaxed text-text-body">
                      Marketing uses the large end of the scale; product uses
                      the small end. Both pull from the same set of sizes.
                    </p>
                    <TypeScaleStrip />
                  </div>
                </div>
              </LayerStack.Layer>

              <LayerStack.Layer
                number={2}
                title="Behavioral layer"
                description="Unstyled primitives handle accessibility, keyboard navigation, and state management. No visual styling at this layer."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {guarantees.map((guarantee, index) => (
                    <div
                      key={guarantee.title}
                      className="rounded-2xl border border-aiven-grey-10 bg-white/80 p-4 dark:border-aiven-grey-80 dark:bg-aiven-grey-100/80"
                    >
                      <p className="text-sm font-medium text-text-heading">
                        {index + 1}. {guarantee.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-body">
                        {guarantee.description}
                      </p>
                    </div>
                  ))}
                </div>
              </LayerStack.Layer>

              <LayerStack.Layer
                number={3}
                title="Styling layer"
                description="Tailwind utility classes map tokens onto primitives. Each component gets brand-consistent styling plus the behavior from layer 2."
              >
                <PrimitiveToStyled />
              </LayerStack.Layer>

              <LayerStack.Layer
                number={4}
                title="Composition layer"
                description="Marketing and product diverge here: layout density, spacing, and content rhythm change while components and tokens stay shared."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-aiven-grey-10 bg-white/80 p-4 dark:border-aiven-grey-80 dark:bg-aiven-grey-100/80">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                      Marketing composition
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="h-2.5 w-16 rounded-full bg-aiven-secondary-20 dark:bg-aiven-secondary-90" />
                      <div className="space-y-2">
                        <div className="h-8 rounded-xl bg-aiven-grey-5 dark:bg-aiven-grey-90" />
                        <div className="h-3 w-4/5 rounded-full bg-aiven-grey-10 dark:bg-aiven-grey-80" />
                        <div className="h-3 w-3/5 rounded-full bg-aiven-grey-10 dark:bg-aiven-grey-80" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-10 w-32 rounded-md bg-aiven-secondary-60" />
                        <div className="h-10 w-24 rounded-md border border-aiven-grey-20 dark:border-aiven-grey-70" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-aiven-grey-10 bg-white/80 p-4 dark:border-aiven-grey-80 dark:bg-aiven-grey-100/80">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                      Product composition
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="h-3 w-28 rounded-full bg-aiven-grey-10 dark:bg-aiven-grey-80" />
                        <div className="h-6 w-16 rounded-full bg-aiven-success-10 dark:bg-aiven-success-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-10 rounded-md border border-aiven-grey-20 dark:border-aiven-grey-70" />
                        <div className="h-10 rounded-md border border-aiven-grey-20 dark:border-aiven-grey-70" />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="h-3 w-24 rounded-full bg-aiven-grey-10 dark:bg-aiven-grey-80" />
                        <div className="h-6 w-10 rounded-full bg-aiven-secondary-60/40 dark:bg-aiven-secondary-40/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </LayerStack.Layer>
            </LayerStack>
          </div>
        </SectionWrapper>

        {/* ── Proof — single elevated toggle ── */}
        <SectionWrapper className="bg-aiven-secondary-0 dark:bg-aiven-grey-100" padding="py-24">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <SectionHeading
                kicker="Proof"
                description="Identical components and tokens in both contexts. Only the layout composition differs."
              >
                Side-by-side comparison
              </SectionHeading>
            </ScrollReveal>

            <div className="mt-12">
              <ContextToggle />
            </div>
          </div>
        </SectionWrapper>

        {/* ── Component Library — tabbed catalog ── */}
        <SectionWrapper padding="py-24" background="dots">
          <ScrollReveal>
            <SectionHeading
              kicker="Library"
              description="13 components grouped by function. Each one works in both marketing and product contexts."
            >
              Component library
            </SectionHeading>
          </ScrollReveal>

          <div className="mt-10">
            <ComponentGrid />
          </div>
        </SectionWrapper>

        {/* ── Outcome — editorial closing ── */}
        <SectionWrapper padding="py-24">
          <ScrollReveal>
            <div className="text-center">
              <SectionHeading kicker="Outcome" gradient size="hero" level={2}>
                Shared tokens,
                <br />
                independent composition.
              </SectionHeading>
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-16 max-w-2xl space-y-10">
            {outcomes.map((outcome, index) => (
              <ScrollReveal key={outcome.label} delay={0.06 + index * 0.06}>
                <div className="flex gap-4">
                  <IconCircleCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-aiven-success-40 dark:text-aiven-success-30"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-aiven-secondary-60 dark:text-aiven-secondary-50">
                      {outcome.label}
                    </p>
                    <p className="mt-2 text-lg leading-relaxed text-text-heading sm:text-xl">
                      {outcome.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 flex justify-center">
              <Link
                className="inline-flex items-center gap-2 rounded-lg border border-aiven-grey-20 bg-white px-6 py-3 text-sm font-medium whitespace-nowrap text-text-heading shadow-sm transition-colors hover:bg-aiven-grey-0 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 dark:border-aiven-grey-70 dark:bg-aiven-grey-90 dark:hover:bg-aiven-grey-80"
                href="/aiven"
              >
                <IconArrowLeft size={16} />
                Back to projects
              </Link>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </main>
    </div>
  );
}
