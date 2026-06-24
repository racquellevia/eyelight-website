import { siteConfig } from "@/lib/site";

const items = [
  siteConfig.name,
  "Civic · Cultural · Environmental data",
  "Interactive visualizations",
  siteConfig.email,
];

export function StatusTicker() {
  const line = items.join("  ·  ");
  return (
    <div className="overflow-hidden border-b border-ink/8 bg-cream py-2 text-xs text-ink/45">
      <div className="flex w-max animate-ticker whitespace-nowrap">
        <span className="px-6">{line}</span>
        <span className="px-6" aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}
