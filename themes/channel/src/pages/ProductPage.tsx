import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, products, videos, type Product } from "../content";
import { Mockup } from "../components/Mockup";
import { ProductCard } from "../components/ProductCard";
import { Qty } from "../components/Qty";
import { Thumb } from "../components/VideoCard";
import { addLine } from "../lib/cart";
import { clock, money } from "../lib/format";

export function ProductPage({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : "",
  );
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState("");

  const seenIn = videos
    .map((v) => ({
      video: v,
      at: v.onScreen.find((o) => o.product === product.id),
    }))
    .filter((x) => x.at)
    .slice(0, 3);
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, 4);

  function add() {
    if (!size) {
      setError("Choose a size above, then add it to your bag.");
      document.getElementById("size-0")?.focus();
      return;
    }
    setError("");
    addLine({
      id: product.id,
      name: product.name,
      color: color.name,
      size,
      unit: product.price,
      qty,
    });
    setAdded(
      `${qty} × ${product.name}, ${color.name}${product.sizes.length > 1 ? ", " + size : ""} added to your bag.`,
    );
  }

  return (
    <>
      <div className="wrap product-layout">
        <div
          className="product-stage"
          style={{ ["--tint" as string]: color.hex }}
        >
          <Mockup
            kind={product.kind}
            color={color}
            label={`${product.name} in ${color.name}`}
          />
        </div>

        <div className="product-buy">
          <p className="crumbs">
            <Link to="/shop">Merch</Link> / {product.category}
          </p>
          <h1>{product.name}</h1>
          <p className="product-price">{money(product.price)}</p>
          <p className="lead">{product.blurb}</p>

          {product.colors.length > 1 && (
            <fieldset className="options">
              <legend>
                Colour <span>{color.name}</span>
              </legend>
              <div className="swatch-picks">
                {product.colors.map((c) => (
                  <label
                    key={c.name}
                    className="swatch-pick"
                    style={{ ["--c" as string]: c.hex }}
                  >
                    <input
                      type="radio"
                      name="color"
                      checked={c === color}
                      onChange={() => setColor(c)}
                    />
                    <span className="visually-hidden">{c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {product.sizes.length > 1 && (
            <fieldset
              className="options"
              aria-describedby={error ? "size-error" : undefined}
            >
              <legend>Size</legend>
              <div className="size-picks">
                {product.sizes.map((s, i) => (
                  <label key={s} className="size-pick">
                    <input
                      id={"size-" + i}
                      type="radio"
                      name="size"
                      checked={s === size}
                      onChange={() => {
                        setSize(s);
                        setError("");
                      }}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              {error && (
                <p className="field-error" id="size-error">
                  {error}
                </p>
              )}
            </fieldset>
          )}

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label="Quantity" />
            <button
              type="button"
              className="btn btn-spark btn-wide"
              onClick={add}
            >
              Add to bag · {money(product.price * qty)}
            </button>
          </div>
          <div className="added" aria-live="polite">
            {added && (
              <p>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View bag</Link>
              </p>
            )}
          </div>

          <ul className="spec-list">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="page-note">{brand.shipping}</p>
        </div>
      </div>

      {seenIn.length > 0 && (
        <section className="section wrap" aria-labelledby="h-seen">
          <div className="section-head">
            <h2 id="h-seen">Seen on camera</h2>
          </div>
          <ul className="seen-in">
            {seenIn.map(({ video, at }) => (
              <li key={video.slug}>
                <Link to={"/videos/" + video.slug}>
                  <Thumb video={video} caption={false} />
                  <span className="seen-title">{video.title}</span>
                  <span className="seen-at">
                    At {clock(at!.t)}: {at!.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section wrap" aria-labelledby="h-related">
        <div className="section-head">
          <h2 id="h-related">More from the shop</h2>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
