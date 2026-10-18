import type { InputHTMLAttributes, ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<
  string,
  { missing: string; invalid?: string; check?: (value: string) => boolean }
>;

/** Native constraint validation plus optional custom checks, with messages that name the fix. Empty object = valid. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | null;
    if (!el) continue;
    if (!el.validity.valid)
      errors[name] = el.validity.valueMissing
        ? m.missing
        : (m.invalid ?? m.missing);
    else if (m.check && !m.check(el.value))
      errors[name] = m.invalid ?? m.missing;
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

type A11y = { id: string; "aria-invalid"?: true; "aria-describedby"?: string };
type ShellProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
  children: (a11y: A11y) => ReactNode;
};

/** Label, hint and error wiring for any control. */
export function Shell({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: ShellProps) {
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
  className,
  ...input
}: FieldProps) {
  return (
    <Shell
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      {(a11y) => <input name={name} {...a11y} {...input} />}
    </Shell>
  );
}
