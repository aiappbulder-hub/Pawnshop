# Pawn Master (Web)

The web/PWA build of Pawn Master — the version meant to be played in a
phone browser. Inspect an item, work out what it's really worth, and
haggle for the deal.

## Play it

- **Instantly:** just open `index.html` in any browser.
- **On your phone, installed:** host this `web/` folder (e.g. GitHub
  Pages) and open the URL, then use the browser's *Add to Home Screen*.
  A service worker caches the shell so it runs offline afterwards.

No build step, no dependencies.

## Architecture

Same data-driven, separation-of-concerns discipline as the Godot version,
expressed in three plain scripts loaded in order:

- `js/data.js` — **all game content as data**: conditions, items, tools,
  customers, and tuning `config`. Adding content is an edit here only.
- `js/core.js` — **pure game logic, no DOM**: apparent-vs-true value
  math, tool-gated inspection reveal, the negotiation acceptance curve,
  and the player wallet. Testable in isolation.
- `js/ui.js` — **presentation only**: renders each screen from core state
  and forwards taps. Swappable without touching rules or data.

Shell: `index.html`, `css/theme.css`, `manifest.json`, `sw.js`, `icon.svg`.

## Design intent

- **Inspection has stakes.** An item's *apparent* value (what it looks
  worth, and what the customer prices against) is separate from its
  *true* resale value. A convincing fake — the "Luxury" Wristwatch —
  looks like a $220 piece but is worth ~18% of that, so buying without
  inspecting authenticity first can lose money.
- **Tools are the progression sink.** Coins earned from good deals buy
  the Test Kit / X-Ray Scanner, which reveal traits the starter tools
  can't.

## Not yet built (next steps)

Save/load persistence (coins & tools currently reset on reload),
collections, daily challenges, and audio.
