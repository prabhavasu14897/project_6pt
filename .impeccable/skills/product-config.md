# Configuration-Driven Product Skill

## Goal

Build the application so the same codebase can represent different products.

The product configuration is the source of truth.

---

## Never Hardcode Product Content

Do not write:

```tsx
<h1>HomeOS</h1>
```

Prefer:

```tsx
<h1>{productConfig.product.name}</h1>
```

Do not write:

```tsx
<SidebarItem label="Calendar" />
```

Prefer:

```tsx
<SidebarItem label={item.label} />
```

Do not hardcode screen-specific data inside components.

---

# Configuration Layers

Use these layers:

```text
Product
Theme
Navigation
Screens
Static Data
Assets
```

---

# Product Configuration

Must control:

* Name
* Short name
* Tagline
* Description
* Logo

---

# Theme Configuration

Must control:

* Mode
* Colors
* Typography
* Radius
* Spacing
* Shadows
* Motion

---

# Navigation Configuration

Must control:

* Menu items
* Labels
* Icons
* Routes
* Ordering
* Enabled/disabled state

---

# Screen Configuration

Must control:

* Title
* Description
* Primary action
* Enabled state
* Layout type where needed

---

# Static Data

Static prototype data must be centralized.

Examples:

```text
family
tasks
events
shopping
expenses
maintenance
rooms
activity
dashboard statistics
```

Components should consume this data.

---

# Asset Configuration

Images must be referenced from configuration.

Example:

```ts
assets: {
  house: {
    dashboard: "/assets/3d/home-house.png",
    digitalHouse: "/assets/3d/home-house.png"
  }
}
```

Do not hardcode image paths throughout the UI.

---

# Dynamic Navigation

Navigation should be rendered from configuration.

Example:

```tsx
productConfig.navigation
  .filter(item => item.enabled)
  .map(item => ...)
```

This allows products to have different navigation without changing the sidebar component.

---

# Generic Components

Components must not know that the current product is HomeOS.

For example:

```text
Sidebar
Card
Dashboard
List
Calendar
Stats
HouseScene
ActivityFeed
```

should remain generic.

---

# Changing Products

A developer should be able to create a new product by primarily changing:

```text
product.config.ts
```

and replacing assets.

Core UI components should remain reusable.
