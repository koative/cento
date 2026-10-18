/** A class of twelve: one ring of companies, this year's first check marked in green. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={16 + Math.cos(a) * 11}
            cy={16 + Math.sin(a) * 11}
            r={i === 0 ? 3.4 : 2.2}
            fill={i === 0 ? "var(--accent)" : "currentColor"}
          />
        );
      })}
    </svg>
  );
}
