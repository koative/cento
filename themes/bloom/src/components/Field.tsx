import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation with messages that name the fix; focuses the first problem. */
export function validate(
  form: HTMLFormElement,
  messages: Messages,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (!el || el.validity === undefined || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  for (const [name, msg] of Object.entries(extra)) errors[name] ??= msg;
  const first = Object.keys(messages)
    .concat(Object.keys(extra))
    .find((n) => errors[n]);
  const target = first ? form.elements.namedItem(first) : null;
  (
    (target instanceof RadioNodeList ? target[0] : target) as HTMLElement | null
  )?.focus();
  return errors;
}

type Shell = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function describedBy(id: string, hint?: string, error?: string) {
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
        aria-describedby={describedBy(id, hint, error)}
        {...input}
      />
    </Wrap>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  className,
  ...rest
}: Shell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = "f-" + name;
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <textarea
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrap>
  );
}

export function Select({
  label,
  name,
  error,
  hint,
  className,
  children,
  ...rest
}: Shell & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = "f-" + name;
  return (
    <Wrap {...{ label, name, error, hint, className }}>
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      >
        {children}
      </select>
    </Wrap>
  );
}
