/** A deterministic bar pattern drawn from the value, like the strip on a hang tag or raffle stub. Decorative: the value is printed beside it. */
export function Barcode({
  value,
  height = 40,
}: {
  value: string;
  height?: number;
}) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of value + value.split("").reverse().join("")) {
    const code = ch.charCodeAt(0) * 37;
    for (let bit = 0; bit < 4; bit++) {
      const w = 1 + ((code >> bit) & 1) + ((code >> (bit + 4)) & 1);
      bars.push({ x, w });
      x += w + 1 + ((code >> (bit + 2)) & 1);
    }
  }
  return (
    <svg
      className="barcode"
      viewBox={`0 0 ${x} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bars.map((b) => (
        <rect key={b.x} x={b.x} width={b.w} height={height} />
      ))}
    </svg>
  );
}
