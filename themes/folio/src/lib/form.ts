import { useState, type ChangeEvent, type FormEvent } from "react";

type Errors<K extends string> = Partial<Record<K, string>>;
type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/**
 * Field state, inline validation and a simulated send. `prefix` keeps ids unique
 * when two forms share a page (the footer newsletter is always present).
 */
export function useForm<K extends string>(
  prefix: string,
  initial: Record<K, string>,
  validate: (v: Record<K, string>) => Errors<K>,
) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors<K>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const id = (name: K) => `${prefix}-${name}`;

  const set = (name: K, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const bind = (name: K) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: (e: ChangeEvent<Control>) => set(name, e.target.value),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(name) + "-error" : undefined,
  });

  function submit(e: FormEvent, onDone?: () => void) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as K[]).find((k) => found[k]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("done");
      onDone?.();
    }, 900);
  }

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  };

  return { values, errors, status, id, set, bind, submit, reset };
}
