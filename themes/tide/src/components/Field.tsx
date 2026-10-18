import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

/** Label, control, hint and inline error. The control must carry `id` and aria-describedby={`${id}-msg`}. */
export function Field({ id, label, error, hint, children }: Props) {
  return (
    <div className="field" data-invalid={error ? "" : undefined}>
      <label htmlFor={id}>{label}</label>
      {children}
      <p id={`${id}-msg`} className={error ? "field-error" : "field-hint"}>
        {error ?? hint}
      </p>
    </div>
  );
}
