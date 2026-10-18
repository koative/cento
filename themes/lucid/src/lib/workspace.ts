import { useSyncExternalStore } from "react";
import {
  docs,
  styleGuide,
  type Doc,
  type DocStatus,
  type Edit,
  type Paragraph,
} from "../content";
import { readingGrade, words } from "./text";

export type Decision = "accepted" | "rejected";
export type Rule = { id: string; avoid: string; prefer: string; note: string };
export type Voice = {
  oxford: boolean;
  contractions: boolean;
  sentenceCase: boolean;
  spelling: "Canadian" | "US" | "UK";
};

type State = {
  decisions: Record<string, Record<string, Decision>>;
  status: Record<string, DocStatus>;
  rules: Rule[];
  voice: Voice;
};

const KEY = "lucid-demo-workspace";
const initial: State = {
  decisions: {},
  status: {},
  rules: styleGuide.rules,
  voice: {
    oxford: false,
    contractions: true,
    sentenceCase: true,
    spelling: "Canadian",
  },
};

function load(): State {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return saved ? { ...initial, ...saved } : initial;
  } catch {
    return initial;
  }
}

let state = load();
const listeners = new Set<() => void>();

export function useWorkspace() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

export function update(change: (s: State) => Partial<State>) {
  state = { ...state, ...change(state) };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or full storage: the demo keeps working for this tab.
  }
  listeners.forEach((l) => l());
}

export function resetWorkspace() {
  update(() => initial);
}

export type Segment = { text: string } | { edit: Edit; key: string };

/** Split a paragraph into plain runs and its suggested edits, in reading order. */
export function segments(p: Paragraph, index: number): Segment[] {
  const found = (p.edits ?? [])
    .map((edit, i) => ({
      edit,
      key: `${index}-${i}`,
      at: p.text.indexOf(edit.from),
    }))
    .filter((e) => e.at >= 0)
    .sort((a, b) => a.at - b.at);
  const out: Segment[] = [];
  let pos = 0;
  for (const f of found) {
    if (f.at < pos) continue;
    if (f.at > pos) out.push({ text: p.text.slice(pos, f.at) });
    out.push({ edit: f.edit, key: f.key });
    pos = f.at + f.edit.from.length;
  }
  if (pos < p.text.length) out.push({ text: p.text.slice(pos) });
  return out;
}

/** Every suggestion in a document with its key, in reading order. */
export function editsOf(doc: Doc) {
  return doc.body.flatMap((p, i) =>
    segments(p, i).filter(
      (s): s is Extract<Segment, { edit: Edit }> => "edit" in s,
    ),
  );
}

/** The document text with current decisions applied (pending edits keep the original). */
export function resolvedText(
  doc: Doc,
  decisions: Record<string, Decision> = {},
) {
  return doc.body
    .map((p, i) =>
      segments(p, i)
        .map((s) =>
          "text" in s
            ? s.text
            : decisions[s.key] === "accepted"
              ? s.edit.to
              : s.edit.from,
        )
        .join(""),
    )
    .join("\n\n");
}

export function docStats(doc: Doc, s: State) {
  const decisions = s.decisions[doc.id] ?? {};
  const text = resolvedText(doc, decisions);
  return {
    open: editsOf(doc).filter((e) => !decisions[e.key]).length,
    words: words(text).length,
    grade: readingGrade(text),
    status: s.status[doc.id] ?? doc.status,
  };
}
