import type { ReactNode } from "react";
import { Link } from "../router";
import type { Article, Photo } from "../content";
import { fmtDate } from "../lib/club";

export function Img({
  photo,
  lazy = true,
  className,
}: {
  photo: Photo;
  lazy?: boolean;
  className?: string;
}) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.w}
      height={photo.h}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      className={className}
    />
  );
}

/** The top of every inner page: a programme-style title block with chalk rules. */
export function PageHead({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="wrap">
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}

export function ArticleCard({
  a,
  lead = false,
  level = 3,
}: {
  a: Article;
  lead?: boolean;
  level?: 2 | 3;
}) {
  const H = `h${level}` as const;
  return (
    <article className="story" data-lead={lead ? "" : undefined}>
      <Img photo={a.photo} />
      <div className="story-text">
        <p className="story-meta">
          <span>{a.category}</span>
          <time dateTime={a.date}>{fmtDate(a.date, "day")}</time>
        </p>
        <H>
          <Link to={`/news/${a.slug}`}>{a.title}</Link>
        </H>
        {lead && <p>{a.standfirst}</p>}
      </div>
    </article>
  );
}
