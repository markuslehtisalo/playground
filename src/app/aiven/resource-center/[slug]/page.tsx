import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/client";
import {
  resourceBySlugQuery,
  relatedResourcesQuery,
  allSlugsQuery,
} from "@/lib/sanity/queries";
import { DetailHero } from "./_components/detail-hero";
import { DetailBody } from "./_components/detail-body";
import { RelatedRail } from "./_components/related-rail";
import type { Resource } from "@/lib/sanity/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = (await sanityFetch<string[]>(allSlugsQuery)) ?? [];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await sanityFetch<Resource | null>(resourceBySlugQuery, {
    slug,
  });

  if (!resource) return { title: "Not Found" };

  return {
    title: `${resource.title} - Aiven Resource Center`,
    description: resource.description,
  };
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = await sanityFetch<Resource | null>(resourceBySlugQuery, {
    slug,
  });

  if (!resource) notFound();

  const techIds = resource.technologies?.map((t) => t._id) ?? [];
  const topicIds = resource.topics?.map((t) => t._id) ?? [];

  const related =
    (await sanityFetch<Resource[]>(relatedResourcesQuery, {
      currentId: resource._id,
      techIds,
      topicIds,
    })) ?? [];

  return (
    <>
      <DetailHero resource={resource} />
      <DetailBody resource={resource} />
      <RelatedRail resources={related} currentResource={resource} />
    </>
  );
}
