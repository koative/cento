import { beers, type Beer, type GlassShape, type Product } from "../content";
import { beerColor } from "../lib/util";

/** The Kettle mark: a copper brew kettle with its vapour stack. */
export function Mark({ className = "mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="17.5" y="2" width="5" height="11" rx="1" fill="currentColor" />
      <path d="M5 29C5 19 12 12.5 20 12.5S35 19 35 29Z" fill="var(--copper)" />
      <path
        d="M11 22c2-4 5-6 9-6.5"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".7"
      />
      <rect x="3" y="29" width="34" height="6" rx="1.2" fill="currentColor" />
    </svg>
  );
}

/** outline, liquid line, bottom of the bowl, and a highlight stroke down the left wall. */
type Shape = { outline: string; top: number; bottom: number; shine: string };

const shapes: Record<GlassShape, Shape> = {
  pint: {
    outline: "M14 8L86 8L77 152L23 152Z",
    top: 22,
    bottom: 152,
    shine: "M24 30L30 136",
  },
  stange: {
    outline: "M30 4L70 4L69 154L31 154Z",
    top: 16,
    bottom: 154,
    shine: "M38 24L38.6 140",
  },
  tulip: {
    outline:
      "M24 8C18 30 16 52 26 70C34 84 44 88 46 96L46 136Q46 142 30 146L30 152L70 152L70 146Q54 142 54 136L54 96C56 88 66 84 74 70C84 52 82 30 76 8Z",
    top: 24,
    bottom: 94,
    shine: "M29 28C26 44 26 56 32 68",
  },
  snifter: {
    outline:
      "M30 24C8 50 12 92 42 98L46 100L46 136Q46 142 30 146L30 152L70 152L70 146Q54 142 54 136L54 100L58 98C88 92 92 50 70 24Z",
    top: 50,
    bottom: 99,
    shine: "M27 50C21 62 22 76 30 86",
  },
};

type GlassProps = {
  shape: GlassShape;
  /** Beer colour; omit for an empty glass. */
  color?: string;
  label?: string;
  className?: string;
  /** Stable id for the clip path when several glasses share a page. */
  id: string;
};

/** A glass drawn to its real silhouette, filled with the beer's SRM colour. */
export function Glass({
  shape,
  color,
  label,
  className = "glass",
  id,
}: GlassProps) {
  const s = shapes[shape];
  const clip = `clip-${id}`;
  return (
    <svg
      className={className}
      viewBox="0 0 100 160"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={clip}>
          <path d={s.outline} />
        </clipPath>
      </defs>
      <path d={s.outline} className="glass-body" />
      {color && (
        <g clipPath={`url(#${clip})`}>
          <g className="pour">
            <rect
              x="0"
              y={s.top}
              width="100"
              height={s.bottom - s.top}
              fill={color}
            />
            <rect
              className="foam"
              x="0"
              y={s.top - 9}
              width="100"
              height="10"
            />
          </g>
        </g>
      )}
      <path d={s.shine} className="glass-shine" />
      <path d={s.outline} className="glass-edge" />
    </svg>
  );
}

function Can({ beer }: { beer: Beer }) {
  const words = beer.name.split(" ");
  return (
    <svg
      className="art"
      viewBox="0 0 120 210"
      role="img"
      aria-label={`${beer.name} can`}
    >
      <rect x="16" y="3" width="88" height="14" rx="5" fill="#cfc8bb" />
      <rect x="10" y="13" width="100" height="184" rx="9" fill={beer.label} />
      <rect x="10" y="132" width="100" height="22" fill={beerColor(beer)} />
      <rect
        x="10"
        y="130"
        width="100"
        height="2.5"
        fill="var(--paper)"
        opacity=".85"
      />
      <rect
        x="10"
        y="154"
        width="100"
        height="2.5"
        fill="var(--paper)"
        opacity=".85"
      />
      <text
        x="60"
        y="38"
        className="can-small"
        textAnchor="middle"
        fill="var(--paper)"
      >
        KETTLE BREWING
      </text>
      {words.map((w, i) => (
        <text
          key={w}
          x="60"
          y={(words.length === 1 ? 96 : 84) + i * 26}
          className="can-name"
          textAnchor="middle"
          fill="var(--paper)"
          textLength={w.length > 6 ? 86 : undefined}
          lengthAdjust="spacingAndGlyphs"
        >
          {w}
        </text>
      ))}
      <text
        x="60"
        y="176"
        className="can-small"
        textAnchor="middle"
        fill="var(--paper)"
      >
        {beer.abv.toFixed(1)}% · 16 FL OZ
      </text>
      <rect x="20" y="13" width="9" height="184" fill="#fff" opacity=".1" />
      <rect x="16" y="193" width="88" height="12" rx="5" fill="#b5ad9f" />
    </svg>
  );
}

function Bottle({ beer }: { beer: Beer }) {
  return (
    <svg
      className="art"
      viewBox="0 0 120 210"
      role="img"
      aria-label={`${beer.name} bottle`}
    >
      <path
        d="M50 4h20v40c0 10 22 18 22 40v112c0 6-4 10-10 10H38c-6 0-10-4-10-10V84c0-22 22-30 22-40Z"
        fill="#2a1a12"
      />
      <path
        d="M48 2h24v30c-4 4-2 10-6 12s-4-6-6-2-6 6-8 0-4-6-4-10Z"
        fill={beer.label === "#1f1712" ? "#7d2a1a" : beer.label}
      />
      <rect x="32" y="104" width="56" height="70" rx="3" fill="var(--paper)" />
      <text
        x="60"
        y="126"
        className="can-small"
        textAnchor="middle"
        fill="var(--ink)"
      >
        KETTLE · 2026
      </text>
      {beer.name.split(" ").map((w, i) => (
        <text
          key={w}
          x="60"
          y={146 + i * 16}
          className="bottle-name"
          textAnchor="middle"
          fill="var(--ink)"
        >
          {w}
        </text>
      ))}
      <rect x="36" y="60" width="6" height="130" fill="#fff" opacity=".08" />
    </svg>
  );
}

function Tee({ color }: { color: string }) {
  return (
    <svg
      className="art"
      viewBox="0 0 120 210"
      role="img"
      aria-label="Brewhouse tee"
    >
      <path
        d="M38 50l-26 14 10 26 14-6v84h48V84l14 6 10-26-26-14c-4 8-12 12-22 12s-18-4-22-12Z"
        fill={color}
      />
      <g transform="translate(51 82) scale(.45)" color="var(--paper)">
        <rect x="17.5" y="2" width="5" height="11" rx="1" fill="currentColor" />
        <path
          d="M5 29C5 19 12 12.5 20 12.5S35 19 35 29Z"
          fill="var(--copper-bright)"
        />
        <rect x="3" y="29" width="34" height="6" rx="1.2" fill="currentColor" />
      </g>
    </svg>
  );
}

function GiftCard() {
  return (
    <svg
      className="art"
      viewBox="0 0 120 210"
      role="img"
      aria-label="Gift card in a letterpressed envelope"
    >
      <rect x="8" y="70" width="104" height="70" rx="5" fill="var(--copper)" />
      <rect
        x="14"
        y="76"
        width="92"
        height="58"
        rx="3"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="1.2"
        opacity=".7"
      />
      <text
        x="60"
        y="108"
        className="gift-name"
        textAnchor="middle"
        fill="var(--paper)"
      >
        Kettle
      </text>
      <text
        x="60"
        y="124"
        className="can-small"
        textAnchor="middle"
        fill="var(--paper)"
      >
        GOOD FOR ONE ROUND OR MANY
      </text>
    </svg>
  );
}

/** Product drawing for the shop: cans, bottles, glassware, apparel or a gift card. */
export function ProductArt({ product }: { product: Product }) {
  const beer = beers.find((b) => b.slug === product.beer);
  if (product.kind === "cans" && beer) return <Can beer={beer} />;
  if (product.kind === "bottles" && beer) return <Bottle beer={beer} />;
  if (product.kind === "apparel")
    return <Tee color={product.color ?? "#5a3b24"} />;
  if (product.kind === "gift") return <GiftCard />;
  return (
    <div className="art art-glass">
      <Glass
        shape={product.id === "pint-glass" ? "pint" : "tulip"}
        id={product.id}
        label={product.name}
      />
      <Mark className="art-glass-mark" />
    </div>
  );
}
