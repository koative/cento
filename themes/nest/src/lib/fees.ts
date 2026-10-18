import { brand, pricing, type Room } from "../content";

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

/** One session id (or null for "not booked") per weekday. */
export type Pattern = (string | null)[];

export type Quote = {
  hours: number;
  sessions: number;
  gross: number;
  credit: number;
  sibling: number;
  weekly: number;
  monthly: number;
};

export function quote(
  room: Room,
  pattern: Pattern,
  useCredit: boolean,
  siblings: boolean,
): Quote {
  const picked = pattern.flatMap((id) =>
    room.sessions.filter((s) => s.id === id),
  );
  const hours = picked.reduce(
    (t, s) => t + s.spans.reduce((h, [a, b]) => h + (b - a), 0),
    0,
  );
  const gross = picked.reduce((t, s) => t + s.price, 0);
  const credit =
    useCredit && room.creditHours
      ? Math.min(room.creditHours, hours) * pricing.hourlyCreditRate
      : 0;
  const sibling = siblings ? (gross - credit) * pricing.siblingDiscount : 0;
  const weekly = Math.max(0, gross - credit - sibling);
  return {
    hours,
    sessions: picked.length,
    gross,
    credit,
    sibling,
    weekly,
    monthly: (weekly * brand.openWeeks) / 12,
  };
}

export const money = (n: number, cents = false) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

/** "7.75" → "7:45" */
export const clock = (h: number) => {
  const hr = Math.floor(h);
  const min = Math.round((h - hr) * 60);
  return `${hr > 12 ? hr - 12 : hr}:${String(min).padStart(2, "0")}`;
};

/*
 * The pattern chosen in the calculator, handed to the tour form so a parent
 * does not have to describe it twice. Module memory only; resets on reload.
 */
let draft: { roomId: string; pattern: Pattern } | null = null;
export const setDraft = (d: typeof draft) => void (draft = d);
export const getDraft = () => draft;
