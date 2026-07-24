/*
 * Pawn Master — presentation layer.
 *
 * Renders each screen from core state and forwards taps back into core.
 * Holds no game rules of its own; the item is presented as an appraiser's
 * listing (render, make/model, market comps, spec sheet) rather than a toy.
 */
(function (PM) {
  "use strict";

  const core = PM.core;
  const art = PM.art;
  const D = PM.data;
  const cfg = D.config;

  const shop = core.createShop();
  let enc = null;
  let lastOutcome = null;
  let returnTo = renderCustomer;

  const $ = (id) => document.getElementById(id);
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const screen = $("screen");

  function swap(html) {
    screen.innerHTML = html;
    screen.classList.remove("enter");
    void screen.offsetWidth;
    screen.classList.add("enter");
  }

  function setTill(v) {
    shop.till = v;
    const el = $("till");
    el.textContent = money(v);
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
    updateDebtBar();
  }

  function updateDebtBar() {
    const pct = core.debtProgress(shop) * 100;
    const fill = $("debtFill");
    const label = $("debtLabel");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = `${money(core.debtCleared(shop))} / ${money(cfg.debtGoal)} to clear the debt`;
  }

  // Item render + market comps block, shared by inspect/offer/result.
  function itemPlate(size) {
    return `
      <div class="plate ${size || ""}">
        <div class="render">${art.render(enc.item.glyph)}</div>
        <div class="plate-meta">
          <div class="item-name">${enc.item.name}</div>
          <div class="item-model">${enc.item.model}</div>
          <div class="comps"><span>Comparable listings</span><b>${enc.item.comps}</b></div>
        </div>
      </div>`;
  }

  // ---------- INTRO ----------
  function renderIntro() {
    const s = D.story;
    swap(`
      <div class="intro">
        <div class="crest">
          <div class="crest-mark">${art.render("coin")}</div>
          <div class="shop-name">${s.shopName}</div>
          <div class="shop-line">${s.shopLine}</div>
        </div>
        <div class="story">${s.intro.map((p) => `<p>${p}</p>`).join("")}</div>
        <div class="spacer"></div>
        <div class="actions"><button class="btn btn-gold" id="go">${s.startPrompt}</button></div>
      </div>
    `);
    $("go").onclick = () => { document.querySelector(".chrome").classList.remove("hidden"); nextCustomer(); };
  }

  // ---------- CUSTOMER ----------
  function renderCustomer() {
    swap(`
      <div class="eyebrow">At the counter</div>
      <div class="bubble"><span class="customer-tag">${enc.customer.name}</span>${enc.line}</div>
      ${itemPlate("lg")}
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-primary" id="go">Inspect the item</button></div>
    `);
    $("go").onclick = renderInspect;
  }

  // ---------- INSPECT ----------
  function renderInspect() {
    const shown = core.revealedKeys(shop.tools);
    const rows = [
      `<div class="spec">
         <span class="k">Condition</span>
         <span class="badge" style="background:${enc.tier.color}22;color:${enc.tier.color}">${enc.tier.label}</span>
       </div>`,
    ];
    ["material", "authenticity", "age"].forEach((key) => {
      const known = shown.has(key);
      const val = known ? enc.item.attrs[key] : "— not verified —";
      rows.push(`
        <div class="spec">
          <span class="k">${cap(key)}</span>
          <span class="v ${known ? "known reveal" : "unknown"}">${val}</span>
        </div>`);
    });
    swap(`
      <div class="eyebrow">Appraisal</div>
      ${itemPlate("")}
      <div class="specs">${rows.join("")}</div>
      <p class="note">Your tools verify traits shown in <b>colour</b>. Anything <b>not verified</b> is Sol's warning — buy the right kit from <b>Tools</b> before you trust it.</p>
      <div class="spacer"></div>
      <div class="actions">
        <button class="btn btn-gold" id="go">Make an offer</button>
        <button class="btn btn-ghost" id="back">Back</button>
      </div>
    `);
    $("go").onclick = renderOffer;
    $("back").onclick = renderCustomer;
  }

  // ---------- OFFER ----------
  function offerQuip() {
    if (enc.roundsUsed === 0) return "So — what's your offer?";
    return enc.customer.patience - enc.roundsUsed > 0 ? "That won't do. Try again." : "";
  }

  function renderOffer() {
    // You can only pay what's in the till.
    const affordCap = Math.floor(shop.till / cfg.offerStep) * cfg.offerStep;
    const sliderMax = Math.max(cfg.offerStep, Math.min(
      affordCap,
      Math.round(Math.max(enc.expMax * 1.3, enc.offer * 1.3, 100))
    ));
    enc.offer = Math.min(enc.offer, sliderMax);
    swap(`
      <div class="eyebrow">Negotiate</div>
      <div class="bubble"><span class="customer-tag">${enc.customer.name}</span>${offerQuip()}</div>
      <div class="metric-row">
        <span>They're expecting</span>
        <span class="expects">${money(enc.expMin)} – ${money(enc.expMax)}</span>
      </div>
      <div class="offer-value" id="offerVal">${money(enc.offer)}</div>
      <div class="stepper">
        <button class="step-btn" id="minus" aria-label="Lower offer">−</button>
        <input type="range" id="slider" min="0" max="${sliderMax}" step="${cfg.offerStep}" value="${enc.offer}" aria-label="Offer amount">
        <button class="step-btn" id="plus" aria-label="Raise offer">+</button>
      </div>
      <div class="till-hint">Till available: <b>${money(shop.till)}</b></div>
      <div class="chance">
        <div class="chance-head">
          <span class="chance-label">Chance they accept</span>
          <span class="chance-pct" id="pct">0%</span>
        </div>
        <div class="meter"><div class="meter-fill" id="meter"></div></div>
      </div>
      <div class="status-line" id="status"></div>
      <div class="spacer"></div>
      <div class="actions">
        <button class="btn btn-primary" id="submit">Offer ${money(enc.offer)}</button>
        <button class="btn btn-ghost" id="walk">Pass</button>
      </div>
    `);
    const slider = $("slider");
    slider.oninput = () => { enc.offer = +slider.value; refreshOffer(); };
    $("minus").onclick = () => { enc.offer = Math.max(0, enc.offer - cfg.offerStep); slider.value = enc.offer; refreshOffer(); };
    $("plus").onclick = () => { enc.offer = Math.min(+slider.max, enc.offer + cfg.offerStep); slider.value = enc.offer; refreshOffer(); };
    $("submit").onclick = doSubmit;
    $("walk").onclick = nextCustomer;
    refreshOffer();
  }

  function refreshOffer() {
    const chance = core.acceptChance(enc.offer, enc.expMin, enc.expMax);
    const slider = $("slider");
    slider.style.setProperty("--fill", (enc.offer / (+slider.max || 1)) * 100 + "%");
    $("offerVal").textContent = money(enc.offer);
    $("submit").textContent = "Offer " + money(enc.offer);
    const pct = Math.round(chance * 100);
    const col = chance >= 0.66 ? "var(--green-bright)" : chance >= 0.33 ? "var(--amber)" : "var(--red-bright)";
    const pctEl = $("pct"), meter = $("meter");
    pctEl.textContent = pct + "%";
    pctEl.style.color = col;
    meter.style.width = pct + "%";
    meter.style.background = col;
  }

  function doSubmit() {
    const outcome = core.submitOffer(enc);
    if (outcome.accepted) {
      const status = core.settleDeal(shop, outcome);
      setTill(shop.till);
      if (status === "won") return renderEnd(true);
      if (status === "lost") return renderEnd(false);
      renderResult(outcome);
    } else if (outcome.roundsRemaining > 0) {
      const left = outcome.roundsRemaining;
      $("status").textContent = `They're not convinced. ${left} attempt${left === 1 ? "" : "s"} left.`;
    } else {
      $("status").textContent = "They pocket it and leave. Next…";
      setTimeout(nextCustomer, 950);
    }
  }

  // ---------- RESULT ----------
  function renderResult(outcome) {
    lastOutcome = outcome;
    const win = outcome.profit > 0;
    swap(`
      <div class="eyebrow">Deal closed</div>
      ${itemPlate("")}
      <div class="result-head ${win ? "win" : "loss"}">${win ? "Good buy." : "You got burned."}</div>
      <div class="ledger">
        <span class="lk">Paid</span><span class="lv">${money(outcome.offer)}</span>
        <span class="lk">Real resale value</span><span class="lv">${money(outcome.trueVal)}</span>
        <span class="lk profit-k">${win ? "Profit" : "Loss"}</span>
        <span class="lv profit-v ${win ? "win" : "loss"}">${(outcome.profit < 0 ? "−" : "") + money(Math.abs(outcome.profit))}</span>
      </div>
      ${enc.item.vm < 0.5
        ? `<p class="note warn">Sol would've caught this — verifying authenticity first would have shown what it really was.</p>`
        : ``}
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-gold" id="go">Next customer</button></div>
    `);
    $("go").onclick = nextCustomer;
  }

  // ---------- END (win / lose) ----------
  function renderEnd(won) {
    swap(`
      <div class="end">
        <div class="crest"><div class="crest-mark">${art.render(won ? "coin" : "watch")}</div></div>
        <div class="result-head ${won ? "win" : "loss"}">${won ? "Debt cleared." : "The shop is lost."}</div>
        <div class="story"><p>${won
          ? "You bank the last of it and settle with Corrigan. Merrick's stays in the family — Sol's counter is yours now."
          : "The till runs dry. Corrigan's men change the locks by morning. Sol's shop is gone."}</p></div>
        <div class="ledger">
          <span class="lk">Final till</span><span class="lv">${money(shop.till)}</span>
          <span class="lk">Debt cleared</span><span class="lv">${money(core.debtCleared(shop))}</span>
        </div>
        <div class="spacer"></div>
        <div class="actions"><button class="btn btn-gold" id="go">Play again</button></div>
      </div>
    `);
    $("go").onclick = restart;
  }

  // ---------- TOOLS ----------
  function renderTools() {
    const rows = D.tools.map((t) => {
      const owned = core.ownsTool(shop, t.id);
      const reveals = t.reveals.map(cap).join(" + ");
      const right = owned
        ? `<span class="owned-tag">OWNED</span>`
        : `<button class="btn-buy" data-buy="${t.id}" ${shop.till < t.cost ? "disabled" : ""}>${money(t.cost)}</button>`;
      return `
        <div class="tool-row">
          <div class="tool-meta">
            <div class="tool-name">${t.name}</div>
            <div class="tool-note">${t.note}</div>
            <div class="tool-reveals">Verifies: ${reveals}</div>
          </div>
          ${right}
        </div>`;
    }).join("");
    swap(`
      <div class="eyebrow">Sol's kit</div>
      <p class="note">Better equipment verifies more <b>before you commit</b>. Every dollar spent here is a dollar off the debt — invest carefully.</p>
      <div class="specs">${rows}</div>
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-ghost" id="back">Back</button></div>
    `);
    screen.querySelectorAll("[data-buy]").forEach((b) => {
      b.onclick = () => {
        if (core.buyTool(shop, b.dataset.buy)) {
          shop.tools.push(b.dataset.buy);
          setTill(shop.till);
          renderTools();
        }
      };
    });
    $("back").onclick = () => returnTo();
  }

  // ---------- FLOW ----------
  function nextCustomer() {
    enc = core.newEncounter();
    renderCustomer();
  }

  function restart() {
    shop.till = cfg.startingTill;
    shop.tools = cfg.startingTools.slice();
    shop.status = "playing";
    setTill(shop.till);
    document.querySelector(".chrome").classList.add("hidden");
    renderIntro();
  }

  function currentScreenName() {
    const eb = screen.querySelector(".eyebrow");
    return eb ? eb.textContent : "";
  }

  function openTools() {
    const name = currentScreenName();
    if (name === "Sol's kit") return;
    returnTo = name === "Appraisal" ? renderInspect
      : name === "Negotiate" ? renderOffer
      : name === "Deal closed" ? (() => renderResult(lastOutcome))
      : renderCustomer;
    renderTools();
  }

  // ---------- BOOT ----------
  function boot() {
    setTill(shop.till);
    $("toolsBtn").onclick = openTools;
    document.querySelector(".chrome").classList.add("hidden"); // hidden during intro
    renderIntro();

    try {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
      }
    } catch (_) { /* unsupported / sandboxed context */ }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window.PM = window.PM || {});
