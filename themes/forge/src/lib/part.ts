import {
  families,
  finishes,
  materials,
  priceBreaks,
  tolerances,
  type FamilyId,
  type FinishId,
  type MaterialId,
  type TolId,
} from "../content";

export type PartSpec = {
  family: FamilyId;
  dims: Record<string, number>;
  material: MaterialId;
  finish: FinishId;
  tol: TolId;
  qty: number;
};

export const defaultDims = (family: FamilyId) =>
  Object.fromEntries(
    families.find((f) => f.id === family)!.dims.map((d) => [d.key, d.value]),
  );

/** Keeps dependent dimensions legal (bore inside the flange, journal under the main diameter). */
export function clampDims(family: FamilyId, dims: Record<string, number>) {
  const d = { ...dims };
  if (family === "flange") d.bore = Math.min(d.bore, d.od - 40);
  if (family === "bracket")
    d.t = Math.min(d.t, Math.floor(Math.min(d.w, d.h) / 3));
  if (family === "shaft") {
    d.d2 = Math.min(d.d2, d.d - 4);
    d.l2 = Math.min(d.l2, Math.floor(d.len / 2 / 5) * 5);
  }
  return d;
}

export const holeDia = (od: number) =>
  Math.round(Math.min(14, Math.max(5.5, od * 0.065)) * 2) / 2;

/** Stock and finished volume in cm³, plus a feature count that drives cycle time. */
function geometry(family: FamilyId, d: Record<string, number>) {
  const pi = Math.PI;
  if (family === "flange") {
    const h = holeDia(d.od);
    const stock = (pi * ((d.od + 4) / 2) ** 2 * (d.t + 2)) / 1000;
    const part =
      (pi * ((d.od / 2) ** 2 - (d.bore / 2) ** 2) * d.t -
        d.holes * pi * (h / 2) ** 2 * d.t) /
      1000;
    return { stock, part, features: d.holes + 3 };
  }
  if (family === "bracket") {
    // Cut from extruded angle stock, so only the faces and holes are machined.
    const part = (d.len * d.t * (d.w + d.h - d.t)) / 1000;
    const stock = part * 1.6;
    return { stock, part, features: d.holes + 4 };
  }
  const stock = (pi * ((d.d + 3) / 2) ** 2 * (d.len + 5)) / 1000;
  const part =
    (pi * ((d.d / 2) ** 2 * (d.len - d.l2) + (d.d2 / 2) ** 2 * d.l2)) / 1000;
  return { stock, part, features: 5 };
}

const RATE_PER_MIN = 1.6;

/* ponytail: illustrative cost model (stock + cycle time + finish + amortised setup); a real shop prices from CAM cycle times. */
export function quote(spec: PartSpec) {
  const fam = families.find((f) => f.id === spec.family)!;
  const mat = materials.find((m) => m.id === spec.material)!;
  const fin = finishes.find((f) => f.id === spec.finish)!;
  const tol = tolerances.find((t) => t.id === spec.tol)!;
  const g = geometry(spec.family, spec.dims);
  const material = ((g.stock * mat.density) / 1000) * mat.perKg * 1.15;
  const minutes =
    (6 + (g.stock - g.part) * 0.02 + g.features * 0.8) *
    mat.machinability *
    tol.factor;
  const setup =
    180 + { flange: 60, bracket: 40, shaft: 20 }[fam.id] + tol.setup;
  const unitAt = (qty: number) => {
    const runDiscount = qty >= 500 ? 0.75 : qty >= 100 ? 0.85 : 1;
    return (
      material +
      minutes * runDiscount * RATE_PER_MIN +
      fin.perPart +
      setup / qty
    );
  };
  const unit = unitAt(spec.qty);
  const machineHours = (spec.qty * minutes) / 60;
  const days = 6 + fin.days + tol.days + Math.ceil(machineHours / 48);
  return {
    unit,
    total: unit * spec.qty,
    setup,
    days,
    massG: g.part * mat.density,
    minutes,
    breaks: priceBreaks.map((q) => ({ qty: q, unit: unitAt(q) })),
  };
}

export function partNumber(spec: PartSpec) {
  const fam = families.find((f) => f.id === spec.family)!;
  const key = fam.dims.map((d) => spec.dims[d.key]).join("-");
  let h = 0;
  for (const c of key + spec.material + spec.finish + spec.tol)
    h = (h * 31 + c.charCodeAt(0)) % 9000;
  return `FG-${fam.prefix}-${String(1000 + h).padStart(4, "0")}`;
}

export function describe(spec: PartSpec) {
  const fam = families.find((f) => f.id === spec.family)!;
  return fam.dims.map(
    (d) => `${d.label}: ${spec.dims[d.key]}${d.key === "holes" ? "" : " mm"}`,
  );
}

export const usd = (n: number, digits = 2) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

/* Hand-off from the configurator to the RFQ form; module state is enough for one tab. */
let draft: PartSpec | null = null;
export const setDraft = (spec: PartSpec | null) => {
  draft = spec;
};
export const getDraft = () => draft;
