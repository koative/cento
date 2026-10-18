import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "../router";
import { caseStudies, products, type Product } from "../content";
import { money } from "../lib/energy";
import { ProductArt } from "../components/ProductArt";

export default function ProductPage({ product: p }: { product: Product }) {
  const pairs = p.pairsWith
    .map((id) => products.find((x) => x.id === id))
    .filter((x): x is Product => !!x);
  const usedIn = caseStudies.filter((c) => c.system.productIds.includes(p.id));

  return (
    <>
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <Link to="/products" className="text-link">
          <ArrowLeft size={16} aria-hidden /> All products
        </Link>
        <span aria-hidden="true">/</span>
        <span>{p.category}</span>
      </nav>

      <section className="wrap product-hero">
        <figure className="datasheet">
          <ProductArt art={p.art} dims={p.dims} />
          <figcaption>Front elevation, not to scale</figcaption>
        </figure>
        <div className="product-copy">
          <h1>{p.name}</h1>
          <p className="lead">{p.summary}</p>
          <p className="num product-price">
            {money(p.price)} <small>{p.unit}</small>
          </p>
          <ul className="ticks">
            {p.highlights.map((h) => (
              <li key={h}>
                <Check size={18} aria-hidden /> {h}
              </li>
            ))}
          </ul>
          <div className="actions">
            <Link to="/quote" className="btn btn-sun">
              Get a quote with this <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/planner" className="btn btn-line">
              Try it in the planner
            </Link>
          </div>
          <p className="warranty">
            <ShieldCheck size={18} aria-hidden /> {p.warranty}
          </p>
        </div>
      </section>

      <section className="section wrap product-detail">
        <div className="prose">
          <h2>How it works on your home</h2>
          {p.description.map((d) => (
            <p key={d}>{d}</p>
          ))}
          {usedIn.length > 0 && (
            <>
              <h3>Installed in</h3>
              <ul className="plain-links">
                {usedIn.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/case-studies/${c.slug}`} className="text-link">
                      {c.place} · {c.home}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          <h2>Specifications</h2>
          <dl className="spec-table">
            {p.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd className="num">{v}</dd>
              </div>
            ))}
            <div>
              <dt>Warranty</dt>
              <dd>{p.warranty}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Usually fitted with</h2>
        </div>
        <ul className="spec-rail spec-rail-3">
          {pairs.map((x) => (
            <li key={x.id}>
              <Link to={`/products/${x.id}`} className="spec-item">
                <ProductArt art={x.art} />
                <strong>{x.name}</strong>
                <span>{x.summary}</span>
                <span className="num price">
                  {money(x.price)} <small>{x.unit}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
