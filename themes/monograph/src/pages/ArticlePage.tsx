import { useEffect, useRef, useState, type RefObject } from "react";
import { AArrowDown, AArrowUp, ArrowRight, Lamp } from "lucide-react";
import { Link } from "../router";
import { articles, type Article, type Block } from "../content";
import {
  byIssueThenPage,
  contributorOf,
  issueOf,
  longDate,
  minutes,
  money,
  printPages,
  sectionOf,
} from "../lib/magazine";
import { setReader, useReader } from "../lib/reader";
import { Cover } from "../components/Cover";
import { StoryItem } from "../components/StoryItem";

/** Scroll progress through an element, 0 at its top edge to 1 when its end reaches the lower third of the screen. */
function useProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const p = Math.min(
        1,
        Math.max(0, (innerHeight * 0.66 - r.top) / r.height),
      );
      setProgress(Math.round(p * 100) / 100);
    };
    const onScroll = () => (frame ||= requestAnimationFrame(measure));
    measure();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return progress;
}

/** A paragraph; with a note it gets a numbered marker and a side note (margin on wide screens, toggled inline on narrow). */
function Para({ text, note, n }: { text: string; note?: string; n: number }) {
  const [open, setOpen] = useState(false);
  const id = "note-" + n;
  return (
    <div className="para">
      <p>
        {text}
        {note && (
          <button
            type="button"
            className="note-mark"
            aria-expanded={open}
            aria-controls={id}
            aria-label={`Note ${n}`}
            onClick={() => setOpen(!open)}
          >
            {n}
          </button>
        )}
      </p>
      {note && (
        <aside id={id} className="sidenote" data-open={open || undefined}>
          <span className="sidenote-n">{n}</span> {note}
        </aside>
      )}
    </div>
  );
}

function Body({ blocks }: { blocks: Block[] }) {
  let notes = 0;
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <Para
                key={i}
                text={b.text}
                note={b.note}
                n={b.note ? ++notes : 0}
              />
            );
          case "q":
            return (
              <p className="question" key={i}>
                {b.text}
              </p>
            );
          case "h":
            return <h2 key={i}>{b.text}</h2>;
          case "quote":
            return (
              <blockquote className="pullquote" key={i}>
                <p>{b.text}</p>
              </blockquote>
            );
          case "figure":
            return (
              <figure className="inline-figure" key={i}>
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  width={1024}
                  height={700}
                />
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
        }
      })}
    </>
  );
}

export function ArticlePage({ article }: { article: Article }) {
  const { size, tone } = useReader();
  const bodyRef = useRef<HTMLDivElement>(null);
  const progress = useProgress(bodyRef);
  const issue = issueOf(article.issue)!;
  const author = contributorOf(article.author);
  const section = sectionOf(article.section);
  const pages = printPages(article);
  const folio =
    article.page + Math.min(pages - 1, Math.floor(progress * pages));
  const left = Math.ceil(minutes(article) * (1 - progress));
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.issue === article.issue) - Number(a.issue === article.issue) ||
        byIssueThenPage(a, b),
    )
    .slice(0, 3);

  return (
    <article className="page reader" data-tone={tone} data-size={size}>
      <header className="reader-head wrap">
        <h1>{article.title}</h1>
        <p className="standfirst">{article.standfirst}</p>
        <p className="byline">
          <Link to={"/sections/" + section.slug}>{section.single}</Link>
          <span>
            {article.credit ?? (
              <>
                By{" "}
                <Link to={"/contributors/" + author.slug}>{author.name}</Link>
              </>
            )}
          </span>
          <span>
            <Link to={`/issues/${issue.no}`}>
              No. {issue.no}, {issue.word}
            </Link>
            , pp. {article.page}–{article.page + pages - 1}
          </span>
          <span>
            <time dateTime={article.published}>
              {longDate(article.published)}
            </time>
          </span>
          <span>{minutes(article)} min read</span>
        </p>
      </header>

      {article.image && (
        <figure className="reader-hero wrap">
          <img
            src={article.image.src}
            alt={article.image.alt}
            width={1024}
            height={683}
          />
          <figcaption>{article.image.caption}</figcaption>
        </figure>
      )}

      <div className="reader-bar" role="group" aria-label="Reading settings">
        <div className="wrap reader-bar-inner">
          <p className="folio-now">
            <span>p. {folio}</span>
            <small>{progress >= 1 ? "Finished" : `${left} min left`}</small>
          </p>
          <div className="reader-tools">
            <button
              type="button"
              aria-label="Smaller text"
              disabled={size === 0}
              onClick={() => setReader({ size: (size - 1) as 0 | 1 })}
            >
              <AArrowDown size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Larger text"
              disabled={size === 2}
              onClick={() => setReader({ size: (size + 1) as 1 | 2 })}
            >
              <AArrowUp size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="lamp-toggle"
              aria-pressed={tone === "lamp"}
              onClick={() =>
                setReader({ tone: tone === "lamp" ? "paper" : "lamp" })
              }
            >
              <Lamp size={18} aria-hidden="true" /> Lamplight
            </button>
          </div>
        </div>
        <div
          className="reader-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>

      <div className="prose wrap" ref={bodyRef} data-section={article.section}>
        <Body blocks={article.body} />
        <p className="end-mark">
          <span aria-hidden="true" className="end-square" /> This piece first
          appeared in print in No. {issue.no}.
        </p>
      </div>

      <section className="reader-end wrap" aria-label="About this piece">
        <div className="author-note">
          <h2>
            <Link to={"/contributors/" + author.slug}>{author.name}</Link>
          </h2>
          <p>
            {author.name} {author.short} {author.elsewhere}
          </p>
        </div>
        <div className="issue-note">
          <Link
            to={`/issues/${issue.no}`}
            className="issue-note-cover"
            aria-label={`No. ${issue.no}, ${issue.word}`}
          >
            <Cover issue={issue} />
          </Link>
          <div>
            <h2>
              In No. {issue.no}, {issue.word}
            </h2>
            <p>{issue.summary}</p>
            {issue.stock === "Sold out" ? (
              <Link to="/subscribe?plan=digital" className="btn">
                Read the whole issue online{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <Link
                to={`/subscribe?plan=single&issue=${issue.no}`}
                className="btn"
              >
                Buy the print issue, {money(issue.price)}{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="related wrap" aria-labelledby="related-title">
        <h2 id="related-title" className="rule-title">
          Read next
        </h2>
        <div className="story-list">
          {related.map((a) => (
            <StoryItem key={a.slug} article={a} level={3} />
          ))}
        </div>
      </section>
    </article>
  );
}
