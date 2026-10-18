import {
  cloneElement,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactElement,
} from "react";

export type Errors = Record<string, string>;

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  /** A <select> or <textarea>; defaults to an <input> built from the remaining props. */
  children?: ReactElement<Record<string, unknown>>;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  name,
  error,
  hint,
  children,
  className = "",
  ...input
}: FieldProps) {
  const id = `f-${name}`;
  const a11y = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby":
      [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") ||
      undefined,
  };
  return (
    <div className={`field ${className}`} data-invalid={error ? "" : undefined}>
      <label htmlFor={id}>{label}</label>
      {hint && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children ? cloneElement(children, a11y) : <input {...a11y} {...input} />}
      {error && (
        <p className="field-error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Validate a form with the browser's constraint API, mapping each invalid field to
 * the message from `messages` (keyed by field name). Returns the errors and focuses the first.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
): Errors {
  const errors: Errors = {};
  let first: HTMLInputElement | undefined;
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (el.name && el.willValidate && !el.checkValidity() && !errors[el.name]) {
      errors[el.name] = messages[el.name] ?? el.validationMessage;
      first ??= el;
    }
  }
  first?.focus();
  return errors;
}

/** Error map for a form, clearing each message as soon as its field becomes valid. */
export function useErrors() {
  const [errors, setErrors] = useState<Errors>({});
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.name && errors[t.name] && t.checkValidity()) {
      setErrors(({ [t.name]: _, ...rest }) => rest);
    }
  };
  return { errors, setErrors, onChange };
}
