import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import {
  faces,
  frames,
  lensIndexes,
  lensTypes,
  lightReactive,
  type Frame,
} from "../content";
import { addLine, money } from "../lib/cart";
import { FrameArt } from "../components/FrameArt";
import { FrameCard, Qty, shapeLabel, stamp } from "../components/FrameCard";

const policies = [
  {
    title: "Your prescription",
    body: "Add it at checkout by typing it in, emailing a photo later, or linking a Lumen eye exam. An optician checks every prescription before your lenses are cut, and calls you if anything looks off.",
  },
  {
    title: "Delivery and returns",
    body: "Free standard shipping, ready in five to seven working days for single vision. Return or exchange any pair within 30 days, prescription lenses included.",
  },
  {
    title: "Care and repairs",
    body: "Rinse lenses under lukewarm water and dry with the cloth. Screws, nose pads and alignment are free in any store for the life of the frame.",
  },
];

export function FramePage({ frame }: { frame: Frame }) {
  const [colour, setColour] = useState(frame.colours[0]);
  const [size, setSize] = useState(frame.sizes[frame.sizes.length > 1 ? 1 : 0]);
  const [lens, setLens] = useState(
    frame.line === "sun"
      ? lensTypes.find((l) => l.id === "plano")!
      : lensTypes[0],
  );
  const [index, setIndex] = useState(lensIndexes[0]);
  const [reactive, setReactive] = useState(false);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<"front" | "measure" | "photo">("front");
  const [added, setAdded] = useState("");

  const rx = lens.rx;
  const unit =
    frame.price +
    lens.price +
    (rx ? index.price : 0) +
    (reactive && frame.line === "optical" ? lightReactive.price : 0);
  const related = frames
    .filter(
      (f) =>
        f.id !== frame.id &&
        f.line === frame.line &&
        f.faces.some((x) => frame.faces.includes(x)),
    )
    .slice(0, 3);
  const views = [
    { id: "front" as const, label: "Front" },
    { id: "measure" as const, label: "Measurements" },
    ...(frame.photo ? [{ id: "photo" as const, label: "Photo" }] : []),
  ];

  function add(then?: string) {
    addLine({
      id: frame.id,
      name: frame.name,
      colour: colour.name,
      size: `${size.label} ${stamp(size)}`,
      lens: lens.name,
      index: rx ? index.name : "",
      reactive: reactive && frame.line === "optical",
      unit,
      qty,
    });
    setAdded(`${qty} × ${frame.name} in ${colour.name} added to your bag.`);
    if (then) navigate(then);
  }

  return (
    <div className="page product">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/frames">Frames</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{frame.name}</span>
      </nav>

      <div className="product-top">
        <div className="gallery">
          <div className="stage" data-view={view}>
            {view === "front" && (
              <FrameArt
                frame={frame}
                colour={colour}
                label={`${frame.name} in ${colour.name}, front view`}
                className="stage-art"
              />
            )}
            {view === "measure" && (
              <svg
                viewBox="0 0 320 200"
                className="stage-art measure"
                role="img"
                aria-label={`${frame.name} measurements: lens ${size.lens} mm, bridge ${size.bridge} mm, total width ${size.width} mm`}
              >
                <FrameArt
                  frame={frame}
                  colour={colour}
                  y="30"
                  width="320"
                  height="130"
                />
                <path d="M8 18H312M8 12V24M312 12V24" />
                <text x="160" y="12">
                  {size.width} mm frame width
                </text>
                <path d="M40 172H144M40 166V178M144 166V178M144 172H176M176 166V178" />
                <text x="92" y="192">
                  {size.lens} mm lens
                </text>
                <text x="160" y="164">
                  {size.bridge}
                </text>
              </svg>
            )}
            {view === "photo" && frame.photo && (
              <img src={frame.photo.src} alt={frame.photo.alt} />
            )}
            <p className="stage-stamp" aria-hidden="true">
              LUMEN {frame.name.toUpperCase()} {stamp(size)} {colour.code}
            </p>
          </div>
          <div className="views" role="group" aria-label="Product views">
            {views.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={view === v.id}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="buy">
          <h1>{frame.name}</h1>
          <p className="buy-meta">
            {shapeLabel(frame)} · {frame.material} · {frame.weight} g ·{" "}
            {frame.line === "sun" ? "Sunglasses" : "Optical"}
          </p>
          <p className="lede">{frame.summary}</p>
          <p className="buy-price">
            <span>{money(unit)}</span>
            {unit !== frame.price && (
              <small>Frame {money(frame.price)} + lens options</small>
            )}
            {unit === frame.price && (
              <small>
                {frame.line === "sun"
                  ? "With non-prescription sun lenses"
                  : "With single-vision lenses and coatings"}
              </small>
            )}
          </p>

          <fieldset className="option">
            <legend>
              Colour{" "}
              <span>
                {colour.name} · {colour.code}
              </span>
            </legend>
            <div className="swatches">
              {frame.colours.map((c) => (
                <label key={c.code} className="swatch" title={c.name}>
                  <input
                    type="radio"
                    name="colour"
                    checked={colour === c}
                    onChange={() => setColour(c)}
                  />
                  <span
                    style={{ background: c.rim }}
                    data-finish={c.finish}
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="option">
            <legend>Size</legend>
            <div className="choice-row">
              {frame.sizes.map((s) => (
                <label key={s.label} className="choice">
                  <input
                    type="radio"
                    name="size"
                    checked={size === s}
                    onChange={() => setSize(s)}
                  />
                  <span>
                    <strong>{s.label}</strong>
                    <small>
                      {stamp(s)} · {s.width} mm wide
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="option">
            <legend>Lenses</legend>
            <div className="choice-list">
              {lensTypes.map((l) => (
                <label key={l.id} className="choice">
                  <input
                    type="radio"
                    name="lens"
                    checked={lens === l}
                    onChange={() => setLens(l)}
                  />
                  <span>
                    <strong>{l.name}</strong>
                    <small>{l.short}</small>
                  </span>
                  <span className="choice-price">
                    {l.price ? `+${money(l.price)}` : "Included"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {rx && (
            <fieldset className="option">
              <legend>
                Lens thickness <Link to="/lenses">Which do I need?</Link>
              </legend>
              <div className="choice-grid">
                {lensIndexes.map((x) => (
                  <label key={x.id} className="choice">
                    <input
                      type="radio"
                      name="index"
                      checked={index === x}
                      onChange={() => setIndex(x)}
                    />
                    <span>
                      <strong>{x.name}</strong>
                      <small>{x.note}</small>
                    </span>
                    <span className="choice-price">
                      {x.price ? `+${money(x.price)}` : "Included"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {frame.line === "optical" && (
            <label className="check reactive">
              <input
                type="checkbox"
                checked={reactive}
                onChange={(e) => setReactive(e.target.checked)}
              />
              <span>
                <strong>
                  {lightReactive.name} +{money(lightReactive.price)}
                </strong>
                <small>{lightReactive.short}</small>
              </span>
            </label>
          )}

          <div className="buy-row">
            <Qty
              value={qty}
              onChange={(n) => setQty(Math.max(1, n))}
              label="Quantity"
              min={1}
            />
            <button
              type="button"
              className="btn btn-wide"
              onClick={() => add()}
            >
              Add to bag · {money(unit * qty)}
            </button>
          </div>
          <button
            type="button"
            className="btn btn-quiet btn-wide"
            onClick={() => add("/checkout")}
          >
            Buy now
          </button>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View bag</Link>
              </>
            )}
          </p>
        </div>
      </div>

      <section className="product-detail">
        <div className="product-story">
          <h2>About {frame.name}</h2>
          <p>{frame.story}</p>
          <ul className="ticks">
            {frame.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h3>Suits</h3>
          <p className="suits">
            {frame.faces.map((id) => {
              const f = faces.find((x) => x.id === id)!;
              return (
                <Link key={id} to={`/face-shapes?face=${id}`} className="pill">
                  {f.name} faces
                </Link>
              );
            })}
          </p>
        </div>
        <div>
          <h2>Measurements</h2>
          <table className="spec-table">
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Lens</th>
                <th scope="col">Bridge</th>
                <th scope="col">Temple</th>
                <th scope="col">Width</th>
              </tr>
            </thead>
            <tbody>
              {frame.sizes.map((s) => (
                <tr key={s.label} aria-current={s === size || undefined}>
                  <th scope="row">{s.label}</th>
                  <td>{s.lens} mm</td>
                  <td>{s.bridge} mm</td>
                  <td>{s.temple} mm</td>
                  <td>{s.width} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="disclosures">
            {policies.map((p) => (
              <details key={p.title}>
                <summary>{p.title}</summary>
                <p>{p.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related">
          <div className="section-head">
            <h2>Also worth trying on</h2>
            <Link to="/frames" className="text-link">
              All frames <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="frame-grid">
            {related.map((f) => (
              <FrameCard key={f.id} frame={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
