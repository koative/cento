import { Link } from "../router";
import { brand, goodToKnow } from "../content";

export function GoodToKnow() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{goodToKnow.title}</h1>
        <p className="lede">{goodToKnow.lede}</p>
      </header>

      <section className="wrap gtk-section" aria-labelledby="h-travel">
        <h2 id="h-travel">Getting here</h2>
        <dl className="gtk-list">
          {goodToKnow.travel.map((t) => (
            <div key={t.title}>
              <dt>{t.title}</dt>
              <dd>{t.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap gtk-section" aria-labelledby="h-policies">
        <h2 id="h-policies">Paying, cancelling and the small print</h2>
        <dl className="gtk-list">
          {goodToKnow.policies.map((t) => (
            <div key={t.title}>
              <dt>{t.title}</dt>
              <dd>{t.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap gtk-section" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions guests ask</h2>
        <div className="faq">
          {goodToKnow.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap owners" aria-labelledby="h-still">
        <h2 id="h-still">Still wondering?</h2>
        <p className="measure">
          Write to <a href={`mailto:${brand.email}`}>{brand.email}</a> or call{" "}
          <a href={brand.phoneHref}>{brand.phone}</a>. When you are ready, the{" "}
          <Link to="/book">booking form</Link> holds your dates for 48 hours.
        </p>
      </section>
    </div>
  );
}
