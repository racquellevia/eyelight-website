"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { midnightCensusTheme } from "../config";
import { RugBorder } from "./MoroccanPattern";

export interface Sighting {
  date: string;
  count: number;
  room: string;
  note: string;
}

export function CountChart({
  sightings,
  activeIndex,
  paletteKey = "saffron",
}: {
  sightings: Sighting[];
  activeIndex: number | null;
  paletteKey?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { chart, colors } = midnightCensusTheme;
  const palette = PALETTE_MAP[paletteKey] ?? PALETTE_MAP.saffron;

  useEffect(() => {
    const svgEl = svgRef.current;
    const container = containerRef.current;
    if (!svgEl || !container || sightings.length === 0) return;

    const width = container.clientWidth;
    const { height, margin } = chart;
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const parseDate = d3.timeParse("%Y-%m-%d");
    const data = sightings.map((d) => ({
      ...d,
      parsed: parseDate(d.date) as Date,
    }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.parsed) as [Date, Date])
      .range([0, innerW]);

    const y = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.count) ?? 0) + 1])
      .nice()
      .range([innerH, 0]);

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat((d) => d3.timeFormat("%b %d")(d as Date))
      )
      .call((sel) => sel.select(".domain").attr("stroke", colors.ink))
      .selectAll("text")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 10)
      .attr("fill", colors.ink);

    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")))
      .call((sel) => sel.select(".domain").attr("stroke", colors.ink))
      .selectAll("text")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 10)
      .attr("fill", colors.ink);

    g.append("text")
      .attr("x", innerW / 2)
      .attr("y", innerH + 34)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 11)
      .attr("fill", colors.ink)
      .text("Date");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -36)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 11)
      .text("Count");

    const area = d3
      .area<(typeof data)[0]>()
      .x((d) => x(d.parsed))
      .y0(innerH)
      .y1((d) => y(d.count))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", palette.fill)
      .attr("opacity", 0.45)
      .attr("d", area);

    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => x(d.parsed))
      .y((d) => y(d.count))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", palette.line)
      .attr("stroke-width", 3)
      .attr("d", line);

    g.selectAll("circle.point")
      .data(data)
      .join("circle")
      .attr("class", "point")
      .attr("cx", (d) => x(d.parsed))
      .attr("cy", (d) => y(d.count))
      .attr("r", (_, i) => (activeIndex === i ? 9 : 5))
      .attr("fill", (_, i) => (activeIndex === i ? palette.accent : palette.line))
      .attr("stroke", colors.ink)
      .attr("stroke-width", (_, i) => (activeIndex === i ? 2 : 1))
      .attr("opacity", (_, i) =>
        activeIndex === null || activeIndex === i ? 1 : 0.35
      );

    if (activeIndex !== null && data[activeIndex]) {
      const d = data[activeIndex];
      g.append("text")
        .attr("x", x(d.parsed))
        .attr("y", y(d.count) - 14)
        .attr("text-anchor", "middle")
        .attr("font-family", "var(--font-sans)")
        .attr("font-size", 12)
        .attr("font-weight", 600)
        .attr("fill", palette.accent)
        .text(`${d.count} · ${d.room}`);
    }
  }, [sightings, activeIndex, paletteKey, chart, colors.ink]);

  return (
    <div ref={containerRef} className="w-full">
      <RugBorder>
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-ink/60">
          Evening count over time
        </p>
        <svg ref={svgRef} role="img" aria-label="Cockroach count over time" />
      </RugBorder>
    </div>
  );
}

const PALETTE_MAP: Record<string, { line: string; fill: string; accent: string }> = {
  saffron: { line: "#c45c26", fill: "#e8a317", accent: "#9b2335" },
  teal: { line: "#1a6b6b", fill: "#1a6b6b", accent: "#d4af37" },
  ruby: { line: "#9b2335", fill: "#9b2335", accent: "#e8a317" },
  indigo: { line: "#2e3a87", fill: "#2e3a87", accent: "#d4af37" },
  terracotta: { line: "#c45c26", fill: "#c45c26", accent: "#5c1a3e" },
};
