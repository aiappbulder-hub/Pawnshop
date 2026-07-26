/*
 * Pawn Master — game content (data-driven).
 *
 * The roster is antiques with real histories, priced against genuine market
 * research, paired with the four classic forgeries that actually walk into
 * pawn shops. `story` is the provenance the seller offers; `tell` is the
 * detail a real appraiser uses to settle it, revealed once you've verified
 * the item (or, painfully, after you've bought it).
 *
 * `base` = the market-comp value the piece APPEARS to have.
 * `vm`   = true resale value as a ratio of that. The traps look valuable and
 *          are not, which is the whole game.
 * `photo`= optional image URL; the engraved drawing in art.js is used when
 *          absent or if the image fails to load.
 *
 * Adding an item/tool/customer is an edit to this file only.
 */
(function (PM) {
  "use strict";

  PM.data = {
    story: {
      shopName: "MERRICK'S",
      shopLine: "Pawn & Loan · est. 1968",
      intro: [
        "Your grandfather, <b>Sol Merrick</b>, ran this shop for forty years. He could date a piece of jet by the way it warmed in his hand. Last month he died, and left you the cabinets, the brass loupe worn smooth by his thumb, and a debt.",
        "To cover the hospital bills Sol borrowed <b>$18,000</b> against the building from <b>Vince Corrigan</b>. Corrigan wants it back, and he'll take the shop instead.",
        "There's <b>$4,000</b> in the till. Everything that comes across that counter has a story attached — and about a third of those stories are lies. Sol could tell which. Learn to.",
      ],
      startPrompt: "Open the shop",
    },

    config: {
      startingTill: 4000,
      debtGoal: 18000,
      brokeThreshold: 100,
      startingTools: ["loupe"],
      offerStep: 25,
      chanceFloor: 0.6,
      chanceCeil: 0.98,
      conditionRollMin: 0.4,
      conditionRollMax: 1.0,
    },

    conditions: [
      { id: "mint", label: "Mint", min: 0.92, mult: 1.08, color: "#7fae74" },
      { id: "good", label: "Good", min: 0.7, mult: 1.0, color: "#c2a24a" },
      { id: "fair", label: "Fair", min: 0.45, mult: 0.82, color: "#c07f3a" },
      { id: "poor", label: "Poor", min: 0.0, mult: 0.6, color: "#b0524e" },
    ],

    items: [
      /* ---------- genuine ---------- */
      {
        id: "trench_watch", glyph: "trenchwatch",
        name: "WWI Trench Watch", model: "Waltham · 1916", era: "First World War",
        base: 750, vm: 1.0, comps: "$400 – $1,100",
        story: "An officer's watch — wire lugs and a shrapnel guard over the dial, from when men first strapped a pocket watch to the wrist. It came back from the Somme. His grandson never wound it.",
        tell: "Original crown, matching hands, guard intact. Wrong hands or a swapped crown would gut the value; these are correct.",
        attrs: { material: "Silver case, enamel dial", authenticity: "Genuine, original parts", age: "1916" },
      },
      {
        id: "mourning_brooch", glyph: "brooch",
        name: "Mourning Brooch, Hairwork", model: "Whitby jet · c.1871", era: "Victorian",
        base: 430, vm: 1.0, comps: "$100 – $2,000",
        story: "Victorian grief made wearable. Behind the glass panel is a lock of the dead woman's hair, woven into a wheat pattern by hand, and the reverse is engraved 'In Memory Of'.",
        tell: "True Whitby jet — warm to the touch, hand-carved, not moulded glass. Hairwork sealed under original glass.",
        attrs: { material: "Whitby jet, gold, human hair", authenticity: "Genuine Victorian", age: "c.1871" },
      },
      {
        id: "tiffany_lamp", glyph: "lamp",
        name: "Tiffany Studios Table Lamp", model: "Leaded dragonfly shade · c.1910", era: "Art Nouveau",
        base: 9500, vm: 1.0, comps: "$4,000 – $1M+",
        story: "Genuine Tiffany Studios, made in the window between 1890 and 1930. The bronze base carries the stamp and a model number. It came out of a lake house estate that hadn't been opened in thirty years.",
        tell: "Confetti and mottled glass that shifts colour lit and unlit; the base stamp is cast into the bronze, not etched on after.",
        attrs: { material: "Leaded favrile glass, bronze", authenticity: "Tiffany Studios, stamped", age: "c.1910" },
      },
      {
        id: "vdb_cent", glyph: "cent",
        name: "1909-S VDB Lincoln Cent", model: "EF-45 · San Francisco", era: "Key date",
        base: 1450, vm: 1.0, comps: "$1,200 – $13,000",
        story: "The king of Lincoln cents. Only 484,000 struck before the designer's initials were pulled from the die. This one sat in a cigar box of his father's pocket change for sixty years.",
        tell: "The S mintmark carries the tiny raised dot inside its upper curve — present only on genuine dies. Field around it is undisturbed.",
        attrs: { material: "Bronze", authenticity: "Genuine, original mintmark", age: "1909" },
      },
      {
        id: "meissen", glyph: "porcelain",
        name: "Meissen Figural Group", model: "Crossed swords · c.1880", era: "19th c. German",
        base: 2200, vm: 1.0, comps: "$1,500 – $30,000",
        story: "Meissen has painted those crossed swords under the glaze since 1723, which makes it the most forged mark in porcelain. This piece has the weight and the translucency.",
        tell: "Under the loupe the cobalt strokes sit beneath the glaze with the glaze pooled over them, and the sword tips are crisp — hand-painted, not printed.",
        attrs: { material: "Hard-paste porcelain", authenticity: "Genuine Meissen, underglaze mark", age: "c.1880" },
      },
      {
        id: "georgian_ring", glyph: "ring",
        name: "Georgian Mourning Ring", model: "18k · dated 1789", era: "Georgian",
        base: 900, vm: 1.0, comps: "$600 – $2,500",
        story: "Inside the band, cut by hand: 'J.H. OB. 12 MAR 1789 AET 41.' Obiit — died. A sepia miniature of a weeping willow sits under rock crystal, painted in ground hair and pigment.",
        tell: "Hand-cut 18k with the irregularities of pre-industrial work; crystal and engraving both period-correct.",
        attrs: { material: "18k gold, rock crystal", authenticity: "Genuine Georgian", age: "1789" },
      },
      {
        id: "deco_ring", glyph: "ring",
        name: "Art Deco Diamond Ring", model: "Platinum · old European cut", era: "c.1925",
        base: 2800, vm: 1.0, comps: "$2,200 – $3,600",
        story: "Cut by hand before lasers existed, so it throws light in broad flashes rather than the tight sparkle of a modern stone. Geometry straight out of 1925.",
        tell: "Platinum tests true, and the stone shows the open culet and chunky facets of a genuine old European cut.",
        attrs: { material: "Platinum, natural diamond", authenticity: "Genuine, period stone", age: "c.1925" },
      },
      {
        id: "bullion", glyph: "bullion",
        name: "American Gold Eagle", model: "1 oz fine gold", era: "Bullion",
        base: 2300, vm: 1.0, comps: "spot-linked $2,200 – $2,450",
        story: "No romance here, and that's the appeal. It has no provenance, no story, no sentimental markup — it is worth precisely what an ounce of gold is worth this morning.",
        tell: "Weight and dimensions check to the milligram against the mint spec.",
        attrs: { material: "22k gold, 1 oz fine", authenticity: "Genuine mint issue", age: "modern" },
      },

      /* ---------- the forgeries ---------- */
      {
        id: "strad_copy", glyph: "violin",
        name: '"Stradivarius" Violin', model: "labelled Cremona 1721", era: "claimed 18th c.",
        base: 4200, vm: 0.11, comps: "$4,000+ if the label were true",
        story: "The label inside reads 'Antonius Stradivarius Cremonensis Faciebat Anno 1721'. It came from the old country in a steamer trunk, and the family has believed in it for three generations.",
        tell: "'Copy of' is printed on the line above the label, and the back is stamped GERMANY. A Markneukirchen factory fiddle — thousands were sold through Sears catalogues. Worth a few hundred as a student instrument.",
        attrs: { material: "Spruce and maple, factory-graded", authenticity: "Trade copy, not Cremonese", age: "c.1905" },
      },
      {
        id: "repro_lamp", glyph: "lamp",
        name: '"Tiffany" Table Lamp', model: "leaded shade, no stamp", era: "claimed c.1910",
        base: 8800, vm: 0.045, comps: "$4,000+ if genuine",
        story: "Grandmother's Tiffany. She told everyone it would put a grandchild through college one day, and nobody in the family ever had reason to doubt her.",
        tell: "Solder lines are machine-even, the glass is modern rolled sheet with no mottling, and the base is unstamped. A 1970s reproduction — they've been made since the 1920s.",
        attrs: { material: "Rolled glass, cast base", authenticity: "Reproduction, unmarked", age: "c.1975" },
      },
      {
        id: "altered_cent", glyph: "cent",
        name: "1909-S VDB Cent", model: "claimed key date", era: "claimed 1909-S",
        base: 1400, vm: 0.012, comps: "$1,200+ if the S were struck",
        story: "He has the price guide open on his phone, folded to the 1909-S VDB page, and he has already decided what this is worth before he walked in.",
        tell: "The S was soldered onto a common 1909 VDB cent. No raised dot inside the curve, and the field around the mintmark is disturbed where it was seated. The most altered coin in the world.",
        attrs: { material: "Bronze", authenticity: "Added mintmark — altered", age: "1909, S added later" },
      },
      {
        id: "dresden_fake", glyph: "porcelain",
        name: '"Meissen" Figural Group', model: "crossed swords mark", era: "claimed 18th c.",
        base: 2000, vm: 0.06, comps: "$1,500+ if genuine",
        story: "Sold to him at an estate sale as Meissen, with the crossed swords right there on the base. Dresden decorating studios copied that mark relentlessly through the 1800s, and the market has never fully recovered.",
        tell: "The sword tips feather and bleed where the forger rushed the stroke, and the mark sits on top of the glaze rather than under it. A Dresden copy.",
        attrs: { material: "Porcelain, overglaze mark", authenticity: "Forged mark — Dresden copy", age: "late 19th c." },
      },
    ],

    tools: [
      { id: "loupe", name: "Jeweler's Loupe (10×)", note: "hallmarks, labels, date codes, mintmarks", reveals: ["age"], cost: 0 },
      { id: "scale", name: "Precision Scale & Calipers", note: "weight and dimension betray plating and casts", reveals: ["material"], cost: 800 },
      { id: "tester", name: "Acid, Diamond Probe & UV", note: "settles metal, stone and glaze questions", reveals: ["authenticity"], cost: 1500 },
      { id: "bench_kit", name: "Bench Appraisal Kit", note: "material and authenticity, bundled cheaper", reveals: ["authenticity", "material"], cost: 2000 },
      { id: "auth_station", name: "Authentication Station", note: "the full bench — verifies everything", reveals: ["material", "age", "authenticity"], cost: 5000 },
    ],

    customers: [
      { id: "inheritor", name: "The Inheritor", min: 1.1, max: 1.4, patience: 3,
        lines: ["It was my father's. I'd hate to let it go for nothing.",
                "Nobody in the family could ever bring themselves to sell it. Until now."] },
      { id: "short", name: "Short on Rent", min: 0.8, max: 1.0, patience: 2,
        lines: ["I need cash today. Just make it fair and I'm gone.",
                "No stories. What'll you give me, right now?"] },
      { id: "chancer", name: "The Chancer", min: 1.4, max: 2.0, patience: 4,
        lines: ["I know exactly what I've got here. Don't insult me.",
                "I've had this looked at before. You won't be the first to lowball me."] },
      { id: "regular", name: "One of Sol's Regulars", min: 0.95, max: 1.15, patience: 3,
        lines: ["Sol always gave me a square deal. I'm hoping that carried over.",
                "Your grandfather knew his stuff. Let's see if it runs in the family."] },
    ],
  };
})(window.PM = window.PM || {});
