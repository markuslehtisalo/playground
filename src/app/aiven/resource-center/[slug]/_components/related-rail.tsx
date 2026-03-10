"use client";

import { Rail } from "../../_components/rail";
import type { Resource } from "@/lib/sanity/types";

interface RelatedRailProps {
  resources: Resource[];
  currentResource: Resource;
}

export function RelatedRail({ resources, currentResource }: RelatedRailProps) {
  if (resources.length === 0) return null;

  const primaryTech = currentResource.technologies?.[0];
  const title = primaryTech
    ? `More on ${primaryTech.title}`
    : `More ${currentResource.contentType.replace("-", " ")}s`;

  return (
    <div className="pb-20 pt-8">
      <Rail title={title} resources={resources} cardStyle="standard" />
    </div>
  );
}
