import { useId } from "react";

/** The clinic's round rubber stamp, inked onto a record card. */
export function Stamp({
  label = "Given",
  date,
  tilt = -6,
}: {
  label?: string;
  date?: string;
  tilt?: number;
}) {
  const ring = useId();
  return (
    <svg
      className="stamp"
      viewBox="0 0 100 100"
      style={{ rotate: `${tilt}deg` }}
      aria-hidden="true"
    >
      <defs>
        <path id={ring} d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
      </defs>
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="50"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text className="stamp-ring">
        <textPath href={`#${ring}`} startOffset="0">
          WHISKER VETERINARY · ALDER ST ·
        </textPath>
      </text>
      <text
        x="50"
        y={date ? 50 : 56}
        textAnchor="middle"
        className="stamp-label"
      >
        {label.toUpperCase()}
      </text>
      {date && (
        <text x="50" y="63" textAnchor="middle" className="stamp-date">
          {date}
        </text>
      )}
    </svg>
  );
}
