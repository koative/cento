import { useId, type ReactNode } from "react";
import type { Art, Cut, Gem, Metal } from "../content";

/*
 * The drawing plate: every piece in the catalogue is rendered as a jeweller's
 * front-and-side drawing from its Art record, so a metal or stone change
 * redraws the piece instead of swapping a photograph.
 */

const METAL: Record<Metal, [string, string, string]> = {
  yellow: ["#f8e2a8", "#d4a756", "#7f5a1f"],
  rose: ["#f7d2bf", "#d0907a", "#86503d"],
  platinum: ["#f6f6f3", "#bec2c5", "#71767c"],
};

const GEM: Record<Gem, [string, string, string]> = {
  diamond: ["#ffffff", "#dbe4ea", "#8fa2ae"],
  sapphire: ["#8aa6f0", "#2c4cb0", "#0d1a52"],
  emerald: ["#86dcb0", "#1f7d52", "#08341f"],
  morganite: ["#fbe0d6", "#e6a996", "#a5604f"],
};

type Ids = {
  metal: string;
  metalSide: string;
  gem: string;
  gemDeep: string;
  gemTop: string;
  soft: string;
  facet: string;
};

const DIAMOND_FACET = "#6f8593";
const RINGS: Art["kind"][] = [
  "solitaire",
  "trilogy",
  "halo",
  "band",
  "eternity",
  "signet",
];

const CX = 200;

/** Point on an ellipse at angle a (radians, 0 = right, π/2 = bottom). */
const at = (rx: number, ry: number, cy: number, a: number) =>
  [CX + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;

function ellipse(cx: number, cy: number, rx: number, ry: number) {
  return `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z`;
}

/** Stone in side view, girdle centred on (x, gy), width w. */
function SideStone({
  x,
  gy,
  w,
  cut,
  ids,
}: {
  x: number;
  gy: number;
  w: number;
  cut: Cut;
  ids: Ids;
}) {
  const width = cut === "oval" || cut === "pear" ? w * 1.25 : w;
  const half = width / 2;
  const step = cut === "emerald";
  const crown = width * (step ? 0.13 : 0.18);
  const table = width * (step ? 0.34 : 0.27);
  const depth = width * (step ? 0.36 : 0.44);
  const crownPts =
    cut === "cushion"
      ? `${x - half},${gy} ${x - half * 0.86},${gy - crown * 0.62} ${x - table},${gy - crown} ${x + table},${gy - crown} ${x + half * 0.86},${gy - crown * 0.62} ${x + half},${gy}`
      : `${x - half},${gy} ${x - table},${gy - crown} ${x + table},${gy - crown} ${x + half},${gy}`;
  const pavilion = step
    ? `${x - half},${gy} ${x - half * 0.3},${gy + depth} ${x + half * 0.3},${gy + depth} ${x + half},${gy}`
    : `${x - half},${gy} ${x},${gy + depth} ${x + half},${gy}`;
  const facets = step
    ? [
        [x - half * 0.82, gy - crown * 0.5, x + half * 0.82, gy - crown * 0.5],
        [
          x - half * 0.77,
          gy + depth * 0.33,
          x + half * 0.77,
          gy + depth * 0.33,
        ],
        [
          x - half * 0.53,
          gy + depth * 0.66,
          x + half * 0.53,
          gy + depth * 0.66,
        ],
      ]
    : [
        [x - table, gy - crown, x - half * 0.55, gy],
        [x + table, gy - crown, x + half * 0.55, gy],
        [x, gy - crown, x - half * 0.3, gy],
        [x, gy - crown, x + half * 0.3, gy],
        [x - half * 0.55, gy, x, gy + depth],
        [x + half * 0.55, gy, x, gy + depth],
        [x - half * 0.2, gy, x, gy + depth],
        [x + half * 0.2, gy, x, gy + depth],
      ];
  return (
    <g className="plate-stone">
      <polygon points={pavilion} fill={`url(#${ids.gemDeep})`} />
      <polygon points={crownPts} fill={`url(#${ids.gem})`} />
      <g stroke={ids.facet} strokeOpacity="0.55" strokeWidth="0.9" fill="none">
        <line x1={x - half} y1={gy} x2={x + half} y2={gy} strokeOpacity="0.8" />
        {facets.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <path
        d={`M${x - table * 0.7} ${gy - crown + 2}h${table * 0.6}`}
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  );
}

/** Stone seen from above, centred on (x, y), radius r. */
export function TopStone({
  x,
  y,
  r,
  cut,
  ids,
}: {
  x: number;
  y: number;
  r: number;
  cut: Cut;
  ids: Pick<Ids, "gemTop" | "facet">;
}) {
  const fill = `url(#${ids.gemTop})`;
  const lines = {
    stroke: ids.facet,
    strokeOpacity: 0.55,
    strokeWidth: 0.9,
    fill: "none",
  } as const;
  if (cut === "emerald") {
    const w = r * 0.78;
    const h = r * 1.08;
    const octagon = (k: number) => {
      const a = w * k;
      const b = h * k;
      const c = r * 0.24 * k;
      return `${x - a + c},${y - b} ${x + a - c},${y - b} ${x + a},${y - b + c} ${x + a},${y + b - c} ${x + a - c},${y + b} ${x - a + c},${y + b} ${x - a},${y + b - c} ${x - a},${y - b + c}`;
    };
    return (
      <g className="plate-stone">
        <polygon points={octagon(1)} fill={fill} />
        <g {...lines}>
          <polygon points={octagon(0.78)} />
          <polygon points={octagon(0.56)} strokeOpacity="0.7" />
        </g>
      </g>
    );
  }
  const sx = cut === "oval" ? 0.74 : cut === "pear" ? 0.72 : 1;
  const sy = cut === "oval" || cut === "pear" ? 1.08 : 1;
  const table = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return [Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5] as const;
  });
  const rim = (a: number) => [Math.cos(a) * r, Math.sin(a) * r] as const;
  const outline =
    cut === "cushion" ? (
      <rect
        x={-r * 0.92}
        y={-r * 0.92}
        width={r * 1.84}
        height={r * 1.84}
        rx={r * 0.42}
        fill={fill}
      />
    ) : cut === "pear" ? (
      <path
        d={`M0 ${-r * 1.15}C${r * 0.55} ${-r * 0.5} ${r} ${-r * 0.1} ${r} ${r * 0.3}A${r} ${r * 0.85} 0 0 1 ${-r} ${r * 0.3}C${-r} ${-r * 0.1} ${-r * 0.55} ${-r * 0.5} 0 ${-r * 1.15}Z`}
        fill={fill}
      />
    ) : (
      <circle r={r} fill={fill} />
    );
  return (
    <g
      className="plate-stone"
      transform={`translate(${x} ${y}) scale(${sx} ${sy})`}
    >
      {outline}
      <g {...lines}>
        <polygon
          points={table.map((p) => p.join(",")).join(" ")}
          strokeOpacity="0.75"
        />
        {table.map(([tx, ty], i) => {
          const a = (i / 8) * Math.PI * 2;
          const [ox, oy] = rim(a);
          const [sx1, sy1] = rim(a + Math.PI / 8);
          return (
            <g key={i}>
              <line x1={tx} y1={ty} x2={ox * 0.94} y2={oy * 0.94} />
              <line x1={tx} y1={ty} x2={sx1 * 0.94} y2={sy1 * 0.94} />
            </g>
          );
        })}
      </g>
      <ellipse
        cx={-r * 0.3}
        cy={-r * 0.38}
        rx={r * 0.16}
        ry={r * 0.08}
        fill="#fff"
        opacity="0.8"
        transform={`rotate(-30 ${-r * 0.3} ${-r * 0.38})`}
      />
    </g>
  );
}

function Band({
  t,
  band = "court",
  ids,
  children,
}: {
  t: number;
  band?: Art["band"];
  ids: Ids;
  children?: ReactNode;
}) {
  const cy = 262;
  const rx = 122;
  const ry = 62;
  const irx = rx - t * 0.85;
  const iry = ry - t * 0.5;
  const icy = cy - t * 0.3;
  const front = `M${CX - rx} ${cy}A${rx} ${ry} 0 0 0 ${CX + rx} ${cy}L${CX + irx} ${icy}A${irx} ${iry} 0 0 1 ${CX - irx} ${icy}Z`;
  const mid = (k: number) => ({
    rx: rx - t * 0.85 * k,
    ry: ry - t * 0.5 * k,
    cy: cy - t * 0.3 * k,
  });
  const arc = (k: number, from: number, to: number) => {
    const m = mid(k);
    const [x1, y1] = at(m.rx, m.ry, m.cy, from);
    const [x2, y2] = at(m.rx, m.ry, m.cy, to);
    return `M${x1} ${y1}A${m.rx} ${m.ry} 0 0 0 ${x2} ${y2}`;
  };
  const beads = (k: number) =>
    Array.from({ length: 34 }, (_, i) => {
      const m = mid(k);
      return at(m.rx, m.ry, m.cy, Math.PI * (0.97 - (i / 33) * 0.94));
    });
  return (
    <g className="plate-band">
      <ellipse
        cx={CX}
        cy={cy + ry + 26}
        rx={rx * 0.9}
        ry="9"
        fill="#000"
        opacity="0.35"
        filter={`url(#${ids.soft})`}
      />
      <path
        d={ellipse(CX, cy, rx, ry) + ellipse(CX, icy, irx, iry)}
        fillRule="evenodd"
        fill={`url(#${ids.metalSide})`}
      />
      <path d={front} fill={`url(#${ids.metal})`} />
      {band === "knife" && (
        <path
          d={arc(0.5, Math.PI * 0.94, Math.PI * 0.06)}
          stroke="#fff"
          strokeOpacity="0.75"
          strokeWidth="1.4"
          fill="none"
        />
      )}
      {band === "milgrain" &&
        [0.08, 0.92].map((k) =>
          beads(k).map(([x, y], i) => (
            <circle
              key={`${k}-${i}`}
              cx={x}
              cy={y}
              r="1.5"
              fill="#fff"
              opacity="0.5"
            />
          )),
        )}
      {band === "court" && (
        <path
          d={arc(0.38, Math.PI * 0.86, Math.PI * 0.32)}
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {children}
    </g>
  );
}

/** Claw: a tapering line from the basket to the girdle with a rounded tip. */
function Claw({
  x1,
  y1,
  x2,
  y2,
  ids,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  ids: Ids;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={`url(#${ids.metal})`}
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <circle cx={x2} cy={y2} r="3.1" fill={`url(#${ids.metal})`} />
    </g>
  );
}

function Head({
  x,
  top,
  w,
  cut,
  ids,
  lift = 0,
}: {
  x: number;
  top: number;
  w: number;
  cut: Cut;
  ids: Ids;
  lift?: number;
}) {
  const width = cut === "oval" || cut === "pear" ? w * 1.25 : w;
  const depth = width * (cut === "emerald" ? 0.36 : 0.44);
  const gy = top - depth * 0.62 - lift;
  return (
    <g>
      <path
        d={`M${x - width * 0.22} ${top + 6}L${x - width * 0.32} ${gy + depth * 0.5}H${x + width * 0.32}L${x + width * 0.22} ${top + 6}Z`}
        fill={`url(#${ids.metalSide})`}
      />
      <SideStone x={x} gy={gy} w={w} cut={cut} ids={ids} />
      <Claw
        x1={x - width * 0.2}
        y1={top + 2}
        x2={x - width * 0.47}
        y2={gy - width * 0.07}
        ids={ids}
      />
      <Claw
        x1={x + width * 0.2}
        y1={top + 2}
        x2={x + width * 0.47}
        y2={gy - width * 0.07}
        ids={ids}
      />
    </g>
  );
}

export function Plate({
  art,
  metal,
  initials,
  className = "",
  title,
}: {
  art: Art;
  metal: Metal;
  initials?: string;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids: Ids = {
    metal: `m${uid}`,
    metalSide: `ms${uid}`,
    gem: `g${uid}`,
    gemDeep: `gd${uid}`,
    gemTop: `gt${uid}`,
    soft: `s${uid}`,
    facet: (art.gem ?? "diamond") === "diamond" ? DIAMOND_FACET : "#fff",
  };
  const [mh, mm, ml] = METAL[metal];
  const [gh, gm, gl] = GEM[art.gem ?? "diamond"];
  const cut = art.cut ?? "round";
  const w = 40 + 30 * Math.cbrt(art.carat ?? 1);
  const top = 262 - 62;

  let body: ReactNode;
  switch (art.kind) {
    case "solitaire":
      body = (
        <Band t={15} band={art.band} ids={ids}>
          <Head x={CX} top={top} w={w} cut={cut} ids={ids} />
        </Band>
      );
      break;
    case "trilogy": {
      const side = w * 0.6;
      const off = w * (cut === "oval" ? 0.95 : 0.8);
      body = (
        <Band t={16} band={art.band} ids={ids}>
          <Head x={CX - off} top={top + 4} w={side} cut={cut} ids={ids} />
          <Head x={CX + off} top={top + 4} w={side} cut={cut} ids={ids} />
          <Head x={CX} top={top} w={w} cut={cut} ids={ids} lift={4} />
        </Band>
      );
      break;
    }
    case "halo": {
      const width = cut === "oval" || cut === "pear" ? w * 1.25 : w;
      const gy = top - width * 0.44 * 0.62;
      const hx = width * 0.7;
      const hy = width * 0.18;
      const pave = (from: number, to: number) =>
        Array.from({ length: 10 }, (_, i) => {
          const a = from + ((to - from) * i) / 9;
          return (
            <circle
              key={i}
              cx={CX + hx * Math.cos(a)}
              cy={gy + 2 + hy * Math.sin(a)}
              r="3.4"
              fill={`url(#${ids.gemTop}d)`}
              stroke={mm}
              strokeWidth="1"
            />
          );
        });
      body = (
        <Band t={15} band={art.band} ids={ids}>
          <ellipse
            cx={CX}
            cy={gy + 2}
            rx={hx}
            ry={hy}
            fill="none"
            stroke={`url(#${ids.metalSide})`}
            strokeWidth="7"
          />
          <g>{pave(Math.PI * 1.05, Math.PI * 1.95)}</g>
          <Head x={CX} top={top} w={w} cut={cut} ids={ids} />
          <g>{pave(Math.PI * 0.05, Math.PI * 0.95)}</g>
        </Band>
      );
      break;
    }
    case "band":
      body = <Band t={22} band={art.band} ids={ids} />;
      break;
    case "eternity":
      body = (
        <Band t={18} ids={ids}>
          {Array.from({ length: 11 }, (_, i) => {
            const a = Math.PI * (0.9 - (i / 10) * 0.8);
            const [x, y] = at(
              122 - 18 * 0.85 * 0.5,
              62 - 18 * 0.5 * 0.5,
              262 - 18 * 0.3 * 0.5,
              a,
            );
            const r = 5.6 * (0.75 + 0.25 * Math.sin(a));
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={r + 1.6} fill={ml} />
                <TopStone x={x} y={y} r={r} cut="round" ids={ids} />
              </g>
            );
          })}
        </Band>
      );
      break;
    case "signet":
      body = (
        <Band t={20} ids={ids}>
          <ellipse
            cx={CX}
            cy={top + 6}
            rx="58"
            ry="24"
            fill={`url(#${ids.metalSide})`}
          />
          <ellipse
            cx={CX}
            cy={top - 2}
            rx="58"
            ry="24"
            fill={`url(#${ids.metal})`}
          />
          <ellipse
            cx={CX}
            cy={top - 2}
            rx="50"
            ry="19"
            fill="none"
            stroke={ml}
            strokeOpacity="0.45"
          />
          {initials ? (
            <text
              x={CX}
              y={top + 6}
              textAnchor="middle"
              className="plate-initials"
              fill={ml}
              fontSize={initials.length > 2 ? 30 : 36}
              transform={`translate(0 ${(top - 2) * 0.58}) scale(1 0.42)`}
            >
              {initials}
            </text>
          ) : (
            <path
              d={`M${CX - 30} ${top - 10}q30 -10 60 0`}
              stroke="#fff"
              strokeOpacity="0.6"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </Band>
      );
      break;
    case "studs":
      body = (
        <g>
          {[130, 270].map((x) => (
            <g key={x}>
              <ellipse
                cx={x + 6}
                cy={252}
                rx={w * 0.7}
                ry="7"
                fill="#000"
                opacity="0.35"
                filter={`url(#${ids.soft})`}
              />
              <circle
                cx={x}
                cy={200}
                r={w * 0.62}
                fill={`url(#${ids.metalSide})`}
              />
              <TopStone x={x} y={200} r={w * 0.55} cut={cut} ids={ids} />
              {[45, 135, 225, 315].map((deg) => (
                <circle
                  key={deg}
                  cx={x + Math.cos((deg * Math.PI) / 180) * w * 0.56}
                  cy={200 + Math.sin((deg * Math.PI) / 180) * w * 0.56}
                  r="4.4"
                  fill={`url(#${ids.metal})`}
                />
              ))}
            </g>
          ))}
        </g>
      );
      break;
    case "drops":
      body = (
        <g>
          {[138, 262].map((x) => (
            <g key={x}>
              <path
                d={`M${x} 136V104c0-30 34-34 38-8`}
                stroke={`url(#${ids.metal})`}
                strokeWidth="3.4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx={x} cy={148} r="11" fill={`url(#${ids.metal})`} />
              <TopStone
                x={x}
                y={148}
                r={7.5}
                cut="round"
                ids={{ gemTop: `${ids.gemTop}d`, facet: DIAMOND_FACET }}
              />
              <line
                x1={x}
                y1={160}
                x2={x}
                y2={178}
                stroke={`url(#${ids.metal})`}
                strokeWidth="3"
              />
              <g transform={`translate(0 ${10})`}>
                <TopStone
                  x={x}
                  y={232}
                  r={34}
                  cut={cut}
                  ids={{ gemTop: ids.gemTop + "b", facet: "transparent" }}
                />
                <TopStone x={x} y={232} r={30} cut={cut} ids={ids} />
              </g>
            </g>
          ))}
        </g>
      );
      break;
    case "loose":
      body = (
        <g>
          <ellipse
            cx={CX}
            cy={300}
            rx="90"
            ry="10"
            fill="#000"
            opacity="0.35"
            filter={`url(#${ids.soft})`}
          />
          <TopStone
            x={CX}
            y={175}
            r={58 + 22 * Math.cbrt(art.carat ?? 1)}
            cut={cut}
            ids={ids}
          />
        </g>
      );
      break;
    case "pendant":
      body = (
        <g>
          <path
            d="M40 30Q200 330 360 30"
            stroke={`url(#${ids.metal})`}
            strokeWidth="2.6"
            strokeDasharray="5 3"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x={CX - 7}
            y={170}
            width="14"
            height="24"
            rx="7"
            fill="none"
            stroke={`url(#${ids.metal})`}
            strokeWidth="4"
          />
          <circle cx={CX} cy={232} r={w * 0.72} fill={`url(#${ids.metal})`} />
          <TopStone x={CX} y={232} r={w * 0.6} cut={cut} ids={ids} />
        </g>
      );
      break;
  }

  return (
    <svg
      className={"plate " + className}
      viewBox={RINGS.includes(art.kind) ? "40 100 320 288" : "0 0 400 360"}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={ids.metal} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={mh} />
          <stop offset="0.45" stopColor={mm} />
          <stop offset="1" stopColor={ml} />
        </linearGradient>
        <linearGradient id={ids.metalSide} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={mm} />
          <stop offset="0.5" stopColor={ml} />
          <stop offset="1" stopColor={mm} />
        </linearGradient>
        <linearGradient id={ids.gem} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={gh} />
          <stop offset="1" stopColor={gm} />
        </linearGradient>
        <linearGradient id={ids.gemDeep} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={gm} />
          <stop offset="1" stopColor={gl} />
        </linearGradient>
        <radialGradient id={ids.gemTop} cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" stopColor={gh} />
          <stop offset="0.55" stopColor={gm} />
          <stop offset="1" stopColor={gl} />
        </radialGradient>
        <radialGradient id={ids.gemTop + "d"} cx="0.4" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#9fb0bb" />
        </radialGradient>
        <radialGradient id={ids.gemTop + "b"} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.8" stopColor={mm} />
          <stop offset="1" stopColor={ml} />
        </radialGradient>
        <filter id={ids.soft} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {body}
    </svg>
  );
}
