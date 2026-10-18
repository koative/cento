import { useState, type FormEvent } from "react";
import { ArrowBigUp, CircleCheck } from "lucide-react";
import { Link } from "../router";
import { statusAsOf, type Reply, type Thread } from "../content";
import { ago, categoryOf, codeOf, formatStamp, search } from "../lib/manual";
import { pause, validate } from "../lib/forms";
import { Field, useErrors } from "../components/Field";
import { Avatar } from "../components/Avatar";

function Vote({ count, label }: { count: number; label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="vote"
      aria-pressed={on}
      aria-label={`Helpful: ${label}`}
      onClick={() => setOn((v) => !v)}
    >
      <ArrowBigUp aria-hidden="true" />
      <span>{count + (on ? 1 : 0)}</span>
    </button>
  );
}

function Post({ r }: { r: Reply }) {
  return (
    <li className="post" data-accepted={r.accepted ? "" : undefined}>
      <Vote count={r.votes} label={`reply by ${r.author}`} />
      <div>
        <p className="post-by">
          <Avatar name={r.author} staff={r.staff} />
          <strong>{r.author}</strong>
          {r.staff ? (
            <span className="badge badge-staff">Counter specialist</span>
          ) : (
            r.shop && <span className="muted">{r.shop}</span>
          )}
          <time dateTime={r.at} className="muted">
            {formatStamp(r.at)}
          </time>
        </p>
        {r.accepted && (
          <p className="accepted">
            <CircleCheck aria-hidden="true" /> Accepted answer
          </p>
        )}
        {r.text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </li>
  );
}

export function ThreadPage({ thread }: { thread: Thread }) {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [mine, setMine] = useState<Reply[]>([]);
  const replies = [...thread.replies].sort(
    (a, b) => Number(!!b.accepted) - Number(!!a.accepted),
  );
  const related = search(thread.title).slice(0, 3);

  const reply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      reply:
        "Write at least 20 characters so the answer helps the next person too.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const text = String(new FormData(form).get("reply")).trim();
    setBusy(true);
    await pause(700);
    setBusy(false);
    setMine((m) => [
      ...m,
      {
        author: "You",
        at: new Date().toISOString(),
        votes: 0,
        text: text.split(/\n+/),
      },
    ]);
    form.reset();
  };

  return (
    <div className="wrap thread-layout">
      <div>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/community">Community</Link>{" "}
          <span aria-hidden="true">/</span>{" "}
          <span>{categoryOf(thread.category)?.title}</span>
        </nav>
        <article>
          <header className="thread-head">
            <h1>{thread.title}</h1>
            <p className="muted">
              Asked by {thread.author}, {thread.shop} ·{" "}
              {ago(thread.at, statusAsOf)} · {thread.views} views
            </p>
          </header>
          <ol className="posts">
            <li className="post post-question">
              <Vote count={thread.votes} label="this question" />
              <div>
                <p className="post-by">
                  <Avatar name={thread.author} />
                  <strong>{thread.author}</strong>
                  <span className="muted">{thread.shop}</span>
                </p>
                {thread.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </li>
          </ol>

          <h2 className="replies-title">
            {replies.length + mine.length}{" "}
            {replies.length + mine.length === 1 ? "reply" : "replies"}
          </h2>
          {replies.length + mine.length === 0 && (
            <p className="muted">
              No replies yet. If you've solved this in your own shop, you could
              be the first.
            </p>
          )}
          <ol className="posts" aria-live="polite">
            {replies.map((r) => (
              <Post key={r.at} r={r} />
            ))}
            {mine.map((r) => (
              <li key={r.at} className="post post-mine">
                <span className="vote vote-static" aria-hidden="true" />
                <div>
                  <p className="post-by">
                    <Avatar name="You" />
                    <strong>You</strong>
                    <span className="badge">Waiting for review</span>
                  </p>
                  {r.text.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <form
            className="reply-form"
            noValidate
            onSubmit={reply}
            onChange={onChange}
            aria-busy={busy}
          >
            <Field
              label="Your reply"
              name="reply"
              hint="Say what worked in your shop. Name buttons the way they appear on screen."
              error={errors.reply}
            >
              <textarea required minLength={20} rows={5} />
            </Field>
            <div className="submit-row">
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? "Posting…" : "Post reply"}
              </button>
              <p className="muted">
                Demo only: your reply stays on this page and is never sent.
              </p>
            </div>
          </form>
        </article>
      </div>

      <aside className="thread-aside">
        {related.length > 0 && (
          <section aria-labelledby="t-related">
            <h2 id="t-related">From the manual</h2>
            <ul>
              {related.map((r) => (
                <li key={r.article.slug}>
                  <Link to={`/articles/${r.article.slug}`}>
                    <span className="code">{codeOf(r.article)}</span>{" "}
                    {r.article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section aria-labelledby="t-help">
          <h2 id="t-help">Need it fixed today?</h2>
          <p className="muted">
            The community is quick, but specialists answer tickets about
            payments within four business hours.
          </p>
          <Link to="/contact" className="btn btn-ink">
            Contact support
          </Link>
        </section>
      </aside>
    </div>
  );
}
