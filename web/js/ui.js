/*
 * Pawn Master — presentation layer.
 *
 * Renders each screen from core state and forwards taps back into core.
 * Holds no game rules of its own. Items are presented as an appraiser's
 * listing: engraved plate, provenance the seller offers, spec sheet, and —
 * once the deal closes — the tell that settled it.
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
  // Bind by id. addEventListener (not .onclick) plus touch-action in CSS
  // keeps taps reliable on iOS Safari.
  const on = (id, fn) => { const el = $(id); if (el) el.addEventListener("click", fn); };

  const screen = $("screen");

  function swap(html) {
    screen.innerHTML = html;
    screen.scrollTop = 0;
    screen.classList.remove("enter");
    void screen.offsetWidth;
    screen.classList.add("enter");
    mountPhotos();
  }

  // An item may supply a `photo` URL. We always render the drawing first and
  // only swap in a photograph once it has actually loaded, so a blocked or
  // broken image degrades silently to the engraving instead of a broken icon.
  function mountPhotos() {
    screen.querySelectorAll("[data-photo]").forEach((frame) => {
      const url = frame.getAttribute("data-photo");
      if (!url) return;
      const img = new Image();
      img.alt = frame.getAttribute("data-alt") || "";
      img.onload = () => { frame.innerHTML = ""; frame.appendChild(img); frame.classList.add("has-photo"); };
      img.onerror = () => { /* keep the engraving */ };
      img.src = url;
    });
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
    const fill = $("debtFill");
    const label = $("debtLabel");
    if (fill) fill.style.width = core.debtProgress(shop) * 100 + "%";
    if (label) label.textContent = `${money(core.debtCleared(shop))} / ${money(cfg.debtGoal)} to clear the debt`;
  }

  function plate(size) {
    const it = enc.item;
    return `
      <div class="plate ${size || ""}">
        <div class="render" data-photo="${it.photo || ""}" data-alt="${it.name}">${art.render(it.glyph)}</div>
        <div class="plate-meta">
          <div class="item-era">${it.era}</div>
          <div class="item-name">${it.name}</div>
          <div class="item-model">${it.model}</div>
          <div class="comps"><span>Comparable listings</span><b>${it.comps}</b></div>
        </div>
      </div>`;
  }

  // ---------- INTRO ----------
  function renderIntro() {
    const s = D.story;
    swap(`
      <div class="intro">
        <div class="crest">
          <div class="crest-mark">${art.render("bullion")}</div>
          <div class="shop-name">${s.shopName}</div>
          <div class="shop-line">${s.shopLine}</div>
        </div>
        <div class="story">${s.intro.map((p) => `<p>${p}</p>`).join("")}</div>
        <div class="spacer"></div>
        <div class="actions"><button class="btn btn-gold" id="go" type="button">${s.startPrompt}</button></div>
      </div>
    `);
    on("go", () => { document.querySelector(".chrome").classList.remove("hidden"); nextCustomer(); });
  }

  // ---------- CUSTOMER ----------
  function renderCustomer() {
    swap(`
      <div class="eyebrow">At the counter</div>
      <div class="bubble"><span class="customer-tag">${enc.customer.name}</span>${enc.line}</div>
      ${plate("lg")}
      <div class="provenance">
        <div class="prov-head">The story they tell</div>
        <p>${enc.item.story}</p>
      </div>
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-primary" id="go" type="button">Inspect the item</button></div>
    `);
    on("go", renderInspect);
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
      rows.push(`
        <div class="spec">
          <span class="k">${cap(key)}</span>
          <span class="v ${known ? "known reveal" : "unknown"}">${known ? enc.item.attrs[key] : "— not verified —"}</span>
        </div>`);
    });

    // Verifying authenticity is what actually surfaces the appraiser's tell.
    const tellBlock = shown.has("authenticity")
      ? `<div class="tell reveal">
           <div class="tell-head">What the bench shows</div>
           <p>${enc.item.tell}</p>
         </div>`
      : `<p class="note">You can't settle this one by eye. Verifying <b>authenticity</b> is what surfaces the detail that decides it — Sol's kit is under <b>Tools</b>.</p>`;

    swap(`
      <div class="eyebrow">Appraisal</div>
      ${plate("")}
      <div class="specs">${rows.join("")}</div>
      ${tellBlock}
      <div class="spacer"></div>
      <div class="actions">
        <button class="btn btn-gold" id="go" type="button">Make an offer</button>
        <button class="btn btn-ghost" id="back" type="button">Back</button>
      </div>
    `);
    on("go", renderOffer);
    on("back", renderCustomer);
  }

  // ---------- OFFER ----------
  function offerQuip() {
    if (enc.roundsUsed === 0) return "So — what's your offer?";
    return enc.customer.patience - enc.roundsUsed > 0 ? "That won't do. Try again." : "";
  }

  function renderOffer() {
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
        <button class="step-btn" id="minus" type="button" aria-label="Lower offer">−</button>
        <input type="range" id="slider" min="0" max="${sliderMax}" step="${cfg.offerStep}" value="${enc.offer}" aria-label="Offer amount">
        <button class="step-btn" id="plus" type="button" aria-label="Raise offer">+</button>
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
        <button class="btn btn-primary" id="submit" type="button">Offer ${money(enc.offer)}</button>
        <button class="btn btn-ghost" id="walk" type="button">Pass</button>
      </div>
    `);
    const slider = $("slider");
    slider.addEventListener("input", () => { enc.offer = +slider.value; refreshOffer(); });
    on("minus", () => { enc.offer = Math.max(0, enc.offer - cfg.offerStep); slider.value = enc.offer; refreshOffer(); });
    on("plus", () => { enc.offer = Math.min(+slider.max, enc.offer + cfg.offerStep); slider.value = enc.offer; refreshOffer(); });
    on("submit", doSubmit);
    on("walk", nextCustomer);
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
      ${plate("")}
      <div class="result-head ${win ? "win" : "loss"}">${win ? "Good buy." : "You got burned."}</div>
      <div class="ledger">
        <span class="lk">Paid</span><span class="lv">${money(outcome.offer)}</span>
        <span class="lk">Real resale value</span><span class="lv">${money(outcome.trueVal)}</span>
        <span class="lk profit-k">${win ? "Profit" : "Loss"}</span>
        <span class="lv profit-v ${win ? "win" : "loss"}">${(outcome.profit < 0 ? "−" : "") + money(Math.abs(outcome.profit))}</span>
      </div>
      <div class="tell ${enc.item.vm < 0.5 ? "bad" : ""}">
        <div class="tell-head">${enc.item.vm < 0.5 ? "What you missed" : "What made it good"}</div>
        <p>${enc.item.tell}</p>
      </div>
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-gold" id="go" type="button">Next customer</button></div>
    `);
    on("go", nextCustomer);
  }

  // ---------- END ----------
  function renderEnd(won) {
    swap(`
      <div class="end">
        <div class="crest"><div class="crest-mark">${art.render(won ? "bullion" : "trenchwatch")}</div></div>
        <div class="result-head ${won ? "win" : "loss"}">${won ? "Debt cleared." : "The shop is lost."}</div>
        <div class="story"><p>${won
          ? "You settle with Corrigan in cash on the counter, and he leaves without a word. Merrick's stays in the family. Sol's loupe is yours now, and you've earned the use of it."
          : "The till runs dry. Corrigan's men change the locks before opening. Forty years of Sol's counter, gone in a month."}</p></div>
        <div class="ledger">
          <span class="lk">Final till</span><span class="lv">${money(shop.till)}</span>
          <span class="lk">Debt cleared</span><span class="lv">${money(core.debtCleared(shop))}</span>
        </div>
        <div class="spacer"></div>
        <div class="actions"><button class="btn btn-gold" id="go" type="button">Open up again</button></div>
      </div>
    `);
    on("go", restart);
  }

  // ---------- TOOLS ----------
  function renderTools() {
    const rows = D.tools.map((t) => {
      const owned = core.ownsTool(shop, t.id);
      const right = owned
        ? `<span class="owned-tag">OWNED</span>`
        : `<button class="btn-buy" data-buy="${t.id}" type="button" ${shop.till < t.cost ? "disabled" : ""}>${money(t.cost)}</button>`;
      return `
        <div class="tool-row">
          <div class="tool-meta">
            <div class="tool-name">${t.name}</div>
            <div class="tool-note">${t.note}</div>
            <div class="tool-reveals">Verifies: ${t.reveals.map(cap).join(" + ")}</div>
          </div>
          ${right}
        </div>`;
    }).join("");
    swap(`
      <div class="eyebrow">Sol's kit</div>
      <p class="note">Better equipment settles more <b>before you commit</b>. Every dollar spent here is a dollar not going to Corrigan — invest carefully.</p>
      <div class="specs">${rows}</div>
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-ghost" id="back" type="button">Back</button></div>
    `);
    screen.querySelectorAll("[data-buy]").forEach((b) => {
      b.addEventListener("click", () => {
        if (core.buyTool(shop, b.dataset.buy)) {
          shop.tools.push(b.dataset.buy);
          setTill(shop.till);
          renderTools();
        }
      });
    });
    on("back", () => returnTo());
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
    on("toolsBtn", openTools);
    document.querySelector(".chrome").classList.add("hidden");
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
