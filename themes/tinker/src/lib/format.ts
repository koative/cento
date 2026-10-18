import { ages, hours, type AgeBand, type Product } from "../content";

export const money = (n: number) =>
  "$" + (Number.isInteger(n) ? n : n.toFixed(2));

const parseDay = (iso: string) => new Date(iso + "T12:00:00");

/** "Sat 24 Oct" */
export const shortDate = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

/** { day: "24", month: "Oct", weekday: "Sat" } for calendar chips. */
export function dateParts(iso: string) {
  const d = parseDay(iso);
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

export const monthLabel = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });

/** "3+" or "1–4 yrs"; babies read as months. */
export function ageLabel(p: Pick<Product, "ageMin" | "ageMax">) {
  const from = p.ageMin === 0 ? "0" : String(p.ageMin);
  return p.ageMax >= 99 ? `${from}+` : `${from}–${p.ageMax} yrs`;
}

/** The age shelf a toy starts on, used for its age roundel colour. */
export const bandFor = (age: number): AgeBand =>
  ages.find((b) => age >= b.min && age < b.max) ?? ages[ages.length - 1];

/** Does a toy for ages [min, max] belong on this shelf? */
export const fitsBand = (p: Pick<Product, "ageMin" | "ageMax">, b: AgeBand) =>
  p.ageMin < b.max && p.ageMax >= b.min;

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "9 am", "6:30 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hh = h % 12 || 12;
  return m
    ? `${hh}:${String(m).padStart(2, "0")} ${suffix}`
    : `${hh} ${suffix}`;
}

/** Open/closed status for the shop right now, in the visitor's local time. */
export function shopStatus(now = new Date()) {
  const today = hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (
    today.open &&
    today.close &&
    mins >= toMinutes(today.open) &&
    mins < toMinutes(today.close)
  )
    return { open: true, text: `Open now until ${clock(today.close)}` };
  for (let i = 0; i < 7; i++) {
    const d = hours[(now.getDay() + i) % 7];
    if (!d.open) continue;
    if (i === 0 && mins >= toMinutes(d.open)) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : d.day;
    return {
      open: false,
      text: `Closed now · opens ${when} at ${clock(d.open)}`,
    };
  }
  return { open: false, text: "Closed" };
}
