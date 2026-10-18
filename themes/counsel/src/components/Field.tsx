import type { ReactNode } from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Message for one control, or "" when it is valid. */
export function check(el: Control, m: Messages[string]) {
  if (el.validity.valid) return "";
  return el.validity.valueMissing ? m.missing : (m.invalid ?? m.missing);
}

/** Native constraint validation with messages that name the fix; focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name);
    if (!(el instanceof HTMLElement) || !("validity" in el)) continue;
    const msg = check(el as Control, m);
    if (msg) errors[name] = msg;
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

/** Clears an error as soon as the control becomes valid again. Use as the form's onChange. */
export function revalidate(
  target: EventTarget,
  errors: Errors,
  messages: Messages,
): Errors | null {
  const el = target as Control;
  if (!el.name || !errors[el.name] || !messages[el.name]) return null;
  const msg = check(el, messages[el.name]);
  return msg === errors[el.name] ? null : { ...errors, [el.name]: msg };
}

type ControlProps = {
  id: string;
  name: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
  children: (props: ControlProps) => ReactNode;
};

export function Field({
  label,
  name,
  error,
  hint,
  optional,
  className = "",
  children,
}: FieldProps) {
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="field-optional"> (optional)</span>}
      </label>
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
