import { Badge } from "@/components/aiven";
import { cn } from "@/lib/utils";
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

const config: Record<
  ContentType,
  {
    label: string;
    icon: typeof IconBook;
  }
> = {
  ebook: { label: "E-book", icon: IconBook },
  "live-video": { label: "Live Video", icon: IconVideo },
  podcast: { label: "Podcast", icon: IconMicrophone },
  report: { label: "Report", icon: IconFileReport },
  tool: { label: "Tool", icon: IconTool },
  webinar: { label: "Webinar", icon: IconPresentation },
  workshop: { label: "Workshop", icon: IconSchool },
  "white-paper": { label: "White Paper", icon: IconFileText },
};

const contentTypeBadgeStyles: Record<ContentType, string> = {
  ebook: "border-aiven-error-60/50 dark:border-aiven-error-60/50 text-aiven-error-30 dark:text-aiven-error-30",
  "live-video": "border-aiven-error-60/50 dark:border-aiven-error-60/50 text-aiven-error-30 dark:text-aiven-error-30",
  podcast: "border-aiven-success-60/50 dark:border-aiven-success-60/50 text-aiven-success-30 dark:text-aiven-success-30",
  report: "border-aiven-grey-50/50 dark:border-aiven-grey-50/50 text-aiven-grey-30 dark:text-aiven-grey-30",
  tool: "border-aiven-info-60/50 dark:border-aiven-info-60/50 text-aiven-info-30 dark:text-aiven-info-30",
  webinar: "border-aiven-warning-60/50 dark:border-aiven-warning-60/50 text-aiven-warning-30 dark:text-aiven-warning-30",
  workshop: "border-aiven-success-60/50 dark:border-aiven-success-60/50 text-aiven-success-30 dark:text-aiven-success-30",
  "white-paper": "border-aiven-grey-50/50 dark:border-aiven-grey-50/50 text-aiven-grey-30 dark:text-aiven-grey-30",
};

interface ContentTypeBadgeProps {
  contentType: ContentType;
  className?: string;
}

export function ContentTypeBadge({
  contentType,
  className,
}: ContentTypeBadgeProps) {
  const { label, icon: Icon } = config[contentType];

  return (
    <Badge variant="outline" className={cn(contentTypeBadgeStyles[contentType], className)}>
      <Icon size={12} className="mr-1" />
      {label}
    </Badge>
  );
}
