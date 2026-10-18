import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, days, footer, hours } from "../content";
import { hoursLabel } from "../lib/plan";
import { pause } from "../lib/form";
import { Wordmark } from "./Wordmark";

const columns = [
  {
    title: "Salon",
    links: [
      { to: "/services", label: "Services & prices" },
      { to: "/lookbook", label: "Lookbook" },
      { to: "/stylists", label: "Stylists" },
      { to: "/products", label: "Products" },
    ],
  },
  {
    title: "Visit",
    links: [
      { to: "/book", label: "Book online" },
      { to: "/visit", label: "Hours & directions" },
      { to: "/visit", label: "Policies & FAQ" },
      { to: "/about", label: "About & careers" },
    ],
  },
];

export function Footer() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (!input.checkValidity()) {
      setError(
        input.value
          ? "That email is missing something. Try the form name@example.com."
          : "Add your email so we know where to send it.",
      );
      input.focus();
      return;
    }
    setError("");
    setState("sending");
    await pause(700);
    setState("done");
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Wordmark />
          </Link>
          <p>{footer.blurb}</p>
          <address>
            {brand.address[0]}
            <br />
            {brand.address[1]}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="footer-col">
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col footer-hours-col">
          <h2>Hours</h2>
          <dl className="footer-hours">
            {[2, 3, 4, 5, 6, 0, 1].map((d) => (
              <div key={d}>
                <dt>{days[d].slice(0, 3)}</dt>
                <dd>{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="footer-news">
          <h2>{footer.newsletterTitle}</h2>
          <p>{footer.newsletterBody}</p>
          {state === "done" ? (
            <p className="form-success" role="status">
              You're on the list. The next card goes out at the start of the
              season.
            </p>
          ) : (
            <form noValidate onSubmit={submit} className="news-form">
              <label htmlFor="news-email">Email address</label>
              <div className="news-row">
                <input
                  id="news-email"
                  name="news-email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "news-err" : undefined}
                  onChange={() => error && setError("")}
                />
                <button
                  className="btn btn-primary"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "Signing up…" : "Sign up"}
                </button>
              </div>
              {error && (
                <p className="field-error" id="news-err">
                  {error}
                </p>
              )}
            </form>
          )}
          <ul className="social">
            <li>
              <a href={brand.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={brand.pinterest} target="_blank" rel="noreferrer">
                Pinterest
              </a>
            </li>
            <li>
              <a href={brand.tiktok} target="_blank" rel="noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>Newsletter and booking forms are demonstrations; nothing is sent.</p>
      </div>
    </footer>
  );
}
