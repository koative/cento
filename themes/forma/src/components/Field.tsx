import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<
  string,
  { missing: string; invalid?: string; check?: (value: string) => boolean }
>;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Native constraint validation plus optional custom checks, with messages that name the fix. Empty object = valid. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as Control | RadioNodeList | null;
    if (!el) continue;
    if (el instanceof RadioNodeList) {
      if (!el.value) errors[name] = m.missing;
      continue;
    }
    if (!el.validity.valid)
      errors[name] = el.validity.valueMissing
        ? m.missing
        : (m.invalid ?? m.missing);
    else if (m.check && !m.check(el.value.trim()))
      errors[name] = m.invalid ?? m.missing;
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

type Common = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

function Wrap({
  id,
  label,
  error,
  hint,
  className = "",
  children,
}: Omit<Common, "name"> & { id: string; children: ReactNode }) {
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

const aria = (id: string, error?: string, hint?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby":
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined,
});

export function Field({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = "f-" + name;
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <input name={name} {...aria(id, error, hint)} {...input} />
    </Wrap>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = "f-" + name;
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <textarea name={name} {...aria(id, error, hint)} {...input} />
    </Wrap>
  );
}

export function Select({
  label,
  name,
  error,
  hint,
  className,
  options,
  ...input
}: Common & {
  options: readonly string[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = "f-" + name;
  return (
    <Wrap id={id} label={label} error={error} hint={hint} className={className}>
      <select name={name} {...aria(id, error, hint)} {...input}>
        <option value="">Choose one</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </Wrap>
  );
}
