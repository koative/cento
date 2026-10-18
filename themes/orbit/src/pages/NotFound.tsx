import { Link } from "../router";
import { missions } from "../content";
import { Patch } from "../components/Patch";

export function NotFound() {
  return (
    <section className="page-head not-found" data-not-found>
      <div className="wrap">
        <Patch
          mission={missions.find((m) => m.slug === "headwind")!}
          size={140}
        />
        <h1>Off nominal.</h1>
        <p className="lede">
          This page is not on the manifest. It may have moved, or the link may
          be mistyped.
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-dark">
            Back to the home page
          </Link>
          <Link to="/manifest" className="btn btn-ghost-dark">
            Launch manifest
          </Link>
        </div>
      </div>
    </section>
  );
}
