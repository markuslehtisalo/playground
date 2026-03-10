"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";

/* ── Root ── */

type AccordionRootProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Root
>;

export function AccordionRoot({ className, ...props }: AccordionRootProps) {
  return <BaseAccordion.Root className={cn(className)} {...props} />;
}

/* ── Item ── */

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Item
>;

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cn(
        "border-b border-aiven-grey-10 dark:border-aiven-grey-80",
        className,
      )}
      {...props}
    />
  );
}

/* ── Header ── */

type AccordionHeaderProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Header
>;

export function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  return <BaseAccordion.Header className={cn(className)} {...props} />;
}

/* ── Trigger ── */

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Trigger
>;

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      className={cn(
        "cursor-pointer flex font-medium items-center justify-between outline-none py-4 text-left text-aiven-grey-100 text-sm transition-colors w-full [&[data-panel-open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-200 dark:text-aiven-grey-0 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 hover:text-aiven-primary-80 dark:hover:text-aiven-primary-50",
        className,
      )}
      {...props}
    >
      {children}
      <IconChevronDown className="shrink-0 size-4 text-aiven-grey-40" />
    </BaseAccordion.Trigger>
  );
}

/* ── Panel ── */

type AccordionPanelProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Panel
>;

export function AccordionPanel({ className, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={cn(
        "duration-200 ease-out overflow-hidden text-aiven-grey-60 text-sm transition-[height] dark:text-aiven-grey-30 data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      {...props}
    />
  );
}

/* ── Compound export ── */

export const Accordion = {
  Header: AccordionHeader,
  Item: AccordionItem,
  Panel: AccordionPanel,
  Root: AccordionRoot,
  Trigger: AccordionTrigger,
};
