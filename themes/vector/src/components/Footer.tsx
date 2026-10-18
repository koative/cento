import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer, models, stories } from "../content";
import { Logo } from "./Header";
import { Field, focusFirst, useErrors, validate } from "./Field";

const columns = [
  {
    title: "Models",
    links: [
      ...models.map((m) => ({ to: `/models/${m.slug}`, label: m.name })),
      { to: "/models", label: "Compare all" },
    ],
  },
  {
    title: "Buy",
    links: [
      { to: "/configure", label: "Configure" },
      { to: "/reserve", label: "Reserve" },
      { to: "/test-drive", label: "Book a test drive" },
    ],
  },
  {
    title: "Own",
    links: [
      { to: "/charging", label: "Charging" },
      { to: "/owners", label: "Owners" },
      { to: `/owners/${stories[0].slug}`, label: "Owner stories" },
    ],
  },
  { title: "Company", links: [{ to: "/about", label: "About Vector" }] },
];

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email: "Enter an email address like name@example.com.",
    });
    setErrors(found);
    if (Object.keys(found).length) return focusFirst(form, found);
    setDone(String(new FormData(form).get("email")));
    form.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>{brand.legal}</p>
            <address>
              {brand.address}
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <br />
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                {brand.phone}
              </a>
            </address>
          </div>
          <div className="footer-news">
            <h2>{footer.newsletter.title}</h2>
            <p>{footer.newsletter.text}</p>
            <form
              className="news-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <button className="btn btn-signal" type="submit">
                Subscribe
              </button>
            </form>
            <p className="form-status" aria-live="polite">
              {done &&
                `Subscribed ${done}. The next notes go out in January, with this winter's range results.`}
            </p>
          </div>
        </div>

        <nav className="footer-cols" aria-label="Site map">
          {columns.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>Follow</h2>
            <ul>
              {brand.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="footer-base">
          <p>
            {brand.name} is a fictional brand — a{" "}
            <a href="https://cento.koative.com/">Cento</a> template by
            Koative.
          </p>
          <p>
            Prices in USD before incentives. Range figures are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
