import type { ReactNode } from "react";

/*
 * The burger, drawn as flat layers on a 320-wide canvas. Each layer is drawn
 * from its own top edge (y = 0) down to its height, then translated into place,
 * so adding a topping slides everything above it up instead of redrawing.
 */

type Layer = { h: number; draw: ReactNode };

/** A lacy, uneven outline like the edge of a smashed patty. Deterministic so renders match. */
function lacePath(seed: number, h: number) {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = 34; x <= 286; x += 11) {
    const j = (x * 7 + seed * 13) % 9;
    top.push(`L${x} ${(j % 4) - 1}`);
    bottom.unshift(`L${x + 3} ${h - 2 + (j % 3)}`);
  }
  return `M26 ${h / 2} ${top.join(" ")} L294 ${h / 2} ${bottom.join(" ")} Z`;
}

const patty = (fill: string, crust: string, seed: number) => (
  <>
    <path d={lacePath(seed, 20)} fill={fill} />
    <path
      d="M44 6 Q160 1 276 6"
      stroke={crust}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M60 13 Q160 9 262 13"
      stroke={crust}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity=".6"
    />
  </>
);

const cheese = (fill: string, dots?: string) => (
  <>
    <path
      d="M48 0 H272 L270 6 L254 6 L248 18 L240 6 H168 L160 22 L152 6 H86 L78 15 L70 6 H50 Z"
      fill={fill}
    />
    {dots &&
      [72, 118, 190, 236].map((x) => (
        <circle key={x} cx={x} cy="3" r="1.6" fill={dots} />
      ))}
  </>
);

const chicken = (fill: string, glaze?: string) => (
  <>
    <path
      d="M30 18 Q28 4 46 4 Q54 -2 66 4 Q80 -1 92 5 Q106 -2 120 4 Q136 -1 150 5 Q166 -2 180 4 Q196 -1 210 5 Q226 -2 240 4 Q256 -1 268 5 Q292 4 290 20 Q292 34 270 34 H50 Q28 34 30 18 Z"
      fill={fill}
    />
    <path
      d="M58 14 q8 -4 14 0 M108 12 q8 -4 14 0 M170 14 q8 -4 14 0 M226 12 q8 -4 14 0 M84 24 q8 -4 14 0 M196 24 q8 -4 14 0"
      stroke="#8a4c17"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {glaze && (
      <path
        d="M44 6 Q160 -2 276 6 L272 12 Q160 6 48 12 Z"
        fill={glaze}
        opacity=".85"
      />
    )}
  </>
);

const sauce = (fill: string) => (
  <path
    d="M52 0 H268 Q270 4 262 4 Q256 4 254 10 Q250 4 236 4 H120 Q108 4 104 12 Q100 4 90 4 H58 Q50 4 52 0 Z"
    fill={fill}
  />
);

const bunBottom = (fill: string, toast: string) => (
  <>
    <path
      d="M46 2 Q46 0 52 0 H268 Q274 0 274 2 L270 20 Q268 30 254 30 H66 Q52 30 50 20 Z"
      fill={fill}
    />
    <rect x="48" y="0" width="224" height="5" rx="2" fill={toast} />
  </>
);

const bunTop = (fill: string, shine: string, h: number, seeds = false) => (
  <>
    <path d={`M40 ${h} Q40 6 160 4 Q280 6 280 ${h} Z`} fill={fill} />
    <path d={`M42 ${h - 6} H278 V${h} H42 Z`} fill="#c9822e" opacity=".55" />
    <ellipse
      cx="118"
      cy={h * 0.32}
      rx="44"
      ry="9"
      fill={shine}
      opacity=".7"
      transform={`rotate(-10 118 ${h * 0.32})`}
    />
    {seeds &&
      [
        [96, 22, -20],
        [132, 14, 10],
        [168, 18, -5],
        [204, 13, 25],
        [236, 30, -30],
        [80, 42, 15],
        [150, 36, -15],
        [192, 40, 30],
        [116, 52, 0],
        [226, 54, 10],
      ].map(([x, y, r]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={(y * h) / 74}
          rx="5"
          ry="2.4"
          fill="#fbf1de"
          transform={`rotate(${r} ${x} ${(y * h) / 74})`}
        />
      ))}
  </>
);

const leaf = (h: number) => (
  <path
    d={`M34 ${h / 2} Q40 0 70 4 Q90 -2 110 4 Q130 -1 150 3 Q172 -2 192 4 Q214 -1 234 4 Q262 0 286 ${h / 2} Q262 ${h} 240 ${h - 4} Q214 ${h + 2} 192 ${h - 4} Q170 ${h + 2} 150 ${h - 3} Q128 ${h + 2} 108 ${h - 4} Q86 ${h + 2} 64 ${h - 3} Q40 ${h} 34 ${h / 2} Z`}
    fill="#7fb547"
    stroke="#5e8f2f"
    strokeWidth="2"
  />
);

const LAYERS: Record<string, Layer> = {
  "potato-bottom": { h: 30, draw: bunBottom("#e9a750", "#c9822e") },
  "sesame-bottom": { h: 30, draw: bunBottom("#e4a04a", "#c27a28") },
  "gf-bottom": { h: 26, draw: bunBottom("#dcb47c", "#b88a4e") },
  "lettuce-wrap-bottom": { h: 18, draw: leaf(18) },
  "potato-top": { h: 74, draw: bunTop("#e9a750", "#f6cd8c", 74) },
  "sesame-top": { h: 74, draw: bunTop("#e4a04a", "#f3c27f", 74, true) },
  "gf-top": { h: 62, draw: bunTop("#dcb47c", "#efd3a6", 62) },
  "lettuce-wrap-top": { h: 26, draw: leaf(26) },
  patty: { h: 20, draw: patty("#5b301b", "#8b4a22", 1) },
  plant: { h: 20, draw: patty("#5a4a2b", "#8a7240", 2) },
  chicken: { h: 34, draw: chicken("#d39440") },
  "chicken-mild": { h: 34, draw: chicken("#d08a3b", "#d0682a") },
  "chicken-hot": { h: 34, draw: chicken("#c87633", "#b8401c") },
  "chicken-scorched": { h: 34, draw: chicken("#b8642a", "#7d1f10") },
  "cheese-american": { h: 6, draw: cheese("#f6a91a") },
  "cheese-cheddar": { h: 6, draw: cheese("#e5791c") },
  "cheese-jack": { h: 6, draw: cheese("#f3dc9a", "#c0392b") },
  pickles: {
    h: 6,
    draw: [74, 122, 172, 222].map((x) => (
      <ellipse
        key={x}
        cx={x + 12}
        cy="3"
        rx="19"
        ry="4.5"
        fill="#86a33c"
        stroke="#5b7a24"
        strokeWidth="2"
      />
    )),
  },
  onion: {
    h: 6,
    draw: [70, 120, 166, 214, 250].map((x) => (
      <ellipse
        key={x}
        cx={x}
        cy="3"
        rx="22"
        ry="3.5"
        fill="#f6eef4"
        stroke="#b994b8"
        strokeWidth="2"
      />
    )),
  },
  "griddled-onion": {
    h: 8,
    draw: (
      <path
        d="M50 5 q12 -8 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 M58 7 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
        stroke="#a4632a"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  lettuce: { h: 12, draw: leaf(12) },
  tomato: {
    h: 9,
    draw: [58, 132, 206].map((x) => (
      <g key={x}>
        <rect x={x} y="0" width="66" height="9" rx="4.5" fill="#d8432f" />
        <rect x={x + 8} y="2.5" width="50" height="4" rx="2" fill="#f07c5c" />
      </g>
    )),
  },
  jalapeno: {
    h: 7,
    draw: [70, 104, 140, 178, 214, 248].map((x) => (
      <circle
        key={x}
        cx={x}
        cy="3.5"
        r="8"
        fill="#4f8a2b"
        stroke="#a5c96c"
        strokeWidth="2.5"
      />
    )),
  },
  slaw: {
    h: 12,
    draw: (
      <path
        d="M46 6 l14 -4 M62 9 l16 -6 M80 5 l12 4 M96 8 l16 -5 M114 4 l14 6 M132 9 l16 -6 M150 4 l12 5 M166 8 l16 -6 M184 5 l14 5 M200 9 l16 -6 M218 4 l12 5 M232 8 l16 -5 M250 5 l16 4 M56 3 l10 6 M124 2 l10 7 M196 2 l10 7 M240 2 l12 7"
        stroke="#8e2f7b"
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
  },
  bacon: {
    h: 8,
    draw: (
      <>
        <path
          d="M40 4 Q60 -2 80 4 T120 4 T160 4 T200 4 T240 4 T280 4 L280 10 Q260 4 240 10 T200 10 T160 10 T120 10 T80 10 T40 10 Z"
          fill="#a8402c"
        />
        <path
          d="M44 6 Q64 0 84 6 T124 6 T164 6 T204 6 T244 6 T276 6"
          stroke="#eda68a"
          strokeWidth="1.6"
          fill="none"
        />
      </>
    ),
  },
  "sauce-smash": { h: 4, draw: sauce("#ee8650") },
  "sauce-ketchup": { h: 4, draw: sauce("#c8261b") },
  "sauce-mustard": { h: 4, draw: sauce("#f2b417") },
  "sauce-mayo": { h: 4, draw: sauce("#f6ecd4") },
  "sauce-honey": { h: 4, draw: sauce("#e39b22") },
};

const HEIGHT = 300;

/** `fit` crops the canvas to the burger (cards); without it the canvas stays fixed so a growing stack doesn't rescale. */
export function Stack({
  layers,
  label,
  fit = false,
}: {
  layers: string[];
  label: string;
  fit?: boolean;
}) {
  let y = HEIGHT - 16;
  const seen: Record<string, number> = {};
  const placed = layers.map((name) => {
    const layer = LAYERS[name];
    // Layers overlap a touch so the stack reads as squashed together.
    y -= layer.h - 2;
    seen[name] = (seen[name] ?? 0) + 1;
    return { key: `${name}-${seen[name]}`, name, y, layer };
  });

  const top = fit ? Math.max(0, y - 10) : 0;

  return (
    <svg
      className="stack"
      viewBox={`0 ${top} 320 ${HEIGHT - top}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMax meet"
    >
      <ellipse
        cx="160"
        cy={HEIGHT - 12}
        rx="136"
        ry="8"
        fill="currentColor"
        opacity=".14"
      />
      {placed.map(({ key, name, y, layer }) => (
        <g
          key={key}
          className="stack-slot"
          style={{ transform: `translateY(${y}px)` }}
        >
          <g
            className={`stack-layer ${name === "patty" || name === "plant" ? "is-patty" : ""}`}
          >
            {layer.draw}
          </g>
        </g>
      ))}
    </svg>
  );
}
