import { useState, type FormEvent } from "react";

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any custom errors.
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
  if (first) {
    const target = form.querySelector<HTMLElement>(
      `[name="${first}"], [data-error-for="${first}"]`,
    );
    target?.focus();
  }
  return errors;
}

/** Error map for a form; each message clears as soon as its field becomes valid. */
export function useErrors() {
  const [errors, setErrors] = useState<Errors>({});
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.name && errors[t.name] && t.checkValidity())
      setErrors(({ [t.name]: _, ...rest }) => rest);
  };
  return { errors, setErrors, onChange };
}

/** Pretend network latency so the sending state is visible. Nothing leaves the browser. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
