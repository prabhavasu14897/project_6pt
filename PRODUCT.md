# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript, client-side routing derived from configuration. Static prototype: no backend; all data lives in `config/product.config.ts` (spec: `.impeccable/config/product.config.md`).

## Users

Indian households, mainly parents coordinating a family of four (current config: Arun/Dad, Priya/Mom, Anu/Daughter, Rahul/Son). They are running daily home life: who's doing what today, what to buy, what was spent, what needs servicing. Use is shared. Several members add, assign and complete items, and each person checks in briefly throughout the day on phone and desktop.

The prototype's immediate audience is **usability-testing participants**: real families who will try the core flows themselves.

## Product Purpose

HomeOS (current configuration) is one shared space for household coordination: calendar, tasks, shopping, expenses, a digital model of the house, maintenance, and family members.

Success for this prototype is that test participants complete core flows unaided and believably: adding and completing a task, checking off shopping items, adding an expense or event, finding a room's tasks and maintenance via the Digital House, and seeing who did what. Flows must respond within the session (state changes, feedback). Static screens are not enough.

## Positioning

Household coordination organised around the **home itself**. The Digital House is an isometric model of the actual home in which rooms carry their own tasks, shopping, assets and maintenance. That spatial view of the house sits next to the shared family lists and calendar.

The codebase is also deliberately **configuration-driven**: the same component system must re-skin into other "OS" products (FleetOS, StudySpace, …) by changing config and assets only. This is an architectural constraint, not the focus of the user test.

## Operating Context

- Screens: Home Dashboard, Family Calendar, Tasks, Shopping List, Expenses, Digital House, Maintenance, Family, Settings.
- Quick glances on mobile (bottom navigation, bottom sheets); fuller planning on desktop (sidebar, multi-column).
- Shared, multi-member activity: assignees, "added by", activity feed.
- Currency ₹, Indian names and household items, English UI.

## Capabilities and Constraints

- **Configuration first.** Product name, tagline, navigation, screens, theme tokens, demo data, labels, categories, statuses, rooms and asset paths come from config. Components never hardcode product-specific strings or values. Full rules: `.impeccable/context.md`, `.impeccable/skills/product-config.md`.
- Routes derive from configured navigation/screens. Avoid hardcoded pathname conditionals.
- Centralised static data. No demo data inside JSX/TSX.
- Generic, prop-driven components (AppShell, Sidebar, MobileNavigation, Card, StatCard, ActivityFeed, HouseScene, RoomMarker, RoomPanel, …). The 3D scene component consumes a configured asset and does not assume a house.
- Responsive across desktop / tablet / mobile without separate per-screen implementations (`.impeccable/skills/responsive.md`).
- In-session interactivity is required for usability testing. Persistence beyond the session is undecided.
- Interaction states: default, hover, focus, active, selected, disabled, loading, success, warning, error (`.impeccable/skills/interaction.md`).

## Brand Commitments

- Current product name **HomeOS**, tagline "Your Home, One Intelligent Space". Both live in config.
- **Binding visual reference:** `.impeccable/references/homeos-dashboard-collage.png`. It sets composition, density, sidebar, card treatment, dark ambient atmosphere and 3D placement. It is not to be redesigned unnecessarily. The current theme values are in `.impeccable/config/product.config.md` and `.impeccable/skills/design-system.md`.
- **The isometric house is the product's identity asset.** Reuse one house visual (same perspective, lighting, room composition) across Dashboard, Digital House and room views. Do not create per-screen houses or overuse 3D on cards.

## Evidence on Hand

- Reference collage with all 8 screens: `.impeccable/references/homeos-dashboard-collage.png`.
- Full demo dataset (family, tasks, events, shopping, expenses, maintenance, rooms, activity): `.impeccable/config/product.config.md`.
- **Asset sourcing decision:** the house render and family avatars exist only inside the collage. They will be cropped from it (low resolution, on-style) into the configured paths (`/assets/3d/home-house.png`, `/assets/avatars/*.png`) until higher-res assets are supplied.
- None exist and none may be fabricated: testimonials, user counts, logo file (`/assets/logo.svg` is referenced but missing), real household data.

## Product Principles

1. **The house is the map.** Spatial context (rooms) is the distinctive way into household information. Keep it recognisable and consistent everywhere it appears.
2. **Shared by default.** Every item shows who it belongs to and who acted. Coordination between members is the point.
3. **Glanceable today, plannable this week.** Lead with what matters now and give a clear path to depth.
4. **Testable truth.** Flows a participant touches must actually respond. A dead control in a usability test produces false findings.
5. **Configuration controls the product; implementation controls the experience.**

## Accessibility & Inclusion

- Never convey state (priority, status, room alerts, completion) by colour alone. Pair it with icon, text, shape or position.
- Touch-friendly targets for navigation, checkboxes, room markers and list actions on mobile.
- Important content is never hidden at small sizes. Stack it, collapse it, or move it to sheets/drawers instead.
- Visible keyboard focus. Participants may vary in tech confidence and device.
