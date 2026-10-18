import type { Product } from "../content";

const shade = (pct: number, toward = "#000") => ({
  fill: `color-mix(in oklab, var(--label) ${pct}%, ${toward})`,
});

/** Authored side-on render of a shop product, coloured by its label token. */
export function ProductArt({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const word = product.name
    .replace(/^No\. 9 /, "")
    .split(" ")[0]
    .toUpperCase();
  return (
    <svg
      className={`product-art ${className}`}
      viewBox="22 24 196 196"
      role="img"
      aria-label={product.name}
      style={{ ["--label" as string]: `var(--label-${product.label})` }}
    >
      <ellipse cx="120" cy="212" rx="78" ry="7" className="art-floor" />
      {product.art === "tin" && (
        <g>
          <ellipse
            cx="120"
            cy="198"
            rx="70"
            ry="14"
            className="art-metal-dark"
          />
          <rect x="50" y="146" width="140" height="52" className="art-metal" />
          <rect x="50" y="156" width="140" height="32" className="art-paper" />
          <text x="120" y="178" className="art-word">
            {word}
          </text>
          <ellipse cx="120" cy="146" rx="74" ry="15" style={shade(70)} />
          <rect x="46" y="122" width="148" height="24" className="art-label" />
          <ellipse
            cx="120"
            cy="122"
            rx="74"
            ry="15"
            style={shade(80, "#fff")}
            className="art-label-top"
          />
          <text x="120" y="141" className="art-small art-on-label">
            FADE BARBERS
          </text>
        </g>
      )}
      {product.art === "jar" && (
        <g>
          <ellipse cx="120" cy="200" rx="52" ry="11" style={shade(70)} />
          <rect x="68" y="100" width="104" height="100" className="art-label" />
          <rect x="68" y="122" width="104" height="54" className="art-paper" />
          <text x="120" y="146" className="art-word">
            {word}
          </text>
          <text x="120" y="164" className="art-small">
            POMADE · 4 OZ
          </text>
          <ellipse cx="120" cy="100" rx="56" ry="12" className="art-ink" />
          <rect x="64" y="80" width="112" height="20" className="art-ink" />
          <ellipse cx="120" cy="80" rx="56" ry="12" className="art-ink-top" />
        </g>
      )}
      {product.art === "spray" && (
        <g>
          <rect
            x="84"
            y="88"
            width="72"
            height="118"
            rx="16"
            className="art-label"
          />
          <rect x="106" y="66" width="28" height="26" className="art-label" />
          <rect
            x="98"
            y="44"
            width="44"
            height="24"
            rx="4"
            className="art-ink"
          />
          <rect
            x="140"
            y="50"
            width="18"
            height="8"
            rx="2"
            className="art-ink"
          />
          <rect x="90" y="118" width="60" height="64" className="art-paper" />
          <text x="120" y="146" className="art-word art-word-sm">
            SEA
          </text>
          <text x="120" y="166" className="art-word art-word-sm">
            SALT
          </text>
        </g>
      )}
      {product.art === "dropper" && (
        <g>
          <rect
            x="80"
            y="108"
            width="80"
            height="98"
            rx="14"
            className="art-amber"
          />
          <rect x="104" y="94" width="32" height="18" className="art-amber" />
          <rect
            x="98"
            y="76"
            width="44"
            height="22"
            rx="3"
            className="art-ink"
          />
          <rect
            x="108"
            y="36"
            width="24"
            height="44"
            rx="12"
            className="art-ink"
          />
          <rect x="86" y="128" width="68" height="58" className="art-label" />
          <text x="120" y="154" className="art-word art-word-sm">
            BEARD
          </text>
          <text x="120" y="172" className="art-small">
            OIL · 1 FL OZ
          </text>
        </g>
      )}
      {product.art === "splash" && (
        <g>
          <rect
            x="84"
            y="82"
            width="72"
            height="124"
            rx="8"
            style={shade(85)}
          />
          <rect
            x="88"
            y="90"
            width="64"
            height="112"
            rx="6"
            className="art-label"
          />
          <rect x="108" y="54" width="24" height="32" style={shade(85)} />
          <rect
            x="104"
            y="32"
            width="32"
            height="26"
            rx="3"
            className="art-ink"
          />
          <rect x="90" y="120" width="60" height="58" className="art-paper" />
          <text x="120" y="146" className="art-word art-word-sm">
            BAY
          </text>
          <text x="120" y="166" className="art-word art-word-sm">
            RUM
          </text>
        </g>
      )}
      {product.art === "bowl" && (
        <g>
          <path
            d="M44 140 H196 C194 180 170 206 138 206 H102 C70 206 46 180 44 140 Z"
            className="art-ink"
          />
          <ellipse cx="120" cy="140" rx="76" ry="16" className="art-ink-top" />
          <ellipse cx="120" cy="140" rx="64" ry="11" className="art-label" />
          <ellipse cx="120" cy="138" rx="52" ry="8" className="art-paper" />
          <text x="120" y="182" className="art-word art-word-sm art-on-ink">
            FADE
          </text>
        </g>
      )}
      {product.art === "razor" && (
        <g>
          <rect
            x="66"
            y="64"
            width="108"
            height="10"
            rx="3"
            className="art-blade"
          />
          <rect
            x="72"
            y="58"
            width="96"
            height="24"
            rx="8"
            className="art-metal"
          />
          <rect
            x="114"
            y="82"
            width="12"
            height="12"
            className="art-metal-dark"
          />
          <rect
            x="110"
            y="94"
            width="20"
            height="104"
            rx="5"
            className="art-metal"
          />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x="110"
              y={104 + i * 6}
              width="20"
              height="2"
              className="art-metal-dark"
            />
          ))}
          <rect
            x="106"
            y="196"
            width="28"
            height="12"
            rx="4"
            className="art-metal-dark"
          />
        </g>
      )}
      {product.art === "comb" && (
        <g transform="rotate(-8 120 130)">
          <rect
            x="34"
            y="100"
            width="172"
            height="24"
            rx="5"
            className="art-ink"
          />
          {Array.from({ length: 30 }, (_, i) => {
            const wide = i < 13;
            const x = wide ? 40 + i * 6.6 : 126 + (i - 13) * 4.6;
            return (
              <rect
                key={i}
                x={x}
                y="122"
                width={wide ? 3.6 : 2.2}
                height="46"
                rx="1"
                className="art-ink"
              />
            );
          })}
          <text x="120" y="117" className="art-small art-on-ink">
            FADE BARBERS
          </text>
        </g>
      )}
    </svg>
  );
}
