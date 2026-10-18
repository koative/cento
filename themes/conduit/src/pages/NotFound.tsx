import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <pre className="nf-code" aria-hidden="true">
        <code>{`{ "error": { "code": "route_not_found", "status": 404 } }`}</code>
      </pre>
      <h1>{notFound.heading}</h1>
      <p className="lede">{notFound.body}</p>
      <div className="actions">
        <Link to="/" className="btn btn-signal">
          Go to the home page
        </Link>
        <Link to="/connectors" className="btn btn-quiet">
          Browse connectors
        </Link>
      </div>
    </div>
  );
}
