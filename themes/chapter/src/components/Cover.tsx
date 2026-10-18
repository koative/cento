import type { Motif, Show } from "../content";

/* Square show artwork, set like a small-press jacket: one motif, the title, the imprint. */
function MotifArt({
  motif,
  fg,
  mark,
}: {
  motif: Motif;
  fg: string;
  mark: string;
}) {
  switch (motif) {
    case "contours":
      return (
        <g fill="none" stroke={fg} strokeWidth="2" opacity="0.75">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse
              key={i}
              cx="292"
              cy="112"
              rx={22 + i * 26}
              ry={14 + i * 17}
              transform="rotate(-16 292 112)"
            />
          ))}
          <circle cx="292" cy="112" r="7" fill={mark} stroke="none" />
        </g>
      );
    case "drafts":
      return (
        <g stroke={fg} strokeWidth="5" strokeLinecap="round">
          {[150, 112, 160, 96, 140, 120].map((w, i) => (
            <line
              key={i}
              x1="190"
              x2={190 + w}
              y1={56 + i * 26}
              y2={56 + i * 26}
              opacity="0.7"
            />
          ))}
          <line
            x1="180"
            x2="364"
            y1="84"
            y2="76"
            stroke={mark}
            strokeWidth="6"
          />
          <line
            x1="180"
            x2="330"
            y1="162"
            y2="154"
            stroke={mark}
            strokeWidth="6"
          />
        </g>
      );
    case "clock":
      return (
        <g fill="none" stroke={fg} strokeWidth="2.5">
          <circle cx="290" cy="118" r="76" opacity="0.55" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={290 + Math.sin(a) * 64}
                y1={118 - Math.cos(a) * 64}
                x2={290 + Math.sin(a) * 74}
                y2={118 - Math.cos(a) * 74}
              />
            );
          })}
          <path
            d="M 355.8 80 A 76 76 0 0 1 290 194"
            stroke={fg}
            strokeWidth="10"
          />
          <line
            x1="290"
            y1="118"
            x2="290"
            y2="62"
            stroke={mark}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="290"
            y1="118"
            x2="326"
            y2="140"
            stroke={mark}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      );
    case "crosshair":
      return (
        <g fill={fg}>
          {Array.from({ length: 36 }, (_, i) => (
            <circle
              key={i}
              cx={210 + (i % 6) * 30}
              cy={40 + Math.floor(i / 6) * 30}
              r="3"
              opacity="0.6"
            />
          ))}
          <g fill="none" stroke={mark} strokeWidth="4">
            <circle cx="300" cy="100" r="34" />
            <line x1="300" y1="50" x2="300" y2="150" />
            <line x1="250" y1="100" x2="350" y2="100" />
          </g>
        </g>
      );
    case "plates":
      return (
        <g fill="none" stroke={fg} strokeWidth="3">
          <circle cx="252" cy="112" r="68" />
          <circle cx="252" cy="112" r="48" opacity="0.5" />
          <circle
            cx="318"
            cy="150"
            r="68"
            fill={mark}
            fillOpacity="0.85"
            stroke="none"
          />
          <circle cx="318" cy="150" r="48" stroke={fg} opacity="0.6" />
        </g>
      );
    case "staves":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              x2="400"
              y1={60 + i * 16}
              y2={60 + i * 16}
              stroke={fg}
              strokeWidth="2"
              opacity="0.7"
            />
          ))}
          <line
            x1="300"
            x2="300"
            y1="60"
            y2="124"
            stroke={fg}
            strokeWidth="3"
          />
          {[
            [196, 116],
            [232, 100],
            [264, 84],
            [336, 68],
            [368, 92],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="11"
              ry="8"
              transform={`rotate(-20 ${x} ${y})`}
              fill={mark}
            />
          ))}
        </g>
      );
  }
}

export function Cover({ show, label }: { show: Show; label?: string }) {
  const { bg, fg, mark, motif } = show.cover;
  const lines = show.coverLines;
  const top = 360 - (lines.length - 1) * 60;
  return (
    <svg
      className="cover"
      viewBox="0 0 400 400"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <rect width="400" height="400" fill={bg} />
      <MotifArt motif={motif} fg={fg} mark={mark} />
      <text x="32" y="48" className="cover-imprint" fill={fg}>
        chapter.
      </text>
      <text className="cover-title" fill={fg}>
        {lines.map((l, i) => (
          <tspan key={l} x="30" y={top + i * 60}>
            {l}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
