import {
  annualDiscount,
  deductibleOptions,
  dwellingRate,
  liabilityOptions,
  quoteAddOns,
  rates,
  type QuoteKind,
} from "../content";

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export type QuoteInput = {
  kind: QuoteKind;
  sqft: number;
  contents: number;
  liability: number;
  deductible: number;
  addOns: string[];
};

export const rebuildCost = (q: QuoteInput) => q.sqft * rates[q.kind].perSqFt;

/** Illustrative monthly premium: base + contents + rebuild cost + liability step, scaled by deductible, plus add-ons. */
export function monthlyPremium(q: QuoteInput) {
  const rate = rates[q.kind];
  const liability =
    liabilityOptions.find((o) => o.value === q.liability)?.monthly ?? 0;
  const factor =
    deductibleOptions.find((o) => o.value === q.deductible)?.factor ?? 1;
  const extras = quoteAddOns
    .filter((a) => q.addOns.includes(a.id))
    .reduce((s, a) => s + a.monthly, 0);
  const core =
    rate.base +
    (q.contents / 1000) * rate.perThousand +
    (rebuildCost(q) / 1000) * dwellingRate +
    liability;
  return Math.round(core * factor + extras);
}

export const annualPremium = (monthly: number) =>
  Math.round(monthly * 12 * (1 - annualDiscount));

export type Line = { code: string; title: string; value: string };

/** The schedule a quote would print: US form letters A–F, then deductible and add-ons. */
export function scheduleLines(q: QuoteInput): Line[] {
  const dwelling = rebuildCost(q);
  const lines: Line[] = [];
  if (dwelling) {
    lines.push({
      code: "A",
      title: q.kind === "condo" ? "Unit improvements" : "Dwelling",
      value: money(dwelling),
    });
    if (q.kind !== "condo")
      lines.push({
        code: "B",
        title: "Other structures",
        value: money(dwelling * 0.1),
      });
  }
  lines.push({
    code: "C",
    title: q.kind === "landlord" ? "Landlord's contents" : "Personal property",
    value: money(q.contents),
  });
  const lossOfUse =
    q.kind === "landlord"
      ? "12 months' rent"
      : q.kind === "student"
        ? money(2000)
        : money(dwelling ? dwelling * 0.2 : q.contents * 0.3);
  lines.push({
    code: "D",
    title: q.kind === "landlord" ? "Fair rental value" : "Loss of use",
    value: lossOfUse,
  });
  lines.push({
    code: "E",
    title: "Personal liability",
    value: money(q.liability),
  });
  if (q.kind !== "landlord")
    lines.push({
      code: "F",
      title: "Medical payments",
      value: money(dwelling ? 5000 : 2000),
    });
  lines.push({ code: "", title: "Deductible", value: money(q.deductible) });
  for (const a of quoteAddOns)
    if (q.addOns.includes(a.id))
      lines.push({ code: "+", title: a.label, value: "Included" });
  return lines;
}

/** Reads `?key=value` from the hash (#/quote?cover=renters); the router ignores the query. */
export function hashParam(key: string) {
  const query = window.location.hash.split("?")[1];
  return query ? new URLSearchParams(query).get(key) : null;
}
