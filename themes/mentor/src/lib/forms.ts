export type Errors = Record<string, string>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
const isControl = (el: Element): el is Control =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLSelectElement ||
  el instanceof HTMLTextAreaElement;

/**
 * Native constraint validation with our own wording per field name, limited to the
 * controls inside `scope` (a whole form, or one step of it). Focuses the first bad field.
 */
export function validate(
  scope: HTMLElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(
    scope.querySelectorAll("input, select, textarea"),
  )) {
    if (!isControl(el) || !el.name || el.disabled) continue;
    if (!el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(errors, extra);
  const first = Object.keys(errors)[0];
  if (first) scope.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
