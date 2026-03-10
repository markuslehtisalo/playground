import type { Metadata } from "next";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { DarkModeToggle } from "@/components/aiven/dark-mode-toggle";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrush,
  IconCalculator,
  IconLibrary,
  IconWand,
  IconArrowRight,
  IconExternalLink,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  description: "Proof of Excellence for Aiven.",
  title: "Markus Lehtisalo - Design Engineer",
};

const projects = [
  {
    description: "Solution for marketing-product design drift",
    href: "/aiven/design-system",
    icon: IconBrush,
    label: "Design System",
  },
  {
    description: "Interactive customer-facing SaaS plan builder",
    href: "/aiven/pricing-configurator",
    icon: IconCalculator,
    label: "Pricing Configurator",
  },
  {
    badge: "Capstone",
    description: "Sanity-powered AI content experience",
    href: "/aiven/resource-center",
    icon: IconLibrary,
    label: "Resource Center",
  },
  {
    description: "Step-by-step service creation flow",
    href: "/aiven/ui-wizard",
    icon: IconWand,
    label: "UI Wizard",
  },
];

export default function AivenPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-dvh overflow-hidden px-5 relative">
      <div className="absolute right-5 top-5 z-10">
        <DarkModeToggle />
      </div>
      <AnimatedGridPattern
        className="h-[200%] inset-x-0 inset-y-[-30%] skew-y-10"
        duration={2}
        maxOpacity={0.2}
        numSquares={20}
        opacity={0.2}
        repeatDelay={2}
      />
      <Image
        alt="Aiven Logo"
        className="animate-sway ml-1 relative"
        height={32}
        src="/aiven-logo.png"
        width={32}
      />
      <h1 className="font-semibold mt-5 relative text-lg">
        Markus Lehtisalo - Design Engineer
      </h1>
      <p className="max-w-xs mt-2 relative text-center text-aiven-grey-40 text-sm">
        Proof of Excellence for Aiven
      </p>
      <nav
        aria-label="Portfolio projects"
        className="flex flex-col gap-2 max-w-md mt-8 relative w-full"
      >
        {projects.map((project) => (
          <Link
            className="backdrop-blur-xs bg-white/80 border border-aiven-grey-10 flex group/card items-center justify-between px-4 py-3 rounded-lg shadow-xs transition-shadow w-full dark:bg-aiven-grey-100/80 dark:border-aiven-grey-80 active:shadow-[0_0_0_2px_var(--color-aiven-primary-80)] focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 hover:shadow-[0_0_0_2px_var(--color-aiven-primary-80)]"
            href={project.href}
            key={project.href}
          >
            <div className="flex gap-3 items-center">
              <project.icon
                className="shrink-0 text-aiven-grey-30 dark:text-aiven-grey-40"
                size={16}
                strokeWidth={1.75}
              />
              <div className="flex flex-col gap-px">
                <span className="font-medium text-sm">
                  {project.label}
                  {"badge" in project && project.badge && (
                    <span className="bg-aiven-secondary-50 font-medium inline-flex ml-1.5 px-1.5 py-0.5 relative rounded text-[10px] text-white leading-none align-middle -top-px">
                      {project.badge}
                    </span>
                  )}
                </span>
                <span className="text-aiven-grey-40 text-xs">
                  {project.description}
                </span>
              </div>
            </div>
            <IconArrowRight
              className="shrink-0 text-aiven-grey-30 transition-transform group-hover/card:translate-x-0.5 dark:text-aiven-grey-40"
              size={16}
              strokeWidth={1.75}
            />
          </Link>
        ))}
      </nav>
      <div className="flex gap-2 items-center mt-8.5 relative text-aiven-primary-70 text-sm">
        <IconExternalLink size={14} strokeWidth={1.75} />
        <a
          className="focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 hover:underline"
          href="https://github.com/markuslehtisalo/playground"
          rel="noopener noreferrer"
          target="_blank"
        >
          View in GitHub
        </a>
      </div>
    </main>
  );
}
