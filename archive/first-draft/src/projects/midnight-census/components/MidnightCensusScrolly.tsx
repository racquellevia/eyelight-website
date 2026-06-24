"use client";

import { useEffect, useRef, useState } from "react";
import { midnightCensusTheme } from "../config";
import sightingsData from "../data/sightings.json";
import "../midnight-census.css";
import { CountChart, type Sighting } from "./CountChart";
import { MoroccanPattern } from "./MoroccanPattern";
import { ScurryingRoaches } from "./ScurryingRoaches";

type Step = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  palette: string;
  highlightIndex: number | null;
};

const BG: Record<string, string> = {
  saffron: midnightCensusTheme.colors.saffron,
  teal: midnightCensusTheme.colors.teal,
  ruby: midnightCensusTheme.colors.ruby,
  indigo: midnightCensusTheme.colors.indigo,
  terracotta: midnightCensusTheme.colors.terracotta,
};

export function MidnightCensusScrolly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sightings = sightingsData.sightings as Sighting[];
  const steps = sightingsData.steps as Step[];
  const [activeStep, setActiveStep] = useState(0);

  const current = steps[activeStep] ?? steps[0];
  const highlightIndex = current.highlightIndex;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = root.querySelectorAll<HTMLElement>("[data-step-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const best = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b
        );
        const idx = Number((best.target as HTMLElement).dataset.stepIndex);
        if (!Number.isNaN(idx)) setActiveStep(idx);
      },
      { root: null, rootMargin: "-35% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="midnight-census -mx-4 md:-mx-6"
      style={{ backgroundColor: BG[current.palette] ?? BG.saffron }}
    >
      <MoroccanPattern id="global" palette={current.palette as "saffron"} opacity={0.14} />
      <ScurryingRoaches containerRef={rootRef} />

      <div className="midnight-census__scrolly relative z-10">
        <div className="midnight-census__graphic">
          <CountChart
            sightings={sightings}
            activeIndex={highlightIndex}
            paletteKey={current.palette}
          />
          {highlightIndex !== null && sightings[highlightIndex] && (
            <p className="mt-4 text-center text-sm text-ink/80">
              <span className="font-semibold">{sightings[highlightIndex].date}</span>
              {" — "}
              {sightings[highlightIndex].note}
            </p>
          )}
        </div>

        <div className="midnight-census__steps">
          {steps.map((step, i) => (
            <section
              key={step.id}
              data-step-index={i}
              className={`midnight-census__step ${i === activeStep ? "is-active" : ""}`}
              style={{
                backgroundColor:
                  i === activeStep
                    ? "transparent"
                    : `${BG[step.palette] ?? BG.saffron}88`,
              }}
            >
              <MoroccanPattern
                id={`step-${step.id}`}
                palette={step.palette as "saffron"}
                opacity={i === activeStep ? 0.08 : 0.04}
              />
              <article className="midnight-census__step-inner relative">
                <p className="text-xs font-semibold uppercase tracking-widest text-ruby">
                  {step.kicker}
                </p>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-ink md:text-2xl">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/85 md:text-base">
                  {step.text}
                </p>
                {step.highlightIndex !== null && sightings[step.highlightIndex] && (
                  <p className="mt-4 border-t border-ink/10 pt-4 text-xs text-ink/60">
                    <span className="font-semibold text-ink">Logged:</span>{" "}
                    {sightings[step.highlightIndex].count} in{" "}
                    {sightings[step.highlightIndex].room} ·{" "}
                    {sightings[step.highlightIndex].date}
                  </p>
                )}
              </article>
            </section>
          ))}
        </div>
      </div>

      <p className="relative z-10 border-t border-ink/10 bg-cream/90 px-6 py-4 text-center text-xs text-ink/55">
        Scroll to advance the census · Data in{" "}
        <code className="rounded bg-ink/5 px-1">src/projects/midnight-census/data/sightings.json</code>
      </p>
    </div>
  );
}
