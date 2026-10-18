import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { notFound } from "../content";

export function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <p className="nf-word" aria-hidden="true">
        <del>pagina</del> <ins>404</ins>
      </p>
      <h1>{notFound.title}</h1>
      <p className="lead">{notFound.text}</p>
      <div className="actions">
        <Link to="/courses" className="btn">
          See this term's courses <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
