/*
 * Pawn Master — core game logic (no DOM).
 *
 * Pure rules the UI renders: value math, inspection reveal, negotiation
 * odds, the shop's till, and the win/lose meta (clear Sol's debt without
 * going broke). No document/DOM reference, so it can be tested standalone.
 */
(function (PM) {
  "use strict";

  const D = PM.data;
  const cfg = D.config;

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp01 = (x) => Math.min(1, Math.max(0, x));

  // --- Lookups -----------------------------------------------------------
  function conditionForScore(score) {
    return D.conditions.find((c) => score >= c.min) || D.conditions[D.conditions.length - 1];
  }
  function toolById(id) { return D.tools.find((t) => t.id === id); }

  // --- Value -------------------------------------------------------------
  // APPARENT: what it looks like it's worth (anchors the customer's price).
  function apparentValue(item, condMult) { return item.base * condMult; }
  // TRUE: what it actually resells for, after authenticity/quality risk.
  function trueValue(item, condMult) { return apparentValue(item, condMult) * item.vm; }

  // --- Inspection --------------------------------------------------------
  function revealedKeys(ownedToolIds) {
    const set = new Set();
    ownedToolIds.forEach((id) => {
      const t = toolById(id);
      if (t) t.reveals.forEach((k) => set.add(k));
    });
    return set;
  }

  // --- Negotiation -------------------------------------------------------
  function acceptChance(offer, expMin, expMax) {
    if (expMax <= expMin) return offer >= expMin ? cfg.chanceCeil : 0;
    if (offer >= expMin) {
      const t = clamp01((offer - expMin) / (expMax - expMin));
      return cfg.chanceFloor + (cfg.chanceCeil - cfg.chanceFloor) * t;
    }
    return clamp01(offer / expMin) * cfg.chanceFloor;
  }

  // --- Shop / meta -------------------------------------------------------
  function createShop() {
    return { till: cfg.startingTill, tools: cfg.startingTools.slice(), status: "playing" };
  }
  function ownsTool(shop, id) { return shop.tools.includes(id); }
  function buyTool(shop, id) {
    const t = toolById(id);
    if (!t || ownsTool(shop, id) || shop.till < t.cost) return false;
    shop.till -= t.cost;
    return true; // caller pushes the id after spending
  }
  // Progress toward clearing the debt = profit banked above the starting float.
  function debtCleared(shop) { return Math.max(0, shop.till - cfg.startingTill); }
  function debtProgress(shop) { return clamp01(debtCleared(shop) / cfg.debtGoal); }

  // Apply an accepted deal to the till and re-evaluate the run's status.
  function settleDeal(shop, outcome) {
    shop.till += outcome.profit;
    if (debtCleared(shop) >= cfg.debtGoal) shop.status = "won";
    else if (shop.till < cfg.brokeThreshold) shop.status = "lost";
    return shop.status;
  }

  // --- Encounter ---------------------------------------------------------
  function newEncounter() {
    const item = pick(D.items);
    const customer = pick(D.customers);
    const condScore = rand(cfg.conditionRollMin, cfg.conditionRollMax);
    const tier = conditionForScore(condScore);
    const apparent = apparentValue(item, tier.mult);
    const startOffer = Math.max(cfg.offerStep,
      Math.round((apparent * customer.min) * 0.6 / cfg.offerStep) * cfg.offerStep);

    return {
      item, customer, tier,
      apparent,
      trueVal: trueValue(item, tier.mult),
      expMin: apparent * customer.min,
      expMax: apparent * customer.max,
      line: pick(customer.lines),
      offer: startOffer,
      roundsUsed: 0,
    };
  }

  // Resolve one submitted offer. Pure — caller settles the till.
  function submitOffer(enc) {
    enc.roundsUsed += 1;
    const chance = acceptChance(enc.offer, enc.expMin, enc.expMax);
    const accepted = Math.random() <= chance;
    return {
      accepted,
      chance,
      offer: enc.offer,
      trueVal: enc.trueVal,
      profit: enc.trueVal - enc.offer,
      roundsRemaining: enc.customer.patience - enc.roundsUsed,
    };
  }

  PM.core = {
    conditionForScore, toolById,
    apparentValue, trueValue,
    revealedKeys,
    acceptChance,
    createShop, ownsTool, buyTool, debtCleared, debtProgress, settleDeal,
    newEncounter, submitOffer,
  };
})(window.PM = window.PM || {});
