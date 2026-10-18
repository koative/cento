import { useState } from "react";
import { Download, FileText } from "lucide-react";
import {
  families,
  finishes,
  materials,
  tolerances,
  type MaterialId,
} from "../content";
import {
  clampDims,
  defaultDims,
  describe,
  getDraft,
  partNumber,
  quote,
  setDraft,
  usd,
  type PartSpec,
} from "../lib/part";
import { navigate } from "../router";
import { PartDrawing } from "./PartDrawing";

const presets = [1, 10, 100, 500, 1000];

export function Configurator() {
  const [spec, setSpec] = useState<PartSpec>(
    () =>
      getDraft() ?? {
        family: "flange",
        dims: defaultDims("flange"),
        material: "al6061",
        finish: "anodize2",
        tol: "fine",
        qty: 50,
      },
  );
  const [qtyText, setQtyText] = useState(String(spec.qty));
  const fam = families.find((f) => f.id === spec.family)!;
  const mat = materials.find((m) => m.id === spec.material)!;
  const q = quote(spec);
  const pn = partNumber(spec);
  const allowed = finishes.filter((f) => f.for.includes(mat.kind));

  const update = (patch: Partial<PartSpec>) =>
    setSpec((s) => {
      const next = { ...s, ...patch };
      next.dims = clampDims(next.family, next.dims);
      const kind = materials.find((m) => m.id === next.material)!.kind;
      if (!finishes.find((f) => f.id === next.finish)!.for.includes(kind))
        next.finish = "machined";
      return next;
    });

  const setQty = (raw: string) => {
    setQtyText(raw);
    const n = Math.round(Number(raw));
    if (Number.isFinite(n) && n >= 1 && n <= 5000) update({ qty: n });
  };

  const download = () => {
    const lines = [
      "FORGE PRECISION WORKS — PART SPECIFICATION",
      `Part number: ${pn}`,
      `Part: ${fam.name}`,
      ...describe(spec),
      `Material: ${mat.name}`,
      `Finish: ${finishes.find((f) => f.id === spec.finish)!.name}`,
      `Tolerance: ${tolerances.find((t) => t.id === spec.tol)!.name} (${tolerances.find((t) => t.id === spec.tol)!.band})`,
      `Quantity: ${spec.qty}`,
      `Indicative unit price: ${usd(q.unit)}  ·  setup ${usd(q.setup, 0)}  ·  ~${q.days} working days`,
      "",
      "Illustrative estimate generated in the browser. Not a quotation.",
    ];
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([lines.join("\n")], { type: "text/plain" }),
    );
    a.download = `${pn}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const requestQuote = () => {
    setDraft(spec);
    navigate("/rfq");
  };

  return (
    <div className="config">
      <div className="config-sheet">
        <PartDrawing spec={spec} />
        <div className="config-result" aria-live="polite">
          <dl className="readout">
            <div className="readout-main">
              <dt>Unit price at {spec.qty.toLocaleString("en-US")} pcs</dt>
              <dd>{usd(q.unit)}</dd>
            </div>
            <div>
              <dt>Order total</dt>
              <dd>{usd(q.total, 0)}</dd>
            </div>
            <div>
              <dt>One-off setup</dt>
              <dd>{usd(q.setup, 0)}</dd>
            </div>
            <div>
              <dt>Lead time</dt>
              <dd>~{q.days} working days</dd>
            </div>
            <div>
              <dt>Part mass</dt>
              <dd>
                {q.massG >= 1000
                  ? `${(q.massG / 1000).toFixed(2)} kg`
                  : `${Math.round(q.massG)} g`}
              </dd>
            </div>
          </dl>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Price breaks"
        >
          <table className="breaks">
            <caption>Price breaks for {pn}</caption>
            <thead>
              <tr>
                <th scope="col">Quantity</th>
                {q.breaks.map((b) => (
                  <th scope="col" key={b.qty}>
                    {b.qty.toLocaleString("en-US")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Unit</th>
                {q.breaks.map((b) => (
                  <td key={b.qty}>{usd(b.unit)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form
        className="config-controls"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Part options"
      >
        <fieldset className="seg">
          <legend>Part</legend>
          <div className="seg-row">
            {families.map((f) => (
              <label key={f.id} className="seg-opt">
                <input
                  type="radio"
                  name="family"
                  value={f.id}
                  checked={spec.family === f.id}
                  onChange={() =>
                    update({ family: f.id, dims: defaultDims(f.id) })
                  }
                />
                <span>{f.name}</span>
              </label>
            ))}
          </div>
          <p className="hint">{fam.blurb}</p>
        </fieldset>

        <fieldset>
          <legend>Dimensions</legend>
          {fam.dims.map((d) => (
            <div className="range" key={`${fam.id}-${d.key}`}>
              <label htmlFor={`dim-${d.key}`}>{d.label}</label>
              <output htmlFor={`dim-${d.key}`}>
                {spec.dims[d.key]}
                {d.key === "holes" ? "" : " mm"}
              </output>
              <input
                id={`dim-${d.key}`}
                type="range"
                min={d.min}
                max={d.max}
                step={d.step}
                value={spec.dims[d.key]}
                onChange={(e) =>
                  update({
                    dims: { ...spec.dims, [d.key]: Number(e.target.value) },
                  })
                }
              />
            </div>
          ))}
        </fieldset>

        <div className="field">
          <label htmlFor="cfg-material">Material</label>
          <select
            id="cfg-material"
            value={spec.material}
            onChange={(e) => update({ material: e.target.value as MaterialId })}
          >
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend>Finish</legend>
          <div className="choice-list">
            {allowed.map((f) => (
              <label key={f.id} className="choice">
                <input
                  type="radio"
                  name="finish"
                  value={f.id}
                  checked={spec.finish === f.id}
                  onChange={() => update({ finish: f.id })}
                />
                <span>{f.name}</span>
                <span className="choice-meta">
                  {f.perPart ? `+${usd(f.perPart)} · +${f.days} d` : "included"}
                </span>
              </label>
            ))}
          </div>
          <p className="hint">Only finishes that suit {mat.name} are listed.</p>
        </fieldset>

        <fieldset className="seg">
          <legend>Tolerance</legend>
          <div className="seg-row">
            {tolerances.map((t) => (
              <label key={t.id} className="seg-opt">
                <input
                  type="radio"
                  name="tol"
                  value={t.id}
                  checked={spec.tol === t.id}
                  onChange={() => update({ tol: t.id })}
                />
                <span>
                  {t.band}
                  <small>{t.name}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="cfg-qty">Quantity</label>
          <input
            id="cfg-qty"
            type="number"
            inputMode="numeric"
            min={1}
            max={5000}
            value={qtyText}
            aria-describedby="cfg-qty-hint"
            aria-invalid={String(spec.qty) !== qtyText.trim() || undefined}
            onChange={(e) => setQty(e.target.value)}
            onBlur={() => setQtyText(String(spec.qty))}
          />
          <p className="hint" id="cfg-qty-hint">
            {String(spec.qty) !== qtyText.trim()
              ? "Enter a whole number from 1 to 5,000. Over 5,000? Send an RFQ for a blanket order."
              : "1 to 5,000 pieces per release."}
          </p>
          <div className="chips" role="group" aria-label="Quantity presets">
            {presets.map((p) => (
              <button
                type="button"
                key={p}
                className="chip"
                aria-pressed={spec.qty === p}
                onClick={() => setQty(String(p))}
              >
                {p.toLocaleString("en-US")}
              </button>
            ))}
          </div>
        </div>

        <div className="config-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={requestQuote}
          >
            <FileText aria-hidden="true" /> Request a quote for this part
          </button>
          <button type="button" className="btn btn-ghost" onClick={download}>
            <Download aria-hidden="true" /> Download spec (.txt)
          </button>
        </div>
        <p className="fineprint">
          Prices are an illustrative estimate calculated in your browser, in
          USD. A real quote comes from an estimator.
        </p>
      </form>
    </div>
  );
}
