import {
  areas,
  estimateOptions,
  rates,
  services,
  type Service,
} from "../content";

export type EstimateInput = {
  slug: string;
  qty: number;
  age: string;
  access: string;
  timing: string;
  zip: string;
};

export type Line = { key: string; label: string; value: number };

export const defaultInput = (slug = services[0].slug): EstimateInput => ({
  slug,
  qty: 1,
  age: "new",
  access: "open",
  timing: "ahead",
  zip: "",
});

/** Area for a 5-digit ZIP, or undefined when we have never heard of it. */
export const areaForZip = (zip: string) =>
  areas.find((a) => a.zips.includes(zip.trim()));

const round5 = (n: number) => Math.round(n / 5) * 5;

/** The same arithmetic a technician does at the door, line by line. */
export function estimate(input: EstimateInput) {
  const service = services.find((s) => s.slug === input.slug) ?? services[0];
  const m = service.model;
  const age =
    estimateOptions.age.find((a) => a.id === input.age) ??
    estimateOptions.age[0];
  const access =
    estimateOptions.access.find((a) => a.id === input.access) ??
    estimateOptions.access[0];
  const timing =
    estimateOptions.timing.find((t) => t.id === input.timing) ??
    estimateOptions.timing[0];
  const area = areaForZip(input.zip);

  const extra = input.qty - 1;
  const hours = (m.hours + m.perHours * extra) * age.factor + access.hours;
  const parts = m.parts + m.perParts * extra + access.parts;

  const lines: Line[] = [
    {
      key: "callout",
      label: "Call-out & diagnosis — waived with the repair",
      value: 0,
    },
    {
      key: "labour",
      label: `Labour — ${hours.toFixed(1)} h × $${rates.labour}`,
      value: Math.round(hours * rates.labour),
    },
  ];
  if (parts)
    lines.push({ key: "parts", label: "Parts & materials", value: parts });
  if (timing.fee)
    lines.push({ key: "timing", label: timing.label, value: timing.fee });
  if (area?.tier === "outer")
    lines.push({
      key: "zone",
      label: `Outer-zone trip — ${area.name}`,
      value: rates.outerZone,
    });

  const total = lines.reduce((sum, l) => sum + l.value, 0);
  return {
    service,
    hours,
    lines,
    area,
    low: round5(total * 0.9),
    high: round5(total * 1.15),
  };
}

/** Lowest realistic price for a service, shown as "from" on cards. */
export const fromPrice = (s: Service) => estimate(defaultInput(s.slug)).low;

/* ——— Hand-off from the estimator to the booking form (session only; works without storage) ——— */

const KEY = "fixture-estimate";

export function saveEstimate(input: EstimateInput) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(input));
  } catch {
    /* private mode: the booking form simply starts blank */
  }
}

export function loadEstimate(): EstimateInput | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw
      ? { ...defaultInput(), ...(JSON.parse(raw) as Partial<EstimateInput>) }
      : null;
  } catch {
    return null;
  }
}

export function clearEstimate() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* nothing stored */
  }
}
