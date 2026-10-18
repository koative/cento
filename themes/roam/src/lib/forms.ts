export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Returns an empty object when valid; otherwise focuses the first bad field.
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
