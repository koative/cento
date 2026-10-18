import {
  trips,
  type Grade,
  type Landscape,
  type Sleep,
  type Trip,
} from "../content";
import { eur, monthNames, season } from "./trips";

export type Wish = {
  month: number; // 0 = any month
  days: number;
  grade: Grade;
  sleep: Sleep | "any";
  landscapes: Landscape[];
  budget: number;
};

export type Reason = { ok: boolean; text: string };
export type Match = { trip: Trip; score: number; reasons: Reason[] };

/** Weighted fit out of 100: grade 25, month 20, days 20, landscape 15, sleep 10, budget 10. */
export function score(trip: Trip, w: Wish): Match {
  const reasons: Reason[] = [];
  let s = 0;

  const gap = trip.grade - w.grade;
  if (gap === 0)
    ((s += 25), reasons.push({ ok: true, text: "Right grade for you" }));
  else if (gap < 0)
    ((s += 15),
      reasons.push({
        ok: true,
        text: "Easier than you asked: more time to look around",
      }));
  else if (gap === 1)
    ((s += 6),
      reasons.push({ ok: false, text: "One grade harder than you asked" }));
  else reasons.push({ ok: false, text: "Two grades harder than you asked" });

  if (w.month === 0) s += 20;
  else if (trip.months.includes(w.month))
    ((s += 20),
      reasons.push({ ok: true, text: `Runs in ${monthNames[w.month - 1]}` }));
  else
    reasons.push({
      ok: false,
      text: `Not in ${monthNames[w.month - 1]}; season is ${season(trip.months)}`,
    });

  const extra = trip.days.length - w.days;
  if (extra <= 0)
    ((s += 20),
      reasons.push({
        ok: true,
        text: `${trip.days.length} days fits your ${w.days}`,
      }));
  else if (extra === 1)
    ((s += 8),
      reasons.push({ ok: false, text: "One day longer than you have" }));
  else reasons.push({ ok: false, text: `${extra} days longer than you have` });

  if (w.landscapes.length === 0) s += 15;
  else {
    const hits = trip.landscapes.filter((l) => w.landscapes.includes(l));
    s += Math.round((15 * hits.length) / w.landscapes.length);
    reasons.push(
      hits.length
        ? { ok: true, text: hits.join(", ") }
        : {
            ok: false,
            text: `Mostly ${trip.landscapes.join(" and ").toLowerCase()}`,
          },
    );
  }

  if (w.sleep === "any" || w.sleep === trip.sleep) s += 10;
  else
    reasons.push({
      ok: false,
      text: `Sleeps in ${trip.sleepLabel[0].toLowerCase()}${trip.sleepLabel.slice(1)}`,
    });

  if (trip.price <= w.budget)
    ((s += 10),
      reasons.push({ ok: true, text: `${eur(trip.price)}, within budget` }));
  else
    reasons.push({
      ok: false,
      text: `${eur(trip.price - w.budget)} over budget`,
    });

  return { trip, score: s, reasons };
}

export const rank = (w: Wish) =>
  trips
    .map((t) => score(t, w))
    .sort((a, b) => b.score - a.score || a.trip.price - b.trip.price);
