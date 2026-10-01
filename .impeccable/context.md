# Product Prototype Context

## Purpose

Build a polished, responsive web prototype using a configuration-driven architecture.

The project must NOT hardcode product-specific:

* Product name
* Tagline
* Navigation labels
* Screen names
* Colors
* Fonts
* Demo data
* Content
* Categories
* User names
* Feature names
* Status labels
* 3D room labels
* Dashboard statistics

All product-specific information must come from:

`config/product.config.ts`

or the project's equivalent configuration source.

---

# Core Principle

## Configuration controls the product.

The implementation controls the experience.

The same UI system should be reusable for completely different products by changing configuration.

For example:

```text
Product A
Product name: HomeOS
Theme: Warm Ambient Dark
Navigation: Home, Calendar, Tasks...

Product B
Product name: FleetOS
Theme: Industrial Dark
Navigation: Dashboard, Vehicles, Drivers...

Product C
Product name: StudySpace
Theme: Calm Light
Navigation: Dashboard, Courses, Tasks...
```

The components should not need to be rewritten for these changes.

---

# Primary Reference

The provided visual reference is:

`references/homeos-dashboard-collage.png`

Use this image as the primary visual reference for:

* Overall composition
* Visual hierarchy
* Dark ambient UI
* Card treatment
* Sidebar
* 3D/isometric visuals
* Spacing
* Information density
* Navigation treatment
* Dashboard composition
* Visual polish

The 3D house visuals from the reference should be treated as reusable product assets.

Do not replace them with unrelated illustrations unless explicitly requested.

---

# Current Product Configuration

The current product is configured as:

**HomeOS**

Current configuration is defined entirely in:

`config/product.config.ts`

The implementation must read product information from that configuration rather than embedding HomeOS directly into components.

---

# Static Prototype Data

This is a frontend prototype.

Use static configuration/data rather than building backend APIs unless explicitly requested.

Static data should include:

* Dashboard information
* Navigation
* Screen definitions
* Events
* Tasks
* Shopping items
* Expenses
* Maintenance items
* Family members
* Rooms
* Activities
* Statistics
* Labels
* Statuses
* Categories

Keep static data centralized.

Do not scatter demo data across JSX/TSX files.

---

# Configuration Rules

The configuration should control:

### Product

* Name
* Short name
* Tagline
* Logo
* Description

### Theme

* Background
* Surface colors
* Accent colors
* Text colors
* Border colors
* Typography
* Radius
* Shadows

### Navigation

* Menu items
* Icons
* Routes
* Labels
* Ordering
* Visibility

### Screens

Each screen can define:

* ID
* Route
* Title
* Description
* Enabled state
* Layout type
* Primary action
* Content sections

### Content

Static content must be configurable.

Examples:

* People
* Events
* Tasks
* Shopping
* Expenses
* Maintenance
* Rooms
* Activities
* Dashboard statistics

---

# Component Architecture

Build reusable components.

Examples:

* AppShell
* Sidebar
* MobileNavigation
* Header
* PageHeader
* Card
* GlassCard
* StatCard
* Button
* IconButton
* Avatar
* AvatarGroup
* Badge
* Tabs
* List
* ListItem
* Modal
* Drawer
* Toast
* Chart
* Calendar
* DataTable
* ActivityFeed
* EmptyState
* HouseScene
* RoomMarker
* RoomPanel

Components should receive data through props/configuration.

Avoid embedding product-specific strings inside components.

---

# Routing

Routes should be derived from the configured navigation/screens wherever practical.

Do not create unnecessary hardcoded navigation conditions such as:

```ts
if (pathname === "/home")
```

Prefer configuration-driven route definitions.

---

# Design Tokens

Design tokens should be centralized.

Use configuration for:

* Colors
* Typography
* Radius
* Shadows
* Spacing
* Motion
* Component dimensions

Components should consume tokens instead of defining arbitrary values repeatedly.

---

# 3D Visual System

The product may use reusable 3D/isometric visual assets.

For the current HomeOS prototype:

* Use the existing isometric house visuals
* Preserve the visual style
* Preserve the lighting
* Preserve the perspective
* Preserve room composition
* Reuse the same house assets across relevant screens

Do not create a different house illustration for every page.

The same 3D visual language should remain recognizable throughout the application.

---

# Responsive Requirements

Desktop:

* Spacious sidebar
* Large visual areas
* Multi-column content
* Large 3D visual

Tablet:

* Reduced columns
* Compact sidebar/navigation
* Flexible cards

Mobile:

* Bottom navigation
* Single-column content
* Touch-friendly controls
* Responsive 3D visual
* Panels become stacked sections or bottom sheets

---

# Quality Requirements

The final prototype should feel:

* Premium
* Consistent
* Responsive
* Polished
* Production-oriented
* Visually coherent

Do not create a collection of unrelated screens.

All screens must feel like one product.

---

# Important Rule

When a user changes the product configuration, the application should adapt without requiring changes to the core reusable components.

Configuration first.

Components second.

Product-specific content last.
