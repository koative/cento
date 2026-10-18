import type { Hours } from "../content";
import { deskStatus } from "../lib";

/** Live "front desk open" signal, like the lamp by each house's door. */
export function DeskStatus({ hours }: { hours: Hours[] }) {
  const s = deskStatus(hours);
  return (
    <span className="status" data-open={s.open ? "" : undefined}>
      {s.label}
    </span>
  );
}
