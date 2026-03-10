"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ResourceCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const isRoot = pathname === "/aiven/resource-center";
  const backHref = isRoot ? "/aiven" : "/aiven/resource-center";
  const backLabel = "Back";

  useEffect(() => {
    setTheme("dark");
    return () => setTheme("system");
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-aiven-grey-100 text-aiven-grey-0">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-aiven-grey-100/80 border-b border-aiven-grey-80/50">
        <Link
          className="inline-flex items-center gap-1.5 text-sm text-aiven-grey-40 transition-colors hover:text-aiven-grey-20 outline-none focus-visible:outline-2 focus-visible:outline-aiven-secondary-80 focus-visible:outline-offset-2 rounded-sm"
          href={backHref}
        >
          <IconArrowLeft size={14} />
          {backLabel}
        </Link>
        <div className="flex items-center gap-2">
          <Image
            alt="Aiven"
            className="opacity-80"
            height={20}
            src="/aiven-logo.png"
            width={20}
          />
          <span className="text-sm font-medium text-aiven-grey-30">
            Aiven Resource Center
          </span>
        </div>
        <div className="w-12" />
      </header>
      <div>{children}</div>
    </div>
  );
}
