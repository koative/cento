import type { Experiment } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const short = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export const money = (n: number) => usd.format(n);
export const moneyShort = (n: number) => short.format(n);

/** "62%", "$412" — an experiment reading in its own unit. */
export const reading = (v: number, unit: Experiment["unit"]) =>
  unit === "$" ? `$${v.toLocaleString("en-US")}` : `${v}%`;

/** Relative change of variant over control, signed: "+15%", "−23%". */
export function change(control: number, variant: number) {
  const pct = Math.round((variant / control - 1) * 100);
  return `${pct > 0 ? "+" : pct < 0 ? "−" : "±"}${Math.abs(pct)}%`;
}

/** A test wins when the variant moved the right way and we are at least 95% sure of it. */
export const isWin = (
  e: Pick<Experiment, "control" | "variant" | "confidence" | "lowerIsBetter">,
) =>
  e.confidence >= 95 &&
  (e.lowerIsBetter ? e.variant < e.control : e.variant > e.control);

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any custom errors.
 * Focuses the first bad field in document order and returns the error map (empty when valid).
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  const fields = Array.from(form.elements).filter(
    (el): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement,
  );
  for (const el of fields) {
    if (el.name && !el.disabled && !el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(errors, extra);
  fields.find((el) => el.name in errors)?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
