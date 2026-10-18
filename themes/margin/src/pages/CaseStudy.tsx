import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { cases, type Case } from "../content";
import { Annotated } from "../components/Annotated";
import { Mockup } from "../components/Mockup";

export function CaseStudy({ c }: { c: Case }) {
  const index = cases.indexOf(c);
  const next = cases[(index + 1) % cases.length];
  const related = cases
    .filter(
      (o) =>
        o !== c &&
        o !== next &&
        o.disciplines.some((d) => c.disciplines.includes(d)),
    )
    .slice(0, 2);

  return (
    <article className="case">
      <header className="sheet page-head">
        <dl className="aside meta">
          {[
            ["Client", c.client],
            ["Year", String(c.year)],
            ["Role", c.role],
            ["Duration", c.duration],
            ["Team", c.team],
            ["Platform", c.platform],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="col">
          <p className="crumb">
            <Link to="/work">
              <ArrowLeft size={16} aria-hidden="true" /> Case studies
            </Link>
          </p>
          <h1 className="display">{c.title}</h1>
          <p className="case-client">
            {c.client} · {c.sector}
          </p>
          <p className="lead">{c.summary}</p>
        </div>
      </header>

      <section
        className="sheet case-screen"
        aria-label={`${c.screens[0].label}, annotated`}
      >
        <p className="aside margin-note">
          Numbered pins match the notes. Select one to measure its block.
        </p>
        <div className="col">
          <Annotated screen={c.screens[0]} accent={c.accent} />
        </div>
      </section>

      <section className="sheet" aria-labelledby="outcomes">
        <p className="aside margin-note">
          Figures are illustrative — this client and its results are fictional.
        </p>
        <div className="col">
          <h2 id="outcomes">What changed</h2>
          <ul className="outcomes">
            {c.outcomes.map((o) => (
              <li key={o.text}>
                <strong className="num">{o.figure}</strong>
                <span>{o.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sheet" aria-labelledby="brief">
        <div className="aside" />
        <div className="col prose">
          <h2 id="brief">The brief</h2>
          {c.brief.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="sheet" aria-labelledby="learned">
        <p className="aside margin-note">Method: {c.timeline[0].detail}</p>
        <div className="col prose">
          <h2 id="learned">What we learned</h2>
          <ul className="insights">
            {c.insights.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sheet" aria-labelledby="decisions">
        <p className="aside margin-note">
          Redlines start switched off on this screen. Turn them on, or pick a
          note to jump straight to it.
        </p>
        <div className="col">
          <h2 id="decisions">Two decisions that mattered</h2>
          <div className="decisions">
            {c.decisions.map((d) => (
              <div key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
          <Annotated screen={c.screens[1]} accent={c.accent} initial={false} />
        </div>
      </section>

      <section className="sheet" aria-labelledby="timeline">
        <p className="aside margin-note">
          {c.duration} with {c.team.toLowerCase()}.
        </p>
        <div className="col">
          <h2 id="timeline">How it ran</h2>
          <ol className="timeline">
            {c.timeline.map((t) => (
              <li key={t.phase}>
                <span className="timeline-when num">{t.weeks}</span>
                <strong>{t.phase}</strong>
                <span>{t.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sheet words" aria-label="Client quote">
        <div className="aside" />
        <figure className="col quote-lead">
          <blockquote>
            <p>{c.quote.text}</p>
          </blockquote>
          <figcaption>{c.quote.by}</figcaption>
        </figure>
      </section>

      <section className="sheet" aria-labelledby="differently">
        <p className="aside margin-note">
          Every case ends with one of these. It's the part clients ask about
          most.
        </p>
        <div className="col prose">
          <h2 id="differently">What I'd do differently</h2>
          <p>{c.reflection}</p>
          <h3 className="h-small">Credits</h3>
          <ul className="credits">
            {c.credits.map((cr) => (
              <li key={cr}>{cr}</li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="sheet next-case" aria-label="More case studies">
        <div className="aside" />
        <div className="col">
          <Link to={`/work/${next.slug}`} className="next-link">
            <span className="next-label">
              Next case <ArrowRight size={16} aria-hidden="true" />
            </span>
            <span className="next-title">{next.title}</span>
            <span className="next-client">{next.client}</span>
          </Link>
          {related.length > 0 && (
            <div className="related">
              <h2 className="h-small">Related</h2>
              <ul>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/work/${r.slug}`} className="related-link">
                      <span
                        className="mat mat-small"
                        data-device={r.screens[0].device}
                      >
                        <Mockup screen={r.screens[0]} accent={r.accent} />
                      </span>
                      <span className="related-title">{r.title}</span>
                      <span className="related-client">{r.client}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="case-cta">
            Working on something similar?{" "}
            <Link to="/contact">Tell me about it</Link> — I reply within two
            working days.
          </p>
        </div>
      </nav>
    </article>
  );
}
