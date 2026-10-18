import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { cases, personById, serviceBySlug, type CaseStudy } from "../content";
import { Readout } from "../components/Readout";
import { Funnel } from "../components/Funnel";
import { CaseCard } from "../components/CaseCard";
import { CloseBand } from "../components/CloseBand";
import { isWin } from "../lib/format";

export function CasePage({ study: c }: { study: CaseStudy }) {
  const next = cases[(cases.indexOf(c) + 1) % cases.length];
  const related = cases
    .filter(
      (o) =>
        o !== c && o !== next && o.services.some((s) => c.services.includes(s)),
    )
    .slice(0, 2);
  const wins = c.experiments.filter(isWin).length;

  return (
    <>
      <header className="page-head case-head">
        <div className="wrap case-head-grid">
          <div>
            <p className="crumbs">
              <Link to="/work">Case studies</Link> / {c.client}
            </p>
            <h1>{c.headline}</h1>
            <p className="lede">{c.summary}</p>
          </div>
          <p className="case-figure">
            <strong>{c.figure}</strong>
            <span>{c.metric}</span>
          </p>
        </div>
        <div className="wrap">
          <dl className="facts">
            <div>
              <dt>Client</dt>
              <dd>{c.client}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{c.industry}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>
                {c.services.map((slug, i) => (
                  <span key={slug}>
                    {i > 0 && ", "}
                    <Link to={`/services/${slug}`}>
                      {serviceBySlug(slug)?.name}
                    </Link>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Program</dt>
              <dd>
                {c.duration}, {c.year}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="wrap case-hero-img">
        <img src={c.image} alt={c.imageAlt} width={1400} height={933} />
      </div>

      <section className="section-tight">
        <div className="wrap two-col">
          <div className="prose">
            <h2 className="h-md">The problem</h2>
            {c.challenge.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="prose">
            <h2 className="h-md">What we did</h2>
            {c.approach.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section log-section" aria-labelledby="log-title">
        <div className="wrap split-head">
          <h2 id="log-title" className="h-lg">
            Experiment log
          </h2>
          <p>
            {c.experiments.length} of the tests behind this result, {wins}{" "}
            shipped. We publish the ones that didn't win too — a flat result is
            what stops the next team testing the same idea.
          </p>
        </div>
        <div className="wrap">
          <Readout rows={c.experiments} />
        </div>
      </section>

      <section className="section-tight" aria-labelledby="funnel-title">
        <div className="wrap two-col">
          <div>
            <h2 id="funnel-title" className="h-lg">
              The funnel, before and after
            </h2>
            <ul className="results">
              {c.results.map((r) => (
                <li key={r.label}>
                  <strong>{r.value}</strong>
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Funnel stages={c.funnel} />
        </div>
      </section>

      <section className="quote-band" aria-label={`Quote from ${c.quote.name}`}>
        <figure className="wrap">
          <blockquote>
            <p>{c.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{c.quote.name}</strong> {c.quote.role}
          </figcaption>
        </figure>
      </section>

      <section className="section-tight" aria-labelledby="crew-title">
        <div className="wrap">
          <h2 id="crew-title" className="h-md">
            The pod on this program
          </h2>
          <ul className="faces faces-row">
            {c.team.map((id) => {
              const p = personById(id)!;
              return (
                <li key={id}>
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                  <span>
                    <strong>{p.name}</strong>
                    {p.role}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="wrap">
          <div className="split-head">
            <h2 id="next-title" className="h-lg">
              Next: {next.client}
            </h2>
            <Link to={`/work/${next.slug}`} className="btn btn-line">
              Read it <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="case-grid">
            {[next, ...related].map((o) => (
              <CaseCard key={o.slug} c={o} />
            ))}
          </div>
        </div>
      </section>

      <CloseBand />
    </>
  );
}
