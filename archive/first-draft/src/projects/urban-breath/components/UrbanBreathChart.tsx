"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { urbanBreathTheme } from "../config";
import aqiData from "../data/aqi-cities.json";

interface CityRow {
  city: string;
  state: string;
  aqi: number;
  population: number;
}

function aqiColor(aqi: number): string {
  const { aqiColors } = urbanBreathTheme;
  if (aqi <= 50) return aqiColors.good;
  if (aqi <= 100) return aqiColors.moderate;
  if (aqi <= 150) return aqiColors.sensitive;
  return aqiColors.unhealthy;
}

function aqiLabel(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  return "Unhealthy";
}

export function UrbanBreathChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<"aqi" | "name">("aqi");

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const cities = [...(aqiData.cities as CityRow[])];
    cities.sort((a, b) =>
      sortBy === "aqi"
        ? b.aqi - a.aqi
        : `${a.city}${a.state}`.localeCompare(`${b.city}${b.state}`)
    );

    const size = Math.min(container.clientWidth, urbanBreathTheme.width);
    const { height, innerRadius, outerRadiusMax, transitionMs } = urbanBreathTheme;
    const outerRadius = Math.min(outerRadiusMax, size / 2 - 40);

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${size} ${height}`).attr("width", "100%");

    const g = svg
      .append("g")
      .attr("transform", `translate(${size / 2},${height / 2})`);

    const angle = d3
      .scaleBand()
      .domain(cities.map((d) => d.city))
      .range([0, 2 * Math.PI])
      .align(0);

    const radius = d3
      .scaleLinear()
      .domain([0, d3.max(cities, (d) => d.aqi) ?? 100])
      .range([innerRadius, outerRadius]);

    const arc = d3
      .arc<CityRow>()
      .innerRadius(innerRadius)
      .outerRadius((d) => radius(d.aqi))
      .startAngle((d) => angle(d.city) ?? 0)
      .endAngle((d) => (angle(d.city) ?? 0) + angle.bandwidth())
      .padAngle(0.02)
      .padRadius(innerRadius);

    g.selectAll("path.city-arc")
      .data(cities)
      .join("path")
      .attr("class", "city-arc")
      .attr("fill", (d) => aqiColor(d.aqi))
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 1.5)
      .attr("d", arc)
      .attr("opacity", 0)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("stroke-width", 3).attr("filter", "brightness(0.95)");
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.opacity = "1";
        tip.innerHTML = `<strong>${d.city}, ${d.state}</strong><br/>AQI: ${d.aqi} (${aqiLabel(d.aqi)})<br/>Pop: ${d3.format(",")(d.population)}`;
        tip.style.left = `${event.offsetX + 12}px`;
        tip.style.top = `${event.offsetY - 8}px`;
      })
      .on("mousemove", (event) => {
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.left = `${event.offsetX + 12}px`;
        tip.style.top = `${event.offsetY - 8}px`;
      })
      .on("mouseleave", function () {
        d3.select(this).attr("stroke-width", 1.5).attr("filter", null);
        const tip = tooltipRef.current;
        if (tip) tip.style.opacity = "0";
      })
      .transition()
      .duration(transitionMs)
      .attr("opacity", 1);

    g.append("circle")
      .attr("r", innerRadius - 4)
      .attr("fill", "#fff6ef")
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", 2);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("font-family", urbanBreathTheme.labelFont)
      .attr("font-size", urbanBreathTheme.titleSize)
      .attr("font-weight", 700)
      .text(String(aqiData.year));

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("font-family", urbanBreathTheme.labelFont)
      .attr("font-size", urbanBreathTheme.valueSize)
      .text("AQI");

    const labelR = outerRadius + 16;
    g.selectAll("text.city-label")
      .data(cities)
      .join("text")
      .attr("class", "city-label")
      .attr("font-family", urbanBreathTheme.labelFont)
      .attr("font-size", 8)
      .attr("text-anchor", (d) => {
        const a = (angle(d.city) ?? 0) + angle.bandwidth() / 2;
        return a > Math.PI / 2 && a < (3 * Math.PI) / 2 ? "end" : "start";
      })
      .attr("transform", (d) => {
        const a = (angle(d.city) ?? 0) + angle.bandwidth() / 2;
        const x = labelR * Math.sin(a);
        const y = -labelR * Math.cos(a);
        const rot = (a * 180) / Math.PI;
        const flip = a > Math.PI / 2 && a < (3 * Math.PI) / 2 ? rot + 180 : rot;
        return `translate(${x},${y}) rotate(${flip})`;
      })
      .text((d) => d.city)
      .attr("opacity", 0)
      .transition()
      .delay(transitionMs / 2)
      .duration(transitionMs / 2)
      .attr("opacity", 0.9);
  }, [sortBy]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">
            {urbanBreathTheme.chartTitle}
          </h3>
          <p className="text-sm text-ink/55">
            {urbanBreathTheme.chartSubtitle}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSortBy("aqi")}
            className={`rounded-sm border border-ink/15 px-3 py-1.5 text-xs font-medium ${
              sortBy === "aqi" ? "border-ink/30 bg-amber/40" : "hover:bg-ink/5"
            }`}
          >
            By AQI
          </button>
          <button
            type="button"
            onClick={() => setSortBy("name")}
            className={`rounded-sm border border-ink/15 px-3 py-1.5 text-xs font-medium ${
              sortBy === "name" ? "border-ink/30 bg-amber/40" : "hover:bg-ink/5"
            }`}
          >
            By name
          </button>
        </div>
      </div>
      <svg ref={svgRef} role="img" aria-label={urbanBreathTheme.chartTitle} />
      <div ref={tooltipRef} className="vis-tooltip opacity-0" />
      <p className="mt-4 text-xs text-ink/50">{urbanBreathTheme.footnote}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/60">
        {[
          { label: "Good (0–50)", color: urbanBreathTheme.aqiColors.good },
          { label: "Moderate (51–100)", color: urbanBreathTheme.aqiColors.moderate },
          { label: "Sensitive (101–150)", color: urbanBreathTheme.aqiColors.sensitive },
          { label: "Unhealthy (151+)", color: urbanBreathTheme.aqiColors.unhealthy },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 border border-ink"
              style={{ background: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
