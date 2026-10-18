import { useState, type FormEvent, type InputHTMLAttributes } from "react";

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Values = Record<string, string>;
type Errors<T> = Partial<Record<keyof T, string>>;

/**
 * Client-side form state. `check(keys)` validates a subset (one step of a longer form) and focuses the
 * first invalid field; `submit` validates everything, fakes a short "sending" delay, then flips to done.
 * Nothing leaves the browser.
 */
export function useForm<T extends Values>(
  initial: T,
  validate: (v: T) => Errors<T>,
) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function set(name: keyof T, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name])
      setErrors((e) => ({ ...e, [name]: validate(next)[name] }));
  }

  function check(keys: (keyof T)[], root: HTMLElement | null) {
    const all = validate(values);
    const found: Errors<T> = {};
    for (const k of keys) if (all[k]) found[k] = all[k];
    setErrors((e) => ({
      ...e,
      ...Object.fromEntries(keys.map((k) => [k, found[k]])),
    }));
    const first = keys.find((k) => found[k]);
    if (first)
      root?.querySelector<HTMLElement>(`[name="${String(first)}"]`)?.focus();
    return !first;
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!check(Object.keys(values), e.currentTarget)) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900);
  }

  function reset() {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  }

  return { values, errors, status, set, check, submit, reset };
}

type FieldProps = {
  // Method syntax keeps this assignable from useForm<T>, whose set() only accepts T's keys.
  form: {
    values: Values;
    errors: Partial<Record<string, string>>;
    set(name: string, value: string): void;
  };
  name: string;
  label: string;
  hint?: string;
  options?: string[];
  multiline?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "form" | "name" | "value" | "onChange"
>;

export function Field({
  form,
  name,
  label,
  hint,
  options,
  multiline,
  type = "text",
  className,
  ...rest
}: FieldProps) {
  const id = `f-${name}`;
  const error = form.errors[name];
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") ||
    undefined;
  const common = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div className={`field ${className ?? ""}`}>
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select
          {...common}
          required={rest.required}
          value={form.values[name]}
          onChange={(e) => form.set(name, e.target.value)}
        >
          <option value="">Choose…</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          {...common}
          required={rest.required}
          placeholder={rest.placeholder}
          rows={4}
          value={form.values[name]}
          onChange={(e) => form.set(name, e.target.value)}
        />
      ) : (
        <input
          {...common}
          {...rest}
          type={type}
          value={form.values[name]}
          onChange={(e) => form.set(name, e.target.value)}
        />
      )}
      {hint && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
