import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { ages, brand } from "../content";
import { shopStatus } from "../lib/format";
import { Logo } from "./Header";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (input.validity.valid) {
      setError("");
      setDone(input.value);
      return;
    }
    setError(
      input.validity.valueMissing
        ? "Enter your email address to get the Tinker Post."
        : "Check the email address: it needs an @ and a domain, like name@example.com.",
    );
    input.focus();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.street}
            <br />
            {brand.town}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </address>
          <p className="footer-status">{shopStatus().text}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div>
            <h2>Shop</h2>
            <Link to="/shop">All toys</Link>
            {ages.map((a) => (
              <Link key={a.id} to={`/ages/${a.id}`}>
                {a.label}
              </Link>
            ))}
            <Link to="/gift-finder">Gift finder</Link>
          </div>
          <div>
            <h2>In the shop</h2>
            <Link to="/workshops">Workshops</Link>
            <Link to="/events">Store events</Link>
            <Link to="/visit">Visit &amp; hours</Link>
            <Link to="/about">About Tinker</Link>
          </div>
          <div>
            <h2>Your order</h2>
            <Link to="/cart">Basket</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/visit">Returns &amp; FAQ</Link>
          </div>
        </nav>

        <div className="footer-news">
          <h2>The Tinker Post</h2>
          <p>
            One letter a month: new arrivals, the workshop calendar and what the
            tester families loved.
          </p>
          {done ? (
            <p className="news-done" role="status">
              <Check size={18} aria-hidden="true" /> Thanks! The next Tinker
              Post goes to {done}.
            </p>
          ) : (
            <form noValidate onSubmit={subscribe} className="news-form">
              <label htmlFor="news-email">Email address</label>
              <div className="news-row">
                <input
                  id="news-email"
                  name="news-email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "news-error" : undefined}
                />
                <button type="submit" className="btn btn-small">
                  Sign up
                </button>
              </div>
              {error && (
                <p className="field-error" id="news-error">
                  {error}
                </p>
              )}
            </form>
          )}
          <ul className="socials">
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="footer-legal">
        {brand.name} is a fictional brand — a{" "}
        <a href="https://koative.github.io/cento/">Cento</a> template by
        Koative.
      </p>
    </footer>
  );
}
