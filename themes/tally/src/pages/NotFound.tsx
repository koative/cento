import { Link } from "../router";
import { nav } from "../content";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="nf-code" aria-hidden="true">
        (404.00)
      </p>
      <h1>This page doesn't reconcile.</h1>
      <p className="lede">
        The link may be old, or the page moved when we tidied up. Everything we
        publish is one of these:
      </p>
      <ul className="nf-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {nav.map((l) => (
          <li key={l.to}>
            <Link to={l.to}>{l.label}</Link>
          </li>
        ))}
        <li>
          <Link to="/book">Book a call</Link>
        </li>
      </ul>
    </section>
  );
}
