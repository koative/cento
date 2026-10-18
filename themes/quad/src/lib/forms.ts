import { useState, type FormEvent } from "react";

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Only checks controls inside `scope` (a fieldset for one step of a longer form).
 * Focuses the first invalid control.
 */
export function validate(
  scope: HTMLElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(
    scope.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea"),
  )) {
    if (el.name && !el.disabled && !el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(errors, extra);
  const first = Object.keys(errors)[0];
  if (first) scope.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
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

/** Fake latency so the loading state is visible. Nothing is sent anywhere. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
