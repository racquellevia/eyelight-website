"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="group" onClick={() => setOpen(false)}>
          <span className="text-lg font-semibold tracking-tight text-ink md:text-xl">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 block text-xs text-ink/50 transition-colors group-hover:text-rust">
            Visualization Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href === "/projects" && pathname.startsWith("/projects"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ink text-cream"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-primary ml-2">
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-sm border border-ink/15 px-3 py-2 text-sm font-medium md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 px-4 py-3 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-sm px-4 py-2.5 text-sm font-medium hover:bg-ink/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="btn-primary mt-2 w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Start a project
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
