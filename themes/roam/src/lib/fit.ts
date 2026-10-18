import { bagKinds, type Car } from "../content";

export type Load = { people: number; bags: Record<string, number> };

export type Fit = {
  ok: boolean;
  /** Cubic feet the bags need and the room in the best seat layout for this many people. */
  need: number;
  room: number;
  layout: string;
  reason: string;
};

export function fit(car: Car, load: Load): Fit {
  const need = bagKinds.reduce(
    (sum, b) => sum + b.cuft * (load.bags[b.id] ?? 0),
    0,
  );
  if (load.people > car.seats)
    return {
      ok: false,
      need,
      room: car.cargo[0].cuft,
      layout: car.cargo[0].label,
      reason: `Seats ${car.seats}, not ${load.people}`,
    };
  const layouts = car.cargo
    .filter((s) => load.people <= s.upTo)
    .sort((a, b) => a.cuft - b.cuft);
  const step =
    layouts.find((s) => s.cuft >= need) ?? layouts[layouts.length - 1];
  const long = bagKinds.some((b) => b.long && (load.bags[b.id] ?? 0) > 0);
  if (long && !car.longLoad)
    return {
      ok: false,
      need,
      room: step.cuft,
      layout: step.label,
      reason: "No room for skis or boards",
    };
  if (need > step.cuft)
    return {
      ok: false,
      need,
      room: step.cuft,
      layout: step.label,
      reason: `${(need - step.cuft).toFixed(1)} cu ft too much`,
    };
  return {
    ok: true,
    need,
    room: step.cuft,
    layout: step.label,
    reason: step.label,
  };
}
