import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Lock, Mail, Moon, Sun } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  issueSponsor,
  posts,
  previewBlocks,
  type Block,
  type Post,
} from "../content";
import {
  issueLabel,
  load,
  longDate,
  minutes,
  related,
  save,
  topicOf,
} from "../lib/util";
import { PostRow } from "../components/PostRow";
import { Postmark, stampFor } from "../components/Postmark";
import { SubscribeForm } from "../components/SubscribeForm";

type Size = "s" | "m" | "l";
type Settings = { size: Size; night: boolean };
const SETTINGS = "dispatch:reader";
const UNLOCK = "dispatch:unlocked";

export function PostPage({ post }: { post: Post }) {
  const [settings, setSettings] = useState<Settings>(() =>
    load(SETTINGS, { size: "m", night: false }),
  );
  const [unlocked, setUnlocked] = useState(() => load(UNLOCK, false));
  const [progress, setProgress] = useState(0);
  const body = useRef<HTMLDivElement>(null);

  const update = (next: Partial<Settings>) => {
    const merged = { ...settings, ...next };
    setSettings(merged);
    save(SETTINGS, merged);
  };

  // Night reading belongs to the reader: it dims the whole page only while a letter is open.
  useEffect(() => {
    const root = document.documentElement;
    if (settings.night) root.dataset.theme = "night";
    else delete root.dataset.theme;
    return () => {
      delete root.dataset.theme;
    };
  }, [settings.night]);

  useEffect(() => {
    const onScroll = () => {
      const el = body.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const read = (window.innerHeight * 0.6 - top) / height;
      setProgress(Math.min(1, Math.max(0, read)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [post.slug]);

  const gated = post.kind === "field-note" && !unlocked;
  const blocks = gated ? post.body.slice(0, previewBlocks) : post.body;
  const total = minutes(post);
  const left = Math.ceil(total * (1 - progress));
  const topic = topicOf(post);
  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  // Sponsor note sits after the first section break, as it does in the email.
  const sponsorAt =
    post.kind === "letter" ? post.body.findIndex((b) => b.type === "h2") : -1;

  let noteNo = 0;
  const renderBlock = (b: Block, i: number) => {
    switch (b.type) {
      case "h2":
        return <h2 key={i}>{b.text}</h2>;
      case "quote":
        return (
          <figure key={i} className="pull">
            <blockquote>
              <p>{b.text}</p>
            </blockquote>
            <figcaption>{b.cite}</figcaption>
          </figure>
        );
      case "list":
        return (
          <ul key={i} className="prose-list">
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        );
      case "figure":
        return (
          <figure key={i} className="inline-figure">
            <img src={b.src} alt={b.alt} loading="lazy" />
            <figcaption>{b.caption}</figcaption>
          </figure>
        );
      case "p":
        if (!b.note) return <p key={i}>{b.text}</p>;
        noteNo += 1;
        return (
          <NotedParagraph key={i} n={noteNo} text={b.text} note={b.note} />
        );
    }
  };

  return (
    <article className="reader" data-size={settings.size}>
      <div className="reader-bar">
        <div className="wrap reader-bar-row">
          <Link to="/archive" className="reader-back">
            <ArrowLeft aria-hidden="true" size={16} /> Archive
          </Link>
          <p className="reader-left" aria-hidden="true">
            {progress >= 0.98 ? "Finished" : `${left} min left`}
          </p>
          <div className="reader-tools">
            <div
              className="size-switch"
              role="radiogroup"
              aria-label="Text size"
            >
              {(["s", "m", "l"] as Size[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={settings.size === s}
                  aria-label={
                    { s: "Small text", m: "Medium text", l: "Large text" }[s]
                  }
                  onClick={() => update({ size: s })}
                  data-size={s}
                >
                  A
                </button>
              ))}
            </div>
            <button
              type="button"
              className="night-toggle"
              aria-pressed={settings.night}
              onClick={() => update({ night: !settings.night })}
            >
              {settings.night ? (
                <Sun aria-hidden="true" size={16} />
              ) : (
                <Moon aria-hidden="true" size={16} />
              )}
              <span>{settings.night ? "Day" : "Night"}</span>
              <span className="visually-hidden"> reading</span>
            </button>
          </div>
        </div>
        <span
          className="reader-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>

      <header className="reader-head wrap-narrow">
        <Postmark
          className="reader-stamp"
          {...stampFor(post.date, issueLabel(post))}
        />
        <h1>{post.title}</h1>
        <p className="reader-dek">{post.dek}</p>
        <p className="meta">
          By {brand.writer} · {issueLabel(post)} ·{" "}
          <time dateTime={post.date}>{longDate(post.date)}</time> ·{" "}
          {post.dateline} · {total} min read ·{" "}
          <Link to={`/topics/${topic.id}`}>{topic.name}</Link>
        </p>
      </header>

      {post.image && (
        <figure className="reader-lead">
          <img
            src={post.image.src}
            alt={post.image.alt}
            style={{ aspectRatio: post.image.ratio }}
          />
          <figcaption>Photo: {post.image.credit}</figcaption>
        </figure>
      )}

      <div className="prose" ref={body}>
        {blocks.map((b, i) => (
          <div
            key={i}
            className="prose-block"
            data-fade={gated && i === blocks.length - 1 ? "" : undefined}
          >
            {renderBlock(b, i)}
            {i === sponsorAt - 1 && (
              <aside className="issue-sponsor" aria-label="Sponsor">
                <p>
                  <strong>Supported by {issueSponsor.name}.</strong>{" "}
                  {issueSponsor.text}
                </p>
                <Link to="/sponsor">Sponsor a Sunday</Link>
              </aside>
            )}
          </div>
        ))}

        {gated ? (
          <div className="gate">
            <Lock aria-hidden="true" size={22} />
            <h2>The rest of this Field Note is for paying readers</h2>
            <p>
              Field Notes arrive every Wednesday for Readers and Patrons, from
              $8 a month. They pay for the reporting trips behind every free
              Sunday Letter.
            </p>
            <div className="gate-actions">
              <Link to="/subscribe" className="btn btn-solid">
                Become a Reader
              </Link>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => {
                  setUnlocked(true);
                  save(UNLOCK, true);
                }}
              >
                Preview as a paying reader
              </button>
            </div>
            <p className="quiet">
              The preview is part of this demo; nothing is charged.
            </p>
          </div>
        ) : (
          <footer className="signoff">
            <p className="signoff-name">— Ines</p>
            <a
              className="btn btn-line"
              href={`mailto:${brand.email}?subject=${encodeURIComponent("Re: " + post.title)}`}
            >
              <Mail aria-hidden="true" size={16} /> Reply to this letter
            </a>
          </footer>
        )}
      </div>

      <nav className="wrap-narrow pager" aria-label="More letters">
        {older ? (
          <Link to={`/archive/${older.slug}`} className="pager-link">
            <span className="pager-dir">
              <ArrowLeft aria-hidden="true" size={16} /> Older
            </span>
            <span className="pager-title">{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link to={`/archive/${newer.slug}`} className="pager-link pager-next">
            <span className="pager-dir">
              Newer <ArrowRight aria-hidden="true" size={16} />
            </span>
            <span className="pager-title">{newer.title}</span>
          </Link>
        )}
      </nav>

      <section
        className="wrap-narrow reader-subscribe"
        aria-labelledby="reader-sub-title"
      >
        <h2 id="reader-sub-title">Get the next one on Sunday</h2>
        <SubscribeForm id="reader" />
      </section>

      <section className="wrap section" aria-labelledby="related-title">
        <h2 id="related-title" className="section-title">
          Read next
        </h2>
        <ol className="post-list">
          {related(post).map((p) => (
            <PostRow key={p.slug} post={p} showImage />
          ))}
        </ol>
      </section>
    </article>
  );
}

/** A paragraph with a numbered sidenote: in the margin on wide screens, a tap-to-open note on narrow ones. */
function NotedParagraph({
  n,
  text,
  note,
}: {
  n: number;
  text: string;
  note: string;
}) {
  const [open, setOpen] = useState(false);
  const id = `note-${n}`;
  return (
    <div className="noted" data-open={open ? "" : undefined}>
      <p>
        {text}
        <button
          type="button"
          className="note-ref"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">Note </span>
          {n}
        </button>
      </p>
      <aside id={id} className="sidenote">
        <span className="sidenote-no">{n}</span> {note}
      </aside>
    </div>
  );
}
