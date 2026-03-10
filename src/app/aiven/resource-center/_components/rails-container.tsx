"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconStar,
  IconClock,
  IconPresentation,
  IconBook,
  IconTool,
  IconMicrophone,
  IconSchool,
  IconFileReport,
} from "@tabler/icons-react";
import { HeroSection } from "./hero-section";
import { PersonaSelector } from "./persona-selector";
import { Rail } from "./rail";
import { SkeletonRail } from "./skeleton-rail";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { LandingResource, RailConfig } from "@/lib/sanity/types";

const railIcons: Record<string, React.ReactNode> = {
  featured: <IconStar size={18} />,
  latest: <IconClock size={18} />,
  webinars: <IconPresentation size={18} />,
  ebooks: <IconBook size={18} />,
  tools: <IconTool size={18} />,
  podcasts: <IconMicrophone size={18} />,
  workshops: <IconSchool size={18} />,
  reports: <IconFileReport size={18} />,
};

const railMarkerColors: Record<string, string> = {
  featured: "bg-aiven-secondary-60",
  latest: "bg-aiven-secondary-60",
  webinars: "bg-aiven-warning-60",
  ebooks: "bg-aiven-error-60",
  tools: "bg-aiven-info-60",
  podcasts: "bg-aiven-success-60",
  workshops: "bg-aiven-success-60",
  reports: "bg-aiven-grey-50",
};

interface RailsContainerProps {
  allResources: LandingResource[];
}

function buildDefaultRails(resources: LandingResource[]): RailConfig[] {
  const featured = resources.filter((r) => r.featured);
  const latest = resources.slice(0, 10);
  const webinars = resources.filter((r) => r.contentType === "webinar");
  const ebooks = resources.filter((r) => r.contentType === "ebook");
  const tools = resources.filter((r) => r.contentType === "tool");
  const podcasts = resources.filter((r) => r.contentType === "podcast");
  const workshops = resources.filter((r) => r.contentType === "workshop");
  const reports = resources.filter(
    (r) => r.contentType === "report" || r.contentType === "white-paper",
  );

  const rails: RailConfig[] = [];

  if (featured.length > 0) {
    rails.push({
      id: "featured",
      title: "Featured",
      resourceSlugs: featured.map((r) => r.slug.current),
      style: "hero",
    });
  }
  if (latest.length > 0) {
    rails.push({
      id: "latest",
      title: "Latest Resources",
      description: "Recently published content across all categories",
      resourceSlugs: latest.map((r) => r.slug.current),
      style: "large",
    });
  }
  if (webinars.length > 0) {
    rails.push({
      id: "webinars",
      title: "Webinars",
      description: "On-demand presentations and live sessions",
      resourceSlugs: webinars.map((r) => r.slug.current),
      style: "standard",
    });
  }
  if (ebooks.length > 0) {
    rails.push({
      id: "ebooks",
      title: "E-books & Guides",
      description: "In-depth reading on data infrastructure",
      resourceSlugs: ebooks.map((r) => r.slug.current),
      style: "standard",
    });
  }
  if (tools.length > 0) {
    rails.push({
      id: "tools",
      title: "Interactive Tools",
      description: "Calculators, visualizers, and utilities",
      resourceSlugs: tools.map((r) => r.slug.current),
      style: "standard",
    });
  }
  if (podcasts.length > 0) {
    rails.push({
      id: "podcasts",
      title: "Podcasts",
      description: "Conversations with industry experts",
      resourceSlugs: podcasts.map((r) => r.slug.current),
      style: "compact",
    });
  }
  if (workshops.length > 0) {
    rails.push({
      id: "workshops",
      title: "Hands-On Workshops",
      description: "Guided tutorials for practical skills",
      resourceSlugs: workshops.map((r) => r.slug.current),
      style: "standard",
    });
  }
  if (reports.length > 0) {
    rails.push({
      id: "reports",
      title: "Reports & White Papers",
      description: "Research and strategic analysis",
      resourceSlugs: reports.map((r) => r.slug.current),
      style: "compact",
    });
  }

  return rails;
}

export function RailsContainer({ allResources }: RailsContainerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [personalizedRails, setPersonalizedRails] = useState<
    RailConfig[] | null
  >(null);

  const defaultRails = useMemo(
    () => buildDefaultRails(allResources),
    [allResources],
  );

  const resourceMap = useMemo(() => {
    const map = new Map<string, LandingResource>();
    for (const r of allResources) {
      map.set(r.slug.current, r);
    }
    return map;
  }, [allResources]);

  const resolveRail = useCallback(
    (config: RailConfig): LandingResource[] => {
      return config.resourceSlugs
        .map((slug) => resourceMap.get(slug))
        .filter((r): r is LandingResource => r !== undefined);
    },
    [resourceMap],
  );

  const abortRef = useRef<AbortController | null>(null);

  const handlePersonaSelect = useCallback(
    async (personaId: string) => {
      abortRef.current?.abort();

      if (!personaId) {
        setSelectedPersona(null);
        setPersonalizedRails(null);
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      setSelectedPersona(personaId);
      setIsLoading(true);

      try {
        const res = await fetch("/api/personalize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ persona: personaId }),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Personalization failed");

        const data = await res.json();
        setPersonalizedRails(data.rails);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        // Fall back to default rails on error
        setPersonalizedRails(null);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const activeRails = personalizedRails ?? defaultRails;

  return (
    <>
      <HeroSection />

      <PersonaSelector
        onSelect={handlePersonaSelect}
        selectedPersona={selectedPersona}
        isLoading={isLoading}
      />

      <div className="space-y-14 pb-20">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="space-y-14"
            >
              <div className="flex flex-col items-center gap-3 px-6 pb-4">
                <div className="flex items-center gap-2 text-sm text-aiven-grey-30">
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-aiven-secondary-60 border-t-transparent"
                    animate={reducedMotion ? {} : { rotate: 360 }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Customizing your resource library with AI...
                </div>
                <p className="text-xs text-aiven-grey-50">
                  Sit tight, this usually takes around 15–20 seconds
                </p>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRail key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={personalizedRails ? "personalized" : "default"}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
              transition={{ duration: reducedMotion ? 0 : 0.4 }}
              className="space-y-14"
            >
              {activeRails.map((rail) => (
                <Rail
                  key={rail.id}
                  title={rail.title}
                  description={rail.description}
                  resources={resolveRail(rail)}
                  cardStyle={rail.style}
                  icon={railIcons[rail.id]}
                  markerColor={railMarkerColors[rail.id]}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
