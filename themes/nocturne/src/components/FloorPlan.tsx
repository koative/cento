/** The room from above, with the chosen seating zone lit. Zone ids match content.zones. */
export function FloorPlan({ zone }: { zone: string }) {
  const lit = (id: string) => (zone === id ? "" : undefined);
  return (
    <svg
      className="plan"
      viewBox="0 0 360 230"
      role="img"
      aria-label={`Floor plan of the bar with the ${zone} area highlighted`}
    >
      <rect x="4" y="4" width="352" height="222" rx="6" className="plan-wall" />
      <path d="M150 226v-14h60v14" className="plan-door" />
      <text x="180" y="206" textAnchor="middle" className="plan-note">
        stairs
      </text>

      <g className="plan-zone" data-lit={lit("counter")}>
        <rect
          x="18"
          y="22"
          width="34"
          height="168"
          rx="4"
          className="plan-fill"
        />
        {Array.from({ length: 10 }, (_, i) => 30 + i * 16).map((y) => (
          <circle key={y} cx="68" cy={y} r="6" className="plan-seat" />
        ))}
        <text
          x="35"
          y="110"
          textAnchor="middle"
          transform="rotate(-90 35 110)"
          className="plan-label"
        >
          bar counter
        </text>
      </g>

      <g className="plan-fixed">
        <rect x="186" y="16" width="36" height="28" rx="3" />
        <rect x="300" y="16" width="36" height="28" rx="3" />
        <rect x="236" y="20" width="50" height="18" rx="2" />
        <text x="261" y="56" textAnchor="middle" className="plan-note">
          horns · desk
        </text>
      </g>

      <g className="plan-zone" data-lit={lit("listening")}>
        {Array.from({ length: 12 }, (_, i) => 100 + i * 22).map((x) => (
          <rect
            key={x}
            x={x - 9}
            y="84"
            width="18"
            height="20"
            rx="5"
            className="plan-seat"
          />
        ))}
        <text x="220" y="126" textAnchor="middle" className="plan-label">
          listening row
        </text>
      </g>

      <g className="plan-zone" data-lit={lit("booth")}>
        {[114, 248, 316].map((x) => (
          <g key={x}>
            <path d={`M${x - 28} 150h56v40h-56z`} className="plan-fill" />
            <rect
              x={x - 17}
              y="160"
              width="34"
              height="20"
              rx="3"
              className="plan-seat"
            />
          </g>
        ))}
        <text x="282" y="214" textAnchor="middle" className="plan-label">
          booths
        </text>
      </g>
    </svg>
  );
}
