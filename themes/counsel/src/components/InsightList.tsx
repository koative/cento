import { Link } from "../router";
import type { Insight } from "../content";
import { areaBySlug, personBySlug, shortDate } from "../lib/util";

export function InsightList({
  items,
  level = 3,
}: {
  items: Insight[];
  level?: 2 | 3;
}) {
  const H = `h${level}` as const;
  return (
    <ol className="insight-list">
      {items.map((i) => (
        <li key={i.slug}>
          <p className="insight-meta">
            <time dateTime={i.date}>{shortDate(i.date)}</time>
            <span>{i.type}</span>
            <span>{areaBySlug(i.area)?.name}</span>
          </p>
          <H className="insight-title">
            <Link to={`/insights/${i.slug}`}>{i.title}</Link>
          </H>
          <p className="insight-stand">{i.standfirst}</p>
          <p className="insight-by">
            {personBySlug(i.author)?.name} · {i.minutes} min read
          </p>
        </li>
      ))}
    </ol>
  );
}
