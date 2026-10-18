import { useEffect, useRef, useState } from "react";
import { connectors, type Rule, type SampleField, type Step } from "../content";

export type StepState = "idle" | "active" | "done" | "stopped" | "skipped";

export const connector = (slug: string) =>
  connectors.find((c) => c.slug === slug);

const opWord = { ">": "over", "<": "under", "=": "exactly" } as const;

/** "$3,400", "120 people", "9" — a sample value in its field's unit. */
export function formatValue(field: SampleField | undefined, value: number) {
  const n = value.toLocaleString("en-US");
  return field?.unit === "$" ? `$${n}` : field?.unit ? `${n} ${field.unit}` : n;
}

export function ruleText(rule: Rule, sample: SampleField[]) {
  const f = sample.find((s) => s.key === rule.field);
  return `${f?.label ?? rule.field} is ${opWord[rule.op]} ${formatValue(f, rule.value)}`;
}

function passes(rule: Rule, sample: SampleField[]) {
  const v = sample.find((s) => s.key === rule.field)?.value ?? 0;
  return rule.op === ">"
    ? v > rule.value
    : rule.op === "<"
      ? v < rule.value
      : v === rule.value;
}

/** Final state of every step for this sample: a failing condition stops the run and skips the rest. */
export function evaluate(steps: Step[], sample: SampleField[]): StepState[] {
  let stopped = false;
  return steps.map((s) => {
    if (stopped) return "skipped";
    if (s.kind === "condition" && s.rule && !passes(s.rule, sample)) {
      stopped = true;
      return "stopped";
    }
    return "done";
  });
}

/**
 * Plays a test run step by step (the pulse travels down the wire), then settles on evaluate()'s result.
 * Changing steps or sample clears the previous result.
 */
export function useTestRun(steps: Step[], sample: SampleField[]) {
  const [states, setStates] = useState<StepState[] | null>(null);
  const timers = useRef<number[]>([]);
  const running = states?.includes("active") ?? false;

  const clear = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    clear();
    setStates(null);
  }, [steps, sample]);

  useEffect(() => clear, []);

  function run() {
    clear();
    const final = evaluate(steps, sample);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return setStates(final);
    const last = final.findIndex((s) => s === "stopped");
    const end = last === -1 ? final.length - 1 : last;
    for (let i = 0; i <= end; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setStates(
            final.map((s, j) => (j < i ? s : j === i ? "active" : "idle")),
          );
        }, i * 520),
      );
    }
    timers.current.push(
      window.setTimeout(() => setStates(final), (end + 1) * 520),
    );
  }

  const done = states !== null && !running;
  const stoppedAt = done ? states.indexOf("stopped") : -1;
  return {
    states,
    running,
    done,
    stoppedAt,
    run,
    reset: () => (clear(), setStates(null)),
  };
}
