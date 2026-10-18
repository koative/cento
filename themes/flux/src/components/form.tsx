import { useState, type FormEvent, type InputHTMLAttributes } from "react";

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Values = Record<string, string>;
type Errors<T> = Partial<Record<keyof T, string>>;

/**
 * Client-side form state: validates on submit, focuses the first invalid field,
 * fakes a short "sending" delay, then flips to done. Nothing leaves the browser.
 */
export function useForm<T extends Values>(
  initial: T,
  validate: (v: T) => Errors<T>,
) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function set(name: keyof T, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name])
      setErrors((e) => ({
        ...e,
        [name]: validate({ ...values, [name]: value })[name],
      }));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found).find((k) => found[k]);
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900);
  }

  function reset() {
    setValues(initial);
    setStatus("idle");
  }

  return { values, errors, status, set, submit, reset };
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
  const message = (
    <>
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
    </>
  );

  if (type === "checkbox")
    return (
      <div className="field field-check">
        <input
          {...common}
          {...rest}
          type="checkbox"
          checked={form.values[name] === "yes"}
          onChange={(e) => form.set(name, e.target.checked ? "yes" : "")}
        />
        <label htmlFor={id}>{label}</label>
        {message}
      </div>
    );

  return (
    <div className="field">
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
          rows={5}
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
      {message}
    </div>
  );
}
