import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerNote, nav, series } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      newsletter: {
        missing: "Enter your email to get the Thursday note.",
        invalid:
          "That email is missing an @ or a domain, e.g. you@example.com.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone((form.elements.namedItem("newsletter") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={"mailto:" + brand.email}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <ul className="social" aria-label="Elsewhere">
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <div>
            <h2>Watch</h2>
            <Link to="/videos">All videos</Link>
            <Link to="/series">All series</Link>
            {series.map((s) => (
              <Link key={s.slug} to={"/series/" + s.slug}>
                {s.name}
              </Link>
            ))}
          </div>
          <div>
            <h2>Shop</h2>
            <Link to="/shop">Merch</Link>
            <Link to="/cart">Bag</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div>
            <h2>Channel</h2>
            {nav.slice(3).map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>

        <form className="footer-form" noValidate onSubmit={submit}>
          <h2>The Thursday note</h2>
          <p>
            One email when the new episode drops, with the cut list. No other
            mail, ever.
          </p>
          <div className="inline-form">
            <Field
              label="Email"
              name="newsletter"
              type="email"
              required
              autoComplete="email"
              error={errors.newsletter}
              placeholder="you@example.com"
            />
            <button className="btn btn-spark" type="submit">
              Sign up
            </button>
          </div>
          <p className="form-status" aria-live="polite">
            {done && `You're on the list, ${done}. See you Thursday.`}
          </p>
        </form>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>{footerNote}</p>
      </div>
    </footer>
  );
}
