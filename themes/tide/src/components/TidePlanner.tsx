import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { Pause, Play } from "lucide-react";
import type { Site, TideEvent } from "../content";
import {
  clock,
  exposed,
  heightAt,
  highMark,
  rising,
  turns,
  workWindow,
} from "../lib/tide";

const H = 230;
const PAD = { l: 40, r: 14, t: 34, b: 30 };
const PH = H - PAD.t - PAD.b;

// Phones get a narrower viewBox so the chart is taller and its labels stay readable.
const narrowQuery = window.matchMedia("(max-width: 700px)");
const onNarrowChange = (cb: () => void) => {
  narrowQuery.addEventListener("change", cb);
  return () => narrowQuery.removeEventListener("change", cb);
};

type Props = { event: TideEvent; site: Site; heading: string };

/** The day's tide curve, the work window around low water, and a beach section that floods as you scrub. */
export function TidePlanner({ event, site, heading }: Props) {
  const day = { site, highWater: event.highWater };
  const win = workWindow(day);
  const [t, setT] = useState(win.start);
  const [playing, setPlaying] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const narrow = useSyncExternalStore(
    onNarrowChange,
    () => narrowQuery.matches,
  );
  const W = narrow ? 400 : 720;
  const PW = W - PAD.l - PAD.r;

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      // One simulated day in eight seconds.
      setT((prev) => {
        const next = prev + ((now - last) / 8000) * 24;
        return next >= 24 ? 0 : next;
      });
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const top = highMark(site) + 0.4;
  const x = (h: number) => PAD.l + (h / 24) * PW;
  const y = (m: number) => PAD.t + (1 - m / top) * PH;

  const points = Array.from({ length: 97 }, (_, i) => i / 4).map(
    (h) => `${x(h).toFixed(1)},${y(heightAt(day, h)).toFixed(1)}`,
  );
  const curve = `M${points.join(" L")}`;
  const area = `${curve} L${x(24)},${y(0)} L${x(0)},${y(0)} Z`;

  const h = heightAt(day, t);
  const open = exposed(site, h);
  const up = rising(day, t);
  const inside = t >= win.start && t <= win.end;
  const status = inside
    ? `Inside the work window. ${Math.round(open)} m of shore is open; crews stay on the lower shore until ${clock(win.end)}.`
    : t < win.start && !up
      ? `Tide still falling. Crews meet at ${clock(win.start)}; ${Math.round(open)} m of shore is open now.`
      : t > win.end && t < win.end + 3
        ? "Flood tide. Everyone off the lower shore; strandline and dune work only."
        : `High water covers most of the beach. The next window opens at ${clock(win.start)}.`;

  const fromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const box = svg.current!.getBoundingClientRect();
    const h24 = ((((e.clientX - box.left) / box.width) * W - PAD.l) / PW) * 24;
    setPlaying(false);
    setT(Math.min(24, Math.max(0, h24)));
  };

  // Beach section: high-water mark at x 30, low water at x 330.
  const shoreX = 30 + ((highMark(site) - h) / site.range) * 300;
  const waterY = 30 + ((highMark(site) - h) / site.range) * 84;
  const rangeId = `tide-time-${event.id}`;

  return (
    <section className="planner" aria-labelledby={`${rangeId}-h`}>
      <div className="planner-head">
        <h2 id={`${rangeId}-h`}>{heading}</h2>
        <p>
          {site.name}, {site.position}. Spring range {site.range.toFixed(1)} m.
          Low water {clock(win.low)}; work window {clock(win.start)}–
          {clock(win.end)}.
        </p>
      </div>

      <svg
        ref={svg}
        className="planner-chart"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Tide curve for ${site.name}: ${turns(day)
          .map((tw) => `${tw.kind} water ${clock(tw.at)}`)
          .join(", ")}. Work window ${clock(win.start)} to ${clock(win.end)}.`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => e.buttons && fromPointer(e)}
      >
        {[0, 2, 4, 6]
          .filter((m) => m < top)
          .map((m) => (
            <g key={m} className="chart-grid">
              <line x1={PAD.l} x2={W - PAD.r} y1={y(m)} y2={y(m)} />
              <text x={PAD.l - 8} y={y(m) + 4} textAnchor="end">
                {m} m
              </text>
            </g>
          ))}
        {(narrow ? [0, 6, 12, 18, 24] : [0, 3, 6, 9, 12, 15, 18, 21, 24]).map(
          (hh) => (
            <text
              key={hh}
              className="chart-tick"
              x={x(hh)}
              y={H - 8}
              textAnchor="middle"
            >
              {String(hh).padStart(2, "0")}
            </text>
          ),
        )}
        <rect
          className="chart-window"
          x={x(win.start)}
          y={PAD.t - 22}
          width={x(win.end) - x(win.start)}
          height={PH + 22}
        />
        {!narrow && (
          <text
            className="chart-window-label"
            x={(x(win.start) + x(win.end)) / 2}
            y={PAD.t - 8}
            textAnchor="middle"
          >
            Work {clock(win.start)}–{clock(win.end)}
          </text>
        )}
        <path className="chart-water" d={area} />
        <path className="chart-curve" d={curve} />
        {turns(day).map((tw) => (
          <text
            key={tw.at}
            className="chart-turn"
            x={Math.min(Math.max(x(tw.at), PAD.l + 28), W - 30)}
            y={
              tw.kind === "high"
                ? y(heightAt(day, tw.at)) - 8
                : y(heightAt(day, tw.at)) + 18
            }
            textAnchor="middle"
          >
            {tw.kind === "high" ? "HW" : "LW"} {clock(tw.at)}
          </text>
        ))}
        <line
          className="chart-now"
          x1={x(t)}
          x2={x(t)}
          y1={PAD.t - 22}
          y2={y(0)}
        />
        <circle className="chart-dot" cx={x(t)} cy={y(h)} r="6" />
      </svg>

      <div className="planner-controls">
        <button
          type="button"
          className="btn btn-ghost planner-play"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {playing ? "Pause" : "Run the day"}
        </button>
        <label htmlFor={rangeId}>Time on the beach</label>
        <input
          id={rangeId}
          type="range"
          min={0}
          max={24}
          step={1 / 12}
          value={t}
          aria-valuetext={`${clock(t)}, ${h.toFixed(1)} metres, ${up ? "rising" : "falling"}`}
          onChange={(e) => {
            setPlaying(false);
            setT(Number(e.target.value));
          }}
        />
        <output htmlFor={rangeId} className="planner-clock">
          {clock(t)}
        </output>
      </div>

      <div className="planner-read" data-inside={inside ? "" : undefined}>
        <svg
          className="planner-section"
          viewBox="0 0 360 150"
          aria-hidden="true"
        >
          <rect
            className="section-sea"
            x="0"
            y="0"
            width="360"
            height="150"
            style={{ transform: `translateY(${waterY}px)` }}
          />
          <path
            className="section-sand"
            d="M0 24 L30 30 L330 114 L360 118 L360 150 L0 150 Z"
          />
          <line className="section-mark" x1="30" x2="30" y1="14" y2="30" />
          <text className="section-label" x="34" y="16">
            HW mark
          </text>
          <line className="section-mark" x1="330" x2="330" y1="100" y2="114" />
          <text className="section-label" x="326" y="96" textAnchor="end">
            LW mark
          </text>
          {open > 0 && (
            <g className="section-measure">
              <text
                x={Math.max(64, (30 + shoreX) / 2)}
                y="130"
                textAnchor="middle"
              >
                {Math.round(open)} m open
              </text>
              <line x1="30" x2={shoreX} y1="138" y2="138" />
              <line x1="30" x2="30" y1="132" y2="144" />
              <line x1={shoreX} x2={shoreX} y1="132" y2="144" />
            </g>
          )}
        </svg>
        <dl className="planner-facts">
          <div>
            <dt>Height</dt>
            <dd>{h.toFixed(1)} m</dd>
          </div>
          <div>
            <dt>Tide</dt>
            <dd>{up ? "Rising" : "Falling"}</dd>
          </div>
          <div>
            <dt>Shore open</dt>
            <dd>{Math.round(open)} m</dd>
          </div>
        </dl>
        <p className="planner-status">{status}</p>
      </div>
      <p className="planner-note">
        Predicted from a simplified harmonic model for planning. Crew leaders
        check the official tide table on the day.
      </p>
    </section>
  );
}
