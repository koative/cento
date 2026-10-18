export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any extra checks.
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
  for (const [k, v] of Object.entries(extra)) if (!errors[k]) errors[k] = v;
  const first = Array.from(form.elements).find(
    (el) =>
      el instanceof HTMLElement &&
      "name" in el &&
      errors[(el as HTMLInputElement).name],
  );
  (first as HTMLElement | undefined)?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
