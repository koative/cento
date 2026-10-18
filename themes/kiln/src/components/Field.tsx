import type { InputHTMLAttributes, ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation with messages that name the fix. Focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  let first: HTMLElement | null = null;
  for (const [name, m] of Object.entries(messages)) {
    // querySelector (not elements.namedItem) so radio groups resolve to their first enabled input.
    const el = form.querySelector<HTMLInputElement>(
      `[name="${name}"]:not(:disabled)`,
    );
    if (!el || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
    first ??= el;
  }
  first?.focus();
  return errors;
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

/** Label, control, hint and error wired together. `children` replaces the default input (for selects and textareas). */
export function Field({
  label,
  name,
  error,
  hint,
  className = "",
  children,
  ...input
}: FieldProps &
  InputHTMLAttributes<HTMLInputElement> & { children?: ReactNode }) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className} data-invalid={error ? "" : undefined}>
      <label htmlFor={id}>{label}</label>
      {children ?? (
        <input
          id={id}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
          {...input}
        />
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
