import { useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "../router";
import { brand, home, releases, resources } from "../content";
import { CodeBlock, CopyButton, Inline, MethodTag } from "../components/Code";
import { FlowDiagram } from "../components/Figures";

function Install() {
  const managers = Object.keys(home.install);
  const [pm, setPm] = useState(managers[0]);
  const cmd = home.install[pm];
  return (
    <div className="install">
      <div role="group" aria-label="Package manager" className="seg">
        {managers.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={pm === m}
            onClick={() => setPm(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <code className="install-cmd">
        <span aria-hidden>$ </span>
        {cmd}
      </code>
      <CopyButton text={cmd} />
    </div>
  );
}

function Tour() {
  const [i, setI] = useState(0);
  const tab = home.tour.tabs[i];
  return (
    <section className="section tour" aria-labelledby="tour-h">
      <div className="wrap tour-grid">
        <div>
          <h2 id="tour-h">{home.tour.heading}</h2>
          <div role="tablist" aria-label="Examples" className="tour-tabs">
            {home.tour.tabs.map((t, n) => (
              <button
                key={t.label}
                role="tab"
                id={`tour-tab-${n}`}
                aria-selected={i === n}
                aria-controls="tour-panel"
                tabIndex={i === n ? 0 : -1}
                onClick={() => setI(n)}
                onKeyDown={(e) => {
                  const d =
                    e.key === "ArrowDown" || e.key === "ArrowRight"
                      ? 1
                      : e.key === "ArrowUp" || e.key === "ArrowLeft"
                        ? -1
                        : 0;
                  if (!d) return;
                  e.preventDefault();
                  const next =
                    (n + d + home.tour.tabs.length) % home.tour.tabs.length;
                  setI(next);
                  document.getElementById(`tour-tab-${next}`)?.focus();
                }}
              >
                <span className="tour-label">{t.label}</span>
                <span className="tour-text">{t.text}</span>
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" id="tour-panel" aria-labelledby={`tour-tab-${i}`}>
          <CodeBlock code={tab.code} />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const latest = releases.slice(0, 3);
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.h1}</h1>
          <p className="lead">{home.lead}</p>
          <Install />
          <div className="actions">
            <Link to="/guides/quickstart" className="btn btn-primary">
              Read the quickstart <ArrowRight size={16} aria-hidden />
            </Link>
            <Link to="/api" className="btn btn-quiet">
              API reference
            </Link>
          </div>
        </div>
        <div className="hero-listing">
          <CodeBlock code={home.heroCode} />
          <div className="log" aria-label="Worker log output">
            <p className="log-head">
              <Terminal size={14} aria-hidden /> stack tail
            </p>
            <ol>
              {home.heroLog.map(([t, state, msg]) => (
                <li key={t}>
                  <span className="log-time">{t}</span>
                  <span className={`log-state log-${state}`}>{state}</span>
                  <span>{msg}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap contents" aria-labelledby="contents-h">
        <div className="contents-intro">
          <h2 id="contents-h">{home.contents.heading}</h2>
          <p>{home.contents.intro}</p>
        </div>
        <ol className="toc-list">
          {home.contents.entries.map((e, n) => (
            <li key={e.to}>
              <Link to={e.to}>
                <span className="toc-n">{n + 1}</span>
                <span className="toc-title">{e.title}</span>
                <span className="toc-note">{e.note}</span>
                <span className="toc-leader" aria-hidden />
                <span className="toc-meta">{e.meta}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="band how" aria-labelledby="how-h">
        <div className="wrap">
          <div className="how-head">
            <h2 id="how-h">{home.how.heading}</h2>
            <p>{home.how.body}</p>
          </div>
          <FlowDiagram />
          <dl className="how-notes">
            {home.how.notes.map((n) => (
              <div key={n.term}>
                <dt>{n.term}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Tour />

      <section className="wrap glance" aria-labelledby="glance-h">
        <div className="glance-head">
          <h2 id="glance-h">{home.api.heading}</h2>
          <p>
            <Inline text={home.api.body} />
          </p>
          <p className="base-url">
            <code>{brand.baseUrl}</code>
          </p>
        </div>
        <div className="table-scroll">
          <table className="data">
            <thead>
              <tr>
                <th scope="col">Resource</th>
                <th scope="col">Endpoints</th>
                <th scope="col">Summary</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr key={r.slug}>
                  <th scope="row">
                    <Link to={`/api/${r.slug}`}>{r.name}</Link>
                  </th>
                  <td>
                    <ul className="ep-mini">
                      {r.endpoints.map((e) => (
                        <li key={e.op}>
                          <MethodTag method={e.method} /> <code>{e.path}</code>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{r.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band-dark teaser" aria-labelledby="teaser-h">
        <div className="wrap teaser-grid">
          <div>
            <h2 id="teaser-h">{home.playground.heading}</h2>
            <p>{home.playground.body}</p>
            <Link to="/playground/jobs.enqueue" className="btn btn-primary">
              {home.playground.cta} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="teaser-demo" aria-hidden>
            <p className="teaser-req">
              <MethodTag method="POST" /> <code>/v3/jobs</code>
            </p>
            <pre>{`{ "name": "Emails.Welcome", "data": {} }`}</pre>
            <p className="teaser-res">
              <span className="status status-err">400</span>
              <code>
                name must be lowercase and dot-separated, like emails.welcome.
              </code>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap split" aria-labelledby="sdk-h">
        <div>
          <h2 id="sdk-h">{home.sdks.heading}</h2>
          <div className="table-scroll">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">Package</th>
                  <th scope="col">Version</th>
                  <th scope="col">Runs on</th>
                </tr>
              </thead>
              <tbody>
                {home.sdks.rows.map((s) => (
                  <tr key={s.name}>
                    <th scope="row">
                      {s.name}{" "}
                      {s.status === "Beta" && (
                        <span className="pill">Beta</span>
                      )}
                    </th>
                    <td>
                      <code>{s.pkg}</code>
                    </td>
                    <td className="tabular">{s.version}</td>
                    <td>{s.runtimes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2>Recent releases</h2>
          <ol className="recent">
            {latest.map((r) => (
              <li key={r.version}>
                <Link to="/changelog">
                  <span className="recent-v">{r.version}</span>
                  <span className="recent-t">{r.title}</span>
                  <time dateTime={r.date}>{r.date}</time>
                </Link>
              </li>
            ))}
          </ol>
          <Link to="/changelog" className="text-link">
            Full changelog <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="close wrap" aria-labelledby="close-h">
        <h2 id="close-h">{home.close.heading}</h2>
        <p>{home.close.body}</p>
        <div className="actions">
          <Link to="/support" className="btn btn-primary">
            {home.close.primary}
          </Link>
          <Link to="/search" className="btn btn-quiet">
            {home.close.secondary}
          </Link>
          <a href={`mailto:${brand.email}`} className="close-mail">
            {brand.email}
          </a>
        </div>
      </section>
    </>
  );
}
