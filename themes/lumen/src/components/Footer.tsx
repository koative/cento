import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer, stores } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/frames", label: "All frames" },
      { to: "/face-shapes", label: "Face-shape finder" },
      { to: "/lenses", label: "Lens guide" },
    ],
  },
  {
    title: "Visit",
    links: [
      { to: "/stores", label: "All stores" },
      ...stores.map((s) => ({ to: `/stores/${s.id}`, label: s.name })),
    ],
  },
  {
    title: "Lumen",
    links: [
      { to: "/about", label: "Our story" },
      { to: "/eye-test", label: "Book an eye test" },
      { to: "/cart", label: "Your bag" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
];

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "news-email": {
        missing: "Enter your email to subscribe.",
        invalid:
          "Check the email address: it needs an @ and a domain, like name@example.com.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <p className="footer-contact">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="footer-col">
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer-news">
          <h2>The Lumen letter</h2>
          <p>{footer.newsletter}</p>
          {!done && (
            <form noValidate onSubmit={submit} className="news-form">
              <Field
                label="Email address"
                name="news-email"
                type="email"
                required
                autoComplete="email"
                error={errors["news-email"]}
              />
              <button className="btn" type="submit">
                Subscribe
              </button>
            </form>
          )}
          <p className="form-success" aria-live="polite">
            {done
              ? "Subscribed. The next letter arrives at the start of the month."
              : ""}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <ul className="social">
          {brand.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
