"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { personas } from "../_config/personas";

interface PersonaSelectorProps {
  onSelect: (personaId: string) => void;
  selectedPersona: string | null;
  isLoading: boolean;
}

export function PersonaSelector({
  onSelect,
  selectedPersona,
  isLoading,
}: PersonaSelectorProps) {
  const reducedMotion = usePrefersReducedMotion();

  const handleSelect = (id: string) => {
    if (selectedPersona === id) {
      onSelect("");
      return;
    }
    onSelect(id);
  };

  return (
    <section className="px-6 py-12">
      <h2 className="mb-6 text-center text-xl font-semibold text-aiven-grey-0">
        What describes you best?
      </h2>
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {personas.map((persona) => {
          const isSelected = selectedPersona === persona.id;
          const isSelectedLoading = isSelected && isLoading;
          return (
            <motion.button
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              disabled={isLoading}
              aria-pressed={isSelected}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-5 text-center transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-aiven-secondary-80 focus-visible:outline-offset-2",
                isSelected
                  ? "border-aiven-secondary-60 bg-aiven-secondary-90/40 shadow-lg shadow-aiven-secondary-100/20"
                  : "border-aiven-grey-70 bg-aiven-grey-90/60 hover:border-aiven-grey-50 hover:bg-aiven-grey-80/60",
                isLoading && !isSelected && "opacity-40",
              )}
              whileTap={reducedMotion ? {} : { scale: 0.97 }}
            >
              <persona.icon
                size={28}
                strokeWidth={1.5}
                className={cn(
                  "transition-colors",
                  isSelected
                    ? "text-aiven-secondary-50"
                    : "text-aiven-grey-30",
                )}
              />
              <span className="text-sm font-medium text-aiven-grey-0">
                {persona.title}
              </span>
              <span className="text-xs text-aiven-grey-40">
                {persona.description}
              </span>
              {isSelectedLoading && (
                <motion.div
                  className="h-0.5 w-full overflow-hidden rounded-full bg-aiven-grey-70 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-aiven-secondary-60 rounded-full"
                    initial={reducedMotion ? { x: 0 } : { x: "-100%" }}
                    animate={reducedMotion ? { x: 0 } : { x: "100%" }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
