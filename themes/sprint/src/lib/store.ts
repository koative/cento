import { useSyncExternalStore } from "react";
import {
  initialActivity,
  initialComments,
  issues as seedIssues,
  notificationOptions,
  people,
  statuses,
  workspace,
  type Issue,
  type Status,
} from "../content";
import { statusName } from "./format";

/*
 * The /app demo's whole world: issues, their history and the workspace settings.
 * Kept in memory, mirrored to localStorage when it is available. Nothing leaves the browser.
 */

export type Note = { key: string; who: string; text: string; at: string };
export type Role = "Admin" | "Member" | "Guest";

export type DemoState = {
  issues: Issue[];
  comments: Note[];
  activity: Note[];
  limits: Record<Status, number | null>;
  workspaceName: string;
  weekStart: string;
  notifications: Record<string, boolean>;
  members: { id: string; name: string; email: string; role: Role }[];
};

const KEY = "sprint-demo-v1";

function seed(): DemoState {
  return {
    issues: seedIssues.map((i) => ({
      ...i,
      checklist: i.checklist.map((c) => ({ ...c })),
    })),
    comments: [...initialComments],
    activity: [...initialActivity],
    limits: Object.fromEntries(
      statuses.map((s) => [s.id, s.limit ?? null]),
    ) as Record<Status, number | null>,
    workspaceName: `${workspace.name} · ${workspace.team}`,
    weekStart: "Monday",
    notifications: Object.fromEntries(
      notificationOptions.map((n) => [n.id, n.on]),
    ),
    members: people.map((p) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      role: p.id === workspace.me ? "Admin" : "Member",
    })),
  };
}

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed === "object" &&
        "issues" in parsed &&
        Array.isArray(parsed.issues)
      ) {
        // Stored by this same module; merging over a fresh seed fills any field added since.
        return { ...seed(), ...(parsed as Partial<DemoState>) };
      }
    }
  } catch {
    /* storage blocked or corrupt: start from the seed */
  }
  return seed();
}

let state = load();
const listeners = new Set<() => void>();

function commit(next: DemoState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode: keep working in memory */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => (
  listeners.add(l),
  () => void listeners.delete(l)
);

export function useDemo() {
  return useSyncExternalStore(subscribe, () => state);
}

/** Local wall-clock time as "YYYY-MM-DDTHH:MM:SS", the same shape as the seed data. */
const stamp = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 19);

function log(key: string, text: string): Note {
  return { key, who: workspace.me, text, at: stamp() };
}

/** Move a card to `status`, landing at `index` within that column (clamped). */
export function moveIssue(key: string, status: Status, index: number) {
  const issue = state.issues.find((i) => i.key === key);
  if (!issue) return;
  const rest = state.issues.filter((i) => i.key !== key);
  const column = rest.filter((i) => i.status === status);
  const moved = {
    ...issue,
    status,
    updated: issue.status === status ? issue.updated : stamp(),
  };
  const before = column[Math.max(0, Math.min(index, column.length))];
  const at = before
    ? rest.indexOf(before)
    : column.length
      ? rest.indexOf(column[column.length - 1]) + 1
      : rest.length;
  rest.splice(at, 0, moved);
  const activity =
    issue.status === status
      ? state.activity
      : [
          ...state.activity,
          log(
            key,
            `moved from ${statusName(issue.status)} to ${statusName(status)}`,
          ),
        ];
  commit({ ...state, issues: rest, activity });
}

export function updateIssue(
  key: string,
  patch: Partial<Issue>,
  change: string,
) {
  commit({
    ...state,
    issues: state.issues.map((i) =>
      i.key === key ? { ...i, ...patch, updated: stamp() } : i,
    ),
    activity: [...state.activity, log(key, change)],
  });
}

export function toggleCheck(key: string, index: number) {
  commit({
    ...state,
    issues: state.issues.map((i) =>
      i.key === key
        ? {
            ...i,
            checklist: i.checklist.map((c, n) =>
              n === index ? { ...c, done: !c.done } : c,
            ),
          }
        : i,
    ),
  });
}

export function addComment(key: string, text: string) {
  commit({ ...state, comments: [...state.comments, log(key, text)] });
}

/** Creates an issue at the bottom of `status` and returns its key. */
export function addIssue(title: string, status: Status) {
  const top = Math.max(...state.issues.map((i) => Number(i.key.split("-")[1])));
  const key = `${workspace.prefix}-${top + 1}`;
  const issue: Issue = {
    key,
    title,
    status,
    priority: "medium",
    assignee: null,
    estimate: 1,
    labels: [],
    updated: stamp(),
    description: [],
    checklist: [],
  };
  commit({
    ...state,
    issues: [...state.issues, issue],
    activity: [...state.activity, log(key, "created the issue")],
  });
  return key;
}

export function saveSettings(patch: Partial<DemoState>) {
  commit({ ...state, ...patch });
}

export function resetDemo() {
  commit(seed());
}
