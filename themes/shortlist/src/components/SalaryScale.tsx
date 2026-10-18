import { k, type Band } from "../lib/format";

/**
 * A ruler of base pay: the market's 10th–90th percentile as a thin bar, the middle half as a thick one,
 * the median as a tick, plus an optional advertised range and an optional offer marker.
 */
export function SalaryScale({
  band,
  advertised,
  offer,
  label,
}: {
  band: Band;
  advertised?: [number, number];
  offer?: number;
  label: string;
}) {
  const lo =
    Math.min(band.p10, advertised?.[0] ?? Infinity, offer ?? Infinity) * 0.92;
  const hi = Math.max(band.p90, advertised?.[1] ?? 0, offer ?? 0) * 1.06;
  const x = (v: number) => `${(((v - lo) / (hi - lo)) * 100).toFixed(2)}%`;
  const w = (a: number, b: number) =>
    `${(((b - a) / (hi - lo)) * 100).toFixed(2)}%`;
  const step = hi - lo > 120000 ? 20000 : hi - lo > 50000 ? 10000 : 5000;
  const ticks: number[] = [];
  // Labels too close to either end would hang off the ruler.
  for (let t = Math.ceil(lo / step) * step; t <= hi; t += step)
    if ((t - lo) / (hi - lo) > 0.07 && (hi - t) / (hi - lo) > 0.07)
      ticks.push(t);

  return (
    <figure className="scale" aria-label={label}>
      <div className="scale-track">
        <span
          className="scale-wide"
          style={{ left: x(band.p10), width: w(band.p10, band.p90) }}
        />
        <span
          className="scale-mid"
          style={{ left: x(band.p25), width: w(band.p25, band.p75) }}
        />
        <span className="scale-median" style={{ left: x(band.p50) }} />
        {advertised && (
          <span
            className="scale-advertised"
            style={{
              left: x(advertised[0]),
              width: w(advertised[0], advertised[1]),
            }}
          />
        )}
        {offer !== undefined && (
          <span className="scale-offer" style={{ left: x(offer) }}>
            <span className="scale-offer-label">{k(offer)}</span>
          </span>
        )}
      </div>
      <div className="scale-ticks" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ left: x(t) }}>
            {k(t)}
          </span>
        ))}
      </div>
      <figcaption className="scale-key">
        <span>
          <i className="key-wide" /> 10th–90th percentile {k(band.p10)}–
          {k(band.p90)}
        </span>
        <span>
          <i className="key-mid" /> Middle half {k(band.p25)}–{k(band.p75)}
        </span>
        <span>
          <i className="key-median" /> Median {k(band.p50)}
        </span>
        {advertised && (
          <span>
            <i className="key-advertised" /> This listing {k(advertised[0])}–
            {k(advertised[1])}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
