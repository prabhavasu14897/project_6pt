# Reusable 3D Visual Skill

## Goal

Create a reusable 3D visual system that can be used by different products.

The current product uses an isometric house, but the implementation should not assume that every future product uses a house.

---

# 3D Asset Rule

3D visuals should be treated as reusable assets.

Current HomeOS assets:

```text
/assets/3d/home-house.png
```

Use the same house visual across:

* Home Dashboard
* Digital House
* Relevant room-related areas

Do not generate a completely different house image for each screen.

---

# Asset Configuration

3D assets must be referenced through configuration.

Example:

```ts
assets: {
  house: {
    dashboard: "/assets/3d/home-house.png",
    digitalHouse: "/assets/3d/home-house.png"
  }
}
```

---

# Visual Consistency

The same 3D asset should preserve:

* Perspective
* Lighting
* Color treatment
* Scale relationship
* Shadow style
* Visual quality

---

# 3D Interaction

If the asset is interactive:

Desktop:

* Hover
* Highlight
* Click

Mobile:

* Tap
* Selected state
* Bottom sheet/contextual panel

Interactions must remain subtle.

---

# Do Not Overuse 3D

3D should establish product identity.

Do not put large 3D objects on every card.

The 3D visual should have clear hierarchy.

---

# Future Products

The same architecture should allow:

```text
HomeOS
→ house asset

FleetOS
→ vehicle/fleet asset

TravelOS
→ map/world asset

FinanceOS
→ financial visualization

StudyOS
→ campus/classroom asset
```

The component should consume the configured asset rather than assuming the subject.
