"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconSpeakerphone, IconSettings } from "@tabler/icons-react";
import { MarketingComposition, ProductComposition } from "./bridge-demo";

type Context = "marketing" | "product";

const ease = [0.16, 1, 0.3, 1] as const;

const options: { icon: typeof IconSpeakerphone; label: string; value: Context }[] = [
  { icon: IconSpeakerphone, label: "Marketing", value: "marketing" },
  { icon: IconSettings, label: "Product", value: "product" },
];

export function ContextToggle() {
  const [context, setContext] = useState<Context>("marketing");
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeButton = container.querySelector<HTMLButtonElement>(
      `[data-value="${context}"]`,
    );
    if (!activeButton) return;
    setPillStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
    });
  }, [context]);

  return (
    <div className="space-y-8">
      {/* Segmented control with sliding pill */}
      <div
        ref={containerRef}
        role="group"
        aria-label="View context"
        className="relative inline-flex rounded-xl border border-aiven-grey-20 bg-white p-1 dark:border-aiven-grey-70 dark:bg-aiven-grey-90"
      >
        <motion.div
          className="absolute inset-y-1 rounded-lg bg-aiven-grey-100 shadow-sm dark:bg-white/20"
          animate={pillStyle}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease,
          }}
          aria-hidden="true"
        />
        {options.map((option) => (
          <button
            key={option.value}
            aria-pressed={context === option.value}
            data-value={option.value}
            className={cn(
              "relative z-10 inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200",
              context === option.value
                ? "text-white dark:text-white"
                : "text-aiven-grey-50 hover:text-aiven-grey-80 dark:text-aiven-grey-40 dark:hover:text-aiven-grey-20",
            )}
            onClick={() => setContext(option.value)}
            type="button"
          >
            <option.icon size={14} />
            {option.label}
          </button>
        ))}
      </div>

      {/* AnimatePresence crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={context}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.35,
            ease,
          }}
        >
          {context === "marketing" ? (
            <MarketingComposition />
          ) : (
            <ProductComposition />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
