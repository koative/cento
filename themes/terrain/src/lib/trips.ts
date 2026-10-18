import { guides, trips, type Trip } from "../content";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export const eur = (n: number) => money.format(n);
export const num = (n: number) => n.toLocaleString("en-GB");

const parse = (iso: string) => new Date(iso + "T12:00:00");
const day = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});
const full = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const shortDate = (iso: string) => day.format(parse(iso));
export const fullDate = (iso: string) => full.format(parse(iso));

/** "10–15 Jul 2027", or across months "28 Aug – 2 Sep 2027". */
export function dateRange(iso: string, days: number) {
  const a = parse(iso);
  const b = new Date(a);
  b.setDate(a.getDate() + days - 1);
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}–${full.format(b)}`;
  return `${day.format(a)} – ${full.format(b)}`;
}

/** "Jul–Sep", "Nov–Mar", "May, Jun & Sep" style season label. */
export function season(m: number[]) {
  const runs: number[][] = [];
  for (const x of m) {
    const last = runs[runs.length - 1];
    if (last && (last[last.length - 1] % 12) + 1 === x) last.push(x);
    else runs.push([x]);
  }
  return runs
    .map((r) =>
      r.length > 1
        ? `${months[r[0] - 1]}–${months[r[r.length - 1] - 1]}`
        : months[r[0] - 1],
    )
    .join(", ");
}

export function totals(trip: Trip) {
  let km = 0,
    up = 0,
    down = 0,
    max = 0;
  for (const d of trip.days) {
    km += d.km;
    up += d.up;
    down += d.down;
    max = Math.max(max, ...d.profile);
  }
  return { km: Math.round(km), up, down, max };
}

export const nextDeparture = (trip: Trip) =>
  trip.departures.find((d) => d.spots > 0) ?? null;

export function spotsLabel(spots: number) {
  if (spots === 0) return "Full • waitlist";
  if (spots <= 3) return `${spots} ${spots === 1 ? "place" : "places"} left`;
  return `${spots} places`;
}

export const findTrip = (slug: string | null) =>
  trips.find((t) => t.slug === slug);
export const guideFor = (trip: Trip) =>
  guides.find((g) => g.slug === trip.guide)!;
export const tripsBy = (guideSlug: string) =>
  trips.filter((t) => t.guide === guideSlug);

/** The next date with places on every trip, soonest first. */
export function upcoming() {
  return trips
    .flatMap((trip) => {
      const dep = nextDeparture(trip);
      return dep ? [{ trip, dep }] : [];
    })
    .sort((a, b) => a.dep.start.localeCompare(b.dep.start));
}

/** Query string after the hash route: #/book?trip=x → URLSearchParams. */
export const query = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "");
