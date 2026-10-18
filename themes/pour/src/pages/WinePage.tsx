import { useState } from "react";
import { ArrowRight, Check, Wine as WineIcon } from "lucide-react";
import { Link } from "../router";
import { checkout, finder, wines, type Wine } from "../content";
import { addLine, money } from "../lib/cart";
import { Bottle } from "../components/Bottle";
import { Qty } from "../components/Qty";
import { WineCard } from "../components/WineCard";

export function WinePage({ wine }: { wine: Wine }) {
  const formats = [{ id: "75 cl", label: "Bottle, 75 cl", price: wine.price }];
  if (wine.magnum)
    formats.push({
      id: "Magnum 150 cl",
      label: "Magnum, 150 cl",
      price: wine.magnum,
    });
  const [format, setFormat] = useState(formats[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const chosen = formats.find((f) => f.id === format) ?? formats[0];

  const related = wines
    .filter((w) => w.id !== wine.id)
    .map((w) => ({
      w,
      d:
        Math.hypot(w.body - wine.body, w.wild - wine.wild) +
        (w.colour === wine.colour ? 0 : 2),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4)
    .map((r) => r.w);

  function add() {
    addLine({
      kind: "wine",
      id: wine.id,
      name: wine.name,
      detail: chosen.id,
      unit: chosen.price,
      qty,
    });
    setAdded(
      `${qty} × ${wine.name} (${chosen.id.toLowerCase()}) added to your case.`,
    );
  }

  const specs: [string, string][] = [
    ["Grapes", wine.grapes],
    ["Vintage", wine.vintage],
    ["Region", `${wine.region}, ${wine.country}`],
    ["Farming", wine.farming],
    ["Sulphur", wine.sulphur],
    ["Alcohol", wine.abv],
    ["Serve", wine.serve],
  ];

  return (
    <div className="page product">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/wines">Wines</Link> <span aria-hidden="true">/</span>{" "}
        <span>{wine.colour}</span> <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{wine.name}</span>
      </nav>

      <div className="product-main">
        <div
          className="product-stage"
          data-colour={wine.colour}
          data-magnum={format !== "75 cl" || undefined}
        >
          <Bottle wine={wine} className="bottle-hero" />
        </div>

        <div className="product-info">
          <p className="product-producer">{wine.producer}</p>
          <h1>{wine.name}</h1>
          <p className="product-origin">
            {wine.colour} · {wine.grapes} · {wine.region}, {wine.country} ·{" "}
            {wine.vintage}
          </p>
          <p className="lead">{wine.note}</p>

          <form
            className="buy"
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
          >
            <fieldset className="formats">
              <legend>Format</legend>
              {formats.map((f) => (
                <label key={f.id} className="format">
                  <input
                    type="radio"
                    name="format"
                    value={f.id}
                    checked={format === f.id}
                    onChange={() => (setFormat(f.id), setAdded(""))}
                  />
                  <span>{f.label}</span>
                  <b className="num">{money(f.price)}</b>
                </label>
              ))}
            </fieldset>
            <div className="buy-row">
              <Qty
                value={qty}
                onChange={(n) => (setQty(n), setAdded(""))}
                label="quantity"
                max={Math.min(12, wine.stock)}
              />
              <button type="submit" className="btn">
                Add to case ·{" "}
                <span className="num">{money(chosen.price * qty)}</span>
              </button>
            </div>
            <p className="buy-status" aria-live="polite">
              {added && (
                <>
                  <Check size={16} aria-hidden="true" /> {added}{" "}
                  <Link to="/cart">View your case</Link>
                </>
              )}
            </p>
            <p className="quiet">
              {wine.stock <= 10 ? `Only ${wine.stock} left on the shelf. ` : ""}
              Mix any {checkout.caseSize} bottles and save{" "}
              {checkout.caseDiscount * 100}%. Collect today or local delivery
              from {money(checkout.deliveryFee)}.
            </p>
          </form>

          {wine.glass && (
            <p className="by-glass">
              <WineIcon size={18} aria-hidden="true" /> Open at the bar tonight,{" "}
              <span className="num">{money(wine.glass)}</span> a glass.{" "}
              <Link to="/bar">See the board</Link>
            </p>
          )}
        </div>
      </div>

      <div className="product-detail">
        <section>
          <h2>In the glass</h2>
          <div
            className="mini-map"
            aria-label={`${wine.name} sits at body ${wine.body} of 10 and wildness ${wine.wild} of 10`}
            role="img"
          >
            <span className="axis axis-x-low">{finder.axes.body.low}</span>
            <span className="axis axis-x-high">{finder.axes.body.high}</span>
            <span className="axis axis-y-high">{finder.axes.wild.high}</span>
            <span className="axis axis-y-low">{finder.axes.wild.low}</span>
            {wines.map((w) => (
              <span
                key={w.id}
                className="dot"
                data-colour={w.colour}
                data-current={w.id === wine.id ? "" : undefined}
                style={{
                  left: w.body * 10 + "%",
                  top: 100 - w.wild * 10 + "%",
                }}
              />
            ))}
          </div>
          <p className="quiet">
            Body {wine.body}/10 · Wild {wine.wild}/10.{" "}
            <Link to="/finder">Find bottles near this one</Link>
          </p>
        </section>
        <section>
          <h2>The details</h2>
          <dl className="specs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="prose">
          <h2>How it was made</h2>
          <p>{wine.making}</p>
          <h2>Who made it</h2>
          <p>{wine.story}</p>
          <h2>Drink it with</h2>
          <p>{wine.pairing}</p>
        </section>
      </div>

      <section className="section related">
        <div className="section-head">
          <h2>If you like {wine.name}</h2>
          <Link to="/wines" className="text-link">
            Back to the shelf <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="wine-grid">
          {related.map((w) => (
            <WineCard key={w.id} wine={w} />
          ))}
        </div>
      </section>
    </div>
  );
}
