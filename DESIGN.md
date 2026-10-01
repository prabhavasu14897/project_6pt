---
name: HomeOS
description: Your Home, One Intelligent Space — a shared household dashboard in a warm, dark, ambient room.
colors:
  night-background: "#111315"
  chrome-night: "#0E1113"
  surface-slate: "#15191B"
  surface-raised: "#192024"
  surface-strong: "#20272A"
  lamplight-amber: "#F4B860"
  amber-ink: "#161616"
  soft-mint: "#8FD8C0"
  warm-paper-text: "#F2EEE7"
  text-secondary: "#A3ABAB"
  text-muted: "#7E8788"
  hairline: "rgba(255,255,255,0.08)"
  hairline-strong: "rgba(255,255,255,0.14)"
  success: "#8FD8C0"
  warning: "#F4B860"
  danger-rose: "#E88C8C"
  ambient-glow: "#F4B860"
  chart-1: "#3987e5"
  chart-2: "#d95926"
  chart-3: "#199e70"
  chart-4: "#c98500"
  chart-5: "#9085e9"
typography:
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
  numeric:
    fontFamily: "DM Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "1.0625rem"
    fontWeight: 500
    letterSpacing: "-0.02em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  full: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "20px"
  space-6: "24px"
  space-8: "32px"
  space-10: "40px"
  page: "24px"
  section: "24px"
  card: "20px"
components:
  button-primary:
    backgroundColor: "{colors.lamplight-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  button-ghost:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "40px"
  button-small:
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "32px"
  card:
    backgroundColor: "{colors.surface-slate}"
    rounded: "{rounded.md}"
    padding: "16px 20px 20px"
  stat-card:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "12px 16px 12px 20px"
  stat-card-hover:
    backgroundColor: "{colors.surface-raised}"
  tab:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "32px"
  tab-selected:
    backgroundColor: "{colors.lamplight-amber}"
    textColor: "{colors.amber-ink}"
  badge-pill:
    rounded: "{rounded.full}"
    padding: "0 8px"
    height: "22px"
    typography: "{typography.label}"
  nav-item:
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "0 16px 0 12px"
    height: "44px"
  nav-item-active:
    textColor: "{colors.warm-paper-text}"
  room-marker:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.full}"
  modal:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.lg}"
    padding: "20px"
  drawer-bottom:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.xl}"
  scene-frame:
    backgroundColor: "{colors.chrome-night}"
    rounded: "{rounded.lg}"
    padding: "16px"
  room-view:
    backgroundColor: "{colors.chrome-night}"
    rounded: "{rounded.md}"
  room-view-chip:
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.full}"
    padding: "4px 12px 4px 8px"
  room-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "16px"
  tab-track:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.full}"
    padding: "3px"
  checkbox:
    rounded: "6px"
    size: "20px"
  checkbox-checked:
    backgroundColor: "{colors.soft-mint}"
    textColor: "{colors.amber-ink}"
    rounded: "6px"
    size: "20px"
  maintenance-row-icon:
    rounded: "{rounded.sm}"
    size: "36px"
  segmented-track:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.full}"
    padding: "3px"
  segmented-selected:
    backgroundColor: "{colors.lamplight-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.full}"
    height: "32px"
  input:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "42px"
  field-label:
    typography: "{typography.label}"
  month-grid:
    backgroundColor: "{colors.hairline}"
    rounded: "{rounded.md}"
  month-cell:
    backgroundColor: "{colors.surface-slate}"
    padding: "8px"
    height: "104px"
  month-cell-today-date:
    backgroundColor: "{colors.lamplight-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.full}"
    size: "26px"
  event-pill:
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "22px"
  week-day:
    backgroundColor: "{colors.surface-slate}"
    rounded: "{rounded.md}"
    padding: "8px"
  event-card-compact:
    rounded: "{rounded.sm}"
    padding: "8px"
  member-toggle:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "8px 12px 8px 8px"
  task-card:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "12px 8px 12px 16px"
    height: "68px"
  task-card-open:
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    size: "44px"
  group-count:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0 6px"
    height: "20px"
  filter-chip:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "32px"
  choice:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "38px"
  detail-action:
    rounded: "{rounded.sm}"
    height: "46px"
  empty-list-frame:
    rounded: "{rounded.lg}"
  quick-add:
    backgroundColor: "{colors.surface-slate}"
    rounded: "{rounded.md}"
    padding: "12px"
  quick-add-submit:
    backgroundColor: "{colors.lamplight-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.sm}"
    height: "42px"
  shopping-category:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "16px 16px 8px"
  shopping-row-detailed:
    padding: "0 4px"
    height: "56px"
  category-swatch:
    rounded: "{rounded.full}"
    size: "10px"
  summary-bar:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.full}"
    height: "4px"
  expense-tile:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  legend-row:
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "42px"
  expense-row-icon:
    rounded: "{rounded.sm}"
    size: "36px"
  trend-bar:
    rounded: "4px 4px 0 0"
    width: "24px"
  trend-bar-current:
    backgroundColor: "{colors.lamplight-amber}"
    rounded: "4px 4px 0 0"
    width: "24px"
  trend-tooltip:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  maintenance-card:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "12px 8px 12px 16px"
    height: "72px"
  health-cell:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.sm}"
    padding: "12px"
  asset-icon:
    rounded: "{rounded.md}"
    size: "56px"
  asset-action:
    backgroundColor: "{colors.lamplight-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.sm}"
    height: "44px"
  history-node:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.full}"
    size: "28px"
  member-card:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.warm-paper-text}"
    rounded: "{rounded.md}"
    padding: "20px 12px 16px"
  you-pill:
    textColor: "{colors.lamplight-amber}"
    rounded: "{rounded.full}"
    padding: "1px 6px"
  profile-spent-pill:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  profile-open-link:
    textColor: "{colors.lamplight-amber}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
---

# Design System: HomeOS

## Overview

**Creative North Star: "The Lit House at Night"**

HomeOS is a dark, ambient room with the lamps on. The page is near-black slate warmed by a faint amber wash from above; the isometric house sits at the center lit from inside, and everything around it is quiet, rounded, compact UI that reads like the house's control panel. Warmth comes from one source, amber lamplight, used for the active, primary and "look here" moments; soft mint is the calm counterpart for done, healthy and secondary information. Everything else is neutral.

Density is compact but unhurried: 14px body text, 12px meta lines, 16px gaps between cards, rows separated by hairlines rather than boxes. Surfaces are layered by small tonal steps of slate, a hairline border and a soft downward shadow; nothing is glossy, nothing is loud.

The system is configuration-driven. Every product value (palette, font stacks, radii, page/card spacing, shadows, motion) lives in `.impeccable/config/product.config.ts` under `theme` and is injected onto `:root` as CSS custom properties by `src/lib/theme.ts` at startup. `src/styles/tokens.css` holds the structural scale (type steps, 4px spacing scale, component dimensions, z-layers) plus semantic tokens derived from the injected palette with `color-mix(in oklab, ...)`. `src/styles/globals.css` holds all component styles and writes no literal product colors, fonts or radii. A new product re-themes by editing the config; components stay untouched.

**Key Characteristics:**
- Dark ambient canvas with a single warm light source (amber) and one calm counterpart (mint).
- Restrained color: neutrals carry the screen; accents mark state, action and selection only.
- One UI family (Manrope) at a fixed ~1.125 rem scale; DM Mono only for numerals.
- Rounded, softly lit surfaces: 10px controls, 16px cards, pill chips and markers.
- The isometric house is the centerpiece, with room markers that scale with it; one scene asset serves both the whole-house view and every room close-up.
- Configurable product values vs. structural scale, strictly separated.

## Colors

A near-black slate ladder lit by one warm amber accent and one soft mint, with a rose reserved for problems.

### Primary
- **Lamplight Amber** (`--color-primary`, configurable): the active nav item (icon, 3px edge, gradient wash), primary buttons, selected tabs, "View all" card actions, focus ring, caret, room-marker icon rings, and the warning tone. Text on amber is always **Amber Ink** (`--color-primary-foreground`). The same hex feeds **Ambient Glow** (`--color-ambient`), which tints the page wash and the light pooled under the house.
- Derived (structural, tokens.css): `--color-primary-soft` (14% amber) for icon wells and active mobile-nav pills; `--color-primary-faint` (6%) for text-action hover; `--color-primary-border` (45%) for hovered markers; `--color-primary-hover` (amber mixed 12% toward white) for primary-button hover.

### Secondary
- **Soft Mint** (`--color-secondary`, configurable): secondary stat icons, room-marker border tint, and the success tone (task check hover, "Low" priority, completion toasts). Derived `--color-secondary-soft` / `--color-success-soft` at 14%.

### Tertiary
- **Danger Rose** (`--color-danger`, configurable): overdue, high priority, and rooms in alert. Derived `--color-danger-soft` at 16% fills alert icon wells.
- **Categorical chart palette** (`--color-chart-1..5`, configurable as `theme.colors.chart`): slot 0 blue, 1 orange, 2 aqua, 3 yellow, 4 violet, cycled by `chartColor()`. It is **categorical identity only**: it names people, shopping categories and expense categories, and never marks state, action or emphasis. Brand amber is not a chart slot; it stays the primary accent (and is the emphasis color for a single highlighted value, as in Monthly Trend). The set was validated on the card surface (#15191B): lightness within the band, chroma ≥ 0.1 for every slot, worst adjacent color-vision-deficiency ΔE 8.4, normal-vision ΔE 19.8, and every slot ≥ 3:1 contrast. It replaced an earlier amber/mint/sky/terracotta/lavender set that failed the lightness band and chroma floor and put amber and orange only ΔE 9.6 apart.
- **Member identity colors:** `family[].colorIndex` picks a zero-based chart slot (Arun 0 blue, Priya 2 aqua, Anu 3 yellow, Rahul 4 violet). Whole-household events use `calendar.householdColorIndex` (1, orange). The color reaches components as one custom property, `--event-color`, set inline by `eventColorStyle(memberId)`. Components only mix it: 20% over surface for month pills, 14% for compact week cards, 22% for avatar markers, 35–40% for borders, and full strength for dots and avatar rings.
- **Shopping category colors:** `shoppingScreen.categoryColors` maps a category name to a chart slot (Groceries 0 blue, Household 2 aqua, Personal 4 violet); an unmapped category falls back to its position. The color reaches components as `--swatch` via `categorySwatch()` and appears only as 10px round swatches and summary progress bars, always next to the category name.
- **Expense category colors:** `expenses.categories[]` carry `colorIndex` and `icon`. In donut order: Groceries 0 blue (ShoppingCart), Transport 1 orange (Car), Bills 4 violet (Zap), Home 3 yellow (Home), Other 2 aqua (Tag). Color reaches components as `--swatch` via `expenseSwatch()`: donut segments, legend dots and transaction icon wells.

### Neutral
- **Night Background** (`--color-background`): page canvas, under a fixed radial amber wash at 5%.
- **Chrome Night** (`--color-chrome`): sidebar and (at 92%, blurred) the mobile bottom nav; slightly darker than the page so navigation recedes.
- **Surface Slate** (`--color-surface`): cards, stat tiles, room markers.
- **Surface Raised** (`--color-surface-elevated`): hovered stat tiles and markers, modals, drawers.
- **Surface Strong** (`--color-surface-strong`): secondary buttons, avatar fallback, timeline nodes, progress tracks, toasts, scrollbar thumb.
- **Warm Paper Text** (`--color-text`): primary text; slightly warm off-white, never pure white.
- **Text Secondary** (`--color-text-secondary`): descriptions, inactive nav, activity sentences.
- **Text Muted** (`--color-text-muted`): meta lines, timestamps, inactive mobile-nav labels. Deliberately lifted from #687174 so 12px meta clears 4.5:1 on every surface.
- **Hairline / Hairline Strong** (`--color-border`, `--color-border-strong`): card edges and row dividers / hovered edges, dialogs, timeline spines.
- Derived interaction tints: `--color-hover` (text at 5%), `--color-pressed` (9%), `--color-glass` (surface at 90%), `--color-scrim` (background at 72%).

### Named Rules
**The One Lamp Rule.** Amber marks what is active, primary, selected or needs attention, and nothing else. It never fills a card or a section background; at most it washes the active nav item and pools as light under the house.

**The Not By Color Alone Rule.** State always carries text or shape alongside color: badges pair a dot with a word ("High", "overdue"), alert rooms swap their icon to a warning glyph and add "needs attention" for assistive tech, the active nav item adds weight and an edge bar. Calendar events are always labelled by title and person ("Priya · City Clinic"), so a member's color is never the only way to tell whose event it is.

**The Blue Never Touches Violet Rule.** Chart slot 0 (blue) and slot 4 (violet) are nearly indistinguishable under color-vision deficiency (all-pairs CVD ΔE 1.9), so they must never be adjacent in any ordered or cyclic encoding. A donut is a cycle, so check the wrap-around pair too. Any new category order is validated against this before it ships.

**The Config Owns Color Rule.** Components never write a hex. Product colors come from the theme config; every tint, ring and state is a `color-mix` derived in tokens.css, so a new palette re-themes all of them.

## Typography

**Body Font:** Manrope (with ui-sans-serif, system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** DM Mono (with ui-monospace, Cascadia Mono, Consolas), numbers and measurements only

**Character:** One friendly geometric-humanist sans does every job, from page title to 11px nav label; a mono appears only where digits need to line up and read as data. Both are self-hosted via @fontsource (Manrope 400–700, DM Mono 400/500).

### Hierarchy
- **Headline** (700, 26px / 1.625rem, 1.2, -0.015em, balanced wrap): page titles and the dashboard greeting. Drops to 20px below 768px.
- **Brand / Dialog title** (700 brand, 600 dialog, 17px / 1.0625rem): sidebar wordmark, drawer and modal titles.
- **Title** (600, 15px / 0.9375rem, 1.35, -0.005em): card titles, stat-card labels, empty-state titles.
- **Body** (400–600, 14px / 0.875rem, 1.5): base text, list-row titles (600), nav items (500), buttons (600). Tabular figures on globally.
- **Small** (500–600, 13px / 0.8125rem): card actions, tabs, toasts, date, activity sentences, small buttons.
- **Label** (500, 12px / 0.75rem): meta lines, badges (pills at 600), timestamps. 11px (`--text-2xs`) only for mobile-nav labels and avatar overflow counts.
- **Numeric** (DM Mono 500, 17px, -0.02em for stat values; 13px for event times; 12px for tab counts): times, amounts, counts, ring centers.

- **Period / panel title** (700, 20px, -0.01em): calendar toolbar period ("October 2024", 17px in narrow calendars) and the room panel title.

The full scale is fixed rem steps, ratio ~1.125: 11 / 12 / 13 / 14 / 15 / 17 / 20 / 26px. Leading tokens: tight 1.2, snug 1.35, normal 1.5.

### Named Rules
**The One Voice Rule.** Manrope is the only UI family. There is no separate display face and no fluid type; hierarchy comes from weight (400/500/600/700) and the fixed steps.

**The Mono Is For Numbers Rule.** DM Mono sets numbers and measurements (times, amounts, counts, calendar dates, fractions like "3/10", and quantities with their unit, such as "5 kg", "12 pcs" or "2 L", because a quantity is one measurement). Never use it for labels, headings or prose; a word that stands alone in a numeric column ("All day") switches to Manrope.

## Layout

App shell is a two-column grid: sidebar plus a fluid main column whose content is capped at 1480px and padded by `--space-page` (24px; 16px on phones).

**Breakpoints (viewport media queries):**
- **≥1200px:** full sidebar, 232px, logo + labelled 44px nav items, Settings pinned in a footer list above a hairline.
- **768–1199px:** compact 84px icon sidebar; labels and wordmark become visually hidden (still read by assistive tech), items become 52×48px icon targets.
- **<768px:** sidebar hidden; a 60px sticky blurred top header (logo + avatar) and a fixed 68px blurred bottom nav with the four `mobilePrimary` destinations plus a **More** item that opens a bottom-sheet drawer with the remaining destinations in a 3-column grid. Page header stacks: title, then description, then any header actions (a primary button gets 8px of extra top margin). The date moves above the title only when the header actually shows a date (the dashboard). Content gets bottom padding for the nav and safe area.

**Dashboard (container queries on the `dashboard` container):**
- **<640px:** single column: hero scene, stats (2-up, an odd last tile spans the row), events, tasks, activity.
- **640–979px:** two columns; hero and stats full width (stats 3 + 2 on a 6-column grid), events and tasks side by side, activity full width.
- **≥980px:** three columns `1fr 1fr minmax(272px, 300px)`: hero spans two with the stat column on the right; events, tasks, activity on the bottom row.

**Spacing rhythm:** 4px base scale (4, 8, 12, 16, 20, 24, 32, 40). Grid gaps 16px between cards, 12px between stat tiles, 12px inside rows, 8px row padding with hairline dividers between rows. Configurable `page`, `section` and `card` spacing come from the theme.

**Digital House:** at 1200px and up, a two-column grid `minmax(0, 1fr) minmax(340px, 380px)` with 16px gaps: the scene frame and the Rooms card stack on the left, and the room panel is an inline padded card on the right, sticky 24px from the top and scrolling within the viewport height. Below 1200px the panel moves into a Drawer that slides in from the right on tablet (768–1199px) and opens as a bottom sheet on phones (<768px). The selected room lives in the URL (`?room=<id>`); wide layouts fall back to `digitalHouse.defaultRoomId` and always show a room, while the sheet opens only when a room is requested. The scene height here is `clamp(240px, 58vh, 540px)`. The Rooms card is a size container: room tiles are 2 across, and 3 across once the container reaches 480px, so a typical room count fills whole rows.

**Expenses (`expenses` container):**
- **980px and up:** headline tiles across the top, then two independent columns: charts (Spending by Category, then Monthly Trend) at `2fr` and lists (Bills to Pay, then Recent Transactions) at `minmax(300px, 1fr)`. The columns are independent flex stacks, so a long transaction list never stretches the charts. Below 980px, `.expenses-page__col` is `display: contents` so its children join the page grid.
- **640–979px:** tiles three across; breakdown full width; transactions beside bills; trend full width.
- **Below 640px:** tiles (This Month spans the row, Today and Pending share the next one), breakdown (donut stacked above the legend), transactions, bills, trend.

**Calendar (container queries):**
- **Page (`calendar` container):** single column below 980px, in the order calendar, Upcoming Events, Family Members. At 980px and up, two columns `minmax(0, 1fr) minmax(280px, 320px)`: the calendar card with Family Members under it on the left, and Upcoming Events as a sticky right column (24px from the top).
- **Calendar card (`calendar-card` container, 16px padding):** month cells are 104px tall with event pills. At 560px or less, cells shrink to 54px, show up to three 5px colored dots instead of pills, weekday labels drop to 12px, the period label drops to 17px, and the segmented switcher spans the full row. The week view stacks days below a 760px container and becomes 7 columns (320px tall days) at and above.

**Split page (`.split-page`, `split` container; used by Tasks, Shopping, Maintenance and Family):** `.split-grid` holds `.split-main` (page tabs, then the list) and `.split-aside` (summary and filter cards).
- **900px and up:** two columns: main on the left, and a sticky 280–320px aside on the right, 24px from the top.
- **560–899px:** the aside sits under the main column as a 2-column grid.
- **Below 560px:** the aside stacks after the list. Page tabs (`.page-tabs`) stretch to the row: each segment is `flex: 1 0 auto; min-width: max-content`, so segments share the row but never squeeze below their label, and extra tabs (Shopping's four) scroll horizontally. On Tasks, the Quick Filters card is replaced by a horizontal chip strip above the list; on Shopping, the quick-add form wraps to two lines; on Maintenance, a card's "Mark done" drops under its text.
- **Family:** page header, then the member grid at full width (4 across from a 640px split container, 2 × 2 below), then the split grid 16px below it, with the member profile in `.split-main` and Family Activity in `.split-aside`.
- **Maintenance detail placement:** at 1200px viewport and up, Asset Details sits in the split aside under Home Health and always shows an item (the selection, otherwise the most urgent). Narrower, it opens in the shared Drawer (right on tablet, bottom sheet on phones) and renders bare, with no card frame inside the sheet.

Component dimensions are structural tokens: control 40px (small 32px), nav item 44px, touch target 44px, icons 16/20/24px, z-layers sticky 20 / nav 30 / toast 60.

## Elevation & Depth

A hybrid: depth is mostly tonal (background → surface → raised → strong slate steps, each with a hairline border), supported by soft, low, downward ambient shadows with a 1px inset top highlight. Glass (blur 14–16px, saturate 140%) is reserved for chrome that floats over content: the mobile header, the mobile bottom nav, and glass cards. Light itself is a depth device: a faint radial amber wash on the page, a blurred amber pool beneath the house, and on the Digital House screen a chrome-colored scene frame with a 7% ambient radial glow behind the house. The room close-up uses a bottom shade (background at 70% fading out by 45%) so its glass chip reads over any part of the art.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)`): every card and stat tile at rest.
- **Elevated** (`box-shadow: 0 1px 0 rgba(255,255,255,0.05) inset, 0 16px 40px -16px rgba(0,0,0,0.75)`): room markers floating over the scene.
- **Overlay** (`box-shadow: 0 24px 64px -12px rgba(0,0,0,0.8)`): modals, drawers, toasts.
- **Focus ring** (`box-shadow: 0 0 0 2px <background>, 0 0 0 4px <primary>`): every `:focus-visible`, replacing the outline.

### Named Rules
**The Soft Light Rule.** Shadows are diffuse and fall downward with negative spread; there are no hard or offset shadows. Hover lifts are 1–2px of translate plus a one-step tonal raise, never a bigger shadow.

## Shapes

Everything is rounded and soft-cornered. Controls, nav items, toasts and small actions use gently rounded corners (10px); cards, stat tiles and More-sheet icon wells use 16px; modals and page-level empty states 20px; drawers 24px on their leading edge(s). Chips, tabs, badges, avatars, room markers, progress bars, the active-nav edge bar and the check control are full pills or circles. The one deliberate exception is the shopping checkbox, a square with softened 6px corners. It is a component detail and not a scale step, kept square so it reads as "pick" rather than the round "mark done" control. Borders are 1px hairlines (1.5px on the check control, checkbox and marker icon rings). Room close-ups are 16:9 frames with 16px corners. The month grid is one 16px-radius frame whose 1px gutters are the border color showing between cells. Multi-day event pills square off the corners where they join, so one bar reads across the gutters. Monthly Trend bars have 4px rounded tops and square bases. That 4px is the data-end mark from the dataviz spec, a deliberate component detail rather than a radius-scale step, so the value end reads softly while the baseline stays exact. The house image is softened with a radial mask so it dissolves into the page instead of sitting in a box.

## Components

### Buttons
Compact, confident, lamplit.
- **Shape:** gently rounded (10px), 40px tall (32px small), 16px horizontal padding (12px small), 600 weight.
- **Primary:** amber fill, amber-ink text; hover mixes amber 12% toward white.
- **Secondary:** strong-slate fill with a hairline; hover strengthens the border and lightens the fill.
- **Ghost:** secondary-text color, no fill; hover adds the 5% text tint and full text color.
- **States:** press nudges 1px down; disabled at 45% opacity; loading shows a 14px spinner at 80% opacity. Transitions 150ms on the house easing.
- **Icon button:** 40px (32px small) square, 10px radius, optional strong-slate "surface" variant.
- **Text action:** card "View all" and toast actions are amber 13px/600 text with a faint amber hover wash (card action also underlines).

### Chips (Badges and Tabs)
- **Badge pill:** 22px pill, tone at 14% fill, tone text, 12px/600, always a 6px dot plus a word.
- **Badge dot:** inline 12px tone-colored text with a leading 6px dot, for meta rows; neutral uses muted text.
- **Tabs:** 32px pills, 13px/600, secondary text; hover tint; selected is solid amber with amber-ink text. Counts in DM Mono at 75% opacity.
- **Tones** are a shared hook (`tone-primary / secondary / success / warning / danger / neutral`) setting `--tone` and `--tone-soft`; priority maps high → danger, medium → warning, low → success.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** surface slate; glass variant uses 90% surface with 16px blur and a strong hairline.
- **Shadow Strategy:** Card shadow (see Elevation).
- **Border:** 1px hairline.
- **Internal Padding:** 16px top, 20px sides and bottom; header row 28px min with 12px below; title left, amber "View all" right.
- **Stat card:** 78px min height, label (15px/600) over a value line where the number is DM Mono 17px in full text and the unit in secondary text, an optional 12px muted detail line (ellipsized), and a 40px tone-colored icon at the right. Interactive tiles raise 1px and step to surface-raised on hover.

### Lists
- **Timeline (events):** 44px DM Mono time column, 28px circular strong-slate node with a hairline spine to the next item, 14px/600 title and 12px muted meta.
- **Task row:** avatar, 14px/600 title with a dot-badge meta line, and a 30px circular check control (with an enlarged hit area) that turns mint on hover/focus.
- **Activity row:** avatar plus a 13px secondary sentence with the member name bolded in full text, 12px muted relative time.
- Rows separate with a top hairline, never boxes.

### Inputs / Fields
- **Field:** a 13px/600 label with an optional muted, regular-weight "(optional)", a 6px gap, then the control. Two fields can share a row (2-column grid, 12px gap); fields stack with 16px between them.
- **Input:** 42px tall, 12px horizontal padding, strong-slate fill, 1px strong hairline, 10px radius, 14px text, muted placeholder. Hover lifts the border to 22% text; focus turns the border amber (plus the global focus ring).
- **Error:** danger border and a 13px danger message under the field, wired with `aria-invalid` and `aria-describedby`; on a failed submit, focus returns to the first invalid field.
- **Affixed input** (`.input-affix`): a muted DM Mono prefix (₹) inside the left padding of a standard input; numeric inputs (`.input--numeric`) set their value in DM Mono.

### Segmented Control
- A Tabs variant: tabs sit inside a full-pill strong-slate track with 3px padding, segments at least 64px wide and centered; the selected segment is solid amber with amber-ink text. The room-panel tabs, calendar view switcher and task tabs all use this one control. Where a narrow container needs it (calendar card ≤560px, split container <560px, room panel), the track fills its row with flexible segments that never shrink below their label. Counts inside segments use DM Mono.

### Filter Chips and Choices
- **Filter chip:** a 32px pill with a raised-slate fill, 1px strong hairline, and 13px/600 secondary text; priority chips lead with a 7px tone dot. Hover turns the border 50% tone and the text full. **Selected:** tone-soft fill, 70% tone border, full text; neutral (category) chips select to amber-soft with the 45% amber border. Selection is exposed through the toggle state, and the label always names the filter.
- **Filter groups:** fieldsets with no frame. The legend (13px/600 secondary) is floated inside the group so the hairline between groups never cuts through it, and groups are separated by 16px + hairline + 16px. An amber "Clear" text button appears in the card header while any filter is on.
- **Filter strip (phones):** the same chips in one horizontally scrolling line that bleeds to the page gutters, with a hidden scrollbar and a 1px × 20px strong divider between priority and category chips.
- **Choice (radio pill):** a 38px pill, strong-slate fill, strong hairline, 13px/600 secondary text, with the native radio visually hidden. Checked (`:has(input:checked)`): tone-soft fill, 70% tone border, full text. Keyboard focus draws the focus ring on the pill itself.

### Navigation
- **Sidebar item:** 44px, 10px radius, 14px/500 secondary text with a 20px icon; hover 5% tint; pressed 9%.
- **Active item:** full text at 600, amber icon, a left-to-right amber gradient wash (20% → 5%), and a 3px amber pill edge bar inset 10px top and bottom (12px in compact mode). The edge bar is kept because the reference collage shows it.
- **Compact (768–1199px):** 52×48px centered icon targets, labels visually hidden.
- **Mobile bottom nav:** 68px blurred chrome bar, 11px/600 muted labels under icons; the active item gets full text and a 52×30px amber-soft pill behind an amber icon. "More" opens a bottom drawer.

### Dialogs and Toasts
- **Modal:** up to 480px, 20px radius, raised surface, strong hairline, overlay shadow, 20px padding; enters from 97% scale and transparent.
- **Bottom drawer:** up to 560px wide, 85dvh max, 24px top corners, a 40×4px grabber, enters 24px up. Right drawer is 420px with 24px leading corners.
- **Backdrop:** 72% background scrim with 3px blur.
- **Toast:** strong-slate, 10px radius, overlay shadow, 24px tone-tinted circular icon, 13px message, optional amber action (Undo). Bottom-right on desktop; full width above the bottom nav on phones.

### Empty State
Centered stack: 48px amber-soft circular icon well (40px compact), 15px/600 title, 13px secondary hint capped at 40ch.

### House Scene and Room Markers (signature)
The isometric house image (1040×704) is centered, masked radially at its edges (the `#000` stop in that `mask-image` gradient is the mask's opaque alpha stop, not a color, and is deliberate), and sits over a blurred amber light pool. Its stage is a size container capped by `--scene-max-height` (dashboard: `clamp(220px, 56vh, 470px)`). Room markers are absolutely positioned at config percentages, centered on their point.
- **Marker:** full pill, 97% surface fill, hairline border tinted 26% mint, Elevated shadow, 600 weight. Font size scales with the scene via container units (`clamp(10px, 2.05cqi, 15px)`, a deliberate component detail rather than a type-scale step) and all internal sizes are in em, so markers grow and shrink with the house. On the Digital House screen each marker carries a muted second line (task count, or "Service due" in rose).
- **Minimum footprint:** each marker has a min width/height set as a percentage of the scene from config (`markerFootprint`, 21.5% × 12.6%), so every marker is the same size whatever its label length. The scene art carries no baked-in room labels; markers are the only room labels.
- **Icon:** 1.9em circle with a 1.5px amber ring and amber glyph.
- **Alert:** icon swaps to a warning glyph, ring and fill go danger rose, meta text turns rose; a hidden "needs attention" is added when there is no meta.
- **Hover/focus:** lifts 2px, border goes 45% amber, fill steps to raised. **Selected:** solid amber border, 16% amber fill; siblings fade to 78%.

### Digital House (signature)
- **Scene frame:** the house sits in its own lit frame: chrome background with a 7% ambient radial glow, 1px hairline, 20px corners, 16px padding, Card shadow. Markers are buttons that select a room and do not navigate.
- **Room panel:** a 20px/700 room title (-0.01em) with a pill status badge, the room close-up, a 13px secondary counts line ("1 task · 0 to buy · 1 service due"), then tabs for Tasks, Shopping and Maintenance. Inline at 1200px and up; inside the Drawer below that, where the drawer title replaces the panel header.
- **Room close-up:** a 16:9 frame (16px radius, hairline, chrome background) that zooms into the same scene asset as a CSS background image. No second image is used. It is centered on the room's `focus` point from config and zoomed by `digitalHouse.roomZoom` (2.6), with position clamped so the frame never shows past the image edge. A bottom shade sits under a glass chip at bottom-left: a pill with 90% surface, 10px blur and a strong hairline, holding the room icon in amber (warning icon in rose when in alert) and a 13px/600 room name.
- **Pill tab track:** the panel uses the shared segmented control (`.segmented`), full width with equal segments (scrolling horizontally if they overflow). The selected tab is solid amber; tab panels hold at least 160px so switching tabs does not jump.
- **Room tiles:** raised-slate tiles with 16px corners, 16px padding and a hairline, holding a 40px amber-soft circular icon well, the room name (600) and a 12px muted meta line. In a container of 480px or more they switch to an icon-plus-two-line grid (40px icon column spanning both lines). Hover strengthens the border and lifts 1px. **Selected:** 45% amber border and a 10% amber tint on raised slate. **Alert:** rose-soft icon well, and the meta becomes a rose 600 "Service due" paired with an alert icon.

### Room Lists (Tasks, Shopping, Maintenance)
- **Task row:** the dashboard task row is reused unchanged.
- **Shopping row (compact, room panel):** at least 48px tall, with a checkbox, item name (500), DM Mono 12px quantity in secondary text, and hairline dividers. **Checkbox:** a 20px square with 6px corners and a 1.5px strong hairline, with its hit area extended 12px on each side to touch size. Hover turns the border mint; checked fills solid mint with an amber-ink check. A checked row's name turns muted with a muted strike-through.
- **Maintenance row** (`MaintenanceItem` `row` variant, room panel): a 36px icon well (10px radius) tinted by due tone (rose when overdue, amber when due today or within `clock.dueSoonDays`, neutral when later), a 600 title, and a meta line with a dot badge for the due state. A secondary small "Mark done" button sits on the right and runs the shared `markServiced` action (see Maintenance).

### Calendar (signature)
- **Toolbar:** a 20px/700 period label, previous/next as small surface icon buttons, a ghost Today button (disabled when today is already in view) and, on the right, the segmented Month / Week / Day switcher.
- **Month grid:** weekday headers are 13px/500 secondary text. The grid is 7 columns, with cells on surface slate (hover steps to raised) and dates in DM Mono 13px inside a 26px circle. **Today:** the circle is solid amber with amber-ink text. **Selected day:** a 7% amber tint with a 1.5px inset ring at 45% amber. **Outside the month:** muted dates at 60% opacity. A cell shows at most `calendar.monthCellLimit` (2) pills, then a "+n more" in 11px/600 secondary text.
- **Event pill:** 22px tall, 10px radius, 8px padding, a 20% event-color tint over surface with a 40% event-color border, a 6px event-color dot, and 12px/600 text with ellipsis. Multi-day events extend across the gutters (`continues-before` / `continues-after`): joined sides lose their border and radius, and only the first segment shows the dot.
- **Week view:** each day is a bordered 16px-radius surface card with a 13px/600 header button (amber when it is today). The selected day gets a 45% amber border and a 6% amber tint. Compact event cards are 10px-radius blocks tinted 14% with a 35% border in the event color, showing the time (12px secondary), a 13px title that wraps, and "person · place". An empty day shows a quiet 12px muted "Nothing planned".
- **Event card (agenda rows):** a 48px DM Mono time column (when there is no time, "All day" is set in the UI face at 12px/600 secondary text, because it is a word, not a number), a 30px avatar marker with a 2px event-color ring over a 22% tint (a users icon for household events), a 600 title with ellipsis, and a 12px muted "person · place" line. Rows are split by hairlines and grouped under 13px/600 secondary day headings ("Today, Tue 8 Oct"), with 20px between groups.
- **Member filter toggles:** raised-slate 16px-radius buttons that auto-fill at a 132px minimum, each with an avatar wearing a 2px event-color ring (offset 2px), a 600 name and a 12px muted relationship. `aria-pressed` means "shown". **Hidden:** 55% opacity, grayscale, the ring goes to strong hairline, and the name is struck through, so the state is not carried by color alone.
- **Add event:** the one create flow in the calendar, in a Modal. It holds the form, with footer actions ghost Cancel and primary Add event.

### Tasks (signature)
- **Tabs:** My Tasks (assigned to the current user), Family Tasks (all open) and Completed, each with a DM Mono count, in the segmented track. Only tabs backed by real data ship (there is no Recurring tab).
- **Grouped list:** open tasks are grouped under due headings Overdue, Today, Tomorrow and Coming up: 13px/600 secondary text (rose for Overdue) with a 20px strong-slate DM Mono count capsule (11px), and 20px between groups. Completed is one flat list, newest due date first.
- **Task card** (`TaskItem` card variant): a standalone surface-slate card with a 16px radius, hairline, Card shadow and 68px minimum height, 8px between cards. Contents: the square checkbox (shared with shopping, mint when checked), a 36px avatar, a title with a meta line (person • due • priority dot badge), and a trailing 44px muted chevron button (10px radius, hover tint) that opens details. Hover strengthens the border. **Done:** muted, struck-through title and the avatar at 60%. Checking shows a success toast with Undo; unchecking reopens the task with a neutral toast. The dashboard `row` variant is unchanged.
- **Task detail drawer:** right side on tablet and desktop, bottom sheet on phones. A definition list with a 120px secondary label column and 48px rows split by hairlines: Assigned to (avatar + name), Due ("Tomorrow, Wed 9 Oct"), Priority (pill badge), Category, and Room when set. Below it a full-width 46px action: primary "Mark complete", or secondary "Move back to pending" when done.
- **Task Progress card:** a 132px progress ring in the success tone, with a DM Mono "3/10" value (20px) over a 12px muted "completed" caption, beside a legend list (`dt`/`dd`): Completed (success dot), Pending (warning dot) and Overdue (danger dot), each with a DM Mono count.
- **Add task modal:** Name (required, same inline error pattern), then Assign to + Due date on one row, Priority as choice pills, then Category + Room (optional, "No specific room"). The new task joins the shared store and appears in Recent Activity.
- **Empty list:** the standard EmptyState inside a dashed strong-hairline frame with 20px corners, with filter-aware copy ("No tasks match these filters" / "Clear a filter to see more").

### Shopping (signature)
- **Page tabs:** All plus the categories derived from the data, each with a DM Mono open-item count, in the segmented track.
- **Quick add:** an inline form in a padded (12px) surface card, chosen over a modal because adding an item is one line. On wide screens it is one line: name (fluid), quantity (96px), a category select (150px) and a 42px primary "Add". Below a 560px split container it takes two lines: name full width, then quantity (76px), category and Add. An empty name shows the standard danger error under the row; after adding, focus stays in the name field. The header "Add Item" button focuses and scrolls to this input rather than opening a dialog.
- **Category section:** one surface card per category (16px radius, hairline, Card shadow, 16px padding, 8px at the bottom). The title row is the 10px swatch, a 15px/600 name and a 20px DM Mono count capsule (the same capsule as task groups). Items still needed come first; bought items sink to the bottom, struck through, with the mint checkbox. When everything is bought, a 13px muted line reads "Everything here is in the cart."
- **Detailed shopping row** (`ShoppingItem` `detailed`): at least 56px, with the checkbox, the item name over a 12px muted "Added by Priya · Today" meta, a DM Mono 12px quantity in secondary text, and a 24px avatar of whoever added it. The compact room-panel row is unchanged.
- **Clear bought items:** a secondary header button shown only when something is bought. It removes every bought item and toasts a plural message ("2 bought items cleared") with Undo, which restores them.
- **Shopping Summary card:** a 132px mint (secondary-tone) ring with the same centered stack as Task Progress, here a DM Mono "1/11" over an "in the cart" caption. Below it, one row per category: swatch + name in 13px secondary text, a DM Mono count of items still needed, and a 4px strong-slate bar whose fill (in the swatch color) shows the bought share via `transform: scaleX` and animates on the slow duration. On phones the summary stacks after the list.

### Expenses (signature)
- **Headline tiles:** surface cards (16px radius, Card shadow, 16px × 20px padding) for This Month, Today and Pending. Each has a 13px/500 secondary label, a 26px DM Mono value (500, -0.03em) and a 12px/600 detail line. This Month's detail is the computed change against last month, worded in the direction that is good for spending: "3% less than last month" in the success tone with a TrendingDown icon, "more" in danger with TrendingUp, and "Same as last month" neutral. Pending's detail is the plural bill count ("2 bills due") in warning. Today's detail is muted.
- **Spending by Category:**
  - **Donut:** 196px, 26px stroke. Segments are separated by a 2px surface gap (dash length minus 2px, no segment strokes) and drawn in fixed config order, never sorted, so the validated color adjacency holds. The center shows the DM Mono total (20px) over "paid this month", or the hovered/selected category's amount and name. Hovering or focusing a category dims the other segments to 0.28.
  - **Legend:** a 12px muted hint, then button rows (42px, 10px radius): a 10px swatch, the name (500, full text), a DM Mono percentage in secondary text (44px column) and a DM Mono amount. Hover tints the row; other rows dim to 0.55. Clicking a row filters Recent Transactions (`aria-pressed`) and gives it a primary-faint fill with a 1px inset primary-border ring; the list then shows a muted "Showing Groceries" line, and "Show all" clears the filter.
- **Monthly Trend:** a single series in the emphasis pattern. Past months are neutral (text-muted mixed 42% into the surface); the current month is primary amber with its DM Mono value on the cap, and its month label goes full text at 600. Bars are at most 24px wide (60% of the column) with 4px rounded tops and square bases. The 200px plot has hairline gridlines at clean ticks (0 / 5K / 10K / 15K, compact locale format) labelled in a 40px DM Mono 11px muted axis column. Bars are focusable: hover or focus shows a tooltip (strong slate, strong hairline, Overlay shadow, 10px radius) with the month name in 12px secondary Manrope over a DM Mono amount, and hover lightens a past bar to 75% muted. A visually hidden table is the accessible twin. There is no legend, because the title names the single series.
- **Bills to Pay:** pending expense rows with a due dot badge (warning when due soon, danger when overdue), a DM Mono amount and a secondary small "Mark paid" button. Paying moves the bill into this month's paid total; Undo on the toast reverts it to pending with its original due date.
- **Recent Transactions:** expenses paid this month, newest first, filterable from the legend.
- **Expense row:** at least 56px with hairline dividers. A 36px icon well (10px radius) with the category swatch at 20% over surface and the glyph mixed 60% swatch toward text, a 600 title with ellipsis over a 12px muted "Today · Priya" meta, and a DM Mono 13px amount.
- **Add expense modal:** What for (required), Amount (required, > 0; affixed ₹ input with DM Mono value), Category, Date, Paid by, and Status as choice pills (Paid in the success tone, Due later in warning). Each field shows its own error, and focus moves to the first invalid field.
- **Header actions:** only Add Expense. The reference's "View Reports" and "Set Budget" quick actions were removed on purpose, because no feature backs them.

### Maintenance (signature)
- **Model:** maintenance is recurring upkeep. Items carry `intervalMonths` (none for a one-off job) and a newest-first `history` of `{ date, note, byId }` records.
- **Mark done** (`markServiced`, shared by the Maintenance screen, Asset Details and the Digital House room panel): logs a service record today. A recurring item reschedules to today plus its interval and stays open; a one-off completes. The success toast names the next date ("“Car Service” done. Next due Tue, 8 Apr"), and Undo restores the item exactly. It replaces the reference's "Book" button, because nothing exists to book with.
- **Page tabs:** Due Soon (overdue, or due within `clock.dueSoonDays`), Upcoming (later) and History (all service records), each with a DM Mono count in the segmented track. History replaces the reference's "Completed".
- **Maintenance card** (`card` variant): a standalone surface card (16px radius, hairline, Card shadow, 72px minimum, 8px between cards). Contents: a 40px tone icon well (danger when overdue, warning when due soon, neutral later); the title as a button that opens details (underlined on hover); a meta line with room, due dot badge and the cadence ("Every 6 months" / "One-off"); a secondary small "Mark done"; and a 44px muted chevron. Hover strengthens the border. **Selected:** 45% amber border and a 6% amber tint. Below a 560px split container, "Mark done" drops under the text and the chevron stays top right.
- **Home Health card:** three equal cells (Overdue, Due this week, Later). Each is a raised-slate 10px-radius cell with a 2px inset top rule in its tone (danger, warning, success), a 20px DM Mono count and a 12px secondary label. The tone always comes with its label.
- **Asset Details:** a hero row with a 56px 16px-radius tone icon well (danger when overdue, otherwise amber), a 17px bold title over the room in 13px muted text, and an "Overdue" pill badge when late. Then a facts definition list with 40px hairline rows (Last serviced, Next service, Repeats; 13px secondary labels, 600 values), a full-width 44px primary "Mark done", and a 13px/600 secondary "Service History" subheading over the timeline.
- **Service history timeline:** 28px round strong-slate nodes with a strong hairline, holding a success check (or the item's icon in the all-items feed), joined by a 1px strong connector. Beside each node: a 14px/600 title, a 12px muted meta (note · room · person) and a DM Mono 12px secondary date, with the year added when it is not the current year. On the History tab it is the all-items feed inside a padded card.
- **Add maintenance modal:** What needs upkeep (required, standard error), Room, Type (a config list of icon + label: General, Cooling, Water, Heating, Appliance, Laundry, Vehicle, Power), Next due (default today + 30 days) and Repeat (Just once, or every 1, 3, 6 or 12 months; default 6).

### Family (signature)
- **Identity halo:** a member's avatar wears two rings: a 3px gap in the surface color, then a 2px ring in their identity color (`--event-color`, from `family[].colorIndex`). Used on member cards (64px), the profile header (56px), and, without the gap, member filter toggles. When the card behind it is tinted, the gap ring follows the tint so the halo stays clean.
- **Member card:** the whole card is a button (`aria-pressed` = this profile is shown), centered content, on a surface card (16px radius, hairline, Card shadow, 20px top / 12px sides / 16px bottom padding). Contents: the 64px avatar with halo, a 15px/600 name with an 11px/600 amber-soft "You" micro pill for the current user, the relationship in 13px muted text, and a 12px secondary stats line with muted dot separators ("2 tasks · 3 events": open tasks, and the member's own events in the next `familyScreen.upcomingDays`, 7). Hover strengthens the border and lifts 1px. **Selected:** 45% amber border and a 7% amber tint.
- **Member profile card:** a header with the 56px haloed avatar, a 20px bold name over the relationship in 13px muted text, and, only when the member paid anything this month, a strong-slate 13px secondary pill ("₹8,190 paid this month"). Below it, segmented tabs fill the row with counts (Tasks, Calendar, Expenses, Activity) and scroll horizontally if they don't fit. Panels hold at least 200px and reuse existing components: task rows without the assignee, the day-grouped event list, expense rows, and the member's own activity feed. Each data panel ends with an amber 13px/600 text link to the full screen ("Open Tasks", "Open Calendar", "Open Expenses"; faint amber wash and underline on hover). Empty states name the person ("Priya has nothing pending.").
- **Family Activity:** the whole-family feed in the split aside, grouped under Today / Yesterday / date headings (13px/600 secondary, 16px between groups). Each item is the activity row: avatar, the bold member name with the action in secondary text, then the time ago in muted text. It is distinct from the dashboard's capped Recent Activity card.

### Motion
Durations 150ms (fast: color, background, border), 200ms (base: fades, marker lift), 250ms (slow: dialogs, toasts, progress fills), all on `cubic-bezier(0.22, 1, 0.36, 1)`. Configurable in the theme. `prefers-reduced-motion: reduce` collapses all transitions and animations to near-zero.

## Do's and Don'ts

### Do:
- **Do** put new product values in `theme` in the product config and read them through the injected custom properties; derive tints with `color-mix` in tokens.css.
- **Do** keep amber for active, primary, selected and attention states, and mint for done, healthy and secondary information.
- **Do** pair every color-coded state with text or a shape change (dot + word, icon swap, weight + edge bar).
- **Do** use the fixed rem steps (11–26px) and Manrope weights for hierarchy; set times, amounts and counts in DM Mono.
- **Do** use Text Muted (#7E8788 via `--color-text-muted`) or stronger for any text, including 12px meta.
- **Do** separate list rows with hairlines and layer surfaces with the slate steps plus the Card shadow.
- **Do** lay out dashboard-like screens with container queries, and the shell with the 1200 / 768 viewport breakpoints.
- **Do** size scene overlays with container units and em so they scale with the artwork, with a configured minimum footprint.
- **Do** show room close-ups by zooming the one scene asset to the room's configured `focus`; keep room selection in the URL.
- **Do** put secondary panels inline at 1200px and up and in a Drawer below that (right on tablet, bottom sheet on phones).
- **Do** color people through `--event-color` from their configured chart slot, mixed as a tint, border, dot or ring, and always label events with title and person.
- **Do** use the segmented pill track for view switching and panel tabs, with the selected segment in solid amber.
- **Do** build form fields as a 13px/600 label over a 42px strong-slate input, with an amber focus border and a danger border plus message on error.
- **Do** use 32px pill chips for filters (tone dot for priority, tone-soft when selected) and 38px choice pills for single-choice form inputs; on phones, put the filters in one scrolling strip.
- **Do** group lists under due headings with DM Mono count capsules, and open item details in the shared Drawer (right on wider screens, bottom sheet on phones).
- **Do** ship only tabs and filters backed by real data; filter options such as categories are derived from the data.
- **Do** name an action for what the product actually does ("Mark done" logs a service and reschedules) and route every entry point through the same shared action, with Undo.
- **Do** keep a detail panel inline in the split aside at 1200px and up and in the Drawer below that, frameless inside the sheet.
- **Do** mark a person with the identity halo (surface gap + 2px `--event-color` ring) wherever their avatar stands for them, and reuse existing list components in per-person panels.
- **Do** build list-plus-summary screens on the shared split page (900 / 560 container breakpoints) with `.page-tabs` segments that never squeeze below their label.
- **Do** add one-line items inline (quick add) and keep modals for multi-field create flows; a header action for an inline form focuses that form.
- **Do** color categories through `--swatch` from `shoppingScreen.categoryColors` or the expense categories' `colorIndex`, always beside the category name.
- **Do** use the categorical chart palette only for identity (people, categories), keep chart order fixed, and keep blue (slot 0) and violet (slot 4) apart, including across a donut's wrap-around.
- **Do** show a single trend in the emphasis pattern: neutral history, the current value in amber with its label on the cap, hairline gridlines at clean ticks, a tooltip on hover and focus, and a hidden data table as the accessible twin.
- **Do** word deltas in the direction that is good for the user ("less" spending is success) and pair the tone with a trend icon and words.
- **Do** use 150/200/250ms on `cubic-bezier(0.22, 1, 0.36, 1)` and honor reduced motion.

### Don't:
- **Don't** write hex colors, font names or radii in component CSS; globals.css reads tokens only.
- **Don't** fill cards or sections with amber, or introduce a third accent. Chart colors are identity, not accents, and amber is never a chart slot.
- **Don't** signal state by color alone.
- **Don't** add a second UI typeface, a display face or fluid type; don't use DM Mono for words other than a unit attached to a number.
- **Don't** use pure white text, pure black surfaces, or the old #687174 muted gray.
- **Don't** use hard or offset shadows; lift with tone and a 1–2px translate.
- **Don't** use square corners; controls start at 10px and chips are pills. The only smaller radius is the 6px checkbox.
- **Don't** ship a second image per room or bake room labels into the scene art.
- **Don't** hard-code a person's color or fill whole cells or cards with it; member color reaches components only through `--event-color`.
- **Don't** sort donut or legend segments by value; the fixed config order is what keeps the validated color adjacency.
- **Don't** ship actions or tabs with no feature behind them (no "View Reports", "Set Budget", "Book" or "Invite Member" placeholders), and don't add quick-action tiles that only duplicate navigation.
- **Don't** set standalone words in DM Mono, even inside a numeric column ("All day" is Manrope); only a unit attached to its number ("5 kg") stays in DM Mono.
