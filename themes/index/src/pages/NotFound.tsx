import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <p className="nf-shelf" aria-hidden="true">
        FIC ???
      </p>
      <h1>This shelf is empty</h1>
      <p className="lede">
        The page you were looking for has been borrowed, misfiled or never
        existed. We can usually find anything, though.
      </p>
      <div className="actions">
        <Link to="/books" className="btn">
          Search the catalogue
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the front table
        </Link>
      </div>
    </div>
  );
}
