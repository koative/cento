export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording, plus any extra rules.
 * Moves focus to the first problem so keyboard and screen-reader users land on it.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name || el.checkValidity() || errors[el.name]) continue;
    errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  for (const [name, msg] of Object.entries(extra)) errors[name] ??= msg;
  const first = Array.from(form.elements).find(
    (el) => (el as HTMLInputElement).name in errors,
  ) as HTMLElement | undefined;
  first?.focus();
  return errors;
}
