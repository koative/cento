import { useState, type FormEvent } from "react";

/** Each rule fails when the browser's own constraint check fails or when `test` returns false. */
export type Rules = Record<
  string,
  {
    message: string;
    test?: (value: string, el: Element | RadioNodeList | null) => boolean;
  }
>;
export type Status = "idle" | "sending" | "done";

export function useFormFlow(rules: Rules, delay = 1100) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function submit(
    e: FormEvent<HTMLFormElement>,
    onDone?: (data: FormData) => void,
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const [name, rule] of Object.entries(rules)) {
      const el = form.elements.namedItem(name);
      const value = String(data.get(name) ?? "").trim();
      const nativeOk =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        el instanceof HTMLSelectElement
          ? el.checkValidity()
          : value !== "";
      if (!nativeOk || (rule.test && !rule.test(value, el)))
        next[name] = rule.message;
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      const el = form.elements.namedItem(first);
      (el instanceof RadioNodeList
        ? (el[0] as HTMLElement)
        : (el as HTMLElement | null)
      )?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("done");
      onDone?.(data);
    }, delay);
  }

  /** Clears a field's error as soon as the visitor edits it. */
  function clear(name: string) {
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  }

  return { errors, status, submit, clear, reset: () => setStatus("idle") };
}

/** aria wiring for a control and its error/hint paragraphs. */
export function described(id: string, error?: string, hint?: boolean) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(" ");
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": ids || undefined,
  };
}

/** Stable callback ref: moves focus to a confirmation once, when it appears. */
export const focusOnMount = (el: HTMLElement | null) => el?.focus();
