import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { currentIssue, notFound } from "../content";

export function NotFound() {
  return (
    <div className="page wrap not-found" data-not-found>
      <p className="folio-big" aria-hidden="true">
        p. 404
      </p>
      <h1>{notFound.title}</h1>
      <p className="lead">{notFound.text}</p>
      <div className="actions">
        <Link to={`/issues/${currentIssue.no}`} className="btn">
          Open No. {currentIssue.no} <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/stories" className="btn btn-ghost">
          All stories
        </Link>
      </div>
    </div>
  );
}
