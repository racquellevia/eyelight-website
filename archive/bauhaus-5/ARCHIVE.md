# Bauhaus 5 one-pager (archived)

Snapshot of the Eyelight Labs one-pager with **Bauhaus 5** as the active theme — cream paper, geometric poster hero, interactive SVG composition, scary-mode easter egg.

Archived when switching the live site to **miro1**.

## What was preserved

- `SitePage.tsx` — page component wired to Bauhaus 5 (`b5-*` classes, `BauhausPosterArt`, `GeometricAccent`)
- `src/themes/bauhaus-5/` — theme CSS, interactive poster SVG, README (still in the repo)

## Restore Bauhaus 5

1. Set `ACTIVE_THEME` to `"bauhaus-5"` in `src/lib/theme.ts`
2. Copy `archive/bauhaus-5/SitePage.tsx` → `src/components/SitePage.tsx`
3. Ensure `globals.css` imports `../themes/bauhaus-5/theme.css`
