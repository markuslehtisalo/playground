export type ContentType =
  | "ebook"
  | "live-video"
  | "podcast"
  | "report"
  | "tool"
  | "webinar"
  | "workshop"
  | "white-paper";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Technology {
  _id: string;
  title: string;
  slug: { current: string };
  color?: string;
}

export interface Topic {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface Persona {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface Resource {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  contentType: ContentType;
  heroImage?: SanityImage;
  thumbnail?: SanityImage;
  technologies: Technology[];
  topics: Topic[];
  personas: Persona[];
  publishedAt: string;
  featured: boolean;
  duration?: string;
  externalUrl?: string;
}

export type LandingResource = Omit<
  Resource,
  "topics" | "personas" | "publishedAt" | "externalUrl"
>;

export interface RailConfig {
  id: string;
  title: string;
  description?: string;
  resourceSlugs: string[];
  style: "hero" | "large" | "standard" | "compact";
}

export interface PersonalizeResponse {
  rails: RailConfig[];
}
