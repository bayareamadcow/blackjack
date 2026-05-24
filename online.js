const API_BASE = "https://mad-cow-baccarat.0413zhouyang.workers.dev";
const PLAYER_ID_KEY = "madCowBaccaratPlayerId";
const PLAYER_NAME_KEY = "madCowBaccaratPlayerName";
const ROOM_KEY = "madCowCasinoRoom";
const DEFAULT_ROOM = new URLSearchParams(window.location.search).get("room") || localStorage.getItem(ROOM_KEY) || "mad-cow-580";

const dom = {
  playerName: document.querySelector("#player-name"),
  roomCode: document.querySelector("#room-code"),
  saveProfile: document.querySelector("#save-profile"),
  bankroll: document.querySelector("#bankroll"),
  score: document.querySelector("#score"),
  reloads: document.querySelector("#reloads"),
  shoe: document.querySelector("#shoe"),
  cardsLeft: document.querySelector("#cards-left"),
  dealerTotal: document.querySelector("#dealer-total"),
  dealerCards: document.querySelector("#dealer-cards"),
  phasePill: document.querySelector("#phase-pill"),
  tableMessage: document.querySelector("#table-message"),
  seatGrid: document.querySelector("#seat-grid"),
  startHand: document.querySelector("#start-hand"),
  hit: document.querySelector("#hit"),
  stand: document.querySelector("#stand"),
  double: document.querySelector("#double"),
  split: document.querySelector("#split"),
  leaveSeat: document.querySelector("#leave-seat"),
  reload: document.querySelector("#reload"),
  chipRow: document.querySelector(".chip-row"),
  leaderboard: document.querySelector("#leaderboard"),
  nameGate: document.querySelector("#name-gate"),
  gateName: document.querySelector("#gate-name"),
  gateEnter: document.querySelector("#gate-enter"),
};

let playerId = loadPlayerId();
let playerName = localStorage.getItem(PLAYER_NAME_KEY) || "";
let room = DEFAULT_ROOM;
let selectedBet = 25;
let state = null;
let seenCards = new Set();
let polling = null;
let busy = false;
let lastBankroll = null;

dom.playerName.value = playerName;
dom.roomCode.value = room;

if (!playerName) {
  dom.nameGate.hidden = false;
  dom.gateName.focus();
} else {
  refreshNow();
}

dom.saveProfile.addEventListener("click", () => {
  saveIdentity(dom.playerName.value, dom.roomCode.value);
});

dom.gateEnter.addEventListener("click", () => {
  saveIdentity(dom.gateName.value, dom.roomCode.value || room);
});

dom.gateName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") saveIdentity(dom.gateName.value, room);
});

dom.roomCode.addEventListener("keydown", (event) => {
  if (event.key === "Enter") saveIdentity(dom.playerName.value, dom.roomCode.value);
});

dom.chipRow.addEventListener("click", (event) => {
  const button = event.target.closest("[data-bet]");
  if (!button) return;
  selectedBet = Number(button.dataset.bet);
  dom.chipRow.querySelectorAll(".chip").forEach((chip) => chip.classList.toggle("selected", chip === button));
});

dom.seatGrid.addEventListener("click", (event) => {
  const joinButton = event.target.closest("[data-join-seat]");
  if (!joinButton) return;
  sendAction("seat", { seat: Number(joinButton.dataset.joinSeat), bet: selectedBet, mode: "add" });
});

dom.startHand.addEventListener("click", () => sendAction("start"));
dom.hit.addEventListener("click", () => sendAction("action", { action: "hit" }));
dom.stand.addEventListener("click", () => sendAction("action", { action: "stand" }));
dom.double.addEventListener("click", () => sendAction("action", { action: "double" }));
dom.split.addEventListener("click", () => sendAction("action", { action: "split" }));
dom.leaveSeat.addEventListener("click", () => sendAction("leave"));
dom.reload.addEventListener("click", () => sendAction("reload"));

function saveIdentity(nextName, nextRoom) {
  const cleanName = String(nextName || "").trim().slice(0, 16);
  const cleanRoom = sanitizeRoom(nextRoom || "mad-cow-580");
  if (!cleanName) {
    dom.gateName.focus();
    return;
  }
  playerName = cleanName;
  room = cleanRoom;
  localStorage.setItem(PLAYER_NAME_KEY, playerName);
  localStorage.setItem(ROOM_KEY, room);
  dom.playerName.value = playerName;
  dom.roomCode.value = room;
  dom.nameGate.hidden = true;
  refreshNow();
}

async function refreshNow() {
  clearInterval(polling);
  await sendAction("state", {}, { quiet: true });
  polling = setInterval(() => sendAction("state", {}, { quiet: true }), 1000);
}

async function sendAction(endpoint, payload = {}, options = {}) {
  if (!playerName || busy) return;
  busy = true;
  setButtonsBusy(true);
  try {
    const response = await fetch(`${API_BASE}/api/blackjack/${endpoint}?room=${encodeURIComponent(room)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId,
        name: playerName,
        ...payload,
      }),
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error || "Request failed.");
    state = data;
    render();
  } catch (error) {
    if (!options.quiet) {
      dom.tableMessage.textContent = error.message;
    }
  } finally {
    busy = false;
    setButtonsBusy(false);
  }
}

function render() {
  if (!state) return;
  const table = state.blackjack;
  const player = state.player;
  const score = player.bankroll - 5000 * (player.reloadCount + 1);

  dom.bankroll.textContent = formatMoney(player.bankroll);
  dom.score.textContent = formatMoney(score);
  dom.reloads.textContent = player.reloadCount;
  dom.shoe.textContent = table.shoeNumber;
  dom.cardsLeft.textContent = table.cardsRemaining;
  dom.phasePill.textContent = formatPhaseLabel(table);
  dom.phasePill.classList.toggle("countdown-hot", table.phase === "player-turn" && table.secondsRemaining <= 5);
  dom.tableMessage.textContent = table.message;
  dom.dealerTotal.textContent = table.dealer.total ?? "--";

  renderCards(dom.dealerCards, table.dealer.cards, `r${table.roundNumber}-dealer`);
  renderSeats(table);
  renderLeaderboard(state.leaderboard);
  renderButtons(table);
  renderBankrollFeedback(player.bankroll);
}

function renderSeats(table) {
  dom.seatGrid.replaceChildren();
  for (const seat of table.seats) {
    const card = document.createElement("article");
    const actionLabel = getSeatActionLabel(seat);
    const hands = seat.hands?.length ? seat.hands : [{
      handIndex: 0,
      bet: seat.bet,
      cards: seat.cards || [],
      total: seat.total,
      result: seat.result,
      settledNet: seat.settledNet,
      turn: seat.turn,
    }];
    card.className = [
      "seat-card",
      seat.playerId ? "" : "empty",
      seat.self ? "self" : "",
      seat.turn ? "turn" : "",
      seat.settledNet > 0 ? "won" : "",
      seat.settledNet < 0 ? "lost" : "",
    ].filter(Boolean).join(" ");

    const avatarText = seat.name ? seat.name.slice(0, 1).toUpperCase() : seat.seat;
    card.innerHTML = `
      <div class="seat-header">
        <div class="avatar">${escapeHtml(avatarText)}</div>
        <div class="seat-name">
          <span>Seat ${seat.seat}</span>
          <h3>${escapeHtml(seat.name || "Open")}</h3>
        </div>
        <div class="seat-bet">${seat.playerId ? formatMoney(seat.totalBet ?? seat.bet) : `+${formatMoney(selectedBet)}`}</div>
      </div>
      <div class="seat-total">${seat.total === null ? "--" : `Total ${seat.total}`}${seat.hands?.length > 1 ? ` · ${seat.hands.length} hands` : ""}</div>
      <div class="seat-result">${formatSeatResult(seat)}</div>
      <div class="seat-hands">
        ${hands.map((hand) => `
          <div class="seat-hand ${hand.turn ? "turn" : ""} ${hand.outcome || ""}" data-hand="${hand.handIndex}">
            <div class="hand-meta">
              <span>Hand ${hand.handIndex + 1}</span>
              <strong>${formatMoney(hand.bet || seat.bet)}</strong>
              <em>${hand.total === null || hand.total === undefined ? "--" : hand.total}</em>
            </div>
            <div class="hand-status">${formatHandStatus(hand)}</div>
            <div class="card-row compact" data-seat-cards="${seat.seat}" data-hand-cards="${hand.handIndex}"></div>
          </div>
        `).join("")}
      </div>
      <div class="seat-actions">
        <button class="join" data-join-seat="${seat.seat}" type="button">${actionLabel}</button>
      </div>
    `;
    const joinButton = card.querySelector("[data-join-seat]");
    joinButton.disabled = Boolean(seat.playerId && !seat.self) || !["waiting", "settled"].includes(table.phase) || (seat.self && seat.bet >= 500);
    for (const hand of hands) {
      renderCards(
        card.querySelector(`[data-hand-cards="${hand.handIndex}"]`),
        hand.cards || [],
        `r${table.roundNumber}-s${seat.seat}-h${hand.handIndex}`,
      );
    }
    dom.seatGrid.appendChild(card);
  }
}

function getSeatActionLabel(seat) {
  if (seat.self) {
    return seat.bet >= 500 ? "Max $500" : `Add +${formatMoney(selectedBet)}`;
  }
  if (seat.playerId) return "Taken";
  return `Sit +${formatMoney(selectedBet)}`;
}

function renderCards(host, cards, scope) {
  if (!host) return;
  host.replaceChildren();
  cards.forEach((card, index) => {
    const id = `${scope}-${card.id}-${card.faceDown ? "down" : "up"}`;
    const node = buildCard(card);
    if (!seenCards.has(id)) {
      node.classList.add("dealt");
      node.style.animationDelay = `${getCardDelay(scope, card, index)}ms`;
      seenCards.add(id);
    }
    host.appendChild(node);
  });
}

function getCardDelay(scope, card, index) {
  if (scope.includes("dealer") && !card.faceDown) {
    if (index === 1) return 2000;
    if (index >= 2) return 2000 + (index - 1) * 1000;
  }
  return index * 260;
}

function buildCard(card) {
  const node = document.createElement("div");
  if (card.faceDown) {
    node.className = "card back";
    node.textContent = "YANG'S BLACKJACK";
    return node;
  }
  node.className = `card ${card.red ? "red" : "black"}`;
  node.innerHTML = `
    <span class="rank-top">${escapeHtml(card.rank)}<small>${card.symbol}</small></span>
    <span class="suit-center">${card.symbol}</span>
    <span class="rank-bottom">${escapeHtml(card.rank)}<small>${card.symbol}</small></span>
  `;
  return node;
}

function renderButtons(table) {
  const mySeat = table.seats.find((seat) => seat.self);
  const activeHand = mySeat?.hands?.find((hand) => hand.turn) || null;
  dom.startHand.disabled = !table.canStart || !["waiting", "settled"].includes(table.phase);
  dom.hit.disabled = !table.canAct;
  dom.stand.disabled = !table.canAct;
  dom.double.disabled = !table.canAct || !(activeHand?.canDouble ?? table.canDouble);
  dom.split.disabled = !table.canAct || !(activeHand?.canSplit ?? table.canSplit);
  dom.leaveSeat.disabled = !mySeat || !["waiting", "settled"].includes(table.phase);
  dom.reload.disabled = !["waiting", "settled"].includes(table.phase);
}

function renderLeaderboard(rows) {
  dom.leaderboard.replaceChildren();
  for (const row of rows || []) {
    const item = document.createElement("li");
    item.className = row.self ? "self" : "";
    item.innerHTML = `
      <span class="rank">${row.rank}</span>
      <div>
        <b>${escapeHtml(row.name)}</b>
        <span>${row.hands} hands · ${row.reloads} reload</span>
      </div>
      <strong class="score">${formatMoney(row.score)}</strong>
    `;
    dom.leaderboard.appendChild(item);
  }
}

function setButtonsBusy(isBusy) {
  [dom.startHand, dom.hit, dom.stand, dom.double, dom.split, dom.leaveSeat, dom.reload].forEach((button) => {
    button.classList.toggle("busy", isBusy);
  });
}

function formatSeatResult(seat) {
  if (!seat.playerId) return "Pick one chip, then sit.";
  const activeHand = seat.hands?.find((hand) => hand.turn);
  if (activeHand) return `Action on hand ${activeHand.handIndex + 1}.`;
  if (seat.result) {
    const net = seat.settledNet ? ` · ${seat.settledNet > 0 ? "+" : ""}${formatMoney(seat.settledNet)}` : "";
    return `${seat.result}${net}`;
  }
  if (seat.self && ["waiting", "settled"].includes(state?.blackjack?.phase)) {
    return "Tap chips to add. Max $500.";
  }
  if (seat.active) return "本手进行中";
  return "等待发牌";
}

function formatHandStatus(hand) {
  const net = hand.settledNet ? ` ${hand.settledNet > 0 ? "+" : ""}${formatMoney(hand.settledNet)}` : "";
  if (hand.result) return `${hand.result}${net}`;
  if (hand.turn) return "Your action";
  if (hand.splitAceHand) return "Split ace: one card only";
  return hand.cards?.length ? "In progress" : "Waiting";
}

function renderBankrollFeedback(bankroll) {
  if (lastBankroll === null) {
    lastBankroll = bankroll;
    return;
  }
  const delta = bankroll - lastBankroll;
  lastBankroll = bankroll;
  if (!delta || state?.blackjack?.phase !== "settled") return;
  const toast = document.createElement("div");
  toast.className = `payout-toast ${delta > 0 ? "win" : "lose"}`;
  toast.textContent = delta > 0 ? `Dealer pays ${formatMoney(delta)}` : `Dealer collects ${formatMoney(Math.abs(delta))}`;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 1800);
}

function formatPhase(phase) {
  const labels = {
    waiting: "Waiting",
    dealing: "Dealing",
    "player-turn": "Action",
    "dealer-turn": "Dealer",
    settled: "Settled",
  };
  return labels[phase] || phase;
}

function formatPhaseLabel(table) {
  if (table.phase === "player-turn" && Number.isFinite(table.secondsRemaining)) {
    return `${formatPhase(table.phase)} ${table.secondsRemaining}s`;
  }
  return formatPhase(table.phase);
}

function formatMoney(amount) {
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${Math.abs(Math.round(amount)).toLocaleString("en-US")}`;
}

function loadPlayerId() {
  const existing = localStorage.getItem(PLAYER_ID_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(PLAYER_ID_KEY, next);
  return next;
}

function sanitizeRoom(value) {
  return String(value || "mad-cow-580").toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 32) || "mad-cow-580";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}
