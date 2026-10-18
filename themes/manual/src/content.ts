/*
 * Every word and figure of the help center lives here: the brand, the manual's chapters and
 * articles, troubleshooting flows, service status, community threads and the support team.
 * Rebranding the template means editing this file.
 */

export const brand = {
  name: "Counter",
  site: "Counter Manual",
  tagline:
    "Answers for the shop floor, written by the people who pick up the phone.",
  email: "support@counter.example",
  phone: "+1 555 014 2100",
  phoneHref: "tel:+15550142100",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export type NavLink = { to: string; label: string };

export const nav: NavLink[] = [
  { to: "/categories", label: "Contents" },
  { to: "/troubleshoot", label: "Troubleshoot" },
  { to: "/community", label: "Community" },
  { to: "/status", label: "Status" },
  { to: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "The manual",
    links: [
      { to: "/", label: "Search the manual" },
      { to: "/categories", label: "Contents" },
      { to: "/categories/getting-started", label: "Getting started" },
      { to: "/categories/hardware", label: "Hardware" },
      { to: "/search", label: "Search results" },
    ],
  },
  {
    title: "Get unstuck",
    links: [
      { to: "/troubleshoot", label: "Troubleshooter" },
      { to: "/community", label: "Community" },
      { to: "/contact", label: "Contact support" },
    ],
  },
  {
    title: "Counter",
    links: [
      { to: "/status", label: "System status" },
      { to: "/about", label: "About this manual" },
    ],
  },
];

export const newsletter = {
  title: "Release notes by email",
  text: "One short email when the register, the reader firmware or a fee changes. Roughly twice a month.",
};

/* ------------------------------------------------------------ home */

export const home = {
  title: "Find the fix, then get back to the counter.",
  lead: "The Counter Manual covers the register app, the reader and printer, payments and payouts, stock and staff. Describe what's wrong in your own words.",
  popularSearches: [
    "reader won't pair",
    "payout schedule",
    "refund",
    "receipt paper",
    "staff PIN",
  ],
  quickStart: {
    title: "Opening for the first time",
    text: "Most shops take their first real sale within an hour of unboxing. The full walkthrough is article 1.1; this is the short version.",
    steps: [
      {
        title: "Charge the reader",
        text: "Twenty minutes on the cable gives a full day of sales. The light bar turns solid white when it's ready.",
      },
      {
        title: "Pair it to the register",
        text: "Open the register app, go to **Settings › Hardware** and hold the reader's power button for three seconds.",
      },
      {
        title: "Add what you sell",
        text: "Type products in, scan their barcodes, or import a spreadsheet from your old system.",
      },
      {
        title: "Ring up a test sale",
        text: "Charge yourself $1.00 with your own card and refund it from **Sales › Today**. Nothing is billed.",
      },
    ],
  },
  shortcuts: {
    title: "Register shortcuts",
    text: "With a keyboard attached to the register, these work from any screen. Print the card and tape it beside the till.",
    keys: [
      { keys: ["N"], action: "Start a new sale" },
      { keys: ["/"], action: "Search products" },
      { keys: ["D"], action: "Discount the open sale" },
      { keys: ["C"], action: "Charge — opens tender options" },
      { keys: ["Ctrl", "P"], action: "Reprint the last receipt" },
      { keys: ["Ctrl", "R"], action: "Refund the last sale" },
      { keys: ["Ctrl", "D"], action: "Open the cash drawer" },
      { keys: ["Esc"], action: "Clear the cart or close a panel" },
      { keys: ["?"], action: "Show every shortcut" },
    ],
  },
  close: {
    title: "Still stuck? A person will pick this up.",
    text: "Our support team works from Portland, Toronto and Dublin, so someone is on shift from 7 am to 11 pm Eastern, seven days a week. Tell us what you've already tried and we'll start from there.",
  },
};

/* ------------------------------------------------------------ manual: chapters and articles */

export type Category = { slug: string; title: string; summary: string };

export const categories: Category[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    summary:
      "Unboxing, first sale, and moving your products and customers over from another system.",
  },
  {
    slug: "hardware",
    title: "Hardware",
    summary:
      "The Counter Reader, receipt printer, cash drawer and barcode scanner: pairing, lights, paper and parts.",
  },
  {
    slug: "payments",
    title: "Payments & payouts",
    summary:
      "When money reaches your bank, refunds, declined cards, and what to do when a customer disputes a charge.",
  },
  {
    slug: "inventory",
    title: "Products & stock",
    summary:
      "Products, variants and modifiers, stock counts, low-stock alerts and barcode labels.",
  },
  {
    slug: "team",
    title: "Staff & permissions",
    summary: "Roles, PINs, what each person can see, and clocking in and out.",
  },
  {
    slug: "billing",
    title: "Account & billing",
    summary:
      "Plans, processing fees, invoices, tax forms, and pausing or closing your account.",
  },
];

export type Figure = "reader" | "printer" | "payout";
export type Tone = "note" | "tip" | "caution";

/** Inline text supports `code`, **bold** for UI labels and [[Key]] for keycaps. */
export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "steps"; items: string[] }
  | { t: "list"; items: string[] }
  | { t: "callout"; tone: Tone; text: string }
  | { t: "figure"; figure: Figure; caption: string }
  | { t: "table"; head: string[]; rows: string[][] };

export type Article = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  updated: string;
  minutes: number;
  /** Reads in the last seven days. */
  reads: number;
  tags: string[];
  related: string[];
  body: Block[];
};

export const articles: Article[] = [
  /* 1 · Getting started */
  {
    slug: "set-up-counter",
    category: "getting-started",
    title: "Set up Counter in your shop",
    summary:
      "From a sealed box to your first real sale: account, reader, products and a $1 test charge.",
    updated: "2026-10-09",
    minutes: 6,
    reads: 2140,
    tags: ["setup", "new shop", "first sale", "unbox"],
    related: [
      "pair-card-reader",
      "add-products-and-variants",
      "move-from-another-pos",
    ],
    body: [
      {
        t: "p",
        text: "Set aside about an hour and do this before you open, not during a rush. You'll need the tablet or phone you plan to run the register on, your bank details, and the Counter Reader from the box.",
      },
      { t: "h", text: "What's in the box" },
      {
        t: "list",
        items: [
          "Counter Reader R2 with a USB-C cable",
          "Countertop dock (Shop and Multi-location plans)",
          "Two rolls of 80 mm thermal paper, if you ordered the P80 printer",
          "A quick-start card that points back to this article",
        ],
      },
      {
        t: "figure",
        figure: "reader",
        caption:
          "The Counter Reader R2. The light bar (1) shows pairing and battery state, the power button (2) is on the right edge, and USB-C (3) is on the bottom.",
      },
      { t: "h", text: "Create your account and verify your business" },
      {
        t: "steps",
        items: [
          "Download the Counter Register app and tap **Create a shop**.",
          "Enter your legal business name and address exactly as they appear on your tax registration.",
          "Add the bank account you want payouts sent to. We send two small deposits to confirm it; they arrive within one business day.",
          "Upload a photo of your ID when asked. Verification usually finishes in under ten minutes.",
        ],
      },
      {
        t: "callout",
        tone: "note",
        text: "You can take payments before your bank account is confirmed. The money is held safely and paid out with your first payout once verification finishes.",
      },
      { t: "h", text: "Pair the reader and add products" },
      {
        t: "steps",
        items: [
          "Charge the reader until the light bar is solid white, about 20 minutes from empty.",
          "In the register app, open **Settings › Hardware › Add a reader** and hold the power button for three seconds.",
          "Add at least one product under **Products › New product**, or import your list from a spreadsheet.",
          "Ring up a $1.00 sale, pay with your own card, then refund it from **Sales › Today**.",
        ],
      },
      {
        t: "callout",
        tone: "tip",
        text: "The test refund lands back on your card in 3–5 business days and you're never charged a fee for it.",
      },
    ],
  },
  {
    slug: "take-your-first-sale",
    category: "getting-started",
    title: "Take your first sale",
    summary:
      "Ring up items, apply a discount, take card or cash, and send or print the receipt.",
    updated: "2026-09-28",
    minutes: 4,
    reads: 1310,
    tags: ["sale", "checkout", "register", "receipt", "cash", "tip"],
    related: ["refund-a-sale", "load-receipt-paper", "staff-roles-and-pins"],
    body: [
      {
        t: "p",
        text: "Every sale follows the same four moves: build the cart, adjust it, take payment, hand over a receipt. With a keyboard attached, you can do all of it without touching the screen.",
      },
      {
        t: "steps",
        items: [
          "Tap products on the grid or press [[/]] to search. Scan a barcode to add it directly.",
          "Tap a line to change quantity or price, or press [[D]] to discount the whole sale.",
          "Press [[C]] or tap **Charge**. Choose **Card**, **Cash** or **Split**.",
          "For card, the reader lights up. For cash, enter the amount handed over and Counter shows the change due.",
          "Choose **Email**, **Text**, **Print** or **No receipt**.",
        ],
      },
      {
        t: "callout",
        tone: "tip",
        text: "Turn on tipping under **Settings › Checkout › Tips**. Customers pick 10, 15 or 20 percent on the reader, or enter their own amount.",
      },
      { t: "h", text: "If the customer changes their mind" },
      {
        t: "p",
        text: "Before payment, press [[Esc]] to clear the cart. After payment, refund it from the receipt screen or from **Sales › Today**; partial refunds are covered in article 3.2.",
      },
    ],
  },
  {
    slug: "move-from-another-pos",
    category: "getting-started",
    title: "Move to Counter from another point of sale",
    summary:
      "Export products and customers from your old system and import them with a spreadsheet.",
    updated: "2026-08-30",
    minutes: 5,
    reads: 640,
    tags: ["import", "csv", "spreadsheet", "migrate", "switch"],
    related: [
      "add-products-and-variants",
      "set-up-counter",
      "print-barcode-labels",
    ],
    body: [
      {
        t: "p",
        text: "Counter imports a plain CSV file. Most point-of-sale systems can export one from their reports or product screens. Export products and customers separately; sales history stays in your old system for your records.",
      },
      { t: "h", text: "Columns Counter understands" },
      {
        t: "table",
        head: ["Column", "Required", "Example"],
        rows: [
          ["name", "Yes", "Oat milk latte"],
          ["price", "Yes", "5.25"],
          ["sku", "No", "LAT-OAT-12"],
          ["barcode", "No", "0749281003412"],
          ["stock", "No", "40"],
          ["category", "No", "Coffee"],
          ["variant", "No", "12 oz"],
        ],
      },
      {
        t: "steps",
        items: [
          "In Counter on the web, open **Products › Import**.",
          "Drop your CSV file in, or choose it from your computer.",
          "Match any column Counter didn't recognise, then press **Preview**.",
          "Check the first twenty rows and press **Import**. Large files run in the background and email you when done.",
        ],
      },
      {
        t: "callout",
        tone: "caution",
        text: "Rows that share a name but have different `variant` values become one product with variants. Remove the variant column if you want them kept as separate products.",
      },
    ],
  },

  /* 2 · Hardware */
  {
    slug: "pair-card-reader",
    category: "hardware",
    title: "Pair the Counter Reader with a tablet or phone",
    summary:
      "Bluetooth pairing in four steps, and how to move a reader to a different register.",
    updated: "2026-10-14",
    minutes: 3,
    reads: 3870,
    tags: ["reader", "bluetooth", "pair", "connect", "R2"],
    related: [
      "reader-light-patterns",
      "set-up-counter",
      "take-your-first-sale",
    ],
    body: [
      {
        t: "p",
        text: "Each reader pairs with one register at a time. Pairing takes under a minute and only needs doing once per device.",
      },
      {
        t: "figure",
        figure: "reader",
        caption:
          "Hold the power button (2) for three seconds until the light bar (1) chases blue.",
      },
      {
        t: "steps",
        items: [
          "Make sure Bluetooth is on and the register app has permission to use it in your device settings.",
          "In the register app, open **Settings › Hardware › Add a reader**.",
          "Hold the reader's power button for three seconds. The light bar chases blue while it waits.",
          "Tap the reader's serial number when it appears. It ends in the four characters printed on the back.",
        ],
      },
      {
        t: "callout",
        tone: "note",
        text: "Pairing a reader to a new register unpairs it from the old one automatically. You don't need to forget it first.",
      },
      { t: "h", text: "When it doesn't show up" },
      {
        t: "p",
        text: "Stay within two metres, keep the reader off metal shelves, and check the light bar against the table in article 2.2. The reader troubleshooter walks through the remaining checks.",
      },
    ],
  },
  {
    slug: "reader-light-patterns",
    category: "hardware",
    title: "What the reader's lights mean",
    summary:
      "A reference for every light-bar pattern on the Counter Reader R2, from pairing to a failed update.",
    updated: "2026-10-02",
    minutes: 2,
    reads: 2960,
    tags: ["reader", "lights", "led", "battery", "firmware", "won't connect"],
    related: ["pair-card-reader", "reader-battery-and-firmware"],
    body: [
      {
        t: "p",
        text: "The four lights on top of the reader are its only screen. Read the colour first, then the movement.",
      },
      {
        t: "table",
        head: ["Pattern", "Meaning", "What to do"],
        rows: [
          [
            "One white light, breathing",
            "On, not paired",
            "Pair it from **Settings › Hardware**",
          ],
          [
            "Blue lights chasing",
            "Pairing mode",
            "Pick the reader in the register app",
          ],
          ["Solid white", "Paired and ready", "Nothing — take the payment"],
          ["Four green, then off", "Payment approved", "Nothing"],
          ["Amber, flashing", "Battery below 10%", "Charge for 20 minutes"],
          [
            "Red three times, then off",
            "Firmware update failed",
            "Leave on the cable for 10 minutes; it retries",
          ],
          [
            "No lights at all",
            "Battery empty or switched off",
            "Charge, then hold power for one second",
          ],
        ],
      },
      {
        t: "callout",
        tone: "caution",
        text: "If the lights flash red continuously and the reader won't switch off, don't open the case. Start a ticket; we replace readers under warranty for two years.",
      },
    ],
  },
  {
    slug: "reader-battery-and-firmware",
    category: "hardware",
    title: "Reader battery life and firmware updates",
    summary:
      "How long a charge lasts, when updates install, and how to check the version.",
    updated: "2026-09-12",
    minutes: 3,
    reads: 870,
    tags: ["reader", "battery", "charge", "firmware", "update", "version"],
    related: ["reader-light-patterns", "pair-card-reader"],
    body: [
      {
        t: "p",
        text: "A full charge covers about 400 tap payments or a ten-hour day. The reader sleeps after five minutes without a sale and wakes when the register starts a payment.",
      },
      { t: "h", text: "Updates" },
      {
        t: "p",
        text: "Firmware installs overnight when the reader is on its cable and paired. You'll see a quiet banner in the register app the next morning. To update straight away, open **Settings › Hardware**, tap the reader and choose **Update now**.",
      },
      {
        t: "table",
        head: ["Version", "Released", "Change"],
        rows: [
          [
            "`R2-5.4.1`",
            "Oct 6, 2026",
            "Faster wake from sleep; fixes rare double tap on Android",
          ],
          [
            "`R2-5.4.0`",
            "Sep 15, 2026",
            "Battery estimate shown in the register app",
          ],
          [
            "`R2-5.3.2`",
            "Aug 18, 2026",
            "Improved pairing next to Wi-Fi routers",
          ],
        ],
      },
      {
        t: "callout",
        tone: "note",
        text: "Readers older than `R2-5.0` can't take payments after December 31, 2026. Update them before the new year.",
      },
    ],
  },
  {
    slug: "load-receipt-paper",
    category: "hardware",
    title: "Load paper in the receipt printer",
    summary:
      "Which paper to buy for the P80, which way the roll goes in, and why receipts come out blank.",
    updated: "2026-10-11",
    minutes: 2,
    reads: 1980,
    tags: ["printer", "receipt", "paper", "blank", "P80", "thermal"],
    related: ["cash-drawer-not-opening", "take-your-first-sale"],
    body: [
      {
        t: "p",
        text: "The Counter Printer P80 uses thermal paper, which darkens with heat instead of ink. Thermal paper only prints on one side, so the direction of the roll matters.",
      },
      {
        t: "figure",
        figure: "printer",
        caption:
          "Open the lid with the release lever (1). Drop the roll in so paper feeds from underneath (2), toward the tear bar (3).",
      },
      {
        t: "steps",
        items: [
          "Press the lever on the right side to open the lid.",
          "Drop the roll in so the paper comes off the bottom and towards you.",
          "Pull about five centimetres of paper past the tear bar.",
          "Close the lid firmly until it clicks, then tear off the extra paper.",
        ],
      },
      {
        t: "table",
        head: ["Spec", "P80 printer"],
        rows: [
          ["Paper width", "80 mm"],
          ["Roll diameter", "Up to 80 mm"],
          ["Core", "12 mm"],
          ["Paper type", "Thermal, BPA-free recommended"],
        ],
      },
      {
        t: "callout",
        tone: "tip",
        text: "A blank receipt almost always means the roll is upside down. Flip it and print a test from **Settings › Hardware › Printer**.",
      },
    ],
  },
  {
    slug: "cash-drawer-not-opening",
    category: "hardware",
    title: "Cash drawer doesn't open after a cash sale",
    summary:
      "The drawer opens through the printer. Check the cable, the setting and the key lock.",
    updated: "2026-08-21",
    minutes: 2,
    reads: 720,
    tags: ["cash drawer", "printer", "cash", "won't open"],
    related: ["load-receipt-paper", "staff-roles-and-pins"],
    body: [
      {
        t: "p",
        text: "The cash drawer has no power of its own. It plugs into the port marked **DK** on the back of the receipt printer, and the printer sends it a short pulse when a cash sale finishes.",
      },
      {
        t: "steps",
        items: [
          "Check the drawer's key is turned to the open position, not locked.",
          "Make sure the drawer cable is in the printer's **DK** port, not the network port beside it.",
          "In **Settings › Hardware › Printer**, turn on **Open drawer for cash sales**.",
          "Press [[Ctrl]] + [[D]] on the register to test.",
        ],
      },
      {
        t: "callout",
        tone: "caution",
        text: "Staff without the **Open drawer** permission can't use the shortcut. That's deliberate; see article 5.1 if you need to change it.",
      },
    ],
  },

  /* 3 · Payments */
  {
    slug: "payout-schedule",
    category: "payments",
    title: "When will I get paid? Payout schedule explained",
    summary:
      "Next-business-day payouts, the 6 pm cutoff, weekends and bank holidays, and instant payouts.",
    updated: "2026-10-15",
    minutes: 4,
    reads: 4310,
    tags: ["payout", "deposit", "bank", "late", "schedule", "instant"],
    related: ["refund-a-sale", "plans-and-fees", "disputes-and-chargebacks"],
    body: [
      {
        t: "p",
        text: "Counter adds up every card sale taken before **6:00 pm Eastern** and sends it to your bank the next business day. Most banks show it by 9 am; some take until the end of the day.",
      },
      {
        t: "figure",
        figure: "payout",
        caption:
          "Sales from Friday after 6 pm, Saturday and Sunday are paid together on Monday's payout.",
      },
      {
        t: "table",
        head: ["Sales taken", "Paid out", "Usually in your bank"],
        rows: [
          ["Monday before 6 pm", "Tuesday", "Tuesday morning"],
          ["Thursday after 6 pm", "Monday", "Monday morning"],
          ["Friday after 6 pm to Sunday", "Monday", "Monday morning"],
          ["Before a bank holiday", "Next business day", "One day later"],
        ],
      },
      {
        t: "callout",
        tone: "tip",
        text: "Instant payouts send today's balance to an eligible debit card in about 30 minutes, any day of the week, for a 1.5% fee.",
      },
      { t: "h", text: "Your first payout" },
      {
        t: "p",
        text: "Your first payout can take up to three business days while we confirm your bank account. After that, the schedule above applies.",
      },
    ],
  },
  {
    slug: "refund-a-sale",
    category: "payments",
    title: "Refund all or part of a sale",
    summary:
      "Full and partial refunds, refunds to a different card, and how long they take to arrive.",
    updated: "2026-10-03",
    minutes: 3,
    reads: 2570,
    tags: ["refund", "return", "partial", "money back"],
    related: [
      "take-your-first-sale",
      "disputes-and-chargebacks",
      "payout-schedule",
    ],
    body: [
      {
        t: "steps",
        items: [
          "Open **Sales**, find the sale by date, amount or the last four digits of the card.",
          "Tap **Refund**. Choose the items being returned, or enter an amount for a partial refund.",
          "Pick a reason. It's printed on the refund receipt and shown in your reports.",
          "Tap **Refund $…** to confirm.",
        ],
      },
      {
        t: "callout",
        tone: "note",
        text: "Card refunds always go back to the card that paid. If the customer's card has been replaced, the bank forwards the money to the new one.",
      },
      {
        t: "p",
        text: "Refunds reach the customer in 3–5 business days. The processing fee from the original sale isn't returned, and the refund amount is taken from your next payout.",
      },
    ],
  },
  {
    slug: "declined-payments",
    category: "payments",
    title: "Why a card payment was declined",
    summary:
      "What each decline message means and what to say to the customer at the counter.",
    updated: "2026-09-19",
    minutes: 3,
    reads: 1650,
    tags: ["declined", "card", "error", "do not honor", "insufficient funds"],
    related: ["reader-light-patterns", "disputes-and-chargebacks"],
    body: [
      {
        t: "p",
        text: "A decline comes from the customer's bank, not from Counter. The bank sends a short code; we turn it into a message on the register. Ask for another card or cash, and never retry the same card more than twice.",
      },
      {
        t: "table",
        head: ["Code", "What the bank means", "What to say"],
        rows: [
          [
            "`do_not_honor`",
            "Declined without a reason",
            "“Your bank declined it. Do you have another card?”",
          ],
          [
            "`insufficient_funds`",
            "Not enough available",
            "“It didn't go through — another card?”",
          ],
          ["`incorrect_pin`", "PIN entered wrong", "Let them try once more"],
          ["`expired_card`", "Past its expiry date", "Ask for another card"],
          [
            "`card_not_supported`",
            "Card type not accepted",
            "Offer cash or another card",
          ],
          [
            "`offline_limit`",
            "Offline payments cap reached",
            "Reconnect to the internet; see article 3.4",
          ],
        ],
      },
      {
        t: "callout",
        tone: "caution",
        text: "Don't split a declined amount across several attempts on the same card. Banks treat that as a warning sign and may decline the card for the rest of the day.",
      },
    ],
  },
  {
    slug: "disputes-and-chargebacks",
    category: "payments",
    title: "Respond to a dispute or chargeback",
    summary:
      "What happens when a customer disputes a charge, the evidence that wins, and the deadlines.",
    updated: "2026-09-05",
    minutes: 5,
    reads: 590,
    tags: ["dispute", "chargeback", "evidence", "fraud"],
    related: ["refund-a-sale", "declined-payments", "payout-schedule"],
    body: [
      {
        t: "p",
        text: "When a customer asks their bank to reverse a charge, the bank takes the money back while it reviews the case. We email you the same day and show the dispute under **Payments › Disputes**.",
      },
      { t: "h", text: "Evidence that helps" },
      {
        t: "list",
        items: [
          "The receipt, which Counter attaches for you",
          "Proof of collection: a signature, a pickup note, or a delivery confirmation",
          "Any messages with the customer about the order",
          "Your returns policy, if it was shown at checkout or printed on the receipt",
        ],
      },
      {
        t: "callout",
        tone: "caution",
        text: "You have **7 calendar days** to respond in Counter. After that the bank decides without your evidence, which almost always means the customer wins.",
      },
      {
        t: "p",
        text: "If the bank sides with you, the money returns with your next payout. There's a $15 dispute fee either way, refunded if you win.",
      },
    ],
  },

  /* 4 · Products & stock */
  {
    slug: "add-products-and-variants",
    category: "inventory",
    title: "Add products, variants and modifiers",
    summary:
      "One product with sizes and colours, extras like oat milk, and when to use each.",
    updated: "2026-10-07",
    minutes: 4,
    reads: 1420,
    tags: ["products", "variants", "modifiers", "sizes", "options"],
    related: [
      "low-stock-alerts",
      "print-barcode-labels",
      "move-from-another-pos",
    ],
    body: [
      {
        t: "p",
        text: "Use a **variant** when the customer picks one version of a product and each version has its own stock: a T-shirt in S, M and L. Use a **modifier** for extras added to a sale that you don't count: oat milk, an extra shot, gift wrap.",
      },
      {
        t: "steps",
        items: [
          "Open **Products › New product** and give it a name and a base price.",
          "Under **Variants**, add an option such as Size, then its values. Counter creates one variant per combination.",
          "Give each variant its own price, SKU and stock count if they differ.",
          "Under **Modifiers**, attach a modifier set and choose whether it's required.",
        ],
      },
      {
        t: "callout",
        tone: "tip",
        text: "Up to 3 options and 100 variants fit on one product. Past that, split it into separate products in the same category.",
      },
    ],
  },
  {
    slug: "low-stock-alerts",
    category: "inventory",
    title: "Set low-stock alerts and reorder points",
    summary: "Get an email and a register badge before a bestseller runs out.",
    updated: "2026-09-24",
    minutes: 2,
    reads: 810,
    tags: ["stock", "inventory", "alerts", "reorder", "count"],
    related: ["add-products-and-variants", "print-barcode-labels"],
    body: [
      {
        t: "steps",
        items: [
          "Open a product and go to **Stock**.",
          "Set the **Alert at** number. We suggest a week of sales; Counter shows your seven-day average beside the field.",
          "Choose who gets the email under **Settings › Notifications › Low stock**.",
        ],
      },
      {
        t: "p",
        text: "When a variant reaches its alert number, it gets an amber badge in the register and appears on the **Reorder** list, which you can export as a purchase order.",
      },
      {
        t: "callout",
        tone: "note",
        text: "Stock counts only move for sales and refunds rung through Counter. Run a stock count after deliveries under **Products › Count stock**.",
      },
    ],
  },
  {
    slug: "print-barcode-labels",
    category: "inventory",
    title: "Print barcode labels",
    summary:
      "Generate barcodes for products that don't have one, and print them on standard label sheets.",
    updated: "2026-08-14",
    minutes: 3,
    reads: 460,
    tags: ["barcode", "labels", "scanner", "print", "sku"],
    related: ["add-products-and-variants", "low-stock-alerts"],
    body: [
      {
        t: "p",
        text: "Products imported without a barcode get one generated from their SKU. Print them on any A4 or US Letter label sheet with 30 labels per page, or on a dedicated label printer.",
      },
      {
        t: "steps",
        items: [
          "In Counter on the web, open **Products** and tick the products to label.",
          "Choose **Print labels** and set how many of each.",
          "Pick a sheet layout and press **Download PDF**.",
          "Print at 100% scale. Fit-to-page shrinks the bars and the scanner may not read them.",
        ],
      },
      {
        t: "table",
        head: ["Layout", "Labels per sheet", "Label size"],
        rows: [
          ["Letter 30-up", "30", "2.625 × 1 in"],
          ["A4 24-up", "24", "64 × 34 mm"],
          ["Roll, 2 in", "1 per label", "2 × 1 in"],
        ],
      },
    ],
  },

  /* 5 · Staff */
  {
    slug: "staff-roles-and-pins",
    category: "team",
    title: "Staff roles, permissions and PINs",
    summary:
      "Give each person a four-digit PIN and a role that matches what they actually do.",
    updated: "2026-10-12",
    minutes: 4,
    reads: 1190,
    tags: ["staff", "roles", "permissions", "pin", "employees"],
    related: ["timesheets", "cash-drawer-not-opening", "refund-a-sale"],
    body: [
      {
        t: "p",
        text: "Everyone who uses the register gets their own PIN, so sales, refunds and drawer opens are recorded against a name. Owners set roles under **Settings › Staff**.",
      },
      {
        t: "table",
        head: ["Permission", "Owner", "Manager", "Cashier"],
        rows: [
          ["Take payments", "Yes", "Yes", "Yes"],
          ["Discount a sale", "Yes", "Yes", "Up to 10%"],
          ["Refunds", "Yes", "Yes", "No"],
          ["Open drawer without a sale", "Yes", "Yes", "No"],
          ["Edit products and prices", "Yes", "Yes", "No"],
          ["See reports and payouts", "Yes", "Reports only", "No"],
          ["Manage staff and billing", "Yes", "No", "No"],
        ],
      },
      {
        t: "callout",
        tone: "tip",
        text: "Turn on **Ask for PIN after each sale** in busy shops where several people share one register.",
      },
      {
        t: "p",
        text: "If someone forgets their PIN, an owner or manager can reset it from **Settings › Staff**. The old PIN stops working immediately.",
      },
    ],
  },
  {
    slug: "timesheets",
    category: "team",
    title: "Clock in, clock out and export timesheets",
    summary:
      "Track shifts and breaks on the register and export hours for payroll.",
    updated: "2026-09-02",
    minutes: 3,
    reads: 530,
    tags: ["timesheets", "clock in", "shifts", "payroll", "hours"],
    related: ["staff-roles-and-pins", "plans-and-fees"],
    body: [
      {
        t: "steps",
        items: [
          "On the register's lock screen, tap **Clock in** and enter a PIN.",
          "Tap **Break** to start and end a break. Unpaid breaks are taken off the shift total.",
          "At the end of the shift, tap **Clock out**. Counter shows the hours and the shift's sales.",
        ],
      },
      {
        t: "p",
        text: "Owners can edit any shift and must add a reason, which is kept in the history. Export a pay period from **Reports › Timesheets** as CSV, ready for most payroll services.",
      },
      {
        t: "callout",
        tone: "note",
        text: "Timesheets are included on the Shop and Multi-location plans. On Starter you can view the last seven days but not export.",
      },
    ],
  },

  /* 6 · Billing */
  {
    slug: "plans-and-fees",
    category: "billing",
    title: "Plans, processing fees and invoices",
    summary:
      "What each plan costs, the fee on every card payment, and where to download invoices.",
    updated: "2026-10-01",
    minutes: 3,
    reads: 1730,
    tags: ["pricing", "plan", "fees", "invoice", "billing", "upgrade"],
    related: ["payout-schedule", "close-your-account", "timesheets"],
    body: [
      {
        t: "p",
        text: "You pay a monthly plan price plus a fee on each card payment. There's no contract; changes take effect at the start of the next billing month.",
      },
      {
        t: "table",
        head: ["Plan", "Monthly", "In-person card fee", "Online card fee"],
        rows: [
          ["Starter", "$0", "2.6% + 15¢", "2.9% + 30¢"],
          ["Shop", "$39", "2.4% + 15¢", "2.9% + 30¢"],
          ["Multi-location", "$89 per location", "2.3% + 15¢", "2.7% + 30¢"],
        ],
      },
      {
        t: "callout",
        tone: "note",
        text: "Fees are taken from each payout before it's sent, so the amount in your bank is already net of fees. The breakdown is under **Payments › Payouts**.",
      },
      {
        t: "p",
        text: "Invoices for your plan arrive by email on the 1st and are kept under **Settings › Billing**. Year-end 1099-K tax forms appear there by January 31.",
      },
    ],
  },
  {
    slug: "close-your-account",
    category: "billing",
    title: "Pause or close your account",
    summary:
      "Seasonal pause, closing for good, and what happens to your data and pending payouts.",
    updated: "2026-07-29",
    minutes: 3,
    reads: 290,
    tags: ["close", "cancel", "pause", "seasonal", "delete account"],
    related: ["plans-and-fees", "payout-schedule"],
    body: [
      {
        t: "p",
        text: "Seasonal shops can pause instead of closing. A paused account keeps your products, staff and history, charges no plan fee, and can't take payments until you resume.",
      },
      {
        t: "steps",
        items: [
          "Open **Settings › Billing › Plan**.",
          "Choose **Pause** and a resume date, or **Close account**.",
          "Download your sales and customer exports when prompted. They're available for 90 days after closing.",
        ],
      },
      {
        t: "callout",
        tone: "caution",
        text: "Open disputes and refunds can still be charged to your bank for up to 120 days after you close. Keep the bank account open until then.",
      },
    ],
  },
];

/* ------------------------------------------------------------ troubleshooter */

export type Step =
  | {
      kind: "ask";
      text: string;
      detail?: string;
      options: { label: string; next: string }[];
    }
  | { kind: "fix"; title: string; text: string; article?: string }
  | { kind: "escalate"; title: string; text: string; topic: string };

export type Flow = {
  id: string;
  title: string;
  summary: string;
  category: string;
  start: string;
  steps: Record<string, Step>;
};

export const flows: Flow[] = [
  {
    id: "reader",
    title: "Reader won't connect",
    summary:
      "The register can't find the reader, or it keeps dropping mid-sale.",
    category: "hardware",
    start: "lights",
    steps: {
      lights: {
        kind: "ask",
        text: "Are any lights showing on the reader?",
        detail:
          "Look at the four lights on top, not the screen of your tablet.",
        options: [
          { label: "No lights at all", next: "charge" },
          { label: "Amber, flashing", next: "charge" },
          { label: "Red, three times", next: "firmware" },
          { label: "White or blue", next: "bluetooth" },
        ],
      },
      charge: {
        kind: "ask",
        text: "Charge it for 20 minutes, then hold the power button for one second. Do the lights come on white?",
        options: [
          { label: "Yes, white", next: "bluetooth" },
          { label: "Still nothing", next: "cable" },
        ],
      },
      cable: {
        kind: "ask",
        text: "Try a different USB-C cable and wall plug. Does the reader light up now?",
        detail: "Laptop ports and some car chargers don't supply enough power.",
        options: [
          { label: "Yes", next: "bluetooth" },
          { label: "No", next: "replace" },
        ],
      },
      firmware: {
        kind: "fix",
        title: "Let the update finish",
        text: "Three red flashes mean a firmware update was interrupted. Leave the reader on its cable, paired, for ten minutes. It retries on its own and the light bar turns solid white when done.",
        article: "reader-battery-and-firmware",
      },
      bluetooth: {
        kind: "ask",
        text: "Is Bluetooth on, and does the register app have permission to use it?",
        detail:
          "On iPad: Settings › Privacy › Bluetooth. On Android: Apps › Counter › Permissions › Nearby devices.",
        options: [
          { label: "Yes, both on", next: "repair" },
          { label: "I fixed a setting", next: "retry" },
        ],
      },
      retry: {
        kind: "ask",
        text: "Close and reopen the register app. Is the reader connected now?",
        options: [
          { label: "Yes, it's working", next: "solved" },
          { label: "No", next: "repair" },
        ],
      },
      repair: {
        kind: "ask",
        text: "Remove the reader under Settings › Hardware, then pair it again while it's within two metres. Does it pair?",
        options: [
          { label: "Yes, but it drops later", next: "drops" },
          { label: "It never appears", next: "replace" },
          { label: "Yes, it's working", next: "solved" },
        ],
      },
      drops: {
        kind: "fix",
        title: "Move it away from interference",
        text: "Readers that pair but drop are usually next to a Wi-Fi router, a microwave or a metal shelf. Move the dock at least a metre away and keep the reader within two metres of the register.",
        article: "pair-card-reader",
      },
      solved: {
        kind: "fix",
        title: "You're back in business",
        text: "Glad that worked. If it happens again, the light-bar table helps you spot the cause in a few seconds.",
        article: "reader-light-patterns",
      },
      replace: {
        kind: "escalate",
        title: "This one needs us",
        text: "You've ruled out power, permissions and pairing. That points to the reader itself. Send us what you tried and we'll ship a replacement under warranty, usually the same day.",
        topic: "hardware",
      },
    },
  },
  {
    id: "payout",
    title: "Payout hasn't arrived",
    summary: "The money from yesterday's sales isn't in your bank yet.",
    category: "payments",
    start: "when",
    steps: {
      when: {
        kind: "ask",
        text: "When were the sales taken?",
        options: [
          { label: "Yesterday, before 6 pm ET", next: "today" },
          { label: "Yesterday, after 6 pm ET", next: "cutoff" },
          { label: "Over the weekend", next: "weekend" },
          { label: "More than three days ago", next: "status" },
        ],
      },
      cutoff: {
        kind: "fix",
        title: "It's in tomorrow's payout",
        text: "Sales after the 6 pm Eastern cutoff roll into the next business day's payout. Nothing is wrong; it will arrive one day later than the sales before cutoff.",
        article: "payout-schedule",
      },
      weekend: {
        kind: "fix",
        title: "Weekend sales are paid on Monday",
        text: "Banks don't move money on weekends or bank holidays. Everything from Friday evening to Sunday is paid out together on the next business day.",
        article: "payout-schedule",
      },
      today: {
        kind: "ask",
        text: "Is it after 5 pm in your time zone?",
        detail:
          "Most banks show payouts by 9 am, but some only post them at the end of the day.",
        options: [
          { label: "Not yet", next: "wait" },
          { label: "Yes, it's late", next: "status" },
        ],
      },
      wait: {
        kind: "fix",
        title: "Give your bank until the end of the day",
        text: "The payout left Counter this morning. Check the payout under Payments › Payouts: if it says Sent, your bank has it and will post it today.",
        article: "payout-schedule",
      },
      status: {
        kind: "ask",
        text: "Open Payments › Payouts. What does the payout say?",
        options: [
          { label: "Sent", next: "bank" },
          { label: "Paused", next: "paused" },
          { label: "Failed", next: "failed" },
        ],
      },
      bank: {
        kind: "escalate",
        title: "Let us trace it with your bank",
        text: "A payout marked Sent for more than a day has left Counter. We can send you a trace number your bank uses to find it. Tell us the payout date and amount.",
        topic: "payments",
      },
      paused: {
        kind: "escalate",
        title: "We need something from you",
        text: "Payouts pause when we need to verify a detail, often an ID or a large sale. The banner on your dashboard says what. If it's unclear, send us a ticket and a specialist will reply within four business hours.",
        topic: "payments",
      },
      failed: {
        kind: "fix",
        title: "Update your bank details",
        text: "A failed payout usually means the account was closed or a digit is wrong. Update it under Settings › Bank account; we retry the payout within one business day at no charge.",
        article: "payout-schedule",
      },
    },
  },
  {
    id: "printer",
    title: "Receipts print blank or not at all",
    summary: "The printer feeds paper but it's empty, or nothing happens.",
    category: "hardware",
    start: "feeds",
    steps: {
      feeds: {
        kind: "ask",
        text: "When you print, does paper come out?",
        options: [
          { label: "Yes, but it's blank", next: "flip" },
          { label: "Nothing happens", next: "power" },
        ],
      },
      flip: {
        kind: "fix",
        title: "Flip the paper roll",
        text: "Thermal paper only darkens on one side. Open the lid and drop the roll in so the paper comes off the bottom, toward you. Print a test from Settings › Hardware › Printer.",
        article: "load-receipt-paper",
      },
      power: {
        kind: "ask",
        text: "Is the green light on the front of the printer on?",
        options: [
          { label: "Green, steady", next: "connection" },
          { label: "Red or flashing", next: "lid" },
          { label: "No light", next: "nopower" },
        ],
      },
      lid: {
        kind: "fix",
        title: "Close the lid and check the paper",
        text: "A red light means the lid is open or the roll is empty. Press the lid down until it clicks. If the roll is under a centimetre thick, replace it.",
        article: "load-receipt-paper",
      },
      nopower: {
        kind: "escalate",
        title: "The printer isn't getting power",
        text: "If the power brick's own light is off too, the adapter has failed. We'll send a replacement adapter, free within the two-year warranty.",
        topic: "hardware",
      },
      connection: {
        kind: "ask",
        text: "Does Settings › Hardware › Printer show the printer as Connected?",
        options: [
          { label: "Connected", next: "toggle" },
          { label: "Not found", next: "network" },
        ],
      },
      toggle: {
        kind: "fix",
        title: "Turn on automatic printing",
        text: "The printer is fine, but receipts are set to print only on request. Turn on Print a receipt for every sale in Settings › Checkout.",
        article: "take-your-first-sale",
      },
      network: {
        kind: "escalate",
        title: "Let's look at your network together",
        text: "A powered printer that the register can't find is usually on a different Wi-Fi network or behind a guest network. A specialist can walk through it with you on a call.",
        topic: "hardware",
      },
    },
  },
];

/* ------------------------------------------------------------ status */

export const statusAsOf = "2026-10-18T09:40:00-04:00";

export type Component = {
  id: string;
  name: string;
  group: string;
  description: string;
};

export const statusComponents: Component[] = [
  {
    id: "card",
    name: "Card payments",
    group: "Payments",
    description: "Tap, chip and swipe at the counter",
  },
  {
    id: "online",
    name: "Online payments",
    group: "Payments",
    description: "Payment links and online store checkout",
  },
  {
    id: "payouts",
    name: "Payouts",
    group: "Payments",
    description: "Next-day and instant transfers to your bank",
  },
  {
    id: "register",
    name: "Register app",
    group: "Apps",
    description: "iPad, iPhone and Android",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    group: "Apps",
    description: "Counter on the web: reports, products, settings",
  },
  {
    id: "receipts",
    name: "Email & text receipts",
    group: "Apps",
    description: "Digital receipts sent after a sale",
  },
  {
    id: "firmware",
    name: "Reader updates",
    group: "Hardware",
    description: "Firmware delivery to Counter Readers",
  },
  {
    id: "api",
    name: "Developer API",
    group: "Developers",
    description: "REST API and webhooks",
  },
];

export type Impact = "minor" | "major" | "maintenance";
export type Update = {
  at: string;
  state:
    | "Investigating"
    | "Identified"
    | "Monitoring"
    | "Resolved"
    | "Scheduled"
    | "In progress"
    | "Completed";
  text: string;
};
export type Incident = {
  id: string;
  title: string;
  impact: Impact;
  components: string[];
  start: string;
  end?: string;
  summary: string;
  updates: Update[];
};

export const incidents: Incident[] = [
  {
    id: "2026-10-18-receipts",
    title: "Emailed receipts delayed",
    impact: "minor",
    components: ["receipts"],
    start: "2026-10-18T08:05:00-04:00",
    summary:
      "Emailed receipts are arriving up to 20 minutes late. Printed and texted receipts are not affected, and payments are working normally.",
    updates: [
      {
        at: "2026-10-18T09:32:00-04:00",
        state: "Monitoring",
        text: "Our email provider has cleared their backlog and delays are down to under two minutes. We're watching it before calling this resolved.",
      },
      {
        at: "2026-10-18T08:41:00-04:00",
        state: "Identified",
        text: "The delay is with our email delivery provider. Receipts are queued, not lost; every one will be delivered.",
      },
      {
        at: "2026-10-18T08:12:00-04:00",
        state: "Investigating",
        text: "Some shops report emailed receipts arriving late. Printed receipts are unaffected.",
      },
    ],
  },
  {
    id: "2026-10-22-maintenance",
    title: "Scheduled maintenance: dashboard reports",
    impact: "maintenance",
    components: ["dashboard"],
    start: "2026-10-22T02:00:00-04:00",
    end: "2026-10-22T03:00:00-04:00",
    summary:
      "Reports on the web dashboard will be read-only for up to one hour while we move them to a faster database. Payments and the register are not affected.",
    updates: [
      {
        at: "2026-10-15T12:00:00-04:00",
        state: "Scheduled",
        text: "Maintenance is planned for Thursday, October 22, 2:00–3:00 am Eastern.",
      },
    ],
  },
  {
    id: "2026-10-06-payouts",
    title: "Next-day payouts sent late",
    impact: "major",
    components: ["payouts"],
    start: "2026-10-06T06:10:00-04:00",
    end: "2026-10-06T13:45:00-04:00",
    summary:
      "Tuesday's next-day payouts left Counter about seven hours late because a scheduled job didn't start. All payouts arrived the same day.",
    updates: [
      {
        at: "2026-10-06T13:45:00-04:00",
        state: "Resolved",
        text: "All of today's payouts have been sent. Most banks will show them by end of day. We've added a second scheduler so one stalled job can't hold payouts again.",
      },
      {
        at: "2026-10-06T10:20:00-04:00",
        state: "Identified",
        text: "The overnight job that batches payouts didn't start. We've started it manually and payouts are going out now.",
      },
      {
        at: "2026-10-06T08:35:00-04:00",
        state: "Investigating",
        text: "Today's payouts haven't been sent yet. Your money is safe and the amounts are correct.",
      },
    ],
  },
  {
    id: "2026-09-27-reader-update",
    title: "Reader firmware R2-5.4.0 paused",
    impact: "minor",
    components: ["firmware"],
    start: "2026-09-27T14:00:00-04:00",
    end: "2026-09-28T11:30:00-04:00",
    summary:
      "We paused firmware R2-5.4.0 after some Android registers saw a duplicate tap prompt. Version R2-5.4.1 fixes it.",
    updates: [
      {
        at: "2026-09-28T11:30:00-04:00",
        state: "Resolved",
        text: "R2-5.4.1 is rolling out and fixes the duplicate prompt. Readers update overnight while charging.",
      },
      {
        at: "2026-09-27T14:00:00-04:00",
        state: "Identified",
        text: "We've paused the R2-5.4.0 rollout while we fix a duplicate tap prompt on some Android devices. Payments still complete normally.",
      },
    ],
  },
  {
    id: "2026-09-11-card",
    title: "Card payments failing for some Visa cards",
    impact: "major",
    components: ["card", "online"],
    start: "2026-09-11T12:18:00-04:00",
    end: "2026-09-11T12:51:00-04:00",
    summary:
      "For 33 minutes around lunchtime, about 1 in 8 Visa payments failed with a do_not_honor decline because of a network routing fault upstream of Counter.",
    updates: [
      {
        at: "2026-09-11T12:51:00-04:00",
        state: "Resolved",
        text: "Visa payments are succeeding normally. Customers who were declined weren't charged.",
      },
      {
        at: "2026-09-11T12:30:00-04:00",
        state: "Identified",
        text: "We've routed Visa traffic to our backup network while the primary route is repaired.",
      },
      {
        at: "2026-09-11T12:22:00-04:00",
        state: "Investigating",
        text: "Some Visa payments are being declined. Mastercard, Amex and Discover are unaffected.",
      },
    ],
  },
  {
    id: "2026-08-30-dashboard",
    title: "Dashboard slow to load",
    impact: "minor",
    components: ["dashboard", "api"],
    start: "2026-08-30T09:00:00-04:00",
    end: "2026-08-30T10:40:00-04:00",
    summary:
      "Reports and product pages took up to 30 seconds to load. Register and payments were unaffected.",
    updates: [
      {
        at: "2026-08-30T10:40:00-04:00",
        state: "Resolved",
        text: "Load times are back to normal after we added capacity to the reporting database.",
      },
      {
        at: "2026-08-30T09:15:00-04:00",
        state: "Investigating",
        text: "The dashboard is loading slowly for some shops.",
      },
    ],
  },
  {
    id: "2026-08-02-maintenance",
    title: "Scheduled maintenance: API upgrade",
    impact: "maintenance",
    components: ["api"],
    start: "2026-08-02T01:00:00-04:00",
    end: "2026-08-02T01:40:00-04:00",
    summary:
      "The developer API was upgraded to version 2026-08. Webhooks were queued and delivered after the window.",
    updates: [
      {
        at: "2026-08-02T01:40:00-04:00",
        state: "Completed",
        text: "Maintenance finished early. Queued webhooks have all been delivered.",
      },
      {
        at: "2026-07-26T12:00:00-04:00",
        state: "Scheduled",
        text: "API maintenance planned for Sunday, August 2, 1:00–2:00 am Eastern.",
      },
    ],
  },
  {
    id: "2026-07-24-register",
    title: "Register app sign-in errors on iPad",
    impact: "minor",
    components: ["register"],
    start: "2026-07-24T16:40:00-04:00",
    end: "2026-07-24T17:25:00-04:00",
    summary:
      "Staff signing in with a PIN on iPad saw an error after the 7.12 update. Registers already signed in kept working.",
    updates: [
      {
        at: "2026-07-24T17:25:00-04:00",
        state: "Resolved",
        text: "Version 7.12.1 is live in the App Store and fixes PIN sign-in.",
      },
      {
        at: "2026-07-24T16:50:00-04:00",
        state: "Identified",
        text: "PIN sign-in fails on iPad after 7.12. Don't sign out of registers that are working.",
      },
    ],
  },
];

/* ------------------------------------------------------------ community */

export type Reply = {
  author: string;
  shop?: string;
  staff?: boolean;
  at: string;
  votes: number;
  accepted?: boolean;
  text: string[];
};
export type Thread = {
  id: string;
  title: string;
  category: string;
  author: string;
  shop: string;
  at: string;
  votes: number;
  views: number;
  body: string[];
  replies: Reply[];
};

export const threads: Thread[] = [
  {
    id: "reader-drops-farmers-market",
    title: "Reader keeps disconnecting at the farmers market",
    category: "hardware",
    author: "Dana Whitcomb",
    shop: "Whitcomb Orchard",
    at: "2026-10-16T07:52:00-04:00",
    votes: 14,
    views: 412,
    body: [
      "We run a stall every Saturday and the reader drops off the iPad maybe four or five times a morning. It's fine back at the farm shop. Same reader, same iPad.",
      "Is this a known thing outdoors? We're on a phone hotspot for internet.",
    ],
    replies: [
      {
        author: "Malik Osei",
        shop: "Grindstone Coffee Cart",
        at: "2026-10-16T09:10:00-04:00",
        votes: 6,
        text: [
          "Had the same thing. Turned out my hotspot phone was sitting right on top of the reader in the cash box. Moved it to the other end of the table and it stopped.",
        ],
      },
      {
        author: "Ines Carvalho",
        staff: true,
        at: "2026-10-16T10:24:00-04:00",
        votes: 19,
        accepted: true,
        text: [
          "Malik's spot on. A phone sharing its hotspot is broadcasting hard on the same 2.4 GHz band the reader uses. Keep them at least a metre apart, and if your iPad supports it, switch the hotspot to 5 GHz (Maximize Compatibility off on iPhone).",
          "If it still drops, turn on Offline payments under Settings › Checkout so a lost connection never costs you a sale.",
        ],
      },
      {
        author: "Dana Whitcomb",
        shop: "Whitcomb Orchard",
        at: "2026-10-17T15:03:00-04:00",
        votes: 3,
        text: [
          "Moved the phone to the van dashboard and turned off Maximize Compatibility. Zero drops all morning. Thank you both.",
        ],
      },
    ],
  },
  {
    id: "tips-on-reader-not-showing",
    title: "Tip screen not showing on the reader",
    category: "payments",
    author: "Theo Lindqvist",
    shop: "Halfmoon Barbers",
    at: "2026-10-15T18:20:00-04:00",
    votes: 9,
    views: 288,
    body: [
      "I turned tipping on in settings but customers never see the tip options. Do I need a firmware update?",
    ],
    replies: [
      {
        author: "Ines Carvalho",
        staff: true,
        at: "2026-10-15T19:02:00-04:00",
        votes: 11,
        accepted: true,
        text: [
          "Tipping is set per register, so check it's on for the register the reader is paired with: Settings › Checkout › Tips on that device. Then it shows on the reader for every card sale over $1.",
        ],
      },
    ],
  },
  {
    id: "variant-stock-after-import",
    title: "Stock counts went to zero after importing variants",
    category: "inventory",
    author: "Ruth Abernathy",
    shop: "Thread & Needle",
    at: "2026-10-14T12:05:00-04:00",
    votes: 7,
    views: 196,
    body: [
      "Imported 300 yarn colours as variants and every one shows 0 in stock, but the CSV had numbers. What did I miss?",
    ],
    replies: [
      {
        author: "Joel Park",
        shop: "Park Paper Goods",
        at: "2026-10-14T13:40:00-04:00",
        votes: 4,
        text: [
          "Was your column called “Qty” or “quantity”? The importer only auto-matches “stock”. You can re-run the import and map it by hand on the matching screen; it updates instead of duplicating.",
        ],
      },
    ],
  },
  {
    id: "end-of-day-cash-count",
    title: "How do you all do the end-of-day cash count?",
    category: "team",
    author: "Joel Park",
    shop: "Park Paper Goods",
    at: "2026-10-12T20:45:00-04:00",
    votes: 21,
    views: 640,
    body: [
      "Looking for routines. Right now I count the drawer, write it on a sticky note and compare against the cash sales report the next morning. There has to be a better way.",
    ],
    replies: [
      {
        author: "Maya Brennan",
        shop: "Second Shelf Books",
        at: "2026-10-12T21:30:00-04:00",
        votes: 15,
        text: [
          "Use Close drawer on the register. It asks for the count by note and coin, works out the expected amount from cash sales and paid-outs, and logs the difference with whoever closed it. Ours is in the closing checklist taped by the till.",
        ],
      },
      {
        author: "Aaron Feld",
        shop: "Feld Hardware",
        at: "2026-10-13T08:12:00-04:00",
        votes: 5,
        text: [
          "Plus one. We also set a float of $150 so the next opener doesn't have to count it again.",
        ],
      },
    ],
  },
  {
    id: "instant-payout-weekend",
    title: "Are instant payouts worth it for weekend markets?",
    category: "payments",
    author: "Malik Osei",
    shop: "Grindstone Coffee Cart",
    at: "2026-10-10T16:00:00-04:00",
    votes: 5,
    views: 233,
    body: [
      "Thinking about using instant payouts on Sundays so I can buy beans Monday morning. 1.5% feels like a lot though. Anyone done the maths?",
    ],
    replies: [],
  },
  {
    id: "printer-logo-on-receipt",
    title: "Logo prints as a black box on receipts",
    category: "hardware",
    author: "Aaron Feld",
    shop: "Feld Hardware",
    at: "2026-10-08T11:15:00-04:00",
    votes: 12,
    views: 357,
    body: [
      "Uploaded our logo for receipts. On the P80 it comes out as a solid black rectangle. It looks fine in the preview.",
    ],
    replies: [
      {
        author: "Sam Okafor",
        staff: true,
        at: "2026-10-08T12:02:00-04:00",
        votes: 14,
        accepted: true,
        text: [
          "Thermal printers only do black and white, so a logo with a coloured or transparent background turns solid. Upload a black logo on a white background as a PNG, 576 pixels wide or less, and it will print crisp.",
        ],
      },
    ],
  },
  {
    id: "manager-refund-limit",
    title: "Can managers refund without me approving?",
    category: "team",
    author: "Maya Brennan",
    shop: "Second Shelf Books",
    at: "2026-10-05T09:30:00-04:00",
    votes: 8,
    views: 205,
    body: [
      "I want my two managers to handle refunds under $50 without calling me, but anything bigger should need my PIN. Possible?",
    ],
    replies: [
      {
        author: "Sam Okafor",
        staff: true,
        at: "2026-10-05T10:45:00-04:00",
        votes: 9,
        accepted: true,
        text: [
          "Yes. Under Settings › Staff › Manager, set Refund limit to $50. Above that, the register asks for an owner PIN before the refund goes through.",
        ],
      },
      {
        author: "Maya Brennan",
        shop: "Second Shelf Books",
        at: "2026-10-05T11:02:00-04:00",
        votes: 2,
        text: ["Perfect, done."],
      },
    ],
  },
  {
    id: "quarterly-tax-export",
    title: "Exporting sales tax by quarter for my accountant",
    category: "billing",
    author: "Ruth Abernathy",
    shop: "Thread & Needle",
    at: "2026-09-30T14:10:00-04:00",
    votes: 4,
    views: 150,
    body: [
      "My accountant wants taxable sales, tax collected and exempt sales per quarter. Which report has all three?",
    ],
    replies: [
      {
        author: "Aaron Feld",
        shop: "Feld Hardware",
        at: "2026-09-30T16:30:00-04:00",
        votes: 3,
        text: [
          "Reports › Sales tax, set the date range to the quarter, then Export. It has all three columns, split by tax rate if you collect more than one.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------ contact */

export const contact = {
  title: "Contact support",
  lead: "Tell us what happened and what you've tried. A real person reads every ticket, and we answer in the order that keeps shops trading: anything stopping payments goes to the top.",
  topics: [
    { value: "payments", label: "Payments & payouts" },
    { value: "hardware", label: "Reader, printer or drawer" },
    { value: "inventory", label: "Products & stock" },
    { value: "team", label: "Staff & permissions" },
    { value: "billing", label: "My plan or an invoice" },
    { value: "other", label: "Something else" },
  ],
  urgency: [
    {
      value: "down",
      label: "I can't take payments",
      hint: "We call you back within 15 minutes",
    },
    {
      value: "affected",
      label: "Something's wrong but I'm trading",
      hint: "Reply within 4 business hours",
    },
    {
      value: "question",
      label: "A question",
      hint: "Reply within 1 business day",
    },
  ],
  channels: [
    {
      name: "Tickets",
      detail: "This form, or email support@counter.example",
      hours: "Read 7 am – 11 pm ET, every day",
    },
    {
      name: "Phone",
      detail: "+1 555 014 2100 for Shop and Multi-location plans",
      hours: "8 am – 8 pm ET, Mon–Sat",
    },
    {
      name: "Urgent callback",
      detail: "Choose “I can't take payments” below",
      hours: "7 am – 11 pm ET, every day",
    },
  ],
};

/** Phone line hours in Eastern time, Sunday first; null = closed. */
export const phoneHours: ([string, string] | null)[] = [
  null,
  ["08:00", "20:00"],
  ["08:00", "20:00"],
  ["08:00", "20:00"],
  ["08:00", "20:00"],
  ["08:00", "20:00"],
  ["08:00", "20:00"],
];

/* ------------------------------------------------------------ about */

export const about = {
  title: "Written by the people who answer the phone",
  lead: "Every article in this manual started as a ticket. When three shops ask the same question in a week, the person who answered them writes it down here, and a second person tests it on a real register before it goes live.",
  principles: [
    {
      title: "Start with the fix",
      text: "The first paragraph tells you what to do. Background and edge cases come after, for the people who need them.",
    },
    {
      title: "Name every button the way it's labelled",
      text: "If the register says Settings › Hardware, so do we. When the app changes, the article changes the same week.",
    },
    {
      title: "Test on the shop floor",
      text: "Steps are checked on an iPad, an Android phone and a reader fresh out of the box, with the sound on.",
    },
    {
      title: "Say when it's our fault",
      text: "When something breaks on our side, the status page says so plainly, with times, until it's fixed.",
    },
  ],
  team: [
    {
      name: "Ines Carvalho",
      role: "Support lead, payments",
      base: "Dublin",
      since: "2021",
      languages: "English, Portuguese",
    },
    {
      name: "Sam Okafor",
      role: "Hardware specialist",
      base: "Toronto",
      since: "2022",
      languages: "English, French",
    },
    {
      name: "Hana Mori",
      role: "Documentation editor",
      base: "Portland",
      since: "2020",
      languages: "English, Japanese",
    },
    {
      name: "Luis Ferreira",
      role: "Support specialist, stock",
      base: "Toronto",
      since: "2023",
      languages: "English, Spanish",
    },
    {
      name: "Priya Raman",
      role: "Support specialist, billing",
      base: "Dublin",
      since: "2024",
      languages: "English, Tamil",
    },
    {
      name: "Owen Calloway",
      role: "Status & incident comms",
      base: "Portland",
      since: "2022",
      languages: "English",
    },
  ],
  commitments: [
    [
      "Urgent: can't take payments",
      "Callback in 15 minutes",
      "7 am – 11 pm ET, every day",
    ],
    [
      "Trading, but something's wrong",
      "Reply in 4 business hours",
      "7 am – 11 pm ET, every day",
    ],
    ["Questions", "Reply in 1 business day", "7 am – 11 pm ET, every day"],
    ["Article corrections", "Fixed in 2 business days", "Mon – Fri"],
  ] as [string, string, string][],
};
