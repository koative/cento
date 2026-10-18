import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <section className="not-found wrap" data-not-found>
      <p className="ket big" aria-hidden="true">
        |404⟩
      </p>
      <h1>{notFound.heading}</h1>
      <p className="lead">{notFound.lead}</p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Back to the home page
        </Link>
        <Link to="/research" className="btn btn-quiet">
          Papers library
        </Link>
      </div>
    </section>
  );
}
