import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ id, label, error, hint, children, className }: Props) {
  return (
    <div
      className={"field " + (className ?? "")}
      data-invalid={error ? "" : undefined}
    >
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint">{hint}</p>}
      {children}
      {error && (
        <p className="error" id={id + "-error"}>
          {error}
        </p>
      )}
    </div>
  );
}
