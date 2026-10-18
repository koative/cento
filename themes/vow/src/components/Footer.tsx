import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, nav, weddings } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "news-email": {
        missing: "Enter your email to receive the letter.",
        invalid:
          "That email is missing an @ or a domain, like name@example.com.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone((form.elements.namedItem("news-email") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <p className="footer-hours">{brand.hours}</p>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <div>
            <h2>Studio</h2>
            <Link to="/">Home</Link>
            {nav.map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
            <Link to="/enquire">Enquire</Link>
          </div>
          <div>
            <h2>Stories</h2>
            {weddings.slice(0, 4).map((w) => (
              <Link key={w.slug} to={`/weddings/${w.slug}`}>
                {w.couple}
              </Link>
            ))}
          </div>
          <div>
            <h2>Elsewhere</h2>
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <form className="footer-news" noValidate onSubmit={submit}>
          <h2>The planning letter</h2>
          <p>
            One letter a season: dates filling up, what we learned, nothing to
            buy.
          </p>
          <Field
            label="Email"
            name="news-email"
            type="email"
            autoComplete="email"
            required
            error={errors["news-email"]}
            onInput={() => setDone("")}
          />
          <button className="btn" type="submit">
            Subscribe
          </button>
          <p className="form-note" aria-live="polite">
            {done &&
              `Thank you. The next letter will reach ${done}. (Demo: nothing was sent.)`}
          </p>
        </form>
      </div>

      <p className="footer-legal">
        {brand.name} is a fictional brand — a{" "}
        <a href="https://koative.github.io/cento/">Cento</a> template by
        Koative.
      </p>
    </footer>
  );
}
