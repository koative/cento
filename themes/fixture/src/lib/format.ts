const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Whole-dollar USD, the only currency on the site. */
export const money = (n: number) => usd.format(n);

export type Errors = Record<string, string>;

/**
 * Reads a form's native constraint validation into a field → message map (our wording per field),
 * then moves focus to the first invalid control so keyboard and screen-reader users land on the fix.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name || errors[el.name] || el.checkValidity()) continue;
    errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  const first = Object.keys(errors)[0];
  if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  return errors;
}

/** A query value from the hash route, e.g. `#/book?service=leak-repair` → "leak-repair". */
export const hashParam = (name: string) =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(name) ?? "";
