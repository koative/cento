import { Link } from "../router";
import { nav, notFound } from "../content";

export default function NotFound() {
  return (
    <section className="not-found wrap" data-not-found>
      <p className="nf-code num" aria-hidden>
        404
      </p>
      <h1>{notFound.heading}</h1>
      <p className="lede">{notFound.text}</p>
      <ul className="chips">
        <li>
          <Link to="/" className="chip">
            Home
          </Link>
        </li>
        {nav.map((n) => (
          <li key={n.to}>
            <Link to={n.to} className="chip">
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
