const MIN_BET = 25;
const MAX_BET = 500;
const BET_STEP = 25;
const DECK_COUNT = 2;
const CARDS_PER_DECK = 52;
const CUT_CARD_REMAINING = 15;
const MAX_PLAYER_HANDS = 5;
const STARTING_BANKROLL = 5000;
const LOG_LIMIT = 10;
const STORAGE_LANGUAGE_KEY = "doubleDeckTrainerLanguage";

const SUITS = [
  { code: "H", name: "Hearts", red: true },
  { code: "D", name: "Diamonds", red: true },
  { code: "C", name: "Clubs", red: false },
  { code: "S", name: "Spades", red: false },
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

const LANGUAGES = {
  zh: {
    meta: {
      title: "Thunder Valley 风格双副牌 21 点训练台",
      htmlLang: "zh-CN",
    },
    hero: {
      eyebrow: "Double Deck Blackjack Trainer",
      title: "Thunder Valley 风格双副牌 21 点",
      text: "按双副牌 pitch game 的节奏做了一张本地训练台，适合一边打牌一边练 Hi-Lo 算牌。",
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
      finance: "资金和下注",
      rules: "规则设定",
      dealer: "庄家",
      player: "你的手牌",
      count: "算牌练习",
      shortcuts: "快捷键",
      logs: "牌桌记录",
      sources: "规则来源",
    },
    zoneLabels: {
      dealer: "Dealer",
      player: "Player",
    },
    pills: {
      tableLimit: "台面限红 $25 - $500",
      rules: "Thunder Valley 风格 + 自定义",
      count: "Hi-Lo",
      shortcuts: "更顺手",
      logs: "最近 10 条",
      sources: "2026-05-22 查证",
    },
    stats: {
      bankroll: "Bankroll",
      bet: "当前下注",
      round: "第几局",
      shoe: "第几个 Shoe",
      betInput: "下注金额",
      runningCount: "Running Count",
      trueCount: "True Count",
      cardsLeft: "牌靴剩余",
      cardsSeen: "已发出",
    },
    rules: {
      items: [
        "双副牌，庄家 soft 17 必须继续要牌。",
        "只允许在前两张合计 9 / 10 / 11 时 double。",
        "A,A 只能 split 一次，分完后每手只补一张并自动停牌。",
        "其他对子最多可分到 5 手牌。",
        "剩余约 15 张牌时，当前局打完后进入下一个 shoe。",
        "黑杰克按 3:2 结算，暂不做保险和边注。",
      ],
    },
    shortcuts: {
      empty: "还没有快捷键。",
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
      bodyHtml: "公开规则主要参考 Thunder Valley 官方的 <a href=\"https://thundervalleyresort.com/casino/table-games/blackjack\" target=\"_blank\" rel=\"noreferrer\">Blackjack 页面</a> 和 <a href=\"https://www.thundervalleyresort.com/getmedia/blackjack-how-to-play-pdf\" target=\"_blank\" rel=\"noreferrer\">How To Play PDF</a>。最多 5 手牌和语言切换属于这张训练台的自定义设定。",
    },
    accessibility: {
      quickBets: "快速下注",
      roundControls: "牌局操作",
      languageSwitch: "语言切换",
      cutMarker: "cut card 约在剩余 15 张",
    },
    common: {
      hidden: "隐藏中",
      waiting: "等待发牌",
      hand: "手牌",
      down: "盖牌",
      push: "Push",
      dealerTotalUnknown: "总点数: ?",
      dealerUpcard: "明牌: {total}",
      dealerTotal: "总点数: {total}",
      countDecksRemaining: "剩余约 {decks} decks。",
      countShuffleNext: "切牌位已到，下一局自动换 shoe。",
      cutCardLabel: "cut card: {count} 张",
      shoeStatusFresh: "新 shoe，计数归零。",
      noLogs: "还没有牌桌记录。",
      noShortcuts: "还没有快捷键。",
      inactiveHandStatus: "进行中",
      awaitingSecondCard: "等待补牌",
      softSuffix: " (soft)",
      handNumber: "手牌 {index}",
      logShoeNumber: "第 {shoe} 个 shoe",
      roundNumber: "第 {round} 局",
      handOrdinal: "第 {hand} 手牌",
      cardsDealtPlaceholder: "手牌",
      roundCancelled: "当前局已取消",
      and: "和",
      autoShuffleNote: "。下局自动换 shoe。",
      noAutoShuffleNote: "。",
    },
    status: {
      adjustBet: "调好注码后，按“发牌”开始。",
      ready: "练习台已就绪，新 shoe 洗好了。",
      bankrollLow: "Bankroll 不够，先把注码降下来。",
      autoNewShoe: "切牌位到了，自动进入下一个 shoe。",
      manualNewShoeActive: "当前局已取消，手动换了一个新 shoe。",
      manualNewShoeIdle: "手动换了一个新 shoe。",
      currentHandTurn: "轮到第 {hand} 手牌。",
      currentHandContinue: "第 {hand} 手牌继续行动。",
      dealerBlackjack: "庄家是 blackjack。",
      playerBlackjack: "你起手就是 blackjack。",
      dealerSkips: "你的手都爆掉了，庄家不用补牌。",
      dealerDone: "庄家行动结束。",
      roundSummary: "{reason} 本局结果：赢 {wins}，输 {losses}，Push {pushes}{shuffleNote}",
    },
    logs: {
      shoeReady: "第 {shoe} 个 shoe 已洗好，running count 归零。",
      roundStart: "第 {round} 局开始，下注 {bet}。",
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
    handResult: {
      bust: "爆牌",
      autoStand21: "21 自动停牌",
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
      blackjack: "Blackjack",
      bust: "爆牌",
      push: "Push",
      win: "赢",
    },
    playerSummary: {
      waiting: "等待发牌",
      active: "{count} 手牌，当前第 {index} 手",
      settled: "{count} 手牌",
    },
    handMeta: {
      total: "点数: {total}{soft}",
      state: "状态: {state}",
      waiting: "发牌后这里会显示你的手牌、下注和结果。",
      waitingBet: "等待下注",
    },
  },
  en: {
    meta: {
      title: "Thunder Valley Style Double Deck Blackjack Trainer",
      htmlLang: "en",
    },
    hero: {
      eyebrow: "Double Deck Blackjack Trainer",
      title: "Thunder Valley Style Double Deck Blackjack",
      text: "A local practice table built around a double-deck pitch-game rhythm, so you can play hands and drill Hi-Lo counting at the same time.",
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
      finance: "Bankroll and Bets",
      rules: "Rule Setup",
      dealer: "Dealer",
      player: "Your Hands",
      count: "Count Practice",
      shortcuts: "Hotkeys",
      logs: "Table Log",
      sources: "Rules Sources",
    },
    zoneLabels: {
      dealer: "Dealer",
      player: "Player",
    },
    pills: {
      tableLimit: "Table limits $25 - $500",
      rules: "Thunder Valley Style + Custom",
      count: "Hi-Lo",
      shortcuts: "Faster Flow",
      logs: "Last 10 entries",
      sources: "Verified on May 22, 2026",
    },
    stats: {
      bankroll: "Bankroll",
      bet: "Current Bet",
      round: "Round",
      shoe: "Shoe",
      betInput: "Bet Amount",
      runningCount: "Running Count",
      trueCount: "True Count",
      cardsLeft: "Cards Left",
      cardsSeen: "Cards Dealt",
    },
    rules: {
      items: [
        "Two decks, and the dealer must hit soft 17.",
        "Double is allowed only on the first two cards totaling 9, 10, or 11.",
        "A,A may be split only once, and each split ace hand receives one card then auto-stands.",
        "All other pairs may be split up to a total of 5 hands.",
        "When about 15 cards remain, the next round starts a new shoe.",
        "Blackjack pays 3:2. Insurance and side bets are not included in this trainer.",
      ],
    },
    shortcuts: {
      empty: "No hotkeys configured.",
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
      bodyHtml: "The public rules reference the official Thunder Valley <a href=\"https://thundervalleyresort.com/casino/table-games/blackjack\" target=\"_blank\" rel=\"noreferrer\">Blackjack page</a> and <a href=\"https://www.thundervalleyresort.com/getmedia/blackjack-how-to-play-pdf\" target=\"_blank\" rel=\"noreferrer\">How To Play PDF</a>. The 5-hand split cap and language switch are custom trainer settings.",
    },
    accessibility: {
      quickBets: "Quick bets",
      roundControls: "Round controls",
      languageSwitch: "Language switch",
      cutMarker: "cut card with about 15 cards remaining",
    },
    common: {
      hidden: "Hidden",
      waiting: "Waiting for the deal",
      hand: "Hand",
      down: "DOWN",
      push: "Push",
      dealerTotalUnknown: "Total: ?",
      dealerUpcard: "Upcard: {total}",
      dealerTotal: "Total: {total}",
      countDecksRemaining: "About {decks} decks remain.",
      countShuffleNext: "The cut card has been reached. The next round will use a new shoe.",
      cutCardLabel: "cut card: {count} cards",
      shoeStatusFresh: "Fresh shoe, count reset.",
      noLogs: "No table log entries yet.",
      noShortcuts: "No hotkeys configured.",
      inactiveHandStatus: "In progress",
      awaitingSecondCard: "Waiting for second card",
      softSuffix: " (soft)",
      handNumber: "Hand {index}",
      logShoeNumber: "Shoe {shoe}",
      roundNumber: "Round {round}",
      handOrdinal: "Hand {hand}",
      cardsDealtPlaceholder: "Cards",
      roundCancelled: "The current round was cancelled",
      and: "and",
      autoShuffleNote: ". The next round will auto-shuffle.",
      noAutoShuffleNote: ".",
    },
    status: {
      adjustBet: "Set your bet, then press Deal to begin.",
      ready: "The trainer is ready and a fresh shoe has been shuffled.",
      bankrollLow: "Your bankroll is too small for that bet. Lower the wager first.",
      autoNewShoe: "The cut card has been reached, so the next shoe is now in play.",
      manualNewShoeActive: "The current round was cancelled and a new shoe was loaded.",
      manualNewShoeIdle: "A new shoe was loaded.",
      currentHandTurn: "Hand {hand} is active.",
      currentHandContinue: "Hand {hand} can keep acting.",
      dealerBlackjack: "The dealer has blackjack.",
      playerBlackjack: "You opened with blackjack.",
      dealerSkips: "All of your hands busted, so the dealer does not draw.",
      dealerDone: "The dealer has finished acting.",
      roundSummary: "{reason} Round result: {wins} win, {losses} loss, {pushes} push{shuffleNote}",
    },
    logs: {
      shoeReady: "Shoe {shoe} was shuffled and the running count reset.",
      roundStart: "Round {round} started with a bet of {bet}.",
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
    handResult: {
      bust: "Bust",
      autoStand21: "21 auto-stand",
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
      blackjack: "Blackjack",
      bust: "Bust",
      push: "Push",
      win: "Win",
    },
    playerSummary: {
      waiting: "Waiting for the deal",
      active: "{count} hands, {indexLabel} is active",
      settled: "{count} hands",
    },
    handMeta: {
      total: "Total: {total}{soft}",
      state: "State: {state}",
      waiting: "Your cards, bet size, and result will appear here after the deal.",
      waitingBet: "Waiting for bet",
    },
  },
};

const dom = {
  heroEyebrow: document.querySelector("#hero-eyebrow"),
  heroTitle: document.querySelector("#hero-title"),
  heroText: document.querySelector("#hero-text"),
  financeHeading: document.querySelector("#finance-heading"),
  tableLimitPill: document.querySelector("#table-limit-pill"),
  bankrollLabel: document.querySelector("#bankroll-label"),
  betStatLabel: document.querySelector("#bet-stat-label"),
  roundStatLabel: document.querySelector("#round-stat-label"),
  shoeStatLabel: document.querySelector("#shoe-stat-label"),
  betInputLabel: document.querySelector("#bet-input-label"),
  rulesHeading: document.querySelector("#rules-heading"),
  rulesPill: document.querySelector("#rules-pill"),
  ruleList: document.querySelector("#rule-list"),
  dealerSeatLabel: document.querySelector("#dealer-seat-label"),
  dealerHeading: document.querySelector("#dealer-heading"),
  dealerTotal: document.querySelector("#dealer-total"),
  dealerCards: document.querySelector("#dealer-cards"),
  controls: document.querySelector("#controls"),
  tableStatus: document.querySelector("#table-status"),
  dealButton: document.querySelector("#deal-btn"),
  hitButton: document.querySelector("#hit-btn"),
  standButton: document.querySelector("#stand-btn"),
  doubleButton: document.querySelector("#double-btn"),
  splitButton: document.querySelector("#split-btn"),
  playerSeatLabel: document.querySelector("#player-seat-label"),
  playerHeading: document.querySelector("#player-heading"),
  playerSummary: document.querySelector("#player-summary"),
  playerHands: document.querySelector("#player-hands"),
  countHeading: document.querySelector("#count-heading"),
  countPill: document.querySelector("#count-pill"),
  runningCountLabel: document.querySelector("#running-count-label"),
  trueCountLabel: document.querySelector("#true-count-label"),
  cardsLeftLabel: document.querySelector("#cards-left-label"),
  cardsSeenLabel: document.querySelector("#cards-seen-label"),
  runningCount: document.querySelector("#running-count"),
  trueCount: document.querySelector("#true-count"),
  cardsLeft: document.querySelector("#cards-left"),
  cardsSeen: document.querySelector("#cards-seen"),
  shoeFill: document.querySelector("#shoe-fill"),
  shoeStatus: document.querySelector("#shoe-status"),
  shuffleFlag: document.querySelector("#shuffle-flag"),
  cutMarker: document.querySelector("#cut-marker"),
  shortcutsHeading: document.querySelector("#shortcuts-heading"),
  shortcutsPill: document.querySelector("#shortcuts-pill"),
  shortcutList: document.querySelector("#shortcut-list"),
  logHeading: document.querySelector("#log-heading"),
  logPill: document.querySelector("#log-pill"),
  logList: document.querySelector("#log-list"),
  sourcesHeading: document.querySelector("#sources-heading"),
  sourcesPill: document.querySelector("#sources-pill"),
  sourcesText: document.querySelector("#sources-text"),
  bankrollValue: document.querySelector("#bankroll-value"),
  betValue: document.querySelector("#bet-value"),
  betInput: document.querySelector("#bet-input"),
  roundValue: document.querySelector("#round-value"),
  shoeValue: document.querySelector("#shoe-value"),
  newShoeButton: document.querySelector("#new-shoe-btn"),
  toggleCountButton: document.querySelector("#toggle-count-btn"),
  chipRow: document.querySelector("#chip-row"),
  chipButtons: [...document.querySelectorAll(".chip-button")],
  langButtons: [...document.querySelectorAll(".lang-button")],
};

const state = {
  bankroll: STARTING_BANKROLL,
  currentBet: MIN_BET,
  roundNumber: 0,
  shoeNumber: 0,
  runningCount: 0,
  visibleCardsSeen: 0,
  countVisible: false,
  shufflePending: false,
  message: textKey("status.adjustBet"),
  shoe: [],
  round: null,
  log: [],
  nextHandId: 1,
  language: loadStoredLanguage(),
};

function init() {
  bindEvents();
  buildNewShoe(textKey("status.ready"));
  render();
}

function bindEvents() {
  dom.betInput.addEventListener("input", onBetInput);
  dom.dealButton.addEventListener("click", startRound);
  dom.hitButton.addEventListener("click", hitHand);
  dom.standButton.addEventListener("click", standHand);
  dom.doubleButton.addEventListener("click", doubleHand);
  dom.splitButton.addEventListener("click", splitHand);
  dom.newShoeButton.addEventListener("click", onManualNewShoe);
  dom.toggleCountButton.addEventListener("click", toggleCount);

  dom.chipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setBetValue(Number(button.dataset.bet));
    });
  });

  dom.langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchLanguage(button.dataset.lang);
    });
  });

  document.addEventListener("keydown", onKeydown);
}

function onBetInput(event) {
  setBetValue(Number(event.target.value));
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
  if (!LANGUAGES[nextLanguage] || state.language === nextLanguage) {
    return;
  }

  state.language = nextLanguage;
  storeLanguage(nextLanguage);
  render();
}

function onManualNewShoe() {
  const hadActiveRound = isRoundActive();
  if (hadActiveRound) {
    refundCancelledRound();
  }
  buildNewShoe(hadActiveRound ? textKey("status.manualNewShoeActive") : textKey("status.manualNewShoeIdle"));
}

function buildNewShoe(messageDescriptor) {
  state.shoe = shuffle(createShoe());
  state.runningCount = 0;
  state.visibleCardsSeen = 0;
  state.shufflePending = false;
  state.round = null;
  state.shoeNumber += 1;
  state.message = messageDescriptor;
  addLog(textKey("logs.shoeReady", { shoe: state.shoeNumber }));
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
          suitName: suit.name,
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

function normalizeBet(rawValue) {
  if (!Number.isFinite(rawValue)) {
    return state.currentBet;
  }

  const rounded = Math.round(rawValue / BET_STEP) * BET_STEP;
  return clamp(rounded, MIN_BET, MAX_BET);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setBetValue(nextValue) {
  state.currentBet = normalizeBet(nextValue);
  render();
}

function startRound() {
  if (isRoundActive()) {
    return;
  }

  if (state.bankroll < state.currentBet) {
    state.message = textKey("status.bankrollLow");
    render();
    return;
  }

  if (state.shufflePending || state.shoe.length <= CUT_CARD_REMAINING) {
    buildNewShoe(textKey("status.autoNewShoe"));
  }

  state.roundNumber += 1;
  state.bankroll -= state.currentBet;

  const openingHand = createHand({
    bet: state.currentBet,
    cards: [],
    fromSplit: false,
    isSplitAceHand: false,
    pendingDeal: false,
  });

  state.round = {
    phase: "dealing",
    dealer: { cards: [] },
    hands: [openingHand],
    activeHandIndex: 0,
    acesSplitUsed: false,
  };

  dealVisibleCard(openingHand);
  dealVisibleCard(state.round.dealer);
  dealVisibleCard(openingHand);
  dealHiddenCard(state.round.dealer);

  addLog(textKey("logs.roundStart", { round: state.roundNumber, bet: formatMoney(state.currentBet) }));
  afterInitialDeal();
  render();
}

function createHand({ bet, cards, fromSplit, isSplitAceHand, pendingDeal }) {
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
    addLog(textKey("logs.shoeEmpty"));
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
  const dealerHasNatural = hasBlackjack(state.round.dealer.cards, false);
  const playerHasNatural = hasBlackjack(state.round.hands[0].cards, false);

  if (dealerHasNatural) {
    revealDealerHoleCard();
    finishRound(textKey("status.dealerBlackjack"));
    return;
  }

  if (playerHasNatural) {
    revealDealerHoleCard();
    finishRound(textKey("status.playerBlackjack"));
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
    hand.result = textKey("handResult.bust");
    addLog(textKey("logs.handBust", { hand: state.round.activeHandIndex + 1 }));
    focusNextPlayableHand(state.round.activeHandIndex + 1);
    return;
  }

  if (total === 21) {
    hand.stood = true;
    hand.resolved = true;
    hand.result = textKey("handResult.autoStand21");
    addLog(textKey("logs.handAutoStand21", { hand: state.round.activeHandIndex + 1 }));
    focusNextPlayableHand(state.round.activeHandIndex + 1);
    return;
  }

  state.message = textKey("status.currentHandContinue", {
    hand: state.round.activeHandIndex + 1,
  });
  render();
}

function standHand() {
  const hand = getActiveHand();
  if (!canStand(hand)) {
    return;
  }

  hand.stood = true;
  hand.resolved = true;
  hand.result = textKey("handResult.stand");
  addLog(textKey("logs.handStand", { hand: state.round.activeHandIndex + 1 }));
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
  hand.result = total > 21 ? textKey("handResult.doubleBust") : textKey("handResult.doubleDone");

  addLog(textKey("logs.handDouble", {
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
  });
  const secondHand = createHand({
    bet: hand.bet,
    cards: [secondCard],
    fromSplit: true,
    isSplitAceHand: splittingAces,
    pendingDeal: !splittingAces,
  });

  round.hands.splice(round.activeHandIndex, 1, firstHand, secondHand);

  if (splittingAces) {
    round.acesSplitUsed = true;
    dealVisibleCard(firstHand);
    dealVisibleCard(secondHand);
    firstHand.stood = true;
    firstHand.resolved = true;
    firstHand.result = textKey("handResult.splitAcesAuto");
    secondHand.stood = true;
    secondHand.resolved = true;
    secondHand.result = textKey("handResult.splitAcesAuto");
    addLog(textKey("logs.splitAces"));
    focusNextPlayableHand(round.activeHandIndex);
    return;
  }

  dealVisibleCard(firstHand);
  addLog(textKey("logs.splitDone", { hand: round.activeHandIndex + 1 }));

  const { total } = getHandValue(firstHand.cards);
  if (total === 21) {
    firstHand.stood = true;
    firstHand.resolved = true;
    firstHand.result = textKey("handResult.autoStand21");
    focusNextPlayableHand(round.activeHandIndex + 1);
    return;
  }

  if (total > 21) {
    firstHand.busted = true;
    firstHand.resolved = true;
    firstHand.result = textKey("handResult.bust");
    focusNextPlayableHand(round.activeHandIndex + 1);
    return;
  }

  state.message = textKey("status.currentHandContinue", {
    hand: round.activeHandIndex + 1,
  });
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
      addLog(textKey("logs.secondCardDealt", { hand: index + 1 }));

      const { total } = getHandValue(hand.cards);
      if (total > 21) {
        hand.busted = true;
        hand.resolved = true;
        hand.result = textKey("handResult.bust");
      } else if (total === 21) {
        hand.stood = true;
        hand.resolved = true;
        hand.result = textKey("handResult.autoStand21");
      }
    }

    if (!hand.resolved) {
      round.phase = "player-turn";
      state.message = textKey("status.currentHandTurn", {
        hand: index + 1,
      });
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
    finishRound(textKey("status.dealerSkips"));
    return;
  }

  while (dealerShouldHit()) {
    dealVisibleCard(state.round.dealer);
  }

  finishRound(textKey("status.dealerDone"));
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

function finishRound(reasonDescriptor) {
  const round = state.round;
  const dealerValue = getHandValue(round.dealer.cards);
  const dealerBlackjack = hasBlackjack(round.dealer.cards, false);
  const dealerBust = dealerValue.total > 21;

  let wins = 0;
  let losses = 0;
  let pushes = 0;

  round.hands.forEach((hand) => {
    const handValue = getHandValue(hand.cards);
    const natural = hasBlackjack(hand.cards, hand.fromSplit);

    if (hand.busted) {
      hand.result = hand.result || textKey("handResult.bust");
      losses += 1;
      return;
    }

    if (dealerBlackjack) {
      if (natural) {
        state.bankroll += hand.bet;
        hand.result = textKey("handResult.push");
        pushes += 1;
      } else {
        hand.result = textKey("handResult.dealerBlackjack");
        losses += 1;
      }
      return;
    }

    if (natural) {
      state.bankroll += hand.bet * 2.5;
      hand.result = textKey("handResult.blackjackWin", { amount: formatMoney(hand.bet * 1.5) });
      wins += 1;
      return;
    }

    if (dealerBust || handValue.total > dealerValue.total) {
      state.bankroll += hand.bet * 2;
      hand.result = textKey("handResult.win", { amount: formatMoney(hand.bet) });
      wins += 1;
      return;
    }

    if (handValue.total === dealerValue.total) {
      state.bankroll += hand.bet;
      hand.result = textKey("handResult.push");
      pushes += 1;
      return;
    }

    hand.result = hand.result || textKey("handResult.lose");
    losses += 1;
  });

  round.phase = "round-over";
  state.shufflePending = state.shoe.length <= CUT_CARD_REMAINING;
  state.message = textKey("status.roundSummary", {
    reason: reasonDescriptor,
    wins,
    losses,
    pushes,
    shuffleNote: textKey(state.shufflePending ? "common.autoShuffleNote" : "common.noAutoShuffleNote"),
  });
  addLog(textKey("logs.roundEnd", { wins, losses, pushes }));
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

  if (hand.cards.length !== 2 || state.round.hands.length >= MAX_PLAYER_HANDS || state.bankroll < hand.bet) {
    return false;
  }

  const [first, second] = hand.cards;
  const keyA = splitRankKey(first.rank);
  const keyB = splitRankKey(second.rank);

  if (keyA !== keyB) {
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
    return tr("common.dealerTotalUnknown");
  }

  const dealerCards = state.round.dealer.cards;
  const hidden = dealerCards.some((card) => card.faceDown);

  if (hidden) {
    const visibleCards = dealerCards.filter((card) => !card.faceDown);
    const visibleValue = getHandValue(visibleCards).total;
    return tr("common.dealerUpcard", { total: visibleValue });
  }

  return tr("common.dealerTotal", { total: getHandValue(dealerCards).total });
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
  addLog(textKey("logs.cancelledRefund", { refund: formatMoney(refund) }));
}

function addLog(entry) {
  state.log.unshift(entry);
  state.log = state.log.slice(0, LOG_LIMIT);
}

function render() {
  renderStaticText();
  renderHeaderStats();
  renderDealer();
  renderPlayerHands();
  renderCountPanel();
  renderLog();
  renderControls();
  renderLanguageState();
}

function renderStaticText() {
  document.title = tr("meta.title");
  document.documentElement.lang = tr("meta.htmlLang");

  dom.heroEyebrow.textContent = tr("hero.eyebrow");
  dom.heroTitle.textContent = tr("hero.title");
  dom.heroText.textContent = tr("hero.text");

  dom.financeHeading.textContent = tr("sections.finance");
  dom.tableLimitPill.textContent = tr("pills.tableLimit");
  dom.bankrollLabel.textContent = tr("stats.bankroll");
  dom.betStatLabel.textContent = tr("stats.bet");
  dom.roundStatLabel.textContent = tr("stats.round");
  dom.shoeStatLabel.textContent = tr("stats.shoe");
  dom.betInputLabel.textContent = tr("stats.betInput");

  dom.rulesHeading.textContent = tr("sections.rules");
  dom.rulesPill.textContent = tr("pills.rules");

  dom.dealerSeatLabel.textContent = tr("zoneLabels.dealer");
  dom.dealerHeading.textContent = tr("sections.dealer");
  dom.playerSeatLabel.textContent = tr("zoneLabels.player");
  dom.playerHeading.textContent = tr("sections.player");

  dom.countHeading.textContent = tr("sections.count");
  dom.countPill.textContent = tr("pills.count");
  dom.runningCountLabel.textContent = tr("stats.runningCount");
  dom.trueCountLabel.textContent = tr("stats.trueCount");
  dom.cardsLeftLabel.textContent = tr("stats.cardsLeft");
  dom.cardsSeenLabel.textContent = tr("stats.cardsSeen");

  dom.shortcutsHeading.textContent = tr("sections.shortcuts");
  dom.shortcutsPill.textContent = tr("pills.shortcuts");
  dom.logHeading.textContent = tr("sections.logs");
  dom.logPill.textContent = tr("pills.logs");
  dom.sourcesHeading.textContent = tr("sections.sources");
  dom.sourcesPill.textContent = tr("pills.sources");
  dom.sourcesText.innerHTML = tr("sources.bodyHtml");

  dom.newShoeButton.textContent = tr("buttons.newShoe");
  dom.toggleCountButton.textContent = state.countVisible ? tr("buttons.hideCount") : tr("buttons.showCount");
  dom.dealButton.textContent = tr("buttons.deal");
  dom.hitButton.textContent = tr("buttons.hit");
  dom.standButton.textContent = tr("buttons.stand");
  dom.doubleButton.textContent = tr("buttons.double");
  dom.splitButton.textContent = tr("buttons.split");

  dom.chipRow.setAttribute("aria-label", tr("accessibility.quickBets"));
  dom.controls.setAttribute("aria-label", tr("accessibility.roundControls"));
  dom.cutMarker.setAttribute("title", tr("accessibility.cutMarker"));
  dom.cutMarker.setAttribute("aria-label", tr("accessibility.cutMarker"));
  dom.langButtons.forEach((button) => {
    button.setAttribute("aria-label", tr("accessibility.languageSwitch"));
  });

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
    const key = document.createElement("kbd");
    key.textContent = shortcut.key;
    item.appendChild(key);
    item.append(` ${tr(shortcut.actionKey)}`);
    dom.shortcutList.appendChild(item);
  });
}

function renderHeaderStats() {
  dom.bankrollValue.textContent = formatMoney(state.bankroll);
  dom.betValue.textContent = formatMoney(state.currentBet);
  dom.roundValue.textContent = String(state.roundNumber);
  dom.shoeValue.textContent = String(state.shoeNumber);
  dom.betInput.value = String(state.currentBet);
  dom.tableStatus.textContent = resolveText(state.message);
}

function renderDealer() {
  dom.dealerTotal.textContent = getVisibleDealerValueLabel();
  dom.dealerCards.replaceChildren();

  if (!state.round) {
    dom.dealerCards.appendChild(buildGhostCard(tr("common.waiting")));
    return;
  }

  state.round.dealer.cards.forEach((card) => {
    dom.dealerCards.appendChild(buildCardNode(card));
  });
}

function renderPlayerHands() {
  dom.playerHands.replaceChildren();

  if (!state.round) {
    dom.playerSummary.textContent = tr("playerSummary.waiting");
    dom.playerHands.appendChild(buildEmptyHand());
    return;
  }

  const activeIndex = state.round.activeHandIndex;
  dom.playerSummary.textContent = isRoundActive()
    ? tr("playerSummary.active", {
      count: state.round.hands.length,
      index: activeIndex + 1,
      indexLabel: handLabel(activeIndex + 1),
    })
    : tr("playerSummary.settled", { count: state.round.hands.length });

  state.round.hands.forEach((hand, index) => {
    const panel = document.createElement("article");
    panel.className = `hand-panel${index === activeIndex && state.round.phase === "player-turn" ? " active" : ""}`;

    const { total, soft } = getHandValue(hand.cards);
    const statusText = hand.result
      ? resolveText(hand.result)
      : hand.pendingDeal
        ? tr("common.awaitingSecondCard")
        : tr("common.inactiveHandStatus");

    panel.innerHTML = `
      <div class="hand-topline">
        <h3 class="hand-title">${tr("common.handNumber", { index: index + 1 })}</h3>
        <span class="tag info">${formatMoney(hand.bet)}</span>
      </div>
      <div class="hand-tags"></div>
      <div class="card-row compact"></div>
      <div class="hand-meta">
        ${tr("handMeta.total", { total, soft: soft && total <= 21 ? tr("common.softSuffix") : "" })}<br>
        ${tr("handMeta.state", { state: statusText })}
      </div>
    `;

    const tagHost = panel.querySelector(".hand-tags");
    const cardHost = panel.querySelector(".card-row");

    if (hand.fromSplit) {
      tagHost.appendChild(buildTag(tr("tags.split"), "info"));
    }
    if (hand.isSplitAceHand) {
      tagHost.appendChild(buildTag(tr("tags.splitAces"), "info"));
    }
    if (hand.doubled) {
      tagHost.appendChild(buildTag(tr("tags.doubled"), "info"));
    }
    if (hasBlackjack(hand.cards, hand.fromSplit)) {
      tagHost.appendChild(buildTag(tr("tags.blackjack"), "success"));
    } else if (hand.busted) {
      tagHost.appendChild(buildTag(tr("tags.bust"), "danger"));
    } else if (descriptorKey(hand.result) === "handResult.push") {
      tagHost.appendChild(buildTag(tr("tags.push"), "info"));
    } else if (isWinningResult(hand.result)) {
      tagHost.appendChild(buildTag(tr("tags.win"), "success"));
    }

    hand.cards.forEach((card) => {
      cardHost.appendChild(buildCardNode(card));
    });

    if (hand.pendingDeal) {
      cardHost.appendChild(buildGhostCard(tr("common.awaitingSecondCard")));
    }

    dom.playerHands.appendChild(panel);
  });
}

function renderCountPanel() {
  const runningText = state.countVisible ? formatCount(state.runningCount) : tr("common.hidden");
  const trueText = state.countVisible ? formatCount(Number(getTrueCount().toFixed(1))) : tr("common.hidden");
  const cardsDealt = DECK_COUNT * CARDS_PER_DECK - state.shoe.length;
  const shoePercent = ((state.shoe.length / (DECK_COUNT * CARDS_PER_DECK)) * 100).toFixed(1);

  dom.runningCount.textContent = runningText;
  dom.trueCount.textContent = trueText;
  dom.cardsLeft.textContent = String(state.shoe.length);
  dom.cardsSeen.textContent = String(cardsDealt);
  dom.shoeFill.style.width = `${shoePercent}%`;
  dom.shoeStatus.textContent = state.shoeNumber === 0
    ? tr("common.shoeStatusFresh")
    : state.shufflePending
      ? tr("common.countShuffleNext")
      : tr("common.countDecksRemaining", { decks: (state.shoe.length / CARDS_PER_DECK).toFixed(2) });
  dom.shuffleFlag.textContent = tr("common.cutCardLabel", { count: CUT_CARD_REMAINING });
}

function renderLog() {
  dom.logList.replaceChildren();

  if (state.log.length === 0) {
    const item = document.createElement("li");
    item.textContent = tr("common.noLogs");
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
  dom.dealButton.disabled = isRoundActive() || state.bankroll < state.currentBet;
  dom.hitButton.disabled = !canHit(hand);
  dom.standButton.disabled = !canStand(hand);
  dom.doubleButton.disabled = !canDouble(hand);
  dom.splitButton.disabled = !canSplit(hand);
}

function renderLanguageState() {
  dom.langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.language);
  });
}

function buildEmptyHand() {
  const panel = document.createElement("article");
  panel.className = "hand-panel";
  panel.innerHTML = `
    <div class="hand-topline">
      <h3 class="hand-title">${tr("common.handNumber", { index: 1 })}</h3>
      <span class="tag">${tr("handMeta.waitingBet")}</span>
    </div>
    <div class="card-row compact"></div>
    <div class="hand-meta">${tr("handMeta.waiting")}</div>
  `;

  panel.querySelector(".card-row").appendChild(buildGhostCard(tr("common.cardsDealtPlaceholder")));
  panel.querySelector(".card-row").appendChild(buildGhostCard(tr("common.cardsDealtPlaceholder")));
  return panel;
}

function buildCardNode(card) {
  const element = document.createElement("div");
  const classes = ["card"];

  if (card.faceDown) {
    classes.push("back");
    element.className = classes.join(" ");
    element.innerHTML = `
      <div class="card-corner">TV<span>${tr("common.down")}</span></div>
      <div class="card-center">21</div>
      <div class="card-corner">TV<span>${tr("common.down")}</span></div>
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
  const element = document.createElement("span");
  element.className = `tag${kind ? ` ${kind}` : ""}`;
  element.textContent = text;
  return element;
}

function formatMoney(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });
  return formatter.format(amount);
}

function formatCount(value) {
  if (value > 0) {
    return `+${value}`;
  }
  return `${value}`;
}

function textKey(key, params = {}) {
  return { key, params };
}

function resolveText(entry) {
  if (entry === null || entry === undefined) {
    return "";
  }

  if (typeof entry === "string") {
    return entry;
  }

  if (typeof entry === "object" && typeof entry.key === "string") {
    return tr(entry.key, entry.params);
  }

  return String(entry);
}

function tr(path, params = {}) {
  const value = getCopy(path);
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (_, token) => {
    if (!(token in params)) {
      return `{${token}}`;
    }

    const paramValue = params[token];
    return resolveText(paramValue);
  });
}

function getCopy(path) {
  const languageRoot = LANGUAGES[state.language];
  return path.split(".").reduce((current, segment) => current?.[segment], languageRoot);
}

function descriptorKey(entry) {
  return entry?.key || "";
}

function isWinningResult(entry) {
  return ["handResult.win", "handResult.blackjackWin"].includes(descriptorKey(entry));
}

function handLabel(index) {
  return tr("common.handOrdinal", { hand: index });
}

function loadStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_LANGUAGE_KEY);
    return LANGUAGES[stored] ? stored : "zh";
  } catch (error) {
    return "zh";
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem(STORAGE_LANGUAGE_KEY, language);
  } catch (error) {
    // Ignore storage failures in file:// or privacy-restricted contexts.
  }
}

init();
