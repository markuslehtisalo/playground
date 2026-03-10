interface SectionHeadingProps {
  children: React.ReactNode;
  description?: React.ReactNode;
  gradient?: boolean;
  id?: string;
  kicker?: string;
  level?: 1 | 2 | 3 | 4;
  size?: "default" | "hero";
  tone?: "default" | "inverse";
}

export function SectionHeading({
  children,
  description,
  gradient,
  id,
  kicker,
  level,
  size = "default",
  tone = "default",
}: SectionHeadingProps) {
  const isHero = size === "hero";
  const Heading = level
    ? (`h${level}` as "h1" | "h2" | "h3" | "h4")
    : isHero
      ? "h1"
      : "h2";
  const isInverse = tone === "inverse";
  const kickerClass = isInverse
    ? "text-aiven-secondary-30"
    : "text-aiven-secondary-60 dark:text-aiven-secondary-50";
  const headingClass = isHero
    ? gradient
      ? "bg-linear-to-r from-aiven-secondary-90 via-aiven-secondary-60 to-aiven-secondary-30 bg-clip-text text-5xl leading-[1.15] font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl dark:from-aiven-secondary-40 dark:via-aiven-secondary-60 dark:to-aiven-secondary-80"
      : isInverse
        ? "text-5xl leading-[1.15] font-bold tracking-tight text-aiven-grey-0 sm:text-6xl lg:text-7xl"
        : "text-5xl leading-[1.15] font-bold tracking-tight text-text-heading sm:text-6xl lg:text-7xl"
    : isInverse
      ? "text-3xl font-semibold tracking-tight text-aiven-grey-0 sm:text-4xl"
      : "text-3xl font-semibold tracking-tight text-text-heading sm:text-4xl";
  const descriptionClass = isHero
    ? isInverse
      ? "mt-5 max-w-2xl text-lg leading-relaxed text-aiven-grey-20 sm:text-xl"
      : "mt-5 max-w-2xl text-lg leading-relaxed text-text-body sm:text-xl"
    : isInverse
      ? "mt-3 max-w-2xl text-base leading-relaxed text-aiven-grey-30 sm:text-lg"
      : "mt-3 max-w-2xl text-base leading-relaxed text-text-body sm:text-lg";

  return (
    <div id={id}>
      {kicker && (
        <p
          className={`mb-3 text-sm font-medium tracking-[0.18em] uppercase ${kickerClass}`}
        >
          {kicker}
        </p>
      )}
      <Heading className={headingClass}>
        {children}
      </Heading>
      {description && <p className={descriptionClass}>{description}</p>}
    </div>
  );
}

export function Prose({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "inverse";
}) {
  return (
    <div
      className={`mt-5 max-w-2xl space-y-4 text-base leading-relaxed sm:text-lg ${
        tone === "inverse" ? "text-aiven-grey-30" : "text-text-body"
      }`}
    >
      {children}
    </div>
  );
}
