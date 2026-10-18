import type { ReactNode } from "react";

/** Label + control + inline error. The control must carry id={name} and aria-describedby from `describedBy(name, hint)`. */
export function Field({
  name,
  label,
  hint,
  error,
  optional,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="field" data-invalid={error ? "" : undefined}>
      <label htmlFor={name}>
        {label}
        {optional && <span className="optional"> (optional)</span>}
      </label>
      {children}
      {hint && (
        <p className="hint" id={`${name}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (name: string, hint: boolean, error?: string) =>
  [hint && `${name}-hint`, error && `${name}-error`]
    .filter(Boolean)
    .join(" ") || undefined;

type Messages = Partial<Record<keyof ValidityState | "custom", string>>;

/**
 * Runs native constraint validation on every named control and maps each failure to
 * the message that names the fix. `custom` checks run after native ones pass.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, Messages>,
  custom: Record<string, (v: string) => boolean> = {},
) {
  const errors: Record<string, string> = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    const name = el.name;
    if (!name || !messages[name] || errors[name]) continue;
    const m = messages[name];
    const failed = (Object.keys(m) as (keyof ValidityState)[]).find(
      (k) => k !== ("custom" as string) && el.validity?.[k],
    );
    if (failed) errors[name] = m[failed]!;
    else if (custom[name] && !custom[name](el.value))
      errors[name] = m.custom ?? "Check this field.";
  }
  return errors;
}

/** Moves focus to the first control with an error, in document order. */
export function focusFirst(
  form: HTMLFormElement,
  errors: Record<string, string>,
) {
  const first = (Array.from(form.elements) as HTMLInputElement[]).find(
    (el) => el.name && errors[el.name],
  );
  first?.focus();
}
