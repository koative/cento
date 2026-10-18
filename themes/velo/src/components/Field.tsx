import type { InputHTMLAttributes, ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** First enabled control for a name; disabled radios are skipped by constraint validation. */
function control(form: HTMLFormElement, name: string) {
  const el = form.elements.namedItem(name);
  if (el instanceof RadioNodeList)
    return [...el].find((r) => !(r as HTMLInputElement).disabled) as
      HTMLInputElement | undefined;
  return (el as HTMLInputElement | null) ?? undefined;
}

/** Native constraint validation with messages that name the fix. Focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const input = control(form, name);
    if (input && !input.validity.valid)
      errors[name] = input.validity.valueMissing
        ? m.missing
        : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first) control(form, first)?.focus();
  return errors;
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
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
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p className="field-error" id={id + "-error"}>
      {error}
    </p>
  ) : null;
}
