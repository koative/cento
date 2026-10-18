import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Errors = Record<string, string>;
export type Messages = Record<string, { missing: string; invalid?: string }>;

/** Native constraint validation, with messages that name the fix. Focuses the first invalid control. */
export function validate(form: HTMLFormElement, messages: Messages): Errors {
  const errors: Errors = {};
  for (const [name, m] of Object.entries(messages)) {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (!el || el.validity === undefined || el.validity.valid) continue;
    errors[name] = el.validity.valueMissing
      ? m.missing
      : (m.invalid ?? m.missing);
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  return errors;
}

type Base = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};
type Props =
  | (Base & { as?: "input" } & Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "name" | "className"
      >)
  | (Base & { as: "select"; children: ReactNode } & Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        "name" | "className"
      >)
  | (Base & { as: "textarea" } & Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        "name" | "className"
      >);

export function Field(props: Props) {
  const { label, name, error, hint, className = "", ...rest } = props;
  const id = "f-" + name;
  const described =
    [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") ||
    undefined;
  const common = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": described,
  };
  let control: ReactNode;
  if (rest.as === "select") {
    const { as: _, ...select } = rest;
    control = <select {...common} {...select} />;
  } else if (rest.as === "textarea") {
    const { as: _, ...area } = rest;
    control = <textarea {...common} {...area} />;
  } else {
    const { as: _, ...input } = rest;
    control = <input {...common} {...input} />;
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
