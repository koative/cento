import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <h1>{notFound.heading}</h1>
      <p className="lede">{notFound.text}</p>
      <div className="actions">
        <Link to="/courses" className="btn btn-primary">
          Browse courses
        </Link>
        <Link to="/" className="btn btn-quiet">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
