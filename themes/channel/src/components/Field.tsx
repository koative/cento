import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation, with messages that name the fix. Focuses the first bad field; empty object = valid. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    if (!el || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

type Common = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};
type FieldProps = Common &
  (
    | ({ as?: "input" } & InputHTMLAttributes<HTMLInputElement>)
    | ({ as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>)
    | ({
        as: "select";
        children: ReactNode;
      } & SelectHTMLAttributes<HTMLSelectElement>)
  );

export function Field(props: FieldProps) {
  const { label, name, error, hint, className = "", ...rest } = props;
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": described,
  };
  let control: ReactNode;
  if (rest.as === "textarea") {
    const { as: _, ...attrs } = rest;
    control = <textarea {...shared} rows={5} {...attrs} />;
  } else if (rest.as === "select") {
    const { as: _, ...attrs } = rest;
    control = <select {...shared} {...attrs} />;
  } else {
    const { as: _, ...attrs } = rest;
    control = <input {...shared} {...attrs} />;
  }
  return (
    <div className={"field " + className}>
      <label htmlFor={id}>{label}</label>
      {control}
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
