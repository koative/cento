import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Native constraint validation with messages that name the fix. Focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  let first: HTMLElement | null = null;
  for (const [name, m] of Object.entries(messages)) {
    const item = form.elements.namedItem(name);
    if (!item) continue;
    if (item instanceof RadioNodeList) {
      if (item.value) continue;
      errors[name] = m.missing;
      first ??= item[0] as HTMLElement;
      continue;
    }
    const el = item as Control;
    if (el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
    first ??= el;
  }
  first?.focus();
  return errors;
}

type Shared = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function Frame({
  id,
  label,
  error,
  hint,
  className = "",
  children,
}: Shared & { id: string; children: ReactNode }) {
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

function aria(id: string, error?: string, hint?: string) {
  return {
    id,
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
  const id = "f-" + name;
  return (
    <Frame
      id={id}
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      <input name={name} {...aria(id, error, hint)} {...input} />
    </Frame>
  );
}

export function Area({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = "f-" + name;
  return (
    <Frame
      id={id}
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      <textarea name={name} {...aria(id, error, hint)} {...input} />
    </Frame>
  );
}

export function Choice({
  label,
  name,
  error,
  hint,
  className,
  options,
  placeholder,
  ...select
}: Shared &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: readonly string[];
    placeholder: string;
  }) {
  const id = "f-" + name;
  return (
    <Frame
      id={id}
      label={label}
      name={name}
      error={error}
      hint={hint}
      className={className}
    >
      <select
        name={name}
        defaultValue=""
        {...aria(id, error, hint)}
        {...select}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Frame>
  );
}
