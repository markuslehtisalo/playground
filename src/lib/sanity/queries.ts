import { groq } from "next-sanity";

const resourceFields = groq`
  _id,
  title,
  slug,
  description,
  contentType,
  heroImage,
  thumbnail,
  technologies[]->{ _id, title, slug, color },
  topics[]->{ _id, title, slug },
  personas[]->{ _id, title, slug, description },
  publishedAt,
  featured,
  duration,
  externalUrl
`;

const landingResourceFields = groq`
  _id,
  title,
  slug,
  description,
  contentType,
  heroImage,
  thumbnail,
  technologies[]->{ _id, title, slug, color },
  featured,
  duration
`;

export const landingResourcesQuery = groq`
  *[_type == "resource"] | order(publishedAt desc) {
    ${landingResourceFields}
  }
`;

export const allResourcesQuery = groq`
  *[_type == "resource"] | order(publishedAt desc) {
    ${resourceFields}
  }
`;

export const featuredResourcesQuery = groq`
  *[_type == "resource" && featured == true] | order(publishedAt desc) {
    ${resourceFields}
  }
`;

export const resourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    ${resourceFields}
  }
`;

export const resourcesByTypeQuery = groq`
  *[_type == "resource" && contentType == $contentType] | order(publishedAt desc) {
    ${resourceFields}
  }
`;

export const resourcesByTechnologyQuery = groq`
  *[_type == "resource" && references(*[_type == "technology" && slug.current == $techSlug]._id)] | order(publishedAt desc) {
    ${resourceFields}
  }
`;

export const relatedResourcesQuery = groq`
  *[_type == "resource" && _id != $currentId && (
    count(technologies[@._ref in $techIds]) > 0 ||
    count(topics[@._ref in $topicIds]) > 0
  )] | order(publishedAt desc) [0...8] {
    ${resourceFields}
  }
`;

export const allTechnologiesQuery = groq`
  *[_type == "technology"] | order(title asc) {
    _id, title, slug, color
  }
`;

export const allTopicsQuery = groq`
  *[_type == "topic"] | order(title asc) {
    _id, title, slug
  }
`;

export const allSlugsQuery = groq`
  *[_type == "resource"].slug.current
`;
