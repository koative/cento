import { useState } from "react";
import { ArrowRightLeft, Shuffle, Trash2 } from "lucide-react";
import { Link } from "../router";
import { beers, families, flightRules, type Beer } from "../content";
import { beerColor, money, pourOrder } from "../lib/util";
import { Glass } from "./Art";

const onTap = beers
  .filter((b) => b.tap !== null)
  .sort((a, b) => a.tap! - b.tap!);

/** One of each family, the way a bartender would build a sampler. */
function sampler() {
  const shuffled = [...onTap].sort(() => Math.random() - 0.5);
  const picks = families
    .map((f) => shuffled.find((b) => b.family === f.id))
    .filter((b): b is Beer => !!b);
  return picks
    .sort(() => Math.random() - 0.5)
    .slice(0, flightRules.size)
    .map((b) => b.slug);
}

export function FlightBuilder({ id }: { id: string }) {
  const [slots, setSlots] = useState<string[]>(["tannery-pils", "low-water"]);
  const [say, setSay] = useState("");
  const picked = slots.map((s) => beers.find((b) => b.slug === s)!);
  const full = slots.length >= flightRules.size;
  const ordered = pourOrder(picked);
  const inOrder = ordered.every((b, i) => b.slug === slots[i]);

  const toggle = (b: Beer) => {
    if (slots.includes(b.slug)) {
      setSlots(slots.filter((s) => s !== b.slug));
      setSay(
        `${b.name} taken off the paddle. ${slots.length - 1} of ${flightRules.size} glasses filled.`,
      );
    } else if (full) {
      setSay(
        `The paddle holds ${flightRules.size}. Take a glass off before adding ${b.name}.`,
      );
    } else {
      setSlots([...slots, b.slug]);
      setSay(`${b.name} poured into glass ${slots.length + 1}.`);
    }
  };

  const arrange = () => {
    setSlots(ordered.map((b) => b.slug));
    setSay(
      `Paddle arranged in pour order: ${ordered.map((b) => b.name).join(", ")}.`,
    );
  };

  const pick = () => {
    const next = sampler();
    setSlots(next);
    setSay(
      `Bartender's pick: ${next.map((s) => beers.find((b) => b.slug === s)!.name).join(", ")}.`,
    );
  };

  const clear = () => {
    setSlots([]);
    setSay("Paddle cleared.");
  };

  const avgAbv = picked.length
    ? picked.reduce((n, b) => n + b.abv, 0) / picked.length
    : 0;

  return (
    <div className="flight">
      <div className="flight-paddle-wrap">
        <ol className="paddle" aria-label="Your paddle, left to right">
          {Array.from({ length: flightRules.size }, (_, i) => {
            const b = picked[i];
            return (
              <li key={b ? b.slug : `empty-${i}`} className="paddle-slot">
                {b ? (
                  <button
                    type="button"
                    className="paddle-glass"
                    onClick={() => toggle(b)}
                    aria-label={`Glass ${i + 1}: ${b.name}, tap ${b.tap}. Remove`}
                  >
                    <Glass
                      shape="stange"
                      color={beerColor(b)}
                      id={`${id}-slot-${b.slug}`}
                      className="glass glass-taster"
                    />
                    <span className="paddle-tap tnum">{b.tap}</span>
                    <span className="paddle-name">{b.name}</span>
                  </button>
                ) : (
                  <div className="paddle-glass is-empty">
                    <Glass
                      shape="stange"
                      id={`${id}-empty-${i}`}
                      className="glass glass-taster"
                    />
                    <span className="paddle-name">Glass {i + 1}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="paddle-board" aria-hidden="true" />

        <dl className="flight-facts">
          <div>
            <dt>Paddle</dt>
            <dd className="tnum">
              {slots.length} of {flightRules.size} · {money(flightRules.price)}
            </dd>
          </div>
          <div>
            <dt>Average ABV</dt>
            <dd className="tnum">
              {picked.length ? `${avgAbv.toFixed(1)}%` : "—"}
            </dd>
          </div>
          <div>
            <dt>Ask the bar for</dt>
            <dd className="tnum">
              {picked.length
                ? `Taps ${ordered.map((b) => b.tap).join(" · ")}`
                : "Pick a beer"}
            </dd>
          </div>
        </dl>

        <div className="flight-actions">
          <button
            type="button"
            className="btn btn-copper"
            disabled={picked.length < 2 || inOrder}
            onClick={arrange}
          >
            <ArrowRightLeft aria-hidden="true" />
            {inOrder && picked.length > 1 ? "In pour order" : "Set pour order"}
          </button>
          <button type="button" className="btn btn-line" onClick={pick}>
            <Shuffle aria-hidden="true" />
            Bartender's pick
          </button>
          <button
            type="button"
            className="btn btn-quiet"
            disabled={!slots.length}
            onClick={clear}
          >
            <Trash2 aria-hidden="true" />
            Clear
          </button>
        </div>
        <p className="flight-say" aria-live="polite">
          {say}
        </p>
      </div>

      <div className="flight-taps">
        <p className="flight-note">{flightRules.note}</p>
        <ul className="tap-chips" aria-label="On tap now">
          {onTap.map((b) => {
            const on = slots.includes(b.slug);
            return (
              <li key={b.slug}>
                <button
                  type="button"
                  className="tap-chip"
                  aria-pressed={on}
                  aria-disabled={!on && full ? true : undefined}
                  onClick={() => toggle(b)}
                >
                  <span className="tap-no tnum">{b.tap}</span>
                  <span
                    className="tap-swatch"
                    style={{ background: beerColor(b) }}
                    aria-hidden="true"
                  />
                  <span className="tap-chip-name">{b.name}</span>
                  <span className="tap-chip-meta tnum">
                    {b.style} · {b.abv.toFixed(1)}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="flight-more">
          Want the full story first?{" "}
          <Link to="/beers">Read every brew sheet</Link>.
        </p>
      </div>
    </div>
  );
}
