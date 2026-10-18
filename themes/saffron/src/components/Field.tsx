import type { InputHTMLAttributes } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<
  string,
  { missing: string; invalid?: string; check?: (value: string) => boolean }
>;

/** Native constraint validation plus optional custom checks, with messages that name the fix. Focuses the first problem. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!el) continue;
    if (el.validity.valueMissing) errors[name] = m.missing;
    else if (!el.validity.valid || (m.check && !m.check(el.value)))
      errors[name] = m.invalid ?? m.missing;
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  name,
  error,
  hint,
  className = "",
  ...input
}: FieldProps) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={described}
        {...input}
      />
      {hint && (
        <p className="field-hint" id={id + "-hint"}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={id + "-error"}>
          {error}
        </p>
      )}
    </div>
  );
}
