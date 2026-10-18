import type { InputHTMLAttributes } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation, with messages that name the fix. Focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | null;
    if (!el || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
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
  options?: { value: string; label: string }[];
  multiline?: boolean;
} & InputHTMLAttributes<
  HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
>;

export function Field({
  label,
  name,
  error,
  hint,
  options,
  multiline,
  className = "",
  ...control
}: FieldProps) {
  const id = "f-" + name;
  const a11y = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby":
      [hint && id + "-hint", error && id + "-error"]
        .filter(Boolean)
        .join(" ") || undefined,
  };
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select {...a11y} {...control}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea rows={3} {...a11y} {...control} />
      ) : (
        <input {...a11y} {...control} />
      )}
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
