"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";

const noopSubscribe = () => () => {};

const options = [
  { value: "light", icon: IconSun, label: "Light" },
  { value: "dark", icon: IconMoon, label: "Dark" },
  { value: "system", icon: IconDeviceDesktop, label: "System" },
] as const;

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const activeIndex = options.findIndex((o) => o.value === theme);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (activeIndex + 1) % options.length;
      setTheme(options[next].value);
      const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (activeIndex - 1 + options.length) % options.length;
      setTheme(options[next].value);
      const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons[next]?.focus();
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center rounded-md border border-aiven-grey-10 bg-white p-0.5 dark:border-aiven-grey-80 dark:bg-aiven-grey-100"
      onKeyDown={handleKeyDown}
    >
      {options.map((opt, i) => {
        const isActive = mounted && theme === opt.value;
        const hasActive = mounted && activeIndex >= 0;

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            tabIndex={isActive || (!hasActive && i === 0) ? 0 : -1}
            className={`cursor-pointer inline-flex items-center justify-center rounded-sm px-2 py-1.5 text-xs font-medium transition-colors outline-none focus-visible:outline-2 focus-visible:outline-aiven-primary-80 focus-visible:outline-offset-2 ${
              isActive
                ? "bg-aiven-grey-5 text-aiven-grey-100 dark:bg-aiven-grey-80 dark:text-aiven-grey-0"
                : "text-aiven-grey-40 hover:text-aiven-grey-60 dark:hover:text-aiven-grey-20"
            }`}
            onClick={() => setTheme(opt.value)}
          >
            <opt.icon size={14} />
          </button>
        );
      })}
    </div>
  );
}
