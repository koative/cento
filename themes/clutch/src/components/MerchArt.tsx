import type { Product } from "../content";

/** Rounds from the 2025 spring final run, printed as chevrons across the jersey chest (1 = won). */
const chestRounds = "1101110110011101101110111";

const torso =
  "M138 64 172 50Q200 74 228 50L262 64 330 98 362 172 312 194 294 160V348H106V160L88 194 38 172 70 98Z";

type Props = {
  product: Product;
  view?: "front" | "back";
  nameplate?: string;
  className?: string;
};

/** Flat technical drawings of the merch, coloured from the product's palette. */
export function MerchArt({
  product,
  view = "front",
  nameplate = "",
  className = "",
}: Props) {
  const { base, print } = product.colors;
  const seam = "rgba(0,0,0,.28)";
  const label = `${product.name}${view === "back" ? ", back" : ""}`;

  return (
    <svg
      className={`merch-art ${className}`}
      viewBox="0 0 400 400"
      role="img"
      aria-label={label}
    >
      {product.kind === "jersey" && (
        <g>
          <path d={torso} fill={base} stroke={seam} strokeWidth="2" />
          {view === "front" ? (
            <>
              <path
                d="M172 50 200 92 228 50"
                fill="none"
                stroke={print}
                strokeWidth="6"
              />
              {[...chestRounds].map((r, i) => (
                <path
                  key={i}
                  d={`M${112 + i * 7} 196l6 9-6 9`}
                  fill="none"
                  stroke={print}
                  strokeOpacity={r === "1" ? 1 : 0.28}
                  strokeWidth="3"
                />
              ))}
              <path d="M150 112h22l6 6v22h-22l-6-6z" fill={print} />
              <path
                d="M172 120h-12l-3 3v8l3 3h12"
                fill="none"
                stroke={base}
                strokeWidth="3"
              />
              <text
                x="250"
                y="140"
                textAnchor="middle"
                className="art-type"
                fill={print}
                fontSize="20"
              >
                KADE
              </text>
              <path d="M70 98 38 172l10 4 32-70z" fill={print} />
              <path d="M330 98 362 172l-10 4-32-70z" fill={print} />
            </>
          ) : (
            <>
              <path
                d="M172 50Q200 64 228 50"
                fill="none"
                stroke={print}
                strokeWidth="6"
              />
              <text
                x="200"
                y="130"
                textAnchor="middle"
                className="art-type"
                fill={print}
                fontSize={nameplate.length > 8 ? 24 : 32}
              >
                {nameplate || "YOUR NAME"}
              </text>
              <text
                x="200"
                y="262"
                textAnchor="middle"
                className="art-type"
                fill={print}
                fontSize="110"
              >
                26
              </text>
              <path d="M70 98 38 172l10 4 32-70z" fill={print} />
              <path d="M330 98 362 172l-10 4-32-70z" fill={print} />
            </>
          )}
        </g>
      )}

      {product.kind === "hoodie" && (
        <g>
          <path
            d="M150 70Q200 6 250 70Z"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <path
            d="M140 66 168 56Q200 92 232 56L260 66 324 104 360 330 316 340 290 180V352H110V180L84 340 40 330 76 104Z"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <path d="M184 92v54M216 92v54" stroke={print} strokeWidth="3" />
          <path
            d="M140 262h120l14 60H126z"
            fill="none"
            stroke={seam}
            strokeWidth="3"
          />
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M${88 - i * 1.4} ${160 + i * 18}h22`}
              stroke={i % 3 === 2 ? seam : print}
              strokeWidth="6"
            />
          ))}
          <path
            d="M150 64Q200 0 250 64"
            fill="none"
            stroke={seam}
            strokeWidth="3"
          />
        </g>
      )}

      {product.kind === "tee" && (
        <g>
          <path
            d="M140 64 172 52Q200 78 228 52L260 64 330 100 356 160 306 180 294 156V348H106V156L94 180 44 160 70 100Z"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <path
            d="M172 52Q200 78 228 52"
            fill="none"
            stroke={seam}
            strokeWidth="5"
          />
          <text
            x="200"
            y="250"
            textAnchor="middle"
            className="art-type"
            fill={print}
            fontSize="96"
          >
            0.4
          </text>
          <text
            x="200"
            y="284"
            textAnchor="middle"
            className="art-type"
            fill={print}
            fontSize="15"
          >
            SECONDS LEFT · R26
          </text>
        </g>
      )}

      {product.kind === "cap" && (
        <g>
          <path
            d="M70 262Q76 128 214 120 330 120 332 262Z"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <path
            d="M214 120Q196 190 200 262M140 136Q120 200 130 262"
            fill="none"
            stroke={seam}
            strokeWidth="2"
          />
          <path
            d="M300 250q70 0 92 30H290z"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <circle
            cx="212"
            cy="122"
            r="7"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <path d="M236 176h30l8 8v30h-30l-8-8z" fill={print} />
          <path
            d="M266 186h-16l-4 4v12l4 4h16"
            fill="none"
            stroke={base}
            strokeWidth="4"
          />
          <path d="M70 262h262v14H70z" fill={print} />
        </g>
      )}

      {product.kind === "mat" && (
        <g>
          <rect
            x="20"
            y="110"
            width="360"
            height="180"
            rx="10"
            fill={base}
            stroke={seam}
            strokeWidth="2"
          />
          <g fill="none" stroke={print} strokeWidth="2" opacity=".9">
            <path d="M56 140h86v50h40v-30h70v80h-50v50H56z" />
            <path d="M262 160h82v110h-74v-40h-8z" />
            <path d="M182 190h20M142 240h40" />
          </g>
          <g className="art-type" fill={print} fontSize="11">
            <text x="70" y="160">
              PIER
            </text>
            <text x="270" y="180">
              A SITE
            </text>
            <text x="200" y="176">
              CRANE
            </text>
            <text x="70" y="262">
              LOWER DOCK
            </text>
            <text x="150" y="214">
              MID
            </text>
          </g>
          <text
            x="364"
            y="282"
            textAnchor="end"
            className="art-type"
            fill={print}
            fontSize="12"
            opacity=".7"
          >
            TIDEWATER · CLT
          </text>
        </g>
      )}

      {product.kind === "scarf" && (
        <g transform="rotate(-24 200 200)">
          <rect x="10" y="168" width="380" height="64" fill={base} />
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={10 + i * 4}
              y="168"
              width="2"
              height="64"
              fill={print}
            />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={`r${i}`}
              x={368 + i * 4}
              y="168"
              width="2"
              height="64"
              fill={print}
            />
          ))}
          <text
            x="200"
            y="213"
            textAnchor="middle"
            className="art-type"
            fill={print}
            fontSize="38"
          >
            CLUTCH
          </text>
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={`f${i}`}
              d={`M${14 + i * 3} 232v18M${14 + i * 3} 168v-18`}
              stroke={base}
              strokeWidth="2"
            />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={`g${i}`}
              d={`M${352 + i * 3} 232v18M${352 + i * 3} 168v-18`}
              stroke={base}
              strokeWidth="2"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
