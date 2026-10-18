import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1 className="display">
        This page is <em>out of stock</em>
      </h1>
      <p className="lede">
        The link may be from an older collection, or mistyped. Everything we
        make this season is still in the shop.
      </p>
      <div className="actions">
        <Link to="/shop" className="btn btn-ink">
          Go to the shop
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the home page
        </Link>
      </div>
    </div>
  );
}
