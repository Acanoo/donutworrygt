type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light"
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={`mb-3 text-sm font-semibold uppercase tracking-[0.28em] ${
          isDark ? "text-gold" : "text-blush"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-title text-4xl leading-tight sm:text-5xl ${
          isDark ? "text-white" : "text-cocoa"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-7 sm:text-lg ${
          isDark ? "text-white/75" : "text-cocoa/75"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
