# Reusable Design System Skill

## Goal

Create a reusable design system that derives its visual language from product configuration.

---

# Design Tokens

Never scatter visual values throughout components.

Use tokens for:

* Background
* Surface
* Primary
* Secondary
* Text
* Border
* Radius
* Shadow
* Spacing
* Typography

---

# Theme Independence

The components must not assume:

* Dark theme
* Amber accent
* Manrope
* Glass cards

Those are current product configuration values.

The component system should work if the configuration changes to:

* Light theme
* Blue accent
* Green accent
* Different font
* Different radius
* Different visual style

---

# Current HomeOS Theme

The current configuration uses:

**Warm Ambient Dark + Soft Glass**

Primary:

`#F4B860`

Secondary:

`#8FD8C0`

Background:

`#111315`

Typography:

`Manrope`

Numeric typography:

`DM Mono`

These values belong in configuration, not component code.

---

# Visual Consistency

Maintain consistent:

* Border radius
* Padding
* Typography
* Icon sizing
* Button sizing
* Card treatment
* Spacing
* Interaction states

---

# Reference Fidelity

When implementing HomeOS, use:

`references/homeos-dashboard-collage.png`

as the visual reference.

Match its:

* Density
* Composition
* Card proportions
* Sidebar
* Dark atmosphere
* Amber accents
* 3D visual placement

Do not unnecessarily redesign the reference.
