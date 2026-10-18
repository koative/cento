import { Link } from "../router";
import { notFound } from "../content";

export function NotFound() {
  return (
    <div className="wrap not-found" data-not-found>
      <h1>{notFound.title}</h1>
      <p className="lede">{notFound.text}</p>
      <div className="actions">
        <Link to="/" className="btn btn-red">
          Back to the front door
        </Link>
        <Link to="/services" className="btn btn-line">
          See the price board
        </Link>
      </div>
    </div>
  );
}
