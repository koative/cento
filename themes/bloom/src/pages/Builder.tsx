import { useState } from "react";
import { Check, Minus, Plus, RotateCcw } from "lucide-react";
import { Link } from "../router";
import { builder, images, stems, wraps } from "../content";
import { Bouquet } from "../components/Bouquet";
import { addLine, money } from "../lib/cart";

const MESSAGE_MAX = 160;

export function Builder() {
  const [counts, setCounts] = useState<Record<string, number>>(
    builder.presets[0].counts,
  );
  const [wrapId, setWrapId] = useState(wraps[0].id);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const wrap = wraps.find((w) => w.id === wrapId)!;
  const total = Object.values(counts).reduce((s, n) => s + n, 0);
  const stemCost = stems.reduce(
    (s, st) => s + (counts[st.id] ?? 0) * st.price,
    0,
  );
  const price =
    Math.round((stemCost + wrap.price + builder.designFee) * 100) / 100;
  const chosen = stems.filter((s) => counts[s.id]);
  const recipe = chosen
    .map((s) => `${counts[s.id]} ${s.name.toLowerCase()}`)
    .join(", ");

  function change(id: string, delta: number) {
    setStatus(null);
    setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + delta) }));
  }

  function add() {
    if (total < builder.minStems) {
      setStatus({
        ok: false,
        text: `A hand-tie needs at least ${builder.minStems} stems to hold its spiral. Add ${builder.minStems - total} more.`,
      });
      return;
    }
    const detail = [
      recipe,
      wrap.label,
      message.trim() && `Card: “${message.trim()}”`,
    ]
      .filter(Boolean)
      .join(" · ");
    addLine({
      id: "custom-bouquet",
      kind: "custom",
      name: "Your hand-tied bouquet",
      detail,
      unit: price,
      qty: 1,
      to: "/builder",
    });
    setStatus({
      ok: true,
      text: `Your ${total}-stem bouquet is in your bag at ${money(price)}.`,
    });
  }

  return (
    <>
      <header className="page-head">
        <h1>Build a bouquet</h1>
        <p className="lead">
          Choose stems from this week's bench and we will spiral them by hand,
          exactly as drawn. The sketch is the view from above, the way we see it
          on the bench.
        </p>
      </header>

      <div className="builder">
        <div className="builder-stage">
          <Bouquet
            counts={counts}
            wrap={wrap.colour}
            label={
              total
                ? `Your bouquet from above: ${recipe}, in ${wrap.label.toLowerCase()}`
                : "An empty wrap, waiting for stems"
            }
          />
          <div className="stage-readout" aria-live="polite">
            <p className="stage-count">
              {total} {total === 1 ? "stem" : "stems"}
              <span> · {wrap.label}</span>
            </p>
            <p className="stage-price">{money(price)}</p>
          </div>
          <div className="meter" aria-hidden="true">
            <span
              style={{
                width: `${Math.min(100, (total / builder.maxStems) * 100)}%`,
              }}
              data-low={total < builder.minStems || undefined}
            />
          </div>
          <p className="fine">
            {builder.minStems}–{builder.maxStems} stems. Most of our bouquets
            use 18 to 24.
          </p>
        </div>

        <div className="builder-controls">
          <div
            className="preset-row"
            role="group"
            aria-label="Start from a recipe"
          >
            <span className="preset-label" aria-hidden="true">
              Start from
            </span>
            {builder.presets.map((p) => (
              <button
                key={p.label}
                type="button"
                className="chip"
                onClick={() => {
                  setCounts(p.counts);
                  setStatus(null);
                }}
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              className="chip chip-quiet"
              onClick={() => {
                setCounts({});
                setStatus(null);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" /> Clear the bench
            </button>
          </div>

          <h2 className="h3">The stems</h2>
          <ul className="stem-list">
            {stems.map((s) => {
              const n = counts[s.id] ?? 0;
              return (
                <li key={s.id} data-on={n > 0 || undefined}>
                  <span
                    className="dot dot-lg"
                    style={{
                      background: s.colour,
                      boxShadow: `inset 0 0 0 4px ${s.centre}33`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="stem-name">
                    <strong>{s.name}</strong>{" "}
                    <span className="variety">{s.variety}</span>
                    <span className="stem-from">
                      {s.from} · {money(s.price)} a stem
                    </span>
                  </div>
                  <div className="stepper" role="group" aria-label={s.name}>
                    <button
                      type="button"
                      onClick={() => change(s.id, -1)}
                      disabled={n === 0}
                      aria-label={`One less ${s.name.toLowerCase()}`}
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <output aria-label={`${n} ${s.name.toLowerCase()}`}>
                      {n}
                    </output>
                    <button
                      type="button"
                      onClick={() => change(s.id, 1)}
                      disabled={total >= builder.maxStems}
                      aria-label={`One more ${s.name.toLowerCase()}`}
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <fieldset className="wrap-set">
            <legend className="h3">The wrap</legend>
            <div className="wrap-grid">
              {wraps.map((w) => (
                <label key={w.id} className="wrap-option">
                  <input
                    type="radio"
                    name="wrap"
                    value={w.id}
                    checked={wrapId === w.id}
                    onChange={() => setWrapId(w.id)}
                  />
                  <span
                    className="wrap-chip"
                    style={{ background: w.colour }}
                    aria-hidden="true"
                  />
                  <span>{w.label}</span>
                  <span className="option-price">
                    {w.price ? "+" + money(w.price) : "Free"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="card">Card message (optional)</label>
            <textarea
              id="card"
              rows={3}
              maxLength={MESSAGE_MAX}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Thinking of you, just because."
              aria-describedby="card-count"
            />
            <p className="field-hint" id="card-count">
              Handwritten by us on a cotton-paper card.{" "}
              {MESSAGE_MAX - message.length} characters left.
            </p>
          </div>

          <dl className="sum">
            <div>
              <dt>Stems ({total})</dt>
              <dd>{money(Math.round(stemCost * 100) / 100)}</dd>
            </div>
            <div>
              <dt>{wrap.label}</dt>
              <dd>{wrap.price ? money(wrap.price) : "Free"}</dd>
            </div>
            <div>
              <dt>Conditioning &amp; tying</dt>
              <dd>{money(builder.designFee)}</dd>
            </div>
            <div className="sum-total">
              <dt>Your bouquet</dt>
              <dd>{money(price)}</dd>
            </div>
          </dl>

          <button type="button" className="btn btn-wide" onClick={add}>
            Add bouquet to bag
          </button>
          <div aria-live="polite" className="added">
            {status && (
              <p data-error={!status.ok || undefined}>
                {status.ok && <Check size={18} aria-hidden="true" />}{" "}
                {status.text}{" "}
                {status.ok && (
                  <>
                    <Link to="/checkout">Choose a delivery day</Link> or keep
                    building.
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="section split-note" aria-labelledby="spiral">
        <img
          src={images.workbench.src}
          alt={images.workbench.alt}
          width={images.workbench.w}
          height={images.workbench.h}
          loading="lazy"
        />
        <div>
          <h2 id="spiral">Why a spiral?</h2>
          <p>
            Every stem we add crosses the last at a slight angle while the bunch
            turns in the hand. It lets every stem reach water, keeps the heads
            from crushing each other, and means the bouquet stands on its own
            when you untie it.
          </p>
          <Link to="/journal/the-hand-tied-spiral" className="text-link">
            Read how we tie them
          </Link>
        </div>
      </section>
    </>
  );
}
