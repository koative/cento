import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>This page isn't on the schedule.</h1>
      <p className="lede">
        The address may have changed, or the page never existed. Everything that
        matters is still a click away.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Back to the start
        </Link>
        <Link to="/claims" className="btn btn-ghost">
          Make a claim
        </Link>
        <Link to="/help" className="btn btn-ghost">
          Help centre
        </Link>
      </div>
    </section>
  );
}
