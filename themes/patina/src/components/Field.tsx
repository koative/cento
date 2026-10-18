import {
  createElement,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation, with messages that name the fix. Extra errors (from custom checks) are merged in. */
export function validate(
  form: HTMLFormElement,
  messages: Messages,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (!el || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  for (const [name, message] of Object.entries(extra)) errors[name] ??= message;
  const first = Object.keys(messages)
    .concat(Object.keys(extra))
    .find((n) => errors[n]);
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
  return errors;
}

type Base = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};
type Props = Base &
  (
    | ({ as?: "input" } & InputHTMLAttributes<HTMLInputElement>)
    | ({ as: "select" } & SelectHTMLAttributes<HTMLSelectElement>)
    | ({ as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  );

export function Field({
  label,
  name,
  error,
  hint,
  className = "",
  as = "input",
  ...control
}: Props) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      {createElement(as, {
        id,
        name,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": described,
        ...control,
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
