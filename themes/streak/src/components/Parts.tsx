import type { ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "../router";
import { brand, type Post } from "../content";
import { formatDate } from "../lib/format";
import { Phone } from "./Phone";

export function PageHead({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head wrap">
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      {children}
    </header>
  );
}

export function StoreButtons() {
  return (
    <div className="stores">
      <a
        className="store"
        href={brand.stores.apple}
        target="_blank"
        rel="noreferrer"
      >
        <small>Download on the</small>App Store
      </a>
      <a
        className="store"
        href={brand.stores.google}
        target="_blank"
        rel="noreferrer"
      >
        <small>Get it on</small>Google Play
      </a>
    </div>
  );
}

export function Cover({ post, eager }: { post: Post; eager?: boolean }) {
  return "screen" in post.cover ? (
    <div className="cover cover-screen">
      <Phone
        screen={post.cover.screen}
        label={`Streak app screen illustrating “${post.title}”`}
      />
    </div>
  ) : (
    <img
      className="cover"
      src={post.cover.src}
      alt={post.cover.alt}
      width={post.cover.w}
      height={post.cover.h}
      loading={eager ? undefined : "lazy"}
    />
  );
}

export function PostCard({ post, level = 3 }: { post: Post; level?: 2 | 3 }) {
  const H = `h${level}` as const;
  return (
    <article className="post-card">
      <Cover post={post} />
      <p className="post-meta">
        <span className="tag">{post.topic}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <H>
        <Link to={`/blog/${post.slug}`} className="stretch">
          {post.title}
        </Link>
      </H>
      <p>{post.excerpt}</p>
    </article>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <ChevronDown size={20} aria-hidden="true" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function More({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="more">
      {children} <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
