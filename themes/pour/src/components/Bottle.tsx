import type { Motif, Shape, Wine } from "../content";

/* Silhouettes on a 120 × 360 canvas. The label always sits on the straight body between y 214 and 318. */
const SHAPES: Record<Shape, { body: string; cap: string }> = {
  burgundy: {
    body: "M50 22H70V108C70 150 100 158 100 200V338Q100 352 86 352H34Q20 352 20 338V200C20 158 50 150 50 108Z",
    cap: "M49 18H71V62H49Z",
  },
  bordeaux: {
    body: "M51 22H69V118C69 140 100 140 100 166V338Q100 352 86 352H34Q20 352 20 338V166C20 140 51 140 51 118Z",
    cap: "M50 18H70V64H50Z",
  },
  sparkling: {
    body: "M48 26H72V104C72 150 104 160 104 206V338Q104 354 88 354H32Q16 354 16 338V206C16 160 48 150 48 104Z",
    cap: "M46 16H74V30H46Z",
  },
  litre: {
    body: "M52 26H68V92C68 132 98 140 98 182V340Q98 352 86 352H34Q22 352 22 340V182C22 140 52 132 52 92Z",
    cap: "M50 18H70V32H50Z",
  },
};

function MotifArt({ motif, ink }: { motif: Motif; ink: string }) {
  const s = { stroke: ink, fill: "none", strokeWidth: 2 };
  switch (motif) {
    case "sun":
      return (
        <g {...s}>
          <circle cx="60" cy="252" r="14" fill={ink} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={60 + Math.cos(a) * 20}
                y1={252 + Math.sin(a) * 20}
                x2={60 + Math.cos(a) * 28}
                y2={252 + Math.sin(a) * 28}
              />
            );
          })}
        </g>
      );
    case "wave":
      return (
        <g {...s}>
          {[236, 248, 260, 272].map((y) => (
            <path key={y} d={`M14 ${y}q11 -9 23 0t23 0t23 0t23 0`} />
          ))}
        </g>
      );
    case "dots":
      return (
        <g fill={ink}>
          {[0, 1, 2, 3].flatMap((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <circle
                key={`${r}${c}`}
                cx={32 + c * 14 + (r % 2) * 7}
                cy={232 + r * 13}
                r="3.6"
              />
            )),
          )}
        </g>
      );
    case "stripes":
      return (
        <g fill={ink}>
          {[226, 240, 254, 268].map((y) => (
            <rect key={y} x="0" y={y} width="120" height="6" />
          ))}
        </g>
      );
    case "moon":
      return (
        <g fill={ink}>
          <path d="M66 230a22 22 0 1 0 0 44a17 17 0 1 1 0-44Z" />
          <circle cx="78" cy="236" r="2" />
          <circle cx="84" cy="258" r="1.6" />
        </g>
      );
    case "arch":
      return (
        <g {...s}>
          {[26, 19, 12].map((r) => (
            <path
              key={r}
              d={`M${60 - r} 280V${262 - r * 0.2}a${r} ${r} 0 0 1 ${r * 2} 0V280`}
            />
          ))}
        </g>
      );
    case "grid":
      return (
        <g fill={ink}>
          {[0, 1, 2, 3].flatMap((r) =>
            [0, 1, 2, 3, 4, 5].map((c) =>
              (r + c) % 2 ? (
                <rect
                  key={`${r}${c}`}
                  x={24 + c * 12}
                  y={226 + r * 12}
                  width="12"
                  height="12"
                />
              ) : null,
            ),
          )}
        </g>
      );
    case "leaf":
      return (
        <g {...s}>
          <path d="M60 280C36 266 38 238 60 226C82 238 84 266 60 280Z" />
          <path d="M60 230V280M60 246l-10-7M60 258l10-7M60 266l-10-6" />
        </g>
      );
  }
}

type Props = { wine: Wine; className?: string };

/** An authored bottle: silhouette by style, label colour and motif from content.ts. Decorative; the name sits next to it in text. */
export function Bottle({ wine, className = "" }: Props) {
  const { shape, glass, label, ink, cap, motif } = wine.bottle;
  const id = "b-" + wine.id;
  const name = wine.name.toUpperCase();
  return (
    <svg
      className={"bottle " + className}
      viewBox="0 0 120 360"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={id}>
          <rect x="16" y="214" width="88" height="104" />
        </clipPath>
        <linearGradient id={id + "-g"} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.85" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path d={SHAPES[shape].body} fill={glass} />
      <g clipPath={`url(#${id})`}>
        <path d={SHAPES[shape].body} fill={label} />
        <MotifArt motif={motif} ink={ink} />
      </g>
      <text
        x="60"
        y="304"
        textAnchor="middle"
        fill={ink}
        fontSize={name.length > 12 ? 7.5 : 9}
        letterSpacing="0.8"
        fontFamily="var(--display)"
        fontWeight="600"
      >
        {name}
      </text>
      <path d={SHAPES[shape].body} fill={`url(#${id}-g)`} />
      <path d={SHAPES[shape].cap} fill={cap} />
    </svg>
  );
}
