import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  changelog,
  connectors,
  home,
  pricing,
  quickstart,
  status,
} from "../content";
import { date, num } from "../lib/format";
import { Console } from "../components/Console";
import { PatchBay } from "../components/PatchBay";
import { UptimeBars } from "../components/UptimeBars";
import { CodeTabs, Mark } from "../components/bits";

export default function Home() {
  const { hero } = home;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{hero.heading}</h1>
          <p className="lede">{hero.lede}</p>
          <div className="actions">
            <Link to={hero.primary.to} className="btn btn-signal btn-lg">
              {hero.primary.label}
            </Link>
            <Link to={hero.secondary.to} className="btn btn-quiet btn-lg">
              {hero.secondary.label}
            </Link>
          </div>
        </div>
        <Console compact />
      </section>

      <section className="band patch">
        <div className="wrap">
          <div className="split-head">
            <h2>{home.patch.heading}</h2>
            <p>{home.patch.body}</p>
          </div>
          <figure className="patch-figure">
            <PatchBay />
            <figcaption>
              Cable colour marks the connector category. Select a port to open
              its connector page.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="wrap section">
        <div className="split-head">
          <h2>{home.directory.heading}</h2>
          <p>{home.directory.body}</p>
        </div>
        <ul className="port-list">
          {connectors.slice(0, 6).map((c) => (
            <li key={c.slug}>
              <Link to={`/connectors/${c.slug}`} className="port-row">
                <Mark connector={c} />
                <span className="port-name">
                  <strong>{c.name}</strong>
                  <span>{c.summary}</span>
                </span>
                <span className="port-meta">{c.category}</span>
                <span className="port-meta tabular">p50 {c.latency} ms</span>
                <ArrowRight size={18} aria-hidden className="port-arrow" />
              </Link>
            </li>
          ))}
        </ul>
        <Link to={home.directory.link.to} className="link-arrow">
          {home.directory.link.label} — {connectors.length} connectors{" "}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="band">
        <div className="wrap section">
          <h2 className="section-title">{home.path.heading}</h2>
          <ol className="pathway">
            {home.path.steps.map((s, i) => (
              <li key={s.name}>
                <span className="pathway-node" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.name}</h3>
                <p className="pathway-ms tabular">{s.ms}</p>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section code-split">
        <div>
          <h2>{home.code.heading}</h2>
          <p>{home.code.body}</p>
          <Link to={home.code.link.to} className="link-arrow">
            {home.code.link.label} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <CodeTabs tabs={quickstart} />
      </section>

      <section className="wrap quote-section">
        <figure className="big-quote">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.quote.name}</strong> {home.quote.role}
          </figcaption>
        </figure>
      </section>

      <section className="band">
        <div className="wrap section status-teaser">
          <div>
            <h2>{home.status.heading}</h2>
            <p>{home.status.body}</p>
            <Link to={home.status.link.to} className="link-arrow">
              {home.status.link.label} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <ul className="uptime-list">
            {status.components.slice(0, 4).map((c) => (
              <li key={c.name + c.region}>
                <div className="uptime-head">
                  <span
                    className="state-dot"
                    data-state={c.state}
                    aria-hidden="true"
                  />
                  <span>
                    {c.name} <span className="muted">{c.region}</span>
                  </span>
                  <span className="tabular muted">{c.uptime}%</span>
                </div>
                <UptimeBars
                  seed={c.seed}
                  uptime={c.uptime}
                  days={60}
                  today={c.state}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="split-head">
          <h2>{home.pricing.heading}</h2>
          <p>{home.pricing.body}</p>
        </div>
        <div className="plan-rail">
          {pricing.tiers.map((t) => (
            <Link key={t.name} to="/pricing" className="plan-stop">
              <span className="plan-stop-name">{t.name}</span>
              <span className="plan-stop-price">
                {t.monthly === null
                  ? "Custom"
                  : t.monthly === 0
                    ? "Free"
                    : `$${t.monthly}/mo`}
              </span>
              <span className="muted">
                {t.requests ? `${num(t.requests)} requests` : t.overage}
              </span>
            </Link>
          ))}
        </div>
        <Link to={home.pricing.link.to} className="link-arrow">
          {home.pricing.link.label} <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="wrap section latest">
        <div>
          <h2>Recently shipped</h2>
          <ul className="mini-log">
            {changelog.entries.slice(0, 4).map((e) => (
              <li key={e.version}>
                <span className="tag" data-kind={e.kind}>
                  {e.kind}
                </span>
                <span>{e.title}</span>
                <time className="muted tabular" dateTime={e.date}>
                  {date(e.date)}
                </time>
              </li>
            ))}
          </ul>
          <Link to="/changelog" className="link-arrow">
            Full changelog <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div>
          <h2>Start here</h2>
          <ul className="guide-links">
            <li>
              <Link to="/docs">
                Quickstart: your first call in five minutes
              </Link>
            </li>
            <li>
              <Link to="/platform">How the auth vault stores credentials</Link>
            </li>
            <li>
              <Link to="/customers">
                How Northbank Tea wired checkout to its ledger
              </Link>
            </li>
            <li>
              <Link to="/app">Tour the dashboard with demo data</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.close.heading}</h2>
          <p>{home.close.body}</p>
          <div className="actions">
            <Link to={home.close.primary.to} className="btn btn-signal btn-lg">
              {home.close.primary.label}
            </Link>
            <Link to={home.close.secondary.to} className="btn btn-quiet btn-lg">
              {home.close.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
