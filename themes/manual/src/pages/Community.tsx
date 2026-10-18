import { useState, type FormEvent } from "react";
import { CircleCheck, MessageSquare } from "lucide-react";
import { Link } from "../router";
import {
  about,
  categories,
  statusAsOf,
  threads,
  type Thread,
} from "../content";
import { ago, categoryOf, terms } from "../lib/manual";
import { pause, validate } from "../lib/forms";
import { Field, useErrors } from "../components/Field";
import { Avatar } from "../components/Avatar";

type Sort = "new" | "votes" | "unanswered";
const solvedOf = (t: Thread) => t.replies.some((r) => r.accepted);
const staff = about.team.filter((p) =>
  ["Ines Carvalho", "Sam Okafor", "Luis Ferreira"].includes(p.name),
);

export function Community() {
  const [q, setQ] = useState("");
  const [chapter, setChapter] = useState("all");
  const [sort, setSort] = useState<Sort>("new");
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [posted, setPosted] = useState("");

  const ts = terms(q);
  let list = threads.filter(
    (t) =>
      (chapter === "all" || t.category === chapter) &&
      ts.every((w) =>
        `${t.title} ${t.body.join(" ")}`.toLowerCase().includes(w),
      ),
  );
  if (sort === "unanswered")
    list = list.filter((t) => t.replies.length === 0 || !solvedOf(t));
  list = [...list].sort((a, b) =>
    sort === "votes" ? b.votes - a.votes : b.at.localeCompare(a.at),
  );

  const ask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      title:
        "Write your question as a title of at least 12 characters, like “Tip screen not showing on the reader”.",
      body: "Add at least 40 characters of detail: what you tried and what happened.",
      category: "Pick a chapter so the right people see it.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    setPosted(String(new FormData(form).get("title")));
    form.reset();
  };

  return (
    <div className="wrap community-page">
      <header className="page-head">
        <h1>Community</h1>
        <p className="lead">
          Shop owners helping shop owners, with Counter specialists checking in
          every day. Accepted answers are tested by our team before they're
          marked.
        </p>
      </header>

      <div className="community-layout">
        <div>
          <div className="toolbar">
            <div className="field field-inline">
              <label htmlFor="c-q">Search discussions</label>
              <input
                id="c-q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="drawer, tips, import…"
              />
            </div>
            <div className="field field-inline">
              <label htmlFor="c-sort">Show</label>
              <select
                id="c-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="new">Newest first</option>
                <option value="votes">Most helpful</option>
                <option value="unanswered">Needs an answer</option>
              </select>
            </div>
          </div>
          <div
            className="filter-row"
            role="group"
            aria-label="Filter by chapter"
          >
            <button
              type="button"
              className="chip"
              aria-pressed={chapter === "all"}
              onClick={() => setChapter("all")}
            >
              Everything
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="chip"
                aria-pressed={chapter === c.slug}
                onClick={() => setChapter(c.slug)}
              >
                {c.title}
              </button>
            ))}
          </div>
          <p className="result-count" aria-live="polite">
            {list.length} {list.length === 1 ? "discussion" : "discussions"}
          </p>

          {list.length ? (
            <ol className="threads">
              {list.map((t) => {
                const solved = solvedOf(t);
                return (
                  <li key={t.id}>
                    <span className="votes" aria-label={`${t.votes} votes`}>
                      <strong>{t.votes}</strong>
                      <span>votes</span>
                    </span>
                    <div className="thread-main">
                      <h2>
                        <Link to={`/community/${t.id}`}>{t.title}</Link>
                      </h2>
                      <p className="muted">
                        <Avatar name={t.author} /> {t.author}, {t.shop} ·{" "}
                        {ago(t.at, statusAsOf)} ·{" "}
                        {categoryOf(t.category)?.title}
                      </p>
                    </div>
                    <span className="thread-side">
                      {solved ? (
                        <span className="badge badge-solved">
                          <CircleCheck aria-hidden="true" /> Solved
                        </span>
                      ) : (
                        <span className="badge">
                          <MessageSquare aria-hidden="true" />{" "}
                          {t.replies.length ? "Open" : "No replies yet"}
                        </span>
                      )}
                      <span className="muted">
                        {t.replies.length}{" "}
                        {t.replies.length === 1 ? "reply" : "replies"} ·{" "}
                        {t.views} views
                      </span>
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="empty">
              <h2>No discussions match</h2>
              <p>
                Try another chapter or fewer words, or ask it below. Most
                questions get a first reply within a few hours.
              </p>
            </div>
          )}
        </div>

        <aside className="community-aside">
          <section className="ask" aria-labelledby="ask-title">
            <h2 id="ask-title">Ask the community</h2>
            <form
              noValidate
              onSubmit={ask}
              onChange={onChange}
              aria-busy={busy}
            >
              <Field
                label="Your question"
                name="title"
                required
                minLength={12}
                error={errors.title}
              />
              <Field label="Chapter" name="category" error={errors.category}>
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Details" name="body" error={errors.body}>
                <textarea required minLength={40} rows={5} />
              </Field>
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? "Posting…" : "Post question"}
              </button>
            </form>
            <p className="form-done" aria-live="polite">
              {posted &&
                `“${posted}” is waiting for a moderator. First posts are reviewed within the hour, then go live.`}
            </p>
            <p className="muted small">Demo only: nothing is posted.</p>
          </section>

          <section aria-labelledby="staff-title">
            <h2 id="staff-title">Specialists on the forum</h2>
            <ul className="people-mini">
              {staff.map((p) => (
                <li key={p.name}>
                  <Avatar name={p.name} staff />
                  <span>
                    <strong>{p.name}</strong>
                    <span className="muted">{p.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="rules-title">
            <h2 id="rules-title">House rules</h2>
            <ul className="rules">
              <li>Never post card numbers, PINs or your shop ID.</li>
              <li>Describe what you see, with button names as they appear.</li>
              <li>
                Mark the reply that fixed it, so the next person finds it.
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
