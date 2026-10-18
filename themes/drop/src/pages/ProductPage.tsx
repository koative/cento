import { useState } from "react";
import {
  ArrowRight,
  CalendarPlus,
  Minus,
  Plus,
  Ticket as TicketIcon,
} from "lucide-react";
import { Link } from "../router";
import { brand, products, sizeGuide, type Product } from "../content";
import { addLine, money } from "../lib/cart";
import {
  at,
  buyable,
  dayLabel,
  downloadIcs,
  dropNo,
  dropOf,
  soldOut,
  timeLabel,
  useNow,
} from "../lib/time";
import { Countdown } from "../components/Countdown";
import { Flat } from "../components/Flat";
import { SizeTable } from "../components/SizeTable";
import { ProductCard } from "../components/ProductCard";
import { Barcode } from "../components/Barcode";

const guideFor: Record<Product["shape"], string | null> = {
  tee: "Tees and long sleeves",
  longsleeve: "Tees and long sleeves",
  hoodie: "Hoods",
  jacket: "Outerwear",
  pants: "Pants",
  cap: null,
  beanie: null,
  tote: null,
  deck: null,
};

export function ProductPage({ product }: { product: Product }) {
  const now = useNow();
  const drop = dropOf(product);
  const live = buyable(product, now);
  const [color, setColor] = useState(product.colors[0]);
  const firstInStock = product.sizes.find((_, i) => product.stock[i] > 0);
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : "",
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const left = size ? product.stock[product.sizes.indexOf(size)] : 0;
  const max = Math.max(1, Math.min(product.limit, left || product.limit));
  const guide = sizeGuide.find((g) => g.name === guideFor[product.shape]);
  const related = [
    ...products.filter((p) => p.drop === product.drop && p.id !== product.id),
    ...products.filter(
      (p) => p.category === product.category && p.drop !== product.drop,
    ),
  ].slice(0, 4);
  const sku = `DRP-${dropNo(drop)}-${product.id.slice(0, 3).toUpperCase()}-${color.name.slice(0, 3).toUpperCase()}`;

  function add() {
    if (!size) {
      setSizeError(true);
      document
        .querySelector<HTMLInputElement>(".sizes input:not(:disabled)")
        ?.focus();
      return;
    }
    addLine({
      id: product.id,
      name: product.name,
      color: color.name,
      size,
      unit: product.price,
      qty,
      limit: Math.min(product.limit, left),
    });
    setAdded(
      `Added ${qty} × ${product.name}, ${color.name}, ${size} to your bag.`,
    );
  }

  return (
    <div className="page product-page">
      <div className="product-layout">
        <div className="gallery">
          <figure className="plate plate-xl">
            <Flat
              product={product}
              color={color}
              label={`${product.name} in ${color.name}, front`}
            />
            <figcaption>Front</figcaption>
          </figure>
          <figure className="plate plate-xl">
            <Flat
              product={product}
              color={color}
              side="back"
              label={`${product.name} in ${color.name}, back`}
            />
            <figcaption>Back</figcaption>
          </figure>
          <div className="care-label">
            <p className="care-brand">{brand.name}</p>
            <p>{product.fabric}</p>
            <p>{product.fit}</p>
            <Barcode value={sku} height={36} />
            <p className="num">{sku}</p>
          </div>
        </div>

        <div className="buy">
          <h1>{product.name}</h1>
          <p className="buy-price num">{money(product.price)}</p>
          <p className="buy-drop">
            From{" "}
            <Link to={`/drops/${drop.id}`}>
              Drop {dropNo(drop)}, {drop.name}
            </Link>
            {drop.collab && <> with {drop.collab}</>}
          </p>
          <p>{product.blurb}</p>

          <fieldset className="swatches">
            <legend>
              Colour <span className="legend-value">{color.name}</span>
            </legend>
            {product.colors.map((c) => (
              <label key={c.name} className="swatch" title={c.name}>
                <input
                  type="radio"
                  name="color"
                  value={c.name}
                  checked={color.name === c.name}
                  onChange={() => setColor(c)}
                />
                <span style={{ background: c.hex }} aria-hidden="true" />
                <span className="visually-hidden">{c.name}</span>
              </label>
            ))}
          </fieldset>

          <fieldset
            className="sizes"
            aria-describedby={sizeError ? "size-error" : undefined}
          >
            <legend>
              Size {size && <span className="legend-value">{size}</span>}
            </legend>
            <div className="size-grid">
              {product.sizes.map((s, i) => {
                const n = product.stock[i];
                const out = live && n === 0;
                return (
                  <label
                    key={s}
                    className="size"
                    data-out={out ? "" : undefined}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      disabled={out}
                      onChange={() => {
                        setSize(s);
                        setQty(1);
                        setSizeError(false);
                      }}
                    />
                    <span>{s}</span>
                    {live && (
                      <small>{out ? "Gone" : n <= 3 ? `${n} left` : ""}</small>
                    )}
                  </label>
                );
              })}
            </div>
            {sizeError && (
              <p className="field-error" id="size-error">
                Pick a size first
                {firstInStock
                  ? `: ${firstInStock} is the smallest still in stock.`
                  : "."}
              </p>
            )}
          </fieldset>

          {live && !soldOut(product) && (
            <div className="buy-row">
              <div className="qty" role="group" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  aria-label="One fewer"
                >
                  <Minus size={16} aria-hidden="true" />
                </button>
                <output className="num" aria-live="polite">
                  {qty}
                </output>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(max, qty + 1))}
                  disabled={qty >= max}
                  aria-label="One more"
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="btn btn-signal btn-grow"
                onClick={add}
              >
                Add to bag ·{" "}
                <span className="num">{money(product.price * qty)}</span>
              </button>
            </div>
          )}
          {live && soldOut(product) && (
            <p className="notice">
              Sold out. This one is not coming back; the next drop is on the
              calendar.
            </p>
          )}
          {!live && drop.mode === "raffle" && (
            <div className="buy-wait">
              <p>
                Raffle only. Pick your size on the entry form; winners are drawn
                the night before the drop.
              </p>
              <Link to="/raffle" className="btn btn-signal">
                <TicketIcon size={18} aria-hidden="true" /> Enter the raffle
              </Link>
            </div>
          )}
          {!live && drop.mode !== "raffle" && (
            <div className="buy-wait">
              <p>
                Drops {dayLabel(at(drop.date))} at {timeLabel(at(drop.date))}{" "}
                {brand.tzLabel}.
              </p>
              <Countdown
                to={at(drop.date)}
                label={`${product.name} drops in`}
                size="m"
              />
              <button
                type="button"
                className="btn"
                onClick={() => downloadIcs(drop)}
              >
                <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
              </button>
            </div>
          )}

          <p className="added" aria-live="polite">
            {added && (
              <>
                {added}{" "}
                <Link to="/cart" className="text-link">
                  View bag <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </>
            )}
          </p>

          <p className="limit">
            Limit {product.limit} per order
            {product.limit === 1 ? "" : ", one per size on drop day"}.
          </p>

          <details className="disclosure">
            <summary>Details</summary>
            <ul>
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          {guide && (
            <details className="disclosure">
              <summary>Size guide</summary>
              <p className="muted small">{guide.note}</p>
              <SizeTable guide={guide} />
            </details>
          )}
          <details className="disclosure">
            <summary>Shipping &amp; returns</summary>
            <p>
              Ships Tuesday to Friday. Free standard shipping over $150.
              Fourteen days to return unworn; drop pieces exchange for size
              only.
            </p>
          </details>
        </div>
      </div>

      <section className="section" aria-labelledby="h-related">
        <div className="section-head">
          <h2 id="h-related">Same drop, same rail</h2>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
