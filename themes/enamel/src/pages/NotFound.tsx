import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found wrap" data-not-found>
      <p className="nf-code tnum" aria-hidden="true">
        404
      </p>
      <h1>That page has gone missing, like a wisdom tooth.</h1>
      <p className="lede">
        The link may be old or mistyped. These are the places most people are
        looking for:
      </p>
      <ul className="related-list">
        <li>
          <Link to="/treatments">Treatments</Link>
        </li>
        <li>
          <Link to="/prices">Prices</Link>
        </li>
        <li>
          <Link to="/book">Book online</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}
