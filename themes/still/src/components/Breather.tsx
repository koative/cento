import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { patterns, breatheCopy, type BreathStep } from "../content";

const words = { in: "Breathe in", hold: "Hold", out: "Breathe out" };
const C = 200; // svg centre
const TRACK = 186;
const DISC = 150;
const MIN = 0.56; // disc scale with empty lungs

/** Where we are in the cycle after `ms`: step index, progress in that step, and how full the lungs are (0–1). */
function locate(steps: BreathStep[], ms: number) {
  const cycle = steps.reduce((a, s) => a + s.seconds * 1000, 0);
  let t = ms % cycle;
  let level = 0;
  for (let i = 0; i < steps.length; i++) {
    const d = steps[i].seconds * 1000;
    const to = steps[i].kind === "in" ? 1 : steps[i].kind === "out" ? 0 : level;
    if (t < d) {
      const p = t / d;
      const eased = (1 - Math.cos(Math.PI * p)) / 2;
      return {
        index: i,
        p,
        left: Math.ceil((d - t) / 1000),
        level: level + (to - level) * eased,
        round: Math.floor(ms / cycle) + 1,
      };
    }
    t -= d;
    level = to;
  }
  return { index: 0, p: 0, left: steps[0].seconds, level: 0, round: 1 };
}

function point(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;
}

function arc(r: number, from: number, to: number) {
  return `M ${point(r, from)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${point(r, to)}`;
}

type Status = "idle" | "running" | "paused" | "done";

export function Breather({ compact = false }: { compact?: boolean }) {
  const [patternId, setPatternId] = useState(patterns[0].id);
  const [minutes, setMinutes] = useState(compact ? 1 : 3);
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const origin = useRef(0);

  const pattern = patterns.find((p) => p.id === patternId)!;
  const total = minutes * 60_000;
  const cycle = pattern.steps.reduce((a, s) => a + s.seconds, 0);

  useEffect(() => {
    if (status !== "running") return;
    origin.current = performance.now() - elapsed;
    let frame = requestAnimationFrame(function tick(now) {
      const ms = now - origin.current;
      if (ms >= total) {
        setElapsed(total);
        setStatus("done");
        return;
      }
      setElapsed(ms);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
    // `elapsed` is read once on resume; depending on it would restart the loop every frame.
  }, [status, total]);

  const reset = (next?: { pattern?: string; minutes?: number }) => {
    if (next?.pattern) setPatternId(next.pattern);
    if (next?.minutes) setMinutes(next.minutes);
    setStatus("idle");
    setElapsed(0);
  };

  const live = status === "running" || status === "paused";
  const where = locate(pattern.steps, elapsed);
  const step = pattern.steps[where.index];
  const scale = live
    ? MIN + (1 - MIN) * where.level
    : status === "done"
      ? MIN
      : 0.78;
  const remaining = Math.max(0, Math.ceil((total - elapsed) / 1000));
  const clock = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;

  let angle = 0;
  const arcs = pattern.steps.map((s) => {
    const sweep = (s.seconds / cycle) * 360;
    const a = { kind: s.kind, from: angle + 1.6, to: angle + sweep - 1.6 };
    angle += sweep;
    return a;
  });
  const dot = live ? ((elapsed % (cycle * 1000)) / (cycle * 1000)) * 360 : 0;
  const active = arcs[where.index];

  return (
    <div
      className="breather"
      data-compact={compact ? "" : undefined}
      data-status={status}
    >
      <div className="breather-stage">
        <svg
          viewBox="0 0 400 400"
          className="breather-svg"
          role="img"
          aria-label={`${pattern.name} breathing: ${pattern.short}`}
        >
          <circle cx={C} cy={C} r={DISC} className="guide" />
          <circle cx={C} cy={C} r={DISC * MIN} className="guide" />
          <circle
            cx={C}
            cy={C}
            r={DISC}
            className="disc"
            style={{ transform: `scale(${scale.toFixed(4)})` }}
            data-kind={live ? step.kind : undefined}
          />
          {arcs.map((a, i) => (
            <path
              key={i}
              d={arc(TRACK, a.from, a.to)}
              className="track"
              data-kind={a.kind}
            />
          ))}
          {live && where.p > 0.01 && (
            <path
              d={arc(
                TRACK,
                active.from,
                active.from + (active.to - active.from) * where.p,
              )}
              className="track-done"
            />
          )}
          <circle
            cx={C}
            cy={C - TRACK}
            r="7"
            className="dot"
            style={{ transform: `rotate(${dot}deg)` }}
          />
        </svg>
        <div className="breather-read" aria-hidden="true">
          {live ? (
            <>
              <span className="breather-word">{words[step.kind]}</span>
              <span className="breather-count">{where.left}</span>
            </>
          ) : status === "done" ? (
            <>
              <span className="breather-word">That's it.</span>
              <span className="breather-sub">Notice how you feel.</span>
            </>
          ) : (
            <>
              <span className="breather-word">{pattern.name}</span>
              <span className="breather-sub">{pattern.short}</span>
            </>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {status === "running"
            ? words[step.kind]
            : status === "done"
              ? "Session complete."
              : ""}
        </p>
      </div>

      <div className="breather-panel">
        {!compact && (
          <>
            <fieldset className="chooser">
              <legend>Pattern</legend>
              {patterns.map((p) => (
                <label key={p.id} className="choice">
                  <input
                    type="radio"
                    name="pattern"
                    value={p.id}
                    checked={p.id === patternId}
                    onChange={() => reset({ pattern: p.id })}
                  />
                  <span className="choice-name">{p.name}</span>
                  <span className="choice-meta">{p.short}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="chooser chooser-row">
              <legend>Length</legend>
              {breatheCopy.durations.map((m) => (
                <label key={m} className="choice choice-small">
                  <input
                    type="radio"
                    name="minutes"
                    value={m}
                    checked={m === minutes}
                    onChange={() => reset({ minutes: m })}
                  />
                  <span className="choice-name">{m} min</span>
                </label>
              ))}
            </fieldset>
            <p className="breather-when">{pattern.when}</p>
          </>
        )}

        <div className="breather-controls">
          {status === "running" ? (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setStatus("paused")}
            >
              <Pause aria-hidden="true" size={16} /> Pause
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                if (status === "done") setElapsed(0);
                setStatus("running");
              }}
            >
              <Play aria-hidden="true" size={16} />{" "}
              {status === "paused"
                ? "Resume"
                : status === "done"
                  ? "Again"
                  : `Begin ${minutes} minute${minutes > 1 ? "s" : ""}`}
            </button>
          )}
          {status !== "idle" && (
            <button
              type="button"
              className="btn btn-ghost-light"
              onClick={() => reset()}
            >
              <RotateCcw aria-hidden="true" size={16} /> Reset
            </button>
          )}
          <p className="breather-meta" aria-live="off">
            <span>
              Round{" "}
              {status === "done"
                ? Math.ceil(total / (cycle * 1000))
                : where.round}
            </span>
            <span>{clock} left</span>
          </p>
        </div>
      </div>
    </div>
  );
}
