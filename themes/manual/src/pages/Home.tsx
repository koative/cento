import { useState } from "react";
import { ArrowRight, CircleCheck, MessageSquare } from "lucide-react";
import { Link, navigate } from "../router";
import {
  articles,
  categories,
  flows,
  home,
  statusComponents,
  statusAsOf,
  threads,
  contact,
} from "../content";
import { articlesIn, codeOf, ago, categoryOf, formatDay } from "../lib/manual";
import {
  active,
  componentState,
  headline,
  overall,
  stateLabel,
  upcoming,
} from "../lib/status";
import { phoneStatus } from "../lib/forms";
import { SearchBox } from "../components/SearchBox";
import { Troubleshooter } from "../components/Troubleshooter";
import { FigureArt } from "../components/Figures";
import { Inline } from "../components/Inline";
import { Avatar } from "../components/Avatar";

const mostRead = [...articles].sort((a, b) => b.reads - a.reads).slice(0, 5);
const revised = [...articles]
  .sort((a, b) => b.updated.localeCompare(a.updated))
  .slice(0, 6);
const latestThreads = [...threads]
  .sort((a, b) => b.at.localeCompare(a.at))
  .slice(0, 3);

export function Home() {
  const [flowId, setFlowId] = useState(flows[0].id);
  const flow = flows.find((f) => f.id === flowId) ?? flows[0];
  const phone = phoneStatus();

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lead">{home.lead}</p>
            <SearchBox
              large
              label="Search the manual"
              placeholder="Describe the problem: “reader won't pair”, “refund”…"
            />
            <p className="popular">
              <span>Often searched:</span>
              {home.popularSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chip"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}
                >
                  {s}
                </button>
              ))}
            </p>
            <Link to="/status" className="hero-status" data-state={overall}>
              <span className="dot" aria-hidden="true" />
              <span>
                <strong>{headline[overall]}</strong>
                {active[0] && <span> · {active[0].title}</span>}
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <section className="hero-top" aria-labelledby="read-title">
            <h2 id="read-title">Most read this week</h2>
            <ol className="ranked">
              {mostRead.map((a) => (
                <li key={a.slug}>
                  <Link to={`/articles/${a.slug}`}>
                    <span className="ranked-title">{a.title}</span>
                    <span className="ranked-meta">
                      <span className="code">{codeOf(a)}</span> ·{" "}
                      {a.reads.toLocaleString("en-US")} reads
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      <section
        className="section contents-section"
        aria-labelledby="contents-title"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="contents-title">Contents</h2>
            <Link to="/categories" className="text-link">
              Full table of contents <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ol className="chapters">
            {categories.map((c, i) => {
              const list = articlesIn(c.slug);
              return (
                <li key={c.slug} className="chapter">
                  <span className="chapter-tab" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>
                    <Link to={`/categories/${c.slug}`}>{c.title}</Link>
                  </h3>
                  <p>{c.summary}</p>
                  <ul className="chapter-list">
                    {list.slice(0, 3).map((a) => (
                      <li key={a.slug}>
                        <Link to={`/articles/${a.slug}`}>
                          <span className="code">{codeOf(a)}</span> {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="chapter-count">{list.length} articles</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section ts-section" aria-labelledby="ts-title">
        <div className="wrap ts-layout">
          <div className="ts-intro">
            <h2 id="ts-title">Something stopped working mid-shift?</h2>
            <p>
              Answer a few questions and the troubleshooter narrows it down the
              way our specialists do on the phone. If it reaches a dead end,
              your answers go straight into a ticket so nobody asks them twice.
            </p>
            <div className="seg" role="group" aria-label="Choose a problem">
              {flows.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={f.id === flowId}
                  onClick={() => setFlowId(f.id)}
                >
                  {f.title}
                </button>
              ))}
            </div>
            <Link to={`/troubleshoot/${flow.id}`} className="text-link">
              Open this troubleshooter on its own page{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="ts-sheet">
            <Troubleshooter key={flow.id} flow={flow} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="revised-title">
        <div className="wrap revised-wrap">
          <div>
            <h2 id="revised-title">Revised recently</h2>
            <p className="aside-note">
              Every article is re-tested on a real register at least every 90
              days, and the same week the app changes. The date is the last time
              someone did.
            </p>
          </div>
          <ul className="revised">
            {revised.map((a) => (
              <li key={a.slug}>
                <time dateTime={a.updated}>{formatDay(a.updated)}</time>
                <Link to={`/articles/${a.slug}`}>
                  <span className="code">{codeOf(a)}</span> {a.title}
                </Link>
                <span className="muted">{categoryOf(a.category)?.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section quickstart" aria-labelledby="qs-title">
        <div className="wrap qs-grid">
          <div className="qs-copy">
            <h2 id="qs-title">{home.quickStart.title}</h2>
            <p>{home.quickStart.text}</p>
            <ol className="qs-steps">
              {home.quickStart.steps.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>
                    <Inline text={s.text} />
                  </p>
                </li>
              ))}
            </ol>
            <Link to="/articles/set-up-counter" className="btn btn-ink">
              Read the full setup guide
            </Link>
          </div>
          <figure className="figure qs-figure">
            <FigureArt figure="reader" />
            <figcaption>The Counter Reader R2, from article 1.1.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section refcard-section" aria-labelledby="keys-title">
        <div className="wrap refcard">
          <div>
            <h2 id="keys-title">{home.shortcuts.title}</h2>
            <p>{home.shortcuts.text}</p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => window.print()}
            >
              Print this page
            </button>
          </div>
          <dl className="keys">
            {home.shortcuts.keys.map((k) => (
              <div key={k.action}>
                <dt>
                  {k.keys.map((key, i) => (
                    <span key={key}>
                      {i > 0 && " + "}
                      <kbd>{key}</kbd>
                    </span>
                  ))}
                </dt>
                <dd>{k.action}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="status-title">
        <div className="wrap split split-status">
          <div>
            <h2 id="status-title">Service status</h2>
            <p>
              {headline[overall]} as of{" "}
              {new Date(statusAsOf).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                timeZone: "America/New_York",
              })}{" "}
              ET.
            </p>
            {active.map((i) => (
              <Link
                key={i.id}
                to={`/status/${i.id}`}
                className="notice"
                data-impact={i.impact}
              >
                <strong>{i.title}</strong>
                <span>
                  {i.updates[0].state}: {i.updates[0].text}
                </span>
              </Link>
            ))}
            {upcoming.map((i) => (
              <Link
                key={i.id}
                to={`/status/${i.id}`}
                className="notice"
                data-impact="maintenance"
              >
                <strong>{i.title}</strong>
                <span>
                  {formatDay(i.start)} · {i.summary}
                </span>
              </Link>
            ))}
          </div>
          <ul className="state-list">
            {statusComponents.map((c) => {
              const s = componentState(c.id);
              return (
                <li key={c.id} data-state={s}>
                  <span>{c.name}</span>
                  <span className="state">
                    <span className="dot" aria-hidden="true" />
                    {stateLabel[s]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="section community-teaser"
        aria-labelledby="community-title"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="community-title">From the community</h2>
            <Link to="/community" className="text-link">
              All discussions <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="thread-teasers">
            {latestThreads.map((t) => {
              const solved = t.replies.some((r) => r.accepted);
              return (
                <li key={t.id}>
                  <Avatar name={t.author} />
                  <div>
                    <Link to={`/community/${t.id}`} className="teaser-title">
                      {t.title}
                    </Link>
                    <p className="muted">
                      {t.shop} · {ago(t.at, statusAsOf)} · {t.replies.length}{" "}
                      {t.replies.length === 1 ? "reply" : "replies"}
                    </p>
                  </div>
                  {solved ? (
                    <span className="badge badge-solved">
                      <CircleCheck aria-hidden="true" /> Solved
                    </span>
                  ) : (
                    <span className="badge">
                      <MessageSquare aria-hidden="true" /> Open
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <div>
            <h2 id="close-title">{home.close.title}</h2>
            <p>{home.close.text}</p>
            <div className="close-actions">
              <Link to="/contact" className="btn btn-primary">
                Contact support
              </Link>
              <span
                className="phone-state"
                data-open={phone.open ? "" : undefined}
              >
                <span className="dot" aria-hidden="true" />
                {phone.label}
              </span>
            </div>
          </div>
          <dl className="channels">
            {contact.channels.map((c) => (
              <div key={c.name}>
                <dt>{c.name}</dt>
                <dd>{c.detail}</dd>
                <dd className="muted">{c.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
