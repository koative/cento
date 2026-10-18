import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, footer, services } from "../content";
import { Field, validate, type Errors } from "./Field";
import { Logo } from "./Header";

const columns = [
  {
    title: "Get things done",
    links: [
      { to: "/services", label: "All services" },
      { to: "/report", label: "Report an issue" },
      ...services
        .slice(0, 3)
        .map((s) => ({ to: `/services/${s.slug}`, label: s.name })),
    ],
  },
  {
    title: "Your city",
    links: [
      { to: "/council", label: "Council & meetings" },
      { to: "/news", label: "News" },
      { to: "/alerts", label: "Alerts" },
      { to: "/city-hall", label: "City Hall & departments" },
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
      email: {
        missing: "Enter your email address.",
        invalid:
          "Check the email — it needs an @ and a domain, like name@example.com.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone((form.elements.namedItem("email") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.tel}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="footer-hours">
            {brand.hoursText.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
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
          <h2>{footer.newsletter.title}</h2>
          <p>{footer.newsletter.body}</p>
          <div aria-live="polite">
            {done ? (
              <p className="success-line">
                <Check size={18} aria-hidden="true" /> Subscribed {done}. The
                first issue arrives Friday.
              </p>
            ) : (
              <form onSubmit={submit} noValidate className="inline-form">
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <button className="btn btn-citron">Subscribe</button>
              </form>
            )}
          </div>
          <p className="quiet-note">Demo form: nothing is sent.</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>Photos: public domain and CC licensed, see SOURCES.md.</p>
      </div>
    </footer>
  );
}
