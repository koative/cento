import { Link } from "../router";
import { notFound } from "../content";

const popular = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/guides", label: "Money guides" },
  { to: "/app", label: "Live demo" },
];

export default function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>{notFound.heading}</h1>
      <p className="lede">{notFound.text}</p>
      <ul className="ruled-links">
        {popular.map((p) => (
          <li key={p.to}>
            <Link to={p.to}>{p.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
