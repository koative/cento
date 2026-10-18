import { Link } from "../router";
import { ages } from "../content";
import { Block } from "../components/Block";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <div className="fallen-blocks" aria-hidden="true">
        {ages.slice(0, 4).map((a) => (
          <Block key={a.id} shape={a.shape} color={a.color} size={64} />
        ))}
      </div>
      <h1>This shelf is empty.</h1>
      <p className="lead">
        The page you were looking for has been tidied away, or it never existed.
        The toys are all still here.
      </p>
      <div className="actions">
        <Link to="/shop" className="btn">
          Shop all toys
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the front door
        </Link>
      </div>
    </div>
  );
}
