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
  for (const [k, v] of Object.entries(extra)) errors[k] ??= v;
  const first = Array.from(form.elements).find(
    (el) => el instanceof HTMLElement && errors[(el as HTMLInputElement).name],
  );
  (first as HTMLElement | undefined)?.focus();
  return errors;
}

/** Error map for a form that clears each message as soon as its field becomes valid. */
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
export const pause = (ms = 1100) => new Promise((r) => setTimeout(r, ms));

/** A reference like ALY-T-4821 for confirmation screens. */
export const reference = (prefix: string) =>
  `ALY-${prefix}-${String(Math.floor(1000 + Math.random() * 9000))}`;
