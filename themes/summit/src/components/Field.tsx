import {
  cloneElement,
  type InputHTMLAttributes,
  type ReactElement,
} from "react";

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
