import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  clayById,
  firing,
  glazeById,
  products,
  type GlazeId,
  type Product as P,
} from "../content";
import { addLine, money } from "../lib/cart";
import { GlazeTile } from "../components/Ceramics";
import { ProductCard, stockLabel } from "../components/ProductCard";
import { Qty } from "../components/Qty";

export function Product({ product: p }: { product: P }) {
  const [glaze, setGlaze] = useState<GlazeId>(p.glazes[0]);
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const g = glazeById(glaze);
  const clay = clayById(p.clay);
  const sizeOpt = p.sizes?.[size];
  const unit = p.price + (sizeOpt?.add ?? 0);
  const max = p.stock === "made" ? 12 : p.stock;
  const category = categories.find((c) => c.id === p.category)!;
  const related = [
    ...products.filter((x) => x.id !== p.id && x.category === p.category),
    ...products.filter((x) => x.category !== p.category),
  ].slice(0, 3);

  function add(e: FormEvent) {
    e.preventDefault();
    const detail = [g.name, sizeOpt?.label].filter(Boolean).join(", ");
    addLine({
      id: p.id,
      name: p.name,
      detail,
      glaze,
      clay: p.clay,
      unit,
      qty,
      made: p.stock === "made",
    });
    setAdded(`Added ${qty} × ${p.name} (${detail}) to your bag.`);
  }

  return (
    <div className="page product">
      <Link to={`/shop?c=${p.category}`} className="text-link back">
        <ArrowLeft size={16} aria-hidden="true" /> {category.label}
      </Link>
      <div className="product-layout">
        <div className="product-gallery">
          <img
            src={p.photo.src}
            alt={p.photo.alt}
            width={p.photo.w}
            height={p.photo.h}
          />
          <div className="product-tile">
            <GlazeTile glaze={glaze} clay={p.clay} />
            <p>
              <strong>
                {g.name} on {clay.name.toLowerCase()}
              </strong>
              {glaze === p.glazes[0]
                ? "This is the glaze in the photograph. "
                : `Photographed in ${glazeById(p.glazes[0]).name}; yours comes in ${g.name}. `}
              {g.note}
            </p>
          </div>
        </div>

        <form className="product-buy" onSubmit={add}>
          <p className="object-no">No. {String(p.number).padStart(3, "0")}</p>
          <h1>{p.name}</h1>
          <p className="product-price">{money(unit)}</p>
          <p className="lead">{p.summary}</p>

          <fieldset className="option">
            <legend>
              Glaze <span>{g.name}</span>
            </legend>
            <div className="swatches swatches-row">
              {p.glazes.map((id) => {
                const x = glazeById(id);
                return (
                  <label key={id} className="swatch">
                    <input
                      type="radio"
                      name="glaze"
                      checked={glaze === id}
                      onChange={() => setGlaze(id)}
                    />
                    <span>
                      <i
                        style={{ background: x.color, borderColor: x.edge }}
                        aria-hidden="true"
                      />
                      {x.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {p.sizes && (
            <fieldset className="option">
              <legend>Size</legend>
              <div className="chips">
                {p.sizes.map((s, i) => (
                  <label key={s.label} className="chip">
                    <input
                      type="radio"
                      name="size"
                      checked={size === i}
                      onChange={() => setSize(i)}
                    />
                    <span>
                      {s.label}
                      {s.add ? ` +${money(s.add)}` : ""}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label="Quantity" max={max} />
            <button type="submit" className="btn btn-wide">
              Add to bag · {money(unit * qty)}
            </button>
          </div>
          <p className="stock-line" data-made={p.stock === "made" || undefined}>
            <Check size={16} aria-hidden="true" />
            {p.stock === "made"
              ? firing.madeToOrder
              : `${stockLabel(p.stock)} from the last firing. Ships in 2–3 working days.`}
          </p>
          <p className="form-status" aria-live="polite">
            {added && (
              <>
                {added} <Link to="/cart">View bag</Link>
              </>
            )}
          </p>

          <dl className="specs">
            <div>
              <dt>Clay</dt>
              <dd>{clay.name}</dd>
            </div>
            <div>
              <dt>Glaze</dt>
              <dd>
                {g.name}, {g.surface.toLowerCase()}
              </dd>
            </div>
            <div>
              <dt>Firing</dt>
              <dd>Cone 6, electric, 1,220 °C</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{p.dimensions}</dd>
            </div>
            {p.capacity && (
              <div>
                <dt>Holds</dt>
                <dd>{p.capacity}</dd>
              </div>
            )}
            <div>
              <dt>Made by</dt>
              <dd>{p.maker}</dd>
            </div>
            <div>
              <dt>Care</dt>
              <dd>{p.care}</dd>
            </div>
          </dl>
        </form>
      </div>

      <section className="product-story" aria-labelledby="story-title">
        <h2 id="story-title">How it is made</h2>
        <div>
          {p.story.map((s) => (
            <p key={s}>{s}</p>
          ))}
          <p>
            Every piece is handmade, so yours will differ a little from the
            photograph in glaze flashing, speckle and size. That is the point.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <h2 id="related-title">Also on the shelf</h2>
        <div className="object-grid object-grid-3">
          {related.map((r) => (
            <ProductCard key={r.id} product={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
