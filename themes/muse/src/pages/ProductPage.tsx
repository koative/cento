import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  looks,
  lookPath,
  productService,
  products,
  sizeGuide,
  type Product,
} from "../content";
import { addLine, money } from "../lib/cart";
import { Qty } from "../components/Qty";
import { ProductCard } from "../components/ProductCard";

export function ProductPage({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0].name);
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : "",
  );
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState("");

  const category = categories.find((c) => c.id === product.category)!;
  const lead =
    product.colours.find((c) => c.name === colour)?.image ?? product.images[0];
  const gallery = [lead, ...product.images.filter((img) => img !== lead)];
  const guide =
    product.category === "shoes" ? sizeGuide.shoes : sizeGuide.clothing;
  const wornIn = looks.filter((l) => l.pieces.includes(product.id));
  const lookMates = [...new Set(wornIn.flatMap((l) => l.pieces))];
  const related = [
    ...products.filter((p) => p.id !== product.id && lookMates.includes(p.id)),
    ...products.filter(
      (p) =>
        p.id !== product.id &&
        !lookMates.includes(p.id) &&
        p.category !== product.category,
    ),
  ].slice(0, 4);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!size) {
      setError(`Choose a size to add it to your bag. Fit: ${product.fit}`);
      setAdded("");
      (
        e.currentTarget.querySelector(
          'input[name="size"]:not(:disabled)',
        ) as HTMLInputElement | null
      )?.focus();
      return;
    }
    addLine(product.id, colour, size, qty);
    setAdded(
      `${product.name}, ${colour}, size ${size}${qty > 1 ? `, ×${qty}` : ""} is in your bag.`,
    );
  }

  return (
    <div className="page product-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <a href={`#/shop?c=${category.id}`}>{category.label}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-layout">
        <div className="gallery">
          {gallery.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={
                i === 0
                  ? `${product.name} in ${colour}: ${product.alt}`
                  : `${product.name}, another view`
              }
              loading={i ? "lazy" : "eager"}
            />
          ))}
        </div>

        <div className="buy">
          <h1>{product.name}</h1>
          <p className="buy-price price">{money(product.price)}</p>
          <p className="buy-blurb">{product.blurb}</p>

          <form onSubmit={submit} noValidate>
            <fieldset className="colour-pick">
              <legend>
                Colour <span>{colour}</span>
              </legend>
              {product.colours.map((c) => (
                <label key={c.name} className="colour-option" title={c.name}>
                  <input
                    type="radio"
                    name="colour"
                    value={c.name}
                    checked={colour === c.name}
                    onChange={() => setColour(c.name)}
                  />
                  <span
                    className="swatch"
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">{c.name}</span>
                </label>
              ))}
            </fieldset>

            {product.sizes.length > 1 ? (
              <fieldset
                className="size-pick"
                aria-describedby={error ? "size-error" : undefined}
              >
                <legend>
                  Size <span>{product.category === "shoes" ? "EU" : "FR"}</span>
                </legend>
                <div className="size-options">
                  {product.sizes.map((s) => {
                    const out = product.soldOut?.includes(s);
                    return (
                      <label
                        key={s}
                        className="size-option"
                        data-out={out || undefined}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={s}
                          checked={size === s}
                          disabled={out}
                          onChange={() => {
                            setSize(s);
                            setError("");
                          }}
                        />
                        <span>{s}</span>
                        {out && (
                          <span className="visually-hidden">, sold out</span>
                        )}
                      </label>
                    );
                  })}
                </div>
                {error && (
                  <p className="field-error" id="size-error">
                    {error}
                  </p>
                )}
              </fieldset>
            ) : (
              <p className="fine">One size. {product.fit}</p>
            )}

            {product.sizes.length > 1 && (
              <details className="size-guide">
                <summary>Size guide</summary>
                <table>
                  <thead>
                    <tr>
                      {guide.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.rows.map((r) => (
                      <tr key={r[0]} data-current={r[0] === size || undefined}>
                        {r.map((cell, i) =>
                          i === 0 ? (
                            <th key={i} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={i}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="fine">
                  {guide.note} {product.fit}
                </p>
              </details>
            )}

            <div className="buy-row">
              <Qty value={qty} onChange={setQty} label="Quantity" />
              <button type="submit" className="btn btn-ink btn-wide">
                Add to bag, {money(product.price * qty)}
              </button>
            </div>
            <p className="buy-status" aria-live="polite">
              {added && (
                <>
                  <Check size={16} aria-hidden="true" /> {added}{" "}
                  <Link to="/bag">View bag</Link> ·{" "}
                  <Link to="/checkout">Checkout</Link>
                </>
              )}
            </p>
          </form>

          <p className="buy-fit">
            <strong>Fit.</strong> {product.fit}
          </p>

          <div className="buy-service">
            {productService.map((s) => (
              <details key={s.q}>
                <summary>{s.q}</summary>
                <p>{s.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="product-story" aria-labelledby="story-title">
        <div className="product-story-text">
          <h2 id="story-title">About the piece</h2>
          <p>{product.description}</p>
          <ul className="details-list">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div
          className="care-label"
          aria-label="Composition and care label"
          role="group"
        >
          <p className="care-brand" aria-hidden="true">
            Muse
          </p>
          <p className="care-made">{product.madeIn}</p>
          <p className="care-comp">{product.composition}</p>
          <ul>
            {product.care.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {wornIn.length > 0 && (
        <section className="section worn-in" aria-labelledby="worn-title">
          <h2 id="worn-title">Worn in the lookbook</h2>
          <ul>
            {wornIn.map((l) => (
              <li key={l.n}>
                <Link to={lookPath(l.n)}>
                  <img src={l.image} alt={l.alt} loading="lazy" />
                  <span>
                    {l.hour} · Look {String(l.n).padStart(2, "0")}, {l.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section" aria-labelledby="related-title">
        <h2 id="related-title">Wear it with</h2>
        <div className="product-grid four">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
