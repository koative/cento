import type { Colour, Kind } from "../content";

type Props = { kind: Kind; colour: Colour; label?: string; className?: string };

/** Front elevations of every product, drawn as flat geometry so each colourway is exact. */
export function ProductArt({ kind, colour, label, className = "" }: Props) {
  const { shell, trim } = colour;
  return (
    <svg
      viewBox="0 0 400 320"
      className={"product-art " + className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ ["--shell" as string]: shell, ["--trim" as string]: trim }}
    >
      <ellipse cx="200" cy="308" rx="150" ry="7" className="art-shadow" />
      {kind === "over" && <OverEar />}
      {kind === "fold" && <OverEar fold />}
      {kind === "kids" && <OnEar kids />}
      {kind === "on" && <OnEar />}
      {kind === "buds" && <Buds variant="stems" />}
      {kind === "lite" && <Buds variant="round" />}
      {kind === "sleep" && <Buds variant="sleep" />}
      {kind === "cushions" && <Cushions />}
      {kind === "case" && <Case />}
    </svg>
  );
}

function OverEar({ fold = false }: { fold?: boolean }) {
  const h = fold ? 94 : 110;
  const top = fold ? 204 : 194;
  return (
    <g>
      <path
        d="M92 196C92 66 308 66 308 196"
        className="band"
        strokeWidth={fold ? 14 : 18}
      />
      <path
        d="M110 170C116 92 284 92 290 170"
        className="pad"
        strokeWidth="9"
      />
      {fold && (
        <>
          <circle cx="104" cy="122" r="6" className="hinge" />
          <circle cx="296" cy="122" r="6" className="hinge" />
        </>
      )}
      <rect
        x="85"
        y="176"
        width="14"
        height={top - 166}
        rx="5"
        className="trim"
      />
      <rect
        x="301"
        y="176"
        width="14"
        height={top - 166}
        rx="5"
        className="trim"
      />
      <rect x="56" y={top} width="74" height={h} rx="32" className="shell" />
      <rect x="270" y={top} width="74" height={h} rx="32" className="shell" />
      <rect
        x="122"
        y={top + 8}
        width="22"
        height={h - 16}
        rx="11"
        className="trim"
      />
      <rect
        x="256"
        y={top + 8}
        width="22"
        height={h - 16}
        rx="11"
        className="trim"
      />
      <path d={`M70 ${top + 24}v${h - 48}`} className="sheen" />
      <path d={`M284 ${top + 24}v${h - 48}`} className="sheen" />
      <circle cx="326" cy={top + h - 22} r="3.5" className="led" />
    </g>
  );
}

function OnEar({ kids = false }: { kids?: boolean }) {
  const r = kids ? 52 : 46;
  return (
    <g>
      <path
        d="M104 210C96 72 304 72 296 210"
        className="band"
        strokeWidth={kids ? 22 : 12}
      />
      {!kids && (
        <path
          d="M120 176C124 104 276 104 280 176"
          className="pad"
          strokeWidth="7"
        />
      )}
      <circle cx="100" cy="236" r={r} className="shell" />
      <circle cx="300" cy="236" r={r} className="shell" />
      <ellipse cx={100 + r - 6} cy="236" rx="12" ry={r - 10} className="trim" />
      <ellipse cx={300 - r + 6} cy="236" rx="12" ry={r - 10} className="trim" />
      {kids ? (
        <>
          <circle cx="96" cy="236" r="18" className="sheen-fill" />
          <circle cx="304" cy="236" r="18" className="sheen-fill" />
        </>
      ) : (
        <>
          <circle cx="94" cy="236" r="24" className="ring" />
          <path d="M70 266C88 304 150 300 176 284" className="boom" />
          <rect
            x="170"
            y="275"
            width="26"
            height="15"
            rx="7.5"
            className="trim"
          />
          <circle cx="326" cy="262" r="3.5" className="led" />
        </>
      )}
    </g>
  );
}

function Buds({ variant }: { variant: "stems" | "round" | "sleep" }) {
  const r = variant === "sleep" ? 30 : 38;
  const cy = variant === "stems" ? 104 : 118;
  const small = variant === "sleep";
  return (
    <g>
      <rect
        x={small ? 140 : 118}
        y={small ? 214 : 192}
        width={small ? 120 : 164}
        height={small ? 84 : 108}
        rx={small ? 38 : 50}
        className="shell"
      />
      <path d={small ? "M144 244H256" : "M122 230H278"} className="seam" />
      <circle cx="200" cy={small ? 280 : 276} r="3.5" className="led" />
      {[104, 296].map((cx, i) => {
        const dir = i === 0 ? 1 : -1;
        return (
          <g key={cx}>
            {variant === "stems" && (
              <rect
                x={cx - 11}
                y={cy + 8}
                width="22"
                height="78"
                rx="11"
                className="shell"
              />
            )}
            <circle cx={cx} cy={cy} r={r} className="shell" />
            <circle
              cx={cx - dir * 5}
              cy={cy - 5}
              r={r * 0.42}
              className="sheen-fill"
            />
            <ellipse
              cx={cx + dir * (r - 2)}
              cy={cy + r * 0.45}
              rx="19"
              ry="15"
              className="trim"
            />
            {small && (
              <path
                d={`M${cx - dir * 6} ${cy - r - 5}q${dir * -34} 12 ${dir * -28} 50`}
                className="wing"
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

function Cushions() {
  return (
    <g>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 150} ${i * 14})`}>
          <rect
            x="62"
            y="62"
            width="126"
            height="190"
            rx="58"
            className="shell"
          />
          <rect
            x="92"
            y="102"
            width="66"
            height="110"
            rx="33"
            className="mesh"
          />
          <path d="M80 96v122" className="sheen" />
        </g>
      ))}
    </g>
  );
}

function Case() {
  return (
    <g>
      <rect x="272" y="56" width="40" height="44" rx="20" className="loop" />
      <rect x="64" y="84" width="272" height="196" rx="92" className="shell" />
      <rect
        x="80"
        y="100"
        width="240"
        height="164"
        rx="78"
        className="stitch"
      />
      <path d="M96 182H304" className="seam" />
      <path d="M110 130c40-18 140-18 180 0" className="sheen" />
    </g>
  );
}
