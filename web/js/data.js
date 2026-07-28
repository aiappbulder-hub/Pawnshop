/*
 * Pawn Master — game content (data-driven).
 *
 * Antiques with real histories, priced against genuine market research, and
 * the classic forgeries that actually walk into pawn shops. Each item tells
 * its story in three beats:
 *
 *   story   — what the seller says across the counter (provenance, hope)
 *   history — the real context: why the object exists, why it matters,
 *             and why this category is forged so relentlessly
 *   tell    — the detail a working appraiser uses to settle it, surfaced
 *             once you've verified authenticity or after the money is gone
 *
 * base   = the market-comp value the piece APPEARS to have.
 * vm     = true resale value as a ratio of that. The forgeries look
 *          valuable and are not, which is the whole game.
 * photo  = optional image URL; the illustration in art.js is used when
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
        "Your grandfather, <b>Sol Merrick</b>, ran this shop for forty years. He could date a piece of jet by the way it warmed in his hand, and he never once paid for a story he hadn't checked.",
        "To cover the hospital bills Sol borrowed <b>$18,000</b> against the building from <b>Vince Corrigan</b>. Corrigan wants it back, and he'll take the shop instead.",
        "There's <b>$4,000</b> in the till and a loupe worn smooth by his thumb. Everything that crosses that counter arrives with a story attached. About a third of those stories are lies.",
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
      /* ================= GENUINE ================= */
      {
        id: "trench_watch", glyph: "trenchwatch",
        name: "WWI Trench Watch", model: "Waltham · 1916", era: "First World War",
        base: 750, vm: 1.0, comps: "$400 – $1,100",
        story: "An officer's watch, with the shrapnel guard still hinged over the dial. It came home from the Somme when the man wearing it didn't have to be carried. His grandson has never once wound it.",
        history: "Before 1914 a wristwatch was considered a woman's ornament; officers carried pocket watches. Then men needed to synchronise an artillery barrage with one hand while holding a rifle in the other, and the wristwatch was born out of necessity in the mud. Soldiers strapped pocket watches to their wrists in wire cages, and within four years the entire industry had changed shape.",
        tell: "Original crown, matching hands, guard intact. A swapped crown or mismatched hands guts the value of one of these; on this example everything is period and everything agrees.",
        attrs: { material: "Silver case, enamel dial", authenticity: "Genuine, original parts", age: "1916" },
      },
      {
        id: "mourning_brooch", glyph: "brooch",
        name: "Mourning Brooch, Hairwork", model: "Whitby jet · c.1871", era: "Victorian",
        base: 430, vm: 1.0, comps: "$100 – $2,000",
        story: "Behind the glass panel is a lock of the dead woman's hair, woven by hand into a wheat pattern. The reverse is engraved 'In Memory Of'. Someone sat and plaited that, knowing exactly what they were plaiting.",
        history: "When Albert died in 1861, Victoria wore black for the remaining forty years of her life, and an empire followed her into mourning. An entire industry grew up around it — Whitby's jet workshops employed over a thousand people at the peak. Hair was used because it's the only part of a person that doesn't decay: a piece of the dead you could keep wearing.",
        tell: "True Whitby jet — warm to the touch, slightly resinous, hand-carved rather than moulded. Cheaper mourning pieces used black glass, which stays cold. The hairwork is intact under its original glass.",
        attrs: { material: "Whitby jet, gold, human hair", authenticity: "Genuine Victorian", age: "c.1871" },
      },
      {
        id: "tiffany_lamp", glyph: "lamp",
        name: "Tiffany Studios Table Lamp", model: "Leaded dragonfly shade · c.1910", era: "Art Nouveau",
        base: 9500, vm: 1.0, comps: "$4,000 – $1M+",
        story: "Genuine Tiffany Studios. The bronze base carries the stamp and a model number, and the glass changes colour depending on whether the lamp is lit. It came out of a lake house estate that hadn't been properly opened in thirty years.",
        history: "Louis Comfort Tiffany's studios ran from about 1890 to 1930, and the shades were largely designed and assembled by women — the 'Tiffany Girls' under Clara Driscoll, whose authorship went unacknowledged for nearly a century. The dragonfly shade was hers. One lamp sold for $3.37 million in 2018.",
        tell: "Confetti and mottled favrile glass that shifts colour lit and unlit — modern glass can't fake that depth. The base stamp is cast into the bronze, not etched on afterward.",
        attrs: { material: "Leaded favrile glass, bronze", authenticity: "Tiffany Studios, stamped", age: "c.1910" },
      },
      {
        id: "vdb_cent", glyph: "cent",
        name: "1909-S VDB Lincoln Cent", model: "EF-45 · San Francisco", era: "Key date",
        base: 1450, vm: 1.0, comps: "$1,200 – $13,000",
        story: "The king of Lincoln cents. It sat in a cigar box of his father's pocket change for sixty years, under a stack of buffalo nickels nobody ever bothered to sort.",
        history: "Victor David Brenner put his initials on the reverse of the first Lincoln cent in 1909. The public decided that was self-promotion on the nation's coinage, and the Mint pulled them within days. San Francisco struck only 484,000 before the change — which turned a one-cent piece into the most famous small coin in America.",
        tell: "The S mintmark carries the tiny raised dot inside its upper curve, present only on genuine dies of that year. The field around it is undisturbed, with no tooling and no solder bloom.",
        attrs: { material: "Bronze", authenticity: "Genuine, original mintmark", age: "1909" },
      },
      {
        id: "denarius", glyph: "denarius",
        name: "Roman Silver Denarius", model: "Marcus Aurelius · c.170 AD", era: "Imperial Rome",
        base: 140, vm: 1.0, comps: "$90 – $250",
        story: "About a day's wage for a legionary. It has been in circulation, in the ground, and in collections for nineteen centuries, and it is older than everything else in this building by roughly eighteen hundred years.",
        history: "People assume anything Roman is priceless. It isn't — the empire minted denarii by the hundreds of millions and hoards still surface in English fields every year, so a worn common emperor costs less than a modern watch strap. The scarcity is in condition and in who's on the obverse, not in age.",
        tell: "Struck, not cast — no seam, and the flan is slightly irregular the way hammered coinage always is. Wear is even and consistent with real circulation rather than artificial ageing.",
        attrs: { material: "Silver, hand-struck", authenticity: "Genuine ancient issue", age: "c.170 AD" },
      },
      {
        id: "daguerreotype", glyph: "daguerreotype",
        name: "Daguerreotype, Cased", model: "Sixth plate · c.1852", era: "Early photography",
        base: 340, vm: 1.0, comps: "$150 – $900",
        story: "A woman in a dark dress, hand-tinted at the cheeks, sitting very still. She had to hold that pose for most of a minute. Nobody now knows her name, and she has been looking out of this case for a hundred and seventy years.",
        history: "The daguerreotype was the first commercially successful photograph — an image on silver-plated copper, developed over mercury fumes, with no negative. Every one is unique; there is no second copy of that woman anywhere. They held the market for barely twenty years before cheaper processes buried them.",
        tell: "Holds a true mirror finish and the image flips between positive and negative as you tilt it — a behaviour no later process reproduces. Original case, intact seals, no cleaning.",
        attrs: { material: "Silvered copper plate, glass", authenticity: "Genuine daguerreotype", age: "c.1852" },
      },
      {
        id: "gunto", glyph: "sword",
        name: "Japanese Officer's Sword", model: "Shin-gunto · 1943", era: "Second World War",
        base: 2100, vm: 1.0, comps: "$1,400 – $4,000",
        story: "A surrendered officer's sword, brought back by a serviceman who never talked about the war and never explained where it came from. The family found it wrapped in a blanket at the back of a wardrobe.",
        history: "Japanese officers were required to carry a sword, and many carried genuine older blades — some centuries old — remounted in regulation wartime fittings. Which means the value can sit in the blade rather than the mounts, and the difference between a mass-produced 1943 blade and an inherited 1600s one is the difference between a fortnight's wages and a house deposit.",
        tell: "A real hamon — the temper line runs in the steel itself and shifts as it moves through the light, rather than being ground or acid-etched onto the surface. The tang is signed and hand-filed.",
        attrs: { material: "Folded steel, brass fittings", authenticity: "Genuine wartime issue", age: "1943" },
      },
      {
        id: "meissen", glyph: "porcelain",
        name: "Meissen Figural Group", model: "Crossed swords · c.1880", era: "19th c. German",
        base: 2200, vm: 1.0, comps: "$1,500 – $30,000",
        story: "Weight, translucency and a mark that has meant something since 1723. Held up to the light the porcelain glows slightly, which the copies never quite manage.",
        history: "Meissen cracked the secret of hard-paste porcelain in 1708 — Europe had been trying to reverse-engineer Chinese porcelain for two hundred years, and Augustus the Strong reportedly kept his alchemist locked up until he produced it. The crossed swords have been applied since 1723, which also makes it the most forged mark in the history of ceramics.",
        tell: "Under the loupe the cobalt strokes sit beneath the glaze, with the glaze visibly pooled over them, and the sword tips are crisp. Hand-painted, not printed, not applied afterward.",
        attrs: { material: "Hard-paste porcelain", authenticity: "Genuine Meissen, underglaze mark", age: "c.1880" },
      },
      {
        id: "georgian_ring", glyph: "mourningring",
        name: "Georgian Mourning Ring", model: "18k · dated 1789", era: "Georgian",
        base: 900, vm: 1.0, comps: "$600 – $2,500",
        story: "Cut by hand inside the band: 'J.H. OB. 12 MAR 1789 AET 41.' Obiit — died. Aged 41. Under the rock crystal is a weeping willow painted in sepia and ground human hair.",
        history: "Georgian wills routinely set aside money to have mourning rings made and distributed to named friends at the funeral — grief as a formal obligation, with a jeweller's invoice attached. The willow and urn imagery was standard visual shorthand. That someone has worn this for two hundred and thirty years is the point of it.",
        tell: "Hand-cut 18k with all the small irregularities of pre-industrial goldwork, and the engraving cuts have the burr of a hand graver rather than the clean walls of a machine.",
        attrs: { material: "18k gold, rock crystal", authenticity: "Genuine Georgian", age: "1789" },
      },
      {
        id: "deco_ring", glyph: "decoring",
        name: "Art Deco Diamond Ring", model: "Platinum · old European cut", era: "c.1925",
        base: 2800, vm: 1.0, comps: "$2,200 – $3,600",
        story: "It throws light in broad, slow flashes rather than the tight glitter of a modern stone, because the man who cut it was working by eye and by hand.",
        history: "Old European cuts were cut to look right by candlelight and gaslight — deep, with a small flat culet at the base and chunky facets. Modern brilliants are optimised for electric light and camera flash. Plenty of period stones were recut in the twentieth century to 'modernise' them, which destroyed both weight and history, so untouched ones are getting scarce.",
        tell: "Platinum tests true, and the stone shows the open culet, small table and chunky facets of a genuine old European cut. It has never been recut.",
        attrs: { material: "Platinum, natural diamond", authenticity: "Genuine, period stone", age: "c.1925" },
      },
      {
        id: "bullion", glyph: "bullion",
        name: "American Gold Eagle", model: "1 oz fine gold", era: "Bullion",
        base: 2300, vm: 1.0, comps: "spot-linked $2,200 – $2,450",
        story: "No romance, no provenance, no sentimental markup. It is worth precisely what an ounce of gold is worth this morning, and that is the entire appeal of it.",
        history: "Sol used to say bullion was the only honest thing that came across the counter, because it can't tell you a story. Everything else in the shop is worth what someone believes about it. Gold is worth what it weighs.",
        tell: "Weight and dimensions check to the milligram against mint spec — the standard test, because a gold-plated tungsten fake gets the weight right but never the size.",
        attrs: { material: "22k gold, 1 oz fine", authenticity: "Genuine mint issue", age: "modern" },
      },

      /* ---------- antiquities: the museum cabinet ---------- */
      {
        id: "ushabti", glyph: "ushabti",
        name: "Egyptian Ushabti", model: "Faience · Late Period", era: "664 – 332 BC",
        base: 850, vm: 1.0, comps: "$400 – $2,500",
        story: "Six inches of blue-green faience, arms crossed, holding a hoe and a seed bag. It came out of a Victorian collection with a handwritten card: purchased Luxor, 1897. The card is worth almost as much as the figure.",
        history: "The word means 'answerer'. Egyptians believed the dead would be called out to labour in the fields of the afterlife, so they were buried with servants who would answer the summons in their place. A wealthy tomb held 401 of them — one for every day of the year, plus thirty-six overseers to keep the rest working. Tutankhamun was buried with 413.",
        tell: "True Egyptian faience — a self-glazing quartz paste that pushes its own glaze to the surface as it dries, so the colour sits in the body rather than on it. The hieroglyphs are impressed into wet paste, with the burr of a real tool.",
        attrs: { material: "Egyptian faience", authenticity: "Genuine, 19th c. collection card", age: "Late Period" },
      },
      {
        id: "atocha_cob", glyph: "cob",
        name: "Piece of Eight, Atocha", model: "8 reales · Potosí · 1622", era: "Spanish colonial",
        base: 950, vm: 1.0, comps: "$500 – $2,500 with COA",
        story: "Hand-struck silver, black with three and a half centuries of seawater, and a raised-seal certificate tying it to a numbered recovery tag. It was on the seabed off the Florida Keys for longer than the United States has existed.",
        history: "The Nuestra Señora de Atocha went down in a hurricane in September 1622, carrying silver mined at Potosí by forced Andean labour. Mel Fisher hunted her for sixteen years — his son Dirk, his daughter-in-law Angel and a diver died when their boat rolled in 1975 — and his crew found the main pile in 1985. Every coin lifted is catalogued, which is the only reason one can be sold legitimately at all.",
        tell: "Sea-etched surface with the crystalline corrosion only decades on a seabed produce, an irregular hand-struck flan, and a raised-seal certificate that matches a catalogued recovery tag.",
        attrs: { material: "Hand-struck colonial silver", authenticity: "Certificated Atocha recovery", age: "1622" },
      },
      {
        id: "meteorite", glyph: "meteorite",
        name: "Muonionalusta Meteorite", model: "Etched slice · fine octahedrite", era: "4.5 billion years",
        base: 420, vm: 1.0, comps: "$200 – $900",
        story: "A slice of iron-nickel, acid-etched to bring up the pattern, cool and impossibly heavy in the hand. It is the oldest object that will ever cross this counter, by a margin of about four and a half billion years.",
        history: "It is a fragment of the shattered core of a planetesimal that never finished becoming a planet, and it is older than the Earth's crust. It fell in northern Scandinavia around a million years ago and lay in the Lapland tundra through every ice age since, until a farmer turned one up in 1906.",
        tell: "The Widmanstätten pattern — interlocking crystal bands that only form when molten iron cools by a few degrees every million years. No furnace on Earth can run that slowly, which makes it the one antique in the shop that literally cannot be forged.",
        attrs: { material: "Iron-nickel, octahedrite", authenticity: "Genuine — Widmanstätten confirmed", age: "~4.5 bn years" },
      },
      {
        id: "amber", glyph: "amber",
        name: "Baltic Amber, Inclusion", model: "Fossil resin · with insect", era: "~40 million years",
        base: 620, vm: 1.0, comps: "$300 – $1,500",
        story: "Hold it to the lamp and there is a small fly inside, legs still splayed where it struggled. It is off-centre, half-obscured, and slightly ugly — which, counter-intuitively, is the best thing about it.",
        history: "Forty million years ago a conifer forest stood on what is now the floor of the Baltic Sea, and it bled resin. Insects landed on it and stayed. The Romans traded for the stuff up the Amber Road from the Baltic to the Adriatic, valuing a small figure of it above a living slave — Pliny complained bitterly about the prices.",
        tell: "Floats in saturated brine and stays inert under acetone, where young copal clouds and turns tacky. Fluoresces blue under UV. And the inclusion is small, off-centre and awkward, exactly as a real trapped insect should be.",
        attrs: { material: "Fossil resin, Baltic", authenticity: "Genuine amber — brine and UV pass", age: "~40 m years" },
      },
      {
        id: "cuneiform", glyph: "tablet",
        name: "Cuneiform Tablet", model: "Ur III administrative · clay", era: "c.2100 BC",
        base: 1150, vm: 1.0, comps: "$600 – $3,000",
        story: "A palm-sized clay tablet pressed with a cut reed, and behind it a folder of paperwork thicker than the tablet itself: an old collection inventory, an export licence, and a 1958 auction receipt.",
        history: "It is a receipt. Not poetry, not law — an accountant's note recording sheep and barley for a temple storehouse in the Third Dynasty of Ur. Writing was not invented to tell stories; it was invented to track who owed what, and the overwhelming majority of the oldest documents humanity possesses are inventories. Sol's rule was that the paperwork mattered more than the object, because looted tablets flooded the market after 2003 and a piece without a pre-1970 paper trail is unsellable no matter how genuine it is.",
        tell: "Clay body and reed impressions are consistent and the surface salts are stable — but the real verification is the folder: an unbroken ownership chain predating the 1970 UNESCO convention.",
        attrs: { material: "Fired clay", authenticity: "Genuine, pre-1970 provenance", age: "c.2100 BC" },
      },

      /* ================= THE FORGERIES ================= */
      {
        id: "strad_copy", glyph: "violin",
        name: '"Stradivarius" Violin', model: "labelled Cremona 1721", era: "claimed 18th c.",
        base: 4200, vm: 0.11, comps: "$4,000+ if the label were true",
        story: "The label inside reads 'Antonius Stradivarius Cremonensis Faciebat Anno 1721'. It came from the old country in a steamer trunk, and three generations of the family have believed in it. He is not going to enjoy hearing otherwise.",
        history: "There are perhaps 650 genuine Stradivari instruments in the world, and there are hundreds of thousands of violins bearing his label. From the 1880s German and Czech factories in Markneukirchen and Mittenwald turned out student violins by the trainload with 'Stradivarius' labels pasted inside — Sears sold them by mail order. The label was never meant to deceive. Time did that on its own.",
        tell: "'Copy of' is printed on the line above the label, and the back is stamped GERMANY for the American import market. A Markneukirchen factory fiddle — a decent student instrument worth a few hundred dollars, and no more.",
        attrs: { material: "Spruce and maple, factory-graded", authenticity: "Trade copy, not Cremonese", age: "c.1905" },
      },
      {
        id: "repro_lamp", glyph: "lamp",
        name: '"Tiffany" Table Lamp', model: "leaded shade, no stamp", era: "claimed c.1910",
        base: 8800, vm: 0.045, comps: "$4,000+ if genuine",
        story: "Grandmother's Tiffany. She told everyone it would put a grandchild through college one day, and nobody in the family ever had cause to doubt her.",
        history: "Tiffany-style lamps have been copied since the 1920s, and the reproduction trade exploded in the 1970s when the originals started making auction headlines. The copies aren't crimes; most were sold openly as decorative lamps. They become forgeries a generation later, when the receipt is gone and only the family story survives.",
        tell: "Solder lines are machine-even, the glass is modern rolled sheet with no mottling and no colour shift when lit, and the base carries no stamp. A 1970s reproduction.",
        attrs: { material: "Rolled glass, cast base", authenticity: "Reproduction, unmarked", age: "c.1975" },
      },
      {
        id: "altered_cent", glyph: "cent",
        name: "1909-S VDB Cent", model: "claimed key date", era: "claimed 1909-S",
        base: 1400, vm: 0.012, comps: "$1,200+ if the S were struck",
        story: "He has the price guide open on his phone, folded to the 1909-S VDB page, and he decided what this was worth before he came through the door.",
        history: "It is the most altered coin in the world. A common 1909 VDB cent is worth a few dollars; adding one letter turns it into a four-figure coin, so counterfeiters have been soldering, gluing and re-striking that S for a century. Grading services see them constantly, which is exactly why the raised dot inside the curve is checked first.",
        tell: "The S was soldered onto a common 1909 VDB. No raised dot inside the upper curve, and the field around the mintmark is disturbed where it was seated and polished.",
        attrs: { material: "Bronze", authenticity: "Added mintmark — altered", age: "1909, S added later" },
      },
      {
        id: "dresden_fake", glyph: "porcelain",
        name: '"Meissen" Figural Group', model: "crossed swords mark", era: "claimed 18th c.",
        base: 2000, vm: 0.06, comps: "$1,500+ if genuine",
        story: "Sold to him at an estate sale as Meissen, with the crossed swords right there on the base and a written receipt to prove what he paid. The receipt proves what he paid. It doesn't prove what he bought.",
        history: "Dresden's decorating studios sat a few miles from Meissen and copied that mark relentlessly through the nineteenth century. Meissen sued repeatedly. The courts helped a little and the market never fully recovered, which is why a crossed-swords mark on its own means almost nothing without the glaze evidence underneath it.",
        tell: "The sword tips feather and bleed where the forger's stroke ran out of control, and the mark sits on top of the glaze rather than under it. A Dresden copy.",
        attrs: { material: "Porcelain, overglaze mark", authenticity: "Forged mark — Dresden copy", age: "late 19th c." },
      },
      {
        id: "tourist_katana", glyph: "sword",
        name: '"Samurai" Katana', model: "claimed Edo period", era: "claimed 18th c.",
        base: 2400, vm: 0.05, comps: "$1,400+ if a genuine blade",
        story: "Bought on a trip abroad from a dealer who explained, at length, that it had been in a temple. It has a certificate. The certificate is printed on paper that is younger than the buyer.",
        history: "Genuine Japanese blades are catalogued, signed and studied by a scholarship that goes back centuries — and sit alongside an enormous trade in decorative copies made for tourists and wall displays. The giveaway is always the steel: a real hamon is a hardness boundary formed by differential quenching, not a line applied to the surface.",
        tell: "The hamon is acid-etched onto the surface and stops dead at the edges instead of running into the steel. Blade is machine-ground monosteel, the tsuba is cast, and the fittings are screwed rather than pegged.",
        attrs: { material: "Machine-ground steel, cast fittings", authenticity: "Decorative reproduction", age: "late 20th c." },
      },
      {
        id: "tourist_ushabti", glyph: "ushabti",
        name: '"Ancient" Ushabti', model: "claimed Late Period", era: "claimed 664 BC",
        base: 780, vm: 0.03, comps: "$400+ if genuine",
        story: "Bought outside a temple at Luxor from a man who was extremely clear that it had just come out of the sand, and equally clear about needing to be quick about it. That urgency is the sales technique, not the circumstance.",
        history: "Egypt has produced tourist antiquities almost continuously since the 1820s, and the trade is old enough that Victorian fakes are now collectable antiques in their own right. The modern workshops around Luxor are efficient: cast in plaster or resin, glazed, buried in a yard for a season, then dug up in front of the buyer.",
        tell: "Cast, not modelled — there's a mould seam down one side and the hieroglyphs are raised rather than impressed. The glaze sits on top as a painted layer instead of blooming out of the body the way real faience does.",
        attrs: { material: "Cast resin with painted glaze", authenticity: "Modern tourist reproduction", age: "recent" },
      },
      {
        id: "copal_amber", glyph: "amber",
        name: '"Amber" with Insect', model: "claimed Baltic fossil resin", era: "claimed 40 m years",
        base: 700, vm: 0.04, comps: "$300+ if genuine amber",
        story: "A flawless golden dome with a large, perfect, beautifully centred insect suspended in the middle of it, every leg intact. It is the most attractive specimen you have ever been offered, and that is precisely the problem.",
        history: "Copal is tree resin too — just young, thousands of years old rather than tens of millions, and not yet polymerised. It's soft enough to melt, which means an insect can be pressed in yesterday. The giveaway is aesthetic before it's chemical: forty million years of geology does not produce tidy compositions.",
        tell: "Sinks in saturated brine and goes tacky and cloudy under acetone within seconds — young copal, not amber. And the inclusion is too large, too perfect and too centred; real trapped insects are small, off-axis and damaged.",
        attrs: { material: "Copal, recent resin", authenticity: "Not amber — pressed inclusion", age: "modern" },
      },
      {
        id: "composite_trilobite", glyph: "trilobite",
        name: "Trilobite Fossil", model: "claimed Moroccan Devonian", era: "claimed 400 m years",
        base: 540, vm: 0.09, comps: "$350+ if a clean specimen",
        story: "Beautifully prepared, fully articulated, every spine intact, sitting proud of the matrix in a way that makes it look like it swam into the rock this morning. Priced as a fine specimen because it looks exactly like one.",
        history: "Morocco produces genuine Devonian trilobites in enormous numbers, and alongside them a vast preparation industry. Some specimens are honestly cleaned; others are carved from stone, cast in resin, or assembled from the good halves of several damaged animals. The trade has been described as the most sophisticated fossil forgery operation in the world.",
        tell: "Under magnification the shell changes texture halfway down the body where two different animals were joined, and the spines are carved from the matrix rather than fossilised. A composite — parts genuine, the whole invented.",
        attrs: { material: "Composite: partial fossil, carved matrix", authenticity: "Assembled specimen", age: "part genuine, part modern" },
      },
      {
        id: "fake_zippo", glyph: "lighter",
        name: "Vietnam-Engraved Lighter", model: 'claimed "KHE SANH 1968"', era: "claimed 1968",
        base: 420, vm: 0.06, comps: "$300+ if a genuine bring-back",
        story: "Engraved with a unit, a place and a date, and a line of black humour underneath it. It is the kind of object that makes people go quiet when it's put on the counter, which is precisely the point.",
        history: "Soldiers really did have lighters engraved in-country, and genuine bring-backs with documented provenance are collected seriously. That created a forgery industry: blank period lighters bought cheap, engraved decades later with the darkest slogans a seller can think of. It is one of the few fakes that trades purely on other people's grief.",
        tell: "The engraving is laser-cut with uniform depth, not hand-scratched with a die-stamp. Worse, the base code dates the case itself to the 1990s — twenty years after the date on the side.",
        attrs: { material: "Chrome case, laser engraving", authenticity: "Later engraving on later case", age: "case c.1994" },
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
        lines: ["I need cash today. Make it fair and I'm gone.",
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
