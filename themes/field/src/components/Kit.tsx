import { useId } from "react";

/** The club crest: a shield in club green with hoops below a monogram F. */
export function Crest({ size = 40 }: { size?: number }) {
  const clip = useId();
  return (
    <svg
      className="crest"
      width={size}
      height={size * 1.18}
      viewBox="0 0 44 52"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <path d="M3 3h38v22c0 12-8 20-19 24C11 45 3 37 3 25z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="44" height="52" fill="var(--green)" />
        <rect y="30" width="44" height="4" fill="var(--chalk)" />
        <rect y="38" width="44" height="4" fill="var(--chalk)" />
        <rect y="46" width="44" height="4" fill="var(--chalk)" />
      </g>
      <path
        d="M3 3h38v22c0 12-8 20-19 24C11 45 3 37 3 25z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.4"
      />
      <path d="M15 9h15v4.4h-9.6v3.6h8v4.2h-8V27H15z" fill="var(--gold)" />
    </svg>
  );
}

/** The back of a club shirt with a squad number; keepers wear gold. */
export function Shirt({
  n,
  keeper = false,
  size = 64,
  title,
}: {
  n?: number;
  keeper?: boolean;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      className="shirt"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M22 5c2 4 6 6 10 6s8-2 10-6l13 6 7 14-9 5-3-5v34H14V25l-3 5-9-5 7-14z"
        fill={keeper ? "var(--gold)" : "var(--chalk)"}
      />
      {!keeper && (
        <path
          d="M17 7.5 22 5c2 4 6 6 10 6s8-2 10-6l5 2.5 3 17.5v34H14V25z"
          fill="var(--green)"
        />
      )}
      <path
        d="M22 5c2 4 6 6 10 6s8-2 10-6l13 6 7 14-9 5-3-5v34H14V25l-3 5-9-5 7-14z"
        className="shirt-edge"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {n !== undefined && (
        <text
          x="32"
          y="47"
          textAnchor="middle"
          className="shirt-n"
          fill={keeper ? "var(--ink)" : "var(--chalk)"}
        >
          {n}
        </text>
      )}
    </svg>
  );
}
