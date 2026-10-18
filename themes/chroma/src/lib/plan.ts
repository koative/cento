import {
  categories,
  days,
  hours,
  services,
  stylists,
  type Level,
  type Service,
} from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => (n === 0 ? "Free" : usd.format(n));

/** 165 → "2 h 45 min" */
export function duration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(" ") || "0 min";
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Minutes after midnight → "9:30 am" */
export function clock(min: number) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: (typeof hours)[number]) =>
  h ? `${clock(toMin(h[0]))} – ${clock(toMin(h[1]))}` : "Closed";

export function openStatus(now = new Date()) {
  const today = hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Open now, until ${clock(toMin(today[1]))}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Opens today at ${clock(toMin(today[0]))}` };
  for (let i = 1; i <= 7; i++) {
    const h = hours[(now.getDay() + i) % 7];
    if (h)
      return {
        open: false,
        label: `Closed now · opens ${i === 1 ? "tomorrow" : days[(now.getDay() + i) % 7]} at ${clock(toMin(h[0]))}`,
      };
  }
  return { open: false, label: "Closed" };
}

/* ------------------------------------------------------------ the appointment */

export const levelOf = (stylistId: string): Level =>
  stylists.find((s) => s.id === stylistId)?.level ?? "stylist";

const bookOrder = (s: Service) =>
  categories.find((c) => c.id === s.category)!.book;

/** Selected services in the order they happen in the chair: colour, treatments, cut, occasion. */
export function plan(ids: string[], level: Level = "stylist") {
  const chosen = services
    .filter((s) => ids.includes(s.id))
    .sort((a, b) => bookOrder(a) - bookOrder(b));
  let at = 0;
  const steps = chosen.flatMap((s) =>
    s.steps.map((step) => {
      const placed = { ...step, service: s.name, start: at };
      at += step.min;
      return placed;
    }),
  );
  return {
    services: chosen,
    steps,
    minutes: at,
    chairMinutes: steps
      .filter((s) => s.kind === "chair")
      .reduce((n, s) => n + s.min, 0),
    price: chosen.reduce((n, s) => n + s.price[level], 0),
    patchTest: chosen.some((s) => s.patchTest),
  };
}

export const fromPrice = (s: Service) => Math.min(...Object.values(s.price));

/* ------------------------------------------------------------ calendar */

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** The next `count` calendar days, starting today, with whether the salon (and the stylist) are in. */
export function upcomingDays(stylistId: string, count = 21, now = new Date()) {
  const worker = stylists.find((s) => s.id === stylistId);
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const open =
      !!hours[date.getDay()] &&
      (!worker || worker.days.includes(date.getDay()));
    return { date, key: dayKey(date), open };
  });
}

/** Deterministic pseudo-randomness so the same day shows the same booked chairs on every visit. */
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++)
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0) % 100;
}

/**
 * Half-hour start times that leave room for the whole appointment before closing.
 * A slot is taken if the chosen stylist (or, for "any", every stylist in that day) is already booked.
 */
export function slotsFor(
  date: Date,
  stylistId: string,
  minutes: number,
  now = new Date(),
) {
  const h = hours[date.getDay()];
  if (!h) return [];
  const staff =
    stylistId === "any"
      ? stylists.filter((s) => s.days.includes(date.getDay())).map((s) => s.id)
      : [stylistId];
  const key = dayKey(date);
  const isToday = key === dayKey(now);
  const slots: { min: number; free: boolean }[] = [];
  for (let t = toMin(h[0]); t + Math.max(minutes, 30) <= toMin(h[1]); t += 30) {
    if (isToday && t < now.getHours() * 60 + now.getMinutes() + 60) continue;
    slots.push({
      min: t,
      free: staff.some((id) => hash(`${key}|${id}|${t}`) > 45),
    });
  }
  return slots;
}
