import { envelopes } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const usdRound = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Accounting-style money: true minus sign, optional cents, optional leading plus. */
export function money(n: number, { cents = true, sign = false } = {}) {
  const s = (cents ? usd : usdRound).format(Math.abs(n));
  if (n < 0 && Math.abs(n) >= 0.005) return "\u2212" + s;
  return sign && n > 0 ? "+" + s : s;
}

export function shortDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function categoryName(id: string) {
  if (id === "income") return "Income";
  if (id === "transfer") return "Transfer";
  return envelopes.find((e) => e.id === id)?.name ?? "Uncategorised";
}
