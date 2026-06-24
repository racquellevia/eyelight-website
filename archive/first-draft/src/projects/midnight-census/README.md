# Midnight Census

**Personal scrollytelling** — cockroach counts over time, Moroccan rug aesthetics, scroll-driven chart + scurrying sprites.

## Route

`/projects/midnight-census`

## Edit your data

`data/sightings.json`:

- **`sightings`** — array of `{ date, count, room, note }` (one row per observation night)
- **`steps`** — narrative beats; set `highlightIndex` to a sightings array index (or `null`)

## Edit look & feel

| File | Purpose |
|------|---------|
| `config.ts` | Rug colors, chart size, **photo paths** |
| `midnight-census.css` | Scroll layout, step panels, roach layer |
| `components/MoroccanPattern.tsx` | Diamond / star tile palettes per step |
| `components/ScurryingRoaches.tsx` | Roach paths, sizes, scroll speed |
| `components/CountChart.tsx` | D3 line chart styling |

## Photos we need from you

Drop images here (JPEG or WebP recommended):

```
public/projects/midnight-census/photos/
  roach-kitchen.jpg      ← kitchen sighting
  roach-baseboard.jpg    ← hallway / baseboard
  roach-rug-edge.jpg     ← on or near rug
```

Then in `config.ts`, set each entry’s `enabled: true` after the file exists:

```ts
roachPhotos: [
  { id: "roach-a", src: "/projects/midnight-census/photos/roach-kitchen.jpg", enabled: true, ... },
  ...
]
```

Until then, **SVG cockroach sprites** are used automatically.

### Optional extras

- **More photos:** add entries to `roachPhotos` and assign `photoIndex` on roaches in `ScurryingRoaches.tsx` (`ROACHES` array).
- **Room icons or rug texture photo:** we can add a full-bleed background image field in `config.ts` if you supply a high-res rug scan.
- **Your own copy:** rewrite `steps` in `sightings.json` to match your household story.

## How scrolling works

1. **Text steps** (right on desktop) trigger `IntersectionObserver` → updates active step.
2. **Sticky chart** (left) highlights the point for `highlightIndex`.
3. **Roaches** move horizontally based on scroll progress through the story block.
