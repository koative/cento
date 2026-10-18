import { cases, services, type ServiceId } from "./content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any custom errors.
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
  if (first) {
    const target = form.elements.namedItem(first);
    const el =
      target instanceof RadioNodeList
        ? (target[0] as HTMLElement | undefined)
        : (target as HTMLElement | null);
    el?.focus();
  }
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------ brief estimate */

/**
 * What a brief with these disciplines usually takes: the people, the weeks and a fee floor.
 * Disciplines overlap in practice, so each extra one adds two weeks and the fee floor gets 15% off.
 */
export function estimate(ids: ServiceId[]) {
  const picked = services.filter((s) => ids.includes(s.id));
  if (!picked.length) return null;
  const extra = picked.length - 1;
  const roles = [...new Set(picked.flatMap((s) => s.roles))];
  const weeks: [number, number] = [
    Math.max(...picked.map((s) => s.weeks[0])),
    Math.max(...picked.map((s) => s.weeks[1])) + extra * 2,
  ];
  const floor =
    Math.round(
      (picked.reduce((sum, s) => sum + s.from, 0) * (extra ? 0.85 : 1)) / 5000,
    ) * 5000;
  const closest = [...cases]
    .map((c) => ({
      c,
      score: c.disciplines.filter((d) => ids.includes(d)).length,
    }))
    .sort((a, b) => b.score - a.score || b.c.year - a.c.year)[0].c;
  return { roles, weeks, floor, closest };
}
