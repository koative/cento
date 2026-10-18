import { Link } from "../router";
import { brand, footerColumns, socials } from "../content";
import { openState } from "../lib/format";
import { isEmail, useForm } from "../lib/form";
import { Field } from "./Field";
import { Logo } from "./Header";

export function Footer() {
  const f = useForm("news", { email: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter your email to get the newsletter."
      : !isEmail(v.email)
        ? "Check the email address: it needs an @ and a domain, like name@example.com."
        : undefined,
  }));
  const state = openState(new Date());

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p className="footer-status" data-open={state.open || undefined}>
            {state.text}
          </p>
          <address>
            {brand.street}
            <br />
            {brand.city}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </address>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="footer-col">
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <form className="footer-news" noValidate onSubmit={(e) => f.submit(e)}>
          <h2>Openings, first</h2>
          <p>
            One email a month: new exhibitions, viewing-room previews and
            invitations to openings. Thursday lates included.
          </p>
          <div aria-live="polite">
            {f.status === "done" && (
              <p className="success">
                You are on the list. The next letter goes out on the first
                Monday of the month.
              </p>
            )}
          </div>
          {f.status !== "done" && (
            <>
              <Field
                id={f.id("email")}
                label="Email address"
                error={f.errors.email}
              >
                <input
                  type="email"
                  required
                  autoComplete="email"
                  {...f.bind("email")}
                />
              </Field>
              <button
                className="btn"
                type="submit"
                disabled={f.status === "sending"}
              >
                {f.status === "sending" ? "Adding you…" : "Sign up"}
              </button>
            </>
          )}
          <p className="quiet">Demo form: nothing is sent anywhere.</p>
        </form>
      </div>

      <div className="footer-bottom">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <ul className="socials">
          {socials.map((s) => (
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
