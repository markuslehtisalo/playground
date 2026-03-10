import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import { ContentTypeBadge } from "./content-type-badge";
import { TechnologyPill } from "./technology-pill";
import type { LandingResource, ContentType } from "@/lib/sanity/types";

const contentTypeBorderHover: Record<ContentType, string> = {
  ebook: "hover:border-aiven-error-60",
  "live-video": "hover:border-aiven-error-60",
  podcast: "hover:border-aiven-success-60",
  report: "hover:border-aiven-grey-50",
  tool: "hover:border-aiven-info-60",
  webinar: "hover:border-aiven-warning-60",
  workshop: "hover:border-aiven-success-60",
  "white-paper": "hover:border-aiven-grey-50",
};


const contentTypeGradients: Record<ContentType, string> = {
  ebook: "from-aiven-error-90 via-aiven-error-100 to-aiven-grey-100",
  "live-video": "from-aiven-error-90 via-aiven-error-100 to-aiven-grey-100",
  podcast: "from-aiven-success-90 via-aiven-success-100 to-aiven-grey-100",
  report: "from-aiven-grey-70 via-aiven-grey-90 to-aiven-grey-100",
  tool: "from-aiven-info-90 via-aiven-info-100 to-aiven-grey-100",
  webinar: "from-aiven-warning-90 via-aiven-warning-100 to-aiven-grey-100",
  workshop: "from-aiven-success-90 via-aiven-success-100 to-aiven-grey-100",
  "white-paper": "from-aiven-grey-70 via-aiven-grey-90 to-aiven-grey-100",
};

type CardStyle = "hero" | "large" | "standard" | "compact";

interface ResourceCardProps {
  resource: LandingResource;
  style?: CardStyle;
  className?: string;
}

export function ResourceCard({
  resource,
  style = "standard",
  className,
}: ResourceCardProps) {
  const dims = imageDimensions[style];
  const imageUrl = resource.thumbnail
    ? urlFor(resource.thumbnail).width(dims.w).height(dims.h).url()
    : resource.heroImage
      ? urlFor(resource.heroImage).width(dims.w).height(dims.h).url()
      : null;

  return (
    <Link
      href={`/aiven/resource-center/${resource.slug.current}`}
      className={cn(
        "group/card relative flex shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-aiven-grey-80 bg-aiven-grey-90 transition-colors duration-300",
        "hover:shadow-lg",
        contentTypeBorderHover[resource.contentType],
        "focus-visible:outline-2 focus-visible:outline-aiven-secondary-80 focus-visible:outline-offset-2",
        styleClasses[style],
        className,
      )}
    >
      {style === "hero" ? (
        <HeroLayout resource={resource} imageUrl={imageUrl} />
      ) : style === "large" ? (
        <LargeLayout resource={resource} imageUrl={imageUrl} />
      ) : style === "compact" ? (
        <CompactLayout resource={resource} imageUrl={imageUrl} />
      ) : (
        <StandardLayout resource={resource} imageUrl={imageUrl} />
      )}
    </Link>
  );
}

const styleClasses: Record<CardStyle, string> = {
  hero: "w-[clamp(320px,40vw,480px)] aspect-[16/9]",
  large: "w-[clamp(260px,28vw,320px)] aspect-[3/4]",
  standard: "w-[clamp(230px,24vw,272px)] aspect-[4/5]",
  compact: "w-[clamp(180px,20vw,220px)] aspect-square",
};

const imageDimensions: Record<CardStyle, { w: number; h: number }> = {
  hero: { w: 960, h: 540 },
  large: { w: 640, h: 480 },
  standard: { w: 544, h: 400 },
  compact: { w: 440, h: 440 },
};

function CardImage({
  imageUrl,
  title,
  contentType,
  className,
}: {
  imageUrl: string | null;
  title: string;
  contentType: ContentType;
  className?: string;
}) {
  if (!imageUrl) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br",
          contentTypeGradients[contentType],
          className,
        )}
      />
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
      />
    </div>
  );
}

function HeroLayout({
  resource,
  imageUrl,
}: {
  resource: LandingResource;
  imageUrl: string | null;
}) {
  return (
    <>
      <CardImage
        imageUrl={imageUrl}
        title={resource.title}
        contentType={resource.contentType}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-t from-aiven-grey-100 via-aiven-grey-100/60 to-transparent" />
      <div className="relative mt-auto flex flex-col gap-2 p-4">
        <ContentTypeBadge contentType={resource.contentType} />
        <h3 className="text-lg font-semibold leading-tight text-aiven-grey-0">
          {resource.title}
        </h3>
        <p className="hidden line-clamp-2 text-sm text-aiven-grey-30 sm:block">
          {resource.description}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          {resource.technologies?.slice(0, 3).map((tech) => (
            <TechnologyPill key={tech._id} technology={tech} />
          ))}
          {resource.duration && (
            <>
              {resource.technologies?.length > 0 && (
                <span className="text-aiven-grey-60">·</span>
              )}
              <span className="text-xs text-aiven-grey-40">
                {resource.duration}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function LargeLayout({
  resource,
  imageUrl,
}: {
  resource: LandingResource;
  imageUrl: string | null;
}) {
  return (
    <>
      <CardImage
        imageUrl={imageUrl}
        title={resource.title}
        contentType={resource.contentType}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-t from-aiven-grey-100 via-aiven-grey-100/60 to-transparent" />
      <div className="relative mt-auto flex flex-col gap-2 p-4">
        <ContentTypeBadge contentType={resource.contentType} />
        <h3 className="text-base font-semibold leading-snug text-aiven-grey-0">
          {resource.title}
        </h3>
        <p className="line-clamp-2 text-sm text-aiven-grey-30">
          {resource.description}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          {resource.technologies?.slice(0, 2).map((tech) => (
            <TechnologyPill key={tech._id} technology={tech} />
          ))}
        </div>
      </div>
    </>
  );
}

function StandardLayout({
  resource,
  imageUrl,
}: {
  resource: LandingResource;
  imageUrl: string | null;
}) {
  return (
    <>
      <CardImage
        imageUrl={imageUrl}
        title={resource.title}
        contentType={resource.contentType}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-t from-aiven-grey-100 via-aiven-grey-100/60 to-transparent" />
      <div className="relative mt-auto flex flex-col gap-2 p-3.5">
        <ContentTypeBadge contentType={resource.contentType} />
        <h3 className="text-sm font-semibold leading-snug text-aiven-grey-0">
          {resource.title}
        </h3>
        <p className="line-clamp-2 text-xs text-aiven-grey-40">
          {resource.description}
        </p>
        <div className="flex items-center gap-1.5">
          {resource.technologies?.slice(0, 1).map((tech) => (
            <TechnologyPill key={tech._id} technology={tech} />
          ))}
          {resource.duration && (
            <>
              {resource.technologies?.length > 0 && (
                <span className="text-aiven-grey-60">·</span>
              )}
              <span className="text-xs text-aiven-grey-40">
                {resource.duration}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function CompactLayout({
  resource,
  imageUrl,
}: {
  resource: LandingResource;
  imageUrl: string | null;
}) {
  return (
    <>
      <CardImage
        imageUrl={imageUrl}
        title={resource.title}
        contentType={resource.contentType}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-t from-aiven-grey-100 via-aiven-grey-100/60 to-transparent" />
      <div className="relative mt-auto flex flex-col gap-2 p-3.5">
        <ContentTypeBadge contentType={resource.contentType} />
        <h3 className="text-sm font-semibold leading-snug text-aiven-grey-0 line-clamp-3">
          {resource.title}
        </h3>
        <div className="flex items-center gap-1.5">
          {resource.technologies?.slice(0, 1).map((tech) => (
            <TechnologyPill key={tech._id} technology={tech} className="hidden sm:inline-flex" />
          ))}
          {resource.duration && (
            <>
              {resource.technologies?.length > 0 && (
                <span className="hidden text-aiven-grey-60 sm:inline">·</span>
              )}
              <span className="text-xs text-aiven-grey-40">
                {resource.duration}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
