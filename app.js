const MIN_BET = 25;
const MAX_BET = 500;
const BET_STEP = 25;
const DECK_COUNT = 2;
const CARDS_PER_DECK = 52;
const CUT_CARD_REMAINING = 15;
const MAX_TOTAL_HANDS = 5;
const STARTING_BANKROLL = 5000;
const LOG_LIMIT = 10;
const STORAGE_LANGUAGE_KEY = "doubleDeckTrainerLanguage";
const STORAGE_SEAT_CONFIG_KEY = "doubleDeckTrainerSeatConfig";
const QUICK_BETS = [25, 50, 100, 200, 500];

const SUITS = [
  { code: "H", red: true },
  { code: "D", red: true },
  { code: "C", red: false },
  { code: "S", red: false },
];

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const CARD_VALUES = {
  A: 11,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 10,
  Q: 10,
  K: 10,
};

const HI_LO_VALUES = {
  A: -1,
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "7": 0,
  "8": 0,
  "9": 0,
  "10": -1,
  J: -1,
  Q: -1,
  K: -1,
};

const SHORTCUTS = [
  { key: "N", actionKey: "shortcutActions.deal" },
  { key: "H", actionKey: "shortcutActions.hit" },
  { key: "S", actionKey: "shortcutActions.stand" },
  { key: "D", actionKey: "shortcutActions.double" },
  { key: "P", actionKey: "shortcutActions.split" },
  { key: "C", actionKey: "shortcutActions.toggleCount" },
];

const COPY = {
  zh: {
    meta: {
      title: "Thunder Valley 风格双副牌 21 点训练台",
      htmlLang: "zh-CN",
    },
    hero: {
      eyebrow: "Double Deck Blackjack Trainer",
      title: "Thunder Valley 风格台面练习",
      text: "更接近赌场俯视桌面的双副牌 21 点练习台，支持 1 到 5 个位置独立下注、Hi-Lo 算牌和中英文切换。",
    },
    buttons: {
      newShoe: "新 Shoe",
      showCount: "显示计数",
      hideCount: "隐藏计数",
      deal: "发牌",
      hit: "要牌",
      stand: "停牌",
      double: "Double",
      split: "Split",
    },
    sections: {
      finance: "资金和局况",
      wager: "位置与注码",
      openingHands: "本局位置",
      count: "算牌面板",
      rules: "当前规则",
      shortcuts: "快捷键",
      logs: "牌桌记录",
      sources: "规则来源",
      dealer: "庄家",
    },
    pills: {
      tableLimit: "台面限红 $25 - $500",
      wager: "每个位置独立下注",
      openingHands: "最多 5 手",
      count: "Hi-Lo",
      rules: "Thunder Valley 风格 + 自定义",
      shortcuts: "快速操作",
      logs: "最近 10 条",
      sources: "2026-05-22 查证",
    },
    stats: {
      bankroll: "Bankroll",
      bet: "本局总押注",
      round: "第几局",
      shoe: "第几个 Shoe",
      betInput: "位置注码",
      openingBet: "已选位置",
      tableExposure: "本局总押注",
      runningCount: "Running Count",
      trueCount: "True Count",
      cardsLeft: "牌靴剩余",
      cardsSeen: "已发出",
    },
    accessibility: {
      quickBets: "位置快速下注",
      seatWagers: "位置下注设定",
      roundControls: "牌局操作",
      languageSwitch: "语言切换",
      cutMarker: "cut card 约在剩余 15 张",
    },
    table: {
      banner: "BLACKJACK 赔 3 : 2",
      subbanner: "庄家 soft 17 必须要牌 · 仅 9 / 10 / 11 可 Double",
      footnote: "位置 1-5 可单独开关和下注 · 普通对子总手数上限 5 · A 只可分一次",
      seat: "位置 {index}",
      emptyActive: "本局参与",
      emptyIdle: "空位置",
      down: "盖牌",
    },
    rules: {
      items: [
        "双副牌，庄家 soft 17 必须继续要牌。",
        "只允许在前两张合计 9 / 10 / 11 时 double。",
        "A,A 只能 split 一次，分完后每手只补一张并自动停牌。",
        "位置 1-5 可以单独选择玩或不玩，每个位置可单独设置 $25 到 $500 注码。",
        "总手数上限为 5，所以开局位置和 split 后的总手数不能超过 5。",
        "剩余约 15 张牌时，当前局打完后进入下一个 shoe。",
        "前两张牌就是 21 点时，该手自动结束；赢下该手按 3:2 奖励。",
      ],
    },
    shortcutActions: {
      deal: "发牌",
      hit: "要牌",
      stand: "停牌",
      double: "Double",
      split: "Split",
      toggleCount: "显示 / 隐藏计数",
    },
    sources: {
      bodyHtml: "公开规则主要参考 Thunder Valley 官方的 <a href=\"https://thundervalleyresort.com/casino/table-games/blackjack\" target=\"_blank\" rel=\"noreferrer\">Blackjack 页面</a> 和 <a href=\"https://www.thundervalleyresort.com/getmedia/blackjack-how-to-play-pdf\" target=\"_blank\" rel=\"noreferrer\">How To Play PDF</a>。位置 1-5 独立开关和下注属于这张训练台的自定义练习设置。",
    },
    common: {
      hidden: "隐藏中",
      dealerTotalUnknown: "总点数: ?",
      dealerUpcard: "明牌: {total}",
      dealerTotal: "总点数: {total}",
      countDecksRemaining: "剩余约 {decks} decks。",
      countShuffleNext: "切牌位已到，下一局自动换 shoe。",
      cutCardLabel: "cut card: {count} 张",
      noLogs: "还没有牌桌记录。",
      handNumber: "手牌 {index}",
      statusPrefix: "状态: {state}",
      totalPrefix: "点数: {total}{soft}",
      softSuffix: " (soft)",
      waitingSecondCard: "等待补第二张",
      inProgress: "进行中",
      waitingDeal: "等待发牌",
      waitingBet: "准备中",
      notPlaying: "不玩",
      push: "Push",
      seatSelected: "本局玩",
      seatInactive: "本局不玩",
      spotPlaceholder: "手牌",
      activeSeatList: "位置 {seats}",
      noActiveSeats: "还没选位置",
      seatControlTitle: "位置 {index}",
      seatToggleOn: "玩",
      seatToggleOff: "不玩",
      seatBetLabel: "下注",
      seatSetupNote: "每个位置都可以单独开关和下注；点筹码会自动启用该位置。",
      autoShuffleNote: "。下局自动换 shoe。",
      noAutoShuffleNote: "。",
    },
    status: {
      ready: "练习台已就绪，新 shoe 洗好了。",
      adjustBet: "选择要玩的座位并设好各位置注码后，按“发牌”开始。",
      bankrollLow: "Bankroll 不够覆盖这一局的总押注，先降注或减少位置。",
      noSeats: "至少要选择一个位置才可以发牌。",
      autoNewShoe: "切牌位到了，自动进入下一个 shoe。",
      manualNewShoeActive: "当前局已取消，手动换了一个新 shoe。",
      manualNewShoeIdle: "手动换了一个新 shoe。",
      currentHandTurn: "轮到第 {hand} 手牌。",
      currentHandContinue: "第 {hand} 手牌继续行动。",
      dealerBlackjack: "庄家是 blackjack。",
      openingTwentyOne: "前两张 21 点已自动停牌并等待 3:2 结算。",
      dealerSkips: "你的手都爆掉了，庄家不用补牌。",
      dealerDone: "庄家行动结束。",
      roundSummary: "{reason} 本局结果：赢 {wins}，输 {losses}，Push {pushes}{shuffleNote}",
    },
    logs: {
      shoeReady: "第 {shoe} 个 shoe 已洗好，running count 归零。",
      roundStart: "第 {round} 局开始，位置 {seats}，总押注 {total}。",
      handBust: "第 {hand} 手牌爆牌。",
      handAutoStand21: "第 {hand} 手牌到 21，自动停牌。",
      handStand: "第 {hand} 手牌选择停牌。",
      handDouble: "第 {hand} 手牌 double 到 {bet}。",
      splitAces: "A,A 已分牌，各补一张后自动停牌。",
      splitDone: "第 {hand} 手牌已 split。",
      secondCardDealt: "第 {hand} 手牌补到第二张牌。",
      roundEnd: "本局结束：赢 {wins} / 输 {losses} / Push {pushes}。",
      shoeEmpty: "牌靴被抽空了，已自动重洗。",
      cancelledRefund: "当前局已取消，退回桌上筹码 {refund}。",
    },
    results: {
      bust: "爆牌",
      auto21: "21 自动停牌",
      stand: "停牌",
      doubleBust: "Double 后爆牌",
      doubleDone: "Double 完成",
      splitAcesAuto: "分 A 自动停牌",
      win: "赢 {amount}",
      blackjackWin: "Blackjack 赢 {amount}",
      push: "Push",
      dealerBlackjack: "庄家 blackjack",
      lose: "输",
    },
    tags: {
      split: "已分牌",
      splitAces: "分 A",
      doubled: "Double",
      active: "当前手",
      blackjackStyle21: "Blackjack 3:2",
      bust: "爆牌",
      push: "Push",
      win: "赢",
    },
  },
  en: {
    meta: {
      title: "Thunder Valley Style Double Deck Blackjack Trainer",
      htmlLang: "en",
    },
    hero: {
      eyebrow: "Double Deck Blackjack Trainer",
      title: "Thunder Valley Style Table Trainer",
      text: "A top-down casino-table practice layout with 1 to 5 independently wagered seats, Hi-Lo counting, and a bilingual UI.",
    },
    buttons: {
      newShoe: "New Shoe",
      showCount: "Show Count",
      hideCount: "Hide Count",
      deal: "Deal",
      hit: "Hit",
      stand: "Stand",
      double: "Double",
      split: "Split",
    },
    sections: {
      finance: "Bankroll and Round",
      wager: "Seats and Bets",
      openingHands: "Round Seats",
      count: "Count Panel",
      rules: "Current Rules",
      shortcuts: "Hotkeys",
      logs: "Table Log",
      sources: "Rules Sources",
      dealer: "Dealer",
    },
    pills: {
      tableLimit: "Table limits $25 - $500",
      wager: "Individual seat bets",
      openingHands: "Max 5 hands",
      count: "Hi-Lo",
      rules: "Thunder Valley Style + Custom",
      shortcuts: "Quick Play",
      logs: "Last 10 entries",
      sources: "Verified on May 22, 2026",
    },
    stats: {
      bankroll: "Bankroll",
      bet: "Round Action",
      round: "Round",
      shoe: "Shoe",
      betInput: "Seat Bet",
      openingBet: "Active Seats",
      tableExposure: "Total Table Action",
      runningCount: "Running Count",
      trueCount: "True Count",
      cardsLeft: "Cards Left",
      cardsSeen: "Cards Dealt",
    },
    accessibility: {
      quickBets: "Seat quick bets",
      seatWagers: "Seat wager setup",
      roundControls: "Round controls",
      languageSwitch: "Language switch",
      cutMarker: "cut card with about 15 cards remaining",
    },
    table: {
      banner: "BLACKJACK PAYS 3 TO 2",
      subbanner: "Dealer hits soft 17 · Double only on 9 / 10 / 11",
      footnote: "Seats 1-5 can be toggled and wagered separately · Max total hands 5 · Aces may be split once",
      seat: "Seat {index}",
      emptyActive: "Playing this round",
      emptyIdle: "Empty spot",
      down: "DOWN",
    },
    rules: {
      items: [
        "Two decks, and the dealer must hit soft 17.",
        "Double is allowed only on the first two cards totaling 9, 10, or 11.",
        "A,A may be split only once, and each split ace hand receives one card then auto-stands.",
        "Seats 1-5 can be played or skipped independently, and each seat can bet $25 to $500.",
        "The total hand cap is 5, so opening seats plus split hands cannot exceed 5 total hands.",
        "When about 15 cards remain, the next round starts a new shoe.",
        "When the player's first two cards total 21, that hand immediately stands and wins at 3:2 if it beats the dealer.",
      ],
    },
    shortcutActions: {
      deal: "Deal",
      hit: "Hit",
      stand: "Stand",
      double: "Double",
      split: "Split",
      toggleCount: "Show / hide count",
    },
    sources: {
      bodyHtml: "The public rules reference the official Thunder Valley <a href=\"https://thundervalleyresort.com/casino/table-games/blackjack\" target=\"_blank\" rel=\"noreferrer\">Blackjack page</a> and <a href=\"https://www.thundervalleyresort.com/getmedia/blackjack-how-to-play-pdf\" target=\"_blank\" rel=\"noreferrer\">How To Play PDF</a>. Independent seat toggles and wagers for seats 1-5 are custom practice settings for this trainer.",
    },
    common: {
      hidden: "Hidden",
      dealerTotalUnknown: "Total: ?",
      dealerUpcard: "Upcard: {total}",
      dealerTotal: "Total: {total}",
      countDecksRemaining: "About {decks} decks remain.",
      countShuffleNext: "The cut card has been reached. The next round will use a new shoe.",
      cutCardLabel: "cut card: {count} cards",
      noLogs: "No table log entries yet.",
      handNumber: "Hand {index}",
      statusPrefix: "State: {state}",
      totalPrefix: "Total: {total}{soft}",
      softSuffix: " (soft)",
      waitingSecondCard: "Waiting for second card",
      inProgress: "In progress",
      waitingDeal: "Waiting for the deal",
      waitingBet: "Ready",
      notPlaying: "Not playing",
      push: "Push",
      seatSelected: "Playing",
      seatInactive: "Not playing",
      spotPlaceholder: "Cards",
      activeSeatList: "Seats {seats}",
      noActiveSeats: "No seats selected",
      seatControlTitle: "Seat {index}",
      seatToggleOn: "Play",
      seatToggleOff: "Skip",
      seatBetLabel: "Bet",
      seatSetupNote: "Toggle each seat and set its own bet. Tapping a chip turns that seat on.",
      autoShuffleNote: ". The next round will auto-shuffle.",
      noAutoShuffleNote: ".",
    },
    status: {
      ready: "The trainer is ready and a fresh shoe has been shuffled.",
      adjustBet: "Choose the seats you want to play, set each wager, then press Deal.",
      bankrollLow: "Your bankroll does not cover the total table action for this round. Lower a bet or play fewer seats.",
      noSeats: "Select at least one seat before dealing.",
      autoNewShoe: "The cut card was reached, so a new shoe is now in play.",
      manualNewShoeActive: "The current round was cancelled and a new shoe was loaded.",
      manualNewShoeIdle: "A new shoe was loaded.",
      currentHandTurn: "Hand {hand} is active.",
      currentHandContinue: "Hand {hand} can keep acting.",
      dealerBlackjack: "The dealer has blackjack.",
      openingTwentyOne: "A first-two-card 21 has auto-stood for 3:2 settlement.",
      dealerSkips: "All of your hands busted, so the dealer does not draw.",
      dealerDone: "The dealer has finished acting.",
      roundSummary: "{reason} Round result: {wins} win, {losses} loss, {pushes} push{shuffleNote}",
    },
    logs: {
      shoeReady: "Shoe {shoe} was shuffled and the running count reset.",
      roundStart: "Round {round} started on seats {seats} with {total} in action.",
      handBust: "Hand {hand} busted.",
      handAutoStand21: "Hand {hand} reached 21 and auto-stood.",
      handStand: "Hand {hand} stood.",
      handDouble: "Hand {hand} doubled to {bet}.",
      splitAces: "A,A was split, one card was dealt to each hand, and both hands auto-stood.",
      splitDone: "Hand {hand} was split.",
      secondCardDealt: "Hand {hand} received its second card.",
      roundEnd: "Round settled: {wins} win / {losses} loss / {pushes} push.",
      shoeEmpty: "The shoe ran out of cards and was automatically reshuffled.",
      cancelledRefund: "The round was cancelled and {refund} was returned to the bankroll.",
    },
    results: {
      bust: "Bust",
      auto21: "21 auto-stand",
      stand: "Stand",
      doubleBust: "Busted after doubling",
      doubleDone: "Double complete",
      splitAcesAuto: "Split aces auto-stand",
      win: "Won {amount}",
      blackjackWin: "Blackjack won {amount}",
      push: "Push",
      dealerBlackjack: "Dealer blackjack",
      lose: "Lost",
    },
    tags: {
      split: "Split",
      splitAces: "Split Aces",
      doubled: "Double",
      active: "Active",
      blackjackStyle21: "Blackjack 3:2",
      bust: "Bust",
      push: "Push",
      win: "Win",
    },
  },
};

const dom = {
  heroEyebrow: document.querySelector("#hero-eyebrow"),
  heroTitle: document.querySelector("#hero-title"),
  heroText: document.querySelector("#hero-text"),
  financeHeading: document.querySelector("#finance-heading"),
  tableLimitPill: document.querySelector("#table-limit-pill"),
  wagerHeading: document.querySelector("#wager-heading"),
  betModePill: document.querySelector("#bet-mode-pill"),
  openingHandsHeading: document.querySelector("#opening-hands-heading"),
  openingHandsPill: document.querySelector("#opening-hands-pill"),
  countHeading: document.querySelector("#count-heading"),
  countPill: document.querySelector("#count-pill"),
  rulesHeading: document.querySelector("#rules-heading"),
  rulesPill: document.querySelector("#rules-pill"),
  shortcutsHeading: document.querySelector("#shortcuts-heading"),
  shortcutsPill: document.querySelector("#shortcuts-pill"),
  logHeading: document.querySelector("#log-heading"),
  logPill: document.querySelector("#log-pill"),
  sourcesHeading: document.querySelector("#sources-heading"),
  sourcesPill: document.querySelector("#sources-pill"),
  sourcesText: document.querySelector("#sources-text"),
  bankrollLabel: document.querySelector("#bankroll-label"),
  betStatLabel: document.querySelector("#bet-stat-label"),
  roundStatLabel: document.querySelector("#round-stat-label"),
  shoeStatLabel: document.querySelector("#shoe-stat-label"),
  seatSetupNote: document.querySelector("#seat-setup-note"),
  seatBetGrid: document.querySelector("#seat-bet-grid"),
  openingBetLabel: document.querySelector("#opening-bet-label"),
  tableExposureLabel: document.querySelector("#table-exposure-label"),
  runningCountLabel: document.querySelector("#running-count-label"),
  trueCountLabel: document.querySelector("#true-count-label"),
  cardsLeftLabel: document.querySelector("#cards-left-label"),
  cardsSeenLabel: document.querySelector("#cards-seen-label"),
  dealerSeatLabel: document.querySelector("#dealer-seat-label"),
  dealerHeading: document.querySelector("#dealer-heading"),
  dealerTotal: document.querySelector("#dealer-total"),
  dealerCards: document.querySelector("#dealer-cards"),
  tableBanner: document.querySelector("#table-banner"),
  tableSubbanner: document.querySelector("#table-subbanner"),
  tableFootnote: document.querySelector("#table-footnote"),
  playerSpots: document.querySelector("#player-spots"),
  tableStatus: document.querySelector("#table-status"),
  bankrollValue: document.querySelector("#bankroll-value"),
  betValue: document.querySelector("#bet-value"),
  roundValue: document.querySelector("#round-value"),
  shoeValue: document.querySelector("#shoe-value"),
  openingBetValue: document.querySelector("#opening-bet-value"),
  tableExposureValue: document.querySelector("#table-exposure-value"),
  runningCount: document.querySelector("#running-count"),
  trueCount: document.querySelector("#true-count"),
  cardsLeft: document.querySelector("#cards-left"),
  cardsSeen: document.querySelector("#cards-seen"),
  shoeFill: document.querySelector("#shoe-fill"),
  shoeStatus: document.querySelector("#shoe-status"),
  shuffleFlag: document.querySelector("#shuffle-flag"),
  cutMarker: document.querySelector("#cut-marker"),
  controls: document.querySelector("#controls"),
  dealButton: document.querySelector("#deal-btn"),
  hitButton: document.querySelector("#hit-btn"),
  standButton: document.querySelector("#stand-btn"),
  doubleButton: document.querySelector("#double-btn"),
  splitButton: document.querySelector("#split-btn"),
  newShoeButton: document.querySelector("#new-shoe-btn"),
  toggleCountButton: document.querySelector("#toggle-count-btn"),
  ruleList: document.querySelector("#rule-list"),
  shortcutList: document.querySelector("#shortcut-list"),
  logList: document.querySelector("#log-list"),
  langButtons: [...document.querySelectorAll(".lang-button")],
};

const state = {
  bankroll: STARTING_BANKROLL,
  seats: loadStoredSeats(),
  roundNumber: 0,
  shoeNumber: 0,
  runningCount: 0,
  visibleCardsSeen: 0,
  countVisible: false,
  shufflePending: false,
  message: desc("status.adjustBet"),
  shoe: [],
  round: null,
  log: [],
  nextHandId: 1,
  language: loadStoredLanguage(),
};

function init() {
  bindEvents();
  buildNewShoe(desc("status.ready"));
  render();
}

function bindEvents() {
  dom.seatBetGrid.addEventListener("click", onSeatGridClick);
  dom.seatBetGrid.addEventListener("input", onSeatBetInput);
  dom.seatBetGrid.addEventListener("change", onSeatBetChange);
  dom.dealButton.addEventListener("click", startRound);
  dom.hitButton.addEventListener("click", hitHand);
  dom.standButton.addEventListener("click", standHand);
  dom.doubleButton.addEventListener("click", doubleHand);
  dom.splitButton.addEventListener("click", splitHand);
  dom.newShoeButton.addEventListener("click", onManualNewShoe);
  dom.toggleCountButton.addEventListener("click", toggleCount);

  dom.langButtons.forEach((button) => {
    button.addEventListener("click", () => switchLanguage(button.dataset.lang));
  });

  document.addEventListener("keydown", onKeydown);
}

function onKeydown(event) {
  if (event.target.tagName === "INPUT") {
    return;
  }

  const key = event.key.toLowerCase();

  if (key === "n") {
    startRound();
  } else if (key === "h") {
    hitHand();
  } else if (key === "s") {
    standHand();
  } else if (key === "d") {
    doubleHand();
  } else if (key === "p") {
    splitHand();
  } else if (key === "c") {
    toggleCount();
  }
}

function switchLanguage(nextLanguage) {
  if (!COPY[nextLanguage] || state.language === nextLanguage) {
    return;
  }

  state.language = nextLanguage;
  storeLanguage(nextLanguage);
  render();
}

function onSeatGridClick(event) {
  const toggle = event.target.closest("[data-seat-toggle]");
  if (toggle) {
    toggleSeat(Number(toggle.dataset.seatToggle));
    return;
  }

  const chip = event.target.closest("[data-seat-chip]");
  if (chip) {
    setSeatBet(Number(chip.dataset.seatIndex), Number(chip.dataset.bet), true);
  }
}

function onSeatBetInput(event) {
  if (!event.target.matches(".seat-bet-input")) {
    return;
  }

  const seatIndex = Number(event.target.dataset.seatIndex);
  const rawValue = Number(event.target.value);
  if (isValidBet(rawValue)) {
    setSeatBet(seatIndex, rawValue, false);
    renderHeaderStats();
    renderPlayerSpots();
    renderControls();
  }
}

function onSeatBetChange(event) {
  if (!event.target.matches(".seat-bet-input")) {
    return;
  }

  setSeatBet(Number(event.target.dataset.seatIndex), Number(event.target.value), true);
}

function toggleSeat(seatIndex) {
  if (isRoundActive()) {
    return;
  }

  const seat = state.seats[seatIndex];
  if (!seat) {
    return;
  }

  if (seat.enabled && getActiveSeats().length === 1) {
    state.message = desc("status.noSeats");
    render();
    return;
  }

  seat.enabled = !seat.enabled;
  state.message = desc("status.adjustBet");
  storeSeats();
  render();
}

function setSeatBet(seatIndex, nextValue, rerender = true) {
  if (isRoundActive()) {
    return;
  }

  const seat = state.seats[seatIndex];
  if (!seat) {
    return;
  }

  seat.bet = normalizeBet(nextValue, seat.bet);
  seat.enabled = true;
  state.message = desc("status.adjustBet");
  storeSeats();

  if (rerender) {
    render();
  }
}

function onManualNewShoe() {
  const hadActiveRound = isRoundActive();
  if (hadActiveRound) {
    refundCancelledRound();
  }
  buildNewShoe(hadActiveRound ? desc("status.manualNewShoeActive") : desc("status.manualNewShoeIdle"));
}

function buildNewShoe(message) {
  state.shoe = shuffle(createShoe());
  state.runningCount = 0;
  state.visibleCardsSeen = 0;
  state.shufflePending = false;
  state.round = null;
  state.shoeNumber += 1;
  state.message = message;
  addLog(desc("logs.shoeReady", { shoe: state.shoeNumber }));
}

function createShoe() {
  const cards = [];
  let cardId = 1;

  for (let deckIndex = 0; deckIndex < DECK_COUNT; deckIndex += 1) {
    SUITS.forEach((suit) => {
      RANKS.forEach((rank) => {
        cards.push({
          id: `${deckIndex + 1}-${cardId}`,
          rank,
          suit: suit.code,
          red: suit.red,
        });
        cardId += 1;
      });
    });
  }

  return cards;
}

function shuffle(cards) {
  const clone = [...cards];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }

  return clone;
}

function normalizeBet(rawValue, fallback = MIN_BET) {
  if (!Number.isFinite(rawValue)) {
    return fallback;
  }

  const rounded = Math.round(rawValue / BET_STEP) * BET_STEP;
  return clamp(rounded, MIN_BET, MAX_BET);
}

function isValidBet(value) {
  return Number.isFinite(value) && value >= MIN_BET && value <= MAX_BET && value % BET_STEP === 0;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function startRound() {
  if (isRoundActive()) {
    return;
  }

  const activeSeats = getActiveSeats();
  if (activeSeats.length === 0) {
    state.message = desc("status.noSeats");
    render();
    return;
  }

  const totalAction = getOpeningExposure();
  if (state.bankroll < totalAction) {
    state.message = desc("status.bankrollLow");
    render();
    return;
  }

  if (state.shufflePending || state.shoe.length <= CUT_CARD_REMAINING) {
    buildNewShoe(desc("status.autoNewShoe"));
  }

  state.roundNumber += 1;
  state.bankroll -= totalAction;

  const hands = activeSeats.map(({ seat, index }) =>
    createHand({
      bet: seat.bet,
      cards: [],
      fromSplit: false,
      isSplitAceHand: false,
      pendingDeal: false,
      openingSpot: index + 1,
    }),
  );

  state.round = {
    phase: "dealing",
    dealer: { cards: [] },
    hands,
    activeHandIndex: 0,
    acesSplitUsed: false,
  };

  hands.forEach((hand) => dealVisibleCard(hand));
  dealVisibleCard(state.round.dealer);
  hands.forEach((hand) => dealVisibleCard(hand));
  dealHiddenCard(state.round.dealer);

  addLog(desc("logs.roundStart", {
    round: state.roundNumber,
    seats: formatSeatList(activeSeats.map(({ index }) => index + 1)),
    total: formatMoney(totalAction),
  }));

  afterInitialDeal();
  render();
}

function createHand({ bet, cards, fromSplit, isSplitAceHand, pendingDeal, openingSpot }) {
  return {
    id: state.nextHandId++,
    bet,
    cards,
    fromSplit,
    isSplitAceHand,
    pendingDeal,
    resolved: false,
    stood: false,
    busted: false,
    doubled: false,
    result: null,
    openingSpot,
  };
}

function dealVisibleCard(target) {
  const card = drawCard();
  exposeCard(card);
  target.cards.push(card);
  return card;
}

function dealHiddenCard(target) {
  const card = drawCard();
  card.faceDown = true;
  card.exposed = false;
  target.cards.push(card);
  return card;
}

function drawCard() {
  if (state.shoe.length === 0) {
    state.shoe = shuffle(createShoe());
    state.runningCount = 0;
    state.visibleCardsSeen = 0;
    addLog(desc("logs.shoeEmpty"));
  }

  return { ...state.shoe.pop(), faceDown: false, exposed: false };
}

function exposeCard(card) {
  if (card.exposed) {
    return;
  }

  card.faceDown = false;
  card.exposed = true;
  state.runningCount += HI_LO_VALUES[card.rank];
  state.visibleCardsSeen += 1;
}

function afterInitialDeal() {
  const dealerHasBlackjack = hasBlackjack(state.round.dealer.cards, false);
  if (dealerHasBlackjack) {
    revealDealerHoleCard();
    finishRound(desc("status.dealerBlackjack"));
    return;
  }

  let openedWithTwentyOne = false;
  state.round.hands.forEach((hand, index) => {
    if (getHandValue(hand.cards).total === 21) {
      hand.stood = true;
      hand.resolved = true;
      hand.result = desc("results.auto21");
      addLog(desc("logs.handAutoStand21", { hand: index + 1 }));
      openedWithTwentyOne = true;
    }
  });

  if (openedWithTwentyOne) {
    state.message = desc("status.openingTwentyOne");
  }

  if (state.round.hands.every((hand) => hand.resolved)) {
    revealDealerHoleCard();
    finishRound(desc("status.openingTwentyOne"));
    return;
  }

  state.round.phase = "player-turn";
  focusNextPlayableHand(0);
}

function hitHand() {
  const hand = getActiveHand();
  if (!canHit(hand)) {
    return;
  }

  dealVisibleCard(hand);
  const { total } = getHandValue(hand.cards);

  if (total > 21) {
    hand.busted = true;
    hand.resolved = true;
    hand.result = desc("results.bust");
    addLog(desc("logs.handBust", { hand: state.round.activeHandIndex + 1 }));
    focusNextPlayableHand(state.round.activeHandIndex + 1);
    return;
  }

  if (total === 21) {
    hand.stood = true;
    hand.resolved = true;
    hand.result = desc("results.auto21");
    addLog(desc("logs.handAutoStand21", { hand: state.round.activeHandIndex + 1 }));
    focusNextPlayableHand(state.round.activeHandIndex + 1);
    return;
  }

  state.message = desc("status.currentHandContinue", { hand: state.round.activeHandIndex + 1 });
  render();
}

function standHand() {
  const hand = getActiveHand();
  if (!canStand(hand)) {
    return;
  }

  hand.stood = true;
  hand.resolved = true;
  hand.result = desc("results.stand");
  addLog(desc("logs.handStand", { hand: state.round.activeHandIndex + 1 }));
  focusNextPlayableHand(state.round.activeHandIndex + 1);
}

function doubleHand() {
  const hand = getActiveHand();
  if (!canDouble(hand)) {
    return;
  }

  state.bankroll -= hand.bet;
  hand.bet *= 2;
  hand.doubled = true;
  dealVisibleCard(hand);

  const { total } = getHandValue(hand.cards);
  hand.resolved = true;
  hand.stood = total <= 21;
  hand.busted = total > 21;
  hand.result = total > 21 ? desc("results.doubleBust") : desc("results.doubleDone");

  addLog(desc("logs.handDouble", {
    hand: state.round.activeHandIndex + 1,
    bet: formatMoney(hand.bet),
  }));

  focusNextPlayableHand(state.round.activeHandIndex + 1);
}

function splitHand() {
  const round = state.round;
  const hand = getActiveHand();

  if (!canSplit(hand)) {
    return;
  }

  state.bankroll -= hand.bet;

  const [firstCard, secondCard] = hand.cards;
  const splittingAces = firstCard.rank === "A" && secondCard.rank === "A";
  const firstHand = createHand({
    bet: hand.bet,
    cards: [firstCard],
    fromSplit: true,
    isSplitAceHand: splittingAces,
    pendingDeal: false,
    openingSpot: hand.openingSpot,
  });
  const secondHand = createHand({
    bet: hand.bet,
    cards: [secondCard],
    fromSplit: true,
    isSplitAceHand: splittingAces,
    pendingDeal: !splittingAces,
    openingSpot: hand.openingSpot,
  });

  round.hands.splice(round.activeHandIndex, 1, firstHand, secondHand);

  if (splittingAces) {
    round.acesSplitUsed = true;
    dealVisibleCard(firstHand);
    dealVisibleCard(secondHand);
    firstHand.stood = true;
    firstHand.resolved = true;
    firstHand.result = desc("results.splitAcesAuto");
    secondHand.stood = true;
    secondHand.resolved = true;
    secondHand.result = desc("results.splitAcesAuto");
    addLog(desc("logs.splitAces"));
    focusNextPlayableHand(round.activeHandIndex);
    return;
  }

  dealVisibleCard(firstHand);
  addLog(desc("logs.splitDone", { hand: round.activeHandIndex + 1 }));

  const { total } = getHandValue(firstHand.cards);
  if (total > 21) {
    firstHand.busted = true;
    firstHand.resolved = true;
    firstHand.result = desc("results.bust");
    focusNextPlayableHand(round.activeHandIndex + 1);
    return;
  }

  if (total === 21) {
    firstHand.stood = true;
    firstHand.resolved = true;
    firstHand.result = desc("results.auto21");
    addLog(desc("logs.handAutoStand21", { hand: round.activeHandIndex + 1 }));
    focusNextPlayableHand(round.activeHandIndex + 1);
    return;
  }

  state.message = desc("status.currentHandContinue", { hand: round.activeHandIndex + 1 });
  render();
}

function focusNextPlayableHand(startIndex) {
  const round = state.round;

  for (let index = startIndex; index < round.hands.length; index += 1) {
    round.activeHandIndex = index;
    const hand = round.hands[index];

    if (hand.pendingDeal) {
      hand.pendingDeal = false;
      dealVisibleCard(hand);
      addLog(desc("logs.secondCardDealt", { hand: index + 1 }));

      const { total } = getHandValue(hand.cards);
      if (total > 21) {
        hand.busted = true;
        hand.resolved = true;
        hand.result = desc("results.bust");
      } else if (total === 21) {
        hand.stood = true;
        hand.resolved = true;
        hand.result = desc("results.auto21");
        addLog(desc("logs.handAutoStand21", { hand: index + 1 }));
      }
    }

    if (!hand.resolved) {
      round.phase = "player-turn";
      state.message = desc("status.currentHandTurn", { hand: index + 1 });
      render();
      return;
    }
  }

  round.phase = "dealer-turn";
  playDealerTurn();
}

function playDealerTurn() {
  revealDealerHoleCard();

  if (state.round.hands.every((hand) => hand.busted)) {
    finishRound(desc("status.dealerSkips"));
    return;
  }

  while (dealerShouldHit()) {
    dealVisibleCard(state.round.dealer);
  }

  finishRound(desc("status.dealerDone"));
}

function revealDealerHoleCard() {
  const hiddenCard = state.round?.dealer.cards.find((card) => card.faceDown);
  if (hiddenCard) {
    exposeCard(hiddenCard);
  }
}

function dealerShouldHit() {
  const { total, soft } = getHandValue(state.round.dealer.cards);
  return total < 17 || (total === 17 && soft);
}

function finishRound(reason) {
  const round = state.round;
  const dealerValue = getHandValue(round.dealer.cards);
  const dealerBlackjack = hasBlackjack(round.dealer.cards, false);
  const dealerBust = dealerValue.total > 21;

  let wins = 0;
  let losses = 0;
  let pushes = 0;

  round.hands.forEach((hand) => {
    const handValue = getHandValue(hand.cards);
    const playerBlackjack = hasBlackjack(hand.cards, hand.fromSplit);

    if (hand.busted) {
      hand.result = hand.result || desc("results.bust");
      losses += 1;
      return;
    }

    if (dealerBlackjack) {
      if (playerBlackjack) {
        state.bankroll += hand.bet;
        hand.result = desc("results.push");
        pushes += 1;
      } else {
        hand.result = desc("results.dealerBlackjack");
        losses += 1;
      }
      return;
    }

    if (dealerBust || handValue.total > dealerValue.total) {
      if (playerBlackjack) {
        state.bankroll += hand.bet * 2.5;
        hand.result = desc("results.blackjackWin", { amount: formatMoney(hand.bet * 1.5) });
      } else {
        state.bankroll += hand.bet * 2;
        hand.result = desc("results.win", { amount: formatMoney(hand.bet) });
      }
      wins += 1;
      return;
    }

    if (handValue.total === dealerValue.total) {
      state.bankroll += hand.bet;
      hand.result = desc("results.push");
      pushes += 1;
      return;
    }

    hand.result = hand.result || desc("results.lose");
    losses += 1;
  });

  round.phase = "round-over";
  state.shufflePending = state.shoe.length <= CUT_CARD_REMAINING;
  state.message = desc("status.roundSummary", {
    reason,
    wins,
    losses,
    pushes,
    shuffleNote: desc(state.shufflePending ? "common.autoShuffleNote" : "common.noAutoShuffleNote"),
  });
  addLog(desc("logs.roundEnd", { wins, losses, pushes }));
  render();
}

function getActiveHand() {
  if (!state.round) {
    return null;
  }
  return state.round.hands[state.round.activeHandIndex] || null;
}

function isRoundActive() {
  return Boolean(state.round && state.round.phase !== "round-over");
}

function canHit(hand) {
  return Boolean(
    hand &&
    state.round?.phase === "player-turn" &&
    !hand.resolved &&
    !hand.isSplitAceHand,
  );
}

function canStand(hand) {
  return Boolean(hand && state.round?.phase === "player-turn" && !hand.resolved);
}

function canDouble(hand) {
  if (!hand || state.round?.phase !== "player-turn" || hand.resolved || hand.isSplitAceHand) {
    return false;
  }

  if (hand.cards.length !== 2 || state.bankroll < hand.bet) {
    return false;
  }

  const { total } = getHandValue(hand.cards);
  return total === 9 || total === 10 || total === 11;
}

function canSplit(hand) {
  if (!hand || state.round?.phase !== "player-turn" || hand.resolved) {
    return false;
  }

  if (hand.cards.length !== 2 || state.round.hands.length >= MAX_TOTAL_HANDS || state.bankroll < hand.bet) {
    return false;
  }

  const [first, second] = hand.cards;
  if (splitRankKey(first.rank) !== splitRankKey(second.rank)) {
    return false;
  }

  if (first.rank === "A" && second.rank === "A") {
    return !state.round.acesSplitUsed && !hand.fromSplit;
  }

  return true;
}

function splitRankKey(rank) {
  if (["10", "J", "Q", "K"].includes(rank)) {
    return "10";
  }
  return rank;
}

function getHandValue(cards) {
  let total = 0;
  let aces = 0;

  cards.forEach((card) => {
    total += CARD_VALUES[card.rank];
    if (card.rank === "A") {
      aces += 1;
    }
  });

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return { total, soft: aces > 0 };
}

function hasBlackjack(cards, fromSplit) {
  return cards.length === 2 && !fromSplit && getHandValue(cards).total === 21;
}

function getVisibleDealerValueLabel() {
  if (!state.round) {
    return t("common.dealerTotalUnknown");
  }

  const dealerCards = state.round.dealer.cards;
  const hidden = dealerCards.some((card) => card.faceDown);
  if (hidden) {
    const visibleValue = getHandValue(dealerCards.filter((card) => !card.faceDown)).total;
    return t("common.dealerUpcard", { total: visibleValue });
  }

  return t("common.dealerTotal", { total: getHandValue(dealerCards).total });
}

function getTrueCount() {
  const decksRemaining = Math.max(state.shoe.length / CARDS_PER_DECK, 0.25);
  return state.runningCount / decksRemaining;
}

function toggleCount() {
  state.countVisible = !state.countVisible;
  render();
}

function refundCancelledRound() {
  if (!state.round) {
    return;
  }

  const refund = state.round.hands.reduce((sum, hand) => sum + hand.bet, 0);
  state.bankroll += refund;
  addLog(desc("logs.cancelledRefund", { refund: formatMoney(refund) }));
}

function addLog(entry) {
  state.log.unshift(entry);
  state.log = state.log.slice(0, LOG_LIMIT);
}

function render() {
  renderStaticText();
  renderLanguageState();
  renderHeaderStats();
  renderDealer();
  renderPlayerSpots();
  renderCountPanel();
  renderLog();
  renderControls();
  renderSeatControls();
}

function renderStaticText() {
  document.title = t("meta.title");
  document.documentElement.lang = t("meta.htmlLang");

  dom.heroEyebrow.textContent = t("hero.eyebrow");
  dom.heroTitle.textContent = t("hero.title");
  dom.heroText.textContent = t("hero.text");

  dom.financeHeading.textContent = t("sections.finance");
  dom.tableLimitPill.textContent = t("pills.tableLimit");
  dom.wagerHeading.textContent = t("sections.wager");
  dom.betModePill.textContent = t("pills.wager");
  dom.openingHandsHeading.textContent = t("sections.openingHands");
  dom.openingHandsPill.textContent = t("pills.openingHands");
  dom.countHeading.textContent = t("sections.count");
  dom.countPill.textContent = t("pills.count");
  dom.rulesHeading.textContent = t("sections.rules");
  dom.rulesPill.textContent = t("pills.rules");
  dom.shortcutsHeading.textContent = t("sections.shortcuts");
  dom.shortcutsPill.textContent = t("pills.shortcuts");
  dom.logHeading.textContent = t("sections.logs");
  dom.logPill.textContent = t("pills.logs");
  dom.sourcesHeading.textContent = t("sections.sources");
  dom.sourcesPill.textContent = t("pills.sources");
  dom.sourcesText.innerHTML = t("sources.bodyHtml");

  dom.bankrollLabel.textContent = t("stats.bankroll");
  dom.betStatLabel.textContent = t("stats.bet");
  dom.roundStatLabel.textContent = t("stats.round");
  dom.shoeStatLabel.textContent = t("stats.shoe");
  dom.seatSetupNote.textContent = t("common.seatSetupNote");
  dom.openingBetLabel.textContent = t("stats.openingBet");
  dom.tableExposureLabel.textContent = t("stats.tableExposure");
  dom.runningCountLabel.textContent = t("stats.runningCount");
  dom.trueCountLabel.textContent = t("stats.trueCount");
  dom.cardsLeftLabel.textContent = t("stats.cardsLeft");
  dom.cardsSeenLabel.textContent = t("stats.cardsSeen");

  dom.dealerSeatLabel.textContent = "Dealer";
  dom.dealerHeading.textContent = t("sections.dealer");

  dom.tableBanner.textContent = t("table.banner");
  dom.tableSubbanner.textContent = t("table.subbanner");
  dom.tableFootnote.textContent = t("table.footnote");

  dom.newShoeButton.textContent = t("buttons.newShoe");
  dom.toggleCountButton.textContent = state.countVisible ? t("buttons.hideCount") : t("buttons.showCount");
  dom.dealButton.textContent = t("buttons.deal");
  dom.hitButton.textContent = t("buttons.hit");
  dom.standButton.textContent = t("buttons.stand");
  dom.doubleButton.textContent = t("buttons.double");
  dom.splitButton.textContent = t("buttons.split");

  dom.seatBetGrid.setAttribute("aria-label", t("accessibility.seatWagers"));
  dom.controls.setAttribute("aria-label", t("accessibility.roundControls"));
  dom.cutMarker.setAttribute("title", t("accessibility.cutMarker"));
  dom.cutMarker.setAttribute("aria-label", t("accessibility.cutMarker"));
  dom.langButtons.forEach((button) => button.setAttribute("aria-label", t("accessibility.languageSwitch")));

  renderRuleList();
  renderShortcutList();
}

function renderRuleList() {
  dom.ruleList.replaceChildren();
  getCopy("rules.items").forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    dom.ruleList.appendChild(item);
  });
}

function renderShortcutList() {
  dom.shortcutList.replaceChildren();
  SHORTCUTS.forEach((shortcut) => {
    const item = document.createElement("li");
    const kbd = document.createElement("kbd");
    kbd.textContent = shortcut.key;
    item.appendChild(kbd);
    item.append(` ${t(shortcut.actionKey)}`);
    dom.shortcutList.appendChild(item);
  });
}

function renderLanguageState() {
  dom.langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.language);
  });
}

function renderSeatControls() {
  dom.seatBetGrid.replaceChildren();
  const disabled = isRoundActive() ? "disabled" : "";

  state.seats.forEach((seat, index) => {
    const seatNumber = index + 1;
    const row = document.createElement("article");
    row.className = `seat-control${seat.enabled ? " active" : ""}`;
    row.innerHTML = `
      <div class="seat-control-main">
        <button
          class="seat-toggle"
          data-seat-toggle="${index}"
          type="button"
          aria-pressed="${seat.enabled}"
          ${disabled}
        >
          <span>${t("common.seatControlTitle", { index: seatNumber })}</span>
          <strong>${seat.enabled ? t("common.seatToggleOn") : t("common.seatToggleOff")}</strong>
        </button>
        <label class="seat-bet-field">
          <span>${t("common.seatBetLabel")}</span>
          <input
            class="seat-bet-input"
            data-seat-index="${index}"
            type="number"
            min="${MIN_BET}"
            max="${MAX_BET}"
            step="${BET_STEP}"
            value="${seat.bet}"
            ${disabled}
          >
        </label>
      </div>
      <div class="seat-chip-row" aria-label="${t("accessibility.quickBets")}">
        ${QUICK_BETS.map((bet) => `
          <button
            class="seat-chip${seat.bet === bet ? " active" : ""}"
            data-seat-chip
            data-seat-index="${index}"
            data-bet="${bet}"
            type="button"
            ${disabled}
          >${formatMoney(bet).replace(".00", "")}</button>
        `).join("")}
      </div>
    `;
    dom.seatBetGrid.appendChild(row);
  });
}

function renderHeaderStats() {
  const activeSeats = getActiveSeats();
  dom.bankrollValue.textContent = formatMoney(state.bankroll);
  dom.betValue.textContent = formatMoney(getOpeningExposure());
  dom.roundValue.textContent = String(state.roundNumber);
  dom.shoeValue.textContent = String(state.shoeNumber);
  dom.openingBetValue.textContent = activeSeats.length
    ? t("common.activeSeatList", { seats: formatSeatList(activeSeats.map(({ index }) => index + 1)) })
    : t("common.noActiveSeats");
  dom.tableExposureValue.textContent = formatMoney(getOpeningExposure());
  dom.tableStatus.textContent = resolveText(state.message);
}

function renderDealer() {
  dom.dealerTotal.textContent = getVisibleDealerValueLabel();
  dom.dealerCards.replaceChildren();

  if (!state.round) {
    dom.dealerCards.appendChild(buildGhostCard(t("common.waitingDeal")));
    return;
  }

  state.round.dealer.cards.forEach((card) => {
    dom.dealerCards.appendChild(buildCardNode(card));
  });
}

function renderPlayerSpots() {
  dom.playerSpots.replaceChildren();

  if (!state.round) {
    for (let slotIndex = 0; slotIndex < MAX_TOTAL_HANDS; slotIndex += 1) {
      dom.playerSpots.appendChild(buildEmptySpot(slotIndex));
    }
    return;
  }

  const handsBySeat = new Map();
  state.round.hands.forEach((hand, handIndex) => {
    const seatHands = handsBySeat.get(hand.openingSpot) || [];
    seatHands.push({ hand, handIndex });
    handsBySeat.set(hand.openingSpot, seatHands);
  });

  const hasSplitDisplay = [...handsBySeat.values()].some((hands) => hands.length > 1);
  if (hasSplitDisplay) {
    state.round.hands.forEach((hand, handIndex) => {
      dom.playerSpots.appendChild(buildHandSpot(hand, handIndex, handIndex));
    });

    const occupiedSeats = new Set(state.round.hands.map((hand) => hand.openingSpot));
    for (let slotIndex = 0; slotIndex < MAX_TOTAL_HANDS && dom.playerSpots.children.length < MAX_TOTAL_HANDS; slotIndex += 1) {
      if (occupiedSeats.has(slotIndex + 1)) {
        continue;
      }
      dom.playerSpots.appendChild(buildEmptySpot(slotIndex));
    }
    return;
  }

  for (let slotIndex = 0; slotIndex < MAX_TOTAL_HANDS; slotIndex += 1) {
    const seatHands = handsBySeat.get(slotIndex + 1);
    if (seatHands?.length) {
      dom.playerSpots.appendChild(buildHandSpot(seatHands[0].hand, slotIndex, seatHands[0].handIndex));
    } else {
      dom.playerSpots.appendChild(buildEmptySpot(slotIndex));
    }
  }
}

function buildHandSpot(hand, displayIndex, handIndex = displayIndex) {
  const article = document.createElement("article");
  const active = state.round?.phase === "player-turn" && handIndex === state.round.activeHandIndex;
  article.className = `spot${active ? " active" : ""}`;

  const { total, soft } = getHandValue(hand.cards);
  const statusText = hand.result ? resolveText(hand.result) : hand.pendingDeal ? t("common.waitingSecondCard") : t("common.inProgress");
  const seatText = t("table.seat", { index: hand.openingSpot || displayIndex + 1 });

  article.innerHTML = `
    <div class="spot-topline">
      <div>
        <p class="spot-seat">${seatText}</p>
        <h3 class="spot-title">${t("common.handNumber", { index: handIndex + 1 })}</h3>
      </div>
      <span class="tag info">${formatMoney(hand.bet)}</span>
    </div>
    <div class="spot-tags"></div>
    <div class="card-row"></div>
    <div class="spot-chipline">
      <div class="spot-chip">${formatMoney(hand.bet).replace(".00", "")}</div>
      <div class="spot-meta">
        ${t("common.totalPrefix", { total, soft: soft && total <= 21 ? t("common.softSuffix") : "" })}<br>
        ${t("common.statusPrefix", { state: statusText })}
      </div>
    </div>
  `;

  const tagHost = article.querySelector(".spot-tags");
  const cardHost = article.querySelector(".card-row");

  if (active) {
    tagHost.appendChild(buildTag(t("tags.active"), "info"));
  }
  if (hand.fromSplit) {
    tagHost.appendChild(buildTag(t("tags.split"), "info"));
  }
  if (hand.isSplitAceHand) {
    tagHost.appendChild(buildTag(t("tags.splitAces"), "info"));
  }
  if (hand.doubled) {
    tagHost.appendChild(buildTag(t("tags.doubled"), "info"));
  }
  if (hasBlackjack(hand.cards, hand.fromSplit) && !hand.busted) {
    tagHost.appendChild(buildTag(t("tags.blackjackStyle21"), "success"));
  }
  if (hand.busted) {
    tagHost.appendChild(buildTag(t("tags.bust"), "danger"));
  } else if (descriptorKey(hand.result) === "results.push") {
    tagHost.appendChild(buildTag(t("tags.push"), "info"));
  } else if (isWinningResult(hand.result)) {
    tagHost.appendChild(buildTag(t("tags.win"), "success"));
  }

  hand.cards.forEach((card) => {
    cardHost.appendChild(buildCardNode(card));
  });

  if (hand.pendingDeal) {
    cardHost.appendChild(buildGhostCard(t("common.waitingSecondCard")));
  }

  return article;
}

function buildEmptySpot(index) {
  const seat = state.seats[index] || { enabled: false, bet: MIN_BET };
  const enabledForOpening = !state.round && seat.enabled;
  const article = document.createElement("article");
  article.className = `spot empty${enabledForOpening ? " active" : ""}`;

  article.innerHTML = `
    <div class="spot-topline">
      <div>
        <p class="spot-seat">${t("table.seat", { index: index + 1 })}</p>
        <h3 class="spot-title">${enabledForOpening ? t("common.seatSelected") : t("common.seatInactive")}</h3>
      </div>
      <span class="tag">${enabledForOpening ? t("table.emptyActive") : t("table.emptyIdle")}</span>
    </div>
    <div class="spot-tags"></div>
    <div class="card-row"></div>
    <div class="spot-chipline">
      <div class="spot-chip">${enabledForOpening ? formatMoney(seat.bet).replace(".00", "") : "--"}</div>
      <div class="spot-meta">
        ${t("common.totalPrefix", { total: "--", soft: "" })}<br>
        ${t("common.statusPrefix", { state: enabledForOpening ? t("common.waitingDeal") : t("common.notPlaying") })}
      </div>
    </div>
  `;

  const cardHost = article.querySelector(".card-row");
  cardHost.appendChild(buildGhostCard(t("common.spotPlaceholder")));
  cardHost.appendChild(buildGhostCard(t("common.spotPlaceholder")));
  return article;
}

function renderCountPanel() {
  const runningText = state.countVisible ? formatCount(state.runningCount) : t("common.hidden");
  const trueText = state.countVisible ? formatCount(Number(getTrueCount().toFixed(1))) : t("common.hidden");
  const cardsDealt = DECK_COUNT * CARDS_PER_DECK - state.shoe.length;
  const shoePercent = ((state.shoe.length / (DECK_COUNT * CARDS_PER_DECK)) * 100).toFixed(1);

  dom.runningCount.textContent = runningText;
  dom.trueCount.textContent = trueText;
  dom.cardsLeft.textContent = String(state.shoe.length);
  dom.cardsSeen.textContent = String(cardsDealt);
  dom.shoeFill.style.width = `${shoePercent}%`;
  dom.shoeStatus.textContent = state.shufflePending
    ? t("common.countShuffleNext")
    : t("common.countDecksRemaining", { decks: (state.shoe.length / CARDS_PER_DECK).toFixed(2) });
  dom.shuffleFlag.textContent = t("common.cutCardLabel", { count: CUT_CARD_REMAINING });
}

function renderLog() {
  dom.logList.replaceChildren();

  if (state.log.length === 0) {
    const item = document.createElement("li");
    item.textContent = t("common.noLogs");
    dom.logList.appendChild(item);
    return;
  }

  state.log.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = resolveText(entry);
    dom.logList.appendChild(item);
  });
}

function renderControls() {
  const hand = getActiveHand();
  dom.dealButton.disabled = isRoundActive() || state.bankroll < getOpeningExposure();
  dom.hitButton.disabled = !canHit(hand);
  dom.standButton.disabled = !canStand(hand);
  dom.doubleButton.disabled = !canDouble(hand);
  dom.splitButton.disabled = !canSplit(hand);
}

function buildCardNode(card) {
  const element = document.createElement("div");
  const classes = ["card"];

  if (card.faceDown) {
    classes.push("back");
    element.className = classes.join(" ");
    element.innerHTML = `
      <div class="card-corner">TV<span>${t("table.down")}</span></div>
      <div class="card-center">21</div>
      <div class="card-corner">TV<span>${t("table.down")}</span></div>
    `;
    return element;
  }

  if (card.red) {
    classes.push("red");
  }

  element.className = classes.join(" ");
  element.innerHTML = `
    <div class="card-corner">${card.rank}<span>${card.suit}</span></div>
    <div class="card-center">${card.rank}-${card.suit}</div>
    <div class="card-corner">${card.rank}<span>${card.suit}</span></div>
  `;
  return element;
}

function buildGhostCard(label) {
  const element = document.createElement("div");
  element.className = "card ghost";
  element.innerHTML = `
    <div class="card-corner">--<span>--</span></div>
    <div class="card-center">${label}</div>
    <div class="card-corner">--<span>--</span></div>
  `;
  return element;
}

function buildTag(text, kind = "") {
  const tag = document.createElement("span");
  tag.className = `tag${kind ? ` ${kind}` : ""}`;
  tag.textContent = text;
  return tag;
}

function getOpeningExposure() {
  return getActiveSeats().reduce((sum, { seat }) => sum + seat.bet, 0);
}

function getActiveSeats() {
  return state.seats
    .map((seat, index) => ({ seat, index }))
    .filter(({ seat }) => seat.enabled);
}

function formatSeatList(seats) {
  return seats.join(" / ");
}

function formatMoney(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });
  return formatter.format(amount);
}

function formatCount(value) {
  return value > 0 ? `+${value}` : `${value}`;
}

function desc(key, params = {}) {
  return { key, params };
}

function resolveText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object" && typeof value.key === "string") {
    return t(value.key, value.params);
  }

  return String(value);
}

function t(path, params = {}) {
  const template = getCopy(path);
  if (typeof template !== "string") {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, token) => {
    if (!(token in params)) {
      return `{${token}}`;
    }
    return resolveText(params[token]);
  });
}

function getCopy(path) {
  return path.split(".").reduce((current, segment) => current?.[segment], COPY[state.language]);
}

function descriptorKey(entry) {
  return entry?.key || "";
}

function isWinningResult(entry) {
  return ["results.win", "results.blackjackWin"].includes(descriptorKey(entry));
}

function loadStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_LANGUAGE_KEY);
    return COPY[stored] ? stored : "zh";
  } catch (error) {
    return "zh";
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem(STORAGE_LANGUAGE_KEY, language);
  } catch (error) {
    // Ignore storage restrictions in file:// contexts.
  }
}

function createDefaultSeats() {
  return Array.from({ length: MAX_TOTAL_HANDS }, (_, index) => ({
    enabled: index === 0,
    bet: MIN_BET,
  }));
}

function loadStoredSeats() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_SEAT_CONFIG_KEY));
    const normalized = normalizeStoredSeats(stored);
    if (normalized) {
      return normalized;
    }
  } catch (error) {
    // Ignore storage restrictions in file:// contexts.
  }
  return createDefaultSeats();
}

function normalizeStoredSeats(stored) {
  if (!Array.isArray(stored)) {
    return null;
  }

  const seats = createDefaultSeats().map((defaultSeat, index) => {
    const storedSeat = stored[index] || {};
    return {
      enabled: Boolean(storedSeat.enabled),
      bet: normalizeBet(Number(storedSeat.bet), defaultSeat.bet),
    };
  });

  if (!seats.some((seat) => seat.enabled)) {
    seats[0].enabled = true;
  }

  return seats;
}

function storeSeats() {
  try {
    localStorage.setItem(STORAGE_SEAT_CONFIG_KEY, JSON.stringify(state.seats));
  } catch (error) {
    // Ignore storage restrictions in file:// contexts.
  }
}

init();
