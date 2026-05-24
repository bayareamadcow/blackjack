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
  sendAction("seat", { seat: Number(joinButton.dataset.joinSeat), bet: selectedBet });
});

dom.startHand.addEventListener("click", () => sendAction("start"));
dom.hit.addEventListener("click", () => sendAction("action", { action: "hit" }));
dom.stand.addEventListener("click", () => sendAction("action", { action: "stand" }));
dom.double.addEventListener("click", () => sendAction("action", { action: "double" }));
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
  polling = setInterval(() => sendAction("state", {}, { quiet: true }), 1300);
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
  dom.phasePill.textContent = formatPhase(table.phase);
  dom.tableMessage.textContent = table.message;
  dom.dealerTotal.textContent = table.dealer.total ?? "--";

  renderCards(dom.dealerCards, table.dealer.cards, `r${table.roundNumber}-dealer`);
  renderSeats(table);
  renderLeaderboard(state.leaderboard);
  renderButtons(table);
}

function renderSeats(table) {
  dom.seatGrid.replaceChildren();
  for (const seat of table.seats) {
    const card = document.createElement("article");
    card.className = [
      "seat-card",
      seat.playerId ? "" : "empty",
      seat.self ? "self" : "",
      seat.turn ? "turn" : "",
    ].filter(Boolean).join(" ");

    const avatarText = seat.name ? seat.name.slice(0, 1).toUpperCase() : seat.seat;
    card.innerHTML = `
      <div class="seat-header">
        <div class="avatar">${escapeHtml(avatarText)}</div>
        <div class="seat-name">
          <span>Seat ${seat.seat}</span>
          <h3>${escapeHtml(seat.name || "Open")}</h3>
        </div>
        <div class="seat-bet">${seat.playerId ? formatMoney(seat.bet) : formatMoney(selectedBet)}</div>
      </div>
      <div class="seat-total">${seat.total === null ? "--" : `Total ${seat.total}`}</div>
      <div class="seat-result">${formatSeatResult(seat)}</div>
      <div class="card-row" data-seat-cards="${seat.seat}"></div>
      <div class="seat-actions">
        <button class="join" data-join-seat="${seat.seat}" type="button">${seat.self ? "更新下注" : seat.playerId ? "已占用" : "坐这里"}</button>
      </div>
    `;
    const joinButton = card.querySelector("[data-join-seat]");
    joinButton.disabled = Boolean(seat.playerId && !seat.self) || !["waiting", "settled"].includes(table.phase);
    renderCards(card.querySelector("[data-seat-cards]"), seat.cards, `r${table.roundNumber}-s${seat.seat}`);
    dom.seatGrid.appendChild(card);
  }
}

function renderCards(host, cards, scope) {
  host.replaceChildren();
  cards.forEach((card, index) => {
    const id = `${scope}-${card.id}-${card.faceDown ? "down" : "up"}`;
    const node = buildCard(card);
    if (!seenCards.has(id)) {
      node.classList.add("dealt");
      node.style.animationDelay = `${index * 130}ms`;
      seenCards.add(id);
    }
    host.appendChild(node);
  });
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
  dom.startHand.disabled = !table.canStart || !["waiting", "settled"].includes(table.phase);
  dom.hit.disabled = !table.canAct;
  dom.stand.disabled = !table.canAct;
  dom.double.disabled = !table.canAct || !canDouble(mySeat, state.player.bankroll);
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
  [dom.startHand, dom.hit, dom.stand, dom.double, dom.leaveSeat, dom.reload].forEach((button) => {
    button.classList.toggle("busy", isBusy);
  });
}

function canDouble(seat, bankroll) {
  if (!seat || !seat.cards || seat.cards.length !== 2 || seat.resolved || seat.doubled) return false;
  if (bankroll < seat.bet) return false;
  const total = seat.total;
  return total === 9 || total === 10 || total === 11;
}

function formatSeatResult(seat) {
  if (!seat.playerId) return "选择筹码后坐下";
  if (seat.turn) return "轮到这个座位行动";
  if (seat.result) {
    const net = seat.settledNet ? ` · ${seat.settledNet > 0 ? "+" : ""}${formatMoney(seat.settledNet)}` : "";
    return `${seat.result}${net}`;
  }
  if (seat.active) return "本手进行中";
  return "等待发牌";
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
