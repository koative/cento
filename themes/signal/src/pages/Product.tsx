import { ArrowRight, BellRing } from "lucide-react";
import { Link } from "../router";
import {
  app,
  bookingFunnel,
  cohorts,
  dayLabels,
  events,
  product,
  wave,
} from "../content";
import { FunnelChart, LineChart } from "../components/Charts";
import { EventName, num } from "../components/format";

function Visual({ id }: { id: string }) {
  if (id === "dashboards") {
    const labels = dayLabels(30);
    return (
      <LineChart
        label="Bookings per day, this period against the previous period"
        labels={labels}
        format={(n) => num.format(Math.round(n))}
        series={[
          { label: "Bookings", values: wave(11, 30, 1480, 0.12, 0.006) },
          {
            label: "Previous 30 days",
            values: wave(29, 30, 1390, 0.12, 0.002),
            tone: "compare",
            dashed: true,
          },
        ]}
        annotations={app.annotations.map((a) => ({
          index: 29 - a.daysAgo,
          label: a.label,
        }))}
      />
    );
  }
  if (id === "funnels")
    return (
      <FunnelChart
        steps={bookingFunnel.slice(0, 4)}
        label="Four-step funnel from search to payment"
      />
    );
  if (id === "retention") {
    const weeks = cohorts[0].values.map((_, w) => {
      const rows = cohorts.filter((c) => c.values[w] !== undefined);
      return rows.reduce((a, c) => a + c.values[w], 0) / rows.length;
    });
    return (
      <LineChart
        label="Average weekly retention curve across nine cohorts"
        labels={weeks.map((_, i) => `Week ${i}`)}
        format={(n) => `${Math.round(n)}%`}
        series={[{ label: "Returning users", values: weeks }]}
        zeroBased
      />
    );
  }
  if (id === "catalog") {
    const e = events.find((x) => x.id === "booking_confirmed")!;
    return (
      <div className="catalog-card">
        <div className="catalog-card-head">
          <EventName id={e.id} />
          <span className="status" data-status={e.status}>
            {e.status}
          </span>
        </div>
        <p>{e.description}</p>
        <table className="data-table compact">
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Type</th>
              <th scope="col">Example</th>
            </tr>
          </thead>
          <tbody>
            {e.properties.map((p) => (
              <tr key={p.name}>
                <td>
                  <code>{p.name}</code>
                </td>
                <td>{p.type}</td>
                <td className="mono">{p.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="catalog-owner">
          Owner: {e.owner} · Source: {e.source}
        </p>
      </div>
    );
  }
  const values = wave(5, 30, 1310, 0.1, 0.002).map((v, i) =>
    i >= 22 && i <= 23 ? Math.round(v * 0.38) : v,
  );
  return (
    <div className="alert-demo">
      <LineChart
        label="Signups per day with an anomaly 8 days ago"
        labels={dayLabels(30)}
        format={(n) => num.format(Math.round(n))}
        series={[{ label: "signup_completed", values }]}
        annotations={[{ index: 22, label: "Release v8.3" }]}
      />
      <p className="alert-line">
        <BellRing size={16} aria-hidden />
        <span>
          <strong>{product.alert.title}</strong> {product.alert.text}
        </span>
      </p>
    </div>
  );
}

export default function Product() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{product.heading}</h1>
        <p className="lede">{product.intro}</p>
        <nav className="jump" aria-label="Capabilities on this page">
          {product.capabilities.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                document.getElementById(c.id)?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              {c.id}
            </button>
          ))}
        </nav>
      </header>

      {product.capabilities.map((c, i) => (
        <section
          key={c.id}
          id={c.id}
          className="wrap section capability"
          data-flip={i % 2 ? "" : undefined}
        >
          <div className="capability-copy">
            <h2>{c.title}</h2>
            <p>{c.text}</p>
            <ul className="ticks">
              {c.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <Visual id={c.id} />
          </div>
        </section>
      ))}

      <section className="band-dark">
        <div className="wrap section pipeline">
          <h2>{product.pipeline.title}</h2>
          <ol>
            {product.pipeline.steps.map((s) => (
              <li key={s.label}>
                <strong>{s.label}</strong>
                <span>{s.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section split">
        <div>
          <h2>{product.limitsTitle}</h2>
          <p>{product.limitsText}</p>
        </div>
        <dl className="spec-table">
          {product.limits.map((l) => (
            <div key={l.label}>
              <dt>{l.label}</dt>
              <dd className="num">{l.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section price-teaser">
        <h2>{product.closeTitle}</h2>
        <div className="actions">
          <Link to="/app" className="btn btn-primary btn-lg">
            Open the demo workspace
          </Link>
          <Link to="/pricing" className="text-link">
            See pricing <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
