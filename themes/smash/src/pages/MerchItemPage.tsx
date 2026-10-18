import { useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { merch, type MerchItem } from "../content";
import { money } from "../lib";
import { addLine } from "../cart";
import { MerchArt } from "../components/MerchArt";
import { MerchCard } from "../components/MerchCard";
import { Qty } from "../components/Qty";

export function MerchItemPage({ item }: { item: MerchItem }) {
  const [color, setColor] = useState(item.colors[0]);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const related = merch
    .filter((m) => m.id !== item.id && m.type === item.type)
    .concat(merch.filter((m) => m.type !== item.type))
    .slice(0, 3);
  const needsSize = !!item.sizes && item.sizes.length > 1;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (needsSize && !size) {
      setError("Pick a size first. The fit note is in the details below.");
      return;
    }
    const chosenSize = needsSize ? size : item.sizes?.[0];
    const detail = [item.colors.length > 1 && color.label, chosenSize]
      .filter(Boolean)
      .join(" · ");
    addLine(
      {
        key: `${item.id}|${color.id}|${chosenSize ?? ""}`,
        kind: "merch",
        id: item.id,
        name: item.name,
        detail: detail || "Merch",
        unit: item.price,
      },
      qty,
    );
    setStatus(`Added ${qty} × ${item.name} to your order.`);
  };

  return (
    <div className="page merch-item-page">
      <div className="wrap">
        <Link to="/merch" className="back-link">
          <ArrowLeft aria-hidden="true" /> Merch
        </Link>
      </div>

      <section className="wrap product">
        <div className="product-art">
          <MerchArt
            kind={item.kind}
            color={color}
            label={`${item.name} in ${color.label}`}
          />
        </div>
        <div className="product-info">
          <h1>{item.name}</h1>
          <p className="item-price">{money(item.price)}</p>
          <p className="lede">{item.description}</p>

          <form onSubmit={submit} className="product-form" noValidate>
            {item.colors.length > 1 && (
              <fieldset className="opt-group">
                <legend>
                  Colour <span>{color.label}</span>
                </legend>
                <div className="swatch-choices">
                  {item.colors.map((c) => (
                    <label
                      key={c.id}
                      className="swatch"
                      data-on={color.id === c.id ? "" : undefined}
                    >
                      <input
                        type="radio"
                        name="color"
                        checked={color.id === c.id}
                        onChange={() => setColor(c)}
                      />
                      <span style={{ background: c.fill }} aria-hidden="true" />
                      <span className="sr-only">{c.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {needsSize && (
              <fieldset
                className="opt-group"
                aria-describedby={error ? "size-err" : undefined}
              >
                <legend>
                  Size <span>{size || "Choose one"}</span>
                </legend>
                <div className="opt-choices size-choices">
                  {item.sizes!.map((s) => (
                    <label
                      key={s}
                      className="opt"
                      data-on={size === s ? "" : undefined}
                    >
                      <input
                        type="radio"
                        name="size"
                        checked={size === s}
                        onChange={() => (setSize(s), setError(""))}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
                {error && (
                  <p className="field-error" id="size-err">
                    {error}
                  </p>
                )}
              </fieldset>
            )}

            <div className="builder-bar">
              <Qty value={qty} onChange={setQty} label={item.name} />
              <button type="submit" className="btn btn-primary btn-add">
                Add to order · {money(item.price * qty)}
              </button>
            </div>
            <p className="builder-status" aria-live="polite">
              {status && (
                <>
                  {status} <Link to="/order">Review your order</Link>
                </>
              )}
            </p>
          </form>

          <dl className="specs">
            {item.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap item-pairs" aria-labelledby="rel-h">
        <h2 id="rel-h">Also on the shelf</h2>
        <div className="merch-grid merch-grid-3">
          {related.map((m) => (
            <MerchCard key={m.id} item={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
