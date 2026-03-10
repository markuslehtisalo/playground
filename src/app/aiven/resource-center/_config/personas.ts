import {
  IconCode,
  IconServer,
  IconUsers,
  IconBuildingSkyscraper,
} from "@tabler/icons-react";

export const VALID_PERSONA_IDS = [
  "developer",
  "platform-engineer",
  "engineering-leader",
  "c-suite",
] as const;

export type PersonaId = (typeof VALID_PERSONA_IDS)[number];

export const personas = [
  {
    id: "developer" as const,
    title: "Developer",
    description: "Building applications on data infrastructure",
    icon: IconCode,
  },
  {
    id: "platform-engineer" as const,
    title: "Platform Engineer",
    description: "Managing data platforms at scale",
    icon: IconServer,
  },
  {
    id: "engineering-leader" as const,
    title: "Engineering Leader",
    description: "Making technical strategy decisions",
    icon: IconUsers,
  },
  {
    id: "c-suite" as const,
    title: "C-Suite",
    description: "Evaluating data platform strategy",
    icon: IconBuildingSkyscraper,
  },
];
