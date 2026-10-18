export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any custom errors.
 * Focuses the first invalid field and returns the error map (empty when valid).
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
  for (const [k, v] of Object.entries(extra)) errors[k] ??= v;
  const first = Object.keys(errors)[0];
  const el = first ? form.elements.namedItem(first) : null;
  ((el instanceof RadioNodeList ? el[0] : el) as HTMLElement | null)?.focus();
  return errors;
}

/** Fake network latency so the loading state is visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/** A short booking reference, e.g. "EMB-4K7Q". */
export const reference = (prefix: string) =>
  `${prefix}-${Array.from({ length: 4 }, () => "ACDEFGHJKMNPQRTUVWXY34679"[Math.floor(Math.random() * 25)]).join("")}`;
