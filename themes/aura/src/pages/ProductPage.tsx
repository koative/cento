import { useState } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Link, navigate } from "../router";
import {
  focuses,
  ingredients,
  products,
  reviews,
  skinTypes,
  steps,
  type Product,
} from "../content";
import { addLines, money } from "../lib/cart";
import { Vessel } from "../components/Vessel";
import { Qty } from "../components/Qty";
import { ProductCard } from "../components/ProductCard";

export function ProductPage({ product }: { product: Product }) {
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const keys = product.ingredients.map((slug) =>
    ingredients.find((g) => g.slug === slug)!,
  );
  const photo = keys.find((g) => g.image);
  const vesselName = {
    pump: "Bottle",
    dropper: "Bottle",
    bottle: "Bottle",
    jar: "Jar",
    tube: "Tube",
    tin: "Tin",
  }[product.vessel];
  const views = [vesselName, "Texture", ...(photo ? [photo.name] : [])];
  const [view, setView] = useState(0);
  const own = reviews.filter((r) => r.product === product.id);
  const rating = own.reduce((s, r) => s + r.rating, 0) / own.length;
  const step = steps.find((s) => s.id === product.step)!;
  const order = (p: Product) => steps.findIndex((s) => s.id === p.step);
  const related = products
    .filter(
      (p) =>
        p.step !== product.step &&
        p.focus.some((f) => product.focus.includes(f)) &&
        p.skin.some((s) => product.skin.includes(s)),
    )
    .sort((a, b) => a.rank - b.rank)
    .filter((p, i, all) => all.findIndex((x) => x.step === p.step) === i)
    .slice(0, 3)
    .sort((a, b) => order(a) - order(b));
  const chosen = product.sizes[size];

  function add(thenCheckout: boolean) {
    addLines([
      {
        id: product.id,
        name: product.name,
        size: chosen.label,
        unit: chosen.price,
        qty,
      },
    ]);
    if (thenCheckout) navigate("/checkout");
    else
      setAdded(`${qty} × ${product.name}, ${chosen.label}, added to your bag.`);
  }

  return (
    <div className="page product-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={"/shop?step=" + product.step}>{step.label}</Link>
      </nav>

      <div className="product-top">
        <div className="gallery">
          <div
            className={"gallery-stage tile tile-" + product.tile}
            data-view={view}
          >
            {view === 0 && (
              <Vessel product={product} className="vessel-large" />
            )}
            {view === 1 && (
              <figure className="texture">
                <svg
                  viewBox="0 0 200 200"
                  role="img"
                  aria-label={`${product.texture}, ${product.name}`}
                >
                  <path
                    d="M38 112c-6-34 22-62 58-64 30-2 64 10 70 40 6 32-18 62-54 66-34 4-68-8-74-42Z"
                    fill={product.tint}
                    stroke="#3d2133"
                    strokeOpacity=".2"
                  />
                  <path
                    d="M70 84c14-10 34-12 48-6"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity=".7"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
                <figcaption>{product.texture}</figcaption>
              </figure>
            )}
            {view === 2 && photo && (
              <img
                src={photo.image}
                alt={photo.alt}
                width={1400}
                height={1050}
              />
            )}
          </div>
          <div className="gallery-thumbs" role="group" aria-label="Views">
            {views.map((v, i) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === i}
                onClick={() => setView(i)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="buy">
          <p className="product-step">
            {step.label} ·{" "}
            {product.time.length === 2
              ? "Morning & evening"
              : product.time[0] === "am"
                ? "Morning"
                : "Evening"}
          </p>
          <h1>{product.name}</h1>
          <p className="lede">{product.line}</p>
          <p className="rating">
            <span className="stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={15}
                  data-on={i < Math.round(rating) || undefined}
                />
              ))}
            </span>
            <span>
              {rating.toFixed(1)} out of 5 · {own.length}{" "}
              {own.length === 1 ? "review" : "reviews"}
            </span>
          </p>

          <fieldset className="sizes">
            <legend>Size</legend>
            {product.sizes.map((s, i) => (
              <label key={s.label} className="size-option">
                <input
                  type="radio"
                  name="size"
                  checked={size === i}
                  onChange={() => setSize(i)}
                />
                <span>{s.label}</span>
                <span className="price">{money(s.price)}</span>
              </label>
            ))}
          </fieldset>

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label={product.name} />
            <button
              type="button"
              className="btn btn-wide"
              onClick={() => add(false)}
            >
              Add to bag · {money(chosen.price * qty)}
            </button>
          </div>
          <button type="button" className="text-link" onClick={() => add(true)}>
            Buy now and go to checkout{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="added" role="status">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View bag</Link>
              </>
            )}
          </p>

          <dl className="facts">
            <div>
              <dt>Texture</dt>
              <dd>{product.texture}</dd>
            </div>
            <div>
              <dt>Scent</dt>
              <dd>{product.scent}</dd>
            </div>
            <div>
              <dt>Suits</dt>
              <dd>
                {skinTypes
                  .filter((s) => product.skin.includes(s.id))
                  .map((s) => s.label)
                  .join(", ")}{" "}
                skin
              </dd>
            </div>
            <div>
              <dt>Helps with</dt>
              <dd>
                {focuses
                  .filter((f) => product.focus.includes(f.id))
                  .map((f) => f.label.toLowerCase())
                  .join("; ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="product-detail">
        <div className="detail-main">
          <h2>About the formula</h2>
          <p>{product.description}</p>
          <h2>How to use</h2>
          <p>{product.howTo}</p>
          <h2>Where it sits in your ritual</h2>
          <ol className="ritual-line">
            {steps.map((s) => (
              <li
                key={s.id}
                aria-current={s.id === product.step ? "step" : undefined}
              >
                {s.label}
              </li>
            ))}
          </ol>
        </div>
        <div className="detail-side">
          <h2>Key ingredients</h2>
          <ul className="key-ings">
            {keys.map((g) => (
              <li key={g.slug}>
                <Link to={"/ingredients/" + g.slug}>{g.name}</Link>
                <span>{g.summary}</span>
                <span className="quiet">{g.strength}</span>
              </li>
            ))}
          </ul>
          <details className="inci">
            <summary>Full ingredient list</summary>
            <p>{product.inci}</p>
          </details>
        </div>
      </section>

      <section className="section product-reviews">
        <h2>What people say</h2>
        <div className="review-list">
          {own.map((r) => (
            <figure key={r.name}>
              <p className="stars" aria-label={`${r.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    data-on={i < r.rating || undefined}
                    aria-hidden="true"
                  />
                ))}
              </p>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                {r.name} · {r.skin}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Pairs well with</h2>
          <Link to="/ritual" className="text-link">
            Build a full ritual <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid three">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
