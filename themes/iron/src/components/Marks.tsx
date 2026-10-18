import { categories, type CategoryId } from "../content";

/** IRON with a bumper plate, seen face-on, standing in for the O. */
export function Wordmark() {
  return (
    <span className="wordmark" aria-hidden="true">
      IR
      <svg viewBox="0 0 40 40" className="wordmark-o">
        <circle cx="20" cy="20" r="18" fill="var(--red)" />
        <circle
          cx="20"
          cy="20"
          r="11"
          fill="none"
          stroke="var(--rubber)"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="20" cy="20" r="5.5" fill="var(--steel-light)" />
        <circle cx="20" cy="20" r="2.6" fill="var(--rubber)" />
      </svg>
      N
    </span>
  );
}

/** A class family's colour as a small plate, with the name for anyone who can't tell red from green. */
export function Disc({
  category,
  label = false,
}: {
  category: CategoryId;
  label?: boolean;
}) {
  const c = categories.find((x) => x.id === category)!;
  return (
    <span className="disc-tag">
      <svg viewBox="0 0 20 20" className="disc" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill={c.plate} />
        <circle cx="10" cy="10" r="3" fill="var(--rubber)" />
      </svg>
      {label ? c.name : <span className="sr-only">{c.name}</span>}
    </span>
  );
}
