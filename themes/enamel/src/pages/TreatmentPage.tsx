import { ArrowRight, Clock, Repeat, Syringe } from "lucide-react";
import { Link } from "../router";
import { dentists, plan, treatments, type Treatment } from "../content";
import { priceRange } from "../lib/format";
import { ToothDiagram } from "../components/ToothDiagram";
import { Faq } from "../components/Faq";

export function TreatmentPage({ t }: { t: Treatment }) {
  const team = dentists.filter((d) => t.dentists.includes(d.slug));
  const related = treatments
    .filter(
      (x) =>
        x.slug !== t.slug && (x.category === t.category || x.layer === t.layer),
    )
    .slice(0, 3);
  const more =
    related.length < 3
      ? treatments
          .filter((x) => x.slug !== t.slug && !related.includes(x))
          .slice(0, 3 - related.length)
      : [];

  return (
    <div className="page treatment">
      <div className="wrap crumbs">
        <Link to="/treatments">Treatments</Link> / <span>{t.category}</span>
      </div>
      <header className="wrap t-head">
        <div>
          <h1>{t.name}</h1>
          <p className="lede">{t.short}</p>
          <dl className="t-facts">
            <div>
              <dt>
                <Clock aria-hidden="true" /> Chair time
              </dt>
              <dd className="tnum">{t.minutes} minutes</dd>
            </div>
            <div>
              <dt>
                <Repeat aria-hidden="true" /> Visits
              </dt>
              <dd>{t.visits}</dd>
            </div>
            <div>
              <dt>
                <Syringe aria-hidden="true" /> Comfort
              </dt>
              <dd>{t.comfort}</dd>
            </div>
          </dl>
        </div>
        <aside className="price-card" aria-label="Price">
          <p className="pc-price tnum">{priceRange(t)}</p>
          <p className="pc-unit">{t.unit}</p>
          <p className="pc-member tnum">
            {priceRange(t, 1 - plan.discount)} on the {plan.name}
          </p>
          <Link to={`/book?t=${t.slug}`} className="btn btn-primary btn-block">
            Book {t.name.toLowerCase()}
          </Link>
          <Link to="/prices" className="pc-link">
            How we price, insurance and payment plans
          </Link>
        </aside>
      </header>

      <section className="wrap t-body">
        <div className="t-summary">
          <p>{t.summary}</p>
        </div>
        {t.image ? (
          <img
            className="t-image"
            src={t.image}
            alt={t.imageAlt ?? ""}
            width={960}
            height={640}
          />
        ) : (
          <ToothDiagram
            layer={t.layer}
            title={`Cross-section of a molar showing where ${t.name.toLowerCase()} works`}
          />
        )}
      </section>

      <section className="wrap t-steps" aria-labelledby="steps-h">
        <h2 id="steps-h">What happens</h2>
        <ol className="steps">
          {t.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap t-split">
        {t.image && (
          <div className="t-diagram">
            <h2>Where it works</h2>
            <ToothDiagram
              layer={t.layer}
              title={`Cross-section of a molar showing where ${t.name.toLowerCase()} works`}
            />
          </div>
        )}
        <div>
          <h2>Afterwards</h2>
          <ul className="ticks">
            {t.aftercare.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h2 className="mt">Questions people ask</h2>
          <Faq items={t.faqs} />
        </div>
      </section>

      <section className="wrap t-team" aria-labelledby="who-h">
        <h2 id="who-h">Who does it</h2>
        <ul className="team-rows">
          {team.map((d) => (
            <li key={d.slug}>
              <Link to={`/dentists/${d.slug}`}>
                <span className="tr-name">{d.name}</span>
                <span className="tr-role">{d.role}</span>
                <span className="tr-days">{d.focus}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap related" aria-labelledby="rel-h">
        <h2 id="rel-h">Often considered alongside</h2>
        <ul className="related-list">
          {[...related, ...more].map((r) => (
            <li key={r.slug}>
              <Link to={`/treatments/${r.slug}`}>
                <span className="rl-cat">{r.category}</span>
                <span className="rl-name">{r.name}</span>
                <span className="rl-price tnum">{priceRange(r)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
