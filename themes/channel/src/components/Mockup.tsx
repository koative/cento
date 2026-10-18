import type { Colorway, MockKind } from "../content";

/*
 * Flat, exact merch drawings so a colour pick visibly changes the product.
 * Every drawing sits in a 400 × 400 box; `ink` is the print colour.
 */

type Props = {
  kind: MockKind;
  color: Colorway;
  label: string;
  className?: string;
};

function Shade({
  d,
  fill,
  dark = 0,
}: {
  d: string;
  fill: string;
  dark?: number;
}) {
  return (
    <g>
      <path d={d} fill={fill} />
      {dark !== 0 && (
        <path
          d={d}
          fill={dark > 0 ? "#000" : "#fff"}
          opacity={Math.abs(dark)}
        />
      )}
    </g>
  );
}

function ChestMark({
  x,
  y,
  s,
  ink,
}: {
  x: number;
  y: number;
  s: number;
  ink: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M7 6h18v5H12v10h13v5H7z" fill={ink} />
      <path d="M15 13.2l6 2.8-6 2.8z" fill={ink} opacity="0.7" />
    </g>
  );
}

const seam = {
  fill: "none",
  stroke: "#000",
  strokeOpacity: 0.22,
  strokeWidth: 2,
} as const;

function Tee({ color }: { color: Colorway }) {
  return (
    <>
      <Shade
        fill={color.hex}
        d="M146 62 Q200 94 254 62 L338 102 L314 166 L284 154 L286 342 L114 342 L116 154 L86 166 L62 102 Z"
      />
      <path
        d="M146 62 Q200 112 254 62"
        {...seam}
        strokeWidth={6}
        strokeOpacity={0.3}
      />
      <path d="M116 154 L130 108 M284 154 L270 108" {...seam} />
      <ChestMark x={176} y={136} s={1.5} ink={color.ink} />
      <text
        x="200"
        y="206"
        textAnchor="middle"
        className="mock-text"
        fontSize="17"
        fill={color.ink}
      >
        channel
      </text>
    </>
  );
}

function Hoodie({ color }: { color: Colorway }) {
  return (
    <>
      <Shade
        fill={color.hex}
        d="M136 76 L84 104 L52 300 L92 308 L118 176 L116 352 L284 352 L282 176 L308 308 L348 300 L316 104 L264 76 Z"
      />
      <Shade
        fill={color.hex}
        dark={0.28}
        d="M138 80 Q200 18 262 80 Q246 126 200 132 Q154 126 138 80 Z"
      />
      <path
        d="M162 92 Q200 70 238 92 Q224 116 200 118 Q176 116 162 92 Z"
        fill="#000"
        opacity="0.35"
      />
      <path d="M146 274 L254 274 L268 332 L132 332 Z" {...seam} />
      <path d="M52 300 L92 308 M348 300 L308 308" {...seam} strokeWidth={8} />
      <ChestMark x={176} y={170} s={1.5} ink={color.ink} />
      <text
        x="200"
        y="240"
        textAnchor="middle"
        className="mock-text"
        fontSize="17"
        fill={color.ink}
      >
        channel
      </text>
    </>
  );
}

function Cap({ color }: { color: Colorway }) {
  return (
    <>
      <defs>
        <pattern
          id={"cap-" + color.name.replace(/\W/g, "")}
          width="34"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M6 6h12v3.5H9.5v7H18V20H6z"
            fill={color.ink}
            opacity="0.85"
          />
        </pattern>
        <clipPath id="cap-dome">
          <path d="M88 236 Q96 112 200 102 Q304 112 312 236 Z" />
        </clipPath>
      </defs>
      <path d="M88 236 Q96 112 200 102 Q304 112 312 236 Z" fill={color.hex} />
      <rect
        x="80"
        y="96"
        width="240"
        height="150"
        fill={`url(#cap-${color.name.replace(/\W/g, "")})`}
        clipPath="url(#cap-dome)"
      />
      <path
        d="M200 102 L200 240 M146 112 Q128 170 132 238 M254 112 Q272 170 268 238"
        {...seam}
      />
      <Shade
        fill={color.hex}
        dark={0.3}
        d="M88 236 Q200 258 312 236 L324 258 Q200 294 76 258 Z"
      />
      <circle cx="200" cy="104" r="6" fill="#000" opacity="0.3" />
    </>
  );
}

function Apron({ color }: { color: Colorway }) {
  return (
    <>
      <path
        d="M152 84 L118 26 M248 84 L282 26"
        stroke="#3a2a1f"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <Shade
        fill={color.hex}
        d="M150 80 L250 80 L254 160 Q302 168 306 204 L300 364 L100 364 L94 204 Q98 168 146 160 Z"
      />
      <path
        d="M150 80 L250 80 L254 160 Q302 168 306 204 L300 364 L100 364 L94 204 Q98 168 146 160 Z"
        fill="none"
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="3"
        strokeDasharray="7 6"
        transform="translate(200 222) scale(0.95) translate(-200 -222)"
      />
      <rect x="140" y="236" width="120" height="70" rx="4" {...seam} />
      <path d="M200 236 V306 M228 236 V268" {...seam} />
      <ChestMark x={180} y={108} s={1.25} ink={color.ink} />
      <circle cx="96" cy="204" r="7" fill="#c9b79c" />
      <circle cx="304" cy="204" r="7" fill="#c9b79c" />
    </>
  );
}

function Stickers() {
  const items = [
    { x: 70, y: 70, r: -8, w: 170, fill: "#ff7a2e", text: "ONE STICK" },
    { x: 190, y: 150, r: 6, w: 150, fill: "#ffd84a", text: "SEIZED" },
    { x: 60, y: 210, r: 4, w: 140, fill: "#7fd3ff", text: "DON'T." },
    { x: 200, y: 260, r: -5, w: 150, fill: "#f3eee5", text: "20 TONS" },
  ];
  return (
    <>
      {items.map((s) => (
        <g
          key={s.text}
          transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + 34})`}
        >
          <rect
            x={s.x - 6}
            y={s.y - 6}
            width={s.w + 12}
            height={80}
            rx="20"
            fill="#f3eee5"
          />
          <rect x={s.x} y={s.y} width={s.w} height={68} rx="15" fill={s.fill} />
          <text
            x={s.x + s.w / 2}
            y={s.y + 45}
            textAnchor="middle"
            className="mock-text"
            fontSize="25"
            fill="#1a1816"
          >
            {s.text}
          </text>
        </g>
      ))}
      <g transform="translate(250 54) scale(2.6)">
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="7"
          fill="#1a1816"
          stroke="#f3eee5"
          strokeWidth="2"
        />
        <path d="M7 6h18v5H12v10h13v5H7z" fill="#ff7a2e" />
      </g>
    </>
  );
}

function Opener({ color }: { color: Colorway }) {
  const c = color.hex;
  return (
    <g transform="translate(200 205) scale(1.4) translate(-230 -185)">
      <Shade fill={c} dark={-0.12} d="M110 130 L210 130 L350 80 L250 80 Z" />
      <Shade fill={c} dark={0.15} d="M210 130 L210 160 L350 110 L350 80 Z" />
      <Shade fill={c} dark={0.42} d="M140 160 L210 160 L350 110 L280 110 Z" />
      <Shade fill={c} dark={0.25} d="M140 160 L140 260 L280 210 L280 110 Z" />
      <g transform="matrix(1 -0.357 0 1 140 160)">
        <rect x="40" y="30" width="62" height="34" rx="16" fill="#0e0d0c" />
        <path d="M86 30 h10 v12 h-10z" fill={c} opacity="0.85" />
      </g>
      <Shade fill={c} dark={0.05} d="M140 260 L210 260 L350 210 L280 210 Z" />
      <Shade fill={c} dark={0.15} d="M210 260 L210 290 L350 240 L350 210 Z" />
      <Shade
        fill={c}
        dark={-0.2}
        d="M110 130 L210 130 L210 160 L140 160 L140 260 L210 260 L210 290 L110 290 Z"
      />
      <path
        d="M118 140 L200 140 M118 280 L200 280"
        stroke={color.ink}
        strokeOpacity="0.5"
        strokeWidth="2"
      />
    </g>
  );
}

function Mug({ color }: { color: Colorway }) {
  return (
    <>
      <path
        d="M282 166 C346 166 350 282 282 280"
        fill="none"
        stroke={color.hex}
        strokeWidth="24"
      />
      <path
        d="M282 166 C346 166 350 282 282 280"
        fill="none"
        stroke="#000"
        strokeOpacity="0.2"
        strokeWidth="24"
      />
      <Shade
        fill={color.hex}
        d="M118 124 L118 312 Q200 344 282 312 L282 124 Z"
      />
      <path
        d="M118 124 L118 312 Q200 344 282 312 L282 124"
        fill="none"
        stroke="#000"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <ellipse cx="200" cy="124" rx="82" ry="20" fill="#1a1816" />
      <ellipse cx="200" cy="124" rx="74" ry="15" fill="#000" opacity="0.6" />
      <ChestMark x={170} y={170} s={1.9} ink={color.ink} />
      <text
        x="200"
        y="262"
        textAnchor="middle"
        className="mock-text"
        fontSize="20"
        fill={color.ink}
      >
        channel
      </text>
    </>
  );
}

function Print({ color }: { color: Colorway }) {
  const ink = color.ink;
  const line = { fill: "none", stroke: ink, strokeWidth: 2.2 } as const;
  return (
    <>
      <rect
        x="98"
        y="46"
        width="214"
        height="316"
        fill="#000"
        opacity="0.35"
        transform="translate(6 8)"
      />
      <rect x="98" y="46" width="214" height="316" fill={color.hex} />
      <g opacity="0.16" stroke={ink}>
        {Array.from({ length: 13 }, (_, i) => (
          <line
            key={"v" + i}
            x1={98 + i * 18}
            y1="46"
            x2={98 + i * 18}
            y2="362"
          />
        ))}
        {Array.from({ length: 18 }, (_, i) => (
          <line
            key={"h" + i}
            x1="98"
            y1={46 + i * 18}
            x2="312"
            y2={46 + i * 18}
          />
        ))}
      </g>
      <rect x="150" y="318" width="110" height="14" {...line} />
      <path d="M186 318 V104 M200 318 V104" {...line} />
      <rect x="164" y="96" width="74" height="54" rx="6" {...line} />
      <rect x="226" y="80" width="44" height="34" rx="4" {...line} />
      <path d="M200 150 V184 M232 130 L268 162 M268 162 l8 -4" {...line} />
      <rect x="160" y="214" width="88" height="10" {...line} />
      <path
        d="M126 104 V318 M120 104 h12 M120 318 h12"
        {...line}
        strokeWidth={1.2}
      />
      <text
        x="118"
        y="214"
        className="mock-mono"
        fontSize="9"
        fill={ink}
        transform="rotate(-90 118 214)"
      >
        64 1/2 in
      </text>
      <text
        x="205"
        y="350"
        textAnchor="middle"
        className="mock-mono"
        fontSize="9"
        fill={ink}
      >
        FLOOR DRILL PRESS · 1952 · SHEET 1/1
      </text>
    </>
  );
}

export function Mockup({ kind, color, label, className = "" }: Props) {
  return (
    <svg
      className={"mockup " + className}
      viewBox="0 0 400 400"
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
    >
      {kind === "tee" && <Tee color={color} />}
      {kind === "hoodie" && <Hoodie color={color} />}
      {kind === "cap" && <Cap color={color} />}
      {kind === "apron" && <Apron color={color} />}
      {kind === "stickers" && <Stickers />}
      {kind === "opener" && <Opener color={color} />}
      {kind === "mug" && <Mug color={color} />}
      {kind === "print" && <Print color={color} />}
    </svg>
  );
}
