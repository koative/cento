import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { brand, bikes, hours } from "../content";
import { dayNames } from "../lib/hours";
import { Logo } from "./Header";
import { validate, type Errors } from "./Field";

const columns = [
  {
    title: "Shop",
    links: [
      ["/bikes", "All bikes"],
      ...bikes.slice(0, 4).map((b) => [`/bikes/${b.id}`, b.name]),
      ["/cart", "Cart"],
    ],
  },
  {
    title: "Workshop",
    links: [
      ["/build", "Build configurator"],
      ["/service", "Service & repairs"],
      ["/checkout", "Checkout"],
    ],
  },
  {
    title: "Velo",
    links: [
      ["/rides", "Rides club"],
      ["/about", "About the workshop"],
    ],
  },
];

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "news-email": {
        missing: "Enter your email to get the ride sheet.",
        invalid: "That email needs an @ and a domain, like name@example.com.",
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
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="footer-col">
            <h2>{c.title}</h2>
            <ul>
              {c.links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col footer-hours">
          <h2>Hours</h2>
          <dl>
            {[2, 3, 4, 5, 6, 0, 1].map((d) => (
              <div key={d}>
                <dt>{dayNames[d].slice(0, 3)}</dt>
                <dd>
                  {hours[d] ? `${hours[d]!.open}–${hours[d]!.close}` : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form className="footer-news" noValidate onSubmit={submit}>
          <h2>The Friday ride sheet</h2>
          <p>
            Weekend routes, who's leading, and what came in on the shop floor.
            One email a week.
          </p>
          <div className="inline-form">
            <label htmlFor="f-news-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="f-news-email"
              name="news-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={errors["news-email"] ? true : undefined}
              aria-describedby={
                errors["news-email"] ? "f-news-email-error" : undefined
              }
            />
            <button type="submit" className="btn">
              Subscribe <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          {errors["news-email"] && (
            <p className="field-error" id="f-news-email-error">
              {errors["news-email"]}
            </p>
          )}
          <p className="form-success" aria-live="polite">
            {done && (
              <>
                <Check size={16} aria-hidden="true" /> {done} is on the list.
                First sheet lands Friday.
              </>
            )}
          </p>
        </form>
      </div>

      <div className="footer-bottom">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
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
