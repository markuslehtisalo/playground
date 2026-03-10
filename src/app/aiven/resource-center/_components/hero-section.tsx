"use client";

import { motion } from "motion/react";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { IconChevronDown } from "@tabler/icons-react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const dur = reducedMotion ? 0 : 0.6;

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-14 text-center">
      <AnimatedGridPattern
        className="h-[200%] inset-x-0 inset-y-[-30%] skew-y-6 opacity-30"
        duration={3}
        maxOpacity={0.15}
        numSquares={30}
        opacity={0.1}
        repeatDelay={1.5}
      />

      <motion.div
        className="relative z-10 max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reducedMotion ? 0 : 0.15 },
          },
        }}
      >
        <motion.p
          className="mb-4 text-sm font-medium tracking-wider text-aiven-secondary-50 uppercase"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          Welcome to your
        </motion.p>

        <motion.h1
          className="text-5xl font-bold tracking-tight sm:text-6xl"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bg-gradient-to-r from-aiven-grey-0 via-aiven-secondary-30 to-aiven-secondary-50 bg-clip-text text-transparent">
            Go-to source for
          </span>
          <br />
          <span className="text-aiven-grey-0">data insights</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-lg text-lg text-aiven-grey-30"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          Tell us what you do and get a library worth bookmarking
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 z-10 cursor-pointer rounded-full p-2 text-aiven-grey-40 transition-colors hover:text-aiven-grey-20 focus-visible:outline-2 focus-visible:outline-aiven-secondary-80 focus-visible:outline-offset-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.2, duration: dur }}
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight * 0.7,
            behavior: "smooth",
          })
        }
        aria-label="Scroll down"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <IconChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}
