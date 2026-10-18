import type {
  Dispatch,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Form onChange handler: drops a field's error as soon as the visitor edits that field. */
export const clearError =
  (setErrors: Dispatch<SetStateAction<Errors>>) =>
  (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name;
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

/** Native constraint validation with messages that name the fix; focuses the first invalid control. */
export function validate(
  form: HTMLFormElement,
  messages: Messages,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | RadioNodeList | null;
    if (!el) continue;
    const input =
      el instanceof RadioNodeList ? (el[0] as HTMLInputElement) : el;
    if (extra[name]) errors[name] = extra[name];
    else if (!input.validity.valid)
      errors[name] = input.validity.valueMissing
        ? m.missing
        : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first) {
    const el = form.elements.namedItem(first);
    (el instanceof RadioNodeList
      ? (el[0] as HTMLElement)
      : (el as HTMLElement | null)
    )?.focus();
  }
  return errors;
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function Field({
  label,
  name,
  error,
  hint,
  className = "",
  ...input
}: FieldProps) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={described}
        {...input}
      />
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

/** Error line for groups (radios, fieldsets) that Field does not wrap. */
export function GroupError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p className="field-error" id={id}>
      {error}
    </p>
  ) : null;
}
