import { home } from "../content";

/* Section drawing of a dilution refrigerator: six plated stages, coax lines carrying pulses down to the chip. */
const CX = 170;
const PLATES = [
  { y: 36, w: 280 },
  { y: 140, w: 244 },
  { y: 236, w: 208 },
  { y: 330, w: 164 },
  { y: 414, w: 140 },
  { y: 498, w: 120 },
];
const LINES = [-42, -18, 18, 42];

export function Cryostat() {
  return (
    <figure className="cryostat">
      <svg viewBox="0 0 560 640" role="img" aria-labelledby="cryo-title">
        <title id="cryo-title">
          Section drawing of a Helix dilution refrigerator: six gold-plated
          stages from 300 kelvin at the top to 9 millikelvin at the mixing
          chamber, where the processor is mounted.
        </title>

        {/* support rods between stages */}
        {PLATES.slice(1).map((p, i) => {
          const up = PLATES[i];
          const inset = p.w / 2 - 14;
          return (
            <g key={p.y} className="cryo-rod">
              <line x1={CX - inset} y1={up.y + 12} x2={CX - inset} y2={p.y} />
              <line x1={CX + inset} y1={up.y + 12} x2={CX + inset} y2={p.y} />
            </g>
          );
        })}

        {/* heat exchanger between still and mixing chamber */}
        <polyline
          className="cryo-exchanger"
          points={Array.from(
            { length: 13 },
            (_, i) => `${CX + 54 + (i % 2 ? 10 : -10)},${342 + i * 12.5}`,
          ).join(" ")}
        />

        {/* coax lines and travelling pulses */}
        {LINES.map((dx, i) => (
          <g key={dx}>
            <line
              className="cryo-coax"
              x1={CX + dx}
              y1={12}
              x2={CX + dx * 0.4}
              y2={556}
            />
            <line
              className="cryo-pulse"
              style={{ animationDelay: `${i * 0.55}s` }}
              x1={CX + dx}
              y1={12}
              x2={CX + dx * 0.4}
              y2={556}
            />
          </g>
        ))}

        {/* attenuators at 4 K and cold plate */}
        {[236, 414].map((y) =>
          LINES.map((dx) => {
            const x = CX + dx * (1 - (0.6 * (y - 12)) / 544);
            return (
              <rect
                key={`${y}${dx}`}
                className="cryo-atten"
                x={x - 5}
                y={y - 22}
                width={10}
                height={16}
                rx={2}
              />
            );
          }),
        )}

        {PLATES.map((p) => (
          <rect
            key={p.y}
            className="cryo-plate"
            x={CX - p.w / 2}
            y={p.y}
            width={p.w}
            height={12}
            rx={2}
          />
        ))}

        {/* sample holder and chip */}
        <rect
          className="cryo-holder"
          x={CX - 34}
          y={540}
          width={68}
          height={52}
          rx={4}
        />
        <rect
          className="cryo-chip"
          x={CX - 14}
          y={556}
          width={28}
          height={28}
        />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <circle
              key={`${r}${c}`}
              className="cryo-qubit"
              cx={CX - 8 + c * 8}
              cy={562 + r * 8}
              r={2}
            />
          )),
        )}

        {/* stage labels */}
        {PLATES.map((p, i) => {
          const s = home.stages[i];
          return (
            <g key={s.temp} className="cryo-label">
              <line x1={CX + p.w / 2 + 6} y1={p.y + 6} x2={352} y2={p.y + 6} />
              <circle cx={352} cy={p.y + 6} r={2.5} />
              <text x={364} y={p.y + 12} className="cryo-temp">
                {s.temp}
              </text>
              <text x={364} y={p.y + 32} className="cryo-desc">
                {s.label.split(",")[0]}
              </text>
            </g>
          );
        })}
        <g className="cryo-label">
          <line x1={CX + 40} y1={570} x2={352} y2={570} />
          <circle cx={352} cy={570} r={2.5} />
          <text x={364} y={576} className="cryo-temp cryo-chip-label">
            Processor
          </text>
        </g>
      </svg>
    </figure>
  );
}
