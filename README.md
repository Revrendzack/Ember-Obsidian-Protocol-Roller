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

The dddice renderer is now integrated through `src/dddice.js`. It is presentation-only: `rollDice` remains authoritative for face values, totals, and difficulty checks, while dddice animates the same `{ count, sides }` roll. This means game results do not change if the browser lacks WebGL or dddice cannot initialize.

### Asset configuration

`@3d-dice/dice-box` needs its runtime assets served by the application. Copy the package's asset directory to the web root as `dddice-assets/`, or set `VITE_DDDICE_ASSET_PATH` to the URL where those assets are hosted before building:

```bash
VITE_DDDICE_ASSET_PATH=https://your-cdn.example/dddice-assets/ npm run dev
```

When the renderer is unavailable, the interface reports that it is using the built-in roller and remains fully usable. No dddice API key is stored in this frontend.
