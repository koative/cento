import type { Species } from "../content";

export type CareItem = {
  id: string;
  date: Date;
  title: string;
  detail: string;
  reason: string;
};
export type CareStatus = "given" | "unrecorded" | "soon" | "planned";

const DAY = 86_400_000;
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), 28));

/**
 * The vaccine and check-up schedule for one pet, from birth to `horizon` years.
 * Follows common North American small-animal guidance; the clinic adjusts per pet.
 */
function schedule(species: Species, born: Date, horizon: number): CareItem[] {
  const items: CareItem[] = [];
  const at = (
    id: string,
    date: Date,
    title: string,
    detail: string,
    reason: string,
  ) => items.push({ id, date, title, detail, reason });

  if (species === "dog") {
    at(
      "w8",
      addDays(born, 56),
      "First puppy vaccine",
      "DHPP, worming, full exam",
      "puppy",
    );
    at(
      "w12",
      addDays(born, 84),
      "Second puppy vaccine",
      "DHPP + leptospirosis, microchip",
      "puppy",
    );
    at(
      "w16",
      addDays(born, 112),
      "Final puppy vaccine",
      "DHPP + rabies, neutering chat",
      "puppy",
    );
    at(
      "m6",
      addMonths(born, 6),
      "Neutering consultation",
      "Timing depends on breed and size",
      "surgery",
    );
    at(
      "m15",
      addMonths(born, 15),
      "First adult booster",
      "DHPP + leptospirosis, wellness exam",
      "wellness",
    );
    for (let y = 2; y <= horizon; y++) {
      const rabies = y % 3 === 1 ? ", rabies (3-year)" : "";
      at(
        `y${y}`,
        addMonths(born, y * 12),
        "Annual exam & booster",
        `Leptospirosis${rabies}${y >= 3 ? ", dental check" : ""}`,
        "wellness",
      );
      if (y >= 8)
        at(
          `s${y}`,
          addMonths(born, y * 12 + 6),
          "Senior screen",
          "Bloods, urine, blood pressure",
          "senior",
        );
    }
  } else if (species === "cat") {
    at(
      "w9",
      addDays(born, 63),
      "First kitten vaccine",
      "FVRCP, worming, full exam",
      "puppy",
    );
    at(
      "w12",
      addDays(born, 84),
      "Second kitten vaccine",
      "FVRCP + FeLV if going outdoors",
      "puppy",
    );
    at(
      "w16",
      addDays(born, 112),
      "Final kitten vaccine",
      "FVRCP + rabies, microchip",
      "puppy",
    );
    at(
      "m5",
      addMonths(born, 5),
      "Neutering",
      "Day visit, home the same afternoon",
      "surgery",
    );
    at(
      "m15",
      addMonths(born, 15),
      "First adult booster",
      "FVRCP, wellness exam",
      "wellness",
    );
    for (let y = 2; y <= horizon; y++) {
      at(
        `y${y}`,
        addMonths(born, y * 12),
        "Annual wellness exam",
        y % 3 === 1 ? "FVRCP + rabies booster" : "Exam, weight, dental check",
        "wellness",
      );
      if (y >= 10)
        at(
          `s${y}`,
          addMonths(born, y * 12 + 6),
          "Senior screen",
          "Kidney bloods, thyroid, blood pressure",
          "senior",
        );
    }
  } else {
    at(
      "w7",
      addDays(born, 49),
      "First vaccine",
      "RHD2 + myxomatosis combined",
      "rabbit",
    );
    at(
      "m4",
      addMonths(born, 4),
      "Neutering",
      "Reduces uterine cancer risk and fighting",
      "surgery",
    );
    for (let y = 1; y <= horizon; y++) {
      at(
        `y${y}`,
        addMonths(born, y * 12),
        "Annual vaccine & exam",
        "RHD2 + myxomatosis, teeth check",
        "rabbit",
      );
      at(
        `t${y}`,
        addMonths(born, y * 12 + 6),
        "Teeth & weight check",
        "Nurse visit — back teeth and diet",
        "rabbit",
      );
    }
  }
  return items.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** What the card shows: anything from 9 months back to 2 years ahead, at most 9 rows. */
export function careCard(species: Species, born: Date, today: Date) {
  const ageYears = (today.getTime() - born.getTime()) / (365.25 * DAY);
  const from = addMonths(today, -9);
  const to = addMonths(today, 24);
  return schedule(species, born, Math.ceil(ageYears) + 3)
    .filter((i) => i.date >= from && i.date <= to)
    .slice(0, 9);
}

export function statusOf(
  item: CareItem,
  given: boolean,
  today: Date,
): CareStatus {
  if (given) return "given";
  if (item.date < today) return "unrecorded";
  return item.date.getTime() - today.getTime() <= 30 * DAY ? "soon" : "planned";
}

export function ageLabel(born: Date, today: Date) {
  const weeks = Math.floor((today.getTime() - born.getTime()) / (7 * DAY));
  if (weeks < 0) return "Not born yet";
  if (weeks < 17) return `${weeks} week${weeks === 1 ? "" : "s"}`;
  const months =
    (today.getFullYear() - born.getFullYear()) * 12 +
    today.getMonth() -
    born.getMonth();
  if (months < 24) return `${months} months`;
  return `${Math.floor(months / 12)} years`;
}

/** Which health plan the card points to. */
export function planFor(species: Species, born: Date, today: Date) {
  const years = (today.getTime() - born.getTime()) / (365.25 * DAY);
  if (years < 1) return "start";
  if (years >= (species === "cat" ? 10 : 8)) return "senior";
  return "everyday";
}
