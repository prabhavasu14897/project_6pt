# Responsive Design Skill

## Goal

Every configured product must work across desktop, tablet and mobile.

---

# Desktop

Use:

* Spacious sidebar
* Large content area
* Multi-column layouts
* Large visual assets
* Comfortable card spacing

The current HomeOS reference is primarily desktop-oriented.

---

# Tablet

Adapt by:

* Reducing columns
* Compressing spacing
* Maintaining readable cards
* Scaling visual assets
* Reducing sidebar width where appropriate

---

# Mobile

Use:

* Bottom navigation
* Single-column layouts
* Touch-friendly controls
* Stacked cards
* Responsive typography
* Bottom sheets for contextual interactions

---

# Navigation

Desktop:

```text
Sidebar
```

Mobile:

```text
Bottom navigation
```

Do not simply shrink the desktop sidebar onto mobile.

---

# 3D Visuals

Desktop:

Large centerpiece.

Tablet:

Medium visual.

Mobile:

Smaller but still clearly visible.

Never crop important parts of the configured 3D asset.

---

# Touch

Minimum comfortable touch targets should be used for:

* Buttons
* Navigation
* Tabs
* Room interactions
* List actions
* Checkboxes
* Icon buttons

---

# Content

Never hide important content only because the viewport is smaller.

Instead:

* Stack
* Collapse
* Scroll
* Use drawers
* Use bottom sheets
* Transform tables into cards

---

# Rule

Responsive behavior belongs to the reusable component system.

Do not create completely separate implementations for each screen.
