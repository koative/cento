import { useState, type FormEvent } from "react";
import { Instagram } from "lucide-react";
import { Link } from "../router";
import { brand, categories, newsletter } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, {
      letter: {
        missing: "Enter your email to get the kiln letter.",
        invalid:
          "Check the email: it needs an @ and a domain, like ana@example.com.",
      },
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone((form.elements.namedItem("letter") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <section className="footer-letter" aria-labelledby="letter-title">
          <h2 id="letter-title">{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <form onSubmit={submit} noValidate className="letter-form">
            <Field
              label="Email address"
              name="letter"
              type="email"
              required
              autoComplete="email"
              error={errors.letter}
            />
            <button className="btn" type="submit">
              Sign up
            </button>
          </form>
          <p className="form-status" aria-live="polite">
            {done && `Thank you. The next kiln letter will go to ${done}.`}
          </p>
        </section>
        <nav className="footer-map" aria-label="Footer">
          <div>
            <h2>Shop</h2>
            <Link to="/shop">All objects</Link>
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?c=${c.id}`}>
                {c.label}
              </Link>
            ))}
          </div>
          <div>
            <h2>Studio</h2>
            <Link to="/workshops">Workshops</Link>
            <Link to="/glazes">Glaze bench</Link>
            <Link to="/studio">About the studio</Link>
            <Link to="/journal">Journal</Link>
          </div>
          <div>
            <h2>Orders</h2>
            <Link to="/cart">Your bag</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/journal/caring-for-handmade-stoneware">Care guide</Link>
          </div>
          <div>
            <h2>Visit</h2>
            <address>
              {brand.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="social"
            >
              <Instagram size={18} aria-hidden="true" /> Instagram
            </a>
          </div>
        </nav>
      </div>
      <div className="footer-base">
        <Logo />
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
