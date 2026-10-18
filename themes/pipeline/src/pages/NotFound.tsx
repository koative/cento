import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <div className="wrap notfound" data-not-found>
      <span className="stamp stamp-lost">Lost</span>
      <h1>{notFound.h1}</h1>
      <p className="lede">{notFound.body}</p>
      <div className="cta-row">
        <Link to="/" className="btn btn-primary">
          Back to the home page
        </Link>
        <Link to="/app" className="btn btn-quiet">
          Open the demo board
        </Link>
      </div>
    </div>
  );
}
