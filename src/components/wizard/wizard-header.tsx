import Link from "next/link";
import Image from "next/image";
import { DarkModeToggle } from "@/components/aiven/dark-mode-toggle";

export function WizardHeader() {
  return (
    <header className="flex h-14 items-center border-b border-aiven-grey-10 bg-white px-4 dark:border-aiven-grey-80 dark:bg-aiven-grey-100">
      <div className="flex items-center w-40">
        <Link href="/aiven" className="flex items-center gap-2 text-sm font-semibold text-text-heading whitespace-nowrap rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2">
          <Image
            src="/aiven-logo.png"
            alt="Aiven"
            width={24}
            height={24}
          />
          Aiven Console
        </Link>
      </div>

      <h1 className="hidden flex-1 text-center text-sm font-semibold text-text-heading sm:block">
        Create New Service
      </h1>

      <div className="hidden items-center justify-end sm:flex sm:w-40">
        <DarkModeToggle />
      </div>
    </header>
  );
}
