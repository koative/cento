import { useId } from "react";

type Props = {
  initials: string;
  register: number;
  craft: string;
  size?: number;
  className?: string;
};

/** A member's guild mark: register number and craft set around their initials, struck like an ink stamp. */
export function Hallmark({
  initials,
  register,
  craft,
  size = 96,
  className = "",
}: Props) {
  const id = useId();
  const ring = `GUILD · No. ${String(register).padStart(4, "0")} · ${craft.toUpperCase()} · `;
  return (
    <svg
      className={`hallmark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <path id={id} d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
      </defs>
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="50"
        cy="50"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text className="hallmark-ring" fontSize="7.4" letterSpacing="0.6">
        <textPath href={`#${id}`} textLength="228" lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      <text
        className="hallmark-initials"
        x="50"
        y="58.5"
        textAnchor="middle"
        fontSize="24"
      >
        {initials}
      </text>
    </svg>
  );
}

export const initialsOf = (name: string) =>
  name
    .split(/[\s-]+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
