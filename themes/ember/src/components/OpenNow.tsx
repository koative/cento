import { useEffect, useState } from "react";
import { openStatus } from "../lib/time";

/** Live open/closed label, refreshed every minute. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState(() => openStatus());
  useEffect(() => {
    const t = setInterval(() => setStatus(openStatus()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <p
      className={`open-now ${className}`}
      data-open={status.open ? "" : undefined}
    >
      <span className="open-dot" aria-hidden="true" />
      {status.open ? "Open now · " : ""}
      {status.label}
    </p>
  );
}
