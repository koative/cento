import { useState } from "react";
import { FlipHorizontal2, RotateCcw, RotateCw } from "lucide-react";
import { navigate } from "../router";
import {
  artistById,
  placementById,
  rates,
  type Design,
  type Placement,
} from "../content";
import { estimate, hoursLabel, money } from "../lib/ink";
import { FlashArtGroup } from "./FlashArt";

const RULER = 14; // ruler margin in sheet units (1 unit = 1 mm)

export function StencilSizer({ design: d }: { design: Design }) {
  const options = d.placements
    .map(placementById)
    .filter((p): p is Placement => Boolean(p));
  const [size, setSize] = useState(d.minCm);
  const [placementId, setPlacementId] = useState(options[0].id);
  const [turn, setTurn] = useState(0);
  const [transfer, setTransfer] = useState(false);

  const placement = options.find((p) => p.id === placementId) ?? options[0];
  const span = Math.max(d.maxCm, ...options.map((p) => p.w)) + 4;
  const edge = RULER + span * 10;
  const total = edge + 8; // room for the last ruler label
  const c = RULER + span * 5;
  const k = (size * 10) / 200;
  const tooBig = size > placement.w;
  const { price, hours } = estimate(d, size);
  const claimed = d.availability === "claimed";
  const artist = artistById(d.artist);

  return (
    <section className="sizer" aria-labelledby="sizer-title">
      <div className="sizer-head">
        <h2 id="sizer-title">Stencil sizer</h2>
        <p>
          Scale the design against the usable area of a placement. Line weight
          stays the same at every size — that is why small pieces lose detail
          first.
        </p>
      </div>

      <div className="sizer-body">
        <figure className="stencil-sheet">
          <svg
            viewBox={`0 0 ${total} ${total}`}
            role="img"
            aria-label={`${d.name} at ${size} cm on the ${placement.label.toLowerCase()}`}
          >
            <rect
              className="sheet-bg"
              x={RULER}
              y={RULER}
              width={span * 10}
              height={span * 10}
            />
            {Array.from({ length: span + 1 }, (_, i) => {
              const p = RULER + i * 10;
              const major = i % 5 === 0;
              return (
                <g key={i} className={major ? "grid major" : "grid"}>
                  <line x1={p} y1={RULER} x2={p} y2={edge} />
                  <line x1={RULER} y1={p} x2={edge} y2={p} />
                  <line
                    className="tick"
                    x1={p}
                    y1={RULER - (major ? 8 : 4)}
                    x2={p}
                    y2={RULER}
                  />
                  <line
                    className="tick"
                    x1={RULER - (major ? 8 : 4)}
                    y1={p}
                    x2={RULER}
                    y2={p}
                  />
                  {major && i > 0 && (
                    <>
                      <text x={p} y={RULER - 9} textAnchor="middle">
                        {i}
                      </text>
                      <text x={RULER - 9} y={p + 3} textAnchor="middle">
                        {i}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
            <rect
              className="area"
              data-over={tooBig ? "" : undefined}
              x={c - placement.w * 5}
              y={c - placement.h * 5}
              width={placement.w * 10}
              height={placement.h * 10}
              rx={placement.h * 5}
            />
            <g
              className="stencil-art"
              style={{
                transform: `translate(${c}px, ${c}px) rotate(${turn}deg) scale(${transfer ? -k : k}, ${k}) translate(-100px, -100px)`,
              }}
            >
              <FlashArtGroup art={d.id} />
            </g>
          </svg>
          <figcaption>
            <span>{placement.label}</span> usable area {placement.w} ×{" "}
            {placement.h} cm · sheet {span} cm
          </figcaption>
        </figure>

        <div className="sizer-controls">
          <div className="control">
            <label htmlFor="sizer-size">
              Size across <output htmlFor="sizer-size">{size} cm</output>
            </label>
            <input
              id="sizer-size"
              type="range"
              min={d.minCm}
              max={d.maxCm}
              step={0.5}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
            <span className="range-ends" aria-hidden="true">
              <span>{d.minCm} cm</span>
              <span>{d.maxCm} cm</span>
            </span>
          </div>

          <fieldset className="control">
            <legend>Placement</legend>
            <div className="chips">
              {options.map((p) => (
                <label key={p.id} className="chip">
                  <input
                    type="radio"
                    name="sizer-placement"
                    value={p.id}
                    checked={p.id === placement.id}
                    onChange={() => setPlacementId(p.id)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
            <p className="control-note" aria-live="polite">
              {tooBig
                ? `At ${size} cm it runs past a flat ${placement.label.toLowerCase()} — it will wrap or need a smaller size.`
                : placement.note}
            </p>
          </fieldset>

          <div className="control control-row">
            <span className="control-label" id="turn-label">
              Angle <output>{turn}°</output>
            </span>
            <div
              className="tool-group"
              role="group"
              aria-labelledby="turn-label"
            >
              <button
                type="button"
                className="tool"
                onClick={() => setTurn((t) => t - 15)}
                aria-label="Rotate 15 degrees left"
              >
                <RotateCcw aria-hidden="true" />
              </button>
              <button
                type="button"
                className="tool"
                onClick={() => setTurn((t) => t + 15)}
                aria-label="Rotate 15 degrees right"
              >
                <RotateCw aria-hidden="true" />
              </button>
              <button
                type="button"
                className="tool tool-wide"
                aria-pressed={transfer}
                onClick={() => setTransfer((v) => !v)}
              >
                <FlipHorizontal2 aria-hidden="true" /> Transfer view
              </button>
            </div>
          </div>

          <dl className="estimate" aria-live="polite">
            <div>
              <dt>Estimate</dt>
              <dd>{claimed ? "—" : money(price)}</dd>
            </div>
            <div>
              <dt>Sit time, approx.</dt>
              <dd>{claimed ? "—" : hoursLabel(hours)}</dd>
            </div>
            <div>
              <dt>Deposit</dt>
              <dd>{money(rates.deposit)}</dd>
            </div>
          </dl>
          <p className="control-note">
            Illustrative estimate. {artist?.name.split(" ")[0]} confirms the
            price when you see the stencil.
          </p>

          {claimed ? (
            <button
              type="button"
              className="btn btn-red"
              onClick={() => navigate(`/book?type=custom&artist=${d.artist}`)}
            >
              Ask {artist?.name.split(" ")[0]} for a sibling design
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-red"
              onClick={() =>
                navigate(
                  `/book?design=${d.id}&size=${size}&placement=${placement.id}`,
                )
              }
            >
              Request {d.name} at {size} cm
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
