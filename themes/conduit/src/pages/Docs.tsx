import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, docs, quickstart } from "../content";
import { CodeTabs } from "../components/bits";

const sections = [
  { id: "quickstart", label: "Quickstart" },
  { id: "concepts", label: "Concepts" },
  { id: "errors", label: "Errors" },
  { id: "guides", label: "Guides" },
];

const install = [
  { label: "npm", code: "npm install @conduit/sdk" },
  { label: "pip", code: "pip install conduit-sdk" },
];
const env = [
  {
    label: "Shell",
    code: "export CONDUIT_KEY=ck_test_4fQ9…   # from Settings → API keys",
  },
];

export default function Docs() {
  return (
    <div className="wrap page docs">
      <header className="page-head">
        <h1>{docs.heading}</h1>
        <p className="lede">{docs.lede}</p>
      </header>

      <div className="docs-grid">
        <nav className="docs-nav" aria-label="On this page">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(s.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="muted">
            Base URL
            <br />
            <code>{brand.apiBase}</code>
          </p>
        </nav>

        <div className="docs-body">
          <section id="quickstart" aria-labelledby="quickstart-h">
            <h2 id="quickstart-h">Quickstart</h2>
            <ol className="steps">
              <li>
                <h3>Install the SDK</h3>
                <p>
                  Or skip it — every call is plain HTTPS with a bearer token.
                </p>
                <CodeTabs tabs={install} />
              </li>
              <li>
                <h3>Set your test key</h3>
                <p>
                  Test keys only reach sandbox credentials, so nothing real is
                  charged or shipped.
                </p>
                <CodeTabs tabs={env} />
              </li>
              <li>
                <h3>Make a call</h3>
                <p>
                  Paths are always{" "}
                  <code>/&lt;connector&gt;/&lt;resource&gt;</code>. The response
                  wraps the provider's data in <code>data</code> and adds{" "}
                  <code>meta</code>.
                </p>
                <CodeTabs tabs={quickstart} />
              </li>
            </ol>
          </section>

          <section id="concepts" aria-labelledby="concepts-h">
            <h2 id="concepts-h">Concepts</h2>
            <dl className="notes notes-stack">
              {docs.concepts.map((c) => (
                <div key={c.id}>
                  <dt>{c.name}</dt>
                  <dd>{c.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="errors" aria-labelledby="errors-h">
            <h2 id="errors-h">Errors</h2>
            <p>
              Every error body has the same shape. The message always names the
              fix.
            </p>
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Error codes"
            >
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Code</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.errors.map((e) => (
                    <tr key={e.code}>
                      <td className="tabular">{e.status}</td>
                      <td>
                        <code>{e.code}</code>
                      </td>
                      <td>{e.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="guides" aria-labelledby="guides-h">
            <h2 id="guides-h">Guides</h2>
            <ul className="guide-links">
              {docs.guides.map((g) => (
                <li key={g.label}>
                  <Link to={g.to}>{g.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <aside className="callout">
            <h2>The full API reference lives in your workspace</h2>
            <p>
              Every endpoint, generated from the same schemas the gateway
              validates against — so it can't drift.
            </p>
            <Link to="/signup" className="link-arrow">
              Create a free workspace <ArrowRight size={16} aria-hidden />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
