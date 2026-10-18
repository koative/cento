import { useState, type KeyboardEvent } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, X } from "lucide-react";
import { diffWords, resolve, type Part } from "../lib/diff";

type Decision = "accepted" | "rejected";

/** Props that make an inline span act as a button. Real <button>s cannot wrap across lines, and edits often do. */
export function pressable(onPress: () => void) {
  return {
    role: "button",
    tabIndex: 0,
    onClick: onPress,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      onPress();
    },
  };
}

/**
 * Review mode: deletions struck and insertions underlined in blue pencil. Select a change to accept or reject it,
 * or use J/K to move, A to accept, R to reject. Parents reset it by changing `key`.
 */
export function TrackedChanges({ parts }: { parts: Part[] }) {
  const total = parts.filter((p) => p.kind === "change").length;
  const [decisions, setDecisions] = useState<Record<number, Decision>>({});
  const [selected, setSelected] = useState<number | null>(total ? 0 : null);
  const [clean, setClean] = useState(false);
  const [copied, setCopied] = useState("");

  const pending = Array.from({ length: total }, (_, i) => i).filter(
    (i) => !decisions[i],
  );
  const accepted = Object.values(decisions).filter(
    (d) => d === "accepted",
  ).length;
  const changes = parts.filter((p) => p.kind === "change");

  function decide(i: number, d: Decision) {
    const next = { ...decisions, [i]: d };
    setDecisions(next);
    const after = pending.filter((p) => p !== i);
    setSelected(after.find((p) => p > i) ?? after[0] ?? null);
  }

  function acceptAll() {
    setDecisions(
      Object.fromEntries(
        Array.from({ length: total }, (_, i) => [
          i,
          decisions[i] ?? "accepted",
        ]),
      ),
    );
    setSelected(null);
  }

  function move(step: 1 | -1) {
    if (!pending.length) return;
    const from = selected ?? (step === 1 ? -1 : total);
    const list = step === 1 ? pending : [...pending].reverse();
    setSelected(
      list.find((p) => (step === 1 ? p > from : p < from)) ?? list[0],
    );
  }

  async function copy() {
    const text = resolve(parts, (i) => decisions[i] !== "rejected");
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Clean copy is on your clipboard.");
    } catch {
      setCopied(
        "Your browser blocked the clipboard. Switch to Clean view and copy the text by hand.",
      );
    }
  }

  function onKey(e: KeyboardEvent) {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.metaKey ||
      e.ctrlKey
    )
      return;
    const k = e.key.toLowerCase();
    if (k === "j") move(1);
    else if (k === "k") move(-1);
    else if (k === "a" && selected !== null) decide(selected, "accepted");
    else if (k === "r" && selected !== null) decide(selected, "rejected");
    else return;
    e.preventDefault();
  }

  let n = -1;
  const sel = selected !== null ? changes[selected] : null;

  return (
    <div className="tracked" onKeyDown={onKey}>
      <div className="tracked-tools">
        <p className="tracked-count num">
          {total === 0
            ? "No changes suggested"
            : `${total} ${total === 1 ? "change" : "changes"} · ${pending.length} to review`}
        </p>
        <div className="seg" role="group" aria-label="View">
          <button
            type="button"
            aria-pressed={!clean}
            onClick={() => setClean(false)}
          >
            Markup
          </button>
          <button
            type="button"
            aria-pressed={clean}
            onClick={() => setClean(true)}
          >
            Clean
          </button>
        </div>
      </div>

      <p className="tracked-text" data-clean={clean ? "" : undefined}>
        {parts.map((p, k) => {
          if (p.kind === "same") return <span key={k}>{p.text}</span>;
          n++;
          const i = n;
          const d = decisions[i];
          if (clean || d)
            return (
              <span key={k} className="resolved" data-state={d ?? "preview"}>
                {d === "rejected" ? p.del : p.ins}
              </span>
            );
          return (
            <span
              key={k}
              {...pressable(() => setSelected(i))}
              className="hunk"
              style={{ ["--i" as string]: i }}
              aria-pressed={selected === i}
              aria-label={
                p.del && p.ins
                  ? `Change ${i + 1}: replace “${p.del.trim()}” with “${p.ins.trim()}”`
                  : p.del
                    ? `Change ${i + 1}: delete “${p.del.trim()}”`
                    : `Change ${i + 1}: insert “${p.ins.trim()}”`
              }
            >
              {p.del && <del>{p.del}</del>}
              {p.ins && <ins>{p.ins}</ins>}
            </span>
          );
        })}
      </p>

      <div className="review-bar">
        <p aria-live="polite" className="review-status">
          {sel && selected !== null ? (
            <>
              <span className="num">
                Change {selected + 1} of {total}:
              </span>{" "}
              {sel.del && sel.ins ? (
                <>
                  replace <q>{sel.del.trim()}</q> with <q>{sel.ins.trim()}</q>
                </>
              ) : sel.del ? (
                <>
                  delete <q>{sel.del.trim()}</q>
                </>
              ) : (
                <>
                  insert <q>{sel.ins.trim()}</q>
                </>
              )}
            </>
          ) : total ? (
            `Reviewed: ${accepted} accepted, ${total - pending.length - accepted} rejected${pending.length ? `, ${pending.length} left` : ""}.`
          ) : (
            "The draft already reads cleanly."
          )}
        </p>
        <div className="review-actions">
          {pending.length > 0 && (
            <>
              <button
                type="button"
                className="icon-btn"
                onClick={() => move(-1)}
                aria-label="Previous change (K)"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => move(1)}
                aria-label="Next change (J)"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </>
          )}
          {selected !== null && !decisions[selected] ? (
            <>
              <button
                type="button"
                className="btn btn-small btn-quiet"
                onClick={() => decide(selected, "rejected")}
              >
                <X size={16} aria-hidden /> Reject
              </button>
              <button
                type="button"
                className="btn btn-small btn-primary"
                onClick={() => decide(selected, "accepted")}
              >
                <Check size={16} aria-hidden /> Accept
              </button>
            </>
          ) : null}
          {pending.length > 1 && (
            <button
              type="button"
              className="btn btn-small btn-quiet"
              onClick={acceptAll}
            >
              Accept all
            </button>
          )}
          {pending.length === 0 && total > 0 && (
            <>
              <button
                type="button"
                className="btn btn-small btn-quiet"
                onClick={() => (
                  setDecisions({}),
                  setSelected(0),
                  setCopied("")
                )}
              >
                Start over
              </button>
              <button
                type="button"
                className="btn btn-small btn-primary"
                onClick={copy}
              >
                <Copy size={16} aria-hidden /> Copy clean text
              </button>
            </>
          )}
        </div>
      </div>
      {copied && (
        <p className="quiet-note" role="status">
          {copied}
        </p>
      )}
    </div>
  );
}

/** Static blue-pencil markup of a before/after pair, for illustrations that need no review controls. */
export function Markup({ before, after }: { before: string; after: string }) {
  return (
    <span className="markup">
      {diffWords(before, after).map((p, k) =>
        p.kind === "same" ? (
          <span key={k}>{p.text}</span>
        ) : (
          <span key={k} className="mark">
            {p.del && <del>{p.del}</del>}
            {p.ins && <ins>{p.ins}</ins>}
          </span>
        ),
      )}
    </span>
  );
}
