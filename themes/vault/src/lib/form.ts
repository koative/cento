export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any extra errors.
 * Checks only fields inside `scope` (a form or one fieldset step) and focuses the first bad one.
 */
export function validate(
  scope: HTMLFormElement | HTMLFieldSetElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(scope.elements)) {
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
  if (first) scope.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 1100) => new Promise((r) => setTimeout(r, ms));
