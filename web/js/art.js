/*
 * Pawn Master — item artwork.
 *
 * Monoline catalog-style SVG illustrations, one per item category, drawn in
 * `currentColor` so the theme controls the tint. Deliberately technical
 * line-art (loupe-drawing feel) rather than pictorial icons, to read like an
 * appraiser's catalog instead of a cartoon.
 *
 * Data-driven: an item points at one of these via its `glyph` key.
 */
(function (PM) {
  "use strict";

  const wrap = (inner) =>
    `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.2" ` +
    `stroke-linecap="round" stroke-linejoin="round" class="glyph-svg" aria-hidden="true">${inner}</svg>`;

  const glyphs = {
    watch: wrap(`
      <path d="M47 32 L45 15 Q45 11 49 11 L71 11 Q75 11 75 15 L73 32"/>
      <path d="M47 88 L45 105 Q45 109 49 109 L71 109 Q75 109 75 105 L73 88"/>
      <circle cx="60" cy="60" r="27"/>
      <circle cx="60" cy="60" r="20" stroke-opacity="0.45"/>
      <path d="M88 54 h7 v12 h-7"/>
      <path d="M60 60 V44 M60 60 L72 65"/>`),

    chain: wrap(`
      <path d="M60 24 C31 24 23 55 31 78 C39 99 81 99 89 78 C97 55 89 24 60 24"
            stroke-dasharray="2.5 5.5"/>
      <circle cx="60" cy="24" r="5.5"/>
      <path d="M60 30 v6"/>`),

    coin: wrap(`
      <circle cx="60" cy="60" r="34"/>
      <circle cx="60" cy="60" r="26" stroke-opacity="0.4"/>
      <path d="M60 43 l4.4 9.6 10.4 1.1 -7.7 7.1 2.1 10.3 -9.2 -5.1 -9.2 5.1 2.1 -10.3 -7.7 -7.1 10.4 -1.1 z"/>`),

    ring: wrap(`
      <ellipse cx="60" cy="76" rx="25" ry="19"/>
      <ellipse cx="60" cy="77" rx="16" ry="11" stroke-opacity="0.45"/>
      <path d="M47 43 L60 29 L73 43 L60 54 Z"/>
      <path d="M47 43 H73"/>
      <path d="M51 49 L57 58 M69 49 L63 58"/>`),

    laptop: wrap(`
      <path d="M37 38 H83 V70 H37 Z"/>
      <path d="M43 44 H77 V64 H43 Z" stroke-opacity="0.4"/>
      <path d="M29 78 H91 L98 88 H22 Z"/>
      <path d="M52 83 H68" stroke-opacity="0.5"/>`),

    console: wrap(`
      <path d="M38 52 Q26 50 22 64 L17 82 Q15 93 25 93 Q33 93 37 85 L41 77 Q45 73 53 73 L67 73 Q75 73 79 77 L83 85 Q87 93 95 93 Q105 93 103 82 L98 64 Q94 50 82 52 Q60 48 38 52 Z"/>
      <path d="M37 62 h10 M42 57 v10" stroke-opacity="0.7"/>
      <circle cx="76" cy="60" r="2.4"/>
      <circle cx="84" cy="66" r="2.4"/>
      <circle cx="76" cy="72" r="2.4"/>`),

    guitar: wrap(`
      <path d="M31 97 C17 92 17 73 30 67 C37 64 42 67 47 64 C51 62 50 55 57 53 C68 50 77 58 74 69 C72 77 63 78 58 83 C50 91 43 101 31 97 Z"/>
      <circle cx="40" cy="82" r="6" stroke-opacity="0.5"/>
      <path d="M62 58 L95 31"/>
      <path d="M93 27 L104 21 L108 27 L98 33 Z"/>
      <path d="M60 62 L92 35 M64 66 L96 39" stroke-opacity="0.4" stroke-width="1.3"/>`),

    drill: wrap(`
      <path d="M30 45 H74 a11 11 0 0 1 11 11 v3 a6 6 0 0 1 -6 6 H52 l-3 25 a6 6 0 0 1 -6 5 h-7 a5 5 0 0 1 -5 -6 l5 -24 a15 15 0 0 1 -11 -15 v-6 a4 4 0 0 1 4 -4 z"/>
      <path d="M85 55 H106"/>
      <path d="M36 71 H50" stroke-opacity="0.4"/>`),
  };

  PM.art = {
    render(glyph) {
      return glyphs[glyph] || wrap(`<rect x="34" y="34" width="52" height="52" rx="4"/>`);
    },
  };
})(window.PM = window.PM || {});
