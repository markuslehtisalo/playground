"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function SelectionCard({
  selected,
  onClick,
  children,
  className,
}: SelectionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={cn(
        "relative text-left rounded-lg border transition-shadow outline-none cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2",
        selected
          ? "border-aiven-primary-80 bg-white shadow-md dark:border-aiven-primary-60 dark:bg-aiven-grey-100"
          : "border-aiven-grey-10 bg-white hover:border-aiven-grey-20 hover:shadow-sm dark:border-aiven-grey-80 dark:bg-aiven-grey-100 dark:hover:border-aiven-grey-60",
        className,
      )}
    >
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 25 }}
            className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-aiven-primary-80 text-white dark:bg-aiven-primary-60"
          >
            <IconCheck size={12} strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}
