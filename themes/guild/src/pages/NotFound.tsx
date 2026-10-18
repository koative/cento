import { Link } from "../router";
import { Hallmark } from "../components/Hallmark";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <Hallmark
        initials="?"
        register={404}
        craft="Not on the register"
        size={140}
        className="struck"
      />
      <h1>This page is not on the register.</h1>
      <p className="lede">
        The link may be old, or the member may have changed their address. The
        register itself is still here.
      </p>
      <div className="close-actions">
        <Link to="/talent" className="btn btn-seal">
          Browse talent
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the start
        </Link>
      </div>
    </section>
  );
}
