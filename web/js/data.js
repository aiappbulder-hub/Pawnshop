/*
 * Pawn Master — game content (data-driven).
 *
 * Everything a designer would tune lives here as plain data. Adding an
 * item, tool, or customer is an edit to this file only; no logic in
 * core.js or ui.js needs to change. This mirrors the .tres resources of
 * the Godot build.
 */
(function (PM) {
  "use strict";

  PM.data = {
    // Tuning knobs kept out of code so balance is a data change.
    config: {
      startingCoins: 1000,
      // Start able only to DATE an item; verifying material and (crucially)
      // authenticity must be earned, so fakes can burn a new player until
      // they save up for the right tool.
      startingTools: ["magnifier"],
      offerStep: 10,
      // Negotiation acceptance curve (see core.acceptChance).
      chanceFloor: 0.6,
      chanceCeil: 0.98,
      // Condition randomly rolled per encounter within this range.
      conditionRollMin: 0.2,
      conditionRollMax: 1.0,
    },

    // Sorted high -> low by `min`, matching ConditionDatabase resolution.
    conditions: [
      { id: "mint", label: "Mint", min: 0.9, mult: 1.1, color: "#4ac76b" },
      { id: "good", label: "Good", min: 0.7, mult: 1.0, color: "#dbc24a" },
      { id: "worn", label: "Worn", min: 0.4, mult: 0.75, color: "#de8733" },
      { id: "poor", label: "Poor", min: 0.0, mult: 0.45, color: "#c03d3d" },
    ],

    // base   = sticker value before condition.
    // vm      = value_multiplier: true resale value as a ratio of apparent
    //           value. < 1 means it's worth less than it looks (fakes,
    //           plated metal), so skipping inspection is a real risk.
    // attrs   = hidden traits, only shown once a tool that reveals the key
    //           is owned.
    items: [
      { id: "gold_ring", name: "14k Gold Ring", emoji: "💍", base: 120, vm: 1.0,
        attrs: { material: "14k Solid Gold", authenticity: "Genuine", age: "Modern" } },
      { id: "pocket_watch", name: "Antique Pocket Watch", emoji: "🕰️", base: 85, vm: 0.85,
        attrs: { material: "Gold Plated (Not Solid Gold)", authenticity: "Genuine Antique", age: "1910 – 1930" } },
      { id: "electric_guitar", name: "Electric Guitar", emoji: "🎸", base: 250, vm: 1.0,
        attrs: { material: "Alder Body / Maple Neck", authenticity: "Genuine", age: "1990s" } },
      { id: "games_console", name: "Games Console", emoji: "🎮", base: 180, vm: 1.0,
        attrs: { material: "Plastic / Electronics", authenticity: "Genuine", age: "Current Generation" } },
      { id: "counterfeit_watch", name: '"Luxury" Wristwatch', emoji: "⌚", base: 220, vm: 0.18,
        attrs: { material: "Stainless Steel (Not Gold)", authenticity: "Counterfeit", age: "Recent Replica" } },
    ],

    // reveals = which hidden attribute keys owning this tool exposes.
    tools: [
      { id: "magnifier", name: "Magnifier", emoji: "🔍", reveals: ["age"], cost: 0 },
      { id: "scale", name: "Scale", emoji: "⚖️", reveals: ["material"], cost: 800 },
      { id: "uv_light", name: "UV Light", emoji: "🟣", reveals: ["authenticity"], cost: 1500 },
      // Bundle: both material + authenticity for less than buying each.
      { id: "test_kit", name: "Test Kit", emoji: "🧪", reveals: ["authenticity", "material"], cost: 2000 },
      // Premium: reveals everything in one tool.
      { id: "x_ray_scanner", name: "X-Ray Scanner", emoji: "📟", reveals: ["material", "age", "authenticity"], cost: 5000 },
    ],

    // min/max = asking range as a multiplier of APPARENT value.
    // patience = counter-offer rounds tolerated before walking out.
    customers: [
      { id: "sentimental", name: "Sentimental Seller", min: 1.1, max: 1.4, patience: 3,
        lines: ["This belonged to my grandfather. He said it was very valuable…",
                "It's been in the family for years, I just need the cash right now."] },
      { id: "quick", name: "Quick Seller", min: 0.85, max: 1.05, patience: 2,
        lines: ["I just need this gone today, make me an offer.",
                "No stories here — just tell me what you'll pay."] },
      { id: "confident", name: "Confident Seller", min: 1.5, max: 2.2, patience: 4,
        lines: ["This is the real deal, trust me. You won't find better.",
                "I know exactly what this is worth, so don't lowball me."] },
    ],
  };
})(window.PM = window.PM || {});
