import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export const num = new Intl.NumberFormat("en-US");
export const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

/** +6.2% / −2.1% with a real minus sign. */
export function signed(n: number) {
  return (n > 0 ? "+" : n < 0 ? "\u2212" : "") + Math.abs(n).toFixed(1) + "%";
}

/** "11.8% → 14.4%" for a before/after customer metric. */
export function metricLine(m: { before: number; after: number; unit: string }) {
  return `${m.before}${m.unit} → ${m.after}${m.unit}`;
}

export function Delta({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span className="delta" data-dir={up ? "up" : "down"}>
      {up ? (
        <ArrowUpRight size={14} aria-hidden />
      ) : (
        <ArrowDownRight size={14} aria-hidden />
      )}
      {signed(value)}
    </span>
  );
}

/** Event names break after underscores instead of overflowing narrow columns. */
export function EventName({ id }: { id: string }) {
  const parts = id.split("_");
  return (
    <code className="event-name">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && (
            <>
              _<wbr />
            </>
          )}
        </span>
      ))}
    </code>
  );
}
