import type { Colorway, MerchKind } from "../content";

/* Flat product drawings for the merch shop, recoloured live by the chosen colourway. */

function PattyMark({
  x,
  y,
  r,
  c,
}: {
  x: number;
  y: number;
  r: number;
  c: Colorway;
}) {
  const s = r / 32;
  return (
    <g transform={`translate(${x - r} ${y - r}) scale(${s})`}>
      <circle cx="32" cy="32" r="31" fill={c.ink} />
      <path d="M11 25 Q13 11 32 10 Q51 11 53 25 Z" fill={c.fill} />
      <path
        d="M7 30 L12 27 L16 30 L21 27 L25 30 L30 27 L34 30 L39 27 L43 30 L48 27 L52 30 L57 28 V37 L52 39 L48 36 L43 39 L39 36 L34 39 L30 36 L25 39 L21 36 L16 39 L12 36 L7 38 Z"
        fill={c.fill}
      />
      <path d="M11 42 H53 Q51 53 32 53 Q13 53 11 42 Z" fill={c.fill} />
    </g>
  );
}

const word = (x: number, y: number, size: number, fill: string) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontSize={size}
    fill={fill}
    className="art-word"
  >
    SMASH
  </text>
);

const shade = "rgba(0,0,0,.14)";

function drawing(kind: MerchKind, c: Colorway) {
  switch (kind) {
    case "tee":
      return (
        <>
          <path
            d="M140 70 Q200 96 260 70 L338 104 L314 170 L282 158 V336 H118 V158 L86 170 L62 104 Z"
            fill={c.fill}
          />
          <path
            d="M140 70 Q200 112 260 70"
            stroke={shade}
            strokeWidth="8"
            fill="none"
          />
          {word(200, 214, 44, c.ink)}
        </>
      );
    case "hoodie":
      return (
        <>
          <path
            d="M136 92 Q200 30 264 92 L340 122 L326 300 L292 300 L284 186 V340 H116 V186 L108 300 L74 300 L60 122 Z"
            fill={c.fill}
          />
          <path d="M150 96 Q200 60 250 96 Q200 140 150 96 Z" fill={shade} />
          <path d="M146 262 H254 L240 318 H160 Z" fill={shade} />
          <path
            d="M186 118 V170 M214 118 V170"
            stroke={c.ink}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {word(200, 226, 40, c.ink)}
        </>
      );
    case "cap":
      return (
        <>
          <path d="M96 236 Q96 112 210 112 Q312 112 316 236 Z" fill={c.fill} />
          <path
            d="M210 112 Q200 170 208 236"
            stroke={shade}
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M300 226 Q370 228 372 252 Q330 268 292 250 Z"
            fill={c.fill}
          />
          <path d="M96 236 H316 L300 250 H110 Z" fill={shade} />
          <PattyMark x={164} y={176} r={34} c={c} />
        </>
      );
    case "press":
      return (
        <>
          <ellipse cx="200" cy="268" rx="132" ry="40" fill="#2a2624" />
          <ellipse cx="200" cy="256" rx="132" ry="40" fill={c.fill} />
          <ellipse
            cx="200"
            cy="254"
            rx="112"
            ry="31"
            fill="none"
            stroke="#5a524c"
            strokeWidth="3"
          />
          <path
            d="M184 252 V186 M216 252 V186"
            stroke="#5a524c"
            strokeWidth="12"
          />
          <rect
            x="112"
            y="158"
            width="176"
            height="36"
            rx="18"
            fill="#9b6a3e"
          />
          <rect x="124" y="166" width="152" height="6" rx="3" fill="#b9874f" />
          <PattyMark x={200} y={258} r={16} c={c} />
        </>
      );
    case "spatula":
      return (
        <>
          <path d="M80 112 H220 L232 250 H92 Z" fill="#c9c4bd" />
          <path d="M92 250 H232 L234 260 H90 Z" fill="#a39d95" />
          <path
            d="M150 112 L170 76 L300 76"
            stroke="#a39d95"
            strokeWidth="10"
            fill="none"
            strokeLinejoin="round"
          />
          <rect x="250" y="62" width="110" height="28" rx="12" fill="#6b4529" />
          <circle cx="276" cy="76" r="4" fill="#d9d2c6" />
          <circle cx="330" cy="76" r="4" fill="#d9d2c6" />
          <PattyMark x={156} y={182} r={26} c={c} />
        </>
      );
    case "bottle":
      return (
        <>
          <path d="M190 40 H210 L216 82 H184 Z" fill={c.fill} />
          <rect x="168" y="80" width="64" height="30" rx="6" fill="#2a1b14" />
          <path
            d="M150 112 H250 Q268 112 268 134 V330 Q268 350 248 350 H152 Q132 350 132 330 V134 Q132 112 150 112 Z"
            fill={c.fill}
          />
          <rect x="138" y="168" width="124" height="128" rx="8" fill={c.ink} />
          {word(200, 226, 30, c.fill)}
          <text
            x="200"
            y="262"
            textAnchor="middle"
            fontSize="15"
            fill={c.fill}
            className="art-small"
          >
            SAUCE · 12 FL OZ
          </text>
        </>
      );
    case "tote":
      return (
        <>
          <path
            d="M150 128 Q150 46 200 46 Q250 46 250 128"
            stroke="#2a1b14"
            strokeWidth="10"
            fill="none"
          />
          <path d="M102 116 H298 L314 346 H86 Z" fill={c.fill} />
          <path d="M102 116 L118 142 H282 L298 116" fill={shade} />
          <path
            d="M102 116 L86 346 M298 116 L314 346"
            stroke={shade}
            strokeWidth="3"
          />
          {word(200, 258, 52, c.ink)}
        </>
      );
    case "pin":
      return (
        <>
          <circle cx="200" cy="200" r="118" fill="#d8b04c" />
          <circle cx="200" cy="200" r="106" fill={c.fill} />
          <PattyMark x={200} y={200} r={76} c={c} />
        </>
      );
  }
}

export function MerchArt({
  kind,
  color,
  label,
}: {
  kind: MerchKind;
  color: Colorway;
  label: string;
}) {
  return (
    <svg
      className="merch-art"
      viewBox="0 0 400 400"
      role="img"
      aria-label={label}
    >
      {drawing(kind, color)}
    </svg>
  );
}
