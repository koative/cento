import { useMemo, useState, type PointerEvent } from "react";
import { ArrowRight, Navigation } from "lucide-react";
import { Link } from "../router";
import { lessons, spots, type LevelId } from "../content";
import {
  HOURS,
  bestHour,
  forecast,
  hourLabel,
  rate,
  ratingLabel,
  sizeWord,
  verdict,
} from "../lib/forecast";
import { isoDate } from "../lib/util";

const levels = lessons.filter(
  (l): l is typeof l & { level: LevelId } =>
    l.level !== null && l.id === l.level,
);

const W = 700;
const COL = W / HOURS.length;
const WAVE_TOP = 34;
const WAVE_BASE = 176;
const TIDE_TOP = 196;
const TIDE_BASE = 232;
const x = (i: number) => COL * i + COL / 2;

export function Forecast({
  level: initialLevel = "first-wave",
}: {
  level?: LevelId;
}) {
  const [spotId, setSpotId] = useState(
    spots.find((s) => s.bestFor === initialLevel)?.id ?? spots[0].id,
  );
  const [level, setLevel] = useState<LevelId>(initialLevel);
  const spot = spots.find((s) => s.id === spotId) ?? spots[0];
  const days = useMemo(() => forecast(spot), [spot]);
  const [dayIndex, setDayIndex] = useState(0);
  const day = days[dayIndex];
  const [hour, setHour] = useState(() => bestHour(days[0], level)?.hour ?? 9);
  const h = day.hours.find((x) => x.hour === hour) ?? day.hours[0];
  const lesson = levels.find((l) => l.level === level) ?? levels[0];
  const scale = Math.max(8, ...days.flatMap((d) => d.hours.map((x) => x.wave)));
  const i = HOURS.indexOf(h.hour);
  const rating = rate(h, level);
  const dayName = day.date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const tidePath = day.hours
    .map(
      (t, j) =>
        `${j ? "L" : "M"}${x(j).toFixed(1)} ${(TIDE_BASE - (t.tide / 6) * (TIDE_BASE - TIDE_TOP)).toFixed(1)}`,
    )
    .join(" ");

  function pickDay(n: number) {
    setDayIndex(n);
    const best = bestHour(days[n], level);
    if (best) setHour(best.hour);
  }

  function pickLevel(id: LevelId) {
    setLevel(id);
    const best = bestHour(day, id);
    if (best) setHour(best.hour);
  }

  function pointer(e: PointerEvent<SVGSVGElement>) {
    if (e.type === "pointermove" && e.buttons !== 1) return;
    const box = e.currentTarget.getBoundingClientRect();
    const col = Math.floor(((e.clientX - box.left) / box.width) * HOURS.length);
    setHour(HOURS[Math.min(HOURS.length - 1, Math.max(0, col))]);
  }

  return (
    <div className="fc">
      <div className="fc-controls">
        <fieldset className="pills">
          <legend>Spot</legend>
          {spots.map((s) => (
            <label key={s.id}>
              <input
                type="radio"
                name="fc-spot"
                value={s.id}
                checked={s.id === spotId}
                onChange={() => setSpotId(s.id)}
              />
              <span>{s.name}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className="pills">
          <legend>Your level</legend>
          {levels.map((l) => (
            <label key={l.id}>
              <input
                type="radio"
                name="fc-level"
                value={l.level}
                checked={l.level === level}
                onChange={() => pickLevel(l.level)}
              />
              <span>{l.name}</span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="fc-days" role="group" aria-label="Day">
        {days.map((d, n) => {
          const max = Math.max(...d.hours.map((x) => x.wave));
          const min = Math.min(...d.hours.map((x) => x.wave));
          const good = d.hours.filter((x) => rate(x, level) === "good").length;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={n === dayIndex}
              onClick={() => pickDay(n)}
              className="fc-day"
            >
              <span className="fc-day-name">
                {n === 0
                  ? "Today"
                  : d.date.toLocaleDateString("en-GB", { weekday: "short" })}
              </span>
              <span className="fc-day-date">
                {d.date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="fc-day-wave">
                {Math.floor(min)}–{Math.ceil(max)} ft
              </span>
              <span className="fc-strip" aria-hidden="true">
                {d.hours.map((x) => (
                  <i key={x.hour} data-r={rate(x, level)} />
                ))}
              </span>
              <span className="sr-only">, {good} good hours</span>
            </button>
          );
        })}
      </div>

      <div className="fc-body">
        <div className="fc-chart">
          <div className="fc-scroll">
            <svg
              viewBox={`0 0 ${W} 300`}
              role="img"
              aria-label={`${spot.name}, ${dayName}: waves ${Math.min(...day.hours.map((x) => x.wave))} to ${Math.max(...day.hours.map((x) => x.wave))} feet between 06:00 and 19:00`}
              onPointerDown={pointer}
              onPointerMove={pointer}
            >
              <rect
                className="fc-cursor"
                x={0}
                y={8}
                width={COL}
                height={286}
                rx={10}
                style={{ transform: `translateX(${i * COL}px)` }}
              />
              {[2, 4, 6, 8]
                .filter((f) => f <= scale)
                .map((f) => {
                  const y = WAVE_BASE - (f / scale) * (WAVE_BASE - WAVE_TOP);
                  return (
                    <g key={f} className="fc-grid">
                      <line x1={0} x2={W} y1={y} y2={y} />
                      <text x={4} y={y - 4}>
                        {f} ft
                      </text>
                    </g>
                  );
                })}
              {day.hours.map((t, j) => {
                const hgt = (t.wave / scale) * (WAVE_BASE - WAVE_TOP);
                return (
                  <g key={t.hour}>
                    <rect
                      className="fc-bar"
                      data-r={rate(t, level)}
                      x={x(j) - 15}
                      y={WAVE_TOP}
                      width={30}
                      height={WAVE_BASE - WAVE_TOP}
                      rx={7}
                      style={{
                        transform: `scaleY(${hgt / (WAVE_BASE - WAVE_TOP)})`,
                      }}
                    />
                    <text className="fc-val" x={x(j)} y={WAVE_BASE - hgt - 6}>
                      {t.wave}
                    </text>
                    <g
                      className="fc-wind"
                      data-off={t.offshore ? "" : undefined}
                      transform={`translate(${x(j)} 254)`}
                    >
                      <path
                        d="M0 -9 L5 5 L0 2 L-5 5 Z"
                        transform={`rotate(${t.windDeg + 180})`}
                      />
                    </g>
                    <text className="fc-mph" x={x(j)} y={276}>
                      {t.wind}
                    </text>
                    <text className="fc-hour" x={x(j)} y={294}>
                      {t.hour}
                    </text>
                  </g>
                );
              })}
              <path className="fc-tide" d={tidePath} />
              <text className="fc-lane" x={W - 4} y={TIDE_TOP - 4}>
                tide
              </text>
              <text className="fc-lane" x={W - 4} y={244}>
                wind mph
              </text>
            </svg>
          </div>
          <label className="fc-range">
            <span>Time of day</span>
            <input
              type="range"
              min={HOURS[0]}
              max={HOURS[HOURS.length - 1]}
              step={1}
              value={h.hour}
              aria-valuetext={`${hourLabel(h.hour)}, ${h.wave} feet, ${ratingLabel[rating]} for ${lesson.name}`}
              onChange={(e) => setHour(Number(e.target.value))}
            />
          </label>
          <p className="fc-legend" aria-hidden="true">
            <span data-r="good">Good</span>
            <span data-r="fair">Fair</span>
            <span data-r="poor">Poor</span>
            <span>for {lesson.name}</span>
            <span className="fc-legend-tide">Tide</span>
          </p>
        </div>

        <aside className="fc-readout" aria-live="polite">
          <p className="fc-when">
            {spot.name} · {dayName} ·{" "}
            <span className="num">{hourLabel(h.hour)}</span>
          </p>
          <p className="fc-big">
            <span className="num">{h.wave}</span>
            <small>ft</small>
          </p>
          <p className="fc-size">{sizeWord(h.wave)}</p>
          <dl className="fc-facts">
            <div>
              <dt>Period</dt>
              <dd className="num">{h.period} s</dd>
            </div>
            <div>
              <dt>Wind</dt>
              <dd>
                <Navigation
                  aria-hidden="true"
                  size={14}
                  style={{ transform: `rotate(${h.windDeg + 135}deg)` }}
                />
                <span className="num">{h.wind}</span> mph {h.windFrom}
                {h.offshore ? ", offshore" : ""}
              </dd>
            </div>
            <div>
              <dt>Tide</dt>
              <dd>
                <span className="num">{h.tide}</span> ft,{" "}
                {h.rising ? "rising" : "falling"}
              </dd>
            </div>
          </dl>
          <p className="fc-verdict" data-r={rating}>
            <strong>{ratingLabel[rating]}</strong>{" "}
            {verdict(h, level, lesson.name)}
          </p>
          <Link
            to={`/book?lesson=${lesson.id}&date=${isoDate(day.date)}&time=${hourLabel(h.hour)}`}
            className="btn btn-wax"
          >
            Book {lesson.name},{" "}
            {dayIndex === 0
              ? "today"
              : day.date.toLocaleDateString("en-GB", { weekday: "short" })}{" "}
            {hourLabel(h.hour)}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </aside>
      </div>
      <p className="quiet fc-note">
        Sample forecast generated for this demo. Always check a live forecast
        and the lifeguard flags before you paddle out.
      </p>
    </div>
  );
}
