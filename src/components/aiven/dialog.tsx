"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function DialogRoot(
  props: React.ComponentPropsWithoutRef<typeof BaseDialog.Root>,
) {
  return <BaseDialog.Root {...props} />;
}

function DialogTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger className={className} {...props} />;
}

function DialogPortal(
  props: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>,
) {
  return <BaseDialog.Portal keepMounted {...props} />;
}

function DialogBackdrop({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200",
        "data-[starting-style]:opacity-0",
        "data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogPopup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg border border-aiven-grey-10 bg-white p-6 shadow-xl outline-none",
        "dark:border-aiven-grey-80 dark:bg-aiven-grey-100",
        "transition-[opacity,transform] duration-200",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={cn(
        "text-lg font-semibold text-aiven-grey-100 dark:text-aiven-grey-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      className={cn(
        "mt-2 text-sm text-aiven-grey-50 dark:text-aiven-grey-30",
        className,
      )}
      {...props}
    />
  );
}

function DialogClose({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseDialog.Close>) {
  return (
    <BaseDialog.Close
      aria-label={children ? undefined : "Close"}
      className={cn(
        "absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-aiven-grey-40 transition-colors hover:bg-aiven-grey-0 hover:text-aiven-grey-60 outline-none cursor-pointer focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 dark:hover:bg-aiven-grey-90 dark:hover:text-aiven-grey-20",
        className,
      )}
      {...props}
    >
      {children ?? <IconX size={16} />}
    </BaseDialog.Close>
  );
}

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});
