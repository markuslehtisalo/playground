"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { ctaLabels, ctaIcons } from "../../_config/content-types";
import { ContentTypeBadge } from "../../_components/content-type-badge";
import { TechnologyPill } from "../../_components/technology-pill";
import type { Resource, ContentType } from "@/lib/sanity/types";
import {
  IconChevronRight,
  IconClock,
  IconCalendar,
} from "@tabler/icons-react";

const contentTypeGradients: Record<ContentType, string> = {
  ebook: "from-aiven-error-90 to-aiven-grey-100",
  "live-video": "from-aiven-error-90 to-aiven-grey-100",
  podcast: "from-aiven-success-90 to-aiven-grey-100",
  report: "from-aiven-grey-70 to-aiven-grey-100",
  tool: "from-aiven-info-90 to-aiven-grey-100",
  webinar: "from-aiven-warning-90 to-aiven-grey-100",
  workshop: "from-aiven-success-90 to-aiven-grey-100",
  "white-paper": "from-aiven-grey-70 to-aiven-grey-100",
};

const primaryButtonStyles = "bg-aiven-secondary-60 hover:bg-aiven-secondary-70 active:bg-aiven-secondary-80";

interface DetailHeroProps {
  resource: Resource;
}

export function DetailHero({ resource }: DetailHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const dur = reducedMotion ? 0 : 0.5;
  const imageUrl = resource.heroImage
    ? urlFor(resource.heroImage).width(1600).height(800).url()
    : null;
  const CtaIcon = ctaIcons[resource.contentType];

  return (
    <section className="relative min-h-[50vh] flex items-end overflow-hidden border-b border-aiven-grey-80">
      {/* Background */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className={cn("absolute inset-0 bg-linear-to-br", contentTypeGradients[resource.contentType])} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-aiven-grey-100 via-aiven-grey-100/70 to-aiven-grey-100/30" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-32"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reducedMotion ? 0 : 0.1 },
          },
        }}
      >
        {/* Breadcrumb */}
        <motion.nav
          className="mb-4 flex items-center gap-1 text-xs text-aiven-grey-40"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Link
            href="/aiven/resource-center"
            className="cursor-pointer transition-colors hover:text-aiven-grey-20"
          >
            Resource Center
          </Link>
          <IconChevronRight size={12} />
          <span className="text-aiven-grey-30 capitalize">
            {resource.contentType.replace("-", " ")}
          </span>
        </motion.nav>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          <ContentTypeBadge contentType={resource.contentType} />
        </motion.div>

        <motion.h1
          className="mt-3 text-3xl font-bold tracking-tight text-aiven-grey-0 sm:text-4xl lg:text-5xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          {resource.title}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-2xl text-lg text-aiven-grey-30"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          {resource.description}
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap items-center gap-3"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          {resource.technologies?.map((tech) => (
            <TechnologyPill key={tech._id} technology={tech} />
          ))}
          {resource.duration && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-aiven-grey-70 bg-aiven-grey-90/50 px-3 py-1 text-xs text-aiven-grey-30">
              <IconClock size={12} />
              {resource.duration}
            </span>
          )}
          {resource.publishedAt && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-aiven-grey-70 bg-aiven-grey-90/50 px-3 py-1 text-xs text-aiven-grey-30">
              <IconCalendar size={12} />
              {new Date(resource.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </motion.div>

        <motion.div
          className="mt-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        >
          {resource.externalUrl ? (
            <a
              href={resource.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-md px-6 h-12 text-base font-medium text-white transition-colors",
                primaryButtonStyles,
              )}
            >
              <CtaIcon size={16} />
              {ctaLabels[resource.contentType]}
            </a>
          ) : (
            <button
              disabled
              title="Coming soon"
              className="inline-flex items-center justify-center gap-2.5 rounded-md px-6 h-12 text-base font-medium text-white opacity-60 cursor-not-allowed bg-aiven-grey-60"
            >
              <CtaIcon size={16} />
              {ctaLabels[resource.contentType]}
            </button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
