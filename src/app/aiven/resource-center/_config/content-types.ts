import {
  IconBook,
  IconVideo,
  IconMicrophone,
  IconFileReport,
  IconTool,
  IconPresentation,
  IconSchool,
  IconFileText,
} from "@tabler/icons-react";
import type { ContentType } from "@/lib/sanity/types";

export const ctaLabels: Record<ContentType, string> = {
  ebook: "Read E-book",
  "live-video": "Watch Video",
  podcast: "Listen Now",
  report: "Read Report",
  tool: "Launch Tool",
  webinar: "Watch Webinar",
  workshop: "Start Workshop",
  "white-paper": "Read Paper",
};

export const ctaIcons: Record<ContentType, typeof IconBook> = {
  ebook: IconBook,
  "live-video": IconVideo,
  podcast: IconMicrophone,
  report: IconFileReport,
  tool: IconTool,
  webinar: IconPresentation,
  workshop: IconSchool,
  "white-paper": IconFileText,
};
