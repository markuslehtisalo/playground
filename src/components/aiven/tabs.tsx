"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

/* ── Root ── */

type TabsRootProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root>;

export function TabsRoot({ className, ...props }: TabsRootProps) {
  return <BaseTabs.Root className={cn(className)} {...props} />;
}

/* ── List ── */

type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      className={cn(
        "border-b border-aiven-grey-10 flex gap-1 items-center relative dark:border-aiven-grey-80",
        className,
      )}
      {...props}
    />
  );
}

/* ── Tab ── */

type TabProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>;

export function Tab({ className, ...props }: TabProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        "cursor-pointer font-medium gap-2 inline-flex items-center outline-none px-4 py-2.5 select-none text-aiven-grey-60 text-sm transition-colors dark:text-aiven-grey-30 data-active:text-aiven-primary-80 dark:data-active:text-aiven-primary-50 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 hover:text-aiven-grey-100 dark:hover:text-aiven-grey-0",
        className,
      )}
      {...props}
    />
  );
}

/* ── Indicator ── */

type TabsIndicatorProps = React.ComponentPropsWithoutRef<
  typeof BaseTabs.Indicator
>;

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <BaseTabs.Indicator
      className={cn(
        "absolute bg-aiven-primary-80 bottom-0 duration-200 ease-out h-0.5 transition-all dark:bg-aiven-primary-50",
        className,
      )}
      renderBeforeHydration
      {...props}
    />
  );
}

/* ── Panel ── */

type TabsPanelProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>;

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel className={cn("outline-none", className)} {...props} />
  );
}

/* ── Compound export ── */

export const Tabs = {
  Indicator: TabsIndicator,
  List: TabsList,
  Panel: TabsPanel,
  Root: TabsRoot,
  Tab,
};
