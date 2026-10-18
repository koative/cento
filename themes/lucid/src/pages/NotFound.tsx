import { Link } from "../router";
import { nav, notFound } from "../content";

export default function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1 className="display">
        <del>{notFound.heading}</del>
      </h1>
      <p className="lede">{notFound.text}</p>
      <ul className="nf-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {nav.map((n) => (
          <li key={n.to}>
            <Link to={n.to}>{n.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
