import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation with messages that name the fix. Focuses the first invalid field (or radio group); empty object when valid. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  let first: HTMLElement | null = null;
  for (const [name, m] of Object.entries(messages)) {
    const item = form.elements.namedItem(name);
    const el = (item instanceof RadioNodeList ? item[0] : item) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!el || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
    first ??= el;
  }
  first?.focus();
  return errors;
}

type Shell = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function described(id: string, error?: string, hint?: string) {
  return (
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined
  );
}

function Wrap({
  label,
  name,
  error,
  hint,
  className = "",
  children,
}: Shell & { children: ReactNode }) {
  const id = "f-" + name;
  return (
    <div className={"field " + className}>
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

export function Field({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: Shell & InputHTMLAttributes<HTMLInputElement>) {
  const id = "f-" + name;
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={described(id, error, hint)}
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
  options,
  placeholder,
  ...select
}: Shell &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
    placeholder?: string;
  }) {
  const id = "f-" + name;
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={described(id, error, hint)}
        {...select}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
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
}: Shell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = "f-" + name;
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={described(id, error, hint)}
        {...area}
      />
    </Wrap>
  );
}

type ChoicesProps = {
  legend: string;
  name: string;
  options: { value: string; label: string; note?: string }[];
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

/** Radio group drawn as chips; keyboard behaviour is the native radio group's. */
export function Choices({
  legend,
  name,
  options,
  error,
  required,
  value,
  onChange,
}: ChoicesProps) {
  const errId = "f-" + name + "-error";
  return (
    <fieldset className="choices" aria-describedby={error ? errId : undefined}>
      <legend>{legend}</legend>
      <div className="chips">
        {options.map((o) => (
          <label key={o.value} className="chip">
            <input
              type="radio"
              name={name}
              value={o.value}
              required={required}
              aria-invalid={error ? true : undefined}
              checked={value === undefined ? undefined : value === o.value}
              onChange={() => onChange?.(o.value)}
            />
            <span>
              {o.label}
              {o.note && <small>{o.note}</small>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="field-error" id={errId}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
