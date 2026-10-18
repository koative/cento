import { ArrowRight, FileText } from "lucide-react";
import { Link } from "../router";
import { platform, shipments, type QuoteMode } from "../content";
import { NetworkMap } from "../components/NetworkMap";
import { price, tariffs, draft } from "../lib/quote";
import { mapShare } from "../lib/shipment";
import { num } from "../lib/format";

const railSample = shipments.find((s) => s.id === "RLY-4822-0412")!;

function Visibility() {
  return (
    <div className="feature-visual">
      <NetworkMap
        route={railSample.route}
        share={mapShare(railSample)}
        labels="route"
        label="Live position of a rail shipment between Duisburg and Milan"
      />
    </div>
  );
}

function Exception() {
  return (
    <div
      className="feature-visual thread"
      role="img"
      aria-label="Example exception thread on a shipment"
    >
      <div className="thread-alert">
        <span className="pill pill-bad">Exception</span>
        <p>
          <strong>RLY-4822-0219</strong> Delivery refused: consignee dock closed
          for stocktake.
        </p>
      </div>
      <ul aria-hidden="true">
        <li>
          <span className="avatar">PN</span>
          <p>
            <strong>Piotr · Relay control tower</strong> Re-delivery booked 20
            Oct, 08:00–10:00. Consignee confirmed by phone.
          </p>
        </li>
        <li>
          <span className="avatar alt">JD</span>
          <p>
            <strong>Jamie · Form &amp; Field</strong> Thanks. Please add
            tail-lift, their forklift is in service.
          </p>
        </li>
        <li>
          <span className="avatar">PN</span>
          <p>
            <strong>Piotr · Relay control tower</strong> Tail-lift added, no
            charge on re-delivery.
          </p>
        </li>
      </ul>
    </div>
  );
}

function Documents() {
  const docs = [
    ["eCMR RLY-4821-0937", "Signed at collection · 18 Oct 06:42"],
    ["Hub photos, Frankfurt", "4 images · 19 Oct 03:15"],
    ["Customs MRN 26NL0001X8F2", "Released · 18 Oct 22:10"],
    ["POD RLY-4821-1104", "Signed M. Vidal · 17 Oct 11:48"],
  ];
  return (
    <ul
      className="feature-visual doc-list"
      aria-label="Example documents attached to shipments"
    >
      {docs.map(([t, m]) => (
        <li key={t}>
          <FileText size={18} aria-hidden />
          <span className="num">{t}</span>
          <span className="muted small">{m}</span>
        </li>
      ))}
    </ul>
  );
}

function Emissions() {
  const lane = {
    ...draft.current,
    from: "RTM",
    to: "MIL",
    pallets: 16,
    weight: 12000,
  };
  const rows = (["ftl", "rail", "groupage"] as QuoteMode[]).map((m) => {
    const r = price({ ...lane, mode: m });
    return { label: tariffs[m].label, co2: r.ok ? r.co2 : 0 };
  });
  const max = Math.max(...rows.map((r) => r.co2));
  return (
    <figure className="feature-visual co2-chart">
      <figcaption>CO₂e for 12 t, Rotterdam → Milan</figcaption>
      <svg
        viewBox="0 0 400 150"
        role="img"
        aria-label={rows
          .map((r) => `${r.label} ${num(r.co2)} kilograms`)
          .join(", ")}
      >
        {rows.map((r, i) => {
          const w = (r.co2 / max) * 250;
          return (
            <g key={r.label} transform={`translate(0 ${i * 48 + 8})`}>
              <text x="0" y="22" className="chart-label">
                {r.label}
              </text>
              <rect
                x="120"
                y="6"
                width={w}
                height="24"
                className={i === 1 ? "bar-accent" : "bar"}
              />
              <text x={128 + w} y="23" className="chart-value">
                {num(r.co2)} kg
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function Api() {
  return (
    <pre
      className="feature-visual code"
      tabIndex={0}
      aria-label="Example API request and response"
    >
      <code>{platform.apiSample}</code>
    </pre>
  );
}

const visuals = [Visibility, Exception, Documents, Emissions, Api];

export default function Platform() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{platform.h1}</h1>
          <p className="lede">{platform.lead}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary">
              Open the shipments demo <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/pricing" className="btn btn-ghost">
              See plans
            </Link>
          </div>
        </div>
      </section>

      {platform.features.map((f, i) => {
        const Visual = visuals[i];
        return (
          <section
            key={f.name}
            className={`feature-row ${i % 2 ? "is-flipped" : ""}`}
          >
            <div className="wrap feature-grid">
              <div className="feature-copy">
                <h2>{f.name}</h2>
                <p>{f.text}</p>
                <ul className="tag-list">
                  {f.detail.map((d) => (
                    <li key={d} className="num">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <Visual />
            </div>
          </section>
        );
      })}

      <section className="section section-sunk">
        <div className="wrap split">
          <div>
            <h2>Connects to the systems you run</h2>
            <p className="muted">{platform.integrationsNote}</p>
          </div>
          <ul className="integration-list">
            {platform.integrations.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-row">
          <h2>See it with real-looking freight</h2>
          <p>
            The demo workspace has 16 shipments across every mode, two open
            exceptions and a settings screen.
          </p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-lg">
              Open the demo
            </Link>
            <Link to="/signin" className="btn btn-ghost btn-lg">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
