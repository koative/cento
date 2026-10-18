import { Link } from "../router";
import { product } from "../content";
import { Markup } from "../components/TrackedChanges";

export default function Product() {
  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{product.heading}</h1>
        <p className="lede">{product.lede}</p>
      </header>

      <div className="wrap feature-stack">
        {product.sections.map((s) => (
          <section key={s.id} className="feature" aria-labelledby={`f-${s.id}`}>
            <div className="feature-copy">
              <h2 id={`f-${s.id}`}>{s.heading}</h2>
              <p>{s.text}</p>
              <ul className="ticks">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <figure className="slip">
              <p className="slip-text">
                <Markup before={s.before} after={s.after} />
              </p>
              <figcaption>Before and after, as Lucid marks it up</figcaption>
            </figure>
          </section>
        ))}
      </div>

      <section className="wrap specs" aria-labelledby="specs-title">
        <h2 id="specs-title">{product.specs.heading}</h2>
        <dl className="spec-table">
          {product.specs.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close" aria-labelledby="product-close">
        <div className="wrap close-inner">
          <h2 id="product-close" className="display">
            {product.cta.heading}
          </h2>
          <div className="actions">
            <Link
              to="/app/documents/winter-catalog-intro"
              className="btn btn-primary btn-large"
            >
              {product.cta.primary}
            </Link>
            <Link to="/contact" className="btn btn-quiet btn-large">
              {product.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
