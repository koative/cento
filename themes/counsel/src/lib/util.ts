import { areas, insights, people, type Limitation } from "../content";

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
export const personBySlug = (slug: string) =>
  people.find((p) => p.slug === slug);
export const peopleIn = (area: string) =>
  people.filter((p) => p.areas.includes(area));
export const insightsIn = (area: string) =>
  insights.filter((i) => i.area === area);
export const insightsBy = (author: string) =>
  insights.filter((i) => i.author === author);

export const money = (n: number) => "$" + n.toLocaleString("en-US");
export const tel = (phone: string) => "tel:" + phone.replace(/\s/g, "");

const pad = (n: number) => String(n).padStart(2, "0");
export const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fromISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const today = () => fromISO(toISO(new Date()));
export const longDate = (s: string) =>
  fromISO(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
export const shortDate = (s: string) =>
  fromISO(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
export const daysBetween = (a: Date, b: Date) =>
  Math.round((b.getTime() - a.getTime()) / 86_400_000);

export function addPeriod(
  start: Date,
  amount: number,
  unit: Limitation["unit"],
) {
  const d = new Date(start);
  if (unit === "days") d.setDate(d.getDate() + amount);
  if (unit === "months") d.setMonth(d.getMonth() + amount);
  if (unit === "years") d.setFullYear(d.getFullYear() + amount);
  return d;
}

/** Query string after the hash route, e.g. #/enquiry?area=family → { area: "family" }. */
export const hashQuery = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "");
