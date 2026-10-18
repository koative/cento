import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  about,
  home,
  pricing,
  releases,
  styleGuide,
  useCases,
} from "../content";
import { PromptDemo } from "../components/PromptDemo";
import { date } from "../lib/text";

export default function Home() {
  const { hero, annotated, archive } = home;
  const jefferson = about.archive.items[0];
  let mark = 0;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1 className="display">
            {hero.before} <del className="pencil-del">{hero.cut}</del>{" "}
            <ins className="pencil-ins">{hero.insert}</ins>
          </h1>
          <p className="lede">{hero.lede}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-large">
              {hero.primary}
            </Link>
            <Link to="/pricing" className="btn btn-quiet btn-large">
              {hero.secondary}
            </Link>
          </div>
          <p className="quiet-note">{hero.note}</p>
        </div>
        <PromptDemo />
      </section>

      <section className="annotated wrap" aria-labelledby="annotated-title">
        <div className="section-intro">
          <h2 id="annotated-title">{annotated.heading}</h2>
          <p>{annotated.text}</p>
        </div>
        <div className="proof">
          <p className="proof-text">
            {annotated.paragraph.map((p, k) => {
              if ("text" in p) return <span key={k}>{p.text}</span>;
              mark++;
              return (
                <span key={k} className="proof-mark">
                  {"flag" in p ? (
                    <mark>{p.flag}</mark>
                  ) : (
                    <>
                      {p.del && <del>{p.del}</del>}
                      {p.ins && <ins>{p.ins}</ins>}
                    </>
                  )}
                  <sup className="ref num">{mark}</sup>
                </span>
              );
            })}
          </p>
          <ol className="proof-notes">
            {annotated.notes.map((n) => (
              <li key={n.kind}>
                <strong>{n.kind}</strong>
                <span>{n.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="archive" aria-labelledby="archive-title">
        <div className="wrap archive-grid">
          <figure className="archive-figure">
            <img
              src={jefferson.image}
              width={jefferson.width}
              height={jefferson.height}
              alt={jefferson.alt}
              loading="lazy"
            />
            <figcaption>{archive.caption}</figcaption>
          </figure>
          <div className="archive-copy">
            <h2 id="archive-title">{archive.heading}</h2>
            <p>{archive.text}</p>
            <Link to="/about" className="text-link">
              {archive.link} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap uc-index" aria-labelledby="uc-title">
        <div className="section-head">
          <h2 id="uc-title">{home.useCases.heading}</h2>
          <Link to="/use-cases" className="text-link">
            {home.useCases.link} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="index-list">
          {useCases.map((u) => (
            <li key={u.slug}>
              <Link to={`/use-cases/${u.slug}`} className="index-row">
                <span className="index-team">{u.team}</span>
                <span className="index-heading">{u.heading}</span>
                <span className="index-docs">{u.docTypes.join(", ")}</span>
                <ArrowRight size={18} aria-hidden className="index-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap style-band" aria-labelledby="style-title">
        <div className="style-copy">
          <h2 id="style-title">{home.style.heading}</h2>
          <p>{home.style.text}</p>
          <Link to="/app/style" className="text-link">
            {home.style.link} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <table className="terms-table">
          <caption className="sr-only">Sample house style term list</caption>
          <thead>
            <tr>
              <th scope="col">Avoid</th>
              <th scope="col">Prefer</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            {styleGuide.rules.slice(0, 6).map((r) => (
              <tr key={r.id}>
                <td>
                  <del>{r.avoid}</del>
                </td>
                <td>
                  <ins>{r.prefer}</ins>
                </td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap surfaces" aria-labelledby="surfaces-title">
        <h2 id="surfaces-title">{home.surfaces.heading}</h2>
        <dl className="surface-list">
          {home.surfaces.items.map((s) => (
            <div key={s.name}>
              <dt>{s.name}</dt>
              <dd>{s.text}</dd>
              <dd className="surface-spec">{s.spec}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="privacy-band" aria-labelledby="privacy-title">
        <div className="wrap privacy-grid">
          <h2 id="privacy-title">{home.privacy.heading}</h2>
          <ul>
            {home.privacy.items.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap quotes" aria-label="What customers say">
        <blockquote className="quote-lead">
          <p>{home.quotes[0].text}</p>
          <footer>
            <cite>{home.quotes[0].name}</cite>, {home.quotes[0].role}
          </footer>
        </blockquote>
        <div className="quote-pair">
          {home.quotes.slice(1).map((q) => (
            <blockquote key={q.name}>
              <p>{q.text}</p>
              <footer>
                <cite>{q.name}</cite>, {q.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="wrap plans-teaser" aria-labelledby="plans-title">
        <div className="section-head">
          <h2 id="plans-title">{home.pricing.heading}</h2>
          <Link to="/pricing" className="text-link">
            {home.pricing.link} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="plan-line">
          {pricing.plans.map((p) => (
            <li key={p.id}>
              <span className="plan-line-name">{p.name}</span>
              <span className="plan-line-price num">
                {p.monthly === null ? "Custom" : `$${p.monthly}`}
              </span>
              <span className="plan-line-unit">{p.unit}</span>
              <span className="plan-line-summary">{p.summary}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap shipped" aria-labelledby="shipped-title">
        <div className="section-head">
          <h2 id="shipped-title">{home.changelog.heading}</h2>
          <Link to="/changelog" className="text-link">
            {home.changelog.link} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="shipped-list">
          {releases.slice(0, 3).map((r) => (
            <li key={r.version}>
              <time dateTime={r.date} className="num">
                {date(r.date)}
              </time>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-inner">
          <h2 id="close-title" className="display">
            {home.close.heading}
          </h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-large">
              {home.close.primary}
            </Link>
            <Link to="/signup" className="btn btn-quiet btn-large">
              {home.close.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
