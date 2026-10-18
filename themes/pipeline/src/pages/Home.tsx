import { useState } from "react";
import {
  ArrowRight,
  Check,
  Mail,
  Phone,
  CalendarDays,
  NotebookPen,
} from "lucide-react";
import { Link } from "../router";
import {
  app,
  contacts,
  deals as seedDeals,
  history,
  home,
  owners,
  pricing,
  stages,
  stories,
} from "../content";
import { BoardPreview } from "../components/BoardPreview";
import { ForecastCall } from "../components/ForecastCall";
import { WonChart } from "../components/Charts";
import { initials, shortDate, short } from "../lib/format";

const kindIcon = {
  call: Phone,
  email: Mail,
  meeting: CalendarDays,
  note: NotebookPen,
};

export default function Home() {
  const me = owners.find((o) => o.id === app.me)!;
  const [sheet, setSheet] = useState(() =>
    seedDeals.filter((d) => d.owner === me.id),
  );
  const sample = contacts.find((c) => c.id === "june-whitcombe")!;
  const october = seedDeals
    .filter((d) => d.stage === "won")
    .reduce((n, d) => n + d.value, 0);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.hero.h1}</h1>
          <p className="lede">{home.hero.lede}</p>
          <div className="cta-row">
            <Link to="/app" className="btn btn-primary btn-lg">
              Open the demo board <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/demo" className="btn btn-quiet btn-lg">
              Book a demo
            </Link>
          </div>
          <p className="quiet-note">{home.hero.note}</p>
        </div>
        <BoardPreview />
      </section>

      <section className="band band-sheet" aria-labelledby="h-forecast">
        <div className="wrap split split-wide">
          <div className="split-copy">
            <h2 id="h-forecast">{home.forecast.h2}</h2>
            <p>{home.forecast.body}</p>
            <p className="rep-line">
              <span className="avatar">{me.initials}</span>
              {me.name}, quarterly quota {short(me.quota)}
            </p>
          </div>
          <ForecastCall
            name="home"
            deals={sheet}
            quota={me.quota}
            onChange={(id, forecast) =>
              setSheet((s) =>
                s.map((d) => (d.id === id ? { ...d, forecast } : d)),
              )
            }
          />
        </div>
      </section>

      <section className="wrap section" aria-labelledby="h-stages">
        <div className="section-head">
          <h2 id="h-stages">{home.stages.h2}</h2>
          <p>{home.stages.body}</p>
        </div>
        <ol className="stage-track">
          {stages
            .filter((s) => home.stages.criteria[s.id])
            .map((s) => (
              <li key={s.id} data-stage={s.id}>
                <span className="stage-prob num">
                  {Math.round(s.probability * 100)}%
                </span>
                <h3>{s.label}</h3>
                <p>{home.stages.criteria[s.id]}</p>
              </li>
            ))}
        </ol>
      </section>

      <section className="band band-ink" aria-label="Customer quote">
        <figure className="wrap quote">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.quote.name}</strong>, {home.quote.role} ·{" "}
            <Link to={home.quote.to}>Read the story</Link>
          </figcaption>
        </figure>
      </section>

      <section className="wrap section split" aria-labelledby="h-record">
        <div className="split-copy">
          <h2 id="h-record">{home.record.h2}</h2>
          <p>{home.record.body}</p>
          <ul className="ticks">
            {home.record.points.map((p) => (
              <li key={p}>
                <Check size={18} aria-hidden /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="sheet record">
          <div className="record-head">
            <span className="avatar avatar-lg">{initials(sample.name)}</span>
            <div>
              <strong>{sample.name}</strong>
              <span>
                {sample.title}, {sample.company}
              </span>
            </div>
          </div>
          <ol className="timeline">
            {sample.activity.map((a) => {
              const Icon = kindIcon[a.kind];
              return (
                <li key={a.date + a.kind}>
                  <span className="timeline-icon">
                    <Icon size={15} aria-hidden />
                  </span>
                  <span className="timeline-date">{shortDate(a.date)}</span>
                  <p>{a.text}</p>
                </li>
              );
            })}
          </ol>
          <Link to={`/app/contacts/${sample.id}`} className="text-link">
            Open {sample.name.split(" ")[0]}'s card in the demo{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section
        className="wrap section split split-flip"
        aria-labelledby="h-reports"
      >
        <div className="split-copy">
          <h2 id="h-reports">{home.reports.h2}</h2>
          <p>{home.reports.body}</p>
          <Link to="/app/reports" className="text-link">
            See the reports in the demo <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="sheet chart-sheet">
          <p className="sheet-title">Won by month · {app.workspace}</p>
          <WonChart
            months={[
              ...history,
              { month: "Oct", won: october, target: 210000 },
            ]}
          />
          <p className="chart-key">
            <i className="key-bar" /> Won <i className="key-target" /> Monthly
            target
          </p>
        </div>
      </section>

      <section className="band band-canary" aria-labelledby="h-setup">
        <div className="wrap section">
          <h2 id="h-setup">{home.setup.h2}</h2>
          <ol className="steps">
            {home.setup.steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-n num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="h-stories">
        <div className="section-head section-head-row">
          <h2 id="h-stories">{home.stories.h2}</h2>
          <Link to="/customers" className="text-link">
            All customer stories <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="story-list">
          {stories.slice(0, 3).map((s) => (
            <li key={s.slug}>
              <Link to={`/customers/${s.slug}`} className="story-row">
                <span className="story-co">{s.company}</span>
                <span className="story-head">{s.headline}</span>
                <span className="story-meta">
                  {s.industry} · {s.reps} reps
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="wrap section pricing-teaser"
        aria-labelledby="h-pricing"
      >
        <div className="section-head">
          <h2 id="h-pricing">{home.pricing.h2}</h2>
          <p>{home.pricing.body}</p>
        </div>
        <dl className="price-strip">
          {pricing.plans.map((p) => (
            <div key={p.id} data-featured={p.featured ? "" : undefined}>
              <dt>{p.name}</dt>
              <dd>
                <span className="num price">${p.yearly}</span> per seat / month,
                billed yearly
              </dd>
            </div>
          ))}
        </dl>
        <Link to="/pricing" className="text-link">
          Compare plans <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="wrap close" aria-labelledby="h-close">
        <h2 id="h-close">{home.close.h2}</h2>
        <p>{home.close.body}</p>
        <div className="cta-row">
          <Link to="/app" className="btn btn-primary btn-lg">
            Open the demo board <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/demo" className="btn btn-quiet btn-lg">
            Book a demo on your data
          </Link>
        </div>
      </section>
    </>
  );
}
