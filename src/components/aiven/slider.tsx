"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseSlider.Root>,
    "children"
  > {
  children?: React.ReactNode;
}

export function SliderRoot({ className, children, ...props }: SliderProps) {
  return (
    <BaseSlider.Root
      className={cn("flex flex-col gap-2 w-full", className)}
      {...props}
    >
      <BaseSlider.Control className="flex items-center h-5 cursor-pointer data-[disabled]:cursor-not-allowed">
        <BaseSlider.Track className="relative flex items-center h-1.5 w-full rounded-full bg-aiven-grey-10 dark:bg-aiven-grey-80">
          <BaseSlider.Indicator className="h-full rounded-full bg-aiven-primary-80" />
          <BaseSlider.Thumb className="size-5 rounded-full border-2 border-aiven-primary-80 bg-white shadow-sm outline-none transition-shadow focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 data-[dragging]:shadow-md dark:bg-aiven-grey-100" />
        </BaseSlider.Track>
      </BaseSlider.Control>
      {children}
    </BaseSlider.Root>
  );
}

function SliderValue({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseSlider.Value>) {
  return (
    <BaseSlider.Value
      className={cn("text-sm text-aiven-grey-60 dark:text-aiven-grey-30", className)}
      {...props}
    />
  );
}

export const Slider = Object.assign(SliderRoot, {
  Value: SliderValue,
});
