import type { ReactElement } from "react";
import type { Figure } from "../content";

/** A numbered leader: a line from the part to a circled callout number with a label. */
function Callout({
  n,
  from,
  to,
  label,
  anchor = "start",
}: {
  n: number;
  from: [number, number];
  to: [number, number];
  label: string;
  anchor?: "start" | "end";
}) {
  const dx = anchor === "start" ? 18 : -18;
  return (
    <g>
      <path
        d={`M${from[0]} ${from[1]} L${to[0]} ${to[1]}`}
        className="fig-leader"
      />
      <circle cx={to[0]} cy={to[1]} r="11" className="fig-num" />
      <text
        x={to[0]}
        y={to[1] + 4}
        textAnchor="middle"
        className="fig-num-text"
      >
        {n}
      </text>
      <text
        x={to[0] + dx}
        y={to[1] + 4}
        textAnchor={anchor}
        className="fig-label"
      >
        {label}
      </text>
    </g>
  );
}

function Reader() {
  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      aria-label="Diagram of the Counter Reader R2 with its light bar, power button and USB-C port labelled"
    >
      <rect
        x="185"
        y="30"
        width="150"
        height="230"
        rx="24"
        className="fig-body"
      />
      <rect
        x="199"
        y="44"
        width="122"
        height="150"
        rx="12"
        className="fig-face"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={226 + i * 18}
          y="56"
          width="12"
          height="5"
          rx="2.5"
          className={i === 0 ? "fig-led fig-led-on" : "fig-led"}
        />
      ))}
      {[14, 26, 38].map((r) => (
        <path
          key={r}
          d={`M244 ${124 - r} A${r} ${r} 0 0 1 244 ${124 + r}`}
          className="fig-thin"
        />
      ))}
      <path d="M215 228 H305" className="fig-slot" />
      <text x="260" y="246" textAnchor="middle" className="fig-small">
        chip
      </text>
      <rect x="335" y="96" width="7" height="34" rx="3" className="fig-part" />
      <rect
        x="244"
        y="258"
        width="32"
        height="7"
        rx="3.5"
        className="fig-part"
      />
      <Callout
        n={1}
        from={[226, 58]}
        to={[120, 58]}
        label="Light bar"
        anchor="end"
      />
      <Callout n={2} from={[342, 113]} to={[410, 113]} label="Power" />
      <Callout n={3} from={[276, 262]} to={[410, 262]} label="USB-C" />
    </svg>
  );
}

function Printer() {
  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      aria-label="Side view of the P80 printer with the lid open, showing the paper roll feeding from underneath toward the tear bar"
    >
      <path d="M120 250 V150 H360 L400 190 V250 Z" className="fig-body" />
      <path d="M360 150 L330 60 L250 50" className="fig-lid" />
      <circle cx="250" cy="185" r="44" className="fig-face" />
      <circle cx="250" cy="185" r="8" className="fig-part" />
      <path
        d="M250 229 C 320 229, 360 214, 372 176 L 386 146"
        className="fig-paper"
      />
      <rect x="378" y="134" width="22" height="6" rx="2" className="fig-part" />
      <rect x="118" y="196" width="8" height="26" rx="3" className="fig-part" />
      <Callout
        n={1}
        from={[118, 209]}
        to={[70, 209]}
        label="Lever"
        anchor="end"
      />
      <Callout
        n={2}
        from={[300, 226]}
        to={[300, 280]}
        label="Paper off the bottom"
      />
      <Callout n={3} from={[400, 137]} to={[440, 90]} label="Tear bar" />
    </svg>
  );
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

function Payout() {
  const x = (i: number) => 24 + i * 76;
  const cutoff = (i: number) => x(i) + 52;
  return (
    <svg
      viewBox="0 0 640 210"
      role="img"
      aria-label="Weekly payout timeline: sales before 6 pm Monday to Thursday are paid the next day; Friday evening to Sunday are paid together on Monday"
    >
      <defs>
        <marker
          id="payout-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fig-arrowhead" />
        </marker>
      </defs>
      {days.map((d, i) => (
        <g key={i}>
          <rect
            x={x(i)}
            y="52"
            width="68"
            height="34"
            rx="3"
            className="fig-face"
          />
          {i < 7 && (
            <rect
              x={x(i)}
              y="52"
              width="52"
              height="34"
              rx="3"
              className={i < 5 ? "fig-sales" : "fig-sales fig-sales-held"}
            />
          )}
          {i < 7 && <path d={`M${cutoff(i)} 46 V92`} className="fig-cut" />}
          <text x={x(i) + 34} y="108" textAnchor="middle" className="fig-label">
            {d}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${x(i) + 26} 48 C ${x(i) + 26} 18, ${x(i + 1) + 26} 18, ${x(i + 1) + 26} 46`}
          className="fig-flow"
          markerEnd="url(#payout-arrow)"
        />
      ))}
      <path
        d={`M${cutoff(4)} 122 V130 H${x(7) - 8} V122`}
        className="fig-bracket"
      />
      <path
        d={`M${(cutoff(4) + x(7) - 8) / 2} 130 V150 H${x(7) + 60} V90`}
        className="fig-flow fig-flow-strong"
        markerEnd="url(#payout-arrow)"
      />
      <text
        x={(cutoff(4) + x(7)) / 2}
        y="172"
        textAnchor="middle"
        className="fig-label"
      >
        Friday 6 pm to Sunday: paid together Monday
      </text>
      <text x={x(0)} y="200" className="fig-small">
        Dashed line: 6 pm ET cutoff
      </text>
    </svg>
  );
}

const figures: Record<Figure, () => ReactElement> = {
  reader: Reader,
  printer: Printer,
  payout: Payout,
};

export function FigureArt({ figure }: { figure: Figure }) {
  const Art = figures[figure];
  return <Art />;
}
