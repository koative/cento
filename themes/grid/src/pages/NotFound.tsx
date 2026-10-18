import { Link } from "../router";
import { nav } from "../content";

export default function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>No panel in this slot.</h1>
      <p className="lead">
        The page you asked for is not here. It may have moved, or the link was
        mistyped. These are wired up:
      </p>
      <ul className="plain-links">
        <li>
          <Link to="/" className="text-link">
            Home
          </Link>
        </li>
        {nav.map((n) => (
          <li key={n.to}>
            <Link to={n.to} className="text-link">
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
