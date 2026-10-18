import { Link } from "../router";
import type { Photo, Post, Wedding } from "../content";
import { longDate } from "../lib/plan";

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
      className={className}
      src={photo.src}
      alt={photo.alt}
      width={photo.w}
      height={photo.h}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
    />
  );
}

export function WeddingCard({
  w,
  lazy = true,
}: {
  w: Wedding;
  lazy?: boolean;
}) {
  return (
    <article className="wedding-card">
      <Link to={`/weddings/${w.slug}`} className="wedding-card-link">
        <div className="frame">
          <Img photo={w.cover} lazy={lazy} />
        </div>
        <h3>{w.couple}</h3>
      </Link>
      <p className="meta">
        {w.venue} · {longDate(w.date)} · <span className="num">{w.guests}</span>{" "}
        guests
      </p>
      <p>{w.excerpt}</p>
    </article>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <article className="post-card">
      <Link to={`/journal/${p.slug}`} className="post-card-link">
        <div className="frame">
          <Img photo={p.image} />
        </div>
        <h3>{p.title}</h3>
      </Link>
      <p className="meta">
        {p.category} · {longDate(p.date)} · {p.minutes} min read
      </p>
      <p>{p.excerpt}</p>
    </article>
  );
}
