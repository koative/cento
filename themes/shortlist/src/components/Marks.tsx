import type { Company } from "../content";

/** The red-pen loop a reader draws around a classified ad. Stretches over whatever it wraps. */
export function PenLoop() {
  return (
    <svg
      className="pen-loop"
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 40 C6 22 52 6 104 5 C158 4 196 14 194 31 C192 49 140 57 92 56 C44 55 6 49 7 33 C8 21 30 12 58 9" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wordmark-text">Shortlist</span>
      <PenLoop />
    </span>
  );
}

/** Authored monogram for a fictional employer: a flat shape in its colour with its initials. */
export function CompanyMark({
  company,
  size = 44,
}: {
  company: Company;
  size?: number;
}) {
  const { shape, bg, fg } = company.mark;
  const initials = company.name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <svg
      className="company-mark"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
    >
      {shape === "circle" && <circle cx="22" cy="22" r="21" fill={bg} />}
      {shape === "square" && (
        <rect x="1" y="1" width="42" height="42" rx="6" fill={bg} />
      )}
      {shape === "arch" && <path d="M2 43V22a20 20 0 0 1 40 0v21z" fill={bg} />}
      {shape === "diamond" && <path d="M22 1 43 22 22 43 1 22z" fill={bg} />}
      <text
        x="22"
        y={shape === "arch" ? 31 : 27.5}
        textAnchor="middle"
        fill={fg}
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        {initials}
      </text>
    </svg>
  );
}
