import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { platform } from "../content";

function Visual({ id }: { id: string }) {
  if (id === "vault")
    return (
      <table className="viz-table" aria-label="Example vault entries">
        <thead>
          <tr>
            <th scope="col">Connection</th>
            <th scope="col">Credential</th>
            <th scope="col">Refreshes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tillpoint — live</td>
            <td>
              <code>rk_live_••••••3f9A</code>
            </td>
            <td className="tabular">never expires</td>
          </tr>
          <tr>
            <td>Shelfwise — main</td>
            <td>
              <code>oauth ••••••c21e</code>
            </td>
            <td className="tabular">in 41 min</td>
          </tr>
          <tr>
            <td>Quillbook — 2026</td>
            <td>
              <code>oauth ••••••77b0</code>
            </td>
            <td className="tabular">in 6 h</td>
          </tr>
          <tr>
            <td>SFTP — Partwell</td>
            <td>
              <code>ssh-ed25519 ••••Qk</code>
            </td>
            <td className="tabular warn-text">rotate in 12 days</td>
          </tr>
        </tbody>
      </table>
    );
  if (id === "transform")
    return (
      <table
        className="viz-table"
        aria-label="Example field mapping from Conduit order to Quillbook invoice"
      >
        <thead>
          <tr>
            <th scope="col">Conduit order</th>
            <th scope="col">Quillbook invoice</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["customer.name", "contact.display_name"],
            ["total (cents)", "amount (decimal string)"],
            ["currency", "currency_code (upper)"],
            ["items[].title", "lines[].description"],
            ["placed_at", "issue_date (ledger timezone)"],
          ].map(([a, b]) => (
            <tr key={a}>
              <td>
                <code>{a}</code>
              </td>
              <td>
                <code>{b}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  if (id === "delivery")
    return (
      <svg
        className="viz-retry"
        viewBox="0 0 520 150"
        role="img"
        aria-label="Three attempts: two 429 responses with growing waits, then success"
      >
        <line x1="20" y1="80" x2="500" y2="80" className="axis" />
        {[
          { x: 30, w: 30, ok: false, label: "429" },
          { x: 120, w: 30, ok: false, label: "429" },
          { x: 330, w: 70, ok: true, label: "201" },
        ].map((a, i) => (
          <g key={i} className={a.ok ? "try ok" : "try fail"}>
            <rect x={a.x} y={62} width={a.w} height={36} rx={4} />
            <text x={a.x + a.w / 2} y={50} textAnchor="middle">
              {a.label}
            </text>
          </g>
        ))}
        <path d="M60 116 H120" className="wait" />
        <path d="M150 116 H330" className="wait" />
        <text x="90" y="138" textAnchor="middle" className="wait-label">
          200 ms
        </text>
        <text x="240" y="138" textAnchor="middle" className="wait-label">
          400 ms + jitter
        </text>
      </svg>
    );
  return (
    <ul className="viz-log" aria-label="Example log lines">
      {[
        ["09:12:04.118", "201", "POST /tillpoint/charges", "214 ms"],
        ["09:12:04.402", "200", "PATCH /shelfwise/orders/ORD-2048", "301 ms"],
        ["09:12:05.007", "201", "POST /quillbook/invoices", "488 ms"],
        ["09:12:05.311", "502", "POST /ferryline/labels", "3 tries"],
        ["09:12:06.020", "201", "POST /mailroom/send", "71 ms"],
      ].map(([t, s, p, d]) => (
        <li key={t}>
          <span className="tabular muted">{t}</span>
          <span className={`code-pill ${s.startsWith("2") ? "ok" : "err"}`}>
            {s}
          </span>
          <code>{p}</code>
          <span className="tabular">{d}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Platform() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>{platform.heading}</h1>
        <p className="lede">{platform.lede}</p>
        <div
          className="toc"
          role="group"
          aria-label="Jump to a part of the platform"
        >
          {platform.features.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              onClick={() =>
                document
                  .getElementById(f.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {f.name}
            </button>
          ))}
        </div>
      </header>

      {platform.features.map((f, i) => (
        <section
          key={f.id}
          id={f.id}
          className={i % 2 ? "feature band" : "feature"}
          aria-labelledby={`${f.id}-h`}
        >
          <div className="wrap feature-row">
            <div className="feature-copy">
              <h2 id={`${f.id}-h`}>{f.heading}</h2>
              <p>{f.body}</p>
              <ul className="ticks">
                {f.points.map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature-visual">
              <Visual id={f.id} />
            </div>
          </div>
        </section>
      ))}

      <section className="wrap section regions">
        <div className="split-head">
          <h2>{platform.regions.heading}</h2>
          <p>{platform.regions.body}</p>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Region</th>
              <th scope="col">City</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {platform.regions.list.map((r) => (
              <tr key={r.code}>
                <td>
                  <code>{r.code}</code>
                </td>
                <td>{r.city}</td>
                <td>{r.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="band">
        <div className="wrap section">
          <h2 className="section-title">{platform.security.heading}</h2>
          <dl className="notes">
            {platform.security.items.map((s) => (
              <div key={s.term}>
                <dt>{s.term}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>See the pipeline run, phase by phase.</h2>
          <p>
            The request console replays auth, mapping, retries and logging in
            your browser.
          </p>
          <div className="actions">
            <Link to="/console" className="btn btn-signal btn-lg">
              Open the console
            </Link>
            <Link to="/connectors" className="btn btn-quiet btn-lg">
              Browse connectors <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
