import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>Nothing here. Very quiet.</h1>
      <p className="lead">
        The page you were looking for has moved or never existed. Try one of
        these instead.
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          Go to the home page
        </Link>
        <Link to="/shop" className="btn btn-quiet">
          Shop headphones
        </Link>
        <Link to="/support" className="btn btn-quiet">
          Get support
        </Link>
      </div>
    </div>
  );
}
