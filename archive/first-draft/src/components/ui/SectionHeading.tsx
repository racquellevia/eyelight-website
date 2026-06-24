export function SectionHeading({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-2xl">
      {label && <p className="section-label mb-2">{label}</p>}
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-ink/65 md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
