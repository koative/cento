import { useEffect, useId, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Project } from "../content";
import { clock, lightPatch, seasons, sun } from "../lib/sun";

const K = 56; // svg units per metre
const SUN_R = 4.2; // distance of the drawn sun from the window, metres
const OUT = 4.8; // metres of ground drawn outside the facade
const START = 5;
const END = 21;

const X = (x: number) => x * K;
const Y = (y: number) => -y * K;
const m = (v: number) => v.toFixed(1) + " m";

export function LightStudy({ project }: { project: Project }) {
  const s = project.section;
  const id = useId();
  const [season, setSeason] =
    useState<(typeof seasons)[number]["id"]>("winter");
  const [hour, setHour] = useState(12);
  const [playing, setPlaying] = useState(false);
  const day = seasons.find((x) => x.id === season)!.day;

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 600; // one simulated hour per 0.6 s
      last = now;
      setHour((h) => (h + dt >= END ? START : h + dt));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const pos = sun(project.lat, day, hour);
  const patch = lightPatch(s, pos.profile);
  const beta = pos.profile ?? (Math.max(pos.altitude, -4) * Math.PI) / 180;
  // Rays are parallel: each one starts SUN_R metres out along the sun direction from where it enters the glazing.
  const out = (y: number): [number, number] => [
    -SUN_R * Math.cos(beta),
    y + SUN_R * Math.sin(beta),
  ];
  const [sunX, sunY] = out(patch ? (patch.top + s.sill) / 2 : s.sill);
  const up = pos.altitude > 0;
  const status = !up
    ? "The sun is below the horizon."
    : pos.profile === null
      ? `The sun is ${pos.azimuth < 0 ? "in the east" : "in the west"}, behind the facade.`
      : !patch
        ? "The overhang keeps direct sun out of the room."
        : patch.reach >= s.depth
          ? "Sun reaches the back wall."
          : `Sun reaches ${m(patch.reach)} into the room.`;

  const top = Math.max(s.ceiling + 0.9, s.sill + SUN_R + 0.5);
  const vb = [
    X(-OUT),
    Y(top),
    X(s.depth + 0.9) - X(-OUT),
    Y(-1.4) - Y(top),
  ].join(" ");

  return (
    <figure className="study">
      <div className="study-drawing">
        <svg viewBox={vb} role="img" aria-labelledby={id + "-cap"}>
          <line className="ground" x1={X(-OUT)} y1={0} x2={X(0)} y2={0} />
          {patch && (
            <polygon
              className="light"
              points={patch.poly.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}
            />
          )}
          {up && patch && (
            <g className="rays">
              {(
                [
                  [patch.top, patch.poly[1]],
                  [s.sill, patch.poly[patch.poly.length - 2]],
                ] as const
              ).map(([y, [x2, y2]]) => {
                const [x1, y1] = out(y);
                return (
                  <line key={y} x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} />
                );
              })}
            </g>
          )}
          {/* cut structure (poché) */}
          <g className="poche">
            <rect
              x={X(-0.3)}
              y={Y(0)}
              width={X(s.depth + 0.6)}
              height={0.35 * K}
            />
            <rect
              x={X(s.depth)}
              y={Y(s.ceiling)}
              width={0.3 * K}
              height={s.ceiling * K}
            />
            <rect
              x={X(-Math.max(s.overhang, 0.3))}
              y={Y(s.ceiling + 0.32)}
              width={X(s.depth + 0.3 + Math.max(s.overhang, 0.3))}
              height={0.32 * K}
            />
            {s.sill > 0 && (
              <rect
                x={X(-0.3)}
                y={Y(s.sill)}
                width={0.3 * K}
                height={s.sill * K}
              />
            )}
            {s.head < s.ceiling && (
              <rect
                x={X(-0.3)}
                y={Y(s.ceiling)}
                width={0.3 * K}
                height={(s.ceiling - s.head) * K}
              />
            )}
          </g>
          <g className="glass">
            <line x1={X(-0.19)} y1={Y(s.sill)} x2={X(-0.19)} y2={Y(s.head)} />
            <line x1={X(-0.11)} y1={Y(s.sill)} x2={X(-0.11)} y2={Y(s.head)} />
          </g>
          {/* reach dimension */}
          {patch && patch.floor > 0 && (
            <g className="dim">
              <line
                x1={X(0)}
                y1={Y(-0.75)}
                x2={X(Math.min(patch.reach, s.depth))}
                y2={Y(-0.75)}
              />
              <line x1={X(0)} y1={Y(-0.6)} x2={X(0)} y2={Y(-0.9)} />
              <line
                x1={X(Math.min(patch.reach, s.depth))}
                y1={Y(-0.6)}
                x2={X(Math.min(patch.reach, s.depth))}
                y2={Y(-0.9)}
              />
              <text x={X(Math.min(patch.reach, s.depth) / 2)} y={Y(-1.2)}>
                {m(Math.min(patch.reach, s.depth))}
              </text>
            </g>
          )}
          {up && (
            <circle className="sun" cx={X(sunX)} cy={Y(sunY)} r={0.24 * K} />
          )}
          <text className="label" x={X(-OUT) + 6} y={Y(-1.2)}>
            South
          </text>
          <text className="label end" x={X(s.depth + 0.85)} y={Y(-1.2)}>
            North
          </text>
        </svg>
      </div>

      <div className="study-panel">
        <fieldset className="segmented">
          <legend>Day of the year</legend>
          {seasons.map((x) => (
            <label key={x.id}>
              <input
                type="radio"
                name={id + "-season"}
                value={x.id}
                checked={season === x.id}
                onChange={() => setSeason(x.id)}
              />
              <span>{x.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="study-time">
          <label htmlFor={id + "-hour"}>
            Solar time <output htmlFor={id + "-hour"}>{clock(hour)}</output>
          </label>
          <div className="study-slider">
            <button
              type="button"
              className="icon-btn"
              aria-pressed={playing}
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause the day" : "Play the day"}
            >
              {playing ? (
                <Pause size={18} aria-hidden="true" />
              ) : (
                <Play size={18} aria-hidden="true" />
              )}
            </button>
            <input
              id={id + "-hour"}
              type="range"
              min={START}
              max={END}
              step={0.25}
              value={hour}
              aria-valuetext={`${clock(hour)}, sun ${Math.max(0, Math.round(pos.altitude))} degrees high`}
              onChange={(e) => {
                setPlaying(false);
                setHour(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <dl className="study-read">
          <div>
            <dt>Sun altitude</dt>
            <dd>{up ? Math.round(pos.altitude) + "°" : "—"}</dd>
          </div>
          <div>
            <dt>Sun on floor</dt>
            <dd>{patch ? m(patch.floor) : "—"}</dd>
          </div>
          <div>
            <dt>Overhang</dt>
            <dd>{s.overhang ? m(s.overhang) : "None"}</dd>
          </div>
        </dl>
        <p className="study-status">{status}</p>
      </div>

      <figcaption id={id + "-cap"}>
        {project.name}, {s.label.toLowerCase()}. Section at 1:50,{" "}
        {project.lat.toFixed(1)}° N, glazing facing south. {status}
      </figcaption>
    </figure>
  );
}
