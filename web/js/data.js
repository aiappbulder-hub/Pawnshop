/*
 * Pawn Master — game content (data-driven).
 *
 * All content and tuning lives here as plain data. Items are real makes and
 * models priced against actual mid-2026 resale / comparable-listing values
 * (Rolex on WatchCharts/Chrono24, 14k gold per-gram at pawn, PS5 on
 * BankMyCell, Fender on eBay, MacBook on ValueSnap, power tools on Pawn
 * America). `base` is the market-comp value a genuine, good-condition
 * example fetches; `vm` (value multiplier) is what it's ACTUALLY worth as a
 * ratio of that — the authenticity traps (fake Rolex, plated chain, locked
 * MacBook, CZ "diamond") look valuable but aren't.
 *
 * Adding an item/tool/customer is an edit to this file only.
 */
(function (PM) {
  "use strict";

  PM.data = {
    story: {
      shopName: "MERRICK'S",
      shopLine: "Pawn & Loan · est. 1968",
      // Narrative frame, shown on the intro screen.
      intro: [
        "Your grandfather, <b>Sol Merrick</b>, ran this shop for forty years. Last month he passed, and left it to you — the cabinets, the brass loupe worn smooth by his thumb, and a debt.",
        "To cover the hospital bills, Sol borrowed <b>$18,000</b> against the building from <b>Vince Corrigan</b>. Corrigan wants it back, and he wants the shop if he doesn't get it.",
        "There's <b>$4,000</b> in the till and thirty days of goodwill left on the street. Buy low, spot the fakes Sol always warned about, and clear the debt before Corrigan does.",
      ],
      startPrompt: "Open the shop",
    },

    // Tuning knobs kept out of code so balance is a data change.
    config: {
      startingTill: 4000,     // working cash / float
      debtGoal: 18000,        // net profit needed to clear Corrigan's loan
      brokeThreshold: 100,    // fall below this and the shop is lost
      startingTools: ["loupe"],
      offerStep: 25,
      chanceFloor: 0.6,
      chanceCeil: 0.98,
      conditionRollMin: 0.35,
      conditionRollMax: 1.0,
    },

    // Sorted high -> low by `min`.
    conditions: [
      { id: "mint", label: "Mint", min: 0.92, mult: 1.08, color: "#7fae74" },
      { id: "good", label: "Good", min: 0.7, mult: 1.0, color: "#c2a24a" },
      { id: "fair", label: "Fair", min: 0.45, mult: 0.82, color: "#c07f3a" },
      { id: "poor", label: "Poor", min: 0.0, mult: 0.6, color: "#b0524e" },
    ],

    // glyph -> art.js illustration. comps -> shown as "comparable listings".
    items: [
      { id: "rolex_sub", name: "Rolex Submariner Date", model: "Ref. 126610LN · 41mm", glyph: "watch",
        base: 13500, vm: 1.0, comps: "$12,900 – $14,200",
        attrs: { material: "904L Oystersteel, sapphire", authenticity: "Genuine — serial matches papers", age: "2021" } },

      { id: "fake_rolex", name: 'Rolex Submariner "Date"', model: "no box or papers", glyph: "watch",
        base: 13000, vm: 0.02, comps: "$12,500 – $13,800 if genuine",
        attrs: { material: "Plated case, mineral glass", authenticity: "Counterfeit — replica movement", age: "Unknown" } },

      { id: "gold_chain", name: "14k Gold Rope Chain", model: "28 g · stamped 585", glyph: "chain",
        base: 1260, vm: 1.0, comps: "≈ $45/g × 28 g",
        attrs: { material: "14k solid gold (585)", authenticity: "Genuine", age: "—" } },

      { id: "plated_chain", name: "Gold Rope Chain", model: "26 g · unmarked", glyph: "chain",
        base: 1170, vm: 0.05, comps: "$1,150 – $1,300 if solid",
        attrs: { material: "Brass core, gold plated", authenticity: "Not solid gold", age: "—" } },

      { id: "gold_eagle", name: "American Gold Eagle", model: "1 oz · $50 face", glyph: "coin",
        base: 2300, vm: 1.0, comps: "spot-linked $2,200 – $2,450",
        attrs: { material: "22k gold, 1 oz fine", authenticity: "Genuine — weight & dims verified", age: "2019" } },

      { id: "diamond_ring", name: "Platinum Diamond Ring", model: "1.0 ct solitaire", glyph: "ring",
        base: 2000, vm: 1.0, comps: "$1,800 – $2,300 resale",
        attrs: { material: "Platinum, 1.0 ct natural", authenticity: "GIA certified", age: "—" } },

      { id: "cz_ring", name: '"Diamond" Solitaire Ring', model: "~1 ct stone", glyph: "ring",
        base: 1900, vm: 0.03, comps: "$1,800 – $2,300 if natural",
        attrs: { material: "White gold, cubic zirconia", authenticity: "CZ — not a diamond", age: "—" } },

      { id: "macbook", name: 'MacBook Pro 14"', model: "M3 Pro · 2023", glyph: "laptop",
        base: 1450, vm: 1.0, comps: "$1,300 – $1,650",
        attrs: { material: "Aluminium unibody", authenticity: "Genuine — signed out of iCloud", age: "2023" } },

      { id: "locked_macbook", name: 'MacBook Pro 14"', model: "M3 Pro · won't reset", glyph: "laptop",
        base: 1400, vm: 0.08, comps: "$1,300 – $1,650 if unlocked",
        attrs: { material: "Aluminium unibody", authenticity: "iCloud Activation Lock ON", age: "2023" } },

      { id: "ps5", name: "PlayStation 5", model: "Disc Edition · 1 pad", glyph: "console",
        base: 350, vm: 1.0, comps: "$300 – $400",
        attrs: { material: "—", authenticity: "Genuine, factory reset", age: "2020 launch unit" } },

      { id: "strat", name: "Fender Player Stratocaster", model: "SSS · Made in Mexico", glyph: "guitar",
        base: 600, vm: 1.0, comps: "$550 – $650",
        attrs: { material: "Alder body, maple neck", authenticity: "Genuine (MIM)", age: "2019" } },

      { id: "dewalt", name: "DeWalt 20V MAX Drill Kit", model: "2 batteries + charger", glyph: "drill",
        base: 95, vm: 1.0, comps: "$70 – $120",
        attrs: { material: "—", authenticity: "Genuine, tests good", age: "—" } },
    ],

    // reveals = hidden attribute keys owning this tool exposes. Each maps to
    // a real authentication method.
    tools: [
      { id: "loupe", name: "Jeweler's Loupe (10×)", note: "hallmarks, date codes, serials", reveals: ["age"], cost: 0 },
      { id: "scale", name: "Precision Scale", note: "weight betrays solid vs plated", reveals: ["material"], cost: 800 },
      { id: "tester", name: "Diamond & Metal Tester", note: "acid test, diamond probe, UV", reveals: ["authenticity"], cost: 1500 },
      { id: "bench_kit", name: "Bench Appraisal Kit", note: "material + authenticity, bundled", reveals: ["authenticity", "material"], cost: 2000 },
      { id: "auth_station", name: "Authentication Station", note: "reveals everything", reveals: ["material", "age", "authenticity"], cost: 5000 },
    ],

    // min/max = asking range as a multiplier of APPARENT value.
    // patience = counter-offer rounds tolerated before walking out.
    customers: [
      { id: "inheritor", name: "The Inheritor", min: 1.1, max: 1.4, patience: 3,
        lines: ["This was my late father's. I'd hate to let it go for nothing.",
                "It meant a lot to him. It should be worth something."] },
      { id: "short", name: "Short on Rent", min: 0.8, max: 1.0, patience: 2,
        lines: ["Look, I need cash today. Just make it fair.",
                "No stories. What'll you give me, right now?"] },
      { id: "chancer", name: "The Chancer", min: 1.4, max: 2.0, patience: 4,
        lines: ["This is the real deal — worth a fortune. Don't insult me.",
                "Trust me, I know what I've got here."] },
      { id: "regular", name: "One of Sol's Regulars", min: 0.95, max: 1.15, patience: 3,
        lines: ["Sol always gave me a square deal. Hope you're the same.",
                "Your grandfather knew his stuff. Let's see if you do."] },
    ],
  };
})(window.PM = window.PM || {});
