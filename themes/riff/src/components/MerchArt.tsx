import { releases, type Product } from "../content";
import { CoverShapes } from "./Cover";

const GARMENT = { black: "var(--ink)", bone: "#f6f1e6", red: "var(--red)" };
const TEE =
  "M30 14 L42 10 Q50 17 58 10 L70 14 L86 30 L76 40 L70 35 L70 90 L30 90 L30 35 L24 40 L14 30 Z";
const LONG =
  "M30 14 L42 10 Q50 17 58 10 L70 14 L80 24 L90 74 L80 77 L70 40 L70 90 L30 90 L30 40 L20 77 L10 74 L20 24 Z";

/** Flat product drawing on a stock-coloured tile. */
export function MerchArt({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { kind, garment = "black", release: slug } = product.art;
  const release = releases.find((r) => r.slug === slug) ?? releases[0];
  const cloth = GARMENT[garment];
  const print = garment === "black" ? "var(--red)" : "var(--ink)";

  return (
    <svg
      className={`merch-art ${className}`}
      viewBox="0 0 100 100"
      role="img"
      aria-label={product.name}
    >
      <rect width="100" height="100" fill="var(--stock)" />
      {kind === "lp" && (
        <>
          <circle cx="64" cy="50" r="31" fill="var(--ink)" />
          <circle
            cx="64"
            cy="50"
            r="22"
            fill="none"
            stroke="#3a342d"
            strokeWidth="0.4"
          />
          <circle
            cx="64"
            cy="50"
            r="16"
            fill="none"
            stroke="#3a342d"
            strokeWidth="0.4"
          />
          <circle cx="64" cy="50" r="9" fill="var(--red)" />
          <circle cx="64" cy="50" r="1" fill="var(--stock)" />
          <svg x="10" y="19" width="62" height="62" viewBox="0 0 100 100">
            <CoverShapes release={release} />
          </svg>
        </>
      )}
      {kind === "cd" && (
        <>
          <circle cx="60" cy="50" r="25" fill="#cfc8b8" />
          <circle cx="60" cy="50" r="5" fill="var(--stock)" />
          <svg x="18" y="25" width="50" height="50" viewBox="0 0 100 100">
            <CoverShapes release={release} />
          </svg>
        </>
      )}
      {kind === "cassette" && (
        <>
          <rect x="14" y="27" width="72" height="46" rx="3" fill="var(--red)" />
          <rect x="20" y="32" width="60" height="20" fill="var(--paper)" />
          <text x="23" y="45" className="art-type" fill="var(--ink)">
            {release.title.toUpperCase()}
          </text>
          <rect
            x="32"
            y="56"
            width="36"
            height="11"
            rx="5.5"
            fill="var(--ink)"
          />
          <circle cx="38" cy="61.5" r="3.6" fill="var(--paper)" />
          <circle cx="62" cy="61.5" r="3.6" fill="var(--paper)" />
          <polygon points="24,73 30,66 70,66 76,73" fill="#b02a14" />
        </>
      )}
      {(kind === "tee" || kind === "longsleeve" || kind === "hoodie") && (
        <>
          <path
            d={kind === "tee" ? TEE : LONG}
            fill={cloth}
            stroke="rgb(26 23 20 / .25)"
            strokeWidth="0.4"
          />
          {kind === "hoodie" && (
            <>
              <path
                d="M39 12 Q50 0 61 12 Q50 22 39 12 Z"
                fill={cloth}
                stroke="rgb(26 23 20 / .35)"
                strokeWidth="0.5"
              />
              <path
                d="M38 68 H62 L58 80 H42 Z"
                fill="none"
                stroke="rgb(26 23 20 / .35)"
                strokeWidth="0.5"
              />
            </>
          )}
          {kind === "longsleeve" ? (
            <g fill={print}>
              {[0, 1, 2, 3, 4].map((i) => (
                <rect
                  key={i}
                  x={21 + i * 1.6}
                  y={36 + i * 7}
                  width="6"
                  height="1.4"
                  transform={`rotate(14 ${21 + i * 1.6} ${36 + i * 7})`}
                />
              ))}
              <text x="41" y="40" className="art-type" fill={print}>
                RIFF
              </text>
            </g>
          ) : (
            <g>
              {kind === "tee" && garment === "black" ? (
                <svg x="38" y="24" width="24" height="24" viewBox="0 0 100 100">
                  <rect width="100" height="30" fill={print} />
                  <rect y="36" width="100" height="6" fill={print} />
                  <rect y="47" width="100" height="3" fill={print} />
                  <circle cx="50" cy="80" r="11" fill={print} />
                </svg>
              ) : kind === "hoodie" ? (
                [12, 9, 6, 3].map((r) => (
                  <circle
                    key={r}
                    cx="50"
                    cy="44"
                    r={r}
                    fill="none"
                    stroke={print}
                    strokeWidth="1"
                  />
                ))
              ) : (
                <>
                  <text
                    x="50"
                    y="40"
                    textAnchor="middle"
                    className="art-type art-type-xl"
                    fill={print}
                  >
                    RIFF
                  </text>
                  <rect x="38" y="44" width="24" height="5" fill="var(--red)" />
                  <text
                    x="50"
                    y="55"
                    textAnchor="middle"
                    className="art-type"
                    fill={print}
                  >
                    FALL ’26
                  </text>
                </>
              )}
            </g>
          )}
        </>
      )}
      {kind === "tote" && (
        <>
          <path
            d="M36 32 V18 Q36 10 44 10 H56 Q64 10 64 18 V32"
            fill="none"
            stroke="#d9cfb8"
            strokeWidth="3"
          />
          <rect
            x="24"
            y="30"
            width="52"
            height="60"
            fill="#e9dfc8"
            stroke="rgb(26 23 20 / .2)"
            strokeWidth="0.4"
          />
          {[
            "COPPER WIRE",
            "NINE VOLT",
            "FLUORESCENT",
            "LOW CEILING",
            "OVERPASS",
            "HOUSE LIGHTS",
          ].map((s, i) => (
            <text
              key={s}
              x="31"
              y={44 + i * 7.5}
              className="art-type"
              fill={i === 3 ? "var(--red)" : "var(--ink)"}
            >
              {s}
            </text>
          ))}
        </>
      )}
      {kind === "poster" && (
        <>
          <rect
            x="22"
            y="8"
            width="56"
            height="84"
            fill="var(--paper)"
            stroke="rgb(26 23 20 / .2)"
            strokeWidth="0.4"
          />
          <text
            x="50"
            y="36"
            textAnchor="middle"
            className="art-type art-type-xxl"
            fill="var(--ink)"
          >
            RIFF
          </text>
          <rect x="22" y="42" width="56" height="10" fill="var(--red)" />
          <text
            x="50"
            y="49.5"
            textAnchor="middle"
            className="art-type"
            fill="var(--paper)"
          >
            LOW CEILING TOUR
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={30}
              y={58 + i * 5}
              width={40 - (i % 3) * 6}
              height="1.6"
              fill="var(--ink)"
            />
          ))}
        </>
      )}
      {kind === "picks" && (
        <>
          <rect x="18" y="28" width="64" height="44" rx="6" fill="var(--ink)" />
          <text
            x="50"
            y="57"
            textAnchor="middle"
            className="art-type art-type-xl"
            fill="var(--red)"
          >
            RIFF
          </text>
          {[
            [24, 78, -18],
            [44, 80, 8],
            [64, 77, 24],
          ].map(([x, y, a]) => (
            <path
              key={x}
              d="M0 -8 C6 -8 8 -5 7 -1 C6 3 2 7 0 9 C-2 7 -6 3 -7 -1 C-8 -5 -6 -8 0 -8 Z"
              fill={x === 44 ? "var(--red)" : "var(--paper)"}
              stroke="var(--ink)"
              strokeWidth="0.5"
              transform={`translate(${x + 4} ${y}) rotate(${a})`}
            />
          ))}
        </>
      )}
    </svg>
  );
}
