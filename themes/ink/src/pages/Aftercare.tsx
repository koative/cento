import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Link } from "../router";
import { aftercare, images } from "../content";
import { stageFor } from "../lib/ink";

const MAX_DAYS = 45;
const DAY = 86_400_000;

export function Aftercare() {
  const [days, setDays] = useState(5);
  const current = stageFor(days);
  const stage = aftercare.stages[current];

  const fromDate = (value: string) => {
    if (!value) return;
    const [y, m, d] = value.split("-").map(Number);
    const today = new Date();
    const diff = Math.round(
      (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
        Date.UTC(y, m - 1, d)) /
        DAY,
    );
    setDays(Math.min(MAX_DAYS, Math.max(0, diff)));
  };

  return (
    <div className="page">
      <header className="page-head wrap page-head-media">
        <div>
          <h1>{aftercare.title}</h1>
          <p className="lede">{aftercare.intro}</p>
        </div>
        <img
          src={images.fineLine.src}
          alt={images.fineLine.alt}
          width={images.fineLine.w}
          height={images.fineLine.h}
        />
      </header>

      <section className="wrap clock" aria-labelledby="clock-title">
        <div className="clock-head">
          <h2 id="clock-title">Healing clock</h2>
          <p>
            Move the dial to the number of days since your session, or pick the
            date you were tattooed.
          </p>
        </div>
        <div className="clock-controls">
          <div className="control">
            <label htmlFor="clock-days">
              Days since your session{" "}
              <output htmlFor="clock-days">
                {days === MAX_DAYS ? `${MAX_DAYS}+` : days}
              </output>
            </label>
            <input
              id="clock-days"
              type="range"
              min={0}
              max={MAX_DAYS}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label htmlFor="clock-date">Session date</label>
            <input
              id="clock-date"
              type="date"
              onChange={(e) => fromDate(e.target.value)}
            />
          </div>
        </div>

        <ol className="stage-track" aria-label="Healing stages">
          {aftercare.stages.map((s, i) => (
            <li
              key={s.title}
              data-state={i < current ? "past" : i === current ? "now" : "next"}
              aria-current={i === current ? "step" : undefined}
            >
              <button type="button" onClick={() => setDays(s.from)}>
                <span className="stage-days">
                  {s.to === Infinity
                    ? `Day ${s.from}+`
                    : s.from === s.to
                      ? `Day ${s.from}`
                      : `Days ${s.from}–${s.to}`}
                </span>
                <span className="stage-name">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="stage-card" aria-live="polite" key={current}>
          <h3>
            Day {days === MAX_DAYS ? `${MAX_DAYS}+` : days}: {stage.title}
          </h3>
          <p className="stage-looks">{stage.looks}</p>
          <ul>
            {stage.doThis.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section care-grid">
        <div>
          <h2>Avoid for now</h2>
          <ul className="rule-list">
            {aftercare.avoid.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>What goes home with you</h2>
          <dl className="spec">
            {aftercare.kit.map((k) => (
              <div key={k.item}>
                <dt>{k.item}</dt>
                <dd>{k.note}</dd>
              </div>
            ))}
          </dl>
          <div className="warning" role="note">
            <TriangleAlert aria-hidden="true" />
            <p>{aftercare.warning}</p>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <p className="aside-line">
          Healed patchy? Touch-ups are free within three months.{" "}
          <Link to="/book?type=touch-up">Request a touch-up</Link> or read the{" "}
          <Link to="/faq">studio policies</Link>.
        </p>
      </section>
    </div>
  );
}
