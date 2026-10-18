import { Link } from "../router";
import { posts } from "../content";
import { Postmark } from "../components/Postmark";

export function NotFound() {
  return (
    <div className="wrap-narrow page not-found" data-not-found>
      <Postmark
        className="nf-stamp"
        ring="RETURN TO SENDER · ADDRESS UNKNOWN · "
        day="404"
        month="RETURNED"
      />
      <h1>This letter couldn’t be delivered.</h1>
      <p className="lede">
        The page you asked for isn’t at this address. It may have moved in the
        archive, or the link may have been folded wrong.
      </p>
      <p className="nf-links">
        <Link to="/" className="btn btn-solid">
          Read the latest letter
        </Link>
        <Link to="/archive" className="btn btn-line">
          Search the archive
        </Link>
      </p>
      <p className="quiet">
        Most recent:{" "}
        <Link to={`/archive/${posts[0].slug}`}>{posts[0].title}</Link>
      </p>
    </div>
  );
}
