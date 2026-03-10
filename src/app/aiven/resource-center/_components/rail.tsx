"use client";

import { useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { ResourceCard } from "./resource-card";
import type { LandingResource } from "@/lib/sanity/types";

type CardStyle = "hero" | "large" | "standard" | "compact";

interface RailProps {
  title: string;
  description?: string;
  resources: LandingResource[];
  cardStyle?: CardStyle;
  className?: string;
  icon?: React.ReactNode;
  markerColor?: string;
}

export function Rail({
  title,
  description,
  resources,
  cardStyle = "standard",
  className,
  icon,
  markerColor = "bg-aiven-secondary-60",
}: RailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const dur = reducedMotion ? 0 : 0.4;

  // Triple the resources for infinite scroll illusion
  const loopedResources = useMemo(() => {
    if (resources.length < 2) return resources;
    return [...resources, ...resources, ...resources];
  }, [resources]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || resources.length < 2) return;

    // If we've scrolled near the start or end of the tripled list,
    // jump to the middle copy (no visible change since content is identical)
    const oneSetWidth = el.scrollWidth / 3;

    if (el.scrollLeft < oneSetWidth * 0.1) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft += oneSetWidth;
      el.style.scrollBehavior = "";
    } else if (el.scrollLeft > oneSetWidth * 2.5) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= oneSetWidth;
      el.style.scrollBehavior = "";
    }
  }, [resources.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || resources.length < 2) return;

    // Start scrolled to the middle copy
    const oneSetWidth = el.scrollWidth / 3;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = oneSetWidth;
    el.style.scrollBehavior = "";

    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll, resources]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollTo({
      left: el.scrollLeft + (direction === "left" ? -amount : amount),
      behavior: "smooth",
    });
  };

  if (resources.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: dur }}
      className={cn("relative", className)}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: dur }}
        className="mb-4 px-6"
      >
        <div className="flex items-center gap-2.5">
          <div className={cn("h-5 w-1 rounded-full", markerColor)} />
          {icon && <span className="ml-0.5 text-aiven-grey-30">{icon}</span>}
          <h2 className="text-lg font-semibold text-aiven-grey-0">
            {title}{" "}
            <span className="hidden text-aiven-grey-40 font-normal sm:inline">({resources.length})</span>
          </h2>
        </div>
        {description && (
          <p className="mt-1 pl-4 text-sm text-aiven-grey-40">{description}</p>
        )}
      </motion.div>

      {/* Scrollable area */}
      <div className="group/rail relative">
        {/* Navigation arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-aiven-grey-90/90 p-2 text-aiven-grey-20 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/rail:opacity-100 focus-visible:opacity-100 hover:bg-aiven-grey-80"
          aria-label="Scroll left"
        >
          <IconChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-aiven-grey-90/90 p-2 text-aiven-grey-20 opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/rail:opacity-100 focus-visible:opacity-100 hover:bg-aiven-grey-80"
          aria-label="Scroll right"
        >
          <IconChevronRight size={20} />
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 bg-gradient-to-r from-aiven-grey-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 bg-gradient-to-l from-aiven-grey-100 to-transparent" />

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-6 pb-2 scrollbar-hide"
        >
          {loopedResources.map((resource, i) => (
            <div key={`${resource._id}-${i}`}>
              <ResourceCard resource={resource} style={cardStyle} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
