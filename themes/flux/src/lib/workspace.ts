import { useSyncExternalStore } from "react";
import { demoWorkflows, templates, type Workflow } from "../content";

/* Demo workspace state: lives in memory for the session, shared by every /app screen. */
let workflows: Workflow[] = demoWorkflows;
const listeners = new Set<() => void>();

export function useWorkflows() {
  return useSyncExternalStore(
    (fn) => (listeners.add(fn), () => listeners.delete(fn)),
    () => workflows,
  );
}

export function saveWorkflow(next: Workflow) {
  workflows = workflows.some((w) => w.id === next.id)
    ? workflows.map((w) => (w.id === next.id ? next : w))
    : [next, ...workflows];
  listeners.forEach((fn) => fn());
}

/** Copies a template into the workspace as a switched-off draft and returns its id. */
export function createFromTemplate(slug: string) {
  const t = templates.find((x) => x.slug === slug)!;
  const id = `wf-${slug}-${workflows.length + 1}`;
  saveWorkflow({
    id,
    name: t.name,
    team: t.team,
    owner: "You",
    on: false,
    runs30: 0,
    failed30: 0,
    lastRun: "Never",
    edited: "Just now",
    steps: t.steps.map((s) => ({ ...s, rule: s.rule && { ...s.rule } })),
    sample: t.sample.map((f) => ({ ...f })),
  });
  return id;
}
