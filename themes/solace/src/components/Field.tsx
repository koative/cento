import type { ReactNode } from "react";

/** Label + control + inline error. The control itself sets id, aria-invalid and aria-describedby={`${id}-error`}. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="field" data-invalid={error ? "" : undefined}>
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint">{hint}</p>}
      {children}
      <p className="error" id={`${id}-error`}>
        {error}
      </p>
    </div>
  );
}
