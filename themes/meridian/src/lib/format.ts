import { agents, areas, type Area, type Listing } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const money = (n: number) => usd.format(n);

/** Full price with the rent period, e.g. "$865,000" or "$2,650 / month". */
export const price = (l: Listing) =>
  money(l.price) + (l.mode === "rent" ? " / month" : "");

/** Short label for map pins: $865k, $1.45m, $2,650. */
export function pinPrice(l: Listing) {
  if (l.mode === "rent") return money(l.price);
  return l.price >= 1e6
    ? `$${(l.price / 1e6).toFixed(2).replace(/0$/, "")}m`
    : `$${Math.round(l.price / 1000)}k`;
}

export const areaOf = (slug: string) =>
  areas.find((a) => a.slug === slug) as Area;
export const agentOf = (id: string) => agents.find((a) => a.id === id)!;

export const date = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

/** Indicative value range from the area's recent price per square foot, adjusted for type, condition and extras, rounded to $5,000. */
export function estimate(
  area: Area,
  sqft: number,
  opts: { condition?: number; type?: number; extras?: number } = {},
) {
  const mid =
    area.pricePerSqft *
    sqft *
    (opts.condition ?? 1) *
    (opts.type ?? 1) *
    (1 + (opts.extras ?? 0));
  const round = (n: number) => Math.round(n / 5000) * 5000;
  return { low: round(mid * 0.94), high: round(mid * 1.06) };
}

/** Standard amortised monthly repayment. */
export function monthlyPayment(
  principal: number,
  annualRatePct: number,
  years: number,
) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  return r === 0 ? principal / n : (principal * r) / (1 - (1 + r) ** -n);
}
