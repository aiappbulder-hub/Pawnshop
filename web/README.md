# Pawn Master (Web)

The web/PWA build of Pawn Master — the version meant to be played in a
phone browser.

You've inherited **Merrick's**, your late grandfather Sol's pawn shop,
along with the **$18,000** he owed. Every antique that crosses the counter
arrives with a story attached, and about a third of those stories are
lies. Learn to tell which, or lose the shop.

## Play it

- **Instantly:** open `index.html` in any browser.
- **On your phone, installed:** host this `web/` folder (e.g. GitHub
  Pages), open the URL, then *Add to Home Screen*. A service worker caches
  the shell so it runs offline.

No build step, no dependencies.

## Architecture

- `js/data.js` — **all game content as data**: the story, the antiques
  (with provenance, the appraiser's tell, and market-comp pricing), tools,
  customers, conditions, and tuning `config`. Adding content is an edit
  here only.
- `js/art.js` — **item artwork**: engraved-catalog-plate SVG per antique,
  selected by an item's `glyph`. Drawn locally so the game works offline,
  inside strict content-security policies, and with no image licensing
  entanglements.
- `js/core.js` — **pure game logic, no DOM**: apparent-vs-true value math,
  tool-gated verification, the negotiation curve, the till, and the
  win/lose meta. Testable standalone.
- `js/ui.js` — **presentation only**: renders screens from core state and
  forwards taps. Swappable without touching rules or data.

Shell: `index.html`, `css/theme.css`, `manifest.json`, `sw.js`, `icon.svg`.

## The antiques

Genuine pieces are priced against real market research — a 1916 Waltham
trench watch, a Whitby jet mourning brooch with hairwork, Tiffany Studios
leaded glass, a genuine 1909-S VDB cent, Meissen with an underglaze mark,
a Georgian mourning ring dated 1789.

Against them sit the four forgeries that genuinely walk into pawn shops:

| The claim | The reality |
|---|---|
| "Antonius Stradivarius, Cremona 1721" | *Copy of* is printed above the label and the back is stamped GERMANY — a Markneukirchen factory fiddle sold by mail order |
| Grandmother's Tiffany lamp | Machine-even solder and modern rolled glass; a 1970s reproduction |
| 1909-S VDB key-date cent | The S was soldered onto a common 1909 VDB — no raised dot inside the curve |
| Meissen crossed swords | Sword tips feather and the mark sits *on* the glaze, not under it — a Dresden copy |

Each item's `tell` is shown once you've verified authenticity — or,
painfully, after you've already bought it.

## Photographs

Items support an optional `photo` URL in `data.js`. `ui.js` renders the
engraving first and only swaps in a photograph once it has actually
loaded, so a blocked, missing, or slow image degrades silently to the
drawing rather than a broken icon.

None are set by default: the artwork ships as SVG so the game stays
self-contained, works offline, and carries no licensing risk. To use real
photographs, add `photo: "https://…"` to an item — and make sure you have
the right to use the image (Wikimedia Commons and the Met Museum's Open
Access collection are CC0).

## Design intent

- **Inspection is the game.** An item's *apparent* value (what it looks
  worth, what the seller prices against) is separate from its *true*
  resale value. The forgeries look valuable and are not.
- **Tools are the progression sink.** You start with only Sol's loupe,
  which dates a piece but can't authenticate it. Verifying authenticity
  costs money that would otherwise pay down the debt.
- **The debt gives money meaning.** Profit above the starting float chips
  away at Corrigan's $18,000; clear it to win, go broke and the shop is
  lost.

Balance is verified by simulation (400 runs per strategy): paying the
asking price loses 100% of the time, blind lowballing wins ~35%, and
buying the bench kit and passing on identified fakes wins reliably.

## Build note

`build-artifact.js` inlines these sources into a single self-contained
HTML (`../dist/pawn-master-standalone.html`), generated from source so the
shareable build can't drift from the real code.

## Not yet built

Save/load persistence (till and tools reset on reload), a day/time
structure, and audio.
