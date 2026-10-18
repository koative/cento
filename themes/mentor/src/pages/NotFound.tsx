import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page wrap not-found" data-not-found>
      <h1>
        This page isn't in the <span className="mark">workbook</span>.
      </h1>
      <p className="lede">
        The link may be old, or the page moved when a programme changed its
        name. These pages are all still here:
      </p>
      <ul className="nf-links">
        <li>
          <Link to="/programmes">Programmes</Link>
        </li>
        <li>
          <Link to="/resources">Free resources</Link>
        </li>
        <li>
          <Link to="/podcast">The podcast</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}
