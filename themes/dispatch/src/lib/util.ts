import { posts, topics, type Block, type Post } from "../content";

/* ---------------------------------------------------------------- dates */

const parseDay = (iso: string) => new Date(iso + "T12:00:00");

export const longDate = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const shortDate = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const dayMonth = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-US", { day: "numeric", month: "short" });

/** The next Sunday strictly after today, e.g. "Sunday, October 25". */
export function nextSunday(now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + (7 - d.getDay() || 7));
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/* ---------------------------------------------------------------- posts */

const blockWords = (b: Block) =>
  b.type === "list"
    ? b.items.join(" ")
    : b.type === "figure"
      ? b.caption
      : b.text + (b.type === "p" && b.note ? " " + b.note : "");

/** Considered, long-form reading pace in words per minute. */
const WPM = 200;

export const wordCount = (blocks: Block[]) =>
  blocks.reduce((n, b) => n + blockWords(b).split(/\s+/).length, 0);

export const minutes = (post: Post) =>
  Math.max(1, Math.round(wordCount(post.body) / WPM));

/** "No. 341" or "Field Note 118". */
export const issueLabel = (post: Post) =>
  post.kind === "letter" ? `No. ${post.number}` : `Field Note ${post.number}`;

export const topicOf = (post: Post) => topics.find((t) => t.id === post.topic)!;

export const postsIn = (topicId: string) =>
  posts.filter((p) => p.topic === topicId);

export const related = (post: Post, n = 3) =>
  [
    ...posts.filter((p) => p !== post && p.topic === post.topic),
    ...posts.filter((p) => p !== post && p.topic !== post.topic),
  ].slice(0, n);

/* ---------------------------------------------------------------- money */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/* ---------------------------------------------------------------- storage */

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the setting lasts for this visit only */
  }
}

/* ---------------------------------------------------------------- forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation, with our own wording per field name.
 * Returns an empty object when the form is valid and focuses the first bad field otherwise.
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
  for (const [k, v] of Object.entries(extra)) errors[k] ??= v;
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
  return errors;
}

const typos: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "hotmial.com": "hotmail.com",
  "yahooo.com": "yahoo.com",
  "outlok.com": "outlook.com",
  "iclod.com": "icloud.com",
};

/** "Did you mean ana@gmail.com?" for common domain slips, else undefined. */
export function emailTypo(email: string) {
  const [user, domain] = email.trim().toLowerCase().split("@");
  const fix = domain && typos[domain];
  return fix
    ? `Did you mean ${user}@${fix}? Fix the address and send again.`
    : undefined;
}

export const EMAIL_MSG = "Enter your email address, like name@example.com.";

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
