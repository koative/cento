import { useRoute, Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  const path = useRoute();
  return (
    <div className="wrap page not-found" data-not-found>
      <p className="nf-code">
        <span className="status status-err">404</span> <code>GET {path}</code>
      </p>
      <h1>{notFound.h1}</h1>
      <p className="lead">{notFound.body}</p>
      <div className="actions">
        <Link to="/search" className="btn btn-primary">
          Search the docs
        </Link>
        <Link to="/" className="btn btn-quiet">
          Docs home
        </Link>
        <Link to="/api" className="btn btn-quiet">
          API reference
        </Link>
      </div>
    </div>
  );
}
