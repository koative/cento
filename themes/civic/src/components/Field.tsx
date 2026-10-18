import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation with messages that name the fix. Focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name);
    if (!(
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    ))
      continue;
    if (!el.validity.valid)
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
  hint?: ReactNode;
  className?: string;
};

function Frame({
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
      {hint && (
        <p className="field-hint" id={id + "-hint"}>
          {hint}
        </p>
      )}
      {children}
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
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": described,
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
    <Frame {...{ label, name, error, hint, className }}>
      <input {...aria(name, error, hint)} {...input} />
    </Frame>
  );
}

export function Area({
  label,
  name,
  error,
  hint,
  className,
  ...area
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Frame {...{ label, name, error, hint, className }}>
      <textarea {...aria(name, error, hint)} {...area} />
    </Frame>
  );
}
