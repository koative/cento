import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation with messages that name the fix; focuses the first invalid field. Empty object = valid. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!el || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

type Common = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function Shell({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: Common & { children: ReactNode }) {
  return (
    <div className={"field " + className}>
      <label htmlFor={"f-" + name}>{label}</label>
      {children}
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
    </div>
  );
}

function aria({ name, error, hint }: Common) {
  return {
    id: "f-" + name,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby":
      [hint && `f-${name}-hint`, error && `f-${name}-error`]
        .filter(Boolean)
        .join(" ") || undefined,
  };
}

export function Field({
  label,
  name,
  error,
  hint,
  className,
  ...rest
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  const c = { label, name, error, hint, className };
  return (
    <Shell {...c}>
      <input {...aria(c)} {...rest} />
    </Shell>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className,
  children,
  ...rest
}: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  const c = { label, name, error, hint, className };
  return (
    <Shell {...c}>
      <select {...aria(c)} {...rest}>
        {children}
      </select>
    </Shell>
  );
}

export function TextField({
  label,
  name,
  error,
  hint,
  className,
  ...rest
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const c = { label, name, error, hint, className };
  return (
    <Shell {...c}>
      <textarea {...aria(c)} {...rest} />
    </Shell>
  );
}
