import { CircleCheck, CircleSlash, CircleX } from "lucide-react";
import type { RunStatus } from "../content";

const icon = { Succeeded: CircleCheck, Stopped: CircleSlash, Failed: CircleX };

export function RunStatusTag({
  status,
  label = status,
}: {
  status: RunStatus;
  label?: string;
}) {
  const Icon = icon[status];
  return (
    <span className="status-tag" data-status={status}>
      <Icon size={14} aria-hidden />
      {label}
    </span>
  );
}
