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

/** Native validity → a message that names the fix. */
export function messageFor(
  el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  label: string,
) {
  const v = el.validity;
  if (v.valueMissing) return `${label} is required.`;
  if (v.typeMismatch && el.type === "email")
    return "Enter an email like name@example.com.";
  if (v.tooShort && "minLength" in el)
    return `${label} needs at least ${el.minLength} characters — a few more details help.`;
  if (v.rangeUnderflow || v.rangeOverflow)
    return `${label} must be between ${(el as HTMLInputElement).min} and ${(el as HTMLInputElement).max}.`;
  if (v.patternMismatch) return `Check the format of ${label.toLowerCase()}.`;
  return el.validationMessage;
}
