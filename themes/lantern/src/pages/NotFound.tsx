import { Link } from "../router";
import { LanternMark } from "../components/Header";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <LanternMark />
      <h1>This street has no lamp.</h1>
      <p>
        The page you followed isn't here. It may have been a campaign that
        closed, or a link with a typo.
      </p>
      <div className="btn-row">
        <Link to="/" className="btn">
          Back to the window
        </Link>
        <Link to="/campaigns" className="btn btn-ghost">
          Open campaigns
        </Link>
      </div>
    </section>
  );
}
