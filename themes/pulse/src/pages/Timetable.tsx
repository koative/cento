import { useState } from "react";
import { Copy, TriangleAlert, X } from "lucide-react";
import { Link } from "../router";
import { days, stages, type DayId } from "../content";
import {
  clashAdvice,
  clashesWith,
  clearDay,
  overlap,
  picked,
  planText,
  plan,
  stageOf,
  togglePick,
  usePlan,
} from "../lib/schedule";
import { DayTabs } from "../components/DayTabs";
import { TimetableGrid } from "../components/TimetableGrid";

export function Timetable() {
  const slugs = usePlan();
  const [day, setDay] = useState<DayId>("fri");
  const [status, setStatus] = useState("");
  const mine = picked(slugs);
  const today = mine.filter((a) => a.day === day);
  const label = (d: DayId) => days.find((x) => x.id === d)!.long;
  const clashes = today.flatMap((a, i) =>
    today
      .slice(i + 1)
      .filter((b) => overlap(a, b) > 0)
      .map((b) => clashAdvice(a, b)),
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(planText(slugs, label));
      setStatus("Copied. Paste it into the group chat.");
    } catch {
      setStatus(
        "Your browser blocked the clipboard. Allow it for this site and try again, or take a screenshot.",
      );
    }
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Timetable builder</h1>
        <p>
          Every set, every stage, on one grid. Tap a set to add it to your
          weekend; when two picks overlap they turn into a clash and we tell you
          how far you'd have to walk. Your timetable stays on this device.
        </p>
        <ul className="legend" aria-label="Stages">
          {stages.map((s) => (
            <li key={s.id} data-stage={s.id}>
              {s.name}
            </li>
          ))}
        </ul>
      </header>

      <section className="wrap section-tight" aria-label="Timetable">
        <DayTabs
          day={day}
          onChange={setDay}
          panel="tt-panel"
          note={(d) => {
            const n = mine.filter((a) => a.day === d).length;
            return n
              ? `${n} ${n === 1 ? "pick" : "picks"}`
              : days.find((x) => x.id === d)!.hours;
          }}
        />
        <div id="tt-panel" role="tabpanel" aria-labelledby={`tab-${day}`}>
          <TimetableGrid day={day} />
        </div>
      </section>

      <section className="wrap plan" aria-labelledby="plan-title">
        <div className="plan-head">
          <h2 id="plan-title">Your {label(day).split(" ")[0]}</h2>
          <div className="plan-actions">
            <button
              type="button"
              className="btn btn-line"
              onClick={copy}
              disabled={!mine.length}
            >
              <Copy aria-hidden="true" /> Copy my weekend
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => clearDay(day)}
              disabled={!today.length}
            >
              Clear {days.find((x) => x.id === day)!.short}
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => plan.set([])}
              disabled={!mine.length}
            >
              Clear all
            </button>
          </div>
        </div>
        <p className="plan-status" aria-live="polite">
          {status}
        </p>

        <div aria-live="polite" className="plan-clashes">
          {clashes.map((c) => (
            <p key={c}>
              <TriangleAlert aria-hidden="true" /> {c}
            </p>
          ))}
        </div>

        {today.length ? (
          <ol className="plan-list">
            {today.map((a) => (
              <li
                key={a.slug}
                data-stage={a.stage}
                data-clash={clashesWith(a, slugs).length ? "" : undefined}
              >
                <span className="num plan-time">
                  {a.start}–{a.end}
                </span>
                <Link to={`/lineup/${a.slug}`}>{a.name}</Link>
                <span className="stage-tag">{stageOf(a).name}</span>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => togglePick(a.slug)}
                  aria-label={`Remove ${a.name}`}
                >
                  <X aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty">
            Nothing picked for {label(day)} yet. Tap any set on the grid, or
            browse the <Link to="/lineup">lineup</Link> first.
          </p>
        )}

        {mine.length > 0 && (
          <p className="plan-total">
            {mine.length} {mine.length === 1 ? "set" : "sets"} across the
            weekend ·{" "}
            {days
              .map(
                (d) =>
                  [d.short, mine.filter((a) => a.day === d.id).length] as const,
              )
              .filter(([, n]) => n)
              .map(([d, n]) => `${d} ${n}`)
              .join(" · ")}
          </p>
        )}
      </section>
    </>
  );
}
