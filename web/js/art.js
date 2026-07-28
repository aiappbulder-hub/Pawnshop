/*
 * Pawn Master — item artwork.
 *
 * Full-colour illustrations of each antique, drawn as inline SVG with real
 * material behaviour: silver cases and enamel dials, Whitby jet against
 * woven hair, leaded favrile glass, aged copper, hard-paste porcelain,
 * spruce and maple. Rendered locally rather than loaded as photographs so
 * the game works offline, inside strict content-security policies, and with
 * no image licensing entanglements.
 *
 * An item may also declare a `photo` URL; ui.js prefers it and falls back to
 * the drawing here if it fails to load.
 */
(function (PM) {
  "use strict";

  const wrap = (defs, body) =>
    `<svg viewBox="0 0 120 120" class="glyph-svg" aria-hidden="true">` +
    (defs ? `<defs>${defs}</defs>` : "") + body + `</svg>`;

  // linear / radial gradient helpers
  const lg = (id, stops, x1, y1, x2, y2) =>
    `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops}</linearGradient>`;
  const rg = (id, stops, cx, cy, r) =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops}</radialGradient>`;
  const s = (off, col, op) => `<stop offset="${off}" stop-color="${col}"${op !== undefined ? ` stop-opacity="${op}"` : ""}/>`;

  const GOLD = s(0, "#f3d98a") + s(0.45, "#c9a13f") + s(1, "#7d5f1c");
  const SILVER = s(0, "#eef1f4") + s(0.5, "#b9c0c7") + s(1, "#6e767e");

  const glyphs = {

    /* ---- WWI trench watch: silver case, enamel dial, blued hands ---- */
    trenchwatch: wrap(
      lg("tw-case", SILVER, "0%", "0%", "100%", "100%") +
      rg("tw-dial", s(0, "#fffdf5") + s(0.7, "#f0e7d2") + s(1, "#d8caa8"), "50%", "38%", "70%") +
      lg("tw-strap", s(0, "#6b4b2e") + s(1, "#3d2a17"), "0%", "0%", "0%", "100%"),
      `<path d="M44 22 L38 6 h44 l-6 16 Z" fill="url(#tw-strap)"/>
       <path d="M44 98 L38 114 h44 l-6 -16 Z" fill="url(#tw-strap)"/>
       <rect x="40" y="10" width="40" height="2" fill="#241708" opacity=".5"/>
       <rect x="40" y="108" width="40" height="2" fill="#241708" opacity=".5"/>
       <circle cx="60" cy="60" r="30" fill="url(#tw-case)"/>
       <circle cx="60" cy="60" r="30" fill="none" stroke="#5b636b" stroke-width="1.5"/>
       <circle cx="60" cy="60" r="24" fill="url(#tw-dial)"/>
       <circle cx="60" cy="60" r="24" fill="none" stroke="#8d9299" stroke-width="1"/>
       <g stroke="#2a2620" stroke-width="1.6" stroke-linecap="round">
         <path d="M60 40 v4 M80 60 h-4 M60 80 v-4 M40 60 h4"/>
       </g>
       <g stroke="#3b3630" stroke-width="1" opacity=".6">
         <path d="M74 46 l-2.5 2.5 M74 74 l-2.5 -2.5 M46 74 l2.5 -2.5 M46 46 l2.5 2.5"/>
       </g>
       <path d="M60 60 V44" stroke="#1f3d63" stroke-width="2" stroke-linecap="round"/>
       <path d="M60 60 L70 66" stroke="#1f3d63" stroke-width="1.8" stroke-linecap="round"/>
       <circle cx="60" cy="60" r="2" fill="#1f3d63"/>
       <g stroke="#9aa1a8" stroke-width="1.4" opacity=".85" fill="none">
         <path d="M44 36 q16 -6 32 0 M44 84 q16 6 32 0"/>
       </g>
       <path d="M90 54 h5 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-5 z" fill="url(#tw-case)" stroke="#5b636b" stroke-width="1"/>`
    ),

    /* ---- Victorian mourning brooch: jet, gold, woven hair ---- */
    brooch: wrap(
      lg("br-gold", GOLD, "0%", "0%", "100%", "100%") +
      rg("br-jet", s(0, "#3a3a3c") + s(0.6, "#1b1b1d") + s(1, "#0b0b0c"), "38%", "30%", "80%") +
      lg("br-hair", s(0, "#7a5330") + s(0.5, "#4e3319") + s(1, "#2e1d0e"), "0%", "0%", "100%", "100%"),
      `<ellipse cx="60" cy="60" rx="37" ry="29" fill="url(#br-jet)"/>
       <ellipse cx="60" cy="60" rx="37" ry="29" fill="none" stroke="url(#br-gold)" stroke-width="2.5"/>
       <ellipse cx="60" cy="60" rx="29" ry="21" fill="none" stroke="url(#br-gold)" stroke-width="1.6" opacity=".85"/>
       <ellipse cx="60" cy="60" rx="22" ry="15" fill="url(#br-hair)"/>
       <g stroke="#8d6238" stroke-width="1.1" fill="none" opacity=".75">
         <path d="M40 57 q10 -5 20 0 t20 0 M40 62 q10 -5 20 0 t20 0 M40 67 q10 -5 20 0 t20 0"/>
       </g>
       <ellipse cx="60" cy="60" rx="22" ry="15" fill="none" stroke="url(#br-gold)" stroke-width="1.8"/>
       <ellipse cx="53" cy="54" rx="7" ry="4" fill="#fff" opacity=".14"/>
       <g fill="#f0ead6">
         <circle cx="60" cy="33" r="2.4"/><circle cx="60" cy="87" r="2.4"/>
         <circle cx="27" cy="52" r="2"/><circle cx="93" cy="52" r="2"/>
         <circle cx="27" cy="68" r="2"/><circle cx="93" cy="68" r="2"/>
       </g>
       <ellipse cx="46" cy="46" rx="9" ry="4" fill="#fff" opacity=".1" transform="rotate(-24 46 46)"/>`
    ),

    /* ---- Tiffany Studios leaded lamp: favrile glass, bronze base ---- */
    lamp: wrap(
      rg("lp-glow", s(0, "#ffd98a") + s(0.6, "#c98b3a", ".35") + s(1, "#c98b3a", "0"), "50%", "60%", "75%") +
      lg("lp-shade", s(0, "#e8b23c") + s(0.35, "#c2802c") + s(0.62, "#5f7f4a") + s(1, "#2f5a52"), "0%", "0%", "0%", "100%") +
      lg("lp-bronze", s(0, "#8a6a3a") + s(0.5, "#5a4527") + s(1, "#302416"), "0%", "0%", "100%", "100%"),
      `<ellipse cx="60" cy="60" rx="52" ry="40" fill="url(#lp-glow)"/>
       <path d="M18 64 q42 -50 84 0 Z" fill="url(#lp-shade)"/>
       <g stroke="#241a0c" stroke-width="1.5" fill="none" opacity=".85">
         <path d="M32 63 q4 -33 28 -40 M88 63 q-4 -33 -28 -40"/>
         <path d="M46 64 q2 -27 14 -34 M74 64 q-2 -27 -14 -34"/>
         <path d="M60 24 v40"/>
         <path d="M24 54 q36 -16 72 0" />
         <path d="M20 60 q40 -13 80 0" />
       </g>
       <path d="M18 64 q42 -50 84 0" fill="none" stroke="#241a0c" stroke-width="2.5"/>
       <path d="M18 64 h84" stroke="#241a0c" stroke-width="3"/>
       <path d="M26 52 q34 -14 68 0" fill="none" stroke="#ffe7a8" stroke-width="1.2" opacity=".28"/>
       <rect x="55" y="17" width="10" height="8" rx="2" fill="url(#lp-bronze)"/>
       <rect x="56" y="64" width="8" height="26" fill="url(#lp-bronze)"/>
       <path d="M50 90 q10 5 20 0 l4 6 q-14 5 -28 0 Z" fill="url(#lp-bronze)"/>
       <path d="M40 104 q20 -13 40 0 q-20 6 -40 0 Z" fill="url(#lp-bronze)"/>
       <path d="M40 104 q20 6 40 0" fill="none" stroke="#1e1609" stroke-width="1.5"/>
       <path d="M48 99 q12 -4 24 0" fill="none" stroke="#a9873f" stroke-width="1" opacity=".5"/>`
    ),

    /* ---- Lincoln cent: aged copper, wheat ears ---- */
    cent: wrap(
      rg("ct-cu", s(0, "#d9884e") + s(0.5, "#a55c2e") + s(1, "#63341a"), "38%", "32%", "80%"),
      `<circle cx="60" cy="60" r="36" fill="url(#ct-cu)"/>
       <circle cx="60" cy="60" r="36" fill="none" stroke="#4a2513" stroke-width="1.5"/>
       <circle cx="60" cy="60" r="31" fill="none" stroke="#7d4423" stroke-width="1" opacity=".8"/>
       <path d="M66 42 c-10 0 -16 8 -16 16 c0 7 3 10 2 15 c-1 4 -4 5 -4 9 h24 c0 -6 -2 -9 -1 -14"
             fill="#c2733f" stroke="#5c3018" stroke-width="1.2"/>
       <path d="M66 42 c6 1 10 6 10 12 c0 7 -4 12 -8 15" fill="#c2733f" stroke="#5c3018" stroke-width="1.2"/>
       <path d="M52 55 c3 -3 7 -3 10 0" fill="none" stroke="#5c3018" stroke-width="1"/>
       <path d="M64 64 c3 1 5 1 7 -1" fill="none" stroke="#5c3018" stroke-width="1" opacity=".7"/>
       <g stroke="#5c3018" stroke-width="1.6" fill="none" opacity=".9">
         <path d="M31 46 q7 14 7 28 M89 46 q-7 14 -7 28"/>
       </g>
       <g stroke="#5c3018" stroke-width="1.1" opacity=".65">
         <path d="M33 52 l-4 -2 M34 59 l-4 -2 M35 66 l-4 -2 M36 72 l-4 -2"/>
         <path d="M87 52 l4 -2 M86 59 l4 -2 M85 66 l4 -2 M84 72 l4 -2"/>
       </g>
       <ellipse cx="46" cy="42" rx="13" ry="7" fill="#fff" opacity=".13" transform="rotate(-28 46 42)"/>`
    ),

    /* ---- Roman denarius: worn silver, laurelled emperor ---- */
    denarius: wrap(
      rg("dn-ag", s(0, "#dfe2e0") + s(0.5, "#a3a8a4") + s(1, "#5d635f"), "38%", "32%", "80%"),
      `<path d="M60 24 q22 -2 32 16 q10 18 -2 34 q-12 18 -32 18 q-20 0 -31 -17 q-11 -17 0 -34 q11 -17 33 -17 Z"
             fill="url(#dn-ag)" stroke="#4b504d" stroke-width="1.4"/>
       <path d="M62 41 c-11 1 -18 9 -18 19 c0 9 6 16 15 18 c3 -6 3 -12 1 -17"
             fill="#b7bcb8" stroke="#555a57" stroke-width="1.2"/>
       <path d="M62 41 c8 1 13 7 13 15 c0 8 -4 15 -10 19" fill="#b7bcb8" stroke="#555a57" stroke-width="1.2"/>
       <path d="M47 50 q8 -6 16 -3" fill="none" stroke="#555a57" stroke-width="1"/>
       <path d="M45 46 q10 -8 22 -4 q6 2 8 7" fill="none" stroke="#6b716d" stroke-width="1.6"/>
       <path d="M49 44 l-1 -3 M55 41 l0 -3 M62 40 l2 -3" stroke="#6b716d" stroke-width="1" opacity=".8"/>
       <g stroke="#5d635f" stroke-width="1" opacity=".55" fill="none">
         <path d="M33 60 q3 -8 8 -12 M87 60 q-3 8 -8 12"/>
       </g>
       <ellipse cx="47" cy="40" rx="11" ry="6" fill="#fff" opacity=".16" transform="rotate(-30 47 40)"/>`
    ),

    /* ---- Meissen porcelain: white body, cobalt mark, gilt ---- */
    porcelain: wrap(
      lg("pc-body", s(0, "#ffffff") + s(0.45, "#f2f0ea") + s(1, "#cfc9bd"), "20%", "0%", "80%", "100%") +
      lg("pc-gold", GOLD, "0%", "0%", "100%", "100%"),
      `<path d="M46 30 q14 -7 28 0 l-2 6 q-12 -5 -24 0 Z" fill="url(#pc-body)" stroke="#b6afa1" stroke-width="1"/>
       <path d="M48 36 c-3 13 -11 18 -11 31 c0 17 11 27 23 27 s23 -10 23 -27 c0 -13 -8 -18 -11 -31 Z"
             fill="url(#pc-body)" stroke="#b6afa1" stroke-width="1.3"/>
       <path d="M37 64 c-7 -2 -9 -11 -3 -15 M83 64 c7 -2 9 -11 3 -15"
             fill="none" stroke="#c3bcae" stroke-width="2.4"/>
       <path d="M48 44 q12 6 24 0" fill="none" stroke="url(#pc-gold)" stroke-width="1.6"/>
       <path d="M46 88 q14 6 28 0" fill="none" stroke="url(#pc-gold)" stroke-width="1.6"/>
       <g fill="#3f5fa8" opacity=".85">
         <circle cx="52" cy="60" r="2.6"/><circle cx="60" cy="55" r="2"/><circle cx="67" cy="62" r="2.4"/>
         <circle cx="57" cy="68" r="1.8"/>
       </g>
       <g stroke="#5c7a3a" stroke-width="1" opacity=".7" fill="none">
         <path d="M52 63 q3 5 5 6 M67 65 q-3 4 -6 5"/>
       </g>
       <path d="M50 96 h20 M47 100 q13 4 26 0" fill="none" stroke="#b6afa1" stroke-width="1.6"/>
       <g stroke="#2f4f9e" stroke-width="2" stroke-linecap="round">
         <path d="M54 74 l11 11 M65 74 l-11 11"/>
       </g>
       <ellipse cx="52" cy="52" rx="6" ry="14" fill="#fff" opacity=".45" transform="rotate(-14 52 52)"/>`
    ),

    /* ---- Violin: spruce top, maple, ebony board ---- */
    violin: wrap(
      lg("vl-wood", s(0, "#d59a4e") + s(0.4, "#a76a2c") + s(1, "#6d3f16"), "10%", "0%", "90%", "100%"),
      `<path d="M60 38 C49 38 44 46 45 54 C46 61 41 63 37 68 C29 75 27 88 35 96
               C43 105 55 106 60 106 C65 106 77 105 85 96 C93 88 91 75 83 68
               C79 63 74 61 75 54 C76 46 71 38 60 38 Z"
             fill="url(#vl-wood)" stroke="#4a2a0e" stroke-width="1.4"/>
       <path d="M45 55 q15 4 30 0" fill="none" stroke="#5c3413" stroke-width="1" opacity=".55"/>
       <path d="M37 69 q23 5 46 0" fill="none" stroke="#5c3413" stroke-width="1" opacity=".55"/>
       <g fill="none" stroke="#3a2109" stroke-width="2.2" stroke-linecap="round">
         <path d="M49 72 c-4 3 -3 9 1 10 M49 83 c-4 2 -4 8 0 9"/>
         <path d="M71 72 c4 3 3 9 -1 10 M71 83 c4 2 4 8 0 9"/>
       </g>
       <rect x="50" y="76" width="20" height="3" rx="1" fill="#7a4a1c"/>
       <rect x="56" y="20" width="8" height="20" rx="2" fill="#2b1a0a"/>
       <path d="M60 20 c-7 -1 -9 -7 -5 -11 c4 -4 10 -1 10 4 c0 4 -4 5 -6 4"
             fill="url(#vl-wood)" stroke="#4a2a0e" stroke-width="1.3"/>
       <g fill="#2b1a0a">
         <ellipse cx="51" cy="25" rx="4" ry="2"/><ellipse cx="69" cy="25" rx="4" ry="2"/>
         <ellipse cx="51" cy="32" rx="4" ry="2"/><ellipse cx="69" cy="32" rx="4" ry="2"/>
       </g>
       <g stroke="#e8e2d2" stroke-width="0.8" opacity=".9">
         <path d="M57 24 V95 M59 24 V95 M61 24 V95 M63 24 V95"/>
       </g>
       <ellipse cx="60" cy="95" rx="6" ry="3" fill="#2b1a0a"/>
       <ellipse cx="46" cy="52" rx="7" ry="16" fill="#fff" opacity=".08" transform="rotate(-16 46 52)"/>`
    ),

    /* ---- Georgian mourning ring: gold, sepia miniature ---- */
    mourningring: wrap(
      lg("mr-gold", GOLD, "0%", "0%", "100%", "100%") +
      rg("mr-sepia", s(0, "#d8c39a") + s(0.6, "#a8834f") + s(1, "#6b4b28"), "42%", "36%", "75%"),
      `<ellipse cx="60" cy="76" rx="26" ry="24" fill="none" stroke="url(#mr-gold)" stroke-width="7"/>
       <ellipse cx="60" cy="76" rx="26" ry="24" fill="none" stroke="#6b4d16" stroke-width="1" opacity=".5"/>
       <ellipse cx="60" cy="42" rx="20" ry="15" fill="url(#mr-gold)"/>
       <ellipse cx="60" cy="42" rx="15" ry="11" fill="url(#mr-sepia)"/>
       <g stroke="#4f3418" stroke-width="1" fill="none" opacity=".8">
         <path d="M60 48 V38 M60 38 q-5 -1 -7 4 M60 38 q5 -1 7 4 M60 42 q-6 0 -8 5 M60 42 q6 0 8 5"/>
       </g>
       <path d="M52 49 q8 3 16 0" fill="none" stroke="#4f3418" stroke-width="0.9" opacity=".6"/>
       <ellipse cx="60" cy="42" rx="15" ry="11" fill="none" stroke="#8a6a26" stroke-width="1.4"/>
       <ellipse cx="55" cy="37" rx="6" ry="3" fill="#fff" opacity=".3" transform="rotate(-20 55 37)"/>
       <path d="M44 52 q16 8 32 0" fill="none" stroke="url(#mr-gold)" stroke-width="4"/>`
    ),

    /* ---- Art Deco ring: platinum, old European cut ---- */
    decoring: wrap(
      lg("dr-plat", s(0, "#f4f7fa") + s(0.5, "#c2cad2") + s(1, "#7d868f"), "0%", "0%", "100%", "100%") +
      lg("dr-stone", s(0, "#ffffff") + s(0.4, "#dbe9f5") + s(1, "#9fc0da"), "20%", "0%", "80%", "100%"),
      `<ellipse cx="60" cy="78" rx="25" ry="22" fill="none" stroke="url(#dr-plat)" stroke-width="6"/>
       <path d="M42 50 h36 l-18 10 Z" fill="url(#dr-plat)"/>
       <path d="M44 50 L60 32 L76 50 Z" fill="url(#dr-stone)"/>
       <g stroke="#8fb2cc" stroke-width="0.9" opacity=".9" fill="none">
         <path d="M44 50 L60 42 L76 50 M60 32 L60 42 M52 41 L60 42 M68 41 L60 42"/>
         <path d="M50 50 L60 42 M70 50 L60 42"/>
       </g>
       <path d="M56 50 h8" stroke="#6f93ad" stroke-width="1"/>
       <g fill="url(#dr-plat)">
         <rect x="41" y="47" width="4" height="7" rx="1"/><rect x="75" y="47" width="4" height="7" rx="1"/>
       </g>
       <g fill="#dbe9f5">
         <circle cx="38" cy="60" r="2"/><circle cx="82" cy="60" r="2"/>
         <circle cx="35" cy="68" r="1.6"/><circle cx="85" cy="68" r="1.6"/>
       </g>
       <path d="M56 36 l3 4" stroke="#fff" stroke-width="1.6" opacity=".9"/>`
    ),

    /* ---- Gold bullion coin: eagle ---- */
    bullion: wrap(
      rg("bl-gold", s(0, "#ffeeb0") + s(0.45, "#d9ab3e") + s(1, "#8a6415"), "38%", "30%", "82%"),
      `<circle cx="60" cy="60" r="36" fill="url(#bl-gold)"/>
       <circle cx="60" cy="60" r="36" fill="none" stroke="#6d4d10" stroke-width="1.5"/>
       <circle cx="60" cy="60" r="31" fill="none" stroke="#8a6415" stroke-width="1" opacity=".7"/>
       <path d="M60 45 c-5 5 -14 6 -21 4 c5 7 5 14 2 19 c7 -3 14 -1 19 6 c5 -7 12 -9 19 -6
                c-3 -5 -3 -12 2 -19 c-7 2 -16 1 -21 -4 Z"
             fill="#c69a34" stroke="#6d4d10" stroke-width="1.2"/>
       <path d="M60 45 v29" stroke="#6d4d10" stroke-width="1" opacity=".7"/>
       <g stroke="#8a6415" stroke-width="1" opacity=".6" fill="none">
         <path d="M46 54 q14 5 28 0 M50 63 q10 4 20 0 M53 70 q7 3 14 0"/>
       </g>
       <g stroke="#6d4d10" stroke-width="1" opacity=".5">
         <path d="M36 38 l3 3 M84 38 l-3 3 M36 82 l3 -3 M84 82 l-3 -3"/>
       </g>
       <ellipse cx="46" cy="42" rx="13" ry="7" fill="#fff" opacity=".22" transform="rotate(-28 46 42)"/>`
    ),

    /* ---- Daguerreotype: silvered plate in a hinged case ---- */
    daguerreotype: wrap(
      lg("dg-case", s(0, "#6d3b2a") + s(0.5, "#4a2418") + s(1, "#2b140c"), "0%", "0%", "100%", "100%") +
      rg("dg-plate", s(0, "#cfd6d8") + s(0.55, "#8e999d") + s(1, "#454e52"), "45%", "35%", "78%") +
      lg("dg-mat", GOLD, "0%", "0%", "100%", "100%"),
      `<rect x="14" y="22" width="42" height="76" rx="3" fill="url(#dg-case)" stroke="#1e0f08" stroke-width="1.2"/>
       <rect x="19" y="28" width="32" height="64" rx="2" fill="none" stroke="#8a5a3e" stroke-width="1" opacity=".7"/>
       <path d="M24 40 q11 -8 22 0 M24 52 q11 -8 22 0 M24 64 q11 -8 22 0" fill="none" stroke="#8a5a3e" stroke-width="0.9" opacity=".5"/>
       <rect x="60" y="22" width="46" height="76" rx="3" fill="url(#dg-case)" stroke="#1e0f08" stroke-width="1.2"/>
       <rect x="65" y="27" width="36" height="66" rx="2" fill="url(#dg-mat)"/>
       <rect x="69" y="31" width="28" height="58" rx="12" fill="url(#dg-plate)"/>
       <ellipse cx="83" cy="52" rx="9" ry="11" fill="#5f6b70"/>
       <path d="M74 89 q9 -22 18 0 Z" fill="#5f6b70"/>
       <path d="M77 47 q6 -5 12 0" fill="none" stroke="#3d474b" stroke-width="1.2"/>
       <ellipse cx="79" cy="55" rx="2" ry="1.4" fill="#39423f"/><ellipse cx="87" cy="55" rx="2" ry="1.4" fill="#39423f"/>
       <path d="M80 61 q3 2 6 0" fill="none" stroke="#39423f" stroke-width="1"/>
       <path d="M69 34 q14 6 28 0" fill="none" stroke="#fff" stroke-width="2" opacity=".18"/>
       <rect x="56" y="22" width="4" height="76" fill="#1e0f08"/>`
    ),

    /* ---- Japanese sword: blade with hamon, tsuba, wrapped hilt ---- */
    sword: wrap(
      lg("sw-blade", s(0, "#f2f5f7") + s(0.4, "#c3ccd3") + s(1, "#7c868e"), "0%", "0%", "100%", "0%") +
      lg("sw-hilt", s(0, "#3a2e22") + s(1, "#191309"), "0%", "0%", "100%", "100%"),
      `<path d="M96 16 q6 4 4 10 L46 88 q-4 4 -9 2 l-4 -3 q-3 -3 0 -7 L92 15 q2 -2 4 1 Z"
             fill="url(#sw-blade)" stroke="#69737a" stroke-width="1.1"/>
       <path d="M93 20 L40 84" fill="none" stroke="#fff" stroke-width="1.6" opacity=".75"/>
       <path d="M97 25 L48 84" fill="none" stroke="#aab4bb" stroke-width="1" opacity=".8"/>
       <path d="M90 24 q-8 12 -18 20 q-10 10 -22 20" fill="none" stroke="#e8eef2" stroke-width="2.4" opacity=".55" stroke-dasharray="5 4"/>
       <path d="M36 84 l-8 8 q-3 3 -6 0 l-2 -2 q-3 -3 0 -6 l8 -8 Z" fill="#7a6a3c" stroke="#3f3618" stroke-width="1"/>
       <ellipse cx="31" cy="89" rx="11" ry="8" fill="#6b5a2d" stroke="#332b12" stroke-width="1.4" transform="rotate(-45 31 89)"/>
       <circle cx="31" cy="89" r="3.2" fill="#3d3316"/>
       <path d="M26 94 l-14 14 q-3 3 -6 0 q-3 -3 0 -6 l14 -14 Z" fill="url(#sw-hilt)" stroke="#120d06" stroke-width="1"/>
       <g stroke="#c9b57a" stroke-width="1.1" opacity=".8">
         <path d="M22 96 l-6 6 M18 100 l-6 6 M14 104 l-4 4"/>
       </g>
       <path d="M24 92 l-16 16" fill="none" stroke="#0f0b05" stroke-width="1" opacity=".6"/>`
    ),

    /* ---- Zippo-style lighter: brushed chrome, hinged lid ---- */
    lighter: wrap(
      lg("lt-chrome", s(0, "#eef2f5") + s(0.35, "#b4bdc4") + s(0.65, "#8a939b") + s(1, "#5c656c"), "0%", "0%", "100%", "0%") +
      lg("lt-lid", s(0, "#dde3e8") + s(1, "#7e878e"), "0%", "0%", "100%", "0%"),
      `<rect x="38" y="34" width="44" height="20" rx="4" fill="url(#lt-lid)" stroke="#525b62" stroke-width="1.2"/>
       <rect x="38" y="52" width="44" height="50" rx="4" fill="url(#lt-chrome)" stroke="#525b62" stroke-width="1.2"/>
       <path d="M38 53 h44" stroke="#4a5259" stroke-width="1.6"/>
       <rect x="34" y="40" width="6" height="10" rx="2" fill="#9aa3aa" stroke="#525b62" stroke-width="1"/>
       <g stroke="#9aa3aa" stroke-width="0.7" opacity=".55">
         <path d="M44 58 V98 M50 58 V98 M56 58 V98 M62 58 V98 M68 58 V98 M74 58 V98"/>
       </g>
       <rect x="45" y="63" width="30" height="26" rx="2" fill="#6f787f" opacity=".45"/>
       <g stroke="#e8eef2" stroke-width="1.3" opacity=".9" fill="none">
         <path d="M50 70 h20 M50 76 h20 M54 82 h12"/>
       </g>
       <path d="M42 36 q20 -6 38 0" fill="none" stroke="#fff" stroke-width="1.6" opacity=".5"/>
       <ellipse cx="46" cy="66" rx="3" ry="16" fill="#fff" opacity=".16"/>`
    ),

    /* ---- Egyptian ushabti: faience mummiform figure ---- */
    ushabti: wrap(
      lg("us-fai", s(0, "#8fd3d1") + s(0.4, "#4fa8ab") + s(1, "#1f6470"), "20%", "0%", "80%", "100%") +
      lg("us-stripe", s(0, "#2f6f86") + s(1, "#16414f"), "0%", "0%", "100%", "0%"),
      `<path d="M60 12 c-11 0 -18 8 -18 18 c0 6 2 9 2 13 c-9 4 -13 12 -13 24 l0 33
               q0 6 6 6 h46 q6 0 6 -6 l0 -33 c0 -12 -4 -20 -13 -24 c0 -4 2 -7 2 -13
               c0 -10 -7 -18 -18 -18 Z"
             fill="url(#us-fai)" stroke="#14454f" stroke-width="1.3"/>
       <path d="M42 30 q18 -9 36 0 l2 14 q-20 -8 -40 0 Z" fill="url(#us-stripe)"/>
       <g stroke="#1a5763" stroke-width="0.9" opacity=".8">
         <path d="M47 32 v11 M53 30 v13 M60 29 v14 M67 30 v13 M73 32 v11"/>
       </g>
       <ellipse cx="53" cy="24" rx="2.6" ry="1.9" fill="#123c47"/>
       <ellipse cx="67" cy="24" rx="2.6" ry="1.9" fill="#123c47"/>
       <path d="M50 22 q3 -2 6 -0.5 M64 21.5 q3 -1.5 6 0.5" stroke="#123c47" stroke-width="1.1" fill="none"/>
       <path d="M56 31 q4 2 8 0" stroke="#123c47" stroke-width="1" fill="none"/>
       <path d="M40 56 q20 -6 40 0" fill="none" stroke="#14454f" stroke-width="1.4"/>
       <path d="M44 60 l10 -6 M76 60 l-10 -6" stroke="#14454f" stroke-width="2.6" stroke-linecap="round"/>
       <g stroke="#155060" stroke-width="1" opacity=".75">
         <path d="M42 72 h36 M42 80 h36 M42 88 h36"/>
       </g>
       <g fill="#155060" opacity=".8">
         <circle cx="50" cy="76" r="1.3"/><circle cx="58" cy="76" r="1.3"/><circle cx="66" cy="76" r="1.3"/>
         <circle cx="54" cy="84" r="1.3"/><circle cx="62" cy="84" r="1.3"/><circle cx="70" cy="84" r="1.3"/>
       </g>
       <path d="M46 18 q6 -5 14 -4" fill="none" stroke="#cdf1ef" stroke-width="1.6" opacity=".45"/>`
    ),

    /* ---- Shipwreck cob: irregular hand-struck silver, sea-etched ---- */
    cob: wrap(
      rg("cb-ag", s(0, "#c9cfcc") + s(0.5, "#8d9490") + s(1, "#454b48"), "40%", "34%", "80%"),
      `<path d="M58 20 q20 -3 29 14 q11 17 3 34 q-8 18 -28 20 q-20 2 -32 -13
               q-12 -16 -5 -34 q7 -18 33 -21 Z"
             fill="url(#cb-ag)" stroke="#333836" stroke-width="1.4"/>
       <g stroke="#3d4340" stroke-width="2.6" fill="none" stroke-linecap="square">
         <path d="M60 36 V76 M40 56 H80"/>
       </g>
       <g stroke="#3d4340" stroke-width="1.4" fill="none">
         <path d="M48 44 h10 v10 M72 44 h-10 v10 M48 68 h10 v-10 M72 68 h-10 v-10"/>
       </g>
       <g fill="#5a615d" opacity=".55">
         <circle cx="44" cy="34" r="2.6"/><circle cx="79" cy="72" r="3"/><circle cx="38" cy="66" r="2"/>
         <circle cx="70" cy="28" r="1.8"/>
       </g>
       <path d="M34 48 q6 -12 16 -18" fill="none" stroke="#d5dad7" stroke-width="1.6" opacity=".35"/>
       <path d="M86 62 q-4 12 -14 18" fill="none" stroke="#2b302e" stroke-width="2" opacity=".4"/>`
    ),

    /* ---- Meteorite slice: etched Widmanstätten pattern ---- */
    meteorite: wrap(
      lg("mt-fe", s(0, "#d8dde1") + s(0.45, "#9aa2a8") + s(1, "#565e64"), "10%", "0%", "90%", "100%"),
      `<path d="M26 34 L74 20 q10 -2 14 8 l10 34 q3 10 -6 15 L52 100 q-9 5 -15 -3
               L22 62 q-5 -9 4 -14 Z"
             fill="url(#mt-fe)" stroke="#41484d" stroke-width="1.5"/>
       <g stroke="#5c646a" stroke-width="1.3" opacity=".95">
         <path d="M34 40 L70 88 M46 32 L84 74 M58 26 L94 62"/>
         <path d="M78 30 L38 74 M90 44 L50 90 M64 24 L28 58"/>
       </g>
       <g stroke="#eef2f4" stroke-width="0.8" opacity=".5">
         <path d="M36 42 L68 84 M48 34 L82 72 M76 32 L40 72 M88 46 L52 86"/>
       </g>
       <g stroke="#3a4146" stroke-width="2.2" opacity=".55">
         <path d="M42 52 L62 76 M70 44 L56 62"/>
       </g>
       <path d="M28 38 L72 25" fill="none" stroke="#f2f6f8" stroke-width="1.8" opacity=".55"/>`
    ),

    /* ---- Baltic amber with an insect inclusion ---- */
    amber: wrap(
      rg("am-res", s(0, "#ffd98f") + s(0.4, "#e0982f") + s(0.8, "#a95d16") + s(1, "#6d3708"), "38%", "32%", "78%") +
      rg("am-glow", s(0, "#ffcf7a", ".55") + s(1, "#ffcf7a", "0"), "50%", "50%", "60%"),
      `<ellipse cx="60" cy="62" rx="46" ry="42" fill="url(#am-glow)"/>
       <path d="M60 18 q24 2 32 20 q9 19 -2 36 q-12 18 -32 18 q-21 0 -31 -18
               q-10 -18 -1 -36 q9 -18 34 -20 Z"
             fill="url(#am-res)" stroke="#7a4310" stroke-width="1.3"/>
       <g fill="#3a2409" opacity=".92">
         <ellipse cx="57" cy="62" rx="3.2" ry="6.5" transform="rotate(-16 57 62)"/>
         <ellipse cx="57" cy="53" rx="2.6" ry="2.6"/>
         <ellipse cx="58" cy="72" rx="2" ry="3"/>
       </g>
       <g stroke="#3a2409" stroke-width="1.1" opacity=".8" stroke-linecap="round">
         <path d="M54 57 l-8 -5 M54 62 l-9 1 M55 67 l-8 6"/>
         <path d="M61 57 l8 -6 M61 62 l9 0 M61 67 l7 6"/>
         <path d="M56 50 l-3 -5 M59 50 l3 -5"/>
       </g>
       <path d="M48 55 q10 -6 20 -2" fill="none" stroke="#3a2409" stroke-width="0.7" opacity=".35"/>
       <ellipse cx="46" cy="40" rx="12" ry="7" fill="#fff6dd" opacity=".4" transform="rotate(-32 46 40)"/>
       <ellipse cx="76" cy="82" rx="7" ry="4" fill="#5c2f06" opacity=".3" transform="rotate(-30 76 82)"/>`
    ),

    /* ---- Cuneiform tablet: wedge-pressed clay ---- */
    tablet: wrap(
      lg("tb-clay", s(0, "#d8b184") + s(0.45, "#b1855a") + s(1, "#75512f"), "15%", "0%", "85%", "100%"),
      `<path d="M28 22 q32 -5 64 0 q6 1 6 8 l0 60 q0 7 -6 8 q-32 5 -64 0 q-6 -1 -6 -8
               l0 -60 q0 -7 6 -8 Z"
             fill="url(#tb-clay)" stroke="#5b3d21" stroke-width="1.4"/>
       <g stroke="#6b4826" stroke-width="1.5" stroke-linecap="round" opacity=".9">
         <path d="M26 38 h68 M26 54 h68 M26 70 h68"/>
       </g>
       <g fill="#5b3d21">
         <path d="M32 30 l4 -4 l1 5 Z"/><path d="M40 30 l4 -4 l1 5 Z"/><path d="M50 31 l4 -4 l1 5 Z"/>
         <path d="M60 30 l4 -4 l1 5 Z"/><path d="M70 31 l4 -4 l1 5 Z"/><path d="M80 30 l4 -4 l1 5 Z"/>
         <path d="M32 46 l4 -4 l1 5 Z"/><path d="M42 47 l4 -4 l1 5 Z"/><path d="M54 46 l4 -4 l1 5 Z"/>
         <path d="M66 47 l4 -4 l1 5 Z"/><path d="M78 46 l4 -4 l1 5 Z"/>
         <path d="M34 62 l4 -4 l1 5 Z"/><path d="M46 63 l4 -4 l1 5 Z"/><path d="M58 62 l4 -4 l1 5 Z"/>
         <path d="M70 63 l4 -4 l1 5 Z"/><path d="M82 62 l4 -4 l1 5 Z"/>
         <path d="M36 78 l4 -4 l1 5 Z"/><path d="M48 79 l4 -4 l1 5 Z"/><path d="M62 78 l4 -4 l1 5 Z"/>
         <path d="M74 79 l4 -4 l1 5 Z"/>
       </g>
       <g stroke="#5b3d21" stroke-width="1" opacity=".65">
         <path d="M33 33 l6 2 M43 33 l6 2 M53 34 l6 2 M63 33 l6 2 M73 34 l6 2"/>
         <path d="M35 49 l6 2 M47 50 l6 2 M59 49 l6 2 M71 50 l6 2"/>
         <path d="M37 65 l6 2 M49 66 l6 2 M61 65 l6 2 M73 66 l6 2"/>
       </g>
       <path d="M30 26 q30 -4 60 0" fill="none" stroke="#f0d5b2" stroke-width="1.6" opacity=".35"/>`
    ),

    /* ---- Trilobite fossil in matrix ---- */
    trilobite: wrap(
      lg("tl-matrix", s(0, "#8a7f6c") + s(0.5, "#5f5748") + s(1, "#3a352b"), "0%", "0%", "100%", "100%") +
      lg("tl-shell", s(0, "#6d5433") + s(0.45, "#3f2f1a") + s(1, "#1e150a"), "20%", "0%", "80%", "100%"),
      `<path d="M18 24 q40 -8 84 4 q6 2 4 9 l-6 62 q-1 6 -8 6 q-38 3 -74 -4 q-6 -1 -5 -8
               l3 -62 q0 -6 2 -7 Z"
             fill="url(#tl-matrix)" stroke="#2a251d" stroke-width="1.3"/>
       <path d="M60 26 c14 0 22 8 22 17 c0 4 -2 7 -3 10 l-4 32 c-1 8 -7 13 -15 13
               s-14 -5 -15 -13 l-4 -32 c-1 -3 -3 -6 -3 -10 c0 -9 8 -17 22 -17 Z"
             fill="url(#tl-shell)" stroke="#15100a" stroke-width="1.3"/>
       <path d="M42 44 q18 -8 36 0" fill="none" stroke="#15100a" stroke-width="1.4"/>
       <ellipse cx="50" cy="38" rx="3.4" ry="4" fill="#241a0d"/>
       <ellipse cx="70" cy="38" rx="3.4" ry="4" fill="#241a0d"/>
       <g stroke="#15100a" stroke-width="1.2" fill="none" opacity=".9">
         <path d="M46 54 h28 M47 62 h26 M48 70 h24 M50 78 h20 M53 86 h14"/>
       </g>
       <g stroke="#0f0b06" stroke-width="1" opacity=".7">
         <path d="M53 50 V92 M67 50 V92"/>
       </g>
       <g stroke="#8a6f45" stroke-width="0.8" opacity=".45">
         <path d="M44 58 q16 -5 32 0 M45 74 q15 -5 30 0"/>
       </g>
       <path d="M24 30 q34 -5 70 3" fill="none" stroke="#b3a68d" stroke-width="1.4" opacity=".35"/>`
    ),
  };

  PM.art = {
    render(glyph) {
      return glyphs[glyph] || wrap("", `<rect x="34" y="34" width="52" height="52" rx="3" fill="#2a2419" stroke="#544a35"/>`);
    },
    has(glyph) { return Object.prototype.hasOwnProperty.call(glyphs, glyph); },
  };
})(window.PM = window.PM || {});
