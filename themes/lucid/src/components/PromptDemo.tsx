import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, PenLine, RotateCcw, Sparkles } from "lucide-react";
import { instructions, samples, type Instruction } from "../content";
import { diffWords } from "../lib/diff";
import { matchInstruction, plainPass, readingGrade, words } from "../lib/text";
import { TrackedChanges } from "./TrackedChanges";

type Run = {
  id: number;
  before: string;
  after: string;
  instruction: Instruction;
  offline: boolean;
};

/** The signature moment: a draft, a prompt in plain words, and the revision back as blue-pencil tracked changes. */
export function PromptDemo() {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const sample = samples.find((s) => s.id === sampleId) ?? samples[0];
  const [draft, setDraft] = useState(sample.text);
  const [editing, setEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [thinking, setThinking] = useState(false);
  const [run, setRun] = useState<Run>({
    id: 0,
    before: sample.text,
    after: sample.rewrites.tighten,
    instruction: instructions[0],
    offline: false,
  });
  const timer = useRef(0);
  const parts = useMemo(() => diffWords(run.before, run.after), [run]);
  const changes = parts.filter((p) => p.kind === "change").length;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function revise(instruction: Instruction, text = draft, s = sample) {
    setError("");
    setEditing(false);
    setThinking(true);
    const offline = text.trim() !== s.text;
    const after = offline ? plainPass(text) : s.rewrites[instruction.id];
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setThinking(false);
      setRun((r) => ({
        id: r.id + 1,
        before: text.trim(),
        after,
        instruction,
        offline,
      }));
    }, 700);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim())
      return setError(
        "The draft is empty. Write or paste a paragraph first, or pick a sample above.",
      );
    if (!prompt.trim())
      return setError(
        "Tell Lucid what the draft needs, for example “make it shorter”, or pick an instruction below.",
      );
    const found = matchInstruction(prompt);
    if (!found)
      return setError(
        "This offline demo understands four requests: shorter, warmer, plainer, or point first. Try “make it friendlier”.",
      );
    revise(found);
  }

  function pickSample(id: string) {
    const next = samples.find((s) => s.id === id) ?? samples[0];
    setSampleId(id);
    setDraft(next.text);
    revise(run.instruction, next.text, next);
  }

  const wordsBefore = words(run.before).length;
  const wordsAfter = words(run.after).length;

  return (
    <section className="sheet prompt-demo" aria-labelledby="demo-title">
      <div className="sheet-head">
        <h2 id="demo-title" className="sr-only">
          Live prompt demo
        </h2>
        <div className="sample-tabs" role="group" aria-label="Sample draft">
          {samples.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === sampleId}
              onClick={() => pickSample(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="sheet-context">{sample.context}</p>
      </div>

      <div className="sheet-body" data-thinking={thinking ? "" : undefined}>
        {editing ? (
          <>
            <label htmlFor="demo-draft" className="sr-only">
              Your draft
            </label>
            <textarea
              id="demo-draft"
              className="draft-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={7}
              autoFocus
            />
          </>
        ) : thinking ? (
          <p className="thinking" role="status">
            Reading {words(draft).length} words…
          </p>
        ) : (
          <TrackedChanges key={run.id} parts={parts} />
        )}
      </div>

      <div className="sheet-meta">
        <dl className="stats num">
          <div>
            <dt>Words</dt>
            <dd>
              {wordsBefore}{" "}
              <ArrowRight size={14} aria-hidden className="arrow" />
              <span className="sr-only">to</span> {wordsAfter}
            </dd>
          </div>
          <div>
            <dt>Reading grade</dt>
            <dd>
              {readingGrade(run.before)}{" "}
              <ArrowRight size={14} aria-hidden className="arrow" />
              <span className="sr-only">to</span> {readingGrade(run.after)}
            </dd>
          </div>
          <div>
            <dt>Instruction</dt>
            <dd>{run.instruction.label}</dd>
          </div>
        </dl>
        <div className="sheet-edit">
          {draft.trim() !== sample.text && (
            <button
              type="button"
              className="btn btn-small btn-quiet"
              onClick={() => setDraft(sample.text)}
            >
              <RotateCcw size={15} aria-hidden /> Restore sample
            </button>
          )}
          <button
            type="button"
            className="btn btn-small btn-quiet"
            aria-pressed={editing}
            onClick={() => setEditing((e) => !e)}
          >
            <PenLine size={15} aria-hidden />{" "}
            {editing ? "Back to review" : "Edit the draft"}
          </button>
        </div>
      </div>

      {run.offline && !thinking && !editing && (
        <p className="quiet-note offline-note">
          You changed the draft, so this demo ran Lucid's offline pass for
          filler and wordy phrases ({changes}{" "}
          {changes === 1 ? "change" : "changes"}). Tone rewrites need the full
          model, which runs in the app.
        </p>
      )}

      <form className="prompt-bar" onSubmit={submit} noValidate>
        <label htmlFor="demo-prompt">Tell Lucid what this draft needs</label>
        <div className="prompt-row">
          <input
            id="demo-prompt"
            value={prompt}
            onChange={(e) => (setPrompt(e.target.value), setError(""))}
            placeholder="e.g. shorter, and friendlier to someone who's annoyed"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "demo-error" : undefined}
            autoComplete="off"
          />
          <button className="btn btn-primary" disabled={thinking}>
            <Sparkles size={16} aria-hidden />{" "}
            {thinking ? "Revising…" : "Revise"}
          </button>
        </div>
        {error && (
          <p className="field-error" id="demo-error">
            {error}
          </p>
        )}
        <div className="chips" role="group" aria-label="Quick instructions">
          {instructions.map((i) => (
            <button
              key={i.id}
              type="button"
              className="chip"
              aria-pressed={run.instruction.id === i.id}
              disabled={thinking}
              onClick={() => (setPrompt(i.prompt), revise(i))}
            >
              {i.label}
            </button>
          ))}
        </div>
      </form>
    </section>
  );
}
