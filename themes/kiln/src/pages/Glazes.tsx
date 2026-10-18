import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  bench,
  clays,
  firing,
  forms,
  glazes,
  products,
  type ClayId,
  type FormId,
  type GlazeId,
} from "../content";
import { addLine, money } from "../lib/cart";
import { GlazeTile, Vessel } from "../components/Ceramics";
import { Qty } from "../components/Qty";

export function Glazes() {
  const [form, setForm] = useState<FormId>("jug");
  const [clay, setClay] = useState<ClayId>("speckled");
  const [glaze, setGlaze] = useState<GlazeId>("tide");
  const [dip, setDip] = useState(70);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const f = forms.find((x) => x.id === form)!;
  const c = clays.find((x) => x.id === clay)!;
  const g = glazes.find((x) => x.id === glaze)!;
  const description = `${g.name} on ${c.name.toLowerCase()}, dipped ${dip}%`;

  function add(e: FormEvent) {
    e.preventDefault();
    addLine({
      id: `made-${form}`,
      name: `Made-to-order ${f.name.toLowerCase()}`,
      detail: description,
      glaze,
      clay,
      unit: f.price,
      qty,
      made: true,
    });
    setAdded(
      `Added ${qty} × ${f.name.toLowerCase()} in ${description} to your bag.`,
    );
  }

  return (
    <div className="page glazes">
      <header className="page-head">
        <h1>{bench.title}</h1>
        <p className="lead">{bench.intro}</p>
      </header>

      <form className="bench" onSubmit={add}>
        <div className="bench-stage">
          <Vessel
            form={form}
            glaze={glaze}
            clay={clay}
            dip={dip}
            className="bench-vessel"
            label={`${f.name} drawing: ${description}`}
          />
          <p className="bench-caption">
            {f.name} · {f.size}
          </p>
        </div>

        <div className="bench-controls">
          <fieldset className="option">
            <legend>Form</legend>
            <div className="chips">
              {forms.map((x) => (
                <label key={x.id} className="chip">
                  <input
                    type="radio"
                    name="form"
                    checked={form === x.id}
                    onChange={() => setForm(x.id)}
                  />
                  <span>
                    {x.name} <small>{money(x.price)}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="option">
            <legend>
              Clay <span>{c.note}</span>
            </legend>
            <div className="chips">
              {clays.map((x) => (
                <label key={x.id} className="chip">
                  <input
                    type="radio"
                    name="clay"
                    checked={clay === x.id}
                    onChange={() => setClay(x.id)}
                  />
                  <span>
                    <i
                      className="dot"
                      style={{ background: x.color }}
                      aria-hidden="true"
                    />
                    {x.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="option">
            <legend>
              Glaze <span>{g.surface}</span>
            </legend>
            <div className="tile-picker">
              {glazes.map((x) => (
                <label key={x.id}>
                  <input
                    type="radio"
                    name="glaze"
                    checked={glaze === x.id}
                    onChange={() => setGlaze(x.id)}
                  />
                  <GlazeTile glaze={x.id} clay={clay} />
                  <span>{x.name}</span>
                </label>
              ))}
            </div>
            <p className="option-note">{g.note}</p>
          </fieldset>

          <div className="option">
            <label htmlFor="dip" className="range-label">
              Dip depth <output htmlFor="dip">{dip}%</output>
            </label>
            <input
              id="dip"
              type="range"
              min={30}
              max={95}
              step={5}
              value={dip}
              onChange={(e) => setDip(Number(e.target.value))}
              aria-describedby="dip-hint"
            />
            <p className="option-note" id="dip-hint">
              How far down the pot goes into the glaze bucket. The foot always
              stays raw so it does not fuse to the kiln shelf.
            </p>
          </div>

          <div className="bench-total">
            <p>
              <strong>
                {f.name} in {g.name}
              </strong>
              {firing.madeToOrder}
            </p>
            <div className="buy-row">
              <Qty value={qty} onChange={setQty} label="Quantity" max={6} />
              <button type="submit" className="btn btn-wide">
                Have it made · {money(f.price * qty)}
              </button>
            </div>
            <p className="form-status" aria-live="polite">
              {added && (
                <>
                  {added} <Link to="/cart">View bag</Link>
                </>
              )}
            </p>
          </div>
        </div>
      </form>

      <section className="section test-board" aria-labelledby="board-title">
        <div className="section-head">
          <h2 id="board-title">The test board</h2>
          <p>Every glaze on every clay, as it hangs on the studio wall.</p>
        </div>
        <div className="board" role="table" aria-label="Glazes by clay">
          <div role="row" className="board-row board-headrow">
            <span role="columnheader">Glaze</span>
            {clays.map((x) => (
              <span role="columnheader" key={x.id}>
                {x.name}
              </span>
            ))}
          </div>
          {glazes.map((x) => {
            const count = products.filter((p) =>
              p.glazes.includes(x.id),
            ).length;
            return (
              <div role="row" className="board-row" key={x.id}>
                <div role="rowheader" className="board-name">
                  <h3>{x.name}</h3>
                  <p>
                    {x.surface}. {x.note}
                  </p>
                  {count > 0 && (
                    <Link to={`/shop?glaze=${x.id}`} className="text-link">
                      {count} {count === 1 ? "piece" : "pieces"} in the shop{" "}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
                {clays.map((y) => (
                  <span role="cell" key={y.id} className="board-cell">
                    <GlazeTile glaze={x.id} clay={y.id} />
                    <span className="visually-hidden">
                      {x.name} on {y.name}
                    </span>
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        <p className="muted board-note">{bench.note}</p>
      </section>
    </div>
  );
}
