# HomeOS prototype

A configuration-driven, responsive web prototype (React + Vite + TypeScript). The same component
system can present a different product by changing configuration and assets only.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # strict TypeScript, no `any`
npm run build
```

## Where things live

| Concern | Location |
| --- | --- |
| Product config (single source of truth) | `.impeccable/config/product.config.ts` |
| Runtime config entry | `src/config/product.ts` (typed re-export), `src/config/index.ts` (fonts) |
| Types | `src/types/*` |
| Theme → CSS variables | `src/lib/theme.ts`, `src/styles/tokens.css` |
| Component styles | `src/styles/globals.css` |
| In-session state + derived counts | `src/data/prototype.ts` |
| Routes (derived from navigation config) | `src/app/layout.tsx` (also the app entry) |
| Icon vocabulary config may use | `src/components/navigation/NavigationIcon.tsx` |
| Shared scene asset | `public/assets/3d/home-house.png` |

## Changing the product

Edit `.impeccable/config/product.config.ts`: name, theme colors and fonts, navigation (labels,
icons, routes, order, `enabled`, `mobilePrimary`), screen titles, dashboard stat cards, copy (`ui`),
demo data and asset paths. Replace files under `public/assets/`. If the type faces change, swap the
`@fontsource` imports in `src/config/index.ts`.

Room markers are positioned on the scene image by `rooms[].position` (% of the image), and
`assets.scene.markerFootprint` keeps each marker large enough to cover any labels baked into the art.

## Prototype notes

- The clock is fixed (`clock.now`) so "Today", "Tomorrow" and "2h ago" stay stable during testing.
- Counts and totals (pending tasks, open shopping items, monthly spend, maintenance due soon) are
  derived from the data, so they update as testers complete tasks. State resets on reload.
- The house and avatars are low-resolution crops from the reference collage; replace them with
  high-resolution files at the same paths when available.
