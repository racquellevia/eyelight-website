# Urban Breath

**Civic air quality** — radial bar chart of median annual AQI by U.S. metro.

## Public data source

[U.S. EPA Air Quality System (AQS)](https://aqs.epa.gov/aqsweb/documents/data_api.html) — annual summary statistics. The bundled `data/aqi-cities.json` uses representative 2023 medians for portfolio demo; replace with your own export.

## Files to edit for aesthetics

| File | What to change |
|------|----------------|
| `config.ts` | `aqiColors`, radii, fonts, chart title/footnote, animation duration |
| `components/UrbanBreathChart.tsx` | D3 scales, arc padding, hover behavior, sort controls |
| `data/aqi-cities.json` | City list, AQI values, population |

## Refreshing data (pipeline sketch)

1. Query EPA AQS API or download annual summary CSV for PM2.5 / Ozone.
2. Compute median AQI per CBSA or city.
3. Write JSON matching the schema in `aqi-cities.json`.
4. Rebuild the site (`npm run build`) or hot-reload in dev.

## Color semantics

AQI buckets map to studio palette in `config.ts`:

- 0–50 Good → amber
- 51–100 Moderate → cream (bordered)
- 101–150 Sensitive → rust
- 151+ Unhealthy → ink

Adjust thresholds in `aqiColor()` inside `UrbanBreathChart.tsx` if you change scales.
