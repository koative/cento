import {
  films,
  pricing,
  screens,
  ticketTypes,
  type Film,
  type Screen,
  type Showing,
  type TicketId,
} from "../content";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
export const money = (n: number) => gbp.format(n).replace(/\.00$/, "");

/* ------------------------------------------------------------ dates (day 0 = today) */

export const days = [0, 1, 2, 3, 4, 5, 6];

export function dateOf(day: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + day);
  return d;
}

const short = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
});
const long = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const tiny = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

/** "Today", "Tomorrow", "Mon 20" */
export const dayName = (day: number) =>
  day === 0 ? "Today" : day === 1 ? "Tomorrow" : short.format(dateOf(day));
/** "Saturday 18 October" */
export const dayLong = (day: number) => long.format(dateOf(day));
/** "18 Oct" */
export const dayTiny = (day: number) => tiny.format(dateOf(day));
const weekdayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "long" });
/** "Today", "Tomorrow", "Tuesday" */
export const weekday = (day: number) =>
  day === 0 ? "Today" : day === 1 ? "Tomorrow" : weekdayFmt.format(dateOf(day));

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

export const isTuesday = (day: number) => dateOf(day).getDay() === 2;

/* ------------------------------------------------------------ screenings */

export type Screening = Showing & {
  id: string;
  film: Film;
  screen: Screen;
  past: boolean;
};

const byTime = (a: Screening, b: Screening) =>
  a.day - b.day || toMin(a.time) - toMin(b.time);

export function screeningsOf(film: Film): Screening[] {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return film.showings
    .map((s) => ({
      ...s,
      id: `${film.slug}.${s.day}.${s.time.replace(":", "")}`,
      film,
      screen: screens[film.screen],
      past: s.day === 0 && toMin(s.time) <= nowMin,
    }))
    .sort(byTime);
}

export const allScreenings = () => films.flatMap(screeningsOf).sort(byTime);
export const findScreening = (id: string | null) =>
  allScreenings().find((s) => s.id === id);
export const bookable = (s: Screening) => !s.past && !s.soldOut;
export const nextScreening = (film: Film) => screeningsOf(film).find(bookable);

const clock = (m: number) =>
  `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Trailers run six minutes; this is when the credits end. */
export const endsAt = (s: Screening) =>
  clock(toMin(s.time) + 6 + s.film.runtime);
export const doorsAt = (s: Screening) => clock(toMin(s.time) - 30);

export const bookHref = (s: Screening) => `/book?s=${s.id}`;

/* ------------------------------------------------------------ seats */

export type Seat = { id: string; row: string; n: number; access: boolean };

export function seatRows(screen: Screen): Seat[][] {
  return screen.rows.map((row) =>
    Array.from({ length: screen.perRow }, (_, i) => {
      const id = `${row}${i + 1}`;
      return { id, row, n: i + 1, access: screen.access.includes(id) };
    }),
  );
}

/** Deterministic 0–1 noise per screening, so availability is stable between visits. */
function noise(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function takenSeats(s: Screening): Set<string> {
  const all = seatRows(s.screen).flat();
  if (s.soldOut) return new Set(all.map((seat) => seat.id));
  const r = noise(s.id);
  const evening = toMin(s.time) >= 18 * 60;
  const fill =
    (s.note === "Q&A" ? 0.78 : evening ? 0.42 : 0.2) +
    (s.day === 0 ? 0.12 : 0) +
    r() * 0.12;
  // Centre seats go first: weight by distance from the middle of the row.
  return new Set(
    all
      .filter((seat) => {
        const centre =
          1 - Math.abs(seat.n - (s.screen.perRow + 1) / 2) / s.screen.perRow;
        return !seat.access && r() < fill * (0.55 + centre * 0.9);
      })
      .map((seat) => seat.id),
  );
}

export const seatsLeft = (s: Screening) =>
  s.screen.rows.length * s.screen.perRow - takenSeats(s).size;

/** Distance from screen and the horizontal angle the image fills, for a row index. */
export function sightline(screen: Screen, rowIndex: number) {
  const distance = screen.firstRow + rowIndex * screen.rowPitch;
  const angle =
    (2 * Math.atan(screen.screenWidth / 2 / distance) * 180) / Math.PI;
  const verdict =
    angle > 70
      ? "Front and enveloping: you will turn your head."
      : angle >= 40
        ? "The sweet spot: the screen fills your view, edges in reach."
        : "Relaxed: the whole frame at a glance.";
  return { distance, angle, verdict };
}

/* ------------------------------------------------------------ prices */

export function priceOf(type: TicketId, day: number) {
  const price = ticketTypes.find((t) => t.id === type)!.price;
  return isTuesday(day) ? Math.min(pricing.tuesdayPrice, price) : price;
}
