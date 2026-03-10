"use client";

import { motion, useReducedMotion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";

export function ScrollChevron() {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer rounded-full p-1 outline-none transition-colors hover:text-aiven-grey-60 focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: prefersReducedMotion ? 0 : 0.6 }}
      onClick={handleClick}
      type="button"
      aria-label="Scroll down"
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <IconChevronDown size={24} className="text-aiven-grey-40" />
      </motion.div>
    </motion.button>
  );
}
