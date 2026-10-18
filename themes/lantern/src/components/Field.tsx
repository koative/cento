import type {
  Dispatch,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<
  string,
  { missing: string; invalid?: string; check?: (value: string) => boolean }
>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Native constraint validation plus optional custom checks, with messages that name the fix.
 * Focuses the first invalid control. Returns an empty object when the form is valid.
 */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as Control | null;
    if (!el) continue;
    if (el.validity.valueMissing) errors[name] = m.missing;
    else if (!el.validity.valid || (m.check && !m.check(el.value.trim())))
      errors[name] = m.invalid ?? m.missing;
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

/** Form `onInput` handler: drop a control's error as soon as the visitor edits it, so stale messages never sit under a fixed field. */
export function clearError(setErrors: Dispatch<SetStateAction<Errors>>) {
  return (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as Control).name;
    setErrors((errs) => {
      if (!(name in errs)) return errs;
      const next = { ...errs };
      delete next[name];
      return next;
    });
  };
}

type Shared = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
};

function Wrap({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: Shared & { children: ReactNode }) {
  const id = "f-" + name;
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

function aria(name: string, error?: string, hint?: ReactNode) {
  const id = "f-" + name;
  return {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby":
      [hint && id + "-hint", error && id + "-error"]
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
  ...input
}: Shared & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <input {...aria(name, error, hint)} {...input} />
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
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <select {...aria(name, error, hint)} {...select}>
        {children}
      </select>
    </Wrap>
  );
}

export function TextField({
  label,
  name,
  error,
  hint,
  className,
  ...area
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <textarea {...aria(name, error, hint)} rows={4} {...area} />
    </Wrap>
  );
}
