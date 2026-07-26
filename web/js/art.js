/*
 * Pawn Master — item artwork.
 *
 * Engraved-catalog-plate illustrations, one per antique, drawn as inline SVG
 * in `currentColor` so the theme tints them. Rendered locally rather than
 * loaded as photographs: it keeps the game working offline, inside strict
 * content-security policies, and free of image licensing entanglements.
 *
 * An item may also declare a `photo` URL; ui.js prefers it and falls back to
 * the drawing here if it fails to load (see PM.ui image handling).
 *
 * Data-driven: an item points at one of these via its `glyph` key.
 */
(function (PM) {
  "use strict";

  const svg = (inner) =>
    `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.7" ` +
    `stroke-linecap="round" stroke-linejoin="round" class="glyph-svg" aria-hidden="true">${inner}</svg>`;

  // faint = secondary detail lines (hatching, shading, engraving texture)
  const F = 'stroke-opacity="0.38"';
  const FF = 'stroke-opacity="0.22"';

  const glyphs = {
    /* Violin — scroll, pegs, f-holes, bridge, four strings. */
    violin: svg(`
      <path d="M60 40 C50 40 46 47 47 54 C48 60 44 62 40 66 C33 72 31 84 38 92
               C45 100 56 101 60 101 C64 101 75 100 82 92 C89 84 87 72 80 66
               C76 62 72 60 73 54 C74 47 70 40 60 40 Z"/>
      <path d="M47 55 C52 57 68 57 73 55" ${F}/>
      <path d="M40 67 C48 70 72 70 80 67" ${F}/>
      <path d="M50 71 c-3 3 -2 8 1 9 M50 80 c-3 1 -3 6 0 8" ${F}/>
      <path d="M70 71 c3 3 2 8 -1 9 M70 80 c3 1 3 6 0 8" ${F}/>
      <path d="M52 76 h16" ${F}/>
      <path d="M56 40 V21 M64 40 V21"/>
      <path d="M56 26 h8" ${FF}/>
      <path d="M60 21 c-6 -1 -8 -6 -5 -9 c3 -3 8 -1 8 3 c0 3 -3 4 -5 3"/>
      <path d="M53 24 h-4 M67 24 h4 M53 30 h-4 M67 30 h4" ${F}/>
      <path d="M57 41 V93 M60 41 V93 M63 41 V93" ${FF}/>
      <ellipse cx="60" cy="93" rx="5" ry="2.5" ${F}/>`),

    /* WWI trench watch — wire lugs, shrapnel guard grille, strap. */
    trenchwatch: svg(`
      <circle cx="60" cy="60" r="24"/>
      <circle cx="60" cy="60" r="19" ${F}/>
      <path d="M46 45 L74 75 M74 45 L46 75" ${FF}/>
      <path d="M60 60 V47 M60 60 L69 65"/>
      <circle cx="60" cy="60" r="1.6" fill="currentColor" stroke="none"/>
      <path d="M60 41 v3 M79 60 h-3 M60 79 v-3 M41 60 h3" ${F}/>
      <path d="M60 36 v-4" /><path d="M84 60 h4"/>
      <path d="M48 39 q-6 -4 -10 0 M72 39 q6 -4 10 0" />
      <path d="M48 81 q-6 4 -10 0 M72 81 q6 4 10 0" />
      <path d="M36 37 L28 20 h-8 M84 37 L92 20 h8" ${F}/>
      <path d="M36 83 L28 101 h-8 M84 83 L92 101 h8" ${F}/>`),

    /* Victorian mourning brooch — jet frame, hairwork panel under glass. */
    brooch: svg(`
      <ellipse cx="60" cy="60" rx="33" ry="26"/>
      <ellipse cx="60" cy="60" rx="27" ry="20" ${F}/>
      <ellipse cx="60" cy="60" rx="20" ry="14"/>
      <path d="M44 60 q8 -6 16 0 t16 0" ${F}/>
      <path d="M44 65 q8 -6 16 0 t16 0" ${F}/>
      <path d="M44 55 q8 -6 16 0 t16 0" ${F}/>
      <circle cx="60" cy="34" r="3"/>
      <circle cx="34" cy="52" r="2" ${F}/><circle cx="86" cy="52" r="2" ${F}/>
      <circle cx="34" cy="68" r="2" ${F}/><circle cx="86" cy="68" r="2" ${F}/>
      <path d="M60 86 v6 M52 90 h16" ${FF}/>`),

    /* Tiffany-style leaded lamp — segmented dome shade, bronze base. */
    lamp: svg(`
      <path d="M22 62 q38 -44 76 0 Z"/>
      <path d="M22 62 h76" />
      <path d="M35 62 q3 -30 25 -37 M85 62 q-3 -30 -25 -37" ${F}/>
      <path d="M48 62 q2 -24 12 -30 M72 62 q-2 -24 -12 -30" ${F}/>
      <path d="M29 50 q31 -14 62 0" ${FF}/>
      <path d="M25 56 q35 -12 70 0" ${FF}/>
      <path d="M56 25 h8 v-5 h-8 z"/>
      <path d="M60 62 v26"/>
      <path d="M52 88 q8 4 16 0" ${F}/>
      <path d="M44 100 q16 -12 32 0 Z"/>
      <path d="M44 100 h32" />
      <path d="M50 95 h20" ${FF}/>`),

    /* Lincoln cent — profile bust, wheat ears, rim beading. */
    cent: svg(`
      <circle cx="60" cy="60" r="34"/>
      <circle cx="60" cy="60" r="30" ${F}/>
      <path d="M64 44 c-9 0 -14 7 -14 14 c0 6 2 9 1 13 c-1 3 -3 4 -3 7 h20"/>
      <path d="M52 54 c3 -2 6 -2 8 0" ${F}/>
      <path d="M64 44 c5 1 8 5 8 10 c0 6 -3 10 -6 13" ${F}/>
      <path d="M63 62 c2 1 4 1 5 0" ${FF}/>
      <path d="M34 48 q6 12 6 24 M86 48 q-6 12 -6 24" ${F}/>
      <path d="M36 54 l-4 -2 M37 60 l-4 -2 M38 66 l-4 -2" ${FF}/>
      <path d="M84 54 l4 -2 M83 60 l4 -2 M82 66 l4 -2" ${FF}/>`),

    /* Meissen figural group — porcelain urn with crossed-swords mark. */
    porcelain: svg(`
      <path d="M45 34 q15 -8 30 0"/>
      <path d="M45 34 c-2 14 -9 18 -9 30 c0 16 11 26 24 26 s24 -10 24 -26
               c0 -12 -7 -16 -9 -30"/>
      <path d="M36 60 c-6 -2 -8 -10 -3 -13 M84 60 c6 -2 8 -10 3 -13" ${F}/>
      <path d="M48 46 q12 6 24 0" ${FF}/>
      <path d="M52 74 q8 6 16 0" ${FF}/>
      <path d="M50 30 h20 v4 h-20 z" ${F}/>
      <path d="M53 96 h14 M50 100 h20"/>
      <path d="M54 62 l12 12 M66 62 l-12 12"/>
      <path d="M54 62 l-2 -3 M66 62 l2 -3" ${F}/>`),

    /* Art Deco / mourning ring — shoulders, claw-set stone. */
    ring: svg(`
      <ellipse cx="60" cy="74" rx="24" ry="22"/>
      <ellipse cx="60" cy="75" rx="17" ry="15" ${F}/>
      <path d="M44 52 L60 36 L76 52 L60 63 Z"/>
      <path d="M44 52 H76"/>
      <path d="M52 46 L58 63 M68 46 L62 63" ${F}/>
      <path d="M50 57 l-4 -3 M70 57 l4 -3" ${FF}/>
      <path d="M47 60 q13 6 26 0" ${F}/>`),

    /* Bullion coin — eagle, denticled rim. */
    bullion: svg(`
      <circle cx="60" cy="60" r="34"/>
      <circle cx="60" cy="60" r="29" ${F}/>
      <path d="M60 47 c-4 4 -12 5 -18 3 c4 6 4 12 2 16 c6 -2 12 0 16 5
               c4 -5 10 -7 16 -5 c-2 -4 -2 -10 2 -16 c-6 2 -14 1 -18 -3 z"/>
      <path d="M60 47 v24" ${F}/>
      <path d="M48 55 q12 4 24 0" ${FF}/>
      <path d="M52 64 q8 3 16 0" ${FF}/>
      <path d="M38 38 l3 3 M82 38 l-3 3 M38 82 l3 -3 M82 82 l-3 -3" ${FF}/>`),
  };

  PM.art = {
    render(glyph) {
      return glyphs[glyph] || svg(`<rect x="34" y="34" width="52" height="52" rx="3"/>`);
    },
    has(glyph) { return Object.prototype.hasOwnProperty.call(glyphs, glyph); },
  };
})(window.PM = window.PM || {});
