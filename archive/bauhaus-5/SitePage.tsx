"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GlitchText } from "@/components/GlitchText";
import { NycDohLogo } from "@/components/NycDohLogo";
import { site } from "@/lib/site";
import { ACTIVE_THEME } from "@/lib/theme";
import {
  BauhausPosterArt,
  GeometricAccent,
} from "@/themes/bauhaus-5/BauhausPoster";

export function SitePage() {
  const [scary, setScary] = useState(false);

  const toggle = useCallback(() => setScary((s) => !s), []);

  useEffect(() => {
    document.documentElement.dataset.mode = scary ? "scary" : "light";
    document.documentElement.dataset.theme = ACTIVE_THEME;
    return () => {
      document.documentElement.dataset.mode = "light";
      document.documentElement.dataset.theme = ACTIVE_THEME;
    };
  }, [scary]);

  return (
    <div className={`site-shell min-h-screen ${scary ? "site-shell--scary" : ""}`}>
      {scary && <div className="scary-overlay" aria-hidden />}
      {scary && <div className="scary-scanlines" aria-hidden />}

      <div className="site-frame mx-auto flex min-h-screen max-w-5xl flex-col px-4 md:px-6">
        <header className="b5-header flex items-center justify-between gap-6 py-8 md:py-10">
          <div className="site-header-brand flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="logo-toggle flex shrink-0 items-center p-0 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-red"
              aria-label={scary ? "Return to normal mode" : "Activate alternate mode"}
              aria-pressed={scary}
            >
              <Image
                src={scary ? "/logorev2scary.svg" : "/logorev2.svg"}
                alt=""
                width={145}
                height={90}
                priority
                className={`logo-img h-12 w-auto md:h-14 ${scary ? "logo-img--scary" : ""}`}
              />
            </button>
            <div className="flex flex-col justify-center leading-tight">
              <p className="site-title text-xl font-extrabold tracking-tight md:text-2xl">{site.name}</p>
              <p className="site-tagline section-label mt-0.5 text-xs uppercase md:text-sm">
                {site.tagline}
              </p>
            </div>
          </div>
          <a href={`mailto:${site.email}`} className="site-link hidden text-sm font-bold md:inline">
            {site.email}
          </a>
        </header>

        <section className="b5-hero py-10 md:py-14">
          {!scary && <BauhausPosterArt className="mx-auto md:mx-0 md:order-2" />}
          {scary && (
            <div className="scary-shapes hidden md:order-2 md:block" aria-hidden>
              <span className="scary-shape scary-shape--ring" />
              <span className="scary-shape scary-shape--blade" />
            </div>
          )}
          <div className="md:order-1">
            {scary ? (
              <GlitchText
                as="h1"
                className="b5-headline text-3xl leading-[1.05] md:text-5xl lg:text-[3.25rem]"
                text={site.headlineLines.join(" ")}
                lines={site.headlineLines}
              />
            ) : (
              <h1 className="b5-headline text-3xl leading-[1.05] md:text-5xl lg:text-[3.25rem]">
                {site.headlineLines[0]}
                <br />
                {site.headlineLines[1]}
              </h1>
            )}
            <p className="b5-lede mt-8 max-w-lg text-base leading-relaxed md:text-lg">
              {site.description}
            </p>
          </div>
        </section>

        <section className="pillars-section flex flex-col items-center gap-10 py-10 md:flex-row md:items-start md:justify-center md:gap-12 md:py-12">
          {site.pillars.map((item, i) => (
            <article
              key={item.title}
              className="pillar-card flex w-full max-w-[15rem] flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="pillar-card__head mb-4 flex items-center justify-center gap-3 md:justify-start">
                <span className="b5-accent-slot">
                  <GeometricAccent index={i} />
                </span>
                <span className="pillar-index text-sm font-bold tabular-nums">0{i + 1}</span>
              </div>
              <h2 className="pillar-card__title section-label min-h-[2.75rem] text-sm uppercase leading-snug">
                {item.title}
              </h2>
              <p className="mt-3 text-sm font-normal leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="section-rule py-10 md:py-12">
          <div className="mb-6 flex items-center gap-4">
            <GeometricAccent index={0} />
            <h2 className="section-label text-xs uppercase">Clients</h2>
          </div>
          <ul className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-start">
            {site.clients.map((client) => (
              <li key={client.name}>
                <div className="client-block px-6 py-5">
                  {client.logo === "/clients/nyc-dohmh.svg" ? (
                    <NycDohLogo className="relative z-10 h-12 w-auto max-w-[220px] md:h-14" />
                  ) : (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={client.logoWidth}
                      height={client.logoHeight}
                      className="relative z-10 h-12 w-auto max-w-[220px] md:h-14"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="section-rule mt-auto flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:py-14">
          <div>
            <p className="section-label text-xs uppercase">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              className="site-link mt-3 inline-block text-xl font-extrabold md:text-2xl"
            >
              {site.email}
            </a>
            <div className="b5-footer-bar" aria-hidden />
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="b5-footer-shapes" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <p>
              © {new Date().getFullYear()} {site.legalName}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
