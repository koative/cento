import {
  days,
  optionGroups,
  type Choice,
  type Hours,
  type MenuItem,
} from "./content";

export type Selection = Record<string, string[]>;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const money = (n: number) => usd.format(n);

const choice = (group: string, id: string): Choice | undefined =>
  optionGroups[group]?.choices.find((c) => c.id === id);

function picked(item: MenuItem, sel: Selection): Choice[] {
  return Object.keys(item.options).flatMap((g) =>
    (sel[g] ?? []).map((id) => choice(g, id)).filter((c): c is Choice => !!c),
  );
}

export const priceOf = (item: MenuItem, sel: Selection = item.options) =>
  picked(item, sel).reduce((sum, c) => sum + (c.price ?? 0), item.price);

export const kcalOf = (item: MenuItem, sel: Selection = item.options) =>
  picked(item, sel).reduce((sum, c) => sum + (c.kcal ?? 0), item.kcal);

/** "Double · American · Pickles, Shaved white onion · Smash sauce · Potato bun" */
export function describe(item: MenuItem, sel: Selection) {
  return Object.keys(item.options)
    .map((g) =>
      (sel[g] ?? [])
        .map((id) => choice(g, id)?.label.split(" — ")[0])
        .join(", "),
    )
    .filter(Boolean)
    .join(" · ");
}

/** Layer names bottom → top for the Stack drawing. */
export function stackLayers(item: MenuItem, sel: Selection): string[] {
  const one = (g: string) => (sel[g]?.[0] ? choice(g, sel[g][0]) : undefined);
  const many = (g: string) =>
    (sel[g] ?? [])
      .map((id) => choice(g, id)?.layer)
      .filter((l): l is string => !!l);
  const bun = one("bun")?.layer ?? "potato";
  const protein =
    one("protein")?.layer ?? one("heat")?.layer ?? item.stack ?? "patty";
  const cheese = one("cheese")?.layer;
  const count = one("patties")?.count ?? 1;
  const middle = Array.from({ length: count }, () =>
    cheese ? [protein, cheese] : [protein],
  ).flat();
  return [
    `${bun}-bottom`,
    ...middle,
    ...many("toppings"),
    ...many("sauce"),
    `${bun}-top`,
  ];
}

/* ------------------------------------------------------------ hours */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function clock(t: string) {
  if (t === "23:59") return "midnight";
  const [h, m] = t.split(":").map(Number);
  const hour = h % 12 || 12;
  return `${hour}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** Open/closed right now plus the next change, from a Sunday-first week of hours. */
export function openStatus(hours: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const span = (h: Hours) =>
    h
      ? [
          toMin(h[0]),
          toMin(h[1]) <= toMin(h[0]) ? toMin(h[1]) + 1440 : toMin(h[1]),
        ]
      : null;

  const yesterday = span(hours[(day + 6) % 7]);
  if (yesterday && yesterday[1] > 1440 && mins < yesterday[1] - 1440) {
    return {
      open: true,
      label: `Open until ${clock(hours[(day + 6) % 7]![1])}`,
    };
  }
  const today = span(hours[day]);
  if (today && mins >= today[0] && mins < today[1])
    return { open: true, label: `Open until ${clock(hours[day]![1])}` };
  if (today && mins < today[0])
    return { open: false, label: `Opens ${clock(hours[day]![0])} today` };
  for (let i = 1; i <= 7; i++) {
    const h = hours[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation, with our own wording per field name.
 * Returns an empty object when the form is valid and focuses the first bad field otherwise.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements)) {
    if (!(
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ))
      continue;
    if (el.name && !el.disabled && !el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(errors, extra);
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
