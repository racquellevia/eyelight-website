# Heritage Signal

**Cultural heritage** — UNESCO World Heritage inscription heatmap by region and decade.

## Public data source

[UNESCO World Heritage Centre](https://whc.unesco.org/en/list/) — List of World Heritage Sites. The bundled `data/heritage-inscriptions.json` aggregates **new inscriptions per decade** by UNESCO regional classification (portfolio demo aligned with public WHC statistics).

## Files to edit for aesthetics

| File | What to change |
|------|----------------|
| `config.ts` | `colorRange`, margins, cell gap, chart copy |
| `components/HeritageSignalChart.tsx` | Cell interaction, labels, transitions |
| `data/heritage-inscriptions.json` | `decades`, `regions`, `values` matrix |

## Data schema

```json
{
  "decades": ["1970s", "..."],
  "regions": ["Africa", "..."],
  "values": [[row0col0, row0col1, ...], ...]
}
```

Each `values[row][col]` = count of new inscriptions in that region/decade.

## Refreshing data

1. Export or scrape WHC listing with inscription year and region.
2. Bin by decade and UNESCO region.
3. Update the `values` matrix (rows = regions, cols = decades).
4. Rebuild or hot-reload.

## Interaction

- **Hover** — tooltip with region, decade, count
- **Click** — lock highlight on a cell; dims others
- **[CLR] Reset lock** — clears selection
