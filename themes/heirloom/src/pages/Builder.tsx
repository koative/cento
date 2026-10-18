import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import {
  builder,
  cuts,
  gems,
  metals,
  ringSizes,
  type BandDetail,
  type Cut,
  type Gem,
  type Metal,
} from "../content";
import { addLine, money } from "../lib/cart";
import { Plate } from "../components/Plate";
import { MetalPicker } from "../components/Bits";
import { FieldNote, describedBy } from "../components/Field";

type Setting = (typeof builder.settings)[number]["id"];
const builderCuts: Cut[] = ["round", "oval", "emerald", "cushion"];

/** Stone price grows faster than weight: a 2 ct stone costs far more than two 1 ct stones. */
const stonePrice = (gem: Gem, carat: number) =>
  Math.round((gems[gem].perCarat * carat ** 1.5) / 10) * 10;

export function Builder() {
  const [setting, setSetting] = useState<Setting>("solitaire");
  const [gem, setGem] = useState<Gem>("diamond");
  const [cut, setCut] = useState<Cut>("round");
  const [carat, setCarat] = useState(1);
  const [metal, setMetal] = useState<Metal>("yellow");
  const [band, setBand] = useState<BandDetail>("court");
  const [size, setSize] = useState("");
  const [engraving, setEngraving] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const s = builder.settings.find((x) => x.id === setting)!;
  const b = builder.bands.find((x) => x.id === band)!;
  const centre = stonePrice(gem, carat);
  const sides = setting === "trilogy" ? stonePrice(gem, carat * 0.3) * 2 : 0;
  const lines: [string, number][] = [
    [`${s.name} setting, made by hand`, s.base],
    [
      `${carat.toFixed(1)} ct ${cuts[cut].toLowerCase()} ${gems[gem].name.toLowerCase()}`,
      centre,
    ],
    ...(sides ? [[`Two matched side stones`, sides] as [string, number]] : []),
    ...(metals[metal].surcharge
      ? [[metals[metal].name, metals[metal].surcharge] as [string, number]]
      : []),
    ...("extra" in b ? [[`${b.name} band`, b.extra] as [string, number]] : []),
  ];
  const total = lines.reduce((sum, [, n]) => sum + n, 0);
  const art = { kind: setting, gem, cut, carat, band };
  const summary = `${carat.toFixed(1)} ct ${cuts[cut].toLowerCase()} ${gems[gem].name.toLowerCase()} ${s.name.toLowerCase()} in ${metals[metal].name}, ${b.name.toLowerCase()} band`;

  // Any change invalidates the "added" confirmation for the previous design.
  const change =
    <T,>(set: (v: T) => void) =>
    (v: T) => (set(v), setAdded(false));

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!size) {
      setError(
        "Choose a ring size, or pick “Not sure” and we will size you at your fitting.",
      );
      (e.currentTarget.elements.namedItem("size") as HTMLSelectElement).focus();
      return;
    }
    setError("");
    addLine({
      slug: "custom",
      name: "Your Heirloom design",
      metal,
      art,
      details: [
        summary,
        size === "unsure" ? "Size at fitting" : `US size ${size}`,
        ...(engraving ? [`Engraved “${engraving}”`] : []),
      ],
      unit: total,
      qty: 1,
    });
    setAdded(true);
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{builder.title}</h1>
        <p className="lede">{builder.intro}</p>
      </header>

      <div className="builder">
        <div className="builder-stage">
          <div className="tray lamp builder-main">
            <Plate
              art={art}
              metal={metal}
              className="plate-live"
              title={`Drawing of your ring: ${summary}`}
            />
          </div>
          <div className="builder-views">
            <figure className="tray">
              <Plate
                art={{ kind: "loose", gem, cut, carat }}
                metal={metal}
                title={`The ${gems[gem].name.toLowerCase()} from above`}
              />
              <figcaption>From above</figcaption>
            </figure>
            <figure className="builder-inside">
              <div className="inscription" data-metal={metal}>
                <span>{engraving || "Inside the band"}</span>
              </div>
              <figcaption>Inside the band</figcaption>
            </figure>
          </div>
          <p className="builder-summary" aria-live="polite">
            {summary[0].toUpperCase() + summary.slice(1)}.
          </p>
        </div>

        <form className="builder-form" onSubmit={submit} noValidate>
          <fieldset className="choice-set">
            <legend>
              Setting <span>{s.note}</span>
            </legend>
            <div className="options">
              {builder.settings.map((x) => (
                <label key={x.id} className="option">
                  <input
                    type="radio"
                    name="setting"
                    checked={setting === x.id}
                    onChange={() => change(setSetting)(x.id)}
                  />
                  <span>{x.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="choice-set">
            <legend>
              Stone <span>{gems[gem].note}</span>
            </legend>
            <div className="swatches">
              {(Object.keys(gems) as Gem[]).map((g) => (
                <label key={g} className="swatch" data-gem={g}>
                  <input
                    type="radio"
                    name="gem"
                    checked={gem === g}
                    onChange={() => change(setGem)(g)}
                  />
                  <span className="swatch-chip" aria-hidden="true" />
                  <span className="swatch-name">{gems[g].name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="choice-set">
            <legend>Cut</legend>
            <div className="options">
              {builderCuts.map((c) => (
                <label key={c} className="option">
                  <input
                    type="radio"
                    name="cut"
                    checked={cut === c}
                    onChange={() => change(setCut)(c)}
                  />
                  <span>{cuts[c]}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="f-carat">
              Centre stone weight{" "}
              <output htmlFor="f-carat">{carat.toFixed(1)} ct</output>
            </label>
            <input
              id="f-carat"
              type="range"
              min={builder.carat.min}
              max={builder.carat.max}
              step={builder.carat.step}
              value={carat}
              aria-valuetext={`${carat.toFixed(1)} carats`}
              onChange={(e) => change(setCarat)(Number(e.target.value))}
            />
          </div>

          <MetalPicker
            name="builder-metal"
            options={["yellow", "rose", "platinum"]}
            value={metal}
            onChange={change(setMetal)}
          />

          <fieldset className="choice-set">
            <legend>
              Band <span>{b.note}</span>
            </legend>
            <div className="options">
              {builder.bands.map((x) => (
                <label key={x.id} className="option">
                  <input
                    type="radio"
                    name="band"
                    checked={band === x.id}
                    onChange={() => change(setBand)(x.id)}
                  />
                  <span>{x.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field-row">
            <div className="field">
              <label htmlFor="f-size">Ring size (US)</label>
              <select
                id="f-size"
                name="size"
                value={size}
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy("size", true, error)}
                onChange={(e) => (
                  change(setSize)(e.target.value),
                  setError("")
                )}
              >
                <option value="">Choose a size</option>
                {ringSizes.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                <option value="unsure">Not sure: size me at the fitting</option>
              </select>
              <FieldNote
                name="size"
                hint={<Link to="/care">Ring size chart</Link>}
                error={error}
              />
            </div>
            <div className="field">
              <label htmlFor="f-engrave">Inside engraving</label>
              <input
                id="f-engrave"
                value={engraving}
                maxLength={builder.engravingMax}
                autoComplete="off"
                placeholder="Optional"
                aria-describedby="f-engrave-hint"
                onChange={(e) => change(setEngraving)(e.target.value)}
              />
              <p className="field-hint" id="f-engrave-hint">
                {engraving.length}/{builder.engravingMax} characters
              </p>
            </div>
          </div>

          <div className="ledger">
            <h2>Your ring</h2>
            <dl>
              {lines.map(([label, n]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{money(n)}</dd>
                </div>
              ))}
              <div className="ledger-total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <p className="field-hint">{builder.lead}</p>
            <button className="btn btn-wide" type="submit">
              Add this design to bag
            </button>
            <div aria-live="polite">
              {added && (
                <p className="success">
                  <Check size={18} aria-hidden="true" /> Your design is in the
                  bag. <Link to="/cart">Review it</Link>, or{" "}
                  <Link to="/appointments">bring it to a consultation</Link>.
                </p>
              )}
            </div>
            <Link to="/appointments" className="text-link">
              Prefer to talk it through first?{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
