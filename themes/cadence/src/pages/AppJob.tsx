import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "../router";
import { competencies, stages, today, type Job } from "../content";
import { moveCandidate, useDemo } from "../lib/store";
import { daysBetween, stageIndex, stepsFor } from "../lib/format";
import { Avatar } from "../components/Visuals";
import { LoopTimeline } from "../components/Loop";

export default function AppJob({ job }: { job: Job }) {
  const { candidates } = useDemo();
  const [announce, setAnnounce] = useState("");
  const [moved, setMoved] = useState("");
  const mine = candidates.filter((c) => c.jobId === job.id);

  function move(id: string, by: -1 | 1) {
    const c = mine.find((x) => x.id === id)!;
    const to = stages[stageIndex(c.stage) + by];
    moveCandidate(id, to.id);
    setMoved(id);
    setAnnounce(`${c.name} moved to ${to.label}.`);
    // Keep focus on the moved card (same direction if still possible) so keyboard users can keep moving it.
    requestAnimationFrame(() =>
      (
        document.querySelector<HTMLButtonElement>(
          `[data-move="${id}:${by}"]:not(:disabled)`,
        ) ??
        document.querySelector<HTMLButtonElement>(`[data-move="${id}:${-by}"]`)
      )?.focus(),
    );
  }

  return (
    <div className="app-page">
      <header className="app-head">
        <div>
          <Link to="/app/jobs" className="text-link back">
            <ArrowLeft size={16} aria-hidden /> Jobs
          </Link>
          <h1>{job.title}</h1>
          <p>
            {job.team} · {job.location} · {job.salary} · Hiring manager{" "}
            {job.manager}
          </p>
        </div>
        <span className="status" data-status={job.status}>
          {job.status}
        </span>
      </header>

      <details className="panel loop-panel">
        <summary>
          Interview loop ·{" "}
          {job.competencies
            .map((id) => competencies.find((c) => c.id === id)!.label)
            .join(", ")}
        </summary>
        <LoopTimeline
          stepIds={stepsFor(job.competencies)}
          pace={job.pace}
          label={`Interview loop for ${job.title}`}
        />
      </details>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      {mine.length ? (
        <div
          className="board"
          role="region"
          aria-label={`${job.title} pipeline`}
          tabIndex={0}
        >
          {stages.map((s, si) => {
            const col = mine.filter((c) => c.stage === s.id);
            return (
              <section
                key={s.id}
                className="board-col"
                aria-labelledby={`col-${s.id}`}
              >
                <h2 id={`col-${s.id}`}>
                  {s.label} <span className="num">{col.length}</span>
                </h2>
                <ul>
                  {col.map((c) => (
                    <li
                      key={c.id}
                      className="board-card"
                      data-moved={moved === c.id ? "" : undefined}
                    >
                      <div className="board-card-top">
                        <Avatar name={c.name} size="sm" />
                        <span>
                          <Link to={`/app/candidates/${c.id}`}>{c.name}</Link>
                          <small>{c.source}</small>
                        </span>
                      </div>
                      {c.next ? (
                        <p className="board-next">
                          {c.next.when} · {c.next.step}
                        </p>
                      ) : (
                        <p className="board-wait num">
                          {daysBetween(c.since, today) === 1
                            ? "1 day"
                            : `${daysBetween(c.since, today)} days`}{" "}
                          at this stage
                        </p>
                      )}
                      <div className="board-moves">
                        <button
                          type="button"
                          className="icon-btn"
                          data-move={`${c.id}:-1`}
                          disabled={si === 0}
                          aria-label={
                            si
                              ? `Move ${c.name} back to ${stages[si - 1].label}`
                              : `${c.name} is at the first stage`
                          }
                          onClick={() => move(c.id, -1)}
                        >
                          <ChevronLeft size={18} aria-hidden />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          data-move={`${c.id}:1`}
                          disabled={si === stages.length - 1}
                          aria-label={
                            si < stages.length - 1
                              ? `Move ${c.name} forward to ${stages[si + 1].label}`
                              : `${c.name} is hired`
                          }
                          onClick={() => move(c.id, 1)}
                        >
                          <ChevronRight size={18} aria-hidden />
                        </button>
                      </div>
                    </li>
                  ))}
                  {!col.length && (
                    <li className="board-empty">Nobody here yet</li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="panel empty">
          <p>
            {job.status === "Draft"
              ? "This role is still a draft. Candidates appear here once it is published."
              : "No candidates yet. New applicants land in Applied."}
          </p>
        </div>
      )}
    </div>
  );
}
