import { useState, type FormEvent } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { products, shipping, type Product } from "../content";
import { money } from "../lib/format";
import { addLine } from "../lib/cart";
import { MerchArt } from "../components/MerchArt";
import { ProductCard } from "../components/ProductCard";

const NAME_RULE = /^[A-Za-z0-9 ._-]*$/;

export function ProductPage({ product: p }: { product: Product }) {
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<"front" | "back">("front");
  const [errors, setErrors] = useState<{ size?: string; name?: string }>({});
  const [added, setAdded] = useState("");

  const plate = name.trim().toUpperCase();
  const unit = p.price + (p.nameplate && plate ? p.nameplate.price : 0);
  const related = products.filter((x) => x.id !== p.id).slice(0, 3);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!size) next.size = "Choose a size to continue.";
    if (!NAME_RULE.test(name))
      next.name =
        "Use letters, numbers, spaces, dots, dashes or underscores only.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.size ? "size-group" : "f-name")?.focus();
      return;
    }
    addLine(
      { id: p.id, name: p.name, size, nameplate: plate || undefined, unit },
      qty,
    );
    setAdded(
      `${qty} × ${p.name}${plate ? ` (${plate})` : ""}, size ${size}, added to your bag.`,
    );
  };

  return (
    <>
      <div className="wrap product">
        <div className="product-media">
          <div className="product-stage product-stage-lg cut">
            <MerchArt product={p} view={view} nameplate={plate} />
          </div>
          {p.nameplate && (
            <div className="segmented" role="group" aria-label="Jersey view">
              {(["front", "back"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                >
                  {v === "front" ? "Front" : "Back"}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <Link to="/shop" className="text-link back">
            <ArrowLeft aria-hidden="true" /> Shop
          </Link>
          <h1>{p.name}</h1>
          <p className="product-price num" aria-live="polite">
            {money(unit)}
            {p.nameplate && plate && (
              <span> incl. {money(p.nameplate.price)} name print</span>
            )}
          </p>
          <p>{p.blurb}</p>

          <form className="buy" noValidate onSubmit={submit}>
            <fieldset
              id="size-group"
              tabIndex={-1}
              className="sizes"
              data-invalid={errors.size ? "" : undefined}
              aria-describedby={errors.size ? "size-err" : undefined}
            >
              <legend>Size</legend>
              <div className="size-row">
                {p.sizes.map((s) => (
                  <label key={s} className="size">
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={() => (
                        setSize(s),
                        setErrors((er) => ({ ...er, size: undefined }))
                      )}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              {errors.size && (
                <p className="field-error" id="size-err">
                  {errors.size}
                </p>
              )}
            </fieldset>

            {p.nameplate && (
              <div
                className="field"
                data-invalid={errors.name ? "" : undefined}
              >
                <label htmlFor="f-name">
                  Name on the back (optional, +{money(p.nameplate.price)})
                </label>
                <p className="field-hint" id="f-name-hint">
                  Up to {p.nameplate.max} characters. Printed in capitals;
                  name-printed jerseys can't be returned.
                </p>
                <input
                  id="f-name"
                  name="name"
                  value={name}
                  maxLength={p.nameplate.max}
                  autoComplete="off"
                  spellCheck={false}
                  onFocus={() => setView("back")}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (NAME_RULE.test(e.target.value))
                      setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={`f-name-hint${errors.name ? " f-name-err" : ""}`}
                />
                {errors.name && (
                  <p className="field-error" id="f-name-err">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            <div className="buy-row">
              <div className="qty" role="group" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="One fewer"
                  disabled={qty === 1}
                >
                  <Minus aria-hidden="true" />
                </button>
                <span className="num" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  aria-label="One more"
                  disabled={qty === 9}
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
              <button type="submit" className="btn btn-wide">
                Add to bag · <span className="num">{money(unit * qty)}</span>
              </button>
            </div>
            <div aria-live="polite" className="added">
              {added && (
                <p className="form-success">
                  {added} <Link to="/cart">Go to bag and checkout</Link>
                </p>
              )}
            </div>
          </form>

          <h2 className="h-small">Details</h2>
          <ul className="details">
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="quiet">{shipping.note}</p>
        </div>
      </div>

      <section className="wrap section" aria-labelledby="more-h">
        <h2 id="more-h">More from the shop</h2>
        <ul className="product-grid">
          {related.map((r) => (
            <ProductCard key={r.id} product={r} />
          ))}
        </ul>
      </section>
    </>
  );
}
