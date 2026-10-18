import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { cases, serviceById, team, type Case } from "../content";
import { ART_BOX, Artifact, Cover } from "../components/Art";
import { CaseCard } from "../components/CaseCard";

/** A row of artefacts at one shared height: each figure grows by its aspect ratio. */
function ArtRow({
  c,
  items,
  label,
}: {
  c: Case;
  items: Case["gallery"];
  label: string;
}) {
  return (
    <section className="wrap art-row" aria-label={label}>
      {items.map((g) => (
        <figure
          key={g.kind}
          className="art-frame"
          style={{ flexGrow: ART_BOX[g.kind][0] / ART_BOX[g.kind][1] }}
        >
          <Artifact c={c} kind={g.kind} label={g.caption} />
          <figcaption>{g.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}

export function CaseStudy({ c }: { c: Case }) {
  const index = cases.indexOf(c);
  const next = cases[(index + 1) % cases.length];
  const prev = cases[(index - 1 + cases.length) % cases.length];
  const related = cases
    .filter(
      (o) => o !== c && o.disciplines.some((d) => c.disciplines.includes(d)),
    )
    .slice(0, 2);
  const rows = [c.gallery.slice(0, 2), c.gallery.slice(2)].filter(
    (r) => r.length,
  );

  return (
    <article className="case">
      <header className="case-hero">
        <div className="wrap case-hero-grid">
          <div className="case-hero-text">
            <Link to="/work" className="back-link">
              <ArrowLeft aria-hidden="true" /> All work
            </Link>
            <h1>{c.client}</h1>
            <p className="case-headline">{c.headline}</p>
          </div>
          <Cover c={c} className="case-cover" />
        </div>
      </header>

      <section className="wrap case-facts" aria-label="Project facts">
        <dl>
          <div>
            <dt>Sector</dt>
            <dd>{c.sector}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{c.location}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd className="tabular">{c.year}</dd>
          </div>
          <div>
            <dt>Disciplines</dt>
            <dd>
              {c.disciplines.map((d, i) => (
                <span key={d}>
                  {i > 0 && ", "}
                  <Link to="/services">{serviceById(d).name}</Link>
                </span>
              ))}
            </dd>
          </div>
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap case-intro">
        <p className="case-lede">{c.intro}</p>
        <div className="case-brief">
          <h2>The brief</h2>
          {c.brief.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
      </section>

      <ArtRow c={c} items={rows[0]} label="Project work" />

      <section className="wrap case-approach" aria-labelledby="approach-title">
        <h2 id="approach-title">What we did</h2>
        <ol>
          {c.approach.map((a) => (
            <li key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {rows[1] && <ArtRow c={c} items={rows[1]} label="More project work" />}

      <section className="case-quote">
        <figure className="wrap quote">
          <blockquote>
            <p>{c.quote.text}</p>
          </blockquote>
          <figcaption>
            <span>
              <strong>{c.quote.name}</strong>, {c.quote.role}
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="wrap case-outcome" aria-labelledby="outcome-title">
        <h2 id="outcome-title">What happened next</h2>
        <ul>
          {c.outcome.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <div className="case-credits">
          <h3>Atelier team</h3>
          <ul>
            {c.team.map((name) => (
              <li key={name}>
                {name} <span>{team.find((p) => p.name === name)?.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap case-cta">
        <h2>Got a problem shaped like this one?</h2>
        <Link to="/contact" className="btn btn-ink btn-big">
          Start a brief <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      {related.length > 0 && (
        <section className="wrap case-related" aria-labelledby="related-title">
          <h2 id="related-title">Related work</h2>
          <div className="work-grid">
            {related.map((r) => (
              <CaseCard key={r.slug} c={r} size="small" />
            ))}
          </div>
        </section>
      )}

      <nav className="wrap case-pager" aria-label="More projects">
        <Link to={`/work/${prev.slug}`}>
          <ArrowLeft aria-hidden="true" />
          <span>
            <small>Previous</small>
            {prev.client}
          </span>
        </Link>
        <Link to={`/work/${next.slug}`} className="pager-next">
          <span>
            <small>Next</small>
            {next.client}
          </span>
          <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </article>
  );
}
