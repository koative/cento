import type { CSSProperties, ReactNode } from "react";
import { circuits, type CircuitId } from "../content";

/** A strip of setter's tape: the circuit colour with the grade written on it. */
export function Tag({
  circuit,
  children,
}: {
  circuit: CircuitId;
  children: ReactNode;
}) {
  const c = circuits.find((x) => x.id === circuit)!;
  return (
    <span
      className="tag"
      style={{ "--tag": c.color, "--tag-on": c.on } as CSSProperties}
    >
      {children}
    </span>
  );
}
