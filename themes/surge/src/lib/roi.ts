import { engagements, roiPage, type Engagement } from "../content";

export type Tier = Engagement["id"];

export type Inputs = {
  revenue: number;
  margin: number;
  tier: Tier;
  maturity: string;
};

export const defaults: Inputs = {
  revenue: 400000,
  margin: 55,
  tier: "program",
  maturity: "some",
};

export type Month = {
  month: number;
  low: number;
  expected: number;
  high: number;
  fee: number;
  /** Cumulative gross profit from added revenue minus cumulative fees (expected case). */
  net: number;
};

/**
 * Twelve months of added revenue. Lift ramps toward its month-12 ceiling on an
 * exponential curve after a set-up delay: a sprint hands the roadmap to your team,
 * so it starts later and climbs slower than a program or an embedded pod.
 */
export function project(input: Inputs): Month[] {
  const plan = engagements.find((e) => e.id === input.tier)!;
  const factor =
    roiPage.maturity.find((m) => m.id === input.maturity)?.factor ?? 1;
  const [delay, pace] = input.tier === "sprint" ? [2, 4] : [1, 3];
  const ceiling = 1 - Math.exp(-(12 - delay) / pace);
  const months: Month[] = [];
  let net = 0;
  for (let m = 1; m <= 12; m++) {
    const ramp = m > delay ? (1 - Math.exp(-(m - delay) / pace)) / ceiling : 0;
    const [low, expected, high] = roiPage.lift[input.tier].map(
      (l) => input.revenue * l * factor * ramp,
    );
    const fee = plan.oneOff ? (m === 1 ? plan.monthly : 0) : plan.monthly;
    net += expected * (input.margin / 100) - fee;
    months.push({ month: m, low, expected, high, fee, net });
  }
  return months;
}

export function summarize(months: Month[], margin: number) {
  const sum = (k: "low" | "expected" | "high" | "fee") =>
    months.reduce((s, m) => s + m[k], 0);
  const fees = sum("fee");
  const profit = sum("expected") * (margin / 100);
  return {
    low: sum("low"),
    expected: sum("expected"),
    high: sum("high"),
    fees,
    profit,
    multiple: profit / fees,
    payback: months.find((m) => m.net >= 0)?.month ?? null,
  };
}

/** Inputs ⇄ the query string carried from the model to the proposal form. */
export function toQuery(i: Inputs) {
  return new URLSearchParams({
    tier: i.tier,
    revenue: String(i.revenue),
    margin: String(i.margin),
    maturity: i.maturity,
  }).toString();
}

export function fromQuery(q: URLSearchParams): Inputs | null {
  const tier = q.get("tier");
  const revenue = Number(q.get("revenue"));
  const margin = Number(q.get("margin"));
  const maturity = q.get("maturity") ?? "some";
  if (
    !engagements.some((e) => e.id === tier) ||
    !(revenue > 0) ||
    !(margin > 0 && margin <= 100)
  )
    return null;
  return { tier: tier as Tier, revenue, margin, maturity };
}
