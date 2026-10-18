import type { Insight } from "../content";
import { capabilityBySlug, longDate, personById } from "../lib/format";
import { Link } from "../router";

/** One insight in a ruled list; `level` keeps heading order correct wherever the list sits. */
export function InsightItem({
  post,
  level = 3,
  photo = false,
}: {
  post: Insight;
  level?: 2 | 3;
  photo?: boolean;
}) {
  const H = `h${level}` as const;
  return (
    <article className="insight-item">
      {photo && post.image && (
        <img
          className="insight-photo"
          src={post.image}
          alt=""
          width={960}
          height={640}
          loading="lazy"
        />
      )}
      <H className="insight-title">
        <Link to={`/insights/${post.slug}`}>{post.title}</Link>
      </H>
      <p className="insight-dek">{post.dek}</p>
      <p className="insight-meta">
        <span className="insight-type">{post.type}</span>
        <span>{capabilityBySlug(post.capability)?.name}</span>
        <span>{personById(post.author)?.name}</span>
        <time dateTime={post.date}>{longDate(post.date)}</time>
      </p>
    </article>
  );
}
