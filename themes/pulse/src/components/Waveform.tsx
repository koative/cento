/** A waveform drawn from the artist's name, so every act gets its own mark without a press photo. */
export function Waveform({
  seed,
  bars = 64,
  className = "",
}: {
  seed: string;
  bars?: number;
  className?: string;
}) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  const w = 10;
  const heights = Array.from({ length: bars }, (_, i) => {
    const envelope = Math.sin((Math.PI * (i + 0.5)) / bars) ** 0.6;
    return Math.max(6, envelope * (40 + rand() * 60));
  });

  return (
    <svg
      className={`waveform ${className}`}
      viewBox={`0 0 ${bars * w} 200`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {heights.map((v, i) => (
        <rect
          key={i}
          x={i * w + 2}
          y={100 - v}
          width={w - 4}
          height={v * 2}
          rx="1"
        />
      ))}
    </svg>
  );
}
