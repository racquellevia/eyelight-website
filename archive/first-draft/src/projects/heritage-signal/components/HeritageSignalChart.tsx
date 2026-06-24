"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { heritageSignalTheme } from "../config";
import heritageData from "../data/heritage-inscriptions.json";

interface Cell {
  region: string;
  decade: string;
  value: number;
  row: number;
  col: number;
}

export function HeritageSignalChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Cell | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const { decades, regions, values } = heritageData;
    const cells: Cell[] = regions.flatMap((region, row) =>
      decades.map((decade, col) => ({
        region,
        decade,
        value: values[row][col],
        row,
        col,
      }))
    );
    const maxVal = d3.max(cells, (d) => d.value) ?? 1;

    const width = container.clientWidth;
    const { margin, height, cellGap, colorRange, transitionMs } = heritageSignalTheme;
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const cellW = (innerW - cellGap * (decades.length - 1)) / decades.length;
    const cellH = (innerH - cellGap * (regions.length - 1)) / regions.length;

    const color = d3.scaleSequential<string>()
      .domain([0, maxVal])
      .interpolator(d3.interpolateRgbBasis([...colorRange]));

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect.cell")
      .data(cells)
      .join("rect")
      .attr("class", "cell")
      .attr("x", (d) => d.col * (cellW + cellGap))
      .attr("y", (d) => d.row * (cellH + cellGap))
      .attr("width", cellW)
      .attr("height", cellH)
      .attr("fill", (d) => color(d.value))
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", (d) =>
        selected?.row === d.row && selected?.col === d.col ? 3 : 1
      )
      .attr("opacity", (d) =>
        selected && (selected.row !== d.row || selected.col !== d.col) ? 0.35 : 1
      )
      .style("cursor", "pointer")
      .on("click", (_, d) => setSelected((prev) =>
        prev?.row === d.row && prev?.col === d.col ? null : d
      ))
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("stroke-width", 2);
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.opacity = "1";
        tip.innerHTML = `<strong>${d.region}</strong><br/>${d.decade} · ${d.value} inscriptions`;
        tip.style.left = `${event.offsetX + 12}px`;
        tip.style.top = `${event.offsetY - 8}px`;
      })
      .on("mousemove", (event) => {
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.left = `${event.offsetX + 12}px`;
        tip.style.top = `${event.offsetY - 8}px`;
      })
      .on("mouseleave", function (_, d) {
        d3.select(this).attr(
          "stroke-width",
          selected?.row === d.row && selected?.col === d.col ? 3 : 1
        );
        const tip = tooltipRef.current;
        if (tip) tip.style.opacity = "0";
      })
      .attr("opacity", 0)
      .transition()
      .duration(transitionMs)
      .attr("opacity", (d) =>
        selected && (selected.row !== d.row || selected.col !== d.col) ? 0.35 : 1
      );

    g.selectAll("text.col-label")
      .data(decades)
      .join("text")
      .attr("class", "col-label")
      .attr("x", (_, i) => i * (cellW + cellGap) + cellW / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 9)
      .text((d) => d);

    g.selectAll("text.row-label")
      .data(regions)
      .join("text")
      .attr("class", "row-label")
      .attr("x", -8)
      .attr("y", (_, i) => i * (cellH + cellGap) + cellH / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 8)
      .text((d) => d.toUpperCase());
  }, [selected]);

  return (
    <section ref={containerRef} className="relative w-full">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-ink/20 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">
            {heritageSignalTheme.chartTitle}
          </h3>
          <p className="text-sm text-ink/55">
            {heritageSignalTheme.chartSubtitle}
          </p>
        </div>
        {selected && (
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="rounded-sm border border-ink/15 px-3 py-1.5 text-xs font-medium hover:bg-ink/5"
          >
            Clear selection
          </button>
        )}
      </header>
      <svg ref={svgRef} role="img" aria-label={heritageSignalTheme.chartTitle} />
      <div ref={tooltipRef} className="vis-tooltip opacity-0" />
      <p className="mt-3 text-xs text-ink/50">
        {heritageSignalTheme.footnote}
      </p>
    </section>
  );
}
