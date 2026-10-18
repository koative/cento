import { useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  changelog,
  connectors,
  demoRuns,
  demoWorkflows,
  home,
  pricing,
  templates,
} from "../content";
import { formatValue } from "../lib/flow";
import { LiveFlow } from "../components/LiveFlow";
import { ConnectorMark } from "../components/Marks";
import { TemplateTile } from "../components/StepList";
import { RunStatusTag } from "../components/RunStatusTag";

export default function Home() {
  const demo = templates.find((t) => t.slug === home.hero.demo)!;
  const featured = home.featured.map((s) =>
    templates.find((t) => t.slug === s)!,
  );
  const [team, setTeam] = useState(0);

  function onTabKey(e: KeyboardEvent) {
    const next =
      e.key === "ArrowRight"
        ? team + 1
        : e.key === "ArrowLeft"
          ? team - 1
          : null;
    if (next === null) return;
    const i = (next + home.teams.length) % home.teams.length;
    setTeam(i);
    document.getElementById(`team-tab-${i}`)?.focus();
  }

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.hero.title}</h1>
          <p className="lede">{home.hero.lede}</p>
          <div className="actions">
            <Link to={home.hero.primary.to} className="btn btn-plum btn-lg">
              {home.hero.primary.label}
            </Link>
            <Link to={home.hero.secondary.to} className="btn btn-line btn-lg">
              {home.hero.secondary.label}
            </Link>
          </div>
        </div>
        <LiveFlow steps={demo.steps} sample={demo.sample} title={demo.name} />
      </section>

      <section
        className="band wrap connectors-band"
        aria-labelledby="connectors-h"
      >
        <div className="split-head">
          <h2 id="connectors-h">{home.connectorsTitle}</h2>
          <p>{home.connectorsText}</p>
        </div>
        <ul className="mark-wall">
          {connectors.map((c) => (
            <li key={c.slug}>
              <Link to={`/integrations/${c.slug}`}>
                <ConnectorMark slug={c.slug} size={36} />
                <span>{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/integrations" className="text-link">
          Open the integrations directory <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="band wrap pillars" aria-label="How Flux works">
        <article className="pillar">
          <div>
            <h2>{home.pillars[0].title}</h2>
            <p>{home.pillars[0].text}</p>
          </div>
          <p className="readout">
            When an <b>invoice is received</b> in Ledgerline, only if the{" "}
            <b>amount is over $2,500</b>, ask the <b>finance lead</b> in
            Hallway, then mark the invoice <b>approved</b>.
          </p>
        </article>
        <article className="pillar">
          <div>
            <h2>{home.pillars[1].title}</h2>
            <p>{home.pillars[1].text}</p>
          </div>
          <table className="mini-table">
            <caption className="sr-only">
              Two test runs of the invoice approval workflow
            </caption>
            <thead>
              <tr>
                <th scope="col">Sample amount</th>
                <th scope="col">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {[1900, 3400].map((v) => (
                <tr key={v}>
                  <td className="num">{formatValue(demo.sample[0], v)}</td>
                  <td>
                    {v > 2500 ? (
                      <RunStatusTag
                        status="Succeeded"
                        label="All 4 steps ran"
                      />
                    ) : (
                      <RunStatusTag
                        status="Stopped"
                        label="Stopped at step 2"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
        <article className="pillar">
          <div>
            <h2>{home.pillars[2].title}</h2>
            <p>{home.pillars[2].text}</p>
          </div>
          <table className="mini-table">
            <caption className="sr-only">
              Recent runs in the demo workspace
            </caption>
            <thead>
              <tr>
                <th scope="col">Workflow</th>
                <th scope="col">Started</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {demoRuns.slice(2, 6).map((r) => (
                <tr key={r.id}>
                  <td>
                    {demoWorkflows.find((w) => w.id === r.workflow)?.name}
                  </td>
                  <td className="num">{r.started.split(", ")[1]}</td>
                  <td>
                    <RunStatusTag status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>

      <section className="band wrap" aria-labelledby="templates-h">
        <div className="split-head">
          <h2 id="templates-h">{home.templatesTitle}</h2>
          <p>{home.templatesText}</p>
        </div>
        <ul className="template-row">
          {featured.map((t) => (
            <TemplateTile key={t.slug} t={t} />
          ))}
        </ul>
        <Link to="/templates" className="text-link">
          See all {templates.length} templates{" "}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <figure className="quote wrap">
        <blockquote>
          <p>{home.quote.text}</p>
        </blockquote>
        <figcaption>
          <strong>{home.quote.name}</strong> {home.quote.role}
        </figcaption>
      </figure>

      <section className="band wrap teams" aria-labelledby="teams-h">
        <h2 id="teams-h">{home.teamsTitle}</h2>
        <div
          role="tablist"
          aria-label="Teams"
          className="tabs"
          onKeyDown={onTabKey}
        >
          {home.teams.map((t, i) => (
            <button
              key={t.team}
              id={`team-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={team === i}
              aria-controls="team-panel"
              tabIndex={team === i ? 0 : -1}
              onClick={() => setTeam(i)}
            >
              {t.team}
            </button>
          ))}
        </div>
        <div
          id="team-panel"
          role="tabpanel"
          aria-labelledby={`team-tab-${team}`}
          className="team-panel"
        >
          <ul>
            {home.teams[team].items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link to="/templates" className="btn btn-line">
            {home.teams[team].team} templates
          </Link>
        </div>
      </section>

      <section className="ink-band" aria-labelledby="guard-h">
        <div className="wrap guard">
          <div>
            <h2 id="guard-h">{home.guardTitle}</h2>
            <p>{home.guardText}</p>
            <Link to="/product" className="text-link">
              How the guardrails work <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <dl>
            {home.guards.map((g) => (
              <div key={g.term}>
                <dt>{g.term}</dt>
                <dd>{g.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band wrap" aria-labelledby="price-h">
        <div className="split-head">
          <h2 id="price-h">{pricing.heading}</h2>
          <p>{pricing.lede}</p>
        </div>
        <ul className="price-strip">
          {pricing.plans.map((p) => (
            <li key={p.id}>
              <span className="price-name">{p.name}</span>
              <span className="price-amount num">
                ${p.monthly}
                <small>/ month</small>
              </span>
              <span>{p.features[0]}</span>
            </li>
          ))}
        </ul>
        <Link to="/pricing" className="text-link">
          Compare plans <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="band wrap changelog-teaser" aria-labelledby="log-h">
        <h2 id="log-h">Recently shipped</h2>
        <ul>
          {changelog.entries.slice(0, 3).map((e) => (
            <li key={e.version}>
              <span className="log-meta num">
                {e.version} · {e.date}
              </span>
              <Link to="/changelog">{e.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="close wrap" aria-labelledby="close-h">
        <h2 id="close-h">{home.closeTitle}</h2>
        <p>{home.closeText}</p>
        <div className="actions">
          <Link to="/app/workflows" className="btn btn-plum btn-lg">
            Build in the demo
          </Link>
          <Link to="/contact" className="btn btn-line btn-lg">
            Talk to sales
          </Link>
        </div>
      </section>
    </>
  );
}
