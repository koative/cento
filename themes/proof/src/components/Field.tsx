import {
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Digits, spaces, +, dashes and brackets; at least 7. Escaped for the browser's `v`-flag pattern matching. */
export const PHONE_PATTERN = "[0-9\\s+\\(\\)\\-]{7,}";

/**
 * Native constraint validation with messages that name the fix, plus optional custom checks.
 * Focuses the first invalid control. Returns an empty object when the form is valid.
 */
export function validate(
  form: HTMLFormElement,
  messages: Messages,
  custom: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.querySelector<Control>(`[name="${name}"]:not(:disabled)`);
    if (custom[name]) errors[name] = custom[name];
    else if (el && !el.validity.valid)
      errors[name] = el.validity.valueMissing
        ? m.missing
        : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first)
    form
      .querySelector<HTMLElement>(`[name="${first}"]:not(:disabled)`)
      ?.focus();
  return errors;
}

/** Submit → validate → short "sending" pause → done. Nothing leaves the browser. */
export function useFormFlow(
  messages: Messages,
  onDone: (data: FormData) => void,
  custom?: (data: FormData) => Errors,
) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = validate(form, messages, custom?.(data));
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      onDone(data);
    }, 900);
  }

  /** Re-check a field that already shows an error as soon as it is fixed. */
  function onChange(e: FormEvent<HTMLFormElement>) {
    const el = e.target as Control;
    if (!errors[el.name] || !el.validity.valid) return;
    const { [el.name]: _fixed, ...rest } = errors;
    setErrors(rest);
  }

  return { errors, sending, onSubmit, onChange };
}

type Common = {
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
}: Common & { children: (a11y: object) => ReactNode }) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      {children({
        id,
        name,
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
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      {(a) => <input {...a} {...input} />}
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
}: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      {(a) => (
        <select {...a} {...select}>
          {children}
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
  ...area
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      {(a) => <textarea rows={4} {...a} {...area} />}
    </Wrap>
  );
}
