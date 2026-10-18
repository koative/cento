import { useState } from "react";
import { brand, footer, hours, nav } from "../content";
import { Link } from "../router";
import { clock } from "../lib/time";
import { Field, useFormFlow } from "./Field";
import { Logo } from "./Header";

const shopLinks = [
  { to: "/shop", label: "All order-ahead" },
  { to: "/cart", label: "Your bag" },
  { to: "/checkout", label: "Checkout" },
  { to: "/shop/country-sourdough", label: "Country sourdough" },
  { to: "/shop/croissant", label: "Butter croissant" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const form = useFormFlow(
    {
      email: {
        missing: "Enter your email to get the bake list.",
        invalid: "That email looks incomplete — check for an @ and a domain.",
      },
    },
    (data) => setEmail(String(data.get("email"))),
  );

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <section className="footer-news" aria-labelledby="news-title">
          <h2 id="news-title">{footer.newsletter.title}</h2>
          <p>{footer.newsletter.body}</p>
          {email ? (
            <p className="form-success" role="status">
              You're on the list. The next one lands Thursday morning at {email}
              .
            </p>
          ) : (
            <form
              className="inline-form"
              noValidate
              onSubmit={form.onSubmit}
              onChange={form.onChange}
            >
              <Field
                label="Email address"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={form.errors.email}
              />
              <button className="btn" type="submit" disabled={form.sending}>
                {form.sending ? "Adding you…" : "Sign up"}
              </button>
            </form>
          )}
          <p className="quiet" aria-live="polite">
            {email ? "" : "Demo form — nothing is sent anywhere."}
          </p>
        </section>

        <div className="footer-hours">
          <h2>Counter hours</h2>
          <dl>
            {hours.map((h) => (
              <div key={h.day}>
                <dt>{h.day}</dt>
                <dd>
                  {h.open === null || h.close === null
                    ? "Closed"
                    : `${clock(h.open)} – ${clock(h.close)}`}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="footer-map">
        <div className="footer-brand">
          <Logo />
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>
        <nav aria-label="Bakery">
          <h2>Bakery</h2>
          <Link to="/">Home</Link>
          {nav.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Order ahead">
          <h2>Order ahead</h2>
          {shopLinks.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Elsewhere">
          <h2>Elsewhere</h2>
          {footer.social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
          <a href={`mailto:${brand.wholesaleEmail}`}>Trade enquiries</a>
        </nav>
      </div>

      <p className="footer-legal">
        {brand.name} is a fictional brand — a{" "}
        <a href="https://cento.koative.com/">Cento</a> template by
        Koative.
      </p>
    </footer>
  );
}
