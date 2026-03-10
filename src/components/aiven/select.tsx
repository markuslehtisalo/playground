"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function SelectRoot(props: React.ComponentPropsWithoutRef<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-aiven-grey-20 bg-white px-3.5 text-sm text-aiven-grey-100 outline-none transition-colors",
        "dark:border-aiven-grey-60 dark:bg-aiven-grey-100 dark:text-aiven-grey-0",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:-outline-offset-1",
        "data-[placeholder]:text-aiven-grey-30 dark:data-[placeholder]:text-aiven-grey-40",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <IconChevronDown
          className="text-aiven-grey-40 transition-transform data-[popup-open]:rotate-180"
          size={16}
        />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectValue(
  props: React.ComponentPropsWithoutRef<typeof BaseSelect.Value>,
) {
  return <BaseSelect.Value {...props} />;
}

function SelectPortal(
  props: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>,
) {
  return <BaseSelect.Portal {...props} />;
}

function SelectPopup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Positioner className="outline-none" sideOffset={4}>
      <BaseSelect.Popup
        className={cn(
          "max-h-[var(--available-height)] min-w-[var(--anchor-width)] overflow-auto rounded-md border border-aiven-grey-10 bg-white p-1 shadow-lg outline-none",
          "dark:border-aiven-grey-80 dark:bg-aiven-grey-100",
          "origin-[var(--transform-origin)] transition-[opacity,transform] duration-150",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className,
        )}
        {...props}
      />
    </BaseSelect.Positioner>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        "flex items-center gap-2 rounded px-2 py-1.5 text-sm text-aiven-grey-100 outline-none select-none",
        "dark:text-aiven-grey-0",
        "data-[highlighted]:bg-aiven-primary-5 dark:data-[highlighted]:bg-aiven-primary-100",
        "cursor-pointer data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemIndicator className="flex text-aiven-primary-80">
        <IconCheck size={14} />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectGroup(
  props: React.ComponentPropsWithoutRef<typeof BaseSelect.Group>,
) {
  return <BaseSelect.Group {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-aiven-grey-40",
        className,
      )}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("my-1 h-px bg-aiven-grey-10 dark:bg-aiven-grey-80", className)}
      role="separator"
      {...props}
    />
  );
}

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Portal: SelectPortal,
  Popup: SelectPopup,
  Item: SelectItem,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
});
