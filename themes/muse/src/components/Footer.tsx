import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, categories, footer, stores } from "../content";
import { validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, {
      "news-email": {
        missing: "Enter your email address to receive the letter.",
        invalid:
          "Check the email address: it needs an @ and a domain, like name@example.com.",
      },
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone((form.elements.namedItem("news-email") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-letter">
        <h2>{footer.newsletter.title}</h2>
        <p>{footer.newsletter.text}</p>
        <form className="letter-form" onSubmit={submit} noValidate>
          <label htmlFor="news-email">Email address</label>
          <div className="letter-row">
            <input
              id="news-email"
              name="news-email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              aria-invalid={errors["news-email"] ? true : undefined}
              aria-describedby={
                errors["news-email"] ? "news-email-error" : undefined
              }
            />
            <button type="submit" className="btn btn-ink">
              Subscribe <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          {errors["news-email"] && (
            <p className="field-error" id="news-email-error">
              {errors["news-email"]}
            </p>
          )}
          <p className="letter-status" aria-live="polite">
            {done
              ? `Thank you. The next letter will go to ${done}. (Demo: nothing was sent or stored.)`
              : ""}
          </p>
        </form>
      </div>

      <div className="footer-map">
        <nav aria-label="Shop">
          <h2>Shop</h2>
          <Link to="/shop">Everything</Link>
          {categories.map((c) => (
            <a key={c.id} href={`#/shop?c=${c.id}`}>
              {c.label}
            </a>
          ))}
        </nav>
        <nav aria-label="Collection">
          <h2>Collection</h2>
          <Link to="/collection">The Quiet Hours lookbook</Link>
          <Link to="/collection/look-01">Look 01, 06:10</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/journal/notes-on-the-quiet-hours">
            Notes on the collection
          </Link>
        </nav>
        <nav aria-label="House">
          <h2>House</h2>
          <Link to="/house">The House</Link>
          <Link to="/stores">Stores and hours</Link>
          <Link to="/bag">Your bag</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
        <div className="footer-contact">
          <h2>Contact</h2>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <p>{footer.hoursLine}</p>
          <p>{stores.map((s) => s.city).join(" · ")}</p>
          <div className="social">
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-base">
        <span className="footer-word" aria-hidden="true">
          Muse
        </span>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
