import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { Project } from "../content";
import { monthAt } from "../lib/format";
import {
  activePhases,
  milestone,
  phaseProgress,
  progressAt,
  totalWeeks,
  type Progress,
} from "../lib/programme";

/** The signature: scrub a project's programme week by week and watch the elevation drawing build. */
export function BuildSequence({ project }: { project: Project }) {
  const T = totalWeeks(project);
  const [week, setWeek] = useState(project.week ?? T);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (week >= T) return setPlaying(false);
    const id = setTimeout(() => setWeek((w) => Math.min(T, w + 1)), 110);
    return () => clearTimeout(id);
  }, [playing, week, T]);

  const status = milestone(project, week);
  const active = activePhases(project, week);
  const crew = active.reduce((sum, ph) => sum + ph.crew, 0);
  const month = monthAt(project.start, week);

  return (
    <div className="seq">
      <figure className="seq-drawing">
        <Elevation
          project={project}
          week={week}
          label={`${project.name}, week ${week}: ${status}`}
        />
        <figcaption className="title-block">
          <span>{project.name}</span>
          <span>Elevation, not to scale</span>
          <span className="num">
            Wk {String(week).padStart(3, "0")} / {T}
          </span>
        </figcaption>
      </figure>

      <div className="seq-panel">
        <p className="seq-status">{status}</p>
        <dl className="seq-stats">
          <div>
            <dt>Week</dt>
            <dd className="num">
              {week} <small>of {T}</small>
            </dd>
          </div>
          <div>
            <dt>Month</dt>
            <dd className="num">{month}</dd>
          </div>
          <div>
            <dt>Crew on site</dt>
            <dd className="num">{crew}</dd>
          </div>
        </dl>

        <div className="seq-controls">
          <button
            type="button"
            className="btn btn-signal seq-play"
            aria-pressed={playing}
            onClick={() => {
              if (!playing && week >= T) setWeek(0);
              setPlaying(!playing);
            }}
          >
            {playing ? (
              <Pause aria-hidden="true" size={18} />
            ) : (
              <Play aria-hidden="true" size={18} />
            )}
            {playing ? "Pause" : "Play programme"}
          </button>
          {project.week !== undefined && (
            <button
              type="button"
              className="btn btn-line-dark"
              disabled={week === project.week}
              onClick={() => {
                setPlaying(false);
                setWeek(project.week!);
              }}
            >
              <RotateCcw aria-hidden="true" size={16} /> Back to this week
            </button>
          )}
        </div>

        <label className="seq-range">
          <span>Programme week</span>
          <input
            type="range"
            min={0}
            max={T}
            step={1}
            value={week}
            aria-valuetext={`Week ${week} of ${T}, ${month}: ${status}`}
            onChange={(e) => {
              setPlaying(false);
              setWeek(Number(e.target.value));
            }}
          />
        </label>

        <ol className="gantt" aria-label="Programme phases">
          {project.phases.map((ph) => {
            const p = phaseProgress(ph, week);
            const state = p >= 1 ? "done" : p > 0 ? "active" : "upcoming";
            return (
              <li key={ph.name} data-state={state}>
                <span className="gantt-name">
                  {ph.name}
                  <span className="sr-only">
                    , weeks {ph.start} to {ph.end},{" "}
                    {state === "active"
                      ? `${Math.round(p * 100)}% complete`
                      : state}
                  </span>
                </span>
                <span className="gantt-track" aria-hidden="true">
                  <span
                    className="gantt-bar"
                    style={{
                      left: `${(ph.start / T) * 100}%`,
                      width: `${((ph.end - ph.start) / T) * 100}%`,
                    }}
                  >
                    <span
                      className="gantt-fill"
                      style={{ width: `${p * 100}%` }}
                    />
                  </span>
                  <span
                    className="gantt-now"
                    style={{ left: `${(week / T) * 100}%` }}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ drawing */

const G = 300; // ground line

function Elevation({
  project,
  week,
  label,
}: {
  project: Project;
  week: number;
  label: string;
}) {
  const pr = progressAt(project, week);
  return (
    <svg
      viewBox="0 0 720 360"
      className="elevation"
      role="img"
      aria-label={label}
    >
      {project.kind === "building" ? (
        <Building n={project.storeys} pr={pr} started={week > 0} />
      ) : (
        <Bridge spans={project.storeys} truss={!!project.truss} pr={pr} />
      )}
    </svg>
  );
}

function Ground() {
  const ticks = [];
  for (let x = 20; x < 700; x += 14)
    ticks.push(<line key={x} x1={x} y1={G + 12} x2={x + 10} y2={G + 2} />);
  return (
    <g className="e-ground">
      <line x1={20} y1={G} x2={700} y2={G} className="e-groundline" />
      {ticks}
      <text x={700} y={G - 22} textAnchor="end" className="e-text">
        GL ±0.00
      </text>
    </g>
  );
}

function Building({
  n,
  pr,
  started,
}: {
  n: number;
  pr: Progress;
  started: boolean;
}) {
  const fh = n <= 2 ? 46 : Math.min(26, 220 / n);
  const W = n <= 2 ? 500 : n <= 6 ? 380 : 230;
  const x0 = 320 - W / 2;
  const bays = Math.max(3, Math.round(W / 46));
  const bay = W / bays;
  const cols = Array.from({ length: bays + 1 }, (_, i) => x0 + i * bay);
  const floors = pr.frame * n;
  const full = Math.floor(floors);
  const clad = Math.min(full, Math.floor(pr.envelope * n));
  const lit = Math.floor(pr.fitout * n);
  const topY = G - Math.max(full, 1) * fh;
  const crane = pr.frame > 0 && pr.envelope < 1;
  const mx = x0 + W + 40;
  const craneTop = Math.min(G - 90, topY - 44);
  const dig = pr.enable > 0 || pr.sub > 0;

  return (
    <g>
      {/* substructure */}
      {dig && (
        <g>
          <rect
            x={x0 - 10}
            y={G}
            width={W + 20}
            height={30}
            className="e-dig"
          />
          <rect
            x={x0 - 10}
            y={G}
            width={W + 20}
            height={30 * pr.sub}
            className="e-slab"
            opacity={0.35 + pr.sub * 0.4}
          />
          {cols.map((x) => (
            <line
              key={x}
              x1={x}
              y1={G + 30}
              x2={x}
              y2={G + 30 + 26 * pr.sub}
              className="e-line"
            />
          ))}
        </g>
      )}

      <Ground />

      {/* frame */}
      {Array.from({ length: full }, (_, i) => {
        const y = G - (i + 1) * fh;
        return (
          <g key={i}>
            {i < clad && (
              <rect
                x={x0 + 2}
                y={y + 3}
                width={W - 4}
                height={fh - 3}
                className="e-clad"
              />
            )}
            {i < clad &&
              cols
                .slice(0, -1)
                .map((x) => (
                  <rect
                    key={x}
                    x={x + bay * 0.2}
                    y={y + 3 + fh * 0.22}
                    width={bay * 0.6}
                    height={Math.max(2, fh * 0.46)}
                    className={i < lit ? "e-lit" : "e-win"}
                  />
                ))}
            {cols.map((x) => (
              <line
                key={x}
                x1={x}
                y1={y + fh}
                x2={x}
                y2={y}
                className="e-line"
              />
            ))}
            <rect
              x={x0 - 4}
              y={y}
              width={W + 8}
              height={3}
              className="e-slabline"
            />
          </g>
        );
      })}

      {/* working floor: formwork in progress */}
      {floors > full && full < n && (
        <g className="e-working">
          {cols.map((x) => (
            <line
              key={x}
              x1={x}
              y1={G - full * fh}
              x2={x}
              y2={G - full * fh - fh * (floors - full)}
            />
          ))}
          <rect x={x0 - 4} y={G - (full + 1) * fh} width={W + 8} height={fh} />
        </g>
      )}

      {pr.envelope >= 1 && (
        <rect
          x={x0 + W * 0.58}
          y={G - n * fh - 14}
          width={W * 0.26}
          height={14}
          className="e-clad"
        />
      )}

      {/* level dimension */}
      {n >= 3 && full > 0 && (
        <g className="e-dim">
          <line x1={x0 - 26} y1={G} x2={x0 - 26} y2={G - full * fh} />
          <line
            x1={x0 - 32}
            y1={G - full * fh}
            x2={x0 - 20}
            y2={G - full * fh}
          />
          <text
            x={x0 - 36}
            y={G - full * fh + 4}
            textAnchor="end"
            className="e-text"
          >
            L{full}
          </text>
        </g>
      )}

      {/* tower crane, dismantled once the envelope is closed */}
      {crane && (
        <g className="e-crane">
          <rect x={mx - 5} y={craneTop} width={10} height={G - craneTop} />
          <path d={zigzag(mx - 5, mx + 5, craneTop, G)} />
          <line x1={x0 - 30} y1={craneTop} x2={mx + 70} y2={craneTop} />
          <line x1={x0 - 30} y1={craneTop + 6} x2={mx} y2={craneTop + 6} />
          <line x1={mx} y1={craneTop - 22} x2={x0 - 30} y2={craneTop} />
          <line x1={mx} y1={craneTop - 22} x2={mx + 70} y2={craneTop} />
          <rect
            x={mx + 52}
            y={craneTop}
            width={18}
            height={12}
            className="e-crane-fill"
          />
          <rect
            x={mx + 6}
            y={craneTop + 6}
            width={10}
            height={9}
            className="e-crane-fill"
          />
          <line
            x1={x0 + W * 0.42}
            y1={craneTop + 6}
            x2={x0 + W * 0.42}
            y2={topY - 18}
            className="e-hook"
          />
          <rect
            x={x0 + W * 0.42 - 9}
            y={topY - 18}
            width={18}
            height={6}
            className="e-crane-fill"
          />
        </g>
      )}

      {/* hoarding panels until handover */}
      {started &&
        pr.handover < 0.5 &&
        Array.from({ length: 15 }, (_, i) => 30 + i * 44).map((x) => (
          <rect
            key={x}
            x={x}
            y={G - 9}
            width={40}
            height={9}
            className="e-hoard"
          />
        ))}

      {/* landscape at handover */}
      {pr.handover > 0 &&
        [56, 108, 600, 652].map((x) => (
          <g key={x} className="e-tree" opacity={pr.handover}>
            <line x1={x} y1={G} x2={x} y2={G - 22 * pr.handover} />
            <circle
              cx={x}
              cy={G - 24 * pr.handover - 10}
              r={12 * pr.handover}
            />
          </g>
        ))}
    </g>
  );
}

function Bridge({
  spans,
  truss,
  pr,
}: {
  spans: number;
  truss: boolean;
  pr: Progress;
}) {
  const X1 = 70;
  const L = 580;
  const D = 176; // deck soffit level
  const bed = 300;
  const front = X1 + L * pr.frame;
  const piers = Array.from(
    { length: spans - 1 },
    (_, k) => X1 + (L * (k + 1)) / spans,
  );
  const pierH = (bed - D - 14) * pr.sub;
  const panels = spans * 6;
  const pw = L / panels;
  const top = D - 58;
  const members: [number, number, number, number][] = [];
  if (truss) {
    for (let i = 0; i < panels; i++) {
      const a = X1 + i * pw;
      members.push(
        [a, D, a + pw, D],
        [a, top, a + pw, top],
        i % 2 ? [a, top, a + pw, D] : [a, D, a + pw, top],
        [a, D, a, top],
      );
    }
    members.push([X1 + L, D, X1 + L, top]);
  }

  return (
    <g>
      <path
        d={`M20 ${D + 14} H${X1 + 10} L${X1 + 60} ${bed} H${X1 + L - 60} L${X1 + L - 10} ${D + 14} H700`}
        className="e-bank"
      />
      <line
        x1={X1 + 50}
        y1={bed - 34}
        x2={X1 + L - 50}
        y2={bed - 34}
        className="e-water"
      />
      <line
        x1={X1 + 70}
        y1={bed - 26}
        x2={X1 + L - 70}
        y2={bed - 26}
        className="e-water"
      />
      <text x={700} y={40} textAnchor="end" className="e-text">
        Deck +{truss ? "38.40" : "6.20"}
      </text>

      {/* abutments and piers */}
      <rect
        x={X1 - 14}
        y={D + 14}
        width={28}
        height={30 * Math.max(pr.sub, truss ? 1 : 0)}
        className="e-slab"
      />
      <rect
        x={X1 + L - 14}
        y={D + 14}
        width={28}
        height={30 * Math.max(pr.sub, truss ? 1 : 0)}
        className="e-slab"
      />
      {piers.map((x) => (
        <g key={x}>
          <rect
            x={x - 9}
            y={bed - (bed - D - 14)}
            width={18}
            height={bed - D - 14}
            className="e-dig"
          />
          <rect
            x={x - 9}
            y={bed - pierH}
            width={18}
            height={pierH}
            className="e-slab"
          />
        </g>
      ))}

      {truss ? (
        <>
          {members.map(([a, b, c, d], i) => (
            <line
              key={i}
              x1={a}
              y1={b}
              x2={c}
              y2={d}
              className={(a + c) / 2 <= front ? "e-line" : "e-old"}
            />
          ))}
          <rect x={X1} y={D} width={L} height={12} className="e-old-deck" />
          {pr.frame > 0 && pr.frame < 1 && (
            <rect
              x={front - 40}
              y={top - 14}
              width={80}
              height={D - top + 40}
              className="e-containment"
            />
          )}
        </>
      ) : (
        pr.frame > 0 && (
          <>
            {pr.frame < 1 &&
              Array.from(
                { length: Math.ceil((front - X1) / 22) },
                (_, i) => X1 + 11 + i * 22,
              ).map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1={D + 12}
                  x2={x}
                  y2={bed - 34}
                  className="e-falsework"
                />
              ))}
          </>
        )
      )}
      <rect
        x={X1}
        y={D}
        width={truss ? L * pr.envelope : front - X1}
        height={12}
        className="e-deck"
      />

      {/* parapets, then lighting at handover */}
      {Array.from(
        {
          length:
            Math.floor((L * pr.envelope) / 20) + (pr.envelope > 0 ? 1 : 0),
        },
        (_, i) => X1 + i * 20,
      ).map((x) => (
        <line key={x} x1={x} y1={D} x2={x} y2={D - 10} className="e-line" />
      ))}
      {pr.envelope > 0 && (
        <line
          x1={X1}
          y1={D - 10}
          x2={X1 + L * pr.envelope}
          y2={D - 10}
          className="e-line"
        />
      )}
      {pr.handover > 0 &&
        [X1 + 60, X1 + 200, X1 + 340, X1 + 480].map((x) => (
          <g key={x} className="e-lamp" opacity={pr.handover}>
            <line x1={x} y1={D} x2={x} y2={D - 34} />
            <circle cx={x} cy={D - 36} r={4} />
          </g>
        ))}
    </g>
  );
}

/** Lattice bracing for the crane mast. */
function zigzag(left: number, right: number, top: number, bottom: number) {
  let d = `M${left} ${bottom}`;
  for (let y = bottom, i = 0; y > top; y -= 10, i++)
    d += ` L${i % 2 ? left : right} ${Math.max(top, y - 10)}`;
  return d;
}
