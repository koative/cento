import { Link } from "../router";
import { notFound } from "../content";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>{notFound.title}</h1>
      <p className="lede">{notFound.text}</p>
      <div className="actions">
        <Link to="/" className="btn btn-ink">
          Back to the home page
        </Link>
        <Link to="/timetable" className="btn btn-line">
          See the timetable
        </Link>
      </div>
    </section>
  );
}
