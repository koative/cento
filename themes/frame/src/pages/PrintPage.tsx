import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Link, navigate } from "../router";
import {
  findFrame,
  framings,
  printFacts,
  prints,
  sizes,
  type FramingId,
  type Print,
  type SizeId,
} from "../content";
import { addLine, money, order, remaining, unitPrice } from "../lib/store";
import { WallPreview } from "../components/WallPreview";
import { PrintCard } from "../components/PrintCard";

export function PrintPage({ print }: { print: Print }) {
  const frame = findFrame(print.frameId)!;
  const [size, setSize] = useState<SizeId>("m");
  const [framing, setFraming] = useState<FramingId>("none");
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("");
  const lines = order.use();
  const held = lines
    .filter((l) => l.printId === print.id)
    .reduce((s, l) => s + l.qty, 0);
  const left = remaining(print.id);
  const room = left - held;
  const price = unitPrice(print.id, size, framing);
  const portrait = frame.h > frame.w;
  const related = prints.filter(
    (p) =>
      p.id !== print.id &&
      findFrame(p.frameId)!.series.slug === frame.series.slug,
  );
  const more = (
    related.length ? related : prints.filter((p) => p.id !== print.id)
  ).slice(0, 3);

  function add(goToOrder: boolean) {
    const added = addLine({ printId: print.id, size, framing, qty });
    if (!added) {
      setStatus(
        "Every remaining copy of this edition is already in your order.",
      );
      return;
    }
    setQty(1);
    if (goToOrder) navigate("/order");
    else setStatus(`Added ${added} × ${frame.title} to your order.`);
  }

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/prints">Prints</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{frame.title}</span>
      </nav>

      <div className="print-detail">
        <div className="print-visuals">
          <figure className="print-plate">
            <img
              src={frame.src}
              alt={frame.alt}
              width={frame.w}
              height={frame.h}
            />
          </figure>
          <WallPreview frame={frame} size={size} framing={framing} />
        </div>

        <div className="print-buy">
          <h1>{frame.title}</h1>
          <p className="print-from">
            From{" "}
            <Link to={`/series/${frame.series.slug}?frame=${frame.id}`}>
              {frame.series.title}
            </Link>
            , {frame.place}, {frame.date}
          </p>
          <p>{print.note}</p>
          <p className="edition-line">
            {left
              ? `${left} of ${print.edition} left in the edition`
              : `Edition of ${print.edition}, complete`}
          </p>

          {left ? (
            <form
              className="buy-form"
              onSubmit={(e) => {
                e.preventDefault();
                add(false);
              }}
            >
              <fieldset className="options">
                <legend>Size</legend>
                {sizes.map((s) => (
                  <label key={s.id} className="option">
                    <input
                      type="radio"
                      name="size"
                      value={s.id}
                      checked={size === s.id}
                      onChange={() => setSize(s.id)}
                    />
                    <span className="option-name">{s.label}</span>
                    <span className="option-note">
                      {portrait
                        ? `${s.short} × ${s.long}`
                        : `${s.long} × ${s.short}`}{" "}
                      in
                    </span>
                    <span className="option-price">
                      {money(print.prices[s.id])}
                    </span>
                  </label>
                ))}
              </fieldset>
              <fieldset className="options">
                <legend>Framing</legend>
                {framings.map((f) => (
                  <label key={f.id} className="option">
                    <input
                      type="radio"
                      name="framing"
                      value={f.id}
                      checked={framing === f.id}
                      onChange={() => setFraming(f.id)}
                    />
                    <span className="option-name">
                      <span
                        className="swatch"
                        style={{ background: f.colour }}
                        aria-hidden="true"
                      />
                      {f.label}
                    </span>
                    <span className="option-note">{f.note}</span>
                    <span className="option-price">
                      {f.add[size] ? `+${money(f.add[size])}` : "Included"}
                    </span>
                  </label>
                ))}
              </fieldset>

              <div className="buy-row">
                <div className="stepper" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                    aria-label="One fewer"
                  >
                    <Minus size={16} aria-hidden="true" />
                  </button>
                  <output aria-live="polite">{qty}</output>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setQty(Math.min(room, qty + 1))}
                    disabled={qty >= room}
                    aria-label="One more"
                  >
                    <Plus size={16} aria-hidden="true" />
                  </button>
                </div>
                <p className="buy-total">
                  <span>{money(price * qty)}</span>
                  <span className="buy-total-note">
                    {framing === "none" ? "rolled" : "framed"}, plus shipping
                  </span>
                </p>
              </div>
              <div className="actions">
                <button
                  type="submit"
                  className="btn btn-solid"
                  disabled={room < 1}
                >
                  Add to order
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={room < 1}
                  onClick={() => add(true)}
                >
                  Add and review order
                </button>
              </div>
              <p className="buy-status" aria-live="polite">
                {status}
                {status && held > 0 && (
                  <>
                    {" "}
                    <Link to="/order">Review your order</Link>
                  </>
                )}
              </p>
            </form>
          ) : (
            <div className="sold-out">
              <p>
                All {print.edition} copies have found homes, and closed editions
                are never reprinted.
              </p>
              <Link to="/contact?type=prints" className="btn">
                Hear about the next release
              </Link>
            </div>
          )}

          <dl className="spec">
            <div>
              <dt>Process</dt>
              <dd>{print.process}</dd>
            </div>
            <div>
              <dt>Negative</dt>
              <dd>{frame.code}</dd>
            </div>
            {printFacts.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="section" aria-labelledby="h-more">
        <div className="section-head">
          <h2 id="h-more">
            {related.length
              ? `More from ${frame.series.title}`
              : "Other prints"}
          </h2>
          <Link to="/prints" className="text-link">
            All prints <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="print-grid">
          {more.map((p) => (
            <PrintCard key={p.id} print={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
