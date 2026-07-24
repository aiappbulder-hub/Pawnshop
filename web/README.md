# Pawn Master (Web)

The web/PWA build of Pawn Master — the version meant to be played in a
phone browser.

You've inherited **Merrick's**, your late grandfather Sol's pawn shop,
along with the **$18,000** he owed. Appraise real goods, catch the fakes
Sol always warned about, and clear the debt before you lose the place.

## Play it

- **Instantly:** just open `index.html` in any browser.
- **On your phone, installed:** host this `web/` folder (e.g. GitHub
  Pages) and open the URL, then use the browser's *Add to Home Screen*.
  A service worker caches the shell so it runs offline afterwards.

No build step, no dependencies.

## Architecture

Same data-driven, separation-of-concerns discipline as the Godot version,
expressed in three plain scripts loaded in order:

- `js/data.js` — **all game content as data**: the story, real items with
  market-comp pricing, tools, customers, conditions, and tuning `config`.
  Adding content is an edit here only.
- `js/art.js` — **item artwork**: monoline catalog-style SVG per category,
  mapped from an item's `glyph`. Data-driven, theme-tinted.
- `js/core.js` — **pure game logic, no DOM**: apparent-vs-true value math,
  tool-gated inspection, the negotiation curve, the shop till, and the
  win/lose meta. Testable in isolation.
- `js/ui.js` — **presentation only**: renders each screen from core state
  and forwards taps. Swappable without touching rules or data.

Shell: `index.html`, `css/theme.css`, `manifest.json`, `sw.js`, `icon.svg`.

## Design intent

- **Real goods, real prices.** Items are actual makes/models priced
  against mid-2026 resale comps (Rolex Submariner, 14k gold by the gram,
  PS5, Fender Player Strat, MacBook Pro M3, Gold Eagle, and so on).
- **Inspection has stakes.** An item's *apparent* value (what it looks
  worth, what the customer prices against) is separate from its *true*
  resale value. The authenticity traps — a counterfeit Rolex, a
  gold-plated chain, an iCloud-locked MacBook, a CZ "diamond" — look
  valuable but aren't, so buying without verifying first loses real money.
- **Tools are the progression sink.** You start with only Sol's loupe
  (dates/hallmarks). The Scale, Tester, and Authentication Station verify
  material and authenticity — and every dollar spent on kit is a dollar
  not going toward the debt.
- **The debt gives money meaning.** Net profit above the starting float
  chips away at Corrigan's $18,000; clear it to win, go broke and the shop
  is lost.

## Build note

`build-artifact.js` inlines these source files into a single self-contained
HTML (`../dist/pawn-master-standalone.html`) — the playable-anywhere build,
generated from source so it can't drift from the real code.

## Not yet built (next steps)

Save/load persistence (till & tools reset on reload), a proper day/timer
structure, collections, and audio.
