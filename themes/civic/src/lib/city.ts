import { brand, map, members, services, wards, type WardId } from "../content";

/** Every word of the query must appear in the service's name, summary or category. */
export function findServices(query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return services.filter((s) => {
    const hay = `${s.name} ${s.summary} ${s.category}`.toLowerCase();
    return words.every((w) => hay.includes(w.replace(/s$/, "")));
  });
}

export const streetNames = [
  ...map.streets.map((s) => s.name),
  ...map.avenues.map((a) => a.name),
];

/** House numbers run 1–1199 west→east along streets and 1–599 north→south along avenues. */
export function locate(street: string, number: number) {
  const s = map.streets.find((x) => x.name === street);
  if (s)
    return {
      x: Math.round(40 + (Math.min(number, 1199) / 1200) * 880),
      y: s.y,
    };
  const a = map.avenues.find((x) => x.name === street);
  if (a)
    return { x: a.x, y: Math.round(40 + (Math.min(number, 599) / 600) * 480) };
  return null;
}

export function wardAt(x: number, y: number): WardId {
  const { x: sx, y: sy } = map.wardSplit;
  return x < sx ? (y < sy ? 1 : 3) : y < sy ? 2 : 4;
}

export function councillorFor(ward: WardId) {
  return members.find((m) => m.ward === ward)!;
}

/** "Market St & 3rd Ave" for the intersection nearest a point. */
export function nearestCorner(x: number, y: number) {
  const near = <T>(list: T[], v: (t: T) => number, to: number) =>
    list.reduce((a, b) => (Math.abs(v(b) - to) < Math.abs(v(a) - to) ? b : a));
  const s = near(map.streets, (t) => t.y, y);
  const a = near(map.avenues, (t) => t.x, x);
  return `${s.name} & ${a.name}`;
}

function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  return Math.ceil(
    ((t.getTime() - Date.UTC(t.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7,
  );
}

export function nextCollection(ward: WardId, from = new Date()) {
  const w = wards[ward];
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (date.getDay() !== w.trashDay) date.setDate(date.getDate() + 1);
  const even = isoWeek(date) % 2 === 0;
  const recycling = (w.recyclingWeek === "even") === even;
  const days = Math.round(
    (date.getTime() -
      new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()) /
      86400000,
  );
  return {
    date,
    days,
    second: recycling ? "Recycling (blue cart)" : "Yard waste (green cart)",
  };
}

export const weekday = (d: number) =>
  [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][d];

const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${((h + 11) % 12) + 1}${min ? ":" + String(min).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
};

/** City Hall open/closed right now, with the next change. */
export function hallStatus(now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = brand.hours[now.getDay()];
  if (today && mins >= today[0] && mins < today[1])
    return { open: true, text: `Open until ${fmt(today[1])}` };
  for (let i = today && mins < today[0] ? 0 : 1; i < 8; i++) {
    const h = brand.hours[(now.getDay() + i) % 7];
    if (h)
      return {
        open: false,
        text: `Opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : weekday((now.getDay() + i) % 7)} at ${fmt(h[0])}`,
      };
  }
  return { open: false, text: "Closed" };
}

export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
export const shortDate = (iso: string) =>
  new Date(iso.length === 10 ? iso + "T12:00" : iso).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );
export const timeOf = (iso: string) =>
  new Date(iso)
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase();
