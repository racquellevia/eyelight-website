# River Currents

**Environmental streamflow** — stacked streamgraph of USGS gauge discharge on the Colorado River basin.

## Public data source

[USGS National Water Information System (NWIS)](https://waterservices.usgs.gov/) — daily mean discharge (`00060`). Bundled `data/streamflow.json` contains monthly aggregates for four gauges (2015–2024) as a demo subset.

## Files to edit for aesthetics

| File | What to change |
|------|----------------|
| `config.ts` | `stationColors`, margins, height, opacity, axis labels |
| `components/RiverCurrentsChart.tsx` | Curve type, brush behavior, axis ticks |
| `data/streamflow.json` | Months array + per-station discharge series |

## Refreshing data (pipeline sketch)

1. Use USGS `dv` service, e.g. `https://waterservices.usgs.gov/nwis/dv/?format=json&sites=09380000&parameterCd=00060&startDT=2015-01-01`
2. Aggregate daily values to monthly means per site.
3. Align all series to the same `months` array.
4. Update `stations` metadata and `series` keys in JSON.

## Interaction

- **Brush** (timeline below chart): drag to filter year range; state stored in React and re-renders the streamgraph.
- **Hover** a stream layer to highlight gauge name.

To add gauges, extend `stations`, add a color in `config.stationColors`, and include a new key in `series`.
