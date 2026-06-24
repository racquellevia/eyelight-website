import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-semibold text-ink">{siteConfig.legalName}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/60">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink/45">
            Navigate
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-ink/70 hover:text-rust">
                Home
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink/70 hover:text-rust">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink/45">
            Connect
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm font-medium text-ink underline decoration-amber decoration-2 underline-offset-4 hover:text-rust"
          >
            {siteConfig.email}
          </a>
          <p className="mt-6 text-xs text-ink/40">
            © {year} {siteConfig.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
