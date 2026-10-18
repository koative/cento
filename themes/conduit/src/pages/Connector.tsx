import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { connectors, type Connector } from "../content";
import { date, num } from "../lib/format";
import { Console } from "../components/Console";
import { Mark } from "../components/bits";

export default function ConnectorPage({
  connector: c,
}: {
  connector: Connector;
}) {
  const related = [
    ...connectors.filter((x) => x.slug !== c.slug && x.category === c.category),
    ...connectors.filter((x) => x.category !== c.category),
  ].slice(0, 3);
  const facts: [string, string][] = [
    ["Category", c.category],
    ["Auth", c.auth],
    ["Rate limit", c.rateLimit],
    ["Median latency", `${c.latency} ms`],
    ["Available from", `${c.plan} plan`],
    [
      "Maintained by",
      c.maintainer === "Conduit" ? "Conduit" : "Partner, reviewed by Conduit",
    ],
    ["Installs", num(c.installs)],
    ["Last updated", date(c.updated)],
  ];

  return (
    <div className="wrap page">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/connectors">Connectors</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{c.name}</span>
      </nav>

      <header className="connector-head">
        <Mark connector={c} size="lg" />
        <div>
          <h1>{c.name}</h1>
          <p className="lede">{c.summary}</p>
        </div>
      </header>

      <div className="connector-grid">
        <div className="connector-main">
          <p className="prose">{c.description}</p>

          <h2>Actions</h2>
          <ul className="endpoint-list">
            {c.actions.map((a) => (
              <li key={a.id}>
                <p className="console-line">
                  <span className="method" data-method={a.method}>
                    {a.method}
                  </span>
                  <code>{a.path}</code>
                </p>
                <h3>{a.name}</h3>
                <p>{a.summary}</p>
                {a.required.length > 0 && (
                  <p className="muted">
                    Required:{" "}
                    {a.required.map((r, i) => (
                      <span key={r}>
                        {i > 0 && ", "}
                        <code>{r}</code>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <h2>Events</h2>
          {c.triggers.length ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Fires when</th>
                </tr>
              </thead>
              <tbody>
                {c.triggers.map((t) => (
                  <tr key={t.event}>
                    <td>
                      <code>{t.event}</code>
                    </td>
                    <td>{t.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="muted">
              {c.name} is write-only: it receives data and emits no events.
            </p>
          )}

          <h2>Set it up</h2>
          <ol className="steps">
            {c.setup.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        <aside className="connector-facts" aria-label={`${c.name} facts`}>
          <dl>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h2 className="facts-title">Scopes requested</h2>
            <ul className="scope-list">
              {c.scopes.map((s) => (
                <li key={s}>
                  <code>{s}</code>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/signup" className="btn btn-signal">
            Connect {c.name}
          </Link>
        </aside>
      </div>

      <section className="connector-try" aria-label={`Try ${c.name}`}>
        <h2>Try {c.name} without an account</h2>
        <p>
          The console below is preloaded with {c.name}. It runs locally against
          sample data.
        </p>
        <Console compact initial={c.slug} key={c.slug} />
      </section>

      <section className="section">
        <h2 className="section-title">Often wired together</h2>
        <ul className="port-list">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/connectors/${r.slug}`} className="port-row">
                <Mark connector={r} />
                <span className="port-name">
                  <strong>{r.name}</strong>
                  <span>{r.summary}</span>
                </span>
                <span className="port-meta">{r.category}</span>
                <ArrowRight size={18} aria-hidden className="port-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
