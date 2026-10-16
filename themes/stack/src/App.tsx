import { useState } from "react";
import {
  Layers,
  Search,
  Check,
  Copy,
  ArrowRight,
  Menu,
  BookOpen,
  Terminal,
  Code2,
  ExternalLink,
} from "lucide-react";
const pages = [
  {
    name: "Quickstart",
    group: "GET STARTED",
    title: "From zero to your first event.",
    intro:
      "Add Stack to a project, create a client, and send an event. Your first integration should feel like a small step.",
    code: 'import { Stack } from "@stack/client";\n\nconst stack = new Stack({\n  project: "your-project",\n  key: process.env.STACK_KEY,\n});\n\nawait stack.events.send({\n  name: "project.created",\n  data: { id: "project_01" },\n});',
  },
  {
    name: "Authentication",
    group: "GET STARTED",
    title: "Keep your keys close.",
    intro:
      "Every server-side request uses a project key. Keep credentials out of browser code and rotate them when a team or service changes.",
    code: 'const stack = new Stack({\n  project: "your-project",\n  key: process.env.STACK_KEY,\n});\n\n// Keep this client on the server.\n// Never commit a secret key.',
  },
  {
    name: "Send an event",
    group: "BUILD",
    title: "One event. Many possibilities.",
    intro:
      "Events carry a name and a JSON payload. Give each event a meaningful name so subscribers know what happened.",
    code: 'await stack.events.send({\n  name: "order.completed",\n  data: { orderId: "ord_42", total: 89 },\n  idempotencyKey: "order_42_completed",\n});',
  },
  {
    name: "Webhooks",
    group: "BUILD",
    title: "Let your services talk.",
    intro:
      "Subscribe an endpoint to selected events. Validate the signature, respond quickly, and process the payload in your own queue.",
    code: 'app.post("/webhooks/stack", async (req) => {\n  const event = stack.webhooks.verify({\n    body: req.rawBody,\n    signature: req.headers["stack-signature"],\n  });\n  await queue.add(event);\n  return { received: true };\n});',
  },
  {
    name: "Error handling",
    group: "REFERENCE",
    title: "A useful error is a next step.",
    intro:
      "Handle failures explicitly. Retry temporary errors with backoff and help people recover from invalid input.",
    code: "try {\n  await stack.events.send(event);\n} catch (error) {\n  if (error.retryable) {\n    await retryWithBackoff(event);\n  } else {\n    log.error(error.message);\n  }\n}",
  },
];
export default function App() {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState("bun");
  const [menu, setMenu] = useState(false);
  const [event, setEvent] = useState("project.created");
  const [result, setResult] = useState("");
  const p = pages[current];
  const filtered = pages.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <a className="skip" href="#article">
        Skip to documentation
      </a>
      <header className="docs-header">
        <a className="brand" href="#">
          <Layers />
          stack<span>docs</span>
        </a>
        <label className="search">
          <Search size={16} />
          <input
            aria-label="Search documentation"
            placeholder="Find something…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <a href="#playground">
          Try the playground <ArrowRight />
        </a>
        <button
          className="menu"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          <Menu />
        </button>
      </header>
      <div className="docs-layout">
        <aside className={menu ? "sidebar open" : "sidebar"}>
          <span className="version">
            JavaScript SDK <small>v0.1 / Concept</small>
          </span>
          {["GET STARTED", "BUILD", "REFERENCE"].map((group) => (
            <div className="nav-group" key={group}>
              <h2>{group}</h2>
              {filtered
                .filter((p) => p.group === group)
                .map((p) => (
                  <button
                    key={p.name}
                    aria-current={
                      current === pages.indexOf(p) ? "page" : undefined
                    }
                    onClick={() => {
                      setCurrent(pages.indexOf(p));
                      setCopied(false);
                      setMenu(false);
                    }}
                  >
                    {p.name}
                    {current === pages.indexOf(p) && <ArrowRight size={14} />}
                  </button>
                ))}
            </div>
          ))}
          {!filtered.length && (
            <p className="no-results" role="status">
              No pages match “{query}”. Try “events” or clear the search.
            </p>
          )}
          <div className="sidebar-note">
            <BookOpen />
            <p>
              Built to be read.
              <br />
              Ready to be explored.
            </p>
            <span>Fictional SDK documentation.</span>
          </div>
        </aside>
        <main id="article">
          <div className="breadcrumbs">
            Documentation <span>/</span> {p.name}
          </div>
          <h1>{p.title}</h1>
          <p className="lead">{p.intro}</p>
          <div className="concept-note">
            <span>Concept documentation</span>
            <p>
              Stack is a fictional SDK. These examples illustrate a
              documentation template; the package is not published.
            </p>
          </div>
          <section className="installation">
            <h2>{current === 0 ? "Install the client" : "Before you begin"}</h2>
            <p>
              {current === 0
                ? "Choose your package manager. The sample command is shown for reference."
                : "This example assumes a server-side project with a configured Stack client."}
            </p>
            <div className="code-box">
              <div className="code-tabs">
                {["bun", "npm", "pnpm"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={packageManager === x}
                    onClick={() => setPackageManager(x)}
                  >
                    {x}
                  </button>
                ))}
                <span>Terminal</span>
              </div>
              <pre>
                <code>
                  {packageManager === "npm"
                    ? "npm install"
                    : packageManager + " add"}{" "}
                  @stack/client
                </code>
              </pre>
            </div>
          </section>
          <section className="example">
            <h2>
              {p.name === "Quickstart"
                ? "Create your first event"
                : p.name + " example"}
            </h2>
            <div className="code-box">
              <div className="code-top">
                <span>
                  <Code2 size={15} /> example.ts
                </span>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(p.code);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Copied" : "Copy code"}
                </button>
              </div>
              <pre>
                <code>{p.code}</code>
              </pre>
            </div>
            <p className="copy-status" role="status">
              {copied ? "Code copied to your clipboard." : ""}
            </p>
          </section>
          <section id="playground" className="playground">
            <div>
              <Terminal />
              <h2>Try an event.</h2>
            </div>
            <p>
              A local request simulator. Change the event name and see the
              response shape.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setResult(
                  JSON.stringify(
                    {
                      id: "evt_demo_001",
                      name: event,
                      status: "accepted",
                      mode: "local-simulation",
                    },
                    null,
                    2,
                  ),
                );
              }}
            >
              <label>
                Event name
                <input
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  required
                  pattern="[a-z]+\.[a-z]+"
                  title="Use a lowercase name such as project.created"
                />
              </label>
              <button className="btn" type="submit">
                Send sample event <ArrowRight />
              </button>
            </form>
            {result && <pre role="status">{result}</pre>}
          </section>
          <footer className="docs-footer">
            <span>
              Fictional documentation by Koative. No network request is sent.
            </span>
            <button
              onClick={() => {
                setCurrent((current + 1) % pages.length);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next: {pages[(current + 1) % pages.length].name} <ArrowRight />
            </button>
          </footer>
        </main>
        <aside className="on-page">
          <span>ON THIS PAGE</span>
          <a href="#article">Overview</a>
          <a href="#playground">Interactive playground</a>
          <div>
            <strong>Readable by design.</strong>
            <p>A small API should leave room for big ideas.</p>
            <ExternalLink size={15} />
          </div>
        </aside>
      </div>
    </>
  );
}
