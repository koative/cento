import { Link } from "../router";
import { Speaker } from "../components/Speaker";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <Speaker />
      <h1>No signal on this frequency.</h1>
      <p>
        The page you were after isn't on the site plan. It may have moved stage.
      </p>
      <div className="confirm-actions">
        <Link to="/" className="btn btn-acid">
          Back to the start
        </Link>
        <Link to="/lineup" className="btn btn-line">
          See the lineup
        </Link>
      </div>
    </section>
  );
}
