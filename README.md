# Eyelight Labs — v2

Minimal Bauhaus one-pager for **Eyelight Labs, LLC**.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit copy

`src/lib/site.ts` — headline, description, email.

## Logo

`public/logorev2.svg` (source: `logorev2.svg` in repo root).

## First draft archive

The multi-page portfolio (D3 projects, scrollytelling, etc.) lives in [`archive/first-draft/`](archive/first-draft/).

## Build (static export)

Produces a static site in `out/`:

```bash
npm run build
```

For GitHub Pages (served from `/eyelight-website/`):

```bash
GITHUB_PAGES=true npm run build
```

Preview locally:

```bash
npx serve out
```

## Deploy to GitHub Pages

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically
3. Site URL: `https://<username>.github.io/eyelight-website/`

For a custom domain at the root (no `/eyelight-website` path), build without `GITHUB_PAGES` and deploy the `out/` folder to your host.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS
