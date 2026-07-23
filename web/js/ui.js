/*
 * Pawn Master — presentation layer.
 *
 * Renders each screen from core state and forwards taps back into the
 * core. Holds no game rules of its own; swapping this file out for a
 * different look would not touch data.js or core.js.
 */
(function (PM) {
  "use strict";

  const core = PM.core;
  const cfg = PM.data.config;

  const player = core.createPlayer();
  let enc = core.newEncounter();
  let returnTo = renderCustomer; // where "Back" from Tools returns to

  const $ = (id) => document.getElementById(id);
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const screen = $("screen");

  function swap(html) {
    screen.innerHTML = html;
    screen.classList.remove("enter");
    void screen.offsetWidth; // restart the enter animation
    screen.classList.add("enter");
  }

  function setCoins(v) {
    player.coins = v;
    const el = $("coins");
    el.textContent = Math.round(v).toLocaleString("en-US");
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  // ---------- CUSTOMER ----------
  function renderCustomer() {
    swap(`
      <div class="eyebrow">Customer</div>
      <div class="bubble"><span class="customer-tag">${enc.customer.name}</span>${enc.line}</div>
      <div class="display">
        <div class="cushion">${enc.item.emoji}</div>
        <div class="item-name"><span class="item-star">✦</span> ${enc.item.name} <span class="item-star">✦</span></div>
      </div>
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-primary" id="go">Inspect</button></div>
    `);
    $("go").onclick = renderInspect;
  }

  // ---------- INSPECT ----------
  function renderInspect() {
    const shown = core.revealedKeys(player.tools);
    const rows = [
      `<div class="attr">
         <span class="k">Condition</span>
         <span class="badge" style="background:${enc.tier.color}22;color:${enc.tier.color}">${enc.tier.label}</span>
       </div>`,
    ];
    ["material", "authenticity", "age"].forEach((key) => {
      const known = shown.has(key);
      const val = known ? enc.item.attrs[key] : "Unknown";
      rows.push(`
        <div class="attr">
          <span class="k">${cap(key)}</span>
          <span class="v ${known ? "known reveal" : "unknown"}">${val}</span>
        </div>`);
    });
    swap(`
      <div class="eyebrow">Inspect</div>
      <div class="display" style="padding-bottom:6px">
        <div class="cushion" style="width:120px;height:120px;font-size:58px">${enc.item.emoji}</div>
        <div class="item-name" style="font-size:18px">${enc.item.name}</div>
      </div>
      <div class="attrs">${rows.join("")}</div>
      <p class="note">Owned tools reveal traits in <b>colour</b>; anything still <b>Unknown</b> is a gamble. Buy better tools from <b>Tools</b>, top-right.</p>
      <div class="spacer"></div>
      <div class="actions">
        <button class="btn btn-gold" id="go">Make an Offer</button>
        <button class="btn btn-ghost" id="back">Back</button>
      </div>
    `);
    $("go").onclick = renderOffer;
    $("back").onclick = renderCustomer;
  }

  // ---------- OFFER ----------
  function offerQuip() {
    if (enc.roundsUsed === 0) return "So… what are you offering?";
    return enc.customer.patience - enc.roundsUsed > 0 ? "That's not going to cut it. Try again." : "";
  }

  function renderOffer() {
    const sliderMax = Math.round(Math.max(enc.expMax * 1.3, enc.offer * 1.3, 100));
    swap(`
      <div class="eyebrow">Make an Offer</div>
      <div class="bubble" style="margin-bottom:2px"><span class="customer-tag">${enc.customer.name}</span>${offerQuip()}</div>
      <div class="metric-row">
        <span>Customer expects</span>
        <span class="expects">${money(enc.expMin)} – ${money(enc.expMax)}</span>
      </div>
      <div class="offer-value" id="offerVal">${money(enc.offer)}</div>
      <div class="stepper">
        <button class="step-btn" id="minus">−</button>
        <input type="range" id="slider" min="0" max="${sliderMax}" step="${cfg.offerStep}" value="${enc.offer}">
        <button class="step-btn" id="plus">+</button>
      </div>
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
        <button class="btn btn-primary" id="submit">Submit Offer</button>
        <button class="btn btn-ghost" id="walk">Walk Away</button>
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
      setCoins(player.coins + outcome.profit);
      renderResult(outcome);
    } else if (outcome.roundsRemaining > 0) {
      const left = outcome.roundsRemaining;
      $("status").textContent = `They're not convinced. ${left} attempt${left === 1 ? "" : "s"} left.`;
    } else {
      $("status").textContent = "They've walked out. Next customer…";
      setTimeout(nextCustomer, 900);
    }
  }

  // ---------- RESULT ----------
  function renderResult(outcome) {
    const win = outcome.profit > 0;
    const glow = win ? "rgba(79,168,94,.45)" : "rgba(192,80,78,.4)";
    swap(`
      <div class="eyebrow">Result</div>
      <div class="display" style="padding-bottom:4px">
        <div class="cushion" style="width:118px;height:118px;font-size:56px;box-shadow:inset 0 8px 24px rgba(0,0,0,.5), 0 0 60px -6px ${glow}">${enc.item.emoji}</div>
      </div>
      <div class="result-head ${win ? "win" : "loss"}">${win ? "✦ Great Deal! ✦" : "Tough Break"}</div>
      <div class="result-sub">${win ? "You turned a profit." : "You paid more than it's really worth."}</div>
      <div class="ledger">
        <span class="lk">Bought for</span><span class="lv">${money(outcome.offer)}</span>
        <span class="lk">Real resale value</span><span class="lv">${money(outcome.trueVal)}</span>
        <span class="lk profit-k">Profit</span>
        <span class="lv profit-v ${win ? "win" : "loss"}">${(outcome.profit < 0 ? "−" : "") + money(Math.abs(outcome.profit))}</span>
      </div>
      ${enc.item.vm < 0.5 ? `<p class="note">💡 This one's real value was far below what it looked like — inspecting authenticity first would've warned you.</p>` : ""}
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-gold" id="go">Next Customer</button></div>
    `);
    $("go").onclick = nextCustomer;
  }

  // ---------- TOOLS ----------
  function renderTools() {
    const rows = PM.data.tools.map((t) => {
      const owned = core.ownsTool(player, t.id);
      const reveals = t.reveals.map(cap).join(", ");
      const right = owned
        ? `<span class="owned-tag">OWNED</span>`
        : `<button class="btn-buy" data-buy="${t.id}" ${player.coins < t.cost ? "disabled" : ""}>${money(t.cost)}</button>`;
      return `
        <div class="tool-row">
          <div class="tool-ico">${t.emoji}</div>
          <div class="tool-meta">
            <div class="tool-name">${t.name}</div>
            <div class="tool-reveals">Reveals: ${reveals}</div>
          </div>
          ${right}
        </div>`;
    }).join("");
    swap(`
      <div class="eyebrow">Tools</div>
      <p class="note">Better tools reveal more of an item <b>before you commit</b>. Earn coins from good deals to afford them.</p>
      <div class="attrs">${rows}</div>
      <div class="spacer"></div>
      <div class="actions"><button class="btn btn-ghost" id="back">Back</button></div>
    `);
    screen.querySelectorAll("[data-buy]").forEach((b) => {
      b.onclick = () => {
        if (core.buyTool(player, b.dataset.buy)) {
          setCoins(player.coins);
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

  function currentScreenName() {
    const eb = screen.querySelector(".eyebrow");
    return eb ? eb.textContent : "";
  }

  function openTools() {
    const name = currentScreenName();
    if (name === "Tools") return;
    returnTo = name === "Inspect" ? renderInspect
      : name === "Make an Offer" ? renderOffer
      : name === "Result" ? renderResult
      : renderCustomer;
    renderTools();
  }

  // ---------- BOOT ----------
  document.addEventListener("DOMContentLoaded", () => {
    setCoins(player.coins);
    $("toolsBtn").onclick = openTools;
    renderCustomer();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  });
})(window.PM = window.PM || {});
