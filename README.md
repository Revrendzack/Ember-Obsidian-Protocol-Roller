# Ember: Obsidian Protocol Roller

A dark, Discord-adjacent single-page dice roller that is ready to embed in a Nextcloud profile customization. It includes selectable dice, configurable pools/modifiers/difficulty, protocol presets, and a client-side roll log.

## Run locally

```bash
npm install
npm run dev
```

## Rules note

The app currently provides a transparent, configurable dice-pool implementation rather than asserting unpublished or unverified Ember: Obsidian Protocol mechanics. Its rule-facing elements are isolated in `src/roller.js` and the preset buttons in `index.html`; replace those values once the authoritative rules reference is available. This preserves an easy path to a future dddice adapter without binding the interface to a vendor.

## Future dddice integration

`rollDice` is a small dependency-free boundary that returns dice faces, total, and outcome. A dddice integration can submit the same `{ count, sides }` pool for 3D presentation, then use returned faces (or the existing local fallback) to resolve the modifier and difficulty.
