"use client";

import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { Card, Separator } from "@/components/aiven";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { ctaLabels, ctaIcons } from "../../_config/content-types";
import { ContentTypeBadge } from "../../_components/content-type-badge";
import { TechnologyPill } from "../../_components/technology-pill";
import type { Resource, ContentType } from "@/lib/sanity/types";

const sidebarButtonStyles = "border border-aiven-secondary-60/30 bg-aiven-secondary-60/10 text-aiven-secondary-50 hover:bg-aiven-secondary-60/20 active:bg-aiven-secondary-60/30";

const takeawaysByType: Record<ContentType, string[]> = {
  ebook: [
    "Understand core architectural patterns for modern data platforms",
    "Learn best practices for data pipeline reliability and monitoring",
    "Discover strategies for cost optimization at scale",
  ],
  "live-video": [
    "Watch real-time demonstrations of platform capabilities",
    "Learn from live Q&A sessions with engineering experts",
    "See practical use cases and implementation patterns",
  ],
  podcast: [
    "Hear perspectives from industry practitioners and thought leaders",
    "Understand emerging trends in data infrastructure",
    "Get actionable insights for your own data strategy",
  ],
  report: [
    "Access data-driven analysis of industry trends and benchmarks",
    "Understand competitive landscape and market positioning",
    "Get strategic recommendations backed by research",
  ],
  tool: [
    "Explore interactive calculators and planning utilities",
    "Model scenarios for your specific infrastructure needs",
    "Export results and share findings with your team",
  ],
  webinar: [
    "See live demonstrations of key platform capabilities",
    "Hear from industry practitioners about real-world implementations",
    "Get answers to common technical questions in Q&A",
  ],
  workshop: [
    "Follow hands-on exercises with step-by-step guidance",
    "Build practical skills you can apply immediately",
    "Work with real-world datasets and scenarios",
  ],
  "white-paper": [
    "Dive deep into technical architecture and design decisions",
    "Evaluate trade-offs between different approaches",
    "Reference detailed benchmarks and performance data",
  ],
};

interface DetailBodyProps {
  resource: Resource;
}

const animVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function DetailBody({ resource }: DetailBodyProps) {
  const reducedMotion = usePrefersReducedMotion();
  const dur = reducedMotion ? 0 : 0.5;
  const takeaways = takeawaysByType[resource.contentType];
  const CtaIcon = ctaIcons[resource.contentType];

  return (
    <motion.div
      className="mx-auto max-w-6xl px-6 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
        },
      }}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main content column */}
        <article className="min-w-0">
          {/* Overview */}
          <motion.section variants={animVariants} transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}>
            <h2 className="text-xl font-semibold text-aiven-grey-0">
              Overview
            </h2>
            <Separator className="my-4" />
            <p className="text-base leading-relaxed text-aiven-grey-20">
              {resource.description}
            </p>
          </motion.section>

          {/* What You'll Learn */}
          <motion.section
            className="mt-12"
            variants={animVariants}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xl font-semibold text-aiven-grey-0">
              What You&apos;ll Learn
            </h2>
            <Separator className="my-4" />
            <ul className="space-y-3">
              {takeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <IconCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-aiven-success-60"
                  />
                  <span className="text-sm leading-relaxed text-aiven-grey-20">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Topics Covered */}
          {resource.topics?.length > 0 && (
            <motion.section
              className="mt-12"
              variants={animVariants}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-xl font-semibold text-aiven-grey-0 mb-4">
                Topics Covered
              </h2>
              <div className="flex flex-wrap gap-2">
                {resource.topics.map((topic) => (
                  <span
                    key={topic._id}
                    className="rounded-lg border border-aiven-grey-70 bg-aiven-grey-90 px-3 py-1.5 text-sm text-aiven-grey-20"
                  >
                    {topic.title}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            {/* Resource Info Card */}
            <Card>
              <Card.Header>
                <h3 className="text-sm font-semibold text-aiven-grey-0">
                  Resource Details
                </h3>
              </Card.Header>
              <Card.Body>
                <dl className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-aiven-grey-40">Type</dt>
                    <dd>
                      <ContentTypeBadge
                        contentType={resource.contentType}
                      />
                    </dd>
                  </div>
                  {resource.duration && (
                    <div className="flex items-center justify-between">
                      <dt className="text-aiven-grey-40">Duration</dt>
                      <dd className="text-aiven-grey-10">
                        {resource.duration}
                      </dd>
                    </div>
                  )}
                  {resource.publishedAt && (
                    <div className="flex items-center justify-between">
                      <dt className="text-aiven-grey-40">Published</dt>
                      <dd className="text-aiven-grey-10">
                        {new Date(resource.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              </Card.Body>
              <Card.Footer>
                {resource.externalUrl ? (
                  <a
                    href={resource.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 h-10 text-sm font-medium transition-colors",
                      sidebarButtonStyles,
                    )}
                  >
                    <CtaIcon size={16} />
                    {ctaLabels[resource.contentType]}
                  </a>
                ) : (
                  <button
                    disabled
                    title="Coming soon"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md px-4 h-10 text-sm font-medium opacity-60 cursor-not-allowed border border-aiven-grey-60/30 bg-aiven-grey-60/10 text-aiven-grey-40"
                  >
                    <CtaIcon size={16} />
                    {ctaLabels[resource.contentType]}
                  </button>
                )}
              </Card.Footer>
            </Card>

            {/* Technologies card */}
            {resource.technologies?.length > 0 && (
              <Card>
                <Card.Header>
                  <h3 className="text-sm font-semibold text-aiven-grey-0">
                    Technologies
                  </h3>
                </Card.Header>
                <Card.Body>
                  <div className="flex flex-wrap gap-2">
                    {resource.technologies.map((tech) => (
                      <TechnologyPill key={tech._id} technology={tech} />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
