/*
 * Pawn Master — core game logic (no DOM).
 *
 * Pure rules the UI renders: value math, inspection reveal, negotiation
 * odds, and player wallet. Kept free of any document/DOM reference so it
 * could be unit-tested or swapped behind a different front-end.
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
  // Set of attribute keys the player can currently see, given owned tools.
  function revealedKeys(ownedToolIds) {
    const set = new Set();
    ownedToolIds.forEach((id) => {
      const t = toolById(id);
      if (t) t.reveals.forEach((k) => set.add(k));
    });
    return set;
  }

  // --- Negotiation -------------------------------------------------------
  // Chance a customer accepts `offer`, given their expected [min,max] range.
  // Offers inside the range scale floor->ceil; below-range offers fall off
  // toward zero. Curve endpoints come from config, not hardcoded here.
  function acceptChance(offer, expMin, expMax) {
    if (expMax <= expMin) return offer >= expMin ? cfg.chanceCeil : 0;
    if (offer >= expMin) {
      const t = clamp01((offer - expMin) / (expMax - expMin));
      return cfg.chanceFloor + (cfg.chanceCeil - cfg.chanceFloor) * t;
    }
    return clamp01(offer / expMin) * cfg.chanceFloor;
  }

  // --- Player ------------------------------------------------------------
  function createPlayer() {
    return { coins: cfg.startingCoins, tools: cfg.startingTools.slice() };
  }
  function ownsTool(player, id) { return player.tools.includes(id); }
  function buyTool(player, id) {
    const t = toolById(id);
    if (!t || ownsTool(player, id) || player.coins < t.cost) return false;
    player.coins -= t.cost;
    player.tools.push(id);
    return true;
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

  // Resolve one submitted offer. Returns an outcome object; the caller
  // decides how to present it and whether to mutate the player.
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
    createPlayer, ownsTool, buyTool,
    newEncounter, submitOffer,
  };
})(window.PM = window.PM || {});
