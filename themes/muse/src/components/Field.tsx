import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation with messages that name the fix. Focuses the first invalid field; returns {} when valid. */
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

type Shared = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function Wrap({
  id,
  label,
  error,
  hint,
  className = "",
  children,
}: Omit<Shared, "name"> & { id: string; children: ReactNode }) {
  return (
    <div className={"field " + className} data-invalid={error ? "" : undefined}>
      <label htmlFor={id}>{label}</label>
      {children}
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

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
  undefined;

export function Field({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: Shared & InputHTMLAttributes<HTMLInputElement>) {
  const id = "f-" + name;
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...input}
      />
    </Wrap>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className,
  children,
  ...select
}: Shared & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = "f-" + name;
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...select}
      >
        {children}
      </select>
    </Wrap>
  );
}
