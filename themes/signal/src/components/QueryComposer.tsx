import { useState } from "react";
import { composer, dayLabels, events, wave } from "../content";
import { LineChart, type Series } from "./Charts";
import { Delta, num } from "./format";

/**
 * Signature interaction: a sentence of four choices that writes its own query
 * and redraws the chart, the way the real product's insight builder works.
 */
export function QueryComposer() {
  const [measure, setMeasure] = useState(composer.measures[0].id);
  const [eventId, setEventId] = useState(composer.events[3]);
  const [breakdown, setBreakdown] = useState(composer.breakdowns[1].id);
  const [days, setDays] = useState(composer.periods[1].days);

  const m = composer.measures.find((x) => x.id === measure)!;
  const ev = events.find((e) => e.id === eventId)!;
  const b = composer.breakdowns.find((x) => x.id === breakdown)!;
  const daily = measure === "unique" ? ev.users / 30 : ev.volume / 30;
  const seed =
    [...eventId].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 99991;
  const ratio = ev.volume / ev.users;

  const series: Series[] = b.segments.map((s, i) => {
    const values = wave(seed + i * 101 + days, days, daily * s.share);
    return {
      label: s.label,
      values:
        measure === "per_user"
          ? values.map(
              (v) => +((ratio * v) / (daily * s.share) + i * 0.08).toFixed(2),
            )
          : values,
    };
  });
  const format = (n: number) =>
    measure === "per_user" ? n.toFixed(2) : num.format(Math.round(n));
  const total = series.reduce(
    (a, s) => a + s.values.reduce((x, y) => x + y, 0),
    0,
  );
  const query = [
    m.fn,
    `  where event = "${eventId}"`,
    b.id === "none" ? null : `  by ${b.id}`,
    `  since -${days}d`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="composer" aria-labelledby="composer-title">
      <h2 id="composer-title" className="visually-hidden">
        Ask Signal a question
      </h2>
      <div className="composer-sentence">
        <span>Show</span>
        <label>
          <span className="visually-hidden">Measure</span>
          <select value={measure} onChange={(e) => setMeasure(e.target.value)}>
            {composer.measures.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label.toLowerCase()}
              </option>
            ))}
          </select>
        </label>
        <span>for</span>
        <label>
          <span className="visually-hidden">Event</span>
          <select
            className="mono"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          >
            {composer.events.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <span>by</span>
        <label>
          <span className="visually-hidden">Breakdown</span>
          <select
            value={breakdown}
            onChange={(e) => setBreakdown(e.target.value)}
          >
            {composer.breakdowns.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label.toLowerCase()}
              </option>
            ))}
          </select>
        </label>
        <span>over the</span>
        <label>
          <span className="visually-hidden">Period</span>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {composer.periods.map((x) => (
              <option key={x.days} value={x.days}>
                {x.label.toLowerCase()}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="composer-body">
        <div className="composer-chart">
          <p className="composer-total" aria-live="polite">
            <strong className="num">
              {measure === "per_user"
                ? format(total / series.length / days)
                : num.format(Math.round(total))}
            </strong>
            <span>
              {measure === "per_user"
                ? "events per user per day"
                : m.label.toLowerCase()}{" "}
              · last {days} days
            </span>
            <Delta value={ev.change} />
          </p>
          <LineChart
            label={`${m.label} for ${eventId}, daily`}
            series={series}
            labels={dayLabels(days)}
            format={format}
          />
        </div>
        <div className="composer-query">
          <p>The query you just wrote</p>
          <pre>
            <code>{query}</code>
          </pre>
          <p className="quiet-note">
            Sample data from the Fernway demo workspace. Every number is
            fictional.
          </p>
        </div>
      </div>
    </section>
  );
}
