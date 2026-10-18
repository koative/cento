/*
 * Every word and number on the site lives here. Stack, its API, people and
 * releases are fictional demonstration content.
 */

export type Lang = "ts" | "bash" | "json" | "py";
export type Code = { lang: Lang; file?: string; code: string };

export const brand = {
  name: "Stack",
  site: "Stack Docs",
  tagline: "Durable jobs, events and webhooks for TypeScript backends.",
  version: "v3.4",
  email: "support@stack.example",
  hello: "hello@stack.example",
  phone: "+1 555 0142",
  baseUrl: "https://api.stack.example/v3",
  testKey: "sk_test_51Hq8vStackDemo0042",
  gallery: "https://koative.github.io/cento/",
  address: ["Stack Labs", "Rua da Boavista 118", "1200-066 Lisbon, Portugal"],
};

export const nav = [
  { to: "/guides", label: "Guides" },
  { to: "/api", label: "API reference" },
  { to: "/playground", label: "Playground" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const footerColumns = [
  {
    title: "Learn",
    links: [
      { to: "/", label: "Docs home" },
      { to: "/guides/quickstart", label: "Quickstart" },
      { to: "/guides", label: "All guides" },
      { to: "/api", label: "API reference" },
      { to: "/playground", label: "Playground" },
    ],
  },
  {
    title: "Project",
    links: [
      { to: "/changelog", label: "Changelog" },
      { to: "/about", label: "About the project" },
      { to: "/search", label: "Search the docs" },
      { to: "/support", label: "Contact support" },
    ],
  },
];

/* ---------- Home ---------- */

export const home = {
  title: "Stack Docs — Jobs, events and webhooks for TypeScript",
  h1: "Durable jobs, events and webhooks for TypeScript backends.",
  lead: "Stack runs the work your request handlers shouldn't: emails, exports, billing runs, fan-out to partners. Enqueue from any service, process with plain async functions, and get retries, schedules and signed webhooks without running a broker.",
  install: {
    bun: "bun add @stack/client",
    npm: "npm install @stack/client",
    pnpm: "pnpm add @stack/client",
  } as Record<string, string>,
  heroCode: {
    lang: "ts",
    file: "jobs/send-invoice.ts",
    code: `import { Stack } from "@stack/client";

const stack = new Stack({ key: process.env.STACK_KEY });

// Producer: runs inside your request handler
await stack.jobs.enqueue("invoices.send", {
  invoiceId: "inv_2041",
  attempts: 5,
});

// Worker: a plain async function, retried on throw
stack.worker("invoices.send", async ({ data, log }) => {
  const pdf = await renderInvoice(data.invoiceId);
  await mailer.send(pdf);
  log.info("sent", { bytes: pdf.length });
});`,
  } satisfies Code,
  heroLog: [
    ["12:04:31.208", "enqueued", "job_7Hk2 invoices.send"],
    ["12:04:31.244", "active", "job_7Hk2 worker eu-1/3"],
    ["12:04:31.902", "failed", "job_7Hk2 SMTP 451, retry in 2s"],
    ["12:04:33.917", "completed", "job_7Hk2 attempt 2 · 611 ms"],
  ],
  contents: {
    heading: "Contents",
    intro:
      "The documentation is written to be read in order the first time and searched every time after.",
    entries: [
      {
        to: "/guides/quickstart",
        title: "Quickstart",
        note: "Install, enqueue, run a worker",
        meta: "6 min",
      },
      {
        to: "/guides/background-jobs",
        title: "Background jobs and workers",
        note: "Lifecycle, concurrency, progress",
        meta: "10 min",
      },
      {
        to: "/guides/retries",
        title: "Retries, backoff and dead letters",
        note: "What happens when work fails",
        meta: "8 min",
      },
      {
        to: "/guides/webhooks",
        title: "Receive and verify webhooks",
        note: "Signatures, replays, timeouts",
        meta: "9 min",
      },
      {
        to: "/api",
        title: "API reference",
        note: "Six resources, sixteen endpoints",
        meta: "REST",
      },
      {
        to: "/playground",
        title: "Playground",
        note: "Send requests against a sandbox",
        meta: "Live",
      },
    ],
  },
  how: {
    heading: "How a job moves through Stack",
    body: "Your service talks to one HTTPS endpoint. Stack persists the job before it answers, places it on a named queue, and hands it to the first free worker. Events go one step further: every subscribed webhook endpoint receives a signed copy.",
    notes: [
      {
        term: "Persisted first",
        text: "A 202 means the job is on disk in two zones. Nothing is held only in memory.",
      },
      {
        term: "Pulled, not pushed",
        text: "Workers long-poll over HTTPS, so they run anywhere outbound traffic is allowed.",
      },
      {
        term: "At least once",
        text: "Handlers can run twice after a crash. Idempotency keys make that harmless.",
      },
    ],
  },
  tour: {
    heading: "Four things you will write in your first week",
    tabs: <{ label: string; text: string; code: Code }[]>[
      {
        label: "Enqueue a job",
        text: "Jobs are named, carry JSON, and can be delayed or deduplicated.",
        code: {
          lang: "ts",
          file: "api/checkout.ts",
          code: `await stack.jobs.enqueue("orders.fulfil", {
  orderId: order.id,
}, {
  delay: "30s",
  idempotencyKey: \`fulfil-\${order.id}\`,
});`,
        },
      },
      {
        label: "Send an event",
        text: "Events are facts. Every subscribed endpoint gets a copy.",
        code: {
          lang: "ts",
          file: "api/projects.ts",
          code: `await stack.events.send({
  name: "project.created",
  data: { projectId: "prj_81", plan: "team" },
});`,
        },
      },
      {
        label: "Schedule work",
        text: "Cron in UTC or any IANA zone, stored server-side.",
        code: {
          lang: "ts",
          file: "schedules.ts",
          code: `await stack.schedules.create({
  name: "reports.weekly",
  cron: "0 7 * * MON",
  timezone: "Europe/Lisbon",
  job: { name: "reports.build", data: { range: "7d" } },
});`,
        },
      },
      {
        label: "Verify a webhook",
        text: "Reject anything unsigned or older than five minutes.",
        code: {
          lang: "ts",
          file: "routes/webhooks.ts",
          code: `const event = stack.webhooks.verify({
  body: await req.text(),
  signature: req.headers.get("stack-signature"),
  secret: process.env.STACK_WEBHOOK_SECRET,
});
// throws StackSignatureError on mismatch`,
        },
      },
    ],
  },
  api: {
    heading: "The API at a glance",
    body: "Every SDK is a thin layer over the same REST API. JSON in, JSON out, bearer keys, cursor pagination.",
  },
  playground: {
    heading: "Try a request before you write one",
    body: "The playground sends calls to a sandbox that lives in your browser tab. Edit the body, break it on purpose, and read the error you would get in production. It writes the cURL, TypeScript and Python for you.",
    cta: "Open the playground",
  },
  sdks: {
    heading: "Clients and runtimes",
    rows: [
      {
        name: "TypeScript",
        pkg: "@stack/client",
        version: "3.4.0",
        status: "Stable",
        runtimes: "Node 20+, Bun 1.1+, Deno 2, Workers",
      },
      {
        name: "Python",
        pkg: "stack-client",
        version: "1.8.2",
        status: "Stable",
        runtimes: "CPython 3.10+",
      },
      {
        name: "Go",
        pkg: "stack.example/go",
        version: "0.9.0",
        status: "Beta",
        runtimes: "Go 1.22+",
      },
      {
        name: "CLI",
        pkg: "@stack/cli",
        version: "3.4.0",
        status: "Stable",
        runtimes: "macOS, Linux, Windows",
      },
    ],
  },
  close: {
    heading: "Stuck on something the docs don't answer?",
    body: "Every page is maintained by the engineers who build the feature. Write to them and you'll get a person, usually within a working day.",
    primary: "Contact support",
    secondary: "Search the docs",
  },
};

/* ---------- Guides ---------- */

export type GuideSection = {
  id: string;
  heading: string;
  body: string[];
  code?: Code;
  steps?: string[];
  note?: { kind: "tip" | "warning"; text: string };
  figure?: "lifecycle" | "backoff";
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  updated: string;
  sections: GuideSection[];
};

export const guideTopics = [
  "Getting started",
  "Jobs",
  "Events",
  "Webhooks",
  "Operations",
];

export const guidesPage = {
  title: "Guides",
  h1: "Guides",
  lead: "Task-shaped walkthroughs. Each one starts from an empty project and ends with code you can ship.",
};

export const guides: Guide[] = [
  {
    slug: "quickstart",
    title: "Quickstart",
    summary:
      "Install the client, enqueue your first job and watch a worker pick it up. About six minutes.",
    topic: "Getting started",
    level: "Beginner",
    minutes: 6,
    updated: "2026-10-07",
    sections: [
      {
        id: "install",
        heading: "Install the client",
        body: [
          "The TypeScript client has no runtime dependencies and works in Node 20+, Bun and Deno. Install it in the service that will produce jobs and in the one that will run them; for most projects that is the same repository.",
        ],
        code: {
          lang: "bash",
          file: "terminal",
          code: "bun add @stack/client\nbunx stack login",
        },
      },
      {
        id: "client",
        heading: "Create a client",
        body: [
          "Create one client per process and reuse it. It holds a keep-alive connection pool, so creating one per request wastes sockets. Test keys start with `sk_test_` and only see test-mode data.",
        ],
        code: {
          lang: "ts",
          file: "src/stack.ts",
          code: `import { Stack } from "@stack/client";

export const stack = new Stack({
  key: process.env.STACK_KEY, // sk_test_… in development
  region: "eu-1",
});`,
        },
        note: {
          kind: "warning",
          text: "Secret keys belong on the server. If a key reaches a browser bundle, revoke it from the dashboard and issue a new one.",
        },
      },
      {
        id: "enqueue",
        heading: "Enqueue your first job",
        body: [
          "A job is a name and a JSON payload. `enqueue` resolves as soon as the job is persisted, typically in under 40 ms, and returns its id.",
        ],
        code: {
          lang: "ts",
          file: "src/signup.ts",
          code: `import { stack } from "./stack";

const job = await stack.jobs.enqueue("emails.welcome", {
  userId: "usr_1042",
});

console.log(job.id); // job_7Hk2mQ`,
        },
      },
      {
        id: "worker",
        heading: "Run a worker",
        body: [
          "A worker registers a handler for a job name and long-polls for work. If the handler resolves, the job completes. If it throws, Stack retries it with exponential backoff.",
        ],
        code: {
          lang: "ts",
          file: "src/worker.ts",
          code: `import { stack } from "./stack";

stack.worker("emails.welcome", async ({ data, log }) => {
  await sendWelcomeEmail(data.userId);
  log.info("welcome sent");
}, { concurrency: 10 });`,
        },
        steps: [
          "Run `bun src/worker.ts` in one terminal.",
          "Run `bun src/signup.ts` in another.",
          "Watch the job move from queued to completed in `bunx stack tail`.",
        ],
        note: {
          kind: "tip",
          text: "Next, read Background jobs and workers to learn how concurrency and graceful shutdown work.",
        },
      },
    ],
  },
  {
    slug: "send-events",
    title: "Send and fan out events",
    summary:
      "Publish facts about your system once and let every subscriber, internal or external, receive its own copy.",
    topic: "Events",
    level: "Beginner",
    minutes: 7,
    updated: "2026-09-22",
    sections: [
      {
        id: "jobs-vs-events",
        heading: "Jobs versus events",
        body: [
          "A job is an instruction for exactly one handler: send this email. An event is a fact for anyone who cares: an order was paid. Stack stores events for 30 days and delivers each one to every matching subscription independently, so a slow consumer never delays a fast one.",
        ],
      },
      {
        id: "naming",
        heading: "Name events in the past tense",
        body: [
          "Use `resource.verb` in the past tense: `order.paid`, `project.archived`. Subscriptions match on exact names or on wildcards such as `order.*`, so a consistent prefix is what makes routing cheap later.",
        ],
        code: {
          lang: "ts",
          file: "src/orders.ts",
          code: `await stack.events.send({
  name: "order.paid",
  data: { orderId: "ord_42", total: 8900, currency: "EUR" },
  idempotencyKey: "order_42_paid",
});`,
        },
      },
      {
        id: "subscribe",
        heading: "Subscribe a handler",
        body: [
          "Inside your own services, subscribe with `stack.on`. Each subscription gets its own cursor, so adding a new consumer later replays nothing unless you ask it to with `from`.",
        ],
        code: {
          lang: "ts",
          file: "src/analytics.ts",
          code: `stack.on("order.*", async (event) => {
  await warehouse.insert("orders_events", event);
}, { from: "now" });`,
        },
        note: {
          kind: "tip",
          text: "Partners outside your network should receive events as signed webhooks instead. See Receive and verify webhooks.",
        },
      },
    ],
  },
  {
    slug: "background-jobs",
    title: "Background jobs and workers",
    summary:
      "How a job is claimed, how concurrency limits work, and how to shut a worker down without dropping anything.",
    topic: "Jobs",
    level: "Intermediate",
    minutes: 10,
    updated: "2026-10-01",
    sections: [
      {
        id: "lifecycle",
        heading: "The job lifecycle",
        body: [
          "Every job moves through five states. A worker claims a job by taking a lease of 30 seconds, which the client renews automatically while your handler runs. If the process dies, the lease expires and the job returns to the queue.",
        ],
        figure: "lifecycle",
      },
      {
        id: "concurrency",
        heading: "Concurrency per worker and per queue",
        body: [
          "`concurrency` on a worker limits how many handlers run at once in that process. A queue-level limit caps the total across every process, which is how you protect a fragile downstream API.",
        ],
        code: {
          lang: "ts",
          file: "src/worker.ts",
          code: `stack.worker("exports.csv", handler, {
  concurrency: 4,        // per process
});

await stack.queues.update("exports", {
  concurrency: 12,       // across all processes
});`,
        },
      },
      {
        id: "progress",
        heading: "Report progress",
        body: [
          "Long handlers can call `progress` with a number from 0 to 100. The value is stored on the job and visible through `jobs.retrieve`, which is enough to drive a progress bar in your own UI.",
        ],
        code: {
          lang: "ts",
          file: "src/exports.ts",
          code: `stack.worker("exports.csv", async ({ data, progress }) => {
  const rows = await db.count(data.query);
  for await (const batch of db.stream(data.query, 5000)) {
    await upload(batch);
    await progress(Math.round((batch.end / rows) * 100));
  }
});`,
        },
      },
      {
        id: "shutdown",
        heading: "Shut down gracefully",
        body: [
          "On `SIGTERM`, call `stack.close()`. The worker stops claiming new jobs, waits up to `drainTimeout` for running handlers, then releases the leases of anything still running so another worker can take over immediately.",
        ],
        code: {
          lang: "ts",
          file: "src/worker.ts",
          code: `process.on("SIGTERM", async () => {
  await stack.close({ drainTimeout: "25s" });
  process.exit(0);
});`,
        },
        note: {
          kind: "warning",
          text: "Most platforms send SIGKILL 30 seconds after SIGTERM. Keep drainTimeout comfortably below that.",
        },
      },
    ],
  },
  {
    slug: "retries",
    title: "Retries, backoff and dead letters",
    summary:
      "Choose how often failed work is retried, how long Stack waits between attempts, and what happens after the last one.",
    topic: "Jobs",
    level: "Intermediate",
    minutes: 8,
    updated: "2026-09-30",
    sections: [
      {
        id: "defaults",
        heading: "The defaults",
        body: [
          "A job that throws is retried up to 5 times. The delay before attempt n is `base × 2^(n−1)` with a base of 2 seconds, plus up to 20% random jitter so a burst of failures doesn't come back as a burst of retries.",
        ],
        figure: "backoff",
      },
      {
        id: "configure",
        heading: "Configure per job",
        body: [
          "Override the policy at enqueue time when a job is unusually cheap or unusually expensive. `maxDelay` caps the curve; without it, attempt 10 would wait over 17 minutes.",
        ],
        code: {
          lang: "ts",
          file: "src/sync.ts",
          code: `await stack.jobs.enqueue("crm.sync", { accountId }, {
  attempts: 8,
  backoff: { type: "exponential", base: "5s", maxDelay: "10m" },
});`,
        },
      },
      {
        id: "permanent",
        heading: "Fail fast on permanent errors",
        body: [
          "Retrying a 404 from a partner API only delays the inevitable. Throw `PermanentError` and Stack skips the remaining attempts and moves the job straight to the dead-letter queue.",
        ],
        code: {
          lang: "ts",
          file: "src/worker.ts",
          code: `import { PermanentError } from "@stack/client";

stack.worker("crm.sync", async ({ data }) => {
  const res = await crm.get(\`/accounts/\${data.accountId}\`);
  if (res.status === 404) throw new PermanentError("account deleted");
  await save(res.body);
});`,
        },
      },
      {
        id: "dead-letters",
        heading: "Inspect and replay dead letters",
        body: [
          "Failed jobs keep their payload, every attempt's error and stack trace for 14 days. Fix the bug, deploy, then replay them from the CLI or with `jobs.retry`.",
        ],
        code: {
          lang: "bash",
          file: "terminal",
          code: "bunx stack jobs list --state failed --name crm.sync\nbunx stack jobs retry --state failed --name crm.sync --since 2h",
        },
      },
    ],
  },
  {
    slug: "schedules",
    title: "Cron schedules and delayed jobs",
    summary:
      "Run work every Monday at seven, or exactly 48 hours after a trial starts, without a cron box of your own.",
    topic: "Jobs",
    level: "Beginner",
    minutes: 5,
    updated: "2026-08-18",
    sections: [
      {
        id: "delayed",
        heading: "Delay a single job",
        body: [
          "Pass `delay` as a duration or `runAt` as an ISO timestamp. Delayed jobs are stored like any other and survive deploys, so there is no reason to keep timers in process memory.",
        ],
        code: {
          lang: "ts",
          file: "src/trials.ts",
          code: `await stack.jobs.enqueue("trials.reminder", { userId }, {
  runAt: addHours(trial.startedAt, 48).toISOString(),
});`,
        },
      },
      {
        id: "cron",
        heading: "Create a cron schedule",
        body: [
          "Schedules use five-field cron syntax and an IANA time zone. Daylight saving transitions are handled for you: a 02:30 schedule runs once on the night the clocks change, never twice.",
        ],
        code: {
          lang: "ts",
          file: "src/schedules.ts",
          code: `await stack.schedules.create({
  name: "reports.weekly",
  cron: "0 7 * * MON",
  timezone: "Europe/Lisbon",
  job: { name: "reports.build", data: { range: "7d" } },
});`,
        },
        note: {
          kind: "tip",
          text: "Schedule names are unique per project, so calling create on every deploy is safe: an identical schedule is left untouched.",
        },
      },
    ],
  },
  {
    slug: "webhooks",
    title: "Receive and verify webhooks",
    summary:
      "Accept signed event deliveries, reject forgeries and replays, and respond fast enough that nothing is retried by mistake.",
    topic: "Webhooks",
    level: "Intermediate",
    minutes: 9,
    updated: "2026-10-03",
    sections: [
      {
        id: "endpoint",
        heading: "Register an endpoint",
        body: [
          "An endpoint is a URL plus the event names it wants. Stack returns a signing secret once, at creation. Store it with your other secrets; you can roll it later without downtime.",
        ],
        code: {
          lang: "bash",
          file: "terminal",
          code: `curl https://api.stack.example/v3/webhooks/endpoints \\
  -H "Authorization: Bearer $STACK_KEY" \\
  -d '{"url":"https://shop.example/hooks/stack","events":["order.*"]}'`,
        },
      },
      {
        id: "verify",
        heading: "Verify every delivery",
        body: [
          "Each request carries a `stack-signature` header: a timestamp and an HMAC-SHA256 of the raw body. Verify against the raw bytes, before any JSON parsing middleware touches them.",
        ],
        code: {
          lang: "ts",
          file: "routes/webhooks.ts",
          code: `app.post("/hooks/stack", async (req) => {
  const event = stack.webhooks.verify({
    body: await req.text(),
    signature: req.headers.get("stack-signature"),
    secret: process.env.STACK_WEBHOOK_SECRET,
    tolerance: 300, // seconds
  });
  await queue.add(event);
  return new Response(null, { status: 204 });
});`,
        },
        note: {
          kind: "warning",
          text: "Re-serialising parsed JSON changes whitespace and key order, and the signature will no longer match.",
        },
      },
      {
        id: "respond",
        heading: "Respond within ten seconds",
        body: [
          "Stack treats any 2xx within 10 seconds as delivered. Anything else is retried for up to three days on the same backoff curve as jobs. Do the real work asynchronously and acknowledge first.",
        ],
        steps: [
          "Verify the signature.",
          "Persist or enqueue the event.",
          "Return 204 immediately.",
        ],
      },
    ],
  },
  {
    slug: "idempotency",
    title: "Idempotency keys",
    summary:
      "Make retries from your own code safe: the same request twice produces one job, one event, one charge.",
    topic: "Events",
    level: "Advanced",
    minutes: 6,
    updated: "2026-07-29",
    sections: [
      {
        id: "why",
        heading: "Why the network makes you do this",
        body: [
          "A request can succeed on the server and still time out on the client. Your retry is correct and dangerous at the same time. An idempotency key lets Stack recognise the second attempt and return the first result.",
        ],
      },
      {
        id: "use",
        heading: "Choose a key",
        body: [
          "Derive the key from the business action, never from a random value generated per attempt. Keys are scoped to the project and remembered for 24 hours.",
        ],
        code: {
          lang: "ts",
          file: "src/billing.ts",
          code: `await stack.jobs.enqueue("billing.charge", { invoiceId }, {
  idempotencyKey: \`charge-\${invoiceId}\`,
});`,
        },
        note: {
          kind: "tip",
          text: "A repeated key with a different payload returns 409 idempotency_mismatch, which almost always reveals a bug worth fixing.",
        },
      },
    ],
  },
  {
    slug: "deploy-workers",
    title: "Deploying workers to production",
    summary:
      "Containers, autoscaling on queue depth, and the three metrics worth alerting on.",
    topic: "Operations",
    level: "Advanced",
    minutes: 12,
    updated: "2026-09-12",
    sections: [
      {
        id: "container",
        heading: "Package a worker",
        body: [
          "Workers are ordinary long-running processes. They need outbound HTTPS and nothing else: no inbound ports, no sidecars, no shared volume.",
        ],
        code: {
          lang: "bash",
          file: "Dockerfile",
          code: `FROM oven/bun:1.1-slim
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --production
COPY src ./src
CMD ["bun", "src/worker.ts"]`,
        },
      },
      {
        id: "scale",
        heading: "Scale on queue depth",
        body: [
          "CPU is a poor signal for I/O-bound handlers. Scale on `stack_queue_waiting` instead, exposed by the metrics endpoint in Prometheus format. Two workers per hundred waiting jobs is a sensible starting ratio.",
        ],
      },
      {
        id: "alerts",
        heading: "Alert on three numbers",
        body: [
          "Most incidents show up first as one of these. Everything else belongs on a dashboard, not a pager.",
        ],
        steps: [
          "Oldest waiting job older than five minutes.",
          "Failed jobs above 2% of completed over fifteen minutes.",
          "Webhook deliveries pending longer than one hour.",
        ],
      },
    ],
  },
  {
    slug: "local-dev",
    title: "Local development with the CLI",
    summary:
      "Run an in-memory Stack on your laptop, tail jobs live and forward webhooks to localhost.",
    topic: "Operations",
    level: "Beginner",
    minutes: 5,
    updated: "2026-10-07",
    sections: [
      {
        id: "dev-server",
        heading: "Start the dev server",
        body: [
          "`stack dev` starts an in-memory server on port 7420 that speaks the full v3 API. Point the client at it with `STACK_URL`; no key is required locally.",
        ],
        code: {
          lang: "bash",
          file: "terminal",
          code: "bunx stack dev\nexport STACK_URL=http://localhost:7420",
        },
      },
      {
        id: "tail",
        heading: "Tail everything",
        body: [
          "`stack tail` streams every state change with timings, colour-coded. Filter with `--name` or `--state` when a project gets noisy.",
        ],
        code: {
          lang: "bash",
          file: "terminal",
          code: "bunx stack tail --name 'emails.*' --state failed",
        },
      },
      {
        id: "forward",
        heading: "Forward webhooks to localhost",
        body: [
          "`stack listen` opens an outbound tunnel and forwards test-mode deliveries to a local URL, signed with a temporary secret it prints on start.",
        ],
        code: {
          lang: "bash",
          file: "terminal",
          code: "bunx stack listen --forward http://localhost:3000/hooks/stack",
        },
      },
    ],
  },
];

/* ---------- API reference ---------- */

export type Method = "GET" | "POST" | "PATCH" | "DELETE";
export type Param = {
  name: string;
  in: "path" | "query" | "body";
  type: "string" | "integer" | "boolean" | "object" | "string[]";
  required?: boolean;
  description: string;
  example?: string;
};
export type Endpoint = {
  op: string;
  method: Method;
  path: string;
  summary: string;
  description: string;
  params: Param[];
  request?: string;
  response: { status: number; body: string };
};
export type Resource = {
  slug: string;
  name: string;
  summary: string;
  object: {
    name: string;
    fields: { name: string; type: string; description: string }[];
  };
  endpoints: Endpoint[];
};

export const apiPage = {
  title: "API reference",
  h1: "API reference",
  lead: "The Stack REST API. Resource-oriented URLs, JSON bodies, standard HTTP verbs and status codes. Every SDK call maps to exactly one endpoint below.",
  basics: [
    { term: "Base URL", value: "https://api.stack.example/v3" },
    {
      term: "Authentication",
      value: "Authorization: Bearer sk_live_… or sk_test_…",
    },
    { term: "Content type", value: "application/json; charset=utf-8" },
    { term: "Rate limit", value: "600 requests / minute / key, burst 100" },
    {
      term: "Versioning",
      value: "Major version in the path; additive changes ship continuously",
    },
  ],
  auth: {
    heading: "Authentication",
    body: "Send your secret key as a bearer token. Test keys see only test-mode data and never trigger live webhooks. A missing or revoked key returns 401.",
    code: {
      lang: "bash",
      code: `curl https://api.stack.example/v3/queues \\
  -H "Authorization: Bearer sk_test_51Hq8vStackDemo0042"`,
    } satisfies Code,
  },
  errors: {
    heading: "Errors",
    body: "Errors share one shape: a machine-readable `code`, a sentence meant for the developer, and the parameter at fault when there is one.",
    rows: [
      {
        status: "400",
        code: "invalid_request",
        meaning: "Malformed JSON or a parameter of the wrong type.",
      },
      {
        status: "401",
        code: "unauthenticated",
        meaning: "Key missing, malformed or revoked.",
      },
      {
        status: "404",
        code: "resource_missing",
        meaning: "No object with that id in this project and mode.",
      },
      {
        status: "409",
        code: "idempotency_mismatch",
        meaning: "Same idempotency key, different payload.",
      },
      {
        status: "422",
        code: "missing_field",
        meaning: "A required field is absent.",
      },
      {
        status: "429",
        code: "rate_limited",
        meaning: "Slow down; retry after the Retry-After header.",
      },
    ],
    example: `{
  "error": {
    "code": "missing_field",
    "message": "name is required to enqueue a job.",
    "param": "name",
    "request_id": "req_9fQ2LwT1"
  }
}`,
  },
  pagination: {
    heading: "Pagination",
    body: "List endpoints return up to `limit` objects (default 20, max 100) and a `next_cursor`. Pass it back as `cursor` to fetch the next page; a null cursor means you have reached the end.",
  },
};

export const resources: Resource[] = [
  {
    slug: "jobs",
    name: "Jobs",
    summary:
      "A unit of work with a name, a JSON payload and a retry policy, processed by exactly one worker.",
    object: {
      name: "The job object",
      fields: [
        {
          name: "id",
          type: "string",
          description: "Unique identifier, prefixed job_.",
        },
        {
          name: "name",
          type: "string",
          description: "The handler name, such as emails.welcome.",
        },
        {
          name: "state",
          type: "string",
          description: "queued, active, completed, failed or cancelled.",
        },
        {
          name: "data",
          type: "object",
          description: "The payload you enqueued, up to 256 KB.",
        },
        {
          name: "attempts",
          type: "integer",
          description: "Attempts made so far.",
        },
        {
          name: "progress",
          type: "integer",
          description: "0–100, as reported by the handler.",
        },
        {
          name: "run_at",
          type: "timestamp",
          description: "Earliest time the job may start.",
        },
      ],
    },
    endpoints: [
      {
        op: "jobs.enqueue",
        method: "POST",
        path: "/jobs",
        summary: "Enqueue a job",
        description:
          "Persists a job and returns it in the queued state. With an idempotency key, a repeat call returns the original job.",
        params: [
          {
            name: "name",
            in: "body",
            type: "string",
            required: true,
            description: "Handler name. Lowercase, dot-separated.",
          },
          {
            name: "data",
            in: "body",
            type: "object",
            required: true,
            description: "JSON payload passed to the handler.",
          },
          {
            name: "queue",
            in: "body",
            type: "string",
            description: "Queue name. Defaults to the first segment of name.",
          },
          {
            name: "attempts",
            in: "body",
            type: "integer",
            description: "Maximum attempts, 1–25. Default 5.",
          },
          {
            name: "delay",
            in: "body",
            type: "string",
            description: "Duration such as 30s or 2h before the job may run.",
          },
          {
            name: "idempotency_key",
            in: "body",
            type: "string",
            description: "Deduplicates repeats for 24 hours.",
          },
        ],
        request: `{
  "name": "emails.welcome",
  "data": { "user_id": "usr_1042" },
  "attempts": 5
}`,
        response: {
          status: 202,
          body: `{
  "id": "job_7Hk2mQ",
  "object": "job",
  "name": "emails.welcome",
  "queue": "emails",
  "state": "queued",
  "data": { "user_id": "usr_1042" },
  "attempts": 0,
  "progress": 0,
  "run_at": "2026-10-18T12:04:31Z"
}`,
        },
      },
      {
        op: "jobs.retrieve",
        method: "GET",
        path: "/jobs/{id}",
        summary: "Retrieve a job",
        description:
          "Returns the current state, progress and attempt history of a job.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The job id.",
            example: "job_7Hk2mQ",
          },
        ],
        response: {
          status: 200,
          body: `{
  "id": "job_7Hk2mQ",
  "object": "job",
  "name": "exports.csv",
  "state": "active",
  "attempts": 1,
  "progress": 62,
  "run_at": "2026-10-18T12:04:31Z"
}`,
        },
      },
      {
        op: "jobs.cancel",
        method: "POST",
        path: "/jobs/{id}/cancel",
        summary: "Cancel a job",
        description:
          "Cancels a queued job. An active job is signalled through its abort controller and stops at the handler's next await.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The job id.",
            example: "job_7Hk2mQ",
          },
        ],
        response: {
          status: 200,
          body: `{
  "id": "job_7Hk2mQ",
  "object": "job",
  "state": "cancelled"
}`,
        },
      },
      {
        op: "jobs.retry",
        method: "POST",
        path: "/jobs/{id}/retry",
        summary: "Retry a failed job",
        description:
          "Moves a failed job back to queued with its attempt counter reset.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The job id.",
            example: "job_3Lp9Wd",
          },
        ],
        response: {
          status: 200,
          body: `{
  "id": "job_3Lp9Wd",
  "object": "job",
  "state": "queued",
  "attempts": 0
}`,
        },
      },
    ],
  },
  {
    slug: "events",
    name: "Events",
    summary:
      "An immutable fact about your system, delivered to every matching subscription and webhook endpoint.",
    object: {
      name: "The event object",
      fields: [
        {
          name: "id",
          type: "string",
          description: "Unique identifier, prefixed evt_.",
        },
        {
          name: "name",
          type: "string",
          description: "Past-tense name such as order.paid.",
        },
        {
          name: "data",
          type: "object",
          description: "Event payload, up to 64 KB.",
        },
        {
          name: "deliveries",
          type: "integer",
          description: "Webhook endpoints the event was routed to.",
        },
        {
          name: "created_at",
          type: "timestamp",
          description: "When Stack accepted the event.",
        },
      ],
    },
    endpoints: [
      {
        op: "events.send",
        method: "POST",
        path: "/events",
        summary: "Send an event",
        description:
          "Accepts an event and routes it to every subscription whose pattern matches its name.",
        params: [
          {
            name: "name",
            in: "body",
            type: "string",
            required: true,
            description: "Event name, resource.verb.",
          },
          {
            name: "data",
            in: "body",
            type: "object",
            required: true,
            description: "JSON payload.",
          },
          {
            name: "idempotency_key",
            in: "body",
            type: "string",
            description: "Deduplicates repeats for 24 hours.",
          },
        ],
        request: `{
  "name": "order.paid",
  "data": { "order_id": "ord_42", "total": 8900 }
}`,
        response: {
          status: 202,
          body: `{
  "id": "evt_0Rk4Tn",
  "object": "event",
  "name": "order.paid",
  "data": { "order_id": "ord_42", "total": 8900 },
  "deliveries": 3,
  "created_at": "2026-10-18T12:06:02Z"
}`,
        },
      },
      {
        op: "events.list",
        method: "GET",
        path: "/events",
        summary: "List events",
        description: "Lists events newest first. Filter by name pattern.",
        params: [
          {
            name: "name",
            in: "query",
            type: "string",
            description: "Exact name or wildcard such as order.*",
            example: "order.*",
          },
          {
            name: "limit",
            in: "query",
            type: "integer",
            description: "1–100, default 20.",
            example: "2",
          },
        ],
        response: {
          status: 200,
          body: `{
  "object": "list",
  "data": [
    { "id": "evt_0Rk4Tn", "name": "order.paid" },
    { "id": "evt_0Rk4Tm", "name": "order.created" }
  ],
  "next_cursor": "cur_Evt0Rk4Tl"
}`,
        },
      },
      {
        op: "events.retrieve",
        method: "GET",
        path: "/events/{id}",
        summary: "Retrieve an event",
        description: "Returns an event and a summary of its deliveries.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The event id.",
            example: "evt_0Rk4Tn",
          },
        ],
        response: {
          status: 200,
          body: `{
  "id": "evt_0Rk4Tn",
  "object": "event",
  "name": "order.paid",
  "deliveries": 3,
  "created_at": "2026-10-18T12:06:02Z"
}`,
        },
      },
    ],
  },
  {
    slug: "queues",
    name: "Queues",
    summary:
      "Named lanes that hold waiting jobs. Pause them, cap their concurrency, read their depth.",
    object: {
      name: "The queue object",
      fields: [
        { name: "name", type: "string", description: "Unique per project." },
        {
          name: "paused",
          type: "boolean",
          description: "Paused queues accept jobs but hand none out.",
        },
        {
          name: "concurrency",
          type: "integer",
          description: "Cap across all workers, or null.",
        },
        {
          name: "waiting",
          type: "integer",
          description: "Jobs ready to run now.",
        },
        {
          name: "active",
          type: "integer",
          description: "Jobs currently leased.",
        },
      ],
    },
    endpoints: [
      {
        op: "queues.list",
        method: "GET",
        path: "/queues",
        summary: "List queues",
        description: "Returns every queue with live depth counters.",
        params: [
          {
            name: "limit",
            in: "query",
            type: "integer",
            description: "1–100, default 20.",
            example: "20",
          },
        ],
        response: {
          status: 200,
          body: `{
  "object": "list",
  "data": [
    { "name": "emails", "paused": false, "waiting": 14, "active": 10 },
    { "name": "exports", "paused": false, "waiting": 2, "active": 4 }
  ],
  "next_cursor": null
}`,
        },
      },
      {
        op: "queues.update",
        method: "PATCH",
        path: "/queues/{name}",
        summary: "Update a queue",
        description:
          "Pauses, resumes or changes the concurrency cap of a queue. Takes effect within one second.",
        params: [
          {
            name: "name",
            in: "path",
            type: "string",
            required: true,
            description: "The queue name.",
            example: "exports",
          },
          {
            name: "paused",
            in: "body",
            type: "boolean",
            description: "Pause or resume.",
          },
          {
            name: "concurrency",
            in: "body",
            type: "integer",
            description: "Total cap across workers, or null to remove.",
          },
        ],
        request: `{
  "concurrency": 12
}`,
        response: {
          status: 200,
          body: `{
  "name": "exports",
  "object": "queue",
  "paused": false,
  "concurrency": 12,
  "waiting": 2,
  "active": 4
}`,
        },
      },
    ],
  },
  {
    slug: "schedules",
    name: "Schedules",
    summary:
      "Cron expressions stored server-side that enqueue a job on every tick.",
    object: {
      name: "The schedule object",
      fields: [
        {
          name: "id",
          type: "string",
          description: "Unique identifier, prefixed sch_.",
        },
        { name: "name", type: "string", description: "Unique per project." },
        {
          name: "cron",
          type: "string",
          description: "Five-field cron expression.",
        },
        {
          name: "timezone",
          type: "string",
          description: "IANA zone, default UTC.",
        },
        {
          name: "next_run_at",
          type: "timestamp",
          description: "The next tick.",
        },
      ],
    },
    endpoints: [
      {
        op: "schedules.create",
        method: "POST",
        path: "/schedules",
        summary: "Create a schedule",
        description: "Creates or replaces a schedule by name.",
        params: [
          {
            name: "name",
            in: "body",
            type: "string",
            required: true,
            description: "Unique schedule name.",
          },
          {
            name: "cron",
            in: "body",
            type: "string",
            required: true,
            description: "Five-field cron expression.",
          },
          {
            name: "timezone",
            in: "body",
            type: "string",
            description: "IANA time zone.",
          },
          {
            name: "job",
            in: "body",
            type: "object",
            required: true,
            description: "The job to enqueue: name and data.",
          },
        ],
        request: `{
  "name": "reports.weekly",
  "cron": "0 7 * * MON",
  "timezone": "Europe/Lisbon",
  "job": { "name": "reports.build", "data": { "range": "7d" } }
}`,
        response: {
          status: 201,
          body: `{
  "id": "sch_4Wm1Za",
  "object": "schedule",
  "name": "reports.weekly",
  "cron": "0 7 * * MON",
  "timezone": "Europe/Lisbon",
  "next_run_at": "2026-10-19T06:00:00Z"
}`,
        },
      },
      {
        op: "schedules.delete",
        method: "DELETE",
        path: "/schedules/{id}",
        summary: "Delete a schedule",
        description:
          "Stops future ticks. Jobs already enqueued are not affected.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The schedule id.",
            example: "sch_4Wm1Za",
          },
        ],
        response: {
          status: 200,
          body: `{
  "id": "sch_4Wm1Za",
  "object": "schedule",
  "deleted": true
}`,
        },
      },
    ],
  },
  {
    slug: "webhooks",
    name: "Webhook endpoints",
    summary:
      "URLs that receive signed copies of events, with automatic retries for three days.",
    object: {
      name: "The endpoint object",
      fields: [
        {
          name: "id",
          type: "string",
          description: "Unique identifier, prefixed we_.",
        },
        {
          name: "url",
          type: "string",
          description: "HTTPS URL that receives deliveries.",
        },
        {
          name: "events",
          type: "string[]",
          description: "Names or wildcards to deliver.",
        },
        {
          name: "secret",
          type: "string",
          description: "Signing secret. Returned only on creation.",
        },
        { name: "status", type: "string", description: "enabled or disabled." },
      ],
    },
    endpoints: [
      {
        op: "webhooks.create",
        method: "POST",
        path: "/webhooks/endpoints",
        summary: "Create an endpoint",
        description:
          "Registers a URL. The response is the only time the signing secret is shown.",
        params: [
          {
            name: "url",
            in: "body",
            type: "string",
            required: true,
            description: "HTTPS URL.",
          },
          {
            name: "events",
            in: "body",
            type: "string[]",
            required: true,
            description: "Names or wildcards.",
          },
        ],
        request: `{
  "url": "https://shop.example/hooks/stack",
  "events": ["order.*"]
}`,
        response: {
          status: 201,
          body: `{
  "id": "we_2Bn8Qr",
  "object": "webhook_endpoint",
  "url": "https://shop.example/hooks/stack",
  "events": ["order.*"],
  "secret": "whsec_demo_9Kd2pX",
  "status": "enabled"
}`,
        },
      },
      {
        op: "webhooks.test",
        method: "POST",
        path: "/webhooks/endpoints/{id}/test",
        summary: "Send a test delivery",
        description:
          "Delivers a signed stack.ping event and reports the response your server gave.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The endpoint id.",
            example: "we_2Bn8Qr",
          },
        ],
        response: {
          status: 200,
          body: `{
  "endpoint": "we_2Bn8Qr",
  "event": "stack.ping",
  "response_status": 204,
  "duration_ms": 118
}`,
        },
      },
    ],
  },
  {
    slug: "keys",
    name: "API keys",
    summary:
      "Secret keys scoped to a project and mode. Create them per service so you can revoke one without touching the rest.",
    object: {
      name: "The key object",
      fields: [
        {
          name: "id",
          type: "string",
          description: "Unique identifier, prefixed key_.",
        },
        {
          name: "label",
          type: "string",
          description: "Human name, such as billing-worker.",
        },
        { name: "mode", type: "string", description: "test or live." },
        {
          name: "secret",
          type: "string",
          description: "Returned only on creation.",
        },
        {
          name: "last_used_at",
          type: "timestamp",
          description: "Last authenticated request, or null.",
        },
      ],
    },
    endpoints: [
      {
        op: "keys.create",
        method: "POST",
        path: "/keys",
        summary: "Create a key",
        description:
          "Creates a secret key in the mode of the key making the request.",
        params: [
          {
            name: "label",
            in: "body",
            type: "string",
            required: true,
            description: "Human-readable name.",
          },
        ],
        request: `{
  "label": "billing-worker"
}`,
        response: {
          status: 201,
          body: `{
  "id": "key_6Yt3Ce",
  "object": "key",
  "label": "billing-worker",
  "mode": "test",
  "secret": "sk_test_demo_Rr41Vb",
  "last_used_at": null
}`,
        },
      },
      {
        op: "keys.revoke",
        method: "DELETE",
        path: "/keys/{id}",
        summary: "Revoke a key",
        description:
          "Revokes a key immediately. Requests in flight complete; new ones get 401.",
        params: [
          {
            name: "id",
            in: "path",
            type: "string",
            required: true,
            description: "The key id.",
            example: "key_6Yt3Ce",
          },
        ],
        response: {
          status: 200,
          body: `{
  "id": "key_6Yt3Ce",
  "object": "key",
  "revoked": true
}`,
        },
      },
    ],
  },
];

export const endpoints = resources.flatMap((r) =>
  r.endpoints.map((e) => ({ ...e, resource: r.slug })),
);

/* ---------- Playground ---------- */

export const playgroundPage = {
  title: "Playground",
  h1: "Playground",
  lead: "Send requests to a sandbox that runs inside this tab. Edit parameters, break the JSON on purpose, and read exactly what production would say back.",
  note: "Sandbox only: requests never leave your browser and the test key is not real.",
};

/* ---------- Changelog ---------- */

export type ChangeType = "Added" | "Changed" | "Fixed" | "Deprecated";
export type Release = {
  version: string;
  date: string;
  title: string;
  body: string;
  breaking?: boolean;
  changes: { type: ChangeType; text: string }[];
};

export const changelogPage = {
  title: "Changelog",
  h1: "Changelog",
  lead: "Every release of the API, the TypeScript client and the CLI. Minor versions ship roughly every three weeks; breaking changes only with a new major.",
};

export const releases: Release[] = [
  {
    version: "3.4.0",
    date: "2026-10-07",
    title: "Job progress and stack listen",
    body: "Handlers can report progress, and the CLI can forward test webhooks to localhost.",
    changes: [
      {
        type: "Added",
        text: "`progress()` in worker handlers, stored on the job and returned by jobs.retrieve.",
      },
      {
        type: "Added",
        text: "`stack listen --forward` tunnels test-mode webhooks to a local URL.",
      },
      {
        type: "Changed",
        text: "Default lease extended from 20 to 30 seconds.",
      },
      {
        type: "Fixed",
        text: "Schedules in Australia/Lord_Howe skipped one tick on the half-hour DST change.",
      },
    ],
  },
  {
    version: "3.3.2",
    date: "2026-09-24",
    title: "Webhook retry fixes",
    body: "A patch release for delivery retries.",
    changes: [
      {
        type: "Fixed",
        text: "A 410 Gone from an endpoint now disables it instead of retrying for three days.",
      },
      {
        type: "Fixed",
        text: "`webhooks.verify` accepted signatures with trailing whitespace.",
      },
    ],
  },
  {
    version: "3.3.0",
    date: "2026-09-10",
    title: "Queue-level concurrency",
    body: "Cap concurrency across every worker process, not only inside one.",
    changes: [
      {
        type: "Added",
        text: "PATCH /queues/{name} with `concurrency` and `paused`.",
      },
      {
        type: "Added",
        text: "`stack_queue_waiting` and `stack_queue_oldest_seconds` Prometheus metrics.",
      },
      {
        type: "Deprecated",
        text: "`worker({ globalConcurrency })` in the client. Use queue settings instead; removal in 4.0.",
      },
    ],
  },
  {
    version: "3.2.1",
    date: "2026-08-27",
    title: "Client reconnect",
    body: "Faster recovery from network partitions.",
    changes: [
      {
        type: "Fixed",
        text: "Workers waited up to 60 s to reconnect after a dropped long-poll; now 2 s with jitter.",
      },
      {
        type: "Changed",
        text: "Client logs a single warning per outage instead of one per poll.",
      },
    ],
  },
  {
    version: "3.2.0",
    date: "2026-08-13",
    title: "Permanent errors",
    body: "Tell Stack when retrying is pointless.",
    changes: [
      {
        type: "Added",
        text: "`PermanentError` skips remaining attempts and dead-letters the job.",
      },
      {
        type: "Added",
        text: "`jobs.retry` for a single failed job, and `stack jobs retry --since` in the CLI.",
      },
      {
        type: "Fixed",
        text: "Dead-letter retention reported 7 days in the dashboard while keeping 14.",
      },
    ],
  },
  {
    version: "3.1.0",
    date: "2026-07-16",
    title: "Python client 1.8",
    body: "Parity with the TypeScript client for schedules and idempotency.",
    changes: [
      {
        type: "Added",
        text: "Python: `schedules.create` and `idempotency_key` on every write.",
      },
      {
        type: "Changed",
        text: "API: `idempotency_mismatch` now includes the original request id.",
      },
    ],
  },
  {
    version: "3.0.0",
    date: "2026-06-02",
    title: "Version 3",
    body: "A cleaner API surface. The v2 API keeps working until June 2027.",
    breaking: true,
    changes: [
      {
        type: "Changed",
        text: "All fields are snake_case in JSON; the TypeScript client still exposes camelCase.",
      },
      {
        type: "Changed",
        text: "Events and jobs are separate resources; `/v2/messages` is split in two.",
      },
      {
        type: "Added",
        text: "Webhook signatures include a timestamp to defeat replay.",
      },
      {
        type: "Deprecated",
        text: "The v2 API. Read-only from March 2027, removed June 2027.",
      },
    ],
  },
  {
    version: "2.9.4",
    date: "2026-04-21",
    title: "Last v2 patch",
    body: "Security fix backported for teams still on v2.",
    changes: [
      {
        type: "Fixed",
        text: "Constant-time comparison in v2 webhook signature checks.",
      },
    ],
  },
];

/* ---------- About ---------- */

export const about = {
  title: "About the project",
  h1: "Built by people who were paged for it first.",
  lead: "Stack began in 2019 as the job runner inside a Lisbon freight company, written after the third night a Redis queue lost a batch of customs filings. It has been open source since 2021 and a hosted service since 2023.",
  story: [
    "The first version was 600 lines and one rule: never acknowledge work that isn't on disk. That rule is still the first test in the suite.",
    "Today the server is Apache-2.0 licensed and runs in production at a few thousand companies, most of whom we only know from their bug reports. Stack Cloud, the hosted version, pays for the eleven people who maintain both.",
    "We write the documentation ourselves. The engineer who ships a feature writes its guide in the same pull request, and a feature without a guide does not ship.",
  ],
  principles: {
    heading: "What we hold to",
    items: [
      {
        term: "Durable before fast",
        text: "We will add 4 ms of latency before we add a window where work can be lost.",
      },
      {
        term: "Boring protocols",
        text: "HTTPS and JSON. If curl can't do it, the API is wrong.",
      },
      {
        term: "Errors are documentation",
        text: "Every error message names the field and the fix. We review them like copy.",
      },
      {
        term: "Major versions are promises",
        text: "Nothing breaks inside a major version, and each one is supported for a year after the next ships.",
      },
    ],
  },
  team: {
    heading: "Maintainers",
    people: [
      {
        name: "Inês Calado",
        role: "Founder, server",
        place: "Lisbon",
        focus: "Storage engine, leases",
      },
      {
        name: "Tobias Wren",
        role: "TypeScript client",
        place: "Leeds",
        focus: "Workers, shutdown, the CLI",
      },
      {
        name: "Amara Okafor",
        role: "Webhooks",
        place: "Lagos",
        focus: "Delivery, signatures, retries",
      },
      {
        name: "Kenji Arai",
        role: "Python and Go clients",
        place: "Osaka",
        focus: "Client parity",
      },
      {
        name: "Marta Nowak",
        role: "Documentation",
        place: "Kraków",
        focus: "Guides, error copy, this site",
      },
      {
        name: "Rui Bastos",
        role: "Infrastructure",
        place: "Porto",
        focus: "Stack Cloud regions, on-call",
      },
    ],
  },
  governance: {
    heading: "How the project runs",
    rows: [
      { term: "License", value: "Apache-2.0 for the server and every client" },
      { term: "Releases", value: "Minor every three weeks, patches as needed" },
      {
        term: "Changes",
        value: "Public RFCs for anything that touches the API",
      },
      { term: "Security", value: "security@stack.example, 90-day disclosure" },
    ],
  },
};

/* ---------- Support ---------- */

export const support = {
  title: "Support",
  h1: "Talk to the people who wrote it.",
  lead: "Questions, bugs and incidents go to the same small team that maintains the code. Include a project id and a request id and we can usually answer on the first reply.",
  topics: [
    "Question about the docs",
    "Bug report",
    "Production incident",
    "Billing",
    "Security disclosure",
  ],
  sdks: [
    "TypeScript 3.4",
    "TypeScript 3.3 or older",
    "Python 1.8",
    "Go 0.9",
    "CLI",
    "Raw HTTP",
  ],
  severities: [
    { value: "low", label: "Low", hint: "Question or minor bug" },
    {
      value: "normal",
      label: "Normal",
      hint: "Something is broken, with a workaround",
    },
    { value: "urgent", label: "Urgent", hint: "Production is down" },
  ],
  response: {
    heading: "Response times",
    rows: [
      { plan: "Community", first: "Best effort", hours: "GitHub Discussions" },
      {
        plan: "Team",
        first: "1 working day",
        hours: "Mon–Fri, 08:00–18:00 WET",
      },
      {
        plan: "Enterprise",
        first: "1 hour, urgent",
        hours: "24 / 7 with on-call engineer",
      },
    ],
  },
  faq: {
    heading: "Before you write",
    items: [
      {
        q: "Where do I find a request id?",
        a: "Every API response carries an x-request-id header, and every error body repeats it as request_id. The client logs it at debug level.",
      },
      {
        q: "A job is stuck in active. Is it lost?",
        a: "No. If its worker died, the 30-second lease expires and the job returns to queued. If it stays active longer, the handler is still running or awaiting something that never resolves.",
      },
      {
        q: "Can you recover a deleted schedule?",
        a: "Yes, within 7 days. Send us the schedule name and project id and we restore it in its last state.",
      },
      {
        q: "How do I report a vulnerability?",
        a: "Choose Security disclosure below or write to security@stack.example. Please don't open a public issue.",
      },
    ],
  },
};

/* ---------- Search, 404 ---------- */

export const searchPage = {
  title: "Search",
  h1: "Search the docs",
  suggestions: ["webhook", "retry", "idempotency", "cron", "progress"],
};

export const notFound = {
  title: "Page not found",
  h1: "No page at this address.",
  body: "It may have moved in the v3 restructure. Search usually finds the new home.",
};
