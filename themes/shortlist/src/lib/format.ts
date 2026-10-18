import {
  cityFactor,
  companies,
  levelFactor,
  salaryRoles,
  spread,
  type City,
  type Job,
  type Level,
} from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);
/** 158000 → "$158k" */
export const k = (n: number) => `$${Math.round(n / 1000)}k`;
export const range = ([a, b]: [number, number]) => `${k(a)}–${k(b)}`;

const DAY = 86_400_000;
const dayFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
export const dateIn = (days: number) =>
  dayFmt.format(new Date(Date.now() + days * DAY));

export const postedLabel = (days: number) =>
  days === 0
    ? "Posted today"
    : days === 1
      ? "Posted yesterday"
      : `Posted ${days} days ago`;

export const companyOf = (job: Job) =>
  companies.find((c) => c.slug === job.company)!;

/* ------------------------------------------------------------ salary guide */

export type Band = {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
};

export function band(roleId: string, city: City, level: Level): Band {
  const role = salaryRoles.find((r) => r.id === roleId) ?? salaryRoles[0];
  const mid = role.median * cityFactor[city] * levelFactor[level];
  const at = (f: number) => Math.round((mid * f) / 500) * 500;
  return {
    p10: at(spread.p10),
    p25: at(spread.p25),
    p50: at(spread.p50),
    p75: at(spread.p75),
    p90: at(spread.p90),
  };
}

/** Linear percentile estimate between the band's known points; clamps to 1–99. */
export function percentile(b: Band, value: number) {
  const pts: [number, number][] = [
    [b.p10, 10],
    [b.p25, 25],
    [b.p50, 50],
    [b.p75, 75],
    [b.p90, 90],
  ];
  if (value <= b.p10) return Math.max(1, Math.round(10 * (value / b.p10) ** 4));
  if (value >= b.p90)
    return Math.min(
      99,
      Math.round(90 + 9 * Math.min(1, (value - b.p90) / (b.p90 * 0.2))),
    );
  for (let i = 1; i < pts.length; i++) {
    const [v0, p0] = pts[i - 1];
    const [v1, p1] = pts[i];
    if (value <= v1)
      return Math.round(p0 + ((value - v0) / (v1 - v0)) * (p1 - p0));
  }
  return 90;
}

export const ordinal = (n: number) => {
  const s =
    n % 100 >= 11 && n % 100 <= 13
      ? "th"
      : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${s}`;
};

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/** Native validity first, then each field's own message; returns the first invalid control focused. */
export function validate(
  form: HTMLFormElement,
  messages: Errors,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name || errors[el.name]) continue;
    if (!el.checkValidity())
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(
    errors,
    Object.fromEntries(Object.entries(extra).filter(([n]) => !errors[n])),
  );
  const first = Object.keys(errors)[0];
  const el = first ? form.elements.namedItem(first) : null;
  if (el instanceof RadioNodeList) (el[0] as HTMLElement | undefined)?.focus();
  else (el as HTMLElement | null)?.focus();
  return errors;
}
