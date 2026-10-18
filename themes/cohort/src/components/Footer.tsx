import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerNote } from "../content";
import { Mark } from "./Mark";

const columns = [
  {
    title: "The firm",
    links: [
      { to: "/", label: "Home" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/thesis", label: "Thesis" },
      { to: "/team", label: "Team" },
    ],
  },
  {
    title: "Founders",
    links: [
      { to: "/founders", label: "For founders" },
      { to: "/pitch", label: "Pitch us" },
      { to: "/writing", label: "Writing" },
    ],
  },
];

export function Footer() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "letter-email",
    ) as HTMLInputElement;
    if (!input.checkValidity()) {
      setStatus("error");
      input.focus();
      return;
    }
    setStatus("done");
  };

  const [cento, rest] = footerNote.split("Cento");

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name}</span>
          </Link>
          <p>{brand.tagline}</p>
          <address>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </address>
          {brand.offices.map((o) => (
            <p key={o.city} className="footer-office">
              <strong>{o.city}</strong> {o.address}
            </p>
          ))}
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

        <div className="footer-letter">
          <h2>The quarterly letter</h2>
          <p>
            Four times a year: what we funded, what we passed on and why. No
            other email, ever.
          </p>
          <p className="letter-done" role="status">
            {status === "done" &&
              `You're on the list. The next letter goes out in the first week of January to ${email}.`}
          </p>
          {status !== "done" && (
            <form className="letter-form" noValidate onSubmit={submit}>
              <label htmlFor="letter-email">Email address</label>
              <div className="letter-row">
                <input
                  id="letter-email"
                  name="letter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  aria-invalid={status === "error" || undefined}
                  aria-describedby={
                    status === "error" ? "letter-err" : undefined
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error" && e.target.checkValidity())
                      setStatus("idle");
                  }}
                />
                <button type="submit" className="btn btn-ink">
                  Subscribe
                </button>
              </div>
              {status === "error" && (
                <p className="field-error" id="letter-err">
                  Enter an email address like name@company.com.
                </p>
              )}
            </form>
          )}
          <ul className="footer-social">
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base rule-top">
        <p>
          {cento}
          <a href="https://koative.github.io/cento/">Cento</a>
          {rest}
        </p>
        <p>
          Portfolio, people and figures on this site are fictional demonstration
          content.
        </p>
      </div>
    </footer>
  );
}
