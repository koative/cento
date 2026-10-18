import { useId } from "react";
import { Minus, Plus } from "lucide-react";
import { hubs, type QuoteMode } from "../content";
import { tariffs, price, type QuoteInput } from "../lib/quote";
import { eur, eurCents, num } from "../lib/format";
import { NetworkMap } from "./NetworkMap";

type Props = { q: QuoteInput; set: (q: QuoteInput) => void; compact?: boolean };

const modes = Object.keys(tariffs) as QuoteMode[];

export function QuoteCalculator({ q, set, compact }: Props) {
  const id = useId();
  const r = price(q);
  const patch = (p: Partial<QuoteInput>) => set({ ...q, ...p });
  const clampPallets = (n: number) =>
    Math.max(1, Math.min(33, Math.round(n) || 1));

  return (
    <div className={`quote ${compact ? "is-compact" : ""}`}>
      <div className="quote-inputs">
        <div className="quote-lane">
          <div className="field">
            <label htmlFor={`${id}-from`}>From hub</label>
            <select
              id={`${id}-from`}
              value={q.from}
              onChange={(e) => patch({ from: e.target.value })}
            >
              {hubs.map((h) => (
                <option key={h.code} value={h.code}>
                  {h.city} ({h.code})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="swap"
            onClick={() => patch({ from: q.to, to: q.from })}
            aria-label="Swap origin and destination"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M4 7h12l-3-3M16 13H4l3 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </button>
          <div className="field">
            <label htmlFor={`${id}-to`}>To hub</label>
            <select
              id={`${id}-to`}
              value={q.to}
              onChange={(e) => patch({ to: e.target.value })}
            >
              {hubs.map((h) => (
                <option key={h.code} value={h.code}>
                  {h.city} ({h.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="mode-picker">
          <legend>Service</legend>
          <div className="segmented">
            {modes.map((m) => (
              <label key={m}>
                <input
                  type="radio"
                  name={`${id}-mode`}
                  value={m}
                  checked={q.mode === m}
                  onChange={() => patch({ mode: m })}
                />
                <span>{tariffs[m].label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="quote-load">
          <div className="field">
            <label htmlFor={`${id}-pallets`}>Pallets</label>
            <div className="stepper">
              <button
                type="button"
                onClick={() => patch({ pallets: clampPallets(q.pallets - 1) })}
                aria-label="One pallet fewer"
              >
                <Minus size={16} aria-hidden />
              </button>
              <input
                id={`${id}-pallets`}
                type="number"
                inputMode="numeric"
                min={1}
                max={33}
                value={q.pallets}
                onChange={(e) =>
                  patch({ pallets: clampPallets(Number(e.target.value)) })
                }
              />
              <button
                type="button"
                onClick={() => patch({ pallets: clampPallets(q.pallets + 1) })}
                aria-label="One pallet more"
              >
                <Plus size={16} aria-hidden />
              </button>
            </div>
          </div>
          <div className="field">
            <label htmlFor={`${id}-kg`}>Gross weight (kg)</label>
            <input
              id={`${id}-kg`}
              type="number"
              inputMode="numeric"
              min={1}
              step={10}
              value={q.weight || ""}
              onChange={(e) =>
                patch({ weight: Math.max(0, Number(e.target.value)) })
              }
            />
          </div>
        </div>

        {!compact && (
          <fieldset className="quote-options">
            <legend>Options</legend>
            <label className="check">
              <input
                type="checkbox"
                checked={q.tailLift}
                onChange={(e) => patch({ tailLift: e.target.checked })}
              />
              Tail-lift delivery <span className="num">+€45</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={q.saturday}
                onChange={(e) => patch({ saturday: e.target.checked })}
              />
              Saturday delivery <span className="num">+€120</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={q.adr}
                onChange={(e) => patch({ adr: e.target.checked })}
              />
              Dangerous goods <span className="num">+18%</span>
            </label>
            <div className="field">
              <label htmlFor={`${id}-value`}>
                Goods value for insurance (€, optional)
              </label>
              <input
                id={`${id}-value`}
                type="number"
                inputMode="numeric"
                min={0}
                step={100}
                value={q.value || ""}
                placeholder="0"
                onChange={(e) =>
                  patch({ value: Math.max(0, Number(e.target.value)) })
                }
              />
            </div>
          </fieldset>
        )}
      </div>

      <div className="rate-sheet" aria-live="polite">
        {r.ok ? (
          <>
            <p className="rate-total">
              <span className="rate-label">All-in rate</span>
              <span className="num">{eur(r.total)}</span>
            </p>
            <dl className="rate-facts">
              <div>
                <dt>Transit</dt>
                <dd className="num">
                  {r.days} {r.days === 1 ? "day" : "days"}
                </dd>
              </div>
              <div>
                <dt>Distance</dt>
                <dd className="num">{num(r.distance)} km</dd>
              </div>
              <div>
                <dt>CO₂e</dt>
                <dd className="num">{num(r.co2)} kg</dd>
              </div>
            </dl>
            {!compact && (
              <table className="rate-lines">
                <caption className="sr-only">Price breakdown</caption>
                <tbody>
                  {r.lines.map(([label, n]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td className="num">{eurCents(n)}</td>
                    </tr>
                  ))}
                  <tr className="rate-sum">
                    <th scope="row">Total excl. VAT</th>
                    <td className="num">{eurCents(r.total)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        ) : (
          <p className="rate-blocked">{r.reason}</p>
        )}
        {!compact && (
          <div className="rate-map">
            <NetworkMap
              route={[q.from, q.to]}
              share={r.ok ? 1 : 0}
              labels="route"
              label={`Lane from ${q.from} to ${q.to}`}
            />
          </div>
        )}
      </div>

      {!compact && <Alternatives q={q} set={set} />}
    </div>
  );
}

/** The same lane by every other service we run on it, so the slower, cleaner option is one click away. */
function Alternatives({
  q,
  set,
}: {
  q: QuoteInput;
  set: (q: QuoteInput) => void;
}) {
  const rows = modes.map((m) => ({ m, r: price({ ...q, mode: m }) }));
  return (
    <div className="alternatives">
      <h3>Same lane, other services</h3>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Rate</th>
              <th scope="col">Transit</th>
              <th scope="col">CO₂e</th>
              <th scope="col">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ m, r }) => (
              <tr key={m} aria-current={m === q.mode ? "true" : undefined}>
                <th scope="row">{tariffs[m].label}</th>
                {r.ok ? (
                  <>
                    <td className="num">{eur(r.total)}</td>
                    <td className="num">{r.days} d</td>
                    <td className="num">{num(r.co2)} kg</td>
                  </>
                ) : (
                  <td colSpan={3} className="muted">
                    Not available on this lane
                  </td>
                )}
                <td>
                  {m === q.mode ? (
                    <span className="muted">Selected</span>
                  ) : (
                    r.ok && (
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => set({ ...q, mode: m })}
                      >
                        Use {tariffs[m].label.toLowerCase()}
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
