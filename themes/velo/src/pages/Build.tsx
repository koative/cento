import { useState } from "react";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { Link } from "../router";
import { bikes, build, type Bike, type Option } from "../content";
import { FrameDrawing } from "../components/FrameDrawing";
import { addLine, money } from "../lib/cart";
import { sizeForHeight, sizeGeometry } from "../lib/geometry";

const platforms = build.platforms.map((id) => bikes.find((b) => b.id === id)!);

export function Build() {
  const [platform, setPlatform] = useState<Bike>(platforms[0]);
  const [height, setHeight] = useState(176);
  const [sizeOverride, setSizeOverride] = useState<number | null>(null);
  const [finish, setFinish] = useState(build.finishes[0]);
  const [custom, setCustom] = useState(false);
  const [groupset, setGroupset] = useState<Option>(build.groupsets[0]);
  const [wheels, setWheels] = useState<Option>(build.wheels[0]);
  const [tyre, setTyre] = useState(platform.tyre);
  const [extras, setExtras] = useState<string[]>([]);
  const [added, setAdded] = useState("");

  const recommended = sizeForHeight(platform, height);
  const size = sizeOverride ?? recommended;
  const g = sizeGeometry(platform, size);
  const chosenExtras = build.extras.filter((e) => extras.includes(e.id));
  const minTyre = Math.min(28, platform.tyre);

  const lines: [string, number][] = [
    [
      `${platform.name} complete, ${platform.type.toLowerCase()} base build`,
      platform.price,
    ],
    [groupset.name, groupset.price],
    [wheels.name, wheels.price],
    ...(custom
      ? [[build.customPaint.name, build.customPaint.price] as [string, number]]
      : []),
    ...chosenExtras.map((e) => [e.name, e.price] as [string, number]),
  ];
  const total = lines.reduce((s, [, p]) => s + p, 0);
  const weight =
    platform.weight +
    groupset.weight +
    wheels.weight +
    chosenExtras.reduce((s, e) => s + e.weight, 0) +
    (tyre - platform.tyre) * 0.012;

  function choosePlatform(b: Bike) {
    setPlatform(b);
    setSizeOverride(null);
    setTyre(b.tyre);
    setAdded("");
  }

  function addToCart() {
    const detail = [
      `${size} cm`,
      custom ? `${finish.name} (colour match)` : finish.name,
      groupset.name,
      wheels.name,
      `${tyre} mm tyres`,
      ...chosenExtras.map((e) => e.name),
    ].join(" · ");
    addLine({
      id: `build-${platform.id}`,
      name: `${platform.name} custom build`,
      detail,
      swatch: finish.hex,
      photo: platform.photo,
      unit: total,
      qty: 1,
    });
    setAdded(`${platform.name} custom build added to your cart.`);
  }

  return (
    <div className="page build-page">
      <header className="page-head">
        <h1>Build configurator</h1>
        <p className="lead">
          Choose a frame, enter your height and spec it the way you'd ride it.
          The drawing is to scale: it changes with your size, your tyres and
          your mudguards. We confirm every detail at your fitting before cutting
          a tube.
        </p>
      </header>

      <div className="builder">
        <div className="builder-stage">
          <div className="sheet sheet-large">
            <FrameDrawing
              geometry={g}
              tyre={tyre}
              finish={finish.hex}
              bar={platform.bar}
              mudguards={extras.includes("mudguards")}
              rack={extras.includes("rack")}
              deepRims={wheels.id === "carbon"}
              label={`${platform.name} frame drawing, ${size} centimetre, ${finish.name}, ${tyre} millimetre tyres`}
              dims
              drawKey={platform.id + size}
            />
            <p className="sheet-caption">
              <span>
                {platform.name} · {size} cm · {finish.name}
              </span>
              <span className="num sheet-geo">
                Stack {g.stack} · Reach {g.reach} · HA {g.headAngle}° · SA{" "}
                {g.seatAngle}°
              </span>
            </p>
          </div>
          <p className="readout">
            <strong className="num">{money(total)}</strong>
            <span className="num">
              About {weight.toFixed(1)} kg · ready {build.leadWeeks} weeks after
              fitting
            </span>
          </p>
        </div>

        <form className="builder-panel" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="choice-group">
            <legend>Frame</legend>
            {platforms.map((b) => (
              <label key={b.id} className="choice">
                <input
                  type="radio"
                  name="platform"
                  checked={platform.id === b.id}
                  onChange={() => choosePlatform(b)}
                />
                <span className="choice-name">
                  {b.name} <small>{b.type}</small>
                </span>
                <span className="choice-detail">{b.line}</span>
                <span className="choice-price num">from {money(b.price)}</span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>
              Your height <span className="num">{height} cm</span>
            </legend>
            <input
              type="range"
              min={150}
              max={200}
              value={height}
              aria-label="Your height in centimetres"
              aria-valuetext={`${height} centimetres`}
              onChange={(e) => {
                setHeight(Number(e.target.value));
                setSizeOverride(null);
              }}
            />
            <div className="size-row" role="radiogroup" aria-label="Frame size">
              {platform.sizes.map((s) => (
                <label
                  key={s}
                  className="size"
                  data-suggested={recommended === s || undefined}
                >
                  <input
                    type="radio"
                    name="build-size"
                    checked={size === s}
                    onChange={() => setSizeOverride(s)}
                  />
                  <span className="num">{s}</span>
                </label>
              ))}
            </div>
            <p className="hint">
              {size === recommended
                ? `${size} cm fits riders ${g.heights[0]}–${g.heights[1]} cm.`
                : `You chose ${size} cm; we'd suggest ${recommended} cm.`}
            </p>
          </fieldset>

          <fieldset className="swatches">
            <legend>
              Paint <span>{finish.name}</span>
            </legend>
            {build.finishes.map((f) => (
              <label
                key={f.name}
                className="swatch"
                style={{ background: f.hex }}
              >
                <input
                  type="radio"
                  name="build-finish"
                  checked={finish.name === f.name}
                  onChange={() => setFinish(f)}
                  aria-label={f.name}
                />
              </label>
            ))}
            <label className="check">
              <input
                type="checkbox"
                checked={custom}
                onChange={(e) => setCustom(e.target.checked)}
              />
              <span>
                Match a colour you bring us{" "}
                <small className="num">+{money(build.customPaint.price)}</small>
              </span>
            </label>
          </fieldset>

          <OptionGroup
            legend="Groupset"
            name="groupset"
            options={build.groupsets}
            value={groupset}
            onChange={setGroupset}
          />
          <OptionGroup
            legend="Wheels"
            name="wheels"
            options={build.wheels}
            value={wheels}
            onChange={setWheels}
          />

          <fieldset>
            <legend>
              Tyre width <span className="num">{tyre} mm</span>
            </legend>
            <input
              type="range"
              min={minTyre}
              max={platform.clearance}
              value={tyre}
              aria-label="Tyre width in millimetres"
              aria-valuetext={`${tyre} millimetres`}
              onChange={(e) => setTyre(Number(e.target.value))}
            />
            <p className="hint num">
              {minTyre}–{platform.clearance} mm fits the {platform.name}
              {extras.includes("mudguards") &&
                ` (${platform.clearance - 6} mm with mudguards)`}
              .
            </p>
          </fieldset>

          <fieldset className="choice-group">
            <legend>Extras</legend>
            {build.extras.map((e) => (
              <label key={e.id} className="check">
                <input
                  type="checkbox"
                  checked={extras.includes(e.id)}
                  onChange={(ev) => {
                    setExtras(
                      ev.target.checked
                        ? [...extras, e.id]
                        : extras.filter((x) => x !== e.id),
                    );
                    if (e.id === "mudguards" && ev.target.checked)
                      setTyre(Math.min(tyre, platform.clearance - 6));
                  }}
                />
                <span>
                  {e.name} <small>{e.detail}</small>
                </span>
                <span className="num">+{money(e.price)}</span>
              </label>
            ))}
          </fieldset>

          <div className="summary" aria-live="polite">
            <h2>Your build</h2>
            <ul>
              {lines.map(([name, price]) => (
                <li key={name}>
                  <span>{name}</span>
                  <span className="num">
                    {price ? money(price) : "Included"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="summary-total">
              <span>Total</span>
              <strong className="num">{money(total)}</strong>
            </p>
            <p className="hint num">
              About {weight.toFixed(1)} kg · ready {build.leadWeeks} weeks after
              your fitting · 30% deposit at fitting
            </p>
          </div>
          <button type="button" className="btn btn-wide" onClick={addToCart}>
            <ShoppingBag size={18} aria-hidden="true" /> Add build to cart
          </button>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View cart</Link>
              </>
            )}
          </p>
          <p className="hint">
            Prefer to talk it through?{" "}
            <Link to="/service">
              Book a fitting <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function OptionGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: Option;
  onChange: (o: Option) => void;
}) {
  return (
    <fieldset className="choice-group">
      <legend>{legend}</legend>
      {options.map((o) => (
        <label key={o.id} className="choice">
          <input
            type="radio"
            name={name}
            checked={value.id === o.id}
            onChange={() => onChange(o)}
          />
          <span className="choice-name">{o.name}</span>
          <span className="choice-detail">{o.detail}</span>
          <span className="choice-price num">
            {o.price ? `+${money(o.price)}` : "Included"}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
