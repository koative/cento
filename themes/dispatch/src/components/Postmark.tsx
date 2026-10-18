import { useId } from "react";

type Props = { ring: string; day: string; month: string; className?: string };

/** A circular cancellation stamp: ring text (issue + place) around a day/month centre, with wavy cancel lines. */
export function Postmark({ ring, day, month, className = "" }: Props) {
  const id = useId();
  return (
    <svg
      className={`postmark ${className}`}
      viewBox="0 0 220 120"
      aria-hidden="true"
    >
      <defs>
        <path id={id} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="33"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <text className="postmark-ring">
        <textPath
          href={`#${id}`}
          startOffset="0"
          textLength="270"
          lengthAdjust="spacing"
        >
          {ring}
        </textPath>
      </text>
      <text x="60" y="60" textAnchor="middle" className="postmark-day">
        {day}
      </text>
      <text x="60" y="78" textAnchor="middle" className="postmark-month">
        {month}
      </text>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {[34, 50, 66, 82].map((y) => (
          <path key={y} d={`M124 ${y} q12 -8 24 0 t24 0 t24 0 t20 0`} />
        ))}
      </g>
    </svg>
  );
}

/** Postmark ring/day/month for an ISO date. */
export function stampFor(iso: string, label: string) {
  const d = new Date(iso + "T12:00:00");
  return {
    ring: `${label} · DISPATCH · ${d.getFullYear()} · `.toUpperCase(),
    day: String(d.getDate()),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}
