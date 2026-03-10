import { InputField } from "@/components/aiven/input";
import { Button } from "@/components/aiven/button";
import { ScrollReveal } from "./scroll-reveal";
import { IconArrowRight } from "@tabler/icons-react";

export function PrimitiveToStyled() {
  return (
    <ScrollReveal>
      <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr]">
        {/* Plain HTML */}
        <div className="rounded-xl border border-aiven-grey-10 bg-white/80 p-5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100/80">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Plain HTML
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm" htmlFor="plain-input">
                Service name
              </label>
              <input
                className="mt-1 w-full border px-2 py-1.5 text-sm"
                id="plain-input"
                type="text"
                placeholder="pg-production-01"
              />
            </div>
            <button
              className="border px-3 py-1.5 text-sm"
              type="button"
            >
              Submit
            </button>
          </div>
          <p className="mt-4 font-mono text-[11px] text-text-muted">
            No tokens · No consistency · No brand
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <IconArrowRight
            className="rotate-90 text-aiven-secondary-60 dark:text-aiven-secondary-50 sm:rotate-0"
            size={20}
            strokeWidth={1.5}
          />
        </div>

        {/* Styled with tokens */}
        <div className="rounded-xl border border-aiven-grey-10 bg-white/80 p-5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100/80">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Styled with tokens
          </p>
          <div className="space-y-3">
            <InputField
              label="Service name"
              placeholder="pg-production-01"
            />
            <Button size="sm">Submit</Button>
          </div>
          <p className="mt-4 font-mono text-[11px] text-text-muted">
            Branded · Consistent · Same behavior
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
