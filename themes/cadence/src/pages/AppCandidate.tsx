import { useState, type FormEvent } from "react";
import { ArrowLeft, CalendarClock, Mail, Phone } from "lucide-react";
import { Link } from "../router";
import { app, competencies, jobs, stages, type Stage } from "../content";
import { addNote, moveCandidate, useDemo } from "../lib/store";
import { formatDate, stageIndex, stageLabel } from "../lib/format";
import { Avatar } from "../components/Visuals";

export default function AppCandidate({ id }: { id: string }) {
  const { candidates, notes, moves } = useDemo();
  const c = candidates.find((x) => x.id === id)!;
  const job = jobs.find((j) => j.id === c.jobId)!;
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const activity = [
    {
      at: c.applied,
      text: `Applied for ${job.title} via ${c.source.toLowerCase()}`,
    },
    ...(c.stage !== "applied"
      ? [{ at: c.since, text: `Moved to ${stageLabel(c.stage)}` }]
      : []),
    ...c.scorecards.map((s) => ({
      at: c.since,
      text: `${s.by} submitted a ${s.step.toLowerCase()} scorecard: ${s.recommendation}`,
    })),
    ...moves
      .filter((m) => m.candidateId === id)
      .map((m) => ({
        at: m.at,
        text: `${app.user.name} moved ${c.name.split(" ")[0]} to ${stageLabel(m.to)}`,
      })),
    ...notes
      .filter((n) => n.candidateId === id)
      .map((n) => ({ at: n.at, text: `${n.by}: “${n.text}”` })),
  ].reverse();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (note.trim().length < 3) {
      setError(
        "Write a few words so your teammates know what the note is about.",
      );
      return;
    }
    addNote(id, note.trim(), app.user.name);
    setNote("");
    setError("");
    setStatus("Note added to the activity timeline.");
  }

  return (
    <div className="app-page">
      <header className="app-head candidate-head">
        <div>
          <Link to="/app/candidates" className="text-link back">
            <ArrowLeft size={16} aria-hidden /> Candidates
          </Link>
          <div className="candidate-title">
            <Avatar name={c.name} size="lg" />
            <div>
              <h1>{c.name}</h1>
              <p>
                {c.headline} · {c.location}
              </p>
            </div>
          </div>
        </div>
        <div className="stage-control">
          <label htmlFor="stage">Stage</label>
          <select
            id="stage"
            value={c.stage}
            onChange={(e) => (
              moveCandidate(id, e.target.value as Stage),
              setStatus(
                `${c.name} moved to ${stageLabel(e.target.value as Stage)}.`,
              )
            )}
          >
            {stages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <ol
        className="progress"
        aria-label={`Stage ${stageIndex(c.stage) + 1} of ${stages.length}: ${stageLabel(c.stage)}`}
      >
        {stages.map((s, i) => (
          <li
            key={s.id}
            data-done={i < stageIndex(c.stage) ? "" : undefined}
            data-current={s.id === c.stage ? "" : undefined}
          >
            {s.label}
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      <div className="app-grid candidate-grid">
        <section className="panel" aria-labelledby="h-profile">
          <h2 id="h-profile">Profile</h2>
          <p>{c.summary}</p>
          <ul className="contact">
            <li>
              <Mail size={16} aria-hidden />{" "}
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </li>
            <li>
              <Phone size={16} aria-hidden />{" "}
              <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
            </li>
          </ul>
          <h3>Experience</h3>
          <ul className="experience">
            {c.experience.map((x) => (
              <li key={x.role + x.org}>
                <strong>{x.role}</strong>
                <span>
                  {x.org} · <span className="num">{x.years}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="muted">
            Applied {formatDate(c.applied, true)} for{" "}
            <Link to={`/app/jobs/${job.id}`}>{job.title}</Link>
          </p>
        </section>

        <section className="panel" aria-labelledby="h-next">
          <h2 id="h-next">Next step</h2>
          {c.next ? (
            <div className="next-step">
              <CalendarClock size={20} aria-hidden />
              <div>
                <strong>{c.next.step}</strong>
                <span>
                  {c.next.when} · with {c.next.with}
                </span>
              </div>
              <Link
                to={`/app/kit/${c.id}`}
                className="btn btn-primary btn-small"
              >
                Open interview kit
              </Link>
            </div>
          ) : (
            <p className="muted">
              Nothing scheduled. Move {c.name.split(" ")[0]} forward or add a
              note for the team.
            </p>
          )}

          <h2>Scorecards</h2>
          {c.scorecards.length ? (
            <ul className="cards-list">
              {c.scorecards.map((s, i) => (
                <li key={i}>
                  <div className="card-line">
                    <strong>{s.step}</strong>
                    <span className="rec" data-rec={s.recommendation}>
                      {s.recommendation}
                    </span>
                  </div>
                  <span className="muted">by {s.by}</span>
                  <ul className="ratings">
                    {Object.entries(s.ratings).map(([k, v]) => (
                      <li key={k}>
                        {competencies.find((x) => x.id === k)!.label}
                        <span className="scale" aria-label={`${v} of 4`}>
                          {[1, 2, 3, 4].map((n) => (
                            <span key={n} data-on={n <= v ? "" : undefined} />
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p>{s.note}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No scorecards yet.</p>
          )}
        </section>

        <section className="panel panel-wide" aria-labelledby="h-activity">
          <h2 id="h-activity">Activity</h2>
          <form className="note-form" onSubmit={submit} noValidate>
            <label htmlFor="note">Add a note for the hiring team</label>
            <textarea
              id="note"
              rows={3}
              value={note}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "note-err" : undefined}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Asked about relocating in spring; open to it."
            />
            {error && (
              <p className="field-error" id="note-err">
                {error}
              </p>
            )}
            <button className="btn btn-quiet">Add note</button>
          </form>
          <ol className="activity">
            {activity.map((a, i) => (
              <li key={i}>
                <time dateTime={a.at} className="num">
                  {formatDate(a.at)}
                </time>
                <span>{a.text}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
