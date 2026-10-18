import {
  accessories,
  classes,
  finishers,
  slots,
  trainers,
  type Goal,
  type Level,
  type Lift,
  type Slot,
} from "./content";

/* ------------------------------------------------------------ format */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/** "05:45" → "5:45am" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
}

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Monday-first day index for a date. */
export const weekday = (d = new Date()) => (d.getDay() + 6) % 7;

export const classById = (id: string) => classes.find((c) => c.id === id);
export const trainerById = (id: string) => trainers.find((t) => t.id === id);

export const byTime = (a: Slot, b: Slot) =>
  a.day - b.day || toMinutes(a.time) - toMinutes(b.time);

/** Slots from now onwards, wrapping into next week, soonest first. */
export function upcoming(
  filter: (s: Slot) => boolean = () => true,
  now = new Date(),
) {
  const today = weekday(now);
  const mins = now.getHours() * 60 + now.getMinutes();
  const offset = (s: Slot) => {
    const delta = (s.day - today) * 1440 + toMinutes(s.time) - mins;
    return delta < 0 ? delta + 7 * 1440 : delta;
  };
  return slots
    .filter(filter)
    .map((s) => ({ slot: s, inMinutes: offset(s) }))
    .sort((a, b) => a.inMinutes - b.inMinutes);
}

export function relative(inMinutes: number, slot: Slot, now = new Date()) {
  if (inMinutes < 60) return `in ${inMinutes} min`;
  const days = (slot.day - weekday(now) + 7) % 7;
  if (days === 0 && inMinutes < 1440) return "today";
  if (days === 1) return "tomorrow";
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][slot.day];
}

/* ------------------------------------------------------------ plates */

/** Calibrated bumper plates in lb, heaviest first, with their colour token. */
export const plateSet: { lb: number; color: string }[] = [
  { lb: 55, color: "var(--red)" },
  { lb: 45, color: "var(--blue)" },
  { lb: 35, color: "var(--yellow)" },
  { lb: 25, color: "var(--green)" },
  { lb: 10, color: "var(--chalk)" },
  { lb: 5, color: "var(--steel)" },
  { lb: 2.5, color: "var(--steel)" },
];

export const BAR = 45;

/** Plates for one side of the bar, heaviest first. Weights are assumed to be in 5 lb steps. */
export function platesPerSide(total: number) {
  let side = Math.max(0, (total - BAR) / 2);
  const out: number[] = [];
  for (const { lb } of plateSet) {
    while (side >= lb - 1e-9) {
      out.push(lb);
      side -= lb;
    }
  }
  return out;
}

export const round5 = (n: number) => Math.max(BAR, Math.round(n / 5) * 5);

/* ------------------------------------------------------------ programme */

type Scheme = { sets: number; reps: number; pct: number };

/** Main-lift waves over four weeks: build, build, peak, deload. */
const waves: Record<Goal, { main: Scheme[]; second: Scheme[] }> = {
  strength: {
    main: [
      { sets: 5, reps: 5, pct: 0.75 },
      { sets: 4, reps: 4, pct: 0.8 },
      { sets: 4, reps: 3, pct: 0.85 },
      { sets: 3, reps: 5, pct: 0.65 },
    ],
    second: [
      { sets: 3, reps: 6, pct: 0.65 },
      { sets: 3, reps: 6, pct: 0.675 },
      { sets: 3, reps: 5, pct: 0.7 },
      { sets: 2, reps: 6, pct: 0.6 },
    ],
  },
  muscle: {
    main: [
      { sets: 4, reps: 8, pct: 0.65 },
      { sets: 4, reps: 8, pct: 0.675 },
      { sets: 5, reps: 6, pct: 0.725 },
      { sets: 3, reps: 8, pct: 0.6 },
    ],
    second: [
      { sets: 3, reps: 10, pct: 0.6 },
      { sets: 3, reps: 10, pct: 0.625 },
      { sets: 4, reps: 8, pct: 0.65 },
      { sets: 2, reps: 10, pct: 0.55 },
    ],
  },
  engine: {
    main: [
      { sets: 3, reps: 5, pct: 0.7 },
      { sets: 3, reps: 5, pct: 0.725 },
      { sets: 3, reps: 5, pct: 0.75 },
      { sets: 2, reps: 5, pct: 0.65 },
    ],
    second: [
      { sets: 2, reps: 8, pct: 0.6 },
      { sets: 2, reps: 8, pct: 0.6 },
      { sets: 3, reps: 8, pct: 0.625 },
      { sets: 2, reps: 8, pct: 0.55 },
    ],
  },
};

const levelShift: Record<Level, number> = {
  new: -0.05,
  returning: -0.025,
  experienced: 0,
};

/** Lift pairs per training day, by days per week. A fifth day is conditioning only. */
const splits: Record<number, [Lift, Lift][]> = {
  2: [
    ["squat", "press"],
    ["deadlift", "bench"],
  ],
  3: [
    ["squat", "bench"],
    ["deadlift", "press"],
    ["squat", "bench"],
  ],
  4: [
    ["squat", "bench"],
    ["deadlift", "press"],
    ["bench", "squat"],
    ["press", "deadlift"],
  ],
};

export type Prescription = {
  lift: Lift;
  sets: number;
  reps: number;
  weight: number;
  pct: number;
};
export type Day = {
  main?: Prescription;
  second?: Prescription;
  extras: string[];
  finisher: string;
};
export type ProgrammeInput = {
  goal: Goal;
  days: number;
  level: Level;
  maxes: Record<Lift, number>;
};

function prescribe(
  lift: Lift,
  s: Scheme,
  input: ProgrammeInput,
  scale = 1,
): Prescription {
  const pct = (s.pct + levelShift[input.level]) * scale;
  return {
    lift,
    sets: s.sets,
    reps: s.reps,
    pct,
    weight: round5(input.maxes[lift] * pct),
  };
}

/** A four-week block: weeks[w][d]. */
export function buildProgramme(input: ProgrammeInput): Day[][] {
  const wave = waves[input.goal];
  const split = splits[Math.min(4, input.days)];
  return wave.main.map((mainScheme, w) => {
    const days: Day[] = split.map(([a, b], d) => {
      // The third day of a three-day week repeats day one, lighter.
      const scale = input.days === 3 && d === 2 ? 0.9 : 1;
      return {
        main: prescribe(a, mainScheme, input, scale),
        second: prescribe(b, wave.second[w], input, scale),
        extras: accessories[a][input.goal],
        finisher: finishers[input.goal],
      };
    });
    if (input.days === 5) {
      days.push({
        extras: ["Zone 2 row or bike, 30 min", "Mobility & Reset flow, 15 min"],
        finisher: finishers.engine,
      });
    }
    return days;
  });
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation, with our own wording per field name.
 * Returns an empty object when valid and focuses the first bad field otherwise.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements)) {
    if (!(
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ))
      continue;
    if (el.name && !el.disabled && !el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(errors, extra);
  const first = Object.keys(errors)[0];
  if (first) {
    const el = form.elements.namedItem(first);
    (el instanceof RadioNodeList
      ? (el[0] as HTMLElement)
      : (el as HTMLElement | null)
    )?.focus?.();
  }
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/** Query string after the hash route: #/join?plan=coached */
export const hashParams = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "");

/* ------------------------------------------------------------ storage */

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the builder still works for this visit */
  }
}
