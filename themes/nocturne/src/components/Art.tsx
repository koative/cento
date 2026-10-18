import type { Glass as GlassKind } from "../content";

/** The house mark: a record whose label is a crescent moon. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="16"
        r="14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="16"
        cy="16"
        r="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <circle
        cx="16"
        cy="16"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.55"
      />
      <path
        d="M17.6 10.6a5.6 5.6 0 1 0 3.9 8.6 4.5 4.5 0 1 1-3.9-8.6z"
        fill="currentColor"
      />
    </svg>
  );
}

const glassShapes: Record<
  GlassKind,
  { glass: string; liquid: string; extra?: string }
> = {
  rocks: {
    glass: "M13 26h38l-3 48H16z",
    liquid: "M14.6 44h34.8l-1.8 28H16.4z",
    extra: "M22 47h16v14H22z",
  },
  coupe: {
    glass: "M6 20h52c-2 18-13 26-26 26S8 38 6 20zM32 46v26M20 74h24",
    liquid: "M9 25h46c-3 12-12 17-23 17S12 37 9 25z",
  },
  nick: {
    glass: "M15 12h34c0 22-7 32-17 32S15 34 15 12zM32 44v28M21 74h22",
    liquid: "M16.4 20h31.2c-1 15-7 21-15.6 21S17.4 35 16.4 20z",
  },
  highball: {
    glass: "M19 8h26l-1.5 66h-23z",
    liquid: "M20.6 20h22.8l-1.2 52H21.8z",
    extra: "M27 24h10v42H27z",
  },
};

/** Line drawing of the glass a drink is served in, filled to the drink's colour. */
export function Glass({
  kind,
  color,
  className = "",
}: {
  kind: GlassKind;
  color: string;
  className?: string;
}) {
  const s = glassShapes[kind];
  return (
    <svg
      className={`glass ${className}`}
      viewBox="0 0 64 80"
      aria-hidden="true"
    >
      <path d={s.liquid} fill={color} opacity="0.92" />
      {s.extra && (
        <path
          d={s.extra}
          fill="none"
          stroke="var(--cream)"
          strokeWidth="0.8"
          opacity="0.5"
        />
      )}
      <path
        d={s.glass}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
