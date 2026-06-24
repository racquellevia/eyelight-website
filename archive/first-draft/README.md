# Eyelight Labs — Portfolio Website

Full-stack Next.js portfolio for **Eyelight Labs, LLC**, showcasing interactive data visualizations built with D3.js.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Site structure

| Path | Purpose |
|------|---------|
| `/` | Home & featured projects |
| `/projects` | Project index |
| `/projects/[slug]` | Interactive visualization detail |
| `/about` | Studio story & principles |
| `/contact` | Inquiry form → `/api/contact` |

## Adding a new visualization project

1. Create `src/projects/<slug>/` with:
   - `config.ts` — theme tokens, chart copy, dimensions
   - `data/` — JSON or fetch scripts for your pipeline
   - `components/<Name>Chart.tsx` — D3 chart (client component)
   - `README.md` — how to edit aesthetics & refresh data
2. Register the project in `src/lib/projects-registry.ts`
3. Map the slug to your chart in `src/app/projects/[slug]/page.tsx`

## Seeded projects

- **Urban Breath** — EPA AQI radial telemetry (`src/projects/urban-breath/`)
- **River Currents** — USGS streamflow stack (`src/projects/river-currents/`)
- **Heritage Signal** — UNESCO inscription heatmap (`src/projects/heritage-signal/`)

## Design tokens

Global palette (also in `tailwind.config.ts`):

- Background: `#fff6ef` (`cream`)
- Text / borders: `#0a0a0a` (`ink`)
- Accents: `#fec00f` (`amber`), `#c2432c` (`rust`)

Edit `src/lib/site.ts` for company name, email, and navigation.

## Contact form & email

Submissions POST to `src/app/api/contact/route.ts` and log to the server console in development. To send real email, integrate a provider (e.g. Resend) in that route using environment variables.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- D3.js v7
