const pad = (n: number) => String(n).padStart(2, "0");

/** 1060 → "17:40", 3725 → "1:02:05". */
export function clock(sec: number) {
  const s = Math.floor(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${m}:${pad(s % 60)}`;
}

/** 2538 → "42 min". */
export const minutes = (sec: number) => `${Math.round(sec / 60)} min`;

/** Screen-reader time: "17 minutes 40 seconds". */
export function spoken(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m} minute${m === 1 ? "" : "s"} ${s} second${s === 1 ? "" : "s"}`;
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
/** "2026-10-13" → "Oct 13, 2026" (parsed as a calendar date, not UTC midnight). */
export function date(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return dateFmt.format(new Date(y, m - 1, d));
}

export const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const count = new Intl.NumberFormat("en-US");

export const emailOk = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
