export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Returns {} when valid; otherwise focuses the first bad field.
 */
export function validate(
  form: HTMLFormElement,
  messages: Errors,
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
    (target instanceof RadioNodeList
      ? (target[0] as HTMLElement | undefined)
      : (target as HTMLElement | null)
    )?.focus();
  }
  return errors;
}

/** Fake network latency so the loading state is visible. Nothing is sent anywhere. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
