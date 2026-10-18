import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import { home, platform, pricing, solutions, trust } from "../content";
import { ReviewWidget } from "../components/Review";
import { Faq } from "../components/bits";
import { Seal, Waves } from "../components/Guilloche";

export default function Home() {
  const { drift } = home;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1>
            {home.heroTitle[0]} <span>{home.heroTitle[1]}</span>
          </h1>
          <div className="hero-side">
            <p className="lede">{home.heroLede}</p>
            <div className="actions">
              <Link to="/demo" className="btn btn-primary">
                Request a demo
              </Link>
              <Link to="/app" className="btn btn-quiet">
                Open the demo workspace <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
        <p className="hero-note">{home.heroNote}</p>
        <ReviewWidget />
      </section>

      <section className="drift wrap" aria-labelledby="drift-title">
        <div className="section-head">
          <h2 id="drift-title">{drift.title}</h2>
          <p>{drift.text}</p>
        </div>
        <ol className="drift-track">
          {drift.events.map((e, i) => {
            const held = drift.events.slice(0, i + 1).flatMap((x) => x.grants);
            return (
              <li key={e.date}>
                <p className="drift-date num">{e.date}</p>
                <p className="drift-label">{e.label}</p>
                <ul
                  className="drift-grants"
                  aria-label={`Grants held: ${held.length}`}
                >
                  {held.map((g) => (
                    <li
                      key={g}
                      data-new={e.grants.includes(g) ? "" : undefined}
                    >
                      {g}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        <p className="drift-foot">{drift.footnote}</p>
      </section>

      <section className="loop" aria-labelledby="loop-title">
        <div className="wrap">
          <h2 id="loop-title">{home.loop.title}</h2>
          <ol className="loop-list">
            {home.loop.steps.map((s) => (
              <li key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/platform" className="text-link">
            How the platform works <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="pull wrap" aria-label="Customer quote">
        <figure>
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.quote.name}</strong>
            <span>{home.quote.role}</span>
          </figcaption>
        </figure>
      </section>

      <section className="index-section wrap" aria-labelledby="sol-title">
        <div className="section-head">
          <h2 id="sol-title">{home.solutionsTitle}</h2>
          <Link to="/solutions" className="text-link">
            All solutions <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="index-list">
          {solutions.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link to={`/solutions/${s.slug}`}>
                <span className="index-name">{s.name}</span>
                <span className="index-summary">{s.summary}</span>
                <span className="index-meta">{s.team}</span>
                <ArrowUpRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="evidence" aria-labelledby="ev-title">
        <div className="wrap evidence-grid">
          <div className="evidence-sheet" aria-hidden="true">
            <Waves lines={8} height={40} />
            <div className="sheet-head">
              <div>
                <p className="sheet-title">Evidence pack</p>
                <p className="sheet-sub">
                  Alder Logistics · Q3 2026 user access review
                </p>
              </div>
              <Seal label="Sealed" sub="Oct 1, 2026" />
            </div>
            <ul className="sheet-files">
              {platform.evidenceFiles.map((f) => (
                <li key={f.name}>
                  <span>{f.name}</span>
                  <small>{f.detail}</small>
                  <span className="num">{f.size}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="evidence-text">
            <h2 id="ev-title">{home.evidence.title}</h2>
            <p>{home.evidence.text}</p>
            <ul className="tick-list">
              {home.evidence.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="trust-teaser wrap" aria-labelledby="trust-title">
        <div>
          <h2 id="trust-title">{home.trust.title}</h2>
          <p>{home.trust.text}</p>
          <Link to="/trust" className="text-link">
            Visit the trust center <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <dl className="cert-list">
          {trust.certifications.slice(0, 4).map((c) => (
            <div key={c.name}>
              <dt>{c.name}</dt>
              <dd>{c.status}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="price-teaser" aria-labelledby="price-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="price-title">{home.pricingTitle}</h2>
            <p>{pricing.lede}</p>
          </div>
          <ul className="price-strip">
            {pricing.plans.map((p) => (
              <li key={p.id} data-featured={p.featured ? "" : undefined}>
                <h3>{p.name}</h3>
                <p className="price-line">
                  {p.yearly ? (
                    <>
                      <span className="num">${p.yearly}</span> per identity a
                      month, billed yearly
                    </>
                  ) : (
                    <>
                      Custom, from {p.minimum.toLocaleString("en-US")}{" "}
                      identities
                    </>
                  )}
                </p>
                <p>{p.blurb}</p>
              </li>
            ))}
          </ul>
          <Link to="/pricing" className="text-link">
            Compare plans and estimate your cost{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="faq-section wrap" aria-labelledby="faq-title">
        <h2 id="faq-title">A few clear answers</h2>
        <Faq items={home.faq} />
      </section>

      <section className="close" aria-labelledby="close-title">
        <Waves lines={16} height={110} />
        <div className="wrap close-inner">
          <h2 id="close-title">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/demo" className="btn btn-primary">
              Request a demo
            </Link>
            <Link to="/pricing" className="btn btn-quiet">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
