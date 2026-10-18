import { Link, useRoute } from "../router";
import { nav, notFound } from "../content";

export default function NotFound() {
  const path = useRoute();
  return (
    <section className="wrap not-found" data-not-found>
      <pre className="nf-query" aria-hidden>
        {`count()\n  where path = "${path}"\n  since -365d\n\n→ 0 rows`}
      </pre>
      <h1>{notFound.heading}</h1>
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
