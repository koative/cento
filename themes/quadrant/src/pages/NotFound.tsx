import { capabilities } from "../content";
import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap page-head not-found" data-not-found>
      <h1 className="display">This page is not in the deck.</h1>
      <p className="lede">
        The link may be out of date, or the page was retired with an old
        engagement. These are the places most people are looking for.
      </p>
      <ul className="ruled-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {capabilities.slice(0, 3).map((c) => (
          <li key={c.slug}>
            <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
          </li>
        ))}
        <li>
          <Link to="/insights">Insights</Link>
        </li>
        <li>
          <Link to="/contact">Contact a partner</Link>
        </li>
      </ul>
    </section>
  );
}
