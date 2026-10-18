import type { MarkKind } from "../content";

/** The studio's asterisk, drawn in a 200-unit box. */
export const ASTERISK =
  "M82 0h36v63l45-45 25 25-45 45h57v36h-57l45 45-25 25-45-45v51H82v-51l-45 45-25-25 45-45H0V88h57L12 43l25-25 45 45z";

const LEAF = "M50 50H25A25 25 0 0 1 0 25 25 25 0 0 1 25 0a25 25 0 0 1 25 25z";

/**
 * Client marks as SVG groups in a 100×100 box. `fg` draws the mark, `accent` its second colour.
 * Use inside an <svg> (or via <MarkSvg/>), positioned with a transform.
 */
export function MarkShape({
  kind,
  fg,
  accent,
}: {
  kind: MarkKind;
  fg: string;
  accent: string;
}) {
  switch (kind) {
    case "asterisk":
      return <path d={ASTERISK} transform="scale(.5)" fill={fg} />;
    case "discs":
      return (
        <g>
          <ellipse cx="42" cy="30" rx="34" ry="20" fill={fg} />
          <ellipse cx="58" cy="52" rx="34" ry="20" fill={accent} />
          <ellipse cx="40" cy="76" rx="26" ry="16" fill={fg} />
        </g>
      );
    case "wave":
      return (
        <path
          d="M8 50C22 12 36 12 50 50s28 38 42 0"
          fill="none"
          stroke={fg}
          strokeWidth="16"
          strokeLinecap="round"
        />
      );
    case "sun":
      return (
        <g fill={fg}>
          <circle cx="50" cy="50" r="22" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x="47"
              y="4"
              width="6"
              height="16"
              rx="3"
              transform={`rotate(${i * 30} 50 50)`}
              fill={i % 2 ? accent : fg}
            />
          ))}
        </g>
      );
    case "petals":
      return (
        <g>
          {[0, 90, 180, 270].map((r, i) => (
            <path
              key={r}
              d={LEAF}
              fill={i === 1 ? accent : fg}
              transform={`rotate(${r} 50 50)`}
            />
          ))}
        </g>
      );
    case "tide":
      return (
        <g fill="none" stroke={fg} strokeWidth="9" strokeLinecap="round">
          <path d="M8 30c14-12 28-12 42 0s28 12 42 0" />
          <path d="M8 52c14-12 28-12 42 0s28 12 42 0" stroke={accent} />
          <path d="M8 74c14-12 28-12 42 0s28 12 42 0" />
        </g>
      );
    case "orbit":
      return (
        <g>
          <circle cx="50" cy="50" r="24" fill={fg} />
          <ellipse
            cx="50"
            cy="50"
            rx="46"
            ry="13"
            fill="none"
            stroke={accent}
            strokeWidth="6"
            transform="rotate(-22 50 50)"
          />
        </g>
      );
    case "moon":
      return <path d="M58 8a42 42 0 1 0 34 62A34 34 0 1 1 58 8z" fill={fg} />;
    case "ring":
      return (
        <g fill="none" strokeWidth="20">
          <circle cx="50" cy="50" r="36" stroke={fg} />
          <circle
            cx="50"
            cy="50"
            r="36"
            stroke={accent}
            strokeDasharray="18.85 37.7"
            strokeDashoffset="9.4"
          />
        </g>
      );
  }
}

export function MarkSvg({
  kind,
  fg,
  accent,
  className,
}: {
  kind: MarkKind;
  fg: string;
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <MarkShape kind={kind} fg={fg} accent={accent} />
    </svg>
  );
}
