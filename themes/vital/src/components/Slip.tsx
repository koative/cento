import type { ReactNode } from "react";
import { Mark } from "./Mark";

export type SlipRow = { label: string; value?: string; alert?: boolean };

/** The tear-off visit slip: the one page a clinician reads before your visit. Values re-ink when they change. */
export function Slip({
  code,
  rows,
  footer,
  className = "",
}: {
  code: string;
  rows: SlipRow[];
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`slip ${className}`}>
      <div className="slip-paper">
        <div className="slip-head">
          <Mark />
          <span>Visit slip</span>
          <span className="num">{code}</span>
        </div>
        <dl>
          {rows.map((r) => (
            <div
              key={r.label}
              data-filled={r.value ? "" : undefined}
              data-alert={r.alert ? "" : undefined}
            >
              <dt>{r.label}</dt>
              <dd key={r.value ?? ""}>{r.value ?? "—"}</dd>
            </div>
          ))}
        </dl>
        {footer && <div className="slip-foot">{footer}</div>}
      </div>
    </div>
  );
}
