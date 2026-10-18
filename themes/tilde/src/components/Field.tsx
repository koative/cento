import type { ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Native constraint validation with messages that name the fix. Empty object when valid; focuses the first problem. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as Control | RadioNodeList | null;
    if (!el) continue;
    const first =
      el instanceof RadioNodeList ? (el[0] as HTMLInputElement) : el;
    if (first.validity.valid) continue;
    errors[name] = first.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  const name = Object.keys(errors)[0];
  if (name) {
    const el = form.elements.namedItem(name);
    (el instanceof RadioNodeList
      ? (el[0] as HTMLElement)
      : (el as HTMLElement)
    ).focus();
  }
  return errors;
}

type A11y = { id: string; "aria-invalid"?: true; "aria-describedby"?: string };

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
  children: (a11y: A11y) => ReactNode;
};

export function Field({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: FieldProps) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": described,
      })}
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
