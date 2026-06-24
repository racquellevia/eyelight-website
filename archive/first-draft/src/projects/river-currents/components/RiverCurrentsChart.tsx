"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { riverCurrentsTheme } from "../config";
import streamData from "../data/streamflow.json";

type SeriesKey = keyof typeof streamData.series;

export function RiverCurrentsChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [brushRange, setBrushRange] = useState<[number, number] | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const width = container.clientWidth;
    const { margin, height, stationColors, areaOpacity, strokeWidth, transitionMs } =
      riverCurrentsTheme;
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const months = streamData.months;
    const stationIds = streamData.stations.map((s) => s.id) as SeriesKey[];
    const stationNames = Object.fromEntries(
      streamData.stations.map((s) => [s.id, s.name])
    );

    const longData = months.flatMap((month, i) =>
      stationIds.map((id) => ({
        month,
        index: i,
        station: id,
        value: streamData.series[id][i],
      }))
    );

    const [i0, i1] = brushRange ?? [0, months.length - 1];
    const filteredMonths = months.slice(i0, i1 + 1);
    const filteredLong = longData.filter(
      (d) => d.index >= i0 && d.index <= i1
    );

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height + 56}`).attr("width", "100%");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint<string>()
      .domain(filteredMonths.filter((_, idx) => idx % 6 === 0))
      .range([0, innerW])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredLong, (d) => d.value) ?? 0])
      .nice()
      .range([innerH, 0]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(stationIds)
      .range(stationColors);

    const rows = filteredMonths.map((month, idx) => ({
      month,
      index: i0 + idx,
    }));

    const stack = d3
      .stack<{ month: string; index: number }>()
      .keys(stationIds)
      .value((d, key) => streamData.series[key as SeriesKey][d.index])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackData = stack(rows);
    const xStep = filteredMonths.length > 1 ? innerW / (filteredMonths.length - 1) : 0;

    const area = d3
      .area<d3.SeriesPoint<{ month: string; index: number }>>()
      .x((_, i) => xStep * i)
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]))
      .curve(d3.curveMonotoneX);

    g.selectAll("path.layer")
      .data(stackData)
      .join("path")
      .attr("class", "layer")
      .attr("fill", (d) => color(d.key) as string)
      .attr("opacity", areaOpacity)
      .attr("stroke", "#0a0a0a")
      .attr("stroke-width", strokeWidth)
      .attr("d", area)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 1);
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.opacity = "1";
        tip.innerHTML = `<strong>${stationNames[d.key]}</strong>`;
      })
      .on("mousemove", (event) => {
        const tip = tooltipRef.current;
        if (!tip) return;
        tip.style.left = `${event.offsetX + 12}px`;
        tip.style.top = `${event.offsetY - 8}px`;
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", areaOpacity);
        const tip = tooltipRef.current;
        if (tip) tip.style.opacity = "0";
      })
      .attr("opacity", 0)
      .transition()
      .duration(transitionMs)
      .attr("opacity", areaOpacity);

    const xAxis = d3.axisBottom(x).tickSize(0);
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(xAxis)
      .call((sel) => sel.select(".domain").remove())
      .selectAll("text")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 9)
      .attr("transform", "rotate(-35)")
      .style("text-anchor", "end");

    const yAxis = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => d3.format("~s")(d as number));
    g.append("g")
      .call(yAxis)
      .call((sel) => sel.select(".domain").remove())
      .selectAll("text")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 9);

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -margin.left + 14)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--font-sans)")
      .attr("font-size", 9)
      .text(riverCurrentsTheme.yAxisLabel);

    const brushG = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + 8})`);

    const brushX = d3.scaleLinear().domain([0, months.length - 1]).range([0, innerW]);
    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [innerW, 24],
      ])
      .on("end", (event) => {
        if (!event.selection) return;
        const [x0, x1] = event.selection as [number, number];
        const start = Math.round(brushX.invert(x0));
        const end = Math.round(brushX.invert(x1));
        setBrushRange([Math.min(start, end), Math.max(start, end)]);
      });

    brushG
      .append("rect")
      .attr("width", innerW)
      .attr("height", 24)
      .attr("fill", "#fff6ef")
      .attr("stroke", "#0a0a0a");

    brushG
      .append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, [brushX(i0), brushX(i1)]);
  }, [brushRange]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">
          {riverCurrentsTheme.chartTitle}
        </h3>
        <p className="text-sm text-ink/55">
          {riverCurrentsTheme.chartSubtitle}
        </p>
      </div>
      <svg ref={svgRef} role="img" aria-label={riverCurrentsTheme.chartTitle} />
      <div ref={tooltipRef} className="vis-tooltip opacity-0" />
      <p className="mt-4 text-xs text-ink/50">{riverCurrentsTheme.footnote}</p>
      <ul className="mt-4 flex flex-wrap gap-4 text-xs text-ink/60">
        {streamData.stations.map((s, i) => (
          <li key={s.id} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-6 border border-ink"
              style={{ background: riverCurrentsTheme.stationColors[i] }}
            />
            <span className="max-w-[200px] truncate">{s.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
