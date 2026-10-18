import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import {
  circuits,
  problems,
  walls,
  type CircuitId,
  type Problem,
} from "../content";
import { Link } from "../router";
import { shortDate } from "../lib/format";
import { toggleTick, useTicks } from "../lib/ticks";
import { FloorPlan } from "../components/FloorPlan";
import { Tag } from "../components/Tag";
import { WallView } from "../components/WallView";

const styles = [...new Set(problems.flatMap((p) => p.styles))].sort();
const circuitOf = (p: Problem) => circuits.find((c) => c.id === p.circuit)!;

export function RouteMap() {
  const ticks = useTicks();
  const [wallId, setWallId] = useState(walls[0].id);
  const [picked, setPicked] = useState<CircuitId[]>([]);
  const [style, setStyle] = useState("");
  const [hideTicked, setHideTicked] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [step, setStep] = useState(0);
  const frame = useRef<HTMLDivElement>(null);

  const passes = (p: Problem) =>
    (!picked.length || picked.includes(p.circuit)) &&
    (!style || p.styles.includes(style)) &&
    !(hideTicked && ticks.includes(p.id));
  const visible = problems.filter(passes);
  const counts: Record<string, number> = {};
  for (const p of visible) counts[p.wall] = (counts[p.wall] ?? 0) + 1;

  const wall = walls.find((w) => w.id === wallId)!;
  const onWall = visible.filter((p) => p.wall === wallId);
  const selected = onWall.find((p) => p.id === selectedId) ?? onWall[0];
  const holdCount = selected ? selected.moves + 1 : 0;

  // Phones pan the wider wall drawing: keep the selected problem in view.
  useEffect(() => {
    const f = frame.current;
    if (!f || !selected || f.scrollWidth <= f.clientWidth) return;
    f.scrollLeft =
      ((selected.start + selected.finish) / 200) * f.scrollWidth -
      f.clientWidth / 2;
  }, [selected]);

  const select = (id: string) => {
    setSelectedId(id);
    setStep(0);
  };
  const pickWall = (id: string) => {
    setWallId(id);
    setSelectedId(undefined);
    setStep(0);
  };
  const toggleCircuit = (id: CircuitId) =>
    setPicked((cur) =>
      cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id],
    );
  const reset = () => {
    setPicked([]);
    setStyle("");
    setHideTicked(false);
  };
  const filtered = picked.length > 0 || style !== "" || hideTicked;

  return (
    <>
      <section className="page-head wrap">
        <h1>Route map</h1>
        <p className="lead">
          Every problem on the walls right now, drawn where it is. Pick a wall
          on the plan, filter by circuit or style, and step through a problem
          hold by hold before you pull on. Tick what you've sent; your list
          stays on this device.
        </p>
      </section>

      <section className="topo wrap" aria-label="Interactive route map">
        <div className="topo-main">
          <div className="wall-picker" role="group" aria-label="Walls">
            {walls.map((w) => (
              <button
                key={w.id}
                type="button"
                aria-pressed={w.id === wallId}
                onClick={() => pickWall(w.id)}
              >
                {w.name} <span>{counts[w.id] ?? 0}</span>
              </button>
            ))}
          </div>
          <div className="topo-wallhead">
            <h2>{wall.name}</h2>
            <dl className="meta-row">
              <div>
                <dt>Angle</dt>
                <dd>{wall.angle}</dd>
              </div>
              <div>
                <dt>Height</dt>
                <dd>{wall.height}</dd>
              </div>
              <div>
                <dt>Set</dt>
                <dd>{shortDate(wall.setDate)}</dd>
              </div>
              <div>
                <dt>Next reset</dt>
                <dd>{shortDate(wall.nextReset)}</dd>
              </div>
            </dl>
          </div>
          <div className="wall-frame" ref={frame}>
            <WallView
              wall={wall}
              problems={onWall}
              selected={selected}
              step={step}
              onSelect={select}
            />
          </div>
          <p className="topo-blurb">{wall.blurb}</p>

          {selected ? (
            <article className="problem-card" aria-labelledby="problem-name">
              <div className="problem-card-head">
                <Tag circuit={selected.circuit}>
                  {circuitOf(selected).label} · {selected.grade}
                </Tag>
                <h3 id="problem-name">{selected.name}</h3>
                <p className="problem-meta">
                  Set by {selected.setter} on {shortDate(wall.setDate)} ·{" "}
                  {selected.styles.join(", ")} · {selected.moves} moves
                </p>
              </div>
              <p className="problem-beta">{selected.beta}</p>
              <div className="stepper">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Previous hold"
                  disabled={step === 0}
                  onClick={() => setStep(step - 1)}
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <p aria-live="polite">
                  <strong>
                    Hold {step + 1} of {holdCount}
                  </strong>{" "}
                  {step === 0
                    ? "Start: both hands on the taped hold."
                    : step === holdCount - 1
                      ? "Top: match and hold it to finish."
                      : "Follow the line."}
                </p>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label="Next hold"
                  disabled={step === holdCount - 1}
                  onClick={() => setStep(step + 1)}
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className={`btn ${ticks.includes(selected.id) ? "btn-ink" : "btn-line"}`}
                aria-pressed={ticks.includes(selected.id)}
                onClick={() => toggleTick(selected.id)}
              >
                <Check aria-hidden="true" />{" "}
                {ticks.includes(selected.id)
                  ? "Sent — in your tick list"
                  : "Mark as sent"}
              </button>
            </article>
          ) : (
            <div className="problem-card empty">
              <h3>Nothing on {wall.name} matches</h3>
              <p>
                Try another circuit, or clear the filters to see every problem
                on this wall.
              </p>
              <button type="button" className="btn btn-line" onClick={reset}>
                <RotateCcw aria-hidden="true" /> Clear filters
              </button>
            </div>
          )}
        </div>

        <aside className="topo-side" aria-label="Walls, filters and problems">
          <h2 className="side-title">The hall</h2>
          <FloorPlan current={wallId} counts={counts} onPick={pickWall} />

          <fieldset className="filters">
            <legend>Filter problems</legend>
            <div className="chips" role="group" aria-label="Circuits">
              {circuits.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={picked.includes(c.id)}
                  onClick={() => toggleCircuit(c.id)}
                  style={{ "--dot": c.color } as CSSProperties}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="filter-row">
              <label className="select-label">
                Style
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="">Any style</option>
                  {styles.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={hideTicked}
                  onChange={(e) => setHideTicked(e.target.checked)}
                />{" "}
                Hide sent
              </label>
            </div>
            <p className="filter-status" aria-live="polite">
              {visible.length} of {problems.length} problems
              {filtered ? " match" : ""} · {onWall.length} on {wall.name}
              {filtered && (
                <button type="button" className="text-btn" onClick={reset}>
                  Clear
                </button>
              )}
            </p>
          </fieldset>

          <ul className="problem-list">
            {onWall.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={p.id === selected?.id}
                  onClick={() => {
                    select(p.id);
                    // On narrow screens the list sits below the wall: bring the drawing back into view.
                    if (
                      frame.current &&
                      frame.current.getBoundingClientRect().bottom < 0
                    )
                      frame.current.scrollIntoView({ block: "start" });
                  }}
                >
                  <Tag circuit={p.circuit}>{p.grade}</Tag>
                  <span className="pl-name">
                    {p.name}
                    <small>
                      {p.setter} · {p.styles.join(", ")}
                    </small>
                  </span>
                  {ticks.includes(p.id) && (
                    <Check aria-label="Sent" className="pl-tick" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="ticklist wrap" aria-labelledby="ticklist-title">
        <div className="ticklist-head">
          <h2 id="ticklist-title">Your tick list</h2>
          <p>
            {ticks.length} of {problems.length} problems sent on the current
            set. Lists clear themselves as walls are reset — that's the point.
          </p>
        </div>
        <ul className="circuit-bars">
          {circuits.map((c) => {
            const total = problems.filter((p) => p.circuit === c.id).length;
            const done = problems.filter(
              (p) => p.circuit === c.id && ticks.includes(p.id),
            ).length;
            return (
              <li key={c.id}>
                <Tag circuit={c.id}>{c.label}</Tag>
                <span className="bar" aria-hidden="true">
                  <span
                    style={{
                      width: `${(done / total) * 100}%`,
                      background: c.color,
                    }}
                  />
                </span>
                <span className="num">
                  {done}/{total}
                </span>
                <span className="circuit-range">{c.range}</span>
              </li>
            );
          })}
        </ul>
        <p className="ticklist-cta">
          New to the circuits?{" "}
          <Link to="/classes/first-moves">First Moves</Link> walks you through
          them in ninety minutes.
        </p>
      </section>
    </>
  );
}
