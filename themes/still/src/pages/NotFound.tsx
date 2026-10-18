import { Link } from "../router";
import { notFound } from "../content";
import { Mark } from "../components/Logo";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <Mark size={56} />
      <h1>{notFound.title}</h1>
      <p className="lead">{notFound.text}</p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
        <Link to="/schedule" className="btn btn-ghost">
          This week's schedule
        </Link>
        <Link to="/breathe" className="btn btn-ghost">
          Breathing guide
        </Link>
      </div>
    </section>
  );
}
