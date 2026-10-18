import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "../router";
import { findCraft, talent, zones, type Talent } from "../content";
import { BENCH_MAX, clearBench, toggleBench, useBench } from "../lib/bench";
import { hourLabel, money, utcLabel } from "../lib/util";
import { Overlap } from "../components/Overlap";
import { Availability } from "../components/Talent";

const SAMPLE = ["clara-moreau", "tomasz-wierzba", "hanna-lindqvist"];
const hourOptions = Array.from({ length: 24 }, (_, h) => h);

export function Bench() {
  const ids = useBench();
  const crew = ids
    .map((id) => talent.find((t) => t.id === id))
    .filter((t): t is Talent => !!t);
  const [zone, setZone] = useState(2);
  const [start, setStart] = useState(9);
  const [end, setEnd] = useState(17);
  const [days, setDays] = useState<Record<string, number>>({});

  const daysFor = (t: Talent) => days[t.id] ?? Math.min(t.days, 3);
  const setDaysFor = (t: Talent, n: number) =>
    setDays((d) => ({ ...d, [t.id]: Math.max(0, Math.min(t.days, n)) }));
  const weekly = crew.reduce((sum, t) => sum + t.rate * daysFor(t), 0);
  const viewer = zones[zone];
  const loadSample = () =>
    SAMPLE.filter((id) => !ids.includes(id)).forEach(toggleBench);

  return (
    <>
      <section className="page-head wrap">
        <h1>Your bench</h1>
        <p className="lede">
          Shortlist up to {BENCH_MAX} members, set your own working day, and see
          when the crew is awake together and what a week costs at their
          published rates.
        </p>
      </section>

      {crew.length === 0 ? (
        <section className="wrap empty bench-empty">
          <h2>Your bench is empty</h2>
          <p>
            Add members from their profiles or the register with the Bench
            button. Or load a sample crew to see how the planner works.
          </p>
          <div className="close-actions">
            <button type="button" className="btn btn-seal" onClick={loadSample}>
              Load a sample crew
            </button>
            <Link to="/talent" className="btn btn-line">
              Browse talent
            </Link>
          </div>
        </section>
      ) : (
        <div className="wrap bench">
          <section className="bench-planner" aria-labelledby="planner-h">
            <h2 id="planner-h" className="sr-only">
              Time-zone planner
            </h2>
            <div className="planner-controls">
              <div className="field">
                <label htmlFor="zone">You work from</label>
                <select
                  id="zone"
                  value={zone}
                  onChange={(e) => setZone(Number(e.target.value))}
                >
                  {zones.map((z, i) => (
                    <option key={z.label} value={i}>
                      {z.label} ({utcLabel(z.offset)})
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="start">Your day starts</label>
                <select
                  id="start"
                  value={start}
                  onChange={(e) =>
                    setStart(Math.min(Number(e.target.value), end - 1))
                  }
                >
                  {hourOptions.slice(5, 14).map((h) => (
                    <option key={h} value={h}>
                      {hourLabel(h)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="end">Your day ends</label>
                <select
                  id="end"
                  value={end}
                  onChange={(e) =>
                    setEnd(Math.max(Number(e.target.value), start + 1))
                  }
                >
                  {hourOptions.slice(13, 24).map((h) => (
                    <option key={h} value={h}>
                      {hourLabel(h)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div aria-live="polite">
              <Overlap
                crew={crew}
                viewer={viewer.offset}
                viewerHours={[start, end]}
                viewerLabel={viewer.label}
              />
            </div>
          </section>

          <section className="bench-crew" aria-labelledby="crew-h">
            <div className="section-head">
              <h2 id="crew-h">
                Crew of {crew.length}{" "}
                <span className="muted">/ {BENCH_MAX}</span>
              </h2>
              <button type="button" className="text-btn" onClick={clearBench}>
                Clear bench
              </button>
            </div>
            <ul className="crew">
              {crew.map((t) => {
                const n = daysFor(t);
                return (
                  <li key={t.id} className="crew-row">
                    <img src={t.photo} alt="" width={640} height={800} />
                    <div className="crew-who">
                      <Link to={`/talent/${t.id}`}>{t.name}</Link>
                      <span className="muted">
                        {findCraft(t.craft)?.name} · {money(t.rate)}/day
                      </span>
                      <Availability t={t} />
                    </div>
                    <div
                      className="stepper"
                      role="group"
                      aria-label={`Days a week with ${t.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => setDaysFor(t, n - 1)}
                        disabled={n <= 0}
                        aria-label={`One day fewer with ${t.name}`}
                      >
                        <Minus aria-hidden="true" />
                      </button>
                      <output aria-live="polite">
                        {n} {n === 1 ? "day" : "days"}
                      </output>
                      <button
                        type="button"
                        onClick={() => setDaysFor(t, n + 1)}
                        disabled={n >= t.days}
                        aria-label={`One day more with ${t.name}`}
                      >
                        <Plus aria-hidden="true" />
                      </button>
                    </div>
                    <span className="crew-cost num">{money(t.rate * n)}</span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => toggleBench(t.id)}
                      aria-label={`Remove ${t.name} from bench`}
                    >
                      <X aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="crew-total">
              <span>A week with this crew</span>
              <strong className="num" aria-live="polite">
                {money(weekly)}
              </strong>
            </div>
            <p className="quiet">
              Before the 5% client fee on the Open plan. Members who are booked
              show 0 days until they free up.
            </p>
            <Link
              to={`/post?invite=${ids.join(",")}`}
              className="btn btn-seal btn-lg"
            >
              Send a brief to this crew
            </Link>
          </section>
        </div>
      )}
    </>
  );
}
