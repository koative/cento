import { Link } from "../router";
import { PitchLines } from "../components/TeamSheet";

export function NotFound() {
  return (
    <section className="not-found" data-not-found>
      <PitchLines />
      <div className="wrap">
        <p className="nf-flag num" aria-hidden="true">
          404
        </p>
        <h1>Flag's up: that page is offside</h1>
        <p className="lede">
          The link may be from last season, or the page has moved to a new
          pitch.
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-gold">
            Back to the home page
          </Link>
          <Link to="/fixtures" className="btn btn-chalk">
            This weekend's fixtures
          </Link>
        </div>
      </div>
    </section>
  );
}
