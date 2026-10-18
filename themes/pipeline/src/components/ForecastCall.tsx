import { forecastLabels, stages, type Deal, type Forecast } from "../content";
import { money, short } from "../lib/format";
import { isOpen, probability } from "../lib/store";

type Props = {
  deals: Deal[];
  quota: number;
  onChange: (id: string, forecast: Forecast) => void;
  /** Distinguishes radio groups when two sheets share a page. */
  name: string;
};

const calls = Object.keys(forecastLabels) as Forecast[];

/**
 * The weekly forecast call: each open deal is called commit, best case or omit.
 * The sheet totals the call, shows the gap to quota and sets it against the stage-weighted math.
 */
export function ForecastCall({ deals, quota, onChange, name }: Props) {
  const open = deals.filter(isOpen);
  const won = deals
    .filter((d) => d.stage === "won")
    .reduce((s, d) => s + d.value, 0);
  const sum = (f: Forecast) =>
    open.filter((d) => d.forecast === f).reduce((s, d) => s + d.value, 0);
  const commit = sum("commit");
  const best = sum("best");
  const call = won + commit;
  const weighted =
    won + open.reduce((s, d) => s + d.value * probability(d.stage), 0);
  const gap = quota - call;
  const scale = Math.max(quota, call + best, weighted) * 1.06;
  const pct = (n: number) => `${(n / scale) * 100}%`;

  const verdict =
    gap <= 0
      ? `${short(-gap)} over quota on commit alone.`
      : best >= gap
        ? `${short(gap)} short on commit. Best case covers it if ${short(gap)} of ${short(best)} lands.`
        : `${short(gap)} short, and best case only brings ${short(best)}. Find pipeline or call it short.`;
  const drift = call - weighted;

  return (
    <div className="sheet forecast">
      <div className="forecast-head">
        <div>
          <p className="forecast-label">The call</p>
          <p className="forecast-number">{money(call)}</p>
        </div>
        <p className="forecast-verdict" aria-live="polite">
          {verdict}{" "}
          <span>
            Stage-weighted math says {short(weighted)}
            {Math.abs(drift) > quota * 0.05
              ? drift > 0
                ? ", so this call is optimistic."
                : ", so this call may be sandbagged."
              : ", which agrees."}
          </span>
        </p>
      </div>

      <div
        className="forecast-bar"
        role="img"
        aria-label={`Won ${money(won)}, commit ${money(commit)}, best case ${money(best)} against a quota of ${money(quota)}`}
      >
        <span className="seg seg-won" style={{ width: pct(won) }} />
        <span className="seg seg-commit" style={{ width: pct(commit) }} />
        <span className="seg seg-best" style={{ width: pct(best) }} />
        <span className="marker marker-quota" style={{ left: pct(quota) }}>
          <span>Quota {short(quota)}</span>
        </span>
        <span
          className="marker marker-weighted"
          style={{ left: pct(weighted) }}
        >
          <span>Weighted {short(weighted)}</span>
        </span>
      </div>
      <ul className="forecast-key">
        <li>
          <i className="seg-won" /> Won {short(won)}
        </li>
        <li>
          <i className="seg-commit" /> Commit {short(commit)}
        </li>
        <li>
          <i className="seg-best" /> Best case {short(best)}
        </li>
      </ul>

      <ul className="forecast-rows">
        {open.map((d) => (
          <li key={d.id} className="forecast-row" data-call={d.forecast}>
            <div className="forecast-deal">
              <strong>{d.company}</strong>
              <span>
                {d.title} · {stages.find((s) => s.id === d.stage)?.label}
              </span>
            </div>
            <span className="num forecast-value">{money(d.value)}</span>
            <fieldset className="segmented">
              <legend className="sr-only">Call for {d.company}</legend>
              {calls.map((f) => (
                <label key={f}>
                  <input
                    type="radio"
                    name={`${name}-${d.id}`}
                    value={f}
                    checked={d.forecast === f}
                    onChange={() => onChange(d.id, f)}
                  />
                  <span>{forecastLabels[f]}</span>
                </label>
              ))}
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}
