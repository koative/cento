import type { InputHTMLAttributes, ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<
  string,
  {
    missing: string;
    invalid?: string;
    check?: (value: string) => string | undefined;
  }
>;

/**
 * Native constraint validation plus optional custom checks, with messages that
 * name the fix. Focuses the first invalid control; returns {} when valid.
 */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | RadioNodeList
      | null;
    if (!el) continue;
    if (el instanceof RadioNodeList) {
      if (!el.value) errors[name] = m.missing;
      continue;
    }
    if (!el.validity.valid)
      errors[name] = el.validity.valueMissing
        ? m.missing
        : (m.invalid ?? m.missing);
    else if (m.check) {
      const problem = m.check(el.value);
      if (problem) errors[name] = problem;
    }
  }
  const first = Object.keys(errors)[0];
  if (first) {
    const el = form.elements.namedItem(first);
    (el instanceof RadioNodeList
      ? (el[0] as HTMLElement)
      : (el as HTMLElement | null)
    )?.focus();
  }
  return errors;
}

/** Ids for a control's hint and error, joined for aria-describedby. */
export function describedBy(name: string, hint?: ReactNode, error?: string) {
  return (
    [hint && `f-${name}-hint`, error && `f-${name}-error`]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

export function FieldNote({
  name,
  hint,
  error,
}: {
  name: string;
  hint?: ReactNode;
  error?: string;
}) {
  return (
    <>
      {hint && (
        <p className="field-hint" id={`f-${name}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`f-${name}-error`}>
          {error}
        </p>
      )}
    </>
  );
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
  return (
    <div className={"field " + className}>
      <label htmlFor={`f-${name}`}>{label}</label>
      <input
        id={`f-${name}`}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        {...input}
      />
      <FieldNote name={name} hint={hint} error={error} />
    </div>
  );
}
