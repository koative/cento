import { Link } from "../router";
import { SearchBox } from "../components/SearchBox";

export function NotFound() {
  return (
    <div className="wrap narrow-wide not-found" data-not-found>
      <p className="article-code">404</p>
      <h1>That page isn't in the manual</h1>
      <p className="lead">
        The link may point to an article that was merged or renamed. Search for
        what you were after, or start from the contents.
      </p>
      <SearchBox label="Search the manual" placeholder="Search the manual" />
      <p className="nf-links">
        <Link to="/categories">Contents</Link>
        <Link to="/troubleshoot">Troubleshooter</Link>
        <Link to="/contact">Contact support</Link>
      </p>
    </div>
  );
}
