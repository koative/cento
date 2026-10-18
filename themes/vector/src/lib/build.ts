import { useSyncExternalStore } from "react";
import {
  brand,
  extras,
  interiors,
  models,
  paints,
  wheels,
  type Model,
  type WheelDesign,
} from "../content";

export type Build = {
  model: string;
  trim: string;
  paint: string;
  wheel: WheelDesign;
  interior: string;
  extras: string[];
};

const KEY = "vector.build";
const listeners = new Set<() => void>();

export const modelBySlug = (slug: string) =>
  models.find((m) => m.slug === slug);
export const paintHex = (id: string) =>
  (paints.find((p) => p.id === id) ?? paints[0]).hex;
export const longestRange = (m: Model) =>
  m.trims.reduce((a, b) => (b.range > a.range ? b : a));

export function defaultBuild(model: Model): Build {
  return {
    model: model.slug,
    trim: model.trims[0].id,
    paint: model.color,
    wheel: "aero",
    interior: interiors[0].id,
    extras: [],
  };
}

/** Accept only builds whose every choice still exists in content.ts. */
function valid(b: Partial<Build> | null): b is Build {
  const m = b?.model ? modelBySlug(b.model) : undefined;
  return (
    !!m &&
    !!b &&
    m.trims.some((t) => t.id === b.trim) &&
    m.paints.includes(b.paint ?? "") &&
    wheels.some((w) => w.id === b.wheel) &&
    interiors.some((i) => i.id === b.interior) &&
    Array.isArray(b.extras)
  );
}

function load(): Build | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return valid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

let saved = load();

export function saveBuild(next: Build) {
  saved = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode): the build still lives for this visit.
  }
  listeners.forEach((l) => l());
}

export function useSavedBuild() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => saved,
  );
}

/** Everything a summary needs: resolved choices, priced lines, range on the chosen wheels. */
export function describe(build: Build) {
  const model = modelBySlug(build.model) ?? models[0];
  const trim = model.trims.find((t) => t.id === build.trim) ?? model.trims[0];
  const paint = paints.find((p) => p.id === build.paint) ?? paints[0];
  const wheel = wheels.find((w) => w.id === build.wheel) ?? wheels[0];
  const interior =
    interiors.find((i) => i.id === build.interior) ?? interiors[0];
  const chosen = extras.filter(
    (e) =>
      build.extras.includes(e.id) &&
      (!e.models || e.models.includes(model.slug)),
  );
  const lines = [
    { label: `${model.name} ${trim.name} ${trim.drive}`, price: trim.price },
    { label: `${paint.name} paint`, price: paint.price },
    {
      label: `${wheel.name} ${model.rim + wheel.step}-inch wheels`,
      price: wheel.price,
    },
    { label: `${interior.name} interior`, price: interior.price },
    ...chosen.map((e) => ({ label: e.name, price: e.price })),
    { label: "Destination & delivery", price: brand.destination },
  ];
  return {
    model,
    trim,
    paint,
    wheel,
    interior,
    chosen,
    lines,
    total: lines.reduce((sum, l) => sum + l.price, 0),
    range: Math.round(trim.range * wheel.rangeFactor),
  };
}
