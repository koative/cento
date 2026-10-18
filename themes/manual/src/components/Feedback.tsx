import { useState, type FormEvent } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "../router";

const reasons = [
  "The steps didn't match my screen",
  "It didn't cover my problem",
  "It was hard to follow",
  "Something is out of date",
];

/** "Was this helpful?" — a yes ends it, a no asks what was missing. */
export function Feedback({ title }: { title: string }) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!new FormData(e.currentTarget).get("reason")) {
      setError("Pick the closest reason so the writer knows what to fix.");
      e.currentTarget.querySelector("input")?.focus();
      return;
    }
    setSent(true);
  };

  return (
    <section className="feedback" aria-labelledby="feedback-title">
      <h2 id="feedback-title">Did this answer your question?</h2>
      {vote === null && (
        <div className="feedback-buttons">
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => setVote("yes")}
          >
            <ThumbsUp aria-hidden="true" /> Yes, it did
          </button>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => setVote("no")}
          >
            <ThumbsDown aria-hidden="true" /> Not quite
          </button>
        </div>
      )}
      {vote === "no" && !sent && (
        <form className="feedback-form" onSubmit={submit} noValidate>
          <fieldset aria-describedby={error ? "feedback-err" : undefined}>
            <legend>What was missing from “{title}”?</legend>
            {reasons.map((r) => (
              <label key={r} className="choice">
                <input
                  type="radio"
                  name="reason"
                  value={r}
                  onChange={() => setError("")}
                />
                <span>{r}</span>
              </label>
            ))}
          </fieldset>
          {error && (
            <p className="field-error" id="feedback-err">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-ink">
            Send to the writer
          </button>
        </form>
      )}
      <p className="form-done" aria-live="polite">
        {vote === "yes" &&
          "Thanks. That tells us this article is doing its job."}
        {sent && (
          <>
            Thanks. The writer sees this today. If you're still stuck,{" "}
            <Link to="/contact">contact support</Link>.
          </>
        )}
      </p>
    </section>
  );
}
