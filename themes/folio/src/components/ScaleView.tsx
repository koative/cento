import { useId, useState, type CSSProperties } from "react";
import type { Work } from "../content";
import { Artwork } from "./Artwork";

type Prop = "bench" | "sofa" | "door" | "none";
type Room = { label: string; w: number; h: number; prop: Prop };

const rooms: Record<string, Room> = {
  gallery: { label: "Gallery wall", w: 800, h: 460, prop: "bench" },
  living: { label: "Living room", w: 480, h: 260, prop: "sofa" },
  hallway: { label: "Hallway", w: 300, h: 245, prop: "door" },
  custom: { label: "Your wall", w: 400, h: 270, prop: "none" },
};

/** Furniture drawn at real size so the work reads at its true scale. */
const props: Record<
  Exclude<Prop, "none">,
  { w: number; h: number; path: string; name: string }
> = {
  bench: {
    w: 160,
    h: 45,
    name: "a 160 cm gallery bench",
    path: "M0 0h160v6H0zM12 6h5v39h-5zM143 6h5v39h-5z",
  },
  sofa: {
    w: 220,
    h: 85,
    name: "a 220 cm sofa",
    path: "M10 0h200v42H10zM0 30h24v45H0zM196 30h24v45h-24zM12 44h196v31H12zM18 75h6v10h-6zM196 75h6v10h-6z",
  },
  door: {
    w: 92,
    h: 212,
    name: "a standard 212 cm door",
    path: "M0 0h92v212H0zM8 8v204M84 8v204M8 8h76M72 112h6",
  },
};

const STAGE = 16 / 9;
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export function ScaleView({ work }: { work: Work }) {
  const uid = useId();
  const [roomKey, setRoomKey] = useState("gallery");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [centre, setCentre] = useState(150);
  // Raw strings so typing "150" is not clamped at "1"; the drawing uses the clamped numbers.
  const [custom, setCustom] = useState({ w: "400", h: "270" });
  const clamp = (v: string, min: number, max: number, fallback: number) =>
    Math.min(max, Math.max(min, Number(v) || fallback));

  const room =
    roomKey === "custom"
      ? {
          ...rooms.custom,
          w: clamp(custom.w, 100, 1500, 400),
          h: clamp(custom.h, 200, 800, 270),
        }
      : rooms[roomKey];
  const ratio = room.w / room.h;
  const wallStyle: CSSProperties =
    ratio > STAGE
      ? { width: "100%", height: pct(STAGE, ratio) }
      : { width: pct(ratio, STAGE), height: "100%" };

  const fits = work.h + 20 <= room.h && work.w + 20 <= room.w;
  const mid = Math.min(
    Math.max(centre, work.h / 2 + 10),
    room.h - work.h / 2 - 10,
  );
  const cx = room.prop === "door" ? room.w * 0.4 : room.w / 2;
  const prop = room.prop === "none" ? null : props[room.prop];
  const len = (cm: number) =>
    unit === "cm" ? `${Math.round(cm)} cm` : `${(cm / 2.54).toFixed(1)} in`;
  const share = Math.round((work.w / room.w) * 100);

  const workStyle: CSSProperties = {
    left: pct(cx - work.w / 2, room.w),
    bottom: pct(mid - work.h / 2, room.h),
    width: pct(work.w, room.w),
    height: pct(work.h, room.h),
  };

  // Ruler: every 50 cm labelled per metre, or every foot labelled per two feet.
  const step = unit === "cm" ? 50 : 30.48;
  const ticks: { at: number; label: string }[] = [];
  for (let i = 1; i * step < room.h; i++)
    ticks.push({
      at: i * step,
      label: i % 2 ? "" : unit === "cm" ? `${i * 50} cm` : `${i} ft`,
    });

  return (
    <div className="scale">
      <div className="scale-stage">
        <div className="scale-wall" style={wallStyle}>
          <ol className="scale-ruler" aria-hidden="true">
            {ticks.map((t) => (
              <li key={t.at} style={{ bottom: pct(t.at, room.h) }}>
                {t.label}
              </li>
            ))}
          </ol>
          {prop && (
            <svg
              className="scale-prop"
              viewBox={`0 0 ${prop.w} ${prop.h}`}
              aria-hidden="true"
              style={{
                left: pct(
                  room.prop === "door"
                    ? room.w - prop.w - 30
                    : room.w / 2 - prop.w / 2,
                  room.w,
                ),
                width: pct(prop.w, room.w),
                height: pct(prop.h, room.h),
              }}
            >
              <path d={prop.path} />
            </svg>
          )}
          <div
            className="scale-work"
            style={workStyle}
            data-fits={fits || undefined}
          >
            <Artwork art={work.art} w={work.w} h={work.h} />
            <span className="dim dim-w">{len(work.w)}</span>
            <span className="dim dim-h">{len(work.h)}</span>
          </div>
          <span
            className="scale-centre"
            style={{ bottom: pct(mid, room.h) }}
            aria-hidden="true"
          >
            <span>{len(mid)} to centre</span>
          </span>
        </div>
      </div>

      <div className="scale-controls">
        <fieldset className="segmented">
          <legend>Wall</legend>
          {Object.entries(rooms).map(([key, r]) => (
            <label key={key}>
              <input
                type="radio"
                name={uid + "room"}
                value={key}
                checked={roomKey === key}
                onChange={() => setRoomKey(key)}
              />
              <span>{r.label}</span>
            </label>
          ))}
        </fieldset>

        {roomKey === "custom" && (
          <div className="scale-custom">
            <label>
              Wall width (cm)
              <input
                type="number"
                min={100}
                max={1500}
                step={10}
                value={custom.w}
                onChange={(e) => setCustom({ ...custom, w: e.target.value })}
              />
            </label>
            <label>
              Ceiling height (cm)
              <input
                type="number"
                min={200}
                max={800}
                step={5}
                value={custom.h}
                onChange={(e) => setCustom({ ...custom, h: e.target.value })}
              />
            </label>
          </div>
        )}

        <label className="scale-range">
          <span>
            Centre height <output>{len(centre)}</output>
          </span>
          <input
            type="range"
            min={120}
            max={175}
            step={1}
            value={centre}
            onChange={(e) => setCentre(Number(e.target.value))}
          />
        </label>

        <fieldset className="segmented segmented-small">
          <legend>Units</legend>
          {(["cm", "in"] as const).map((u) => (
            <label key={u}>
              <input
                type="radio"
                name={uid + "unit"}
                value={u}
                checked={unit === u}
                onChange={() => setUnit(u)}
              />
              <span>{u}</span>
            </label>
          ))}
        </fieldset>

        <p className="scale-readout" aria-live="polite">
          {fits
            ? `${work.title} takes up ${share}% of the width of this ${room.w} cm wall${prop ? `, shown beside ${prop.name}` : ""}. Its centre hangs at ${len(mid)}.`
            : `${work.title} is too large for this wall: it needs at least ${len(work.h + 20)} of height and ${len(work.w + 20)} of width.`}
        </p>
      </div>
    </div>
  );
}
