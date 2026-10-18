import { shadeLevels } from "../content";

/** Three swatch tufts from the level chart (3, 6, 8) beside the name. */
export function Wordmark() {
  const tufts = [3, 6, 8].map((n) => shadeLevels[n - 1].hex);
  return (
    <span className="wordmark">
      <svg viewBox="0 0 30 34" width="26" height="30" aria-hidden="true">
        {tufts.map((fill, i) => (
          <path
            key={fill}
            d={`M${2 + i * 9} 2h7v24a3.5 3.5 0 0 1-7 0z`}
            fill={fill}
          />
        ))}
      </svg>
      <span className="wordmark-name">Chroma</span>
    </span>
  );
}
