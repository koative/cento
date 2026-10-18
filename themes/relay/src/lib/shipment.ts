import { DEMO_NOW, type Mode, type Shipment } from "../content";
import { hub, legShares, routeKm } from "./geo";

export type ScanEvent = {
  at: Date;
  place: string;
  code: string;
  text: string;
  tone?: "bad" | "ok";
};

/* Effective speed (km/h incl. rests) and dwell per intermediate hub, by mode. */
const pace: Record<Mode, { kmh: number; dwell: number; handling: number }> = {
  road: { kmh: 58, dwell: 3, handling: 2 },
  rail: { kmh: 42, dwell: 4, handling: 5 },
  sea: { kmh: 26, dwell: 10, handling: 8 },
  air: { kmh: 420, dwell: 5, handling: 4 },
};

const HOUR = 3_600_000;

/** Total door-to-door hours, the anchor time at progress 0, and the ETA. */
export function schedule(s: Shipment) {
  const p = pace[s.mode];
  const hours =
    routeKm(s.route, s.mode) / p.kmh +
    p.dwell * (s.route.length - 2) +
    p.handling * 2;
  const live =
    s.status === "In transit" ||
    s.status === "Out for delivery" ||
    s.status === "Exception";
  const start = live
    ? new Date(DEMO_NOW).getTime() - s.progress * hours * HOUR - 0.6 * HOUR
    : new Date(s.pickup).getTime();
  const at = (share: number, extra = 0) =>
    new Date(start + (share * hours + extra) * HOUR);
  return {
    hours,
    start: new Date(start),
    at,
    eta: at(1, 3),
    distance: routeKm(s.route, s.mode),
  };
}

/** Scan history, newest first. Generated from the route so every shipment reads like a real record. */
export function timeline(s: Shipment): ScanEvent[] {
  const { at } = schedule(s);
  const shares = legShares(s.route);
  const origin = hub(s.route[0]);
  const dest = hub(s.route[s.route.length - 1]);
  const dwell = pace[s.mode].dwell;
  const events: (ScanEvent & { pos: number })[] = [
    {
      pos: -1,
      at: at(0, -18),
      place: "Relay platform",
      code: "BKD",
      text: `Booking confirmed, rate fixed. Reference ${s.ref}.`,
    },
  ];
  if (s.status === "Booked") {
    events.push({
      pos: -1,
      at: at(0, -16),
      place: origin.city,
      code: "PLN",
      text: `Collection planned. ${s.unit}.`,
    });
    return events.reverse();
  }
  events.push(
    {
      pos: 0,
      at: at(0),
      place: origin.city,
      code: "COL",
      text: `Collected, ${s.pallets} ${s.pallets === 1 ? "pallet" : "pallets"} scanned, seal recorded.`,
    },
    {
      pos: 0,
      at: at(0, 1.5),
      place: `${origin.city} ${origin.kind.toLowerCase()}`,
      code: "DEP",
      text: departText(s.mode, origin.city),
    },
  );
  s.route.slice(1, -1).forEach((code, i) => {
    const h = hub(code);
    events.push(
      {
        pos: shares[i + 1],
        at: at(shares[i + 1]),
        place: `${h.city} ${h.kind.toLowerCase()}`,
        code: "ARR",
        text: `Arrived at ${h.city}, weighed and photographed.`,
      },
      {
        pos: shares[i + 1],
        at: at(shares[i + 1], dwell),
        place: `${h.city} ${h.kind.toLowerCase()}`,
        code: "DEP",
        text: departText(s.mode, h.city),
      },
    );
  });
  events.push(
    {
      pos: 0.99,
      at: at(1),
      place: `${dest.city} ${dest.kind.toLowerCase()}`,
      code: "ARR",
      text: `Arrived at destination hub ${dest.city}.`,
    },
    {
      pos: 0.999,
      at: at(1, 2),
      place: dest.city,
      code: "OFD",
      text: "Out for delivery. Two-hour window sent to the consignee.",
    },
  );
  if (s.status === "Delivered")
    events.push({
      pos: 1,
      at: at(1, 4.5),
      place: dest.city,
      code: "POD",
      text: `Delivered. Signed by ${s.pod ?? "consignee"}, photo attached.`,
      tone: "ok",
    });
  const reached =
    s.status === "Delivered"
      ? 2
      : s.status === "Out for delivery"
        ? 0.999
        : s.progress;
  const done = events.filter((e) => e.pos <= reached);
  if (s.status === "Exception" && s.exception) {
    const last = done[done.length - 1];
    done.push({
      pos: reached,
      at: new Date(last.at.getTime() + 0.8 * HOUR),
      place: last.place,
      code: "EXC",
      text: s.exception,
      tone: "bad",
    });
  }
  return done.reverse();
}

function departText(mode: Mode, city: string) {
  if (mode === "rail") return `Departed ${city} on the rail shuttle.`;
  if (mode === "sea") return `Sailed from ${city}.`;
  if (mode === "air")
    return `Screened and departed ${city} on the night flight.`;
  return `Departed ${city} on the linehaul.`;
}

/** Where the marker sits on the map: delivered sits at the destination, booked at the origin. */
export const mapShare = (s: Shipment) =>
  s.status === "Delivered" ? 1 : Math.min(1, s.progress);
