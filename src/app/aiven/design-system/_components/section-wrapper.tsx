"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

type Background = "default" | "glow" | "grid" | "dark" | "dots";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  flexInner?: boolean;
  innerClassName?: string;
  background?: Background;
  padding?: string;
}

export function SectionWrapper({
  children,
  className,
  flexInner,
  innerClassName,
  background = "default",
  padding = "py-24",
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        padding,
        background === "dark" && "bg-aiven-grey-100",
        background === "dots" && "bg-dots",
        className,
      )}
    >
      {background === "glow" && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aiven-secondary-60/5 blur-[120px] dark:bg-aiven-secondary-60/10"
        />
      )}

      {background === "grid" && (
        <AnimatedGridPattern
          className="h-[200%] inset-x-0 inset-y-[-30%] skew-y-6 opacity-30"
          duration={3}
          maxOpacity={0.12}
          numSquares={25}
          opacity={0.08}
          repeatDelay={1.5}
        />
      )}

      <div
        className={cn(
          "relative mx-auto max-w-5xl px-6",
          flexInner && "flex flex-1 flex-col",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
