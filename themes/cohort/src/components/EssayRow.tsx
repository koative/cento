import { Link } from "../router";
import { partnerBySlug, type Essay } from "../content";
import { longDate } from "../lib/format";

export function EssayRow({
  essay,
  level = "h3",
}: {
  essay: Essay;
  level?: "h2" | "h3";
}) {
  const Heading = level;
  return (
    <article className="essay-row">
      <p className="essay-meta">
        <span>{essay.topic}</span>
        <time dateTime={essay.date}>{longDate(essay.date)}</time>
      </p>
      <Heading className="essay-row-title">
        <Link to={`/writing/${essay.slug}`}>{essay.title}</Link>
      </Heading>
      <p className="essay-row-dek">{essay.dek}</p>
      <p className="essay-byline">
        {partnerBySlug(essay.author)?.name} · {essay.minutes} min read
      </p>
    </article>
  );
}
