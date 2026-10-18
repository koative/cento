import { useState, type FormEvent } from "react";

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus any extra rule errors.
 * Returns {} when valid; otherwise focuses the first bad field.
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
  if (first)
    (form.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
  return errors;
}

/** Error map that clears each message as soon as its field becomes valid. */
export function useErrors() {
  const [errors, setErrors] = useState<Errors>({});
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.name && errors[t.name] && t.checkValidity())
      setErrors(({ [t.name]: _, ...rest }) => rest);
  };
  return { errors, setErrors, onChange };
}

/** Fake latency so the sending state is visible. Nothing leaves the browser. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

export const reference = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
