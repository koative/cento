/** A film reel seen face-on: rim, hub and five spoke holes, beside the name set in the display face. */
export function Wordmark() {
  const holes = [0, 72, 144, 216, 288].map((deg) => {
    const r = (deg - 90) * (Math.PI / 180);
    return [12 + Math.cos(r) * 5.6, 12 + Math.sin(r) * 5.6];
  });
  return (
    <span className="wordmark">
      <svg className="reel-mark" viewBox="0 0 24 24" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        {holes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" fill="currentColor" />
        ))}
      </svg>
      <span>Reel</span>
    </span>
  );
}
