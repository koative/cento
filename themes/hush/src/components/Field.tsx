import type { InputHTMLAttributes, ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation, with messages that name the fix. Returns an empty object when the form is valid. */
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

type Shared = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function Wrap({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: Shared & {
  children: (aria: {
    id: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
  }) => ReactNode;
}) {
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

export function Field({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: Shared & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      {(aria) => <input name={name} {...aria} {...input} />}
    </Wrap>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className,
  options,
  placeholder,
}: Shared & { options: string[]; placeholder: string }) {
  return (
    <Wrap
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      {(aria) => (
        <select name={name} required defaultValue="" {...aria}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
    </Wrap>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  className,
  minLength,
}: Shared & { minLength: number }) {
  return (
    <Wrap
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      {(aria) => (
        <textarea
          name={name}
          rows={5}
          required
          minLength={minLength}
          {...aria}
        />
      )}
    </Wrap>
  );
}
