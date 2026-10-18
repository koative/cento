import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { areas } from "../content";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>We could not find that page.</h1>
      <p className="lede">
        It may have moved when we reorganised the site, or the link may be
        mistyped. These are the places most people are looking for.
      </p>
      <ul className="area-lines">
        <li>
          <Link to="/enquiry">Make an enquiry</Link>
          <span>Reply within one business day.</span>
        </li>
        <li>
          <Link to="/people">Find a lawyer</Link>
          <span>Search the directory by name or practice.</span>
        </li>
        {areas.slice(0, 3).map((a) => (
          <li key={a.slug}>
            <Link to={`/practice/${a.slug}`}>{a.name}</Link>
            <span>{a.short}</span>
          </li>
        ))}
      </ul>
      <Link to="/" className="text-link">
        Back to the home page <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
