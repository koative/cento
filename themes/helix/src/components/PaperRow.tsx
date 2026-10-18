import { Link } from "../router";
import type { Paper } from "../content";
import { longDate } from "../lib/format";

/** A paper as it appears in a journal contents list. */
export function PaperRow({
  paper,
  level = 3,
}: {
  paper: Paper;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <li className="paper-row">
      <p className="paper-meta">
        <span>{paper.topic}</span>
        <span>{paper.report}</span>
        <time dateTime={paper.date}>{longDate(paper.date)}</time>
      </p>
      <Heading className="paper-title">
        <Link to={`/research/${paper.slug}`}>{paper.title}</Link>
      </Heading>
      <p className="paper-authors">
        {paper.authors.join(", ")} · <em>{paper.venue}</em>
      </p>
    </li>
  );
}
