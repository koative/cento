import { useEffect, useState } from "react";
import { flights, vehicles, type VehicleId } from "../content";

export const money = (n: number) =>
  (n < 0 ? "−$" : "$") + Math.abs(Math.round(n)).toLocaleString("en-US");
export const num = (n: number) => n.toLocaleString("en-US");

export const day = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const utc = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }) + " UTC";

export const vehicleName = (id: VehicleId) =>
  vehicles.find((v) => v.id === id)!.name;

/** Re-renders every `ms` with the current time. */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

export const nextFlight = (now: number) =>
  flights.find((f) => Date.parse(f.date) > now);

export function countdown(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    d: String(Math.floor(s / 86400)),
    h: pad(Math.floor(s / 3600) % 24),
    m: pad(Math.floor(s / 60) % 60),
    s: pad(s % 60),
  };
}
