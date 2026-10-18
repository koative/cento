const nf = new Intl.NumberFormat("en-US");

export const num = (n: number) => nf.format(n);

export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const date = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** Small deterministic PRNG so illustrative history (uptime bars) is stable between renders. */
export function seeded(seed: number) {
  let t = seed * 2654435761;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export const statusClass = (status: number) =>
  status < 300 ? "ok" : status < 500 ? "warn" : "err";
