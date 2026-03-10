import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { sanityFetch } from "@/lib/sanity/client";
import { allResourcesQuery } from "@/lib/sanity/queries";
import type { Resource, RailConfig } from "@/lib/sanity/types";
import { VALID_PERSONA_IDS } from "@/app/aiven/resource-center/_config/personas";

const anthropic = new Anthropic();

// Simple in-memory cache: persona → { rails, timestamp }
const cache = new Map<string, { rails: RailConfig[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function sweepExpiredCache() {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (now - entry.timestamp >= CACHE_TTL) {
      cache.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    const { persona } = await request.json();

    if (!persona || typeof persona !== "string") {
      return NextResponse.json(
        { error: "Missing persona" },
        { status: 400 },
      );
    }

    if (
      !VALID_PERSONA_IDS.includes(
        persona as (typeof VALID_PERSONA_IDS)[number],
      )
    ) {
      return NextResponse.json(
        { error: "Invalid persona" },
        { status: 400 },
      );
    }

    // Check cache
    const cached = cache.get(persona);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ rails: cached.rails });
    }

    // Fetch all resources
    const resources =
      (await sanityFetch<Resource[]>(allResourcesQuery)) ?? [];

    // Build a compact catalog for the prompt
    const catalog = resources.map((r) => ({
      slug: r.slug.current,
      title: r.title,
      type: r.contentType,
      technologies: r.technologies?.map((t) => t.title) ?? [],
      topics: r.topics?.map((t) => t.title) ?? [],
      description: r.description,
      featured: r.featured,
      duration: r.duration,
    }));

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a content curator for Aiven's resource center. Given a user persona and a catalog of resources, generate a personalized set of content rails (like Netflix rows).

PERSONA: ${persona}

RESOURCE CATALOG:
${JSON.stringify(catalog, null, 2)}

Generate 8-15 rails that create a coherent learning journey for this persona. Rules:
- The first rail MUST use style "hero" (featured/spotlight content)
- 2-3 rails should use style "large"
- Most rails should use style "standard"
- 1-2 rails can use style "compact" for lighter content
- Each rail needs an engaging, persona-specific title (not generic like "Kafka Resources")
- Each rail should have 3-8 resources, ordered by relevance
- A resource CAN appear in multiple rails
- Consider content type variety within rails (mix formats when natural)
- Create a narrative: start with orientation, build toward depth, end with broader exploration

Return ONLY valid JSON matching this schema:
{
  "rails": [
    {
      "id": "unique-rail-id",
      "title": "Engaging Rail Title",
      "description": "Optional one-line description",
      "resourceSlugs": ["slug-1", "slug-2"],
      "style": "hero" | "large" | "standard" | "compact"
    }
  ]
}`,
        },
      ],
    });

    // Extract JSON from the response
    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate slugs exist
    const validSlugs = new Set(resources.map((r) => r.slug.current));
    const rails: RailConfig[] = parsed.rails.map(
      (rail: RailConfig, i: number) => ({
        id: rail.id || `rail-${i}`,
        title: rail.title,
        description: rail.description,
        resourceSlugs: rail.resourceSlugs.filter((s: string) =>
          validSlugs.has(s),
        ),
        style: rail.style || "standard",
      }),
    );

    // Cache result (sweep expired entries first)
    sweepExpiredCache();
    cache.set(persona, { rails, timestamp: Date.now() });

    return NextResponse.json({ rails });
  } catch (error) {
    console.error("Personalization error:", error);
    return NextResponse.json(
      { error: "Personalization failed" },
      { status: 500 },
    );
  }
}
