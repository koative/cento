import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation, with messages that name the fix. Returns an empty object when the form is valid. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | RadioNodeList | null;
    if (!el) continue;
    const input =
      el instanceof RadioNodeList ? (el[0] as HTMLInputElement) : el;
    if (input.validity.valid) continue;
    errors[name] = input.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first) {
    const el = form.elements.namedItem(first);
    (el instanceof RadioNodeList
      ? (el[0] as HTMLElement)
      : (el as HTMLElement)
    ).focus();
  }
  return errors;
}

type Shared = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
};

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return (
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined
  );
}

function Notes({
  id,
  hint,
  error,
}: {
  id: string;
  hint?: ReactNode;
  error?: string;
}) {
  return (
    <>
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
    </>
  );
}

export function Field({
  label,
  name,
  error,
  hint,
  className = "",
  ...input
}: Shared & InputHTMLAttributes<HTMLInputElement>) {
  const id = "f-" + name;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...input}
      />
      <Notes id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className = "",
  children,
  ...select
}: Shared & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = "f-" + name;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...select}
      >
        {children}
      </select>
      <Notes id={id} hint={hint} error={error} />
    </div>
  );
}
