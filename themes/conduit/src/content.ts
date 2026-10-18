/*
 * Conduit — every word, price and data point of the site lives here.
 * All brands, connectors, people and figures are fictional demonstration content.
 */

export const brand = {
  name: "Conduit",
  sector: "API integration platform",
  tagline: "One request format for every API your product touches.",
  email: "hello@conduit.example",
  sales: "sales@conduit.example",
  support: "support@conduit.example",
  phone: "+1 555 0163 400",
  phoneHref: "tel:+15550163400",
  address: [
    "Conduit Systems, Inc.",
    "88 Foundry Lane, Suite 4",
    "Portland, OR 97209",
  ],
  apiBase: "https://api.conduit.example/v2",
};

export const nav = [
  { to: "/platform", label: "Platform" },
  { to: "/connectors", label: "Connectors" },
  { to: "/console", label: "Console" },
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
  { to: "/status", label: "Status" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { to: "/platform", label: "Platform" },
      { to: "/connectors", label: "Connectors" },
      { to: "/console", label: "Request console" },
      { to: "/pricing", label: "Pricing" },
      { to: "/app", label: "Dashboard demo" },
    ],
  },
  {
    title: "Developers",
    links: [
      { to: "/docs", label: "Docs" },
      { to: "/changelog", label: "Changelog" },
      { to: "/status", label: "Status" },
      { to: "/signin", label: "Sign in" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/customers", label: "Customers" },
      { to: "/signup", label: "Create a workspace" },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

/* ───────────────────────── Connectors ───────────────────────── */

export type Wire =
  "lime" | "amber" | "cyan" | "coral" | "violet" | "sand" | "blue" | "steel";
export type Category =
  | "Payments"
  | "Commerce"
  | "CRM"
  | "Messaging"
  | "Accounting"
  | "Shipping"
  | "Data"
  | "Protocols";
export type Method = "GET" | "POST" | "PATCH" | "DELETE";
export type Plan = "Sandbox" | "Team" | "Scale";

export const categories: Category[] = [
  "Payments",
  "Commerce",
  "CRM",
  "Messaging",
  "Accounting",
  "Shipping",
  "Data",
  "Protocols",
];

/** Each category is a cable colour on the patch bay, the way an electrician colour-codes a run. */
export const wireOf: Record<Category, Wire> = {
  Payments: "amber",
  Commerce: "lime",
  CRM: "violet",
  Messaging: "cyan",
  Accounting: "sand",
  Shipping: "coral",
  Data: "blue",
  Protocols: "steel",
};

export type Action = {
  id: string;
  name: string;
  method: Method;
  path: string;
  summary: string;
  required: string[];
  body?: Record<string, unknown>;
  response: Record<string, unknown>;
};

export type Connector = {
  slug: string;
  name: string;
  code: string;
  category: Category;
  summary: string;
  description: string;
  auth: string;
  rateLimit: string;
  latency: number;
  plan: Plan;
  maintainer: "Conduit" | "Partner";
  installs: number;
  updated: string;
  scopes: string[];
  triggers: { event: string; summary: string }[];
  actions: Action[];
  setup: string[];
};

export const connectors: Connector[] = [
  {
    slug: "tillpoint",
    name: "Tillpoint",
    code: "TP",
    category: "Payments",
    summary:
      "Card payments, refunds and payouts for online and in-person sales.",
    description:
      "Charge cards, issue refunds and follow payouts without touching Tillpoint's SDK. Conduit stores the merchant's restricted key in the vault, adds idempotency keys to every write and turns Tillpoint's webhooks into signed, replayable events.",
    auth: "Restricted API key",
    rateLimit: "100 req/s per account",
    latency: 92,
    plan: "Sandbox",
    maintainer: "Conduit",
    installs: 18420,
    updated: "2026-09-30",
    scopes: ["charges:write", "refunds:write", "payouts:read"],
    triggers: [
      {
        event: "payment.succeeded",
        summary: "A charge was captured and funds are pending.",
      },
      {
        event: "refund.created",
        summary: "A full or partial refund was issued.",
      },
      {
        event: "payout.paid",
        summary: "A payout reached the merchant's bank account.",
      },
    ],
    actions: [
      {
        id: "create-charge",
        name: "Create a charge",
        method: "POST",
        path: "/tillpoint/charges",
        summary:
          "Captures a card payment. Amounts are in the smallest currency unit.",
        required: ["amount", "currency", "source"],
        body: {
          amount: 4800,
          currency: "usd",
          source: "card_test_visa",
          description: "Order ORD-2048",
        },
        response: {
          object: "charge",
          status: "succeeded",
          captured: true,
          fee: 169,
        },
      },
      {
        id: "refund",
        name: "Refund a charge",
        method: "POST",
        path: "/tillpoint/refunds",
        summary: "Refunds all or part of a captured charge.",
        required: ["charge"],
        body: {
          charge: "ch_8Fq21x",
          amount: 1200,
          reason: "requested_by_customer",
        },
        response: { object: "refund", status: "pending" },
      },
      {
        id: "balance",
        name: "Get balance",
        method: "GET",
        path: "/tillpoint/balance",
        summary: "Available and pending funds, per currency.",
        required: [],
        response: {
          object: "balance",
          available: [{ amount: 1284650, currency: "usd" }],
          pending: [{ amount: 90410, currency: "usd" }],
        },
      },
    ],
    setup: [
      "Create a restricted key in Tillpoint with charges, refunds and payouts scopes.",
      "Paste it into Vault → Tillpoint. Conduit checks the scopes before saving.",
      "Point your code at /tillpoint/* on the Conduit API — no Tillpoint SDK needed.",
    ],
  },
  {
    slug: "shelfwise",
    name: "Shelfwise",
    code: "SW",
    category: "Commerce",
    summary: "Orders, products and customers from Shelfwise storefronts.",
    description:
      "Read and update Shelfwise orders, sync the product catalogue and react to checkout events. Conduit flattens Shelfwise's nested GraphQL responses into the same order shape every commerce connector returns.",
    auth: "OAuth 2.0 (store owner)",
    rateLimit: "40 req/s, leaky bucket",
    latency: 118,
    plan: "Sandbox",
    maintainer: "Conduit",
    installs: 14210,
    updated: "2026-10-02",
    scopes: ["orders:read", "orders:write", "products:read"],
    triggers: [
      { event: "order.created", summary: "A customer completed checkout." },
      { event: "order.fulfilled", summary: "Every line item has shipped." },
      { event: "product.updated", summary: "Price, stock or title changed." },
    ],
    actions: [
      {
        id: "get-order",
        name: "Get an order",
        method: "GET",
        path: "/shelfwise/orders/ORD-2048",
        summary: "One order with line items, totals and customer.",
        required: [],
        response: {
          object: "order",
          id: "ORD-2048",
          total: 4800,
          currency: "usd",
          items: 3,
          status: "paid",
        },
      },
      {
        id: "tag-order",
        name: "Tag an order",
        method: "PATCH",
        path: "/shelfwise/orders/ORD-2048",
        summary: "Adds tags or notes used by your fulfilment rules.",
        required: ["tags"],
        body: { tags: ["gift", "priority"], note: "Pack with card" },
        response: { object: "order", id: "ORD-2048", status: "paid" },
      },
    ],
    setup: [
      "Click Connect Shelfwise and approve the requested scopes as the store owner.",
      "Choose which stores this workspace may read.",
      "Subscribe to order.created from Events to start receiving checkouts.",
    ],
  },
  {
    slug: "hearth",
    name: "Hearth CRM",
    code: "HC",
    category: "CRM",
    summary: "Contacts, companies and deals in Hearth's sales pipeline.",
    description:
      "Upsert contacts by email, move deals between stages and log activity. Conduit de-duplicates contacts on email before writing, so retries never create twins.",
    auth: "OAuth 2.0",
    rateLimit: "25 req/s per portal",
    latency: 146,
    plan: "Team",
    maintainer: "Conduit",
    installs: 9870,
    updated: "2026-09-12",
    scopes: ["contacts:write", "deals:write"],
    triggers: [
      { event: "contact.created", summary: "A new person entered the CRM." },
      {
        event: "deal.stage_changed",
        summary: "A deal moved to another pipeline stage.",
      },
    ],
    actions: [
      {
        id: "upsert-contact",
        name: "Upsert a contact",
        method: "POST",
        path: "/hearth/contacts",
        summary: "Creates a contact or updates the one with the same email.",
        required: ["email"],
        body: {
          email: "mara.lind@example.com",
          first_name: "Mara",
          company: "Northbank Tea",
        },
        response: { object: "contact", created: false, owner: "usr_ren" },
      },
      {
        id: "move-deal",
        name: "Move a deal",
        method: "PATCH",
        path: "/hearth/deals/dl_5521",
        summary: "Changes a deal's stage and records who moved it.",
        required: ["stage"],
        body: { stage: "proposal_sent" },
        response: { object: "deal", id: "dl_5521", amount: 1800000 },
      },
    ],
    setup: [
      "Connect Hearth with an admin account.",
      "Map custom contact properties in Transform if your portal uses them.",
      "Turn on de-duplication by email (on by default).",
    ],
  },
  {
    slug: "chatterbox",
    name: "Chatterbox",
    code: "CB",
    category: "Messaging",
    summary: "Post messages and alerts into team channels.",
    description:
      "Send formatted messages, threads and interactive buttons to Chatterbox channels. Conduit queues bursts so an incident at 3 a.m. doesn't hit Chatterbox's per-channel limit.",
    auth: "Bot token",
    rateLimit: "1 msg/s per channel",
    latency: 74,
    plan: "Sandbox",
    maintainer: "Partner",
    installs: 21530,
    updated: "2026-08-21",
    scopes: ["chat:write", "channels:read"],
    triggers: [
      {
        event: "message.reaction_added",
        summary: "Someone reacted to a message the bot posted.",
      },
    ],
    actions: [
      {
        id: "post-message",
        name: "Post a message",
        method: "POST",
        path: "/chatterbox/messages",
        summary: "Posts text to a channel, optionally in a thread.",
        required: ["channel", "text"],
        body: {
          channel: "#orders",
          text: "New order ORD-2048 · $48.00 · 3 items",
        },
        response: { object: "message", ok: true, ts: "1760781023.0042" },
      },
    ],
    setup: [
      "Install the Conduit bot to your Chatterbox space.",
      "Invite the bot to every channel it should post in.",
      "Use channel names; Conduit resolves them to ids and caches the lookup.",
    ],
  },
  {
    slug: "quillbook",
    name: "Quillbook",
    code: "QB",
    category: "Accounting",
    summary: "Invoices, payments and journal entries in Quillbook ledgers.",
    description:
      "Create invoices from orders, mark them paid when money lands and post journal entries for fees. Conduit converts currency amounts to Quillbook's decimal strings and back.",
    auth: "OAuth 2.0",
    rateLimit: "10 req/s per ledger",
    latency: 204,
    plan: "Team",
    maintainer: "Conduit",
    installs: 6340,
    updated: "2026-09-26",
    scopes: ["invoices:write", "journal:write"],
    triggers: [
      { event: "invoice.paid", summary: "An invoice was fully paid." },
      { event: "invoice.overdue", summary: "An invoice passed its due date." },
    ],
    actions: [
      {
        id: "create-invoice",
        name: "Create an invoice",
        method: "POST",
        path: "/quillbook/invoices",
        summary: "Drafts an invoice against a customer with line items.",
        required: ["customer", "lines"],
        body: {
          customer: "Northbank Tea",
          lines: [{ description: "Tea tins, 24", amount: 4800 }],
          due_in_days: 14,
        },
        response: { object: "invoice", number: "INV-1187", status: "draft" },
      },
      {
        id: "list-overdue",
        name: "List overdue invoices",
        method: "GET",
        path: "/quillbook/invoices?status=overdue",
        summary: "Invoices past due, oldest first.",
        required: [],
        response: {
          object: "list",
          count: 2,
          data: [
            { number: "INV-1104", days_overdue: 9 },
            { number: "INV-1131", days_overdue: 3 },
          ],
        },
      },
    ],
    setup: [
      "Connect Quillbook and pick the ledger this workspace writes to.",
      "Choose a default income account for invoice lines.",
      "Optional: map tax codes per region in Transform.",
    ],
  },
  {
    slug: "ferryline",
    name: "Ferryline",
    code: "FL",
    category: "Shipping",
    summary: "Rates, labels and tracking across Ferryline's carrier network.",
    description:
      "Quote rates, buy labels and follow parcels through Ferryline. Conduit normalises tracking states into seven statuses, so 'out for delivery' means the same thing from every carrier.",
    auth: "API key",
    rateLimit: "50 req/s",
    latency: 168,
    plan: "Team",
    maintainer: "Partner",
    installs: 7715,
    updated: "2026-10-09",
    scopes: ["labels:write", "tracking:read"],
    triggers: [
      {
        event: "shipment.in_transit",
        summary: "The carrier scanned the parcel.",
      },
      {
        event: "shipment.delivered",
        summary: "Proof of delivery was recorded.",
      },
    ],
    actions: [
      {
        id: "create-label",
        name: "Buy a label",
        method: "POST",
        path: "/ferryline/labels",
        summary: "Buys the cheapest label that meets the delivery window.",
        required: ["to_zip", "weight_g"],
        body: { to_zip: "97209", weight_g: 860, service: "ground" },
        response: {
          object: "label",
          carrier: "Ferryline Ground",
          cost: 742,
          tracking: "FL4410020981",
        },
      },
      {
        id: "track",
        name: "Track a parcel",
        method: "GET",
        path: "/ferryline/tracking/FL4410020981",
        summary: "Latest normalised status and scan history.",
        required: [],
        response: {
          object: "tracking",
          status: "in_transit",
          eta: "2026-10-21",
          scans: 4,
        },
      },
    ],
    setup: [
      "Paste your Ferryline API key into the vault.",
      "Set a default ship-from address.",
      "Subscribe to shipment.* events to update customers automatically.",
    ],
  },
  {
    slug: "stockroom",
    name: "Stockroom",
    code: "SR",
    category: "Commerce",
    summary: "Inventory levels across warehouses and shelves.",
    description:
      "Read stock by SKU and location, reserve units for open orders and adjust counts after a cycle count. Conduit serialises writes per SKU to avoid overselling during a rush.",
    auth: "API key + account id",
    rateLimit: "20 req/s",
    latency: 131,
    plan: "Team",
    maintainer: "Partner",
    installs: 3980,
    updated: "2026-07-18",
    scopes: ["inventory:read", "inventory:write"],
    triggers: [
      { event: "stock.low", summary: "A SKU fell below its reorder point." },
    ],
    actions: [
      {
        id: "get-stock",
        name: "Get stock for a SKU",
        method: "GET",
        path: "/stockroom/stock/TIN-24-OOLONG",
        summary: "On-hand, reserved and available units per location.",
        required: [],
        response: {
          object: "stock",
          sku: "TIN-24-OOLONG",
          on_hand: 412,
          reserved: 38,
          available: 374,
        },
      },
      {
        id: "reserve",
        name: "Reserve units",
        method: "POST",
        path: "/stockroom/reservations",
        summary: "Holds units against an order for up to 48 hours.",
        required: ["sku", "quantity"],
        body: { sku: "TIN-24-OOLONG", quantity: 3, order: "ORD-2048" },
        response: { object: "reservation", expires_in_h: 48 },
      },
    ],
    setup: [
      "Generate an API key under Stockroom → Integrations.",
      "Enter the key and your account id.",
      "Pick the warehouse that fulfils online orders.",
    ],
  },
  {
    slug: "mailroom",
    name: "Mailroom",
    code: "MR",
    category: "Messaging",
    summary: "Transactional email with templates and delivery events.",
    description:
      "Send receipts, password resets and shipping notices through Mailroom templates. Conduit records every send with its template version so you can answer 'what did this customer actually receive?'",
    auth: "API key",
    rateLimit: "300 msg/s",
    latency: 61,
    plan: "Sandbox",
    maintainer: "Conduit",
    installs: 16050,
    updated: "2026-10-05",
    scopes: ["mail:send", "events:read"],
    triggers: [
      {
        event: "email.bounced",
        summary: "The receiving server rejected the message.",
      },
      { event: "email.opened", summary: "A recipient opened the message." },
    ],
    actions: [
      {
        id: "send",
        name: "Send a template",
        method: "POST",
        path: "/mailroom/send",
        summary: "Renders a template with your data and sends it.",
        required: ["to", "template"],
        body: {
          to: "mara.lind@example.com",
          template: "receipt-v3",
          data: { order: "ORD-2048", total: "$48.00" },
        },
        response: { object: "email", status: "queued" },
      },
    ],
    setup: [
      "Verify a sending domain in Mailroom.",
      "Add the API key to the vault.",
      "Reference templates by slug; versions are pinned on first send.",
    ],
  },
  {
    slug: "rota",
    name: "Rota",
    code: "RT",
    category: "CRM",
    summary: "Staff, shifts and availability from Rota schedules.",
    description:
      "Look up who is on shift, publish new shifts and react to swaps. Useful for routing support tickets or deliveries to whoever is actually working.",
    auth: "OAuth 2.0",
    rateLimit: "15 req/s",
    latency: 177,
    plan: "Scale",
    maintainer: "Partner",
    installs: 1460,
    updated: "2026-06-30",
    scopes: ["shifts:read", "shifts:write"],
    triggers: [
      { event: "shift.swapped", summary: "Two people traded a shift." },
    ],
    actions: [
      {
        id: "on-shift",
        name: "Who is on shift",
        method: "GET",
        path: "/rota/shifts/current?team=support",
        summary: "People working right now, with their roles.",
        required: [],
        response: {
          object: "list",
          data: [
            { name: "Ines Varga", role: "Lead" },
            { name: "Theo Park", role: "Agent" },
          ],
        },
      },
    ],
    setup: [
      "Connect Rota as a scheduler admin.",
      "Select the teams Conduit may read.",
      "Shift times are returned in UTC.",
    ],
  },
  {
    slug: "sql-warehouse",
    name: "SQL Warehouse",
    code: "SQ",
    category: "Data",
    summary: "Write events and records into any Postgres-compatible warehouse.",
    description:
      "Stream every request and webhook into tables you own. Conduit creates the schema, batches inserts every few seconds and backfills from logs when the warehouse was down.",
    auth: "Connection string (TLS required)",
    rateLimit: "Batched, 5k rows/s",
    latency: 38,
    plan: "Scale",
    maintainer: "Conduit",
    installs: 4120,
    updated: "2026-10-11",
    scopes: ["insert", "create table"],
    triggers: [],
    actions: [
      {
        id: "insert-rows",
        name: "Insert rows",
        method: "POST",
        path: "/sql-warehouse/tables/orders/rows",
        summary: "Appends rows; unknown columns are added as nullable.",
        required: ["rows"],
        body: {
          rows: [
            {
              order_id: "ORD-2048",
              total_cents: 4800,
              placed_at: "2026-10-18T09:12:00Z",
            },
          ],
        },
        response: { object: "insert", inserted: 1, table: "orders" },
      },
    ],
    setup: [
      "Allow Conduit's egress IPs on your warehouse.",
      "Create a role with INSERT and CREATE on one schema.",
      "Paste the connection string. Conduit refuses non-TLS connections.",
    ],
  },
  {
    slug: "sftp-drop",
    name: "SFTP Drop",
    code: "SF",
    category: "Protocols",
    summary: "Pick up and deliver files on partners' SFTP servers.",
    description:
      "For partners who still run on nightly CSVs. Conduit polls a directory, parses each file into records and emits one event per row — or writes your records back out as a file.",
    auth: "SSH key pair",
    rateLimit: "Polls every 5 min",
    latency: 410,
    plan: "Scale",
    maintainer: "Conduit",
    installs: 2210,
    updated: "2026-05-14",
    scopes: ["read", "write"],
    triggers: [
      {
        event: "file.received",
        summary: "A new file appeared in the watched folder.",
      },
    ],
    actions: [
      {
        id: "upload",
        name: "Upload a file",
        method: "POST",
        path: "/sftp-drop/files",
        summary: "Writes records as CSV to the partner's inbox folder.",
        required: ["path", "records"],
        body: {
          path: "/inbox/orders-2026-10-18.csv",
          records: [{ sku: "TIN-24-OOLONG", qty: 3 }],
        },
        response: { object: "file", bytes: 64, checksum: "sha256:9c1e…" },
      },
    ],
    setup: [
      "Download Conduit's public key and add it to the partner's authorized_keys.",
      "Enter host, port and the folders to watch and write.",
      "Describe the CSV columns once in Transform.",
    ],
  },
  {
    slug: "webhook-inbox",
    name: "Webhook Inbox",
    code: "WH",
    category: "Protocols",
    summary: "Receive any webhook, verify it and turn it into a Conduit event.",
    description:
      "A stable URL for services Conduit doesn't have a connector for yet. Signatures are verified with your secret, payloads are stored for 30 days and can be replayed into your app with one call.",
    auth: "HMAC signing secret",
    rateLimit: "500 req/s burst",
    latency: 22,
    plan: "Sandbox",
    maintainer: "Conduit",
    installs: 25890,
    updated: "2026-10-14",
    scopes: ["events:write"],
    triggers: [
      {
        event: "webhook.received",
        summary: "A verified payload arrived at your inbox URL.",
      },
    ],
    actions: [
      {
        id: "replay",
        name: "Replay an event",
        method: "POST",
        path: "/webhook-inbox/events/evt_7Kd02/replay",
        summary: "Delivers a stored payload to your endpoint again.",
        required: ["destination"],
        body: { destination: "https://shop.example/hooks/conduit" },
        response: { object: "delivery", status: "delivered", attempt: 1 },
      },
    ],
    setup: [
      "Create an inbox and copy its URL.",
      "Paste the URL into the sending service.",
      "Add the sender's signing secret so Conduit can verify payloads.",
    ],
  },
];

/* ───────────────────────── Pages ───────────────────────── */

export const home = {
  title: "Conduit — API integration platform",
  hero: {
    heading: "Every API your product needs, through one conduit.",
    lede: "Connect payments, storefronts, CRMs and ledgers with one request format, one auth vault and one log. Send a real-shaped request from this console — it runs in your browser.",
    primary: { to: "/signup", label: "Create a free workspace" },
    secondary: { to: "/console", label: "Open the full console" },
  },
  patch: {
    heading: "Wire it once. Swap the far end whenever you like.",
    body: "Your code speaks Conduit. Conduit speaks Tillpoint, Shelfwise, Quillbook and the rest — including their quirks, pagination styles and retry rules. Change accounting software and your order code doesn't move.",
  },
  directory: {
    heading: "Connectors that behave the same way",
    body: "Same auth flow, same errors, same pagination, same event names. Pick one to see its triggers, actions and an example call.",
    link: { to: "/connectors", label: "Browse the directory" },
  },
  path: {
    heading: "What happens between your request and theirs",
    steps: [
      {
        name: "Authenticate",
        ms: "~3 ms",
        text: "Your workspace key is checked, then swapped for the customer's stored credential. Tokens refresh before they expire, not after.",
      },
      {
        name: "Transform",
        ms: "~4 ms",
        text: "Your payload is validated against the connector's schema and mapped to the upstream shape. Missing fields fail here, with the field named.",
      },
      {
        name: "Deliver",
        ms: "upstream",
        text: "The call leaves from the region nearest the provider, with an idempotency key on every write.",
      },
      {
        name: "Retry",
        ms: "if needed",
        text: "429s and 5xx responses back off exponentially with jitter. Your code sees one response, not the drama.",
      },
      {
        name: "Record",
        ms: "always",
        text: "Request, response, timings and attempts land in the log for 30 days — searchable and replayable.",
      },
    ],
  },
  code: {
    heading: "Ten lines from install to first call",
    body: "The SDK is a thin, typed client over plain HTTPS. Use it, or call the REST API from anything that can send JSON.",
    link: { to: "/docs", label: "Read the quickstart" },
  },
  quote: {
    text: "We replaced four payment and shipping SDKs with one client. The week our label provider changed, we edited a connection in the dashboard and shipped nothing.",
    name: "Priya Anand",
    role: "Staff engineer, Northbank Tea",
  },
  status: {
    heading: "Uptime you can check, not just read about",
    body: "Every component, every region, ninety days of history and a written post-mortem for each incident.",
    link: { to: "/status", label: "Open the status page" },
  },
  pricing: {
    heading: "Priced by requests, not by seats",
    body: "Every plan includes every connector it lists, unlimited team members and the full log.",
    link: { to: "/pricing", label: "Compare plans" },
  },
  close: {
    heading: "Make the first call before your coffee cools.",
    body: "Sandbox workspaces are free forever, with test credentials for every Sandbox connector.",
    primary: { to: "/signup", label: "Create a free workspace" },
    secondary: { to: "/docs", label: "Read the docs" },
  },
};

export const quickstart = [
  {
    label: "Node",
    lang: "ts",
    code: `import { Conduit } from "@conduit/sdk";\n\nconst conduit = new Conduit(process.env.CONDUIT_KEY);\n\nconst charge = await conduit.post("/tillpoint/charges", {\n  amount: 4800,\n  currency: "usd",\n  source: "card_test_visa",\n});\n\nconsole.log(charge.status); // "succeeded"`,
  },
  {
    label: "Python",
    lang: "py",
    code: `from conduit import Conduit\n\nconduit = Conduit(os.environ["CONDUIT_KEY"])\n\ncharge = conduit.post("/tillpoint/charges", {\n    "amount": 4800,\n    "currency": "usd",\n    "source": "card_test_visa",\n})\n\nprint(charge["status"])  # "succeeded"`,
  },
  {
    label: "cURL",
    lang: "sh",
    code: `curl https://api.conduit.example/v2/tillpoint/charges \\\n  -H "Authorization: Bearer $CONDUIT_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"amount":4800,"currency":"usd",\n       "source":"card_test_visa"}'`,
  },
];

export const platform = {
  title: "Platform",
  heading: "The plumbing between your product and everyone else's.",
  lede: "Conduit is a gateway, a credential vault, a mapping layer and a flight recorder. You keep writing product code; we keep the far ends of the pipe in working order.",
  features: [
    {
      id: "vault",
      name: "Auth vault",
      heading: "Your customers' credentials never touch your database.",
      body: "OAuth handshakes, API keys and SSH keys are stored encrypted per workspace with keys held in a separate HSM-backed service. Tokens refresh ahead of expiry, and a revoked credential surfaces as one clear event instead of a week of 401s.",
      points: [
        "OAuth 2.0, API key, HMAC and SSH key auth",
        "Per-customer credentials with scoped access",
        "Rotation reminders 14 days before expiry",
      ],
    },
    {
      id: "transform",
      name: "Transform",
      heading: "Map fields once, in a table, not in a hundred if-statements.",
      body: "Each connection has a mapping from Conduit's common shapes to the provider's. Edit it in the dashboard or in a versioned YAML file; every change is diffed and can be rolled back.",
      points: [
        "Common shapes for orders, contacts, invoices and shipments",
        "Unit and currency conversion built in",
        "Schema checks before anything leaves",
      ],
    },
    {
      id: "delivery",
      name: "Delivery and retries",
      heading: "At-least-once delivery, exactly-once effects.",
      body: "Writes carry idempotency keys, so a retried charge is still one charge. Rate limits are learned per provider and per account; Conduit queues instead of hammering, and your code gets one response when the work is done.",
      points: [
        "Exponential backoff with jitter, up to 8 attempts",
        "Per-provider rate-limit shaping",
        "Dead-letter queue with one-click replay",
      ],
    },
    {
      id: "observe",
      name: "Observability",
      heading: "Every request, with its whole story attached.",
      body: "Request and response bodies, upstream status, attempts and per-phase timings are kept for 30 days on Team and 400 days on Scale. Search by order number, customer email or request id, and replay anything to a test destination.",
      points: [
        "Full-text search across bodies",
        "Per-phase timing waterfall",
        "Export to your SQL warehouse",
      ],
    },
  ],
  regions: {
    heading: "Runs near the provider, stores data where you say",
    body: "Requests leave from the region closest to each provider. Logs and credentials stay in the data region you pick when you create a workspace.",
    list: [
      { code: "us-west", city: "Portland", role: "Primary, logs and vault" },
      { code: "us-east", city: "Ashburn", role: "Egress and failover" },
      { code: "eu-central", city: "Frankfurt", role: "EU data residency" },
      { code: "ap-south", city: "Singapore", role: "Egress" },
    ],
  },
  security: {
    heading: "Security is a feature you can audit",
    items: [
      {
        term: "SOC 2 Type II",
        text: "Annual report available under NDA from the trust page in your dashboard.",
      },
      {
        term: "Encryption",
        text: "TLS 1.3 in transit, AES-256 at rest, separate keys per workspace.",
      },
      {
        term: "Access",
        text: "SSO with SAML on Scale, role-based permissions on every plan, audit log of every credential read.",
      },
      {
        term: "Data retention",
        text: "Bodies are redacted by field rules you set, before they are written to the log.",
      },
    ],
  },
};

export const connectorsPage = {
  title: "Connectors",
  heading: "Connectors",
  lede: "Every connector has the same auth flow, error format and event names. Filter by category or plan, or search by name.",
};

export const consolePage = {
  title: "Request console",
  heading: "Request console",
  lede: "Pick a connector and an action, edit the body and send. The request runs through a local copy of Conduit's pipeline — auth, transform, upstream, retries — so you can see each phase and its timing. Nothing leaves your browser.",
  notes: [
    {
      term: "Validation",
      text: "Remove a required field from the body and Conduit answers 422 before calling the provider.",
    },
    {
      term: "Failure injection",
      text: "Make the provider answer 429 or 503 and watch the retry policy back off and recover.",
    },
    {
      term: "History",
      text: "The last eight requests stay in the panel; pick one to inspect its response again.",
    },
  ],
};

export type Tier = {
  name: Plan | "Enterprise";
  monthly: number | null;
  yearly: number | null;
  requests: number;
  overage: string;
  /** Dollars per 1,000 requests over the included amount; null when there is no overage billing. */
  rate: number | null;
  summary: string;
  features: string[];
  cta: { to: string; label: string };
};

export const pricing = {
  title: "Pricing",
  heading: "Pay for requests that reach a provider.",
  lede: "Retries, validation failures and webhook deliveries to you are free. Every plan includes unlimited team members.",
  tiers: [
    {
      name: "Sandbox",
      monthly: 0,
      yearly: 0,
      requests: 10000,
      overage: "Hard cap",
      rate: null,
      summary: "Test credentials and the core connectors.",
      features: [
        "10,000 requests a month",
        "Sandbox connectors",
        "7-day log",
        "Community support",
      ],
      cta: { to: "/signup", label: "Start free" },
    },
    {
      name: "Team",
      monthly: 49,
      yearly: 39,
      requests: 250000,
      overage: "$0.20 per 1,000",
      rate: 0.2,
      summary: "Production traffic for one product.",
      features: [
        "250,000 requests a month",
        "Sandbox + Team connectors",
        "30-day log with search",
        "Email support, next business day",
      ],
      cta: { to: "/signup", label: "Start a 14-day trial" },
    },
    {
      name: "Scale",
      monthly: 249,
      yearly: 199,
      requests: 2000000,
      overage: "$0.12 per 1,000",
      rate: 0.12,
      summary: "Several products, partners and regions.",
      features: [
        "2,000,000 requests a month",
        "Every connector, including SFTP and SQL",
        "400-day log, warehouse export",
        "SAML SSO and audit log",
        "4-hour support response",
      ],
      cta: { to: "/signup", label: "Start a 14-day trial" },
    },
    {
      name: "Enterprise",
      monthly: null,
      yearly: null,
      requests: 0,
      overage: "Committed volume",
      rate: null,
      summary: "Dedicated egress, custom connectors, contracts.",
      features: [
        "Volume pricing",
        "Dedicated egress IPs",
        "Custom connectors built with you",
        "99.99% uptime SLA",
        "Named support engineer",
      ],
      cta: { to: "/signup", label: "Talk to sales" },
    },
  ] as Tier[],
  compare: [
    { row: "Requests included", values: ["10k", "250k", "2M", "Custom"] },
    {
      row: "Connectors",
      values: ["Sandbox", "Sandbox + Team", "All", "All + custom"],
    },
    {
      row: "Log retention",
      values: ["7 days", "30 days", "400 days", "Custom"],
    },
    {
      row: "Retries and dead-letter queue",
      values: ["Yes", "Yes", "Yes", "Yes"],
    },
    { row: "Warehouse export", values: ["—", "—", "Yes", "Yes"] },
    { row: "Data region choice", values: ["US", "US or EU", "Any", "Any"] },
    { row: "SAML SSO", values: ["—", "—", "Yes", "Yes"] },
    { row: "Uptime SLA", values: ["—", "99.9%", "99.95%", "99.99%"] },
  ],
  faq: [
    {
      q: "What counts as a request?",
      a: "One call from your code that reaches a provider. Retries of that call, requests rejected by validation and events we deliver to your webhook don't count.",
    },
    {
      q: "What happens if I go over my plan?",
      a: "Sandbox stops at its cap and returns 402 until the next month. Team and Scale keep working and bill the overage rate per thousand requests at the end of the month.",
    },
    {
      q: "Can I switch plans mid-month?",
      a: "Yes. Upgrades are prorated immediately; downgrades take effect at the next billing date.",
    },
    {
      q: "Do you charge per connector or per customer connection?",
      a: "No. Connect as many of your customers' accounts as you like — pricing only follows request volume.",
    },
    {
      q: "Is there a discount for open-source projects or non-profits?",
      a: "Yes, Team is free for registered non-profits and public open-source projects. Write to sales@conduit.example with a link.",
    },
  ],
};

export const docs = {
  title: "Docs",
  heading: "Documentation",
  lede: "Start with the quickstart, then read the four concepts that explain everything else. The full reference ships with your workspace.",
  concepts: [
    {
      id: "workspaces",
      name: "Workspaces and keys",
      text: "A workspace holds connections, mappings and logs. Each has a live key and a test key; test keys only reach sandbox credentials.",
    },
    {
      id: "connections",
      name: "Connections",
      text: "A connection is one customer's account on one provider. Address it with the Conduit-Connection header, or let a default apply.",
    },
    {
      id: "events",
      name: "Events",
      text: "Provider webhooks are verified, normalised and re-signed by Conduit. You subscribe to names like order.created regardless of who sent them.",
    },
    {
      id: "errors",
      name: "Errors",
      text: "Every error has a type, a code and a message naming the fix. Upstream errors keep the provider's original body under upstream.",
    },
  ],
  errors: [
    {
      status: 400,
      code: "invalid_json",
      text: "The body could not be parsed.",
    },
    {
      status: 401,
      code: "invalid_key",
      text: "The workspace key is missing, revoked or for another environment.",
    },
    {
      status: 422,
      code: "missing_field",
      text: "A required field is absent; the message names it.",
    },
    {
      status: 429,
      code: "rate_limited",
      text: "Your plan's burst limit was reached. Retry-After says when.",
    },
    {
      status: 502,
      code: "upstream_failed",
      text: "The provider kept failing after every retry.",
    },
  ],
  guides: [
    {
      to: "/connectors/tillpoint",
      label: "Take your first payment with Tillpoint",
    },
    {
      to: "/connectors/shelfwise",
      label: "Sync Shelfwise orders into a ledger",
    },
    {
      to: "/connectors/webhook-inbox",
      label: "Receive webhooks from any service",
    },
    { to: "/console", label: "Debug a request in the console" },
  ],
};

export type Incident = {
  date: string;
  title: string;
  component: string;
  impact: "minor" | "major" | "maintenance";
  duration: string;
  updates: { time: string; label: string; text: string }[];
};

export const status = {
  title: "System status",
  heading: "System status",
  lede: "Live state of every Conduit component, ninety days of history and written reports for each incident.",
  overall: "Partial degradation: SFTP Drop polling in ap-south",
  components: [
    {
      name: "REST API gateway",
      region: "Global",
      state: "operational",
      seed: 3,
      uptime: 99.998,
    },
    {
      name: "Auth vault",
      region: "Global",
      state: "operational",
      seed: 7,
      uptime: 100,
    },
    {
      name: "Event delivery",
      region: "Global",
      state: "operational",
      seed: 11,
      uptime: 99.981,
    },
    {
      name: "Connector runtime",
      region: "us-west",
      state: "operational",
      seed: 5,
      uptime: 99.994,
    },
    {
      name: "Connector runtime",
      region: "eu-central",
      state: "operational",
      seed: 13,
      uptime: 99.99,
    },
    {
      name: "Connector runtime",
      region: "ap-south",
      state: "degraded",
      seed: 17,
      uptime: 99.912,
    },
    {
      name: "Dashboard",
      region: "Global",
      state: "operational",
      seed: 19,
      uptime: 99.97,
    },
    {
      name: "Log search",
      region: "Global",
      state: "operational",
      seed: 23,
      uptime: 99.95,
    },
  ] as {
    name: string;
    region: string;
    state: "operational" | "degraded" | "outage";
    seed: number;
    uptime: number;
  }[],
  incidents: [
    {
      date: "2026-10-18",
      title: "Delayed SFTP Drop polling in ap-south",
      component: "Connector runtime · ap-south",
      impact: "minor",
      duration: "Ongoing",
      updates: [
        {
          time: "08:42 UTC",
          label: "Monitoring",
          text: "Polling is running again with a backlog of about 20 minutes. Files are processed in arrival order; nothing has been skipped.",
        },
        {
          time: "07:58 UTC",
          label: "Identified",
          text: "A storage node in ap-south ran out of inodes. We moved the poller to a healthy node.",
        },
        {
          time: "07:31 UTC",
          label: "Investigating",
          text: "SFTP Drop polls in ap-south are taking longer than 5 minutes to start.",
        },
      ],
    },
    {
      date: "2026-10-03",
      title: "Elevated Hearth CRM error rate",
      component: "Connector runtime · us-west",
      impact: "minor",
      duration: "46 min",
      updates: [
        {
          time: "16:20 UTC",
          label: "Resolved",
          text: "Hearth rolled back a token endpoint change. Retries delivered every queued write; no data was lost.",
        },
        {
          time: "15:34 UTC",
          label: "Investigating",
          text: "About 6% of Hearth calls return 401 after token refresh.",
        },
      ],
    },
    {
      date: "2026-09-21",
      title: "Scheduled maintenance: log search index migration",
      component: "Log search",
      impact: "maintenance",
      duration: "2 h",
      updates: [
        {
          time: "04:00 UTC",
          label: "Completed",
          text: "Search moved to the new index. Queries over 30 days are now about three times faster.",
        },
      ],
    },
    {
      date: "2026-08-29",
      title: "Event delivery delays",
      component: "Event delivery",
      impact: "major",
      duration: "1 h 12 min",
      updates: [
        {
          time: "11:05 UTC",
          label: "Resolved",
          text: "Backlog drained. Post-mortem: a deploy halved queue consumers in us-west. We now block deploys that reduce consumer count.",
        },
        {
          time: "09:53 UTC",
          label: "Identified",
          text: "Webhook deliveries are 8–15 minutes late. Requests to the API are unaffected.",
        },
      ],
    },
  ] as Incident[],
};

export const changelog = {
  title: "Changelog",
  heading: "Changelog",
  lede: "What shipped, what changed and what we fixed. Breaking changes are announced 90 days ahead and only land in a new API version.",
  entries: [
    {
      date: "2026-10-14",
      version: "2.18",
      kind: "New",
      title: "Replay webhooks from the inbox",
      text: "Webhook Inbox can now redeliver any stored payload to any destination, including a local tunnel.",
    },
    {
      date: "2026-10-09",
      version: "2.17.2",
      kind: "Improved",
      title: "Ferryline tracking states",
      text: "Two more carrier scan codes now map to in_transit instead of unknown.",
    },
    {
      date: "2026-10-02",
      version: "2.17",
      kind: "New",
      title: "Shelfwise order tags",
      text: "PATCH /shelfwise/orders/:id accepts tags and note. Existing tags are kept unless replace: true is sent.",
    },
    {
      date: "2026-09-26",
      version: "2.16.1",
      kind: "Fixed",
      title: "Quillbook rounding",
      text: "Invoice lines in currencies with three decimals no longer round to two.",
    },
    {
      date: "2026-09-12",
      version: "2.16",
      kind: "Improved",
      title: "Contact de-duplication",
      text: "Hearth CRM upserts now compare emails case-insensitively and ignore plus-addressing when the workspace allows it.",
    },
    {
      date: "2026-08-30",
      version: "2.15",
      kind: "New",
      title: "Timing waterfall in the log",
      text: "Each request in the log shows auth, transform, upstream and retry time as separate bars.",
    },
    {
      date: "2026-08-21",
      version: "2.14.3",
      kind: "Fixed",
      title: "Chatterbox thread replies",
      text: "Replies to threads older than 90 days no longer post to the channel root.",
    },
    {
      date: "2026-08-02",
      version: "2.14",
      kind: "Improved",
      title: "Faster cold starts",
      text: "First requests on a new connection are about 40% faster thanks to pre-warmed credential lookups.",
    },
  ] as {
    date: string;
    version: string;
    kind: "New" | "Improved" | "Fixed";
    title: string;
    text: string;
  }[],
};

export const customers = {
  title: "Customers",
  heading: "Teams that stopped writing glue code",
  lede: "Four products, four very different wiring diagrams. The common thread: one client in their code, and the far ends changed without a deploy.",
  stories: [
    {
      company: "Northbank Tea",
      kind: "Online tea shop, 14 people",
      wiring: ["shelfwise", "tillpoint", "quillbook", "ferryline"],
      heading: "Checkout to ledger without a spreadsheet in between",
      body: "Every Shelfwise order becomes a Tillpoint charge check, a Quillbook invoice and a Ferryline label in under two seconds. When Northbank moved from their old label provider to Ferryline, the change was one edited connection.",
      result: "Month-end close went from three days to an afternoon.",
    },
    {
      company: "Loop Laundry",
      kind: "Pickup laundry app, 3 cities",
      wiring: ["rota", "chatterbox", "mailroom"],
      heading: "Routing pickups to whoever is actually on shift",
      body: "Loop reads the Rota schedule before assigning a pickup and posts the job to the driver's Chatterbox channel. Customers get Mailroom notices at each step, all from one webhook handler.",
      result: "Missed pickups fell from one in forty to one in four hundred.",
    },
    {
      company: "Fieldnote Clinics",
      kind: "Physiotherapy group, 22 clinics",
      wiring: ["webhook-inbox", "hearth", "sql-warehouse"],
      heading: "A legacy booking system, finally talking",
      body: "Their booking vendor only sends webhooks. Webhook Inbox verifies them, Hearth gets every new patient as a contact, and the analytics team reads it all from their own warehouse.",
      result:
        "Patient follow-ups now go out the same day instead of the next week.",
    },
    {
      company: "Partwell Supply",
      kind: "B2B parts distributor",
      wiring: ["sftp-drop", "stockroom", "quillbook"],
      heading: "Nightly CSVs, handled like APIs",
      body: "Three suppliers still send stock files over SFTP. Conduit turns each row into an event, updates Stockroom and flags price changes before invoices go out.",
      result: "Overselling incidents dropped to zero in the first quarter.",
    },
  ],
};

export const about = {
  title: "About",
  heading: "We build the boring part so you don't have to rebuild it.",
  lede: "Conduit started in 2021 when three engineers counted how many times their previous companies had written the same Tillpoint retry loop. The answer was eleven.",
  story: [
    "Integration work is the plumbing of software: invisible when it works, catastrophic when it leaks, and almost never anyone's favourite job. Every product team ends up maintaining clients for a dozen APIs, each with its own auth dance, pagination style and idea of what a 'rate limit' means.",
    "We think that work should be done once, carefully, and shared. Conduit is a small company on purpose — 38 people across Portland and Lisbon — and most of us have carried a pager for an integration that broke at the worst possible moment.",
  ],
  principles: [
    {
      term: "Boring is a feature",
      text: "We pick the predictable option. New connectors ship when they behave exactly like the old ones, not before.",
    },
    {
      term: "Errors name the fix",
      text: "A message that says what went wrong and what to do next is worth more than a dashboard.",
    },
    {
      term: "Your data, your region",
      text: "We store as little as we can, for as long as you say, where you say.",
    },
    {
      term: "Show the log",
      text: "If we can't show you exactly what we sent and what came back, we didn't build it properly.",
    },
  ],
  team: [
    { name: "Hana Okafor", role: "Co-founder, CEO", initials: "HO" },
    { name: "Mateus Brandão", role: "Co-founder, CTO", initials: "MB" },
    { name: "Ellis Wren", role: "Co-founder, Connectors", initials: "EW" },
    { name: "Sun-hee Park", role: "Head of Reliability", initials: "SP" },
    { name: "Tomás Reyes", role: "Developer Experience", initials: "TR" },
    { name: "Annika Holm", role: "Security & Compliance", initials: "AH" },
  ],
  offices: [
    {
      city: "Portland",
      lines: ["88 Foundry Lane, Suite 4", "Portland, OR 97209"],
    },
    { city: "Lisbon", lines: ["Rua da Fábrica 12, 3º", "1200-180 Lisboa"] },
  ],
  jobs: [
    { role: "Senior Connector Engineer", place: "Remote, Americas or Europe" },
    { role: "Site Reliability Engineer", place: "Portland or remote" },
    { role: "Developer Advocate", place: "Lisbon" },
  ],
};

export const signup = {
  title: "Create a workspace",
  heading: "Create a workspace",
  lede: "Sandbox is free forever. Upgrade when real traffic starts.",
  includes: [
    "Test keys for every Sandbox connector",
    "10,000 requests a month",
    "The request console and a 7-day log",
    "No card needed",
  ],
  roles: [
    "Engineer",
    "Engineering lead",
    "Product manager",
    "Founder",
    "Other",
  ],
  regions: ["US (Portland)", "EU (Frankfurt)"],
};

export const signin = {
  title: "Sign in",
  heading: "Sign in to Conduit",
};

export const notFound = {
  title: "Not found",
  heading: "404 — no route to that endpoint",
  body: "The address you followed doesn't match any page. It may have moved, or the link had a typo.",
};

/* ───────────────────────── App demo ───────────────────────── */

export const app = {
  workspace: "Northbank Tea",
  user: { name: "Priya Anand", email: "priya@northbank.example" },
  nav: [
    { to: "/app", label: "Overview" },
    { to: "/app/connections", label: "Connections" },
    { to: "/app/logs", label: "Logs" },
    { to: "/app/settings", label: "Settings" },
  ],
};

export type Connection = {
  id: string;
  name: string;
  connector: string;
  state: "healthy" | "degraded" | "paused";
  requests: number;
  errorRate: number;
  p95: number;
  lastCall: string;
};

export const connections: Connection[] = [
  {
    id: "con_tp_live",
    name: "Tillpoint — live",
    connector: "tillpoint",
    state: "healthy",
    requests: 18240,
    errorRate: 0.2,
    p95: 214,
    lastCall: "12 s ago",
  },
  {
    id: "con_sw_main",
    name: "Shelfwise — main store",
    connector: "shelfwise",
    state: "healthy",
    requests: 22910,
    errorRate: 0.4,
    p95: 288,
    lastCall: "3 s ago",
  },
  {
    id: "con_qb_books",
    name: "Quillbook — 2026 ledger",
    connector: "quillbook",
    state: "healthy",
    requests: 4105,
    errorRate: 1.1,
    p95: 512,
    lastCall: "1 min ago",
  },
  {
    id: "con_fl_ground",
    name: "Ferryline — ground",
    connector: "ferryline",
    state: "degraded",
    requests: 3880,
    errorRate: 4.6,
    p95: 940,
    lastCall: "28 s ago",
  },
  {
    id: "con_mr_tx",
    name: "Mailroom — receipts",
    connector: "mailroom",
    state: "healthy",
    requests: 9620,
    errorRate: 0.1,
    p95: 120,
    lastCall: "6 s ago",
  },
  {
    id: "con_cb_ops",
    name: "Chatterbox — #orders",
    connector: "chatterbox",
    state: "healthy",
    requests: 2310,
    errorRate: 0,
    p95: 165,
    lastCall: "44 s ago",
  },
  {
    id: "con_sr_pdx",
    name: "Stockroom — PDX warehouse",
    connector: "stockroom",
    state: "healthy",
    requests: 7402,
    errorRate: 0.6,
    p95: 302,
    lastCall: "9 s ago",
  },
  {
    id: "con_hc_sales",
    name: "Hearth — wholesale",
    connector: "hearth",
    state: "paused",
    requests: 0,
    errorRate: 0,
    p95: 0,
    lastCall: "2 days ago",
  },
  {
    id: "con_wh_legacy",
    name: "Webhook Inbox — POS",
    connector: "webhook-inbox",
    state: "healthy",
    requests: 1288,
    errorRate: 0.3,
    p95: 48,
    lastCall: "2 min ago",
  },
];

/** Requests per hour for the last 24 hours (ok, failed). Illustrative. */
export const traffic = [
  [1820, 6],
  [1410, 4],
  [1180, 3],
  [990, 2],
  [870, 4],
  [940, 3],
  [1320, 5],
  [2180, 9],
  [3040, 12],
  [3620, 18],
  [3910, 14],
  [4120, 22],
  [4380, 17],
  [4210, 61],
  [4050, 48],
  [3890, 15],
  [3720, 11],
  [3550, 13],
  [3810, 10],
  [4020, 12],
  [3640, 9],
  [3110, 7],
  [2560, 6],
  [2140, 5],
] as [number, number][];
