import { useState, type FormEvent } from "react";

export type Errors = Record<string, string>;

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export const money = (n: number) => eur.format(n);

/**
 * Native constraint validation with our own wording per field name, plus extra checks.
 * Focuses the first bad field and returns an empty object when the form is valid.
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
    const field = form.elements.namedItem(first);
    (field instanceof RadioNodeList
      ? (field[0] as HTMLElement)
      : (field as HTMLElement | null)
    )?.focus();
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

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
