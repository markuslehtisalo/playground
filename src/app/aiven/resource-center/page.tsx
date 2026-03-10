import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { landingResourcesQuery } from "@/lib/sanity/queries";
import { RailsContainer } from "./_components/rails-container";
import type { LandingResource } from "@/lib/sanity/types";

export const metadata: Metadata = {
  description:
    "AI-powered, personalized resource library. E-books, webinars, tools, podcasts, and more — curated for your role.",
  title: "Resource Center - Markus Lehtisalo",
};

export default async function ResourceCenterPage() {
  const allResources =
    (await sanityFetch<LandingResource[]>(landingResourcesQuery)) ?? [];

  return <RailsContainer allResources={allResources} />;
}
