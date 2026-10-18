import type { Product } from "../content";

const INK = "#3d2133";
const PAPER = "#fdf8e8";

/** Authored packshot: the product's real vessel shape, filled with its texture tint. */
export function Vessel({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { vessel, tint, step } = product;
  const label = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={PAPER} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 1}
        className="vessel-word"
        textAnchor="middle"
      >
        aura
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 13}
        className="vessel-step"
        textAnchor="middle"
      >
        {step === "tone" ? "essence" : step}
      </text>
    </g>
  );
  const shine = (x: number, y: number, h: number) => (
    <rect
      x={x}
      y={y}
      width="5"
      height={h}
      rx="2.5"
      fill="#fff"
      opacity="0.35"
    />
  );

  return (
    <svg
      className={"vessel " + className}
      viewBox="0 0 200 240"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="221" rx="60" ry="5" fill={INK} opacity="0.12" />
      {vessel === "dropper" && (
        <>
          <rect x="91" y="56" width="18" height="40" rx="9" fill={INK} />
          <rect x="86" y="94" width="28" height="18" rx="3" fill={INK} />
          <path
            d="M70 212V132q0-20 20-22h20q20 2 20 22v80q0 8-8 8H78q-8 0-8-8Z"
            fill={tint}
            stroke={INK}
            strokeOpacity=".25"
          />
          {shine(76, 128, 70)}
          {label(78, 146, 44, 50)}
        </>
      )}
      {vessel === "pump" && (
        <>
          <rect x="82" y="50" width="38" height="12" rx="4" fill={INK} />
          <rect x="116" y="52" width="26" height="7" rx="3.5" fill={INK} />
          <rect x="96" y="60" width="8" height="24" fill={INK} />
          <rect x="86" y="82" width="28" height="16" rx="3" fill={INK} />
          <rect
            x="64"
            y="96"
            width="72"
            height="124"
            rx="16"
            fill={tint}
            stroke={INK}
            strokeOpacity=".25"
          />
          {shine(72, 110, 92)}
          {label(76, 132, 48, 58)}
        </>
      )}
      {vessel === "bottle" && (
        <>
          <rect x="84" y="62" width="32" height="34" rx="4" fill={INK} />
          <path
            d="M68 212v-90q0-24 24-26h16q24 2 24 26v90q0 8-8 8H76q-8 0-8-8Z"
            fill={tint}
            stroke={INK}
            strokeOpacity=".25"
          />
          {shine(75, 120, 84)}
          {label(78, 140, 44, 54)}
        </>
      )}
      {vessel === "jar" && (
        <>
          <rect x="44" y="124" width="112" height="30" rx="7" fill={INK} />
          <rect
            x="48"
            y="150"
            width="104"
            height="70"
            rx="14"
            fill={tint}
            stroke={INK}
            strokeOpacity=".25"
          />
          {shine(56, 160, 48)}
          {label(70, 162, 60, 42)}
        </>
      )}
      {vessel === "tube" && (
        <>
          <rect
            x="58"
            y="44"
            width="84"
            height="14"
            rx="2"
            fill={INK}
            opacity=".85"
          />
          <path
            d="M60 58h80l-16 140H76Z"
            fill={tint}
            stroke={INK}
            strokeOpacity=".25"
          />
          <rect x="78" y="196" width="44" height="24" rx="5" fill={INK} />
          {shine(72, 72, 90)}
          {label(80, 104, 40, 56)}
        </>
      )}
      {vessel === "tin" && (
        <>
          <rect
            x="38"
            y="176"
            width="124"
            height="44"
            rx="9"
            fill={tint}
            stroke={INK}
            strokeOpacity=".25"
          />
          <rect x="34" y="158" width="132" height="26" rx="9" fill={INK} />
          {label(60, 186, 80, 30)}
        </>
      )}
    </svg>
  );
}
