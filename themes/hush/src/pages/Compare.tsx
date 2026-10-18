import { useState, type ReactNode } from "react";
import { Link } from "../router";
import { compareDefaults, products, type Product } from "../content";
import { money } from "../lib/cart";
import { ProductArt } from "../components/ProductArt";

const models = products.filter((p) => p.specs);

type Row = {
  label: string;
  value: (p: Product) => ReactNode;
  key: (p: Product) => string | number;
  best?: "max" | "min";
};

const rows: Row[] = [
  {
    label: "Price",
    value: (p) => money(p.price),
    key: (p) => p.price,
    best: "min",
  },
  { label: "Type", value: (p) => p.type, key: (p) => p.type },
  {
    label: "Active cancelling",
    value: (p) => `−${p.specs!.anc} dB`,
    key: (p) => p.specs!.anc,
    best: "max",
  },
  {
    label: "Passive isolation",
    value: (p) => `${p.specs!.passive} dB`,
    key: (p) => p.specs!.passive,
    best: "max",
  },
  {
    label: "Battery",
    value: (p) => p.specs!.battery,
    key: (p) => p.specs!.batteryHours,
    best: "max",
  },
  {
    label: "Fast charge",
    value: (p) => p.specs!.charging,
    key: (p) => p.specs!.charging,
  },
  {
    label: "Weight",
    value: (p) => p.specs!.weight,
    key: (p) => p.specs!.weight,
  },
  {
    label: "Microphones",
    value: (p) => p.specs!.mics,
    key: (p) => p.specs!.mics,
  },
  {
    label: "Codecs",
    value: (p) => p.specs!.codecs,
    key: (p) => p.specs!.codecs,
  },
  {
    label: "Multipoint",
    value: (p) => (p.specs!.multipoint ? "Yes" : "No"),
    key: (p) => String(p.specs!.multipoint),
  },
  {
    label: "Water resistance",
    value: (p) => p.specs!.water,
    key: (p) => p.specs!.water,
  },
  {
    label: "Best for",
    value: (p) => p.uses.join(", "),
    key: (p) => p.uses.join(),
  },
  {
    label: "Colours",
    value: (p) => p.colours.map((c) => c.name).join(", "),
    key: (p) => p.colours.length,
  },
];

export function Compare() {
  const [ids, setIds] = useState(compareDefaults);
  const [diffOnly, setDiffOnly] = useState(false);
  const picked = ids.map((id) => models.find((m) => m.id === id) ?? models[0]);
  const shown = diffOnly
    ? rows.filter((r) => new Set(picked.map(r.key)).size > 1)
    : rows;

  return (
    <div className="page compare-page">
      <header className="page-head">
        <h1>Compare models</h1>
        <p className="lead">
          Pick any three. Cancelling figures come from the same chamber, the
          same test head and the same method, so they compare honestly.
        </p>
      </header>

      <div className="compare-controls">
        <label className="switch">
          <input
            type="checkbox"
            checked={diffOnly}
            onChange={(e) => setDiffOnly(e.target.checked)}
          />
          <span>Only show differences</span>
        </label>
        <p className="muted">
          <span className="best-key" aria-hidden="true" /> marks the best in
          each row
        </p>
      </div>

      <div
        className="compare-scroll"
        tabIndex={0}
        role="region"
        aria-label="Comparison table, scrolls sideways on small screens"
      >
        <table className="compare">
          <caption className="visually-hidden">
            Specifications of {picked.map((p) => p.name).join(", ")}
          </caption>
          <thead>
            <tr>
              <td />
              {picked.map((p, i) => (
                <th key={i} scope="col">
                  <label className="visually-hidden" htmlFor={"cmp-" + i}>
                    Model {i + 1}
                  </label>
                  <select
                    id={"cmp-" + i}
                    value={p.id}
                    onChange={(e) =>
                      setIds(
                        ids.map((id, j) => (j === i ? e.target.value : id)),
                      )
                    }
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <ProductArt kind={p.kind} colour={p.colours[0]} />
                  <Link to={"/shop/" + p.id} className="text-link">
                    View {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => {
              const vals = picked.map(r.key) as number[];
              const best =
                r.best && new Set(vals).size > 1
                  ? r.best === "max"
                    ? Math.max(...vals)
                    : Math.min(...vals)
                  : null;
              return (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {picked.map((p, i) => (
                    <td
                      key={i}
                      className={
                        best !== null && vals[i] === best ? "best" : undefined
                      }
                    >
                      {r.value(p)}
                      {best !== null && vals[i] === best && (
                        <span className="visually-hidden"> (best)</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {diffOnly && shown.length === 0 && (
        <p className="empty-state">
          These three are the same model. Pick a different one in any column.
        </p>
      )}

      <section className="compare-help" aria-labelledby="h-choose">
        <h2 id="h-choose">Still deciding?</h2>
        <dl>
          <div>
            <dt>Long flights and trains</dt>
            <dd>
              <Link to="/shop/hush-one">Hush One</Link>. The deepest cancelling
              and forty hours mean one charge covers a return trip.
            </dd>
          </div>
          <div>
            <dt>Commuting light</dt>
            <dd>
              <Link to="/shop/hush-buds-pro">Hush Buds Pro</Link>, or{" "}
              <Link to="/shop/hush-fold">Hush Fold</Link> if you prefer the
              comfort of an over-ear.
            </dd>
          </div>
          <div>
            <dt>All-day calls</dt>
            <dd>
              <Link to="/shop/hush-desk">Hush Desk</Link>. The boom mic beats
              any headphone microphone in a noisy room.
            </dd>
          </div>
          <div>
            <dt>Sleeping</dt>
            <dd>
              <Link to="/shop/hush-night">Hush Night</Link>, the only one you
              can lie on.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
