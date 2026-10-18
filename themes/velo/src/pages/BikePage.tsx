import { useState } from "react";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { Link } from "../router";
import { bikeIncludes, bikes, type Bike } from "../content";
import { FrameDrawing } from "../components/FrameDrawing";
import { BikeCard } from "../components/BikeCard";
import { Qty } from "../components/Qty";
import { addLine, money } from "../lib/cart";
import {
  sizeForHeight,
  sizeGeometry,
  type SizedGeometry,
} from "../lib/geometry";

const rows: [string, (g: SizedGeometry) => string][] = [
  ["Rider height", (g) => `${g.heights[0]}–${g.heights[1]} cm`],
  ["Stack", (g) => `${g.stack}`],
  ["Reach", (g) => `${g.reach}`],
  ["Top tube (effective)", (g) => `${g.topTube}`],
  ["Seat tube", (g) => `${g.seatTube}`],
  ["Head tube", (g) => `${g.headTube}`],
  ["Head angle", (g) => `${g.headAngle}°`],
  ["Seat angle", (g) => `${g.seatAngle}°`],
  ["Chainstay", (g) => `${g.chainstay}`],
  ["BB drop", (g) => `${g.bbDrop}`],
  ["Fork offset", (g) => `${g.offset}`],
  ["Wheelbase", (g) => `${g.wheelbase}`],
];

export function BikePage({ bike }: { bike: Bike }) {
  const [view, setView] = useState<"photo" | "drawing">("photo");
  const [finish, setFinish] = useState(bike.finishes[0]);
  const [size, setSize] = useState(bike.baseSize);
  const [height, setHeight] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const all = bike.sizes.map((s) => sizeGeometry(bike, s));
  const g = all.find((x) => x.size === size)!;
  const h = Number(height);
  const suggested = h >= 140 && h <= 210 ? sizeForHeight(bike, h) : null;
  const toOrder = bike.toOrder.includes(size);
  const related = [
    ...bikes.filter((b) => b.id !== bike.id && b.type === bike.type),
    ...bikes.filter((b) => b.type !== bike.type),
  ].slice(0, 3);

  function add() {
    const detail = `${size} cm · ${finish.name}`;
    addLine({
      id: bike.id,
      name: bike.name,
      detail,
      swatch: finish.hex,
      photo: bike.photo,
      unit: bike.price,
      qty,
    });
    setAdded(`${qty} × ${bike.name}, ${detail}, added to your cart.`);
  }

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/bikes">Bikes</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{bike.name}</span>
      </nav>

      <section className="product">
        <div className="gallery">
          <div className="gallery-stage" data-view={view}>
            {view === "photo" ? (
              <img
                src={bike.photo}
                alt={bike.photoAlt}
                width={1400}
                height={933}
                style={{ objectPosition: bike.photoPosition }}
              />
            ) : (
              <div className="sheet">
                <FrameDrawing
                  geometry={g}
                  tyre={bike.tyre}
                  finish={finish.hex}
                  bar={bike.bar}
                  deepRims={bike.deepRims}
                  label={`${bike.name} geometry drawing, ${size} cm frame in ${finish.name}`}
                  dims
                  drawKey={String(size)}
                />
                <p className="sheet-caption">
                  <span>
                    {bike.name} · {size} cm · {finish.name}
                  </span>
                  <span>Millimetres</span>
                </p>
              </div>
            )}
          </div>
          <div className="view-switch" role="group" aria-label="Gallery view">
            <button
              type="button"
              aria-pressed={view === "photo"}
              onClick={() => setView("photo")}
            >
              Photo
            </button>
            <button
              type="button"
              aria-pressed={view === "drawing"}
              onClick={() => setView("drawing")}
            >
              Geometry drawing
            </button>
          </div>
        </div>

        <div className="buy">
          <h1>{bike.name}</h1>
          <p className="buy-line">{bike.line}</p>
          <p className="buy-price">
            <span className="num">{money(bike.price)}</span>
            <span className="buy-meta">
              {bike.type} · {bike.material} ·{" "}
              <span className="num">{bike.weight.toFixed(1)} kg</span>
            </span>
          </p>

          <fieldset className="swatches">
            <legend>
              Finish <span>{finish.name}</span>
            </legend>
            {bike.finishes.map((f) => (
              <label
                key={f.name}
                className="swatch"
                style={{ background: f.hex }}
              >
                <input
                  type="radio"
                  name="finish"
                  checked={finish.name === f.name}
                  onChange={() => setFinish(f)}
                  aria-label={f.name}
                />
              </label>
            ))}
          </fieldset>

          <fieldset className="sizes">
            <legend>
              Frame size{" "}
              <span>
                {toOrder ? "Built to order, 3 weeks" : "On the shop floor"}
              </span>
            </legend>
            <div className="size-row">
              {bike.sizes.map((s) => (
                <label
                  key={s}
                  className="size"
                  data-suggested={suggested === s || undefined}
                >
                  <input
                    type="radio"
                    name="size"
                    checked={size === s}
                    onChange={() => setSize(s)}
                  />
                  <span className="num">{s}</span>
                </label>
              ))}
            </div>
            <div className="height-help">
              <label htmlFor="rider-height">Not sure? Your height in cm</label>
              <input
                id="rider-height"
                type="number"
                inputMode="numeric"
                min={140}
                max={210}
                placeholder="e.g. 176"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <p aria-live="polite">
                {suggested
                  ? suggested === size
                    ? `${suggested} cm is the right size for you.`
                    : `We'd start you on ${suggested} cm.`
                  : height
                    ? "Enter a height between 140 and 210 cm."
                    : ""}
                {suggested && suggested !== size && (
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setSize(suggested)}
                  >
                    Choose {suggested} cm
                  </button>
                )}
              </p>
            </div>
          </fieldset>

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label="Quantity" />
            <button type="button" className="btn btn-wide" onClick={add}>
              <ShoppingBag size={18} aria-hidden="true" /> Add to cart ·{" "}
              <span className="num">{money(bike.price * qty)}</span>
            </button>
          </div>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View cart</Link>
              </>
            )}
          </p>
          <ul className="includes">
            {bikeIncludes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="product-story">
        <div className="prose">
          <h2>About the {bike.name}</h2>
          {bike.description.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
          <p className="ride-note">“{bike.rideNote}”</p>
        </div>
        <div>
          <h2>Specification</h2>
          <dl className="specs">
            {bike.specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div>
              <dt>Weight</dt>
              <dd className="num">
                {bike.weight.toFixed(1)} kg, size {bike.baseSize}, no pedals
              </dd>
            </div>
            <div>
              <dt>Tyre clearance</dt>
              <dd className="num">{bike.clearance} mm</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="geo-section">
        <h2>Geometry</h2>
        <p className="muted">
          All measurements in millimetres. Your size is highlighted; tap a
          column heading to switch.
        </p>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label={`${bike.name} geometry table`}
        >
          <table className="geo-table">
            <thead>
              <tr>
                <th scope="col">Size</th>
                {all.map((x) => (
                  <th
                    key={x.size}
                    scope="col"
                    data-current={x.size === size || undefined}
                  >
                    <button
                      type="button"
                      onClick={() => setSize(x.size)}
                      aria-pressed={x.size === size}
                    >
                      {x.size}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {all.map((x) => (
                    <td
                      key={x.size}
                      data-current={x.size === size || undefined}
                    >
                      {fn(x)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {bike.frameset && (
        <section className="cta-strip">
          <div>
            <h2>Want it drawn around you?</h2>
            <p>
              The {bike.name} frameset is {money(bike.frameset)} on its own.
              Build it up in the configurator with your own parts, paint and
              tyre width.
            </p>
          </div>
          <Link to="/build" className="btn">
            Build a custom {bike.name}{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      )}

      <section className="section related">
        <h2>Also on the floor</h2>
        <div className="bike-grid bike-grid-three">
          {related.map((b) => (
            <BikeCard key={b.id} bike={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
