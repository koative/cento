import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer, guides, products } from "../content";
import { Logo } from "./Header";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All headphones" },
      ...products
        .filter((p) => p.type !== "Accessory")
        .slice(0, 4)
        .map((p) => ({ to: "/shop/" + p.id, label: p.name })),
      { to: "/compare", label: "Compare models" },
      { to: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/support", label: "Help centre" },
      ...guides
        .slice(0, 4)
        .map((g) => ({ to: "/support/" + g.slug, label: g.title })),
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/story", label: "The Hush One story" },
      { to: "/about", label: "About Hush" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
];

export function Footer() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (!input.validity.valid) {
      setState("error");
      input.focus();
      return;
    }
    setState("done");
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
            <a href={"mailto:" + brand.email}>{brand.email}</a>
            <a href={"tel:" + brand.phone.replace(/\s/g, "")}>{brand.phone}</a>
          </address>
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
          <p>{footer.newsletter.text}</p>
          {state === "done" ? (
            <p className="news-done" role="status">
              You are on the list. The next letter goes out on the first Tuesday
              of the month.
            </p>
          ) : (
            <form noValidate onSubmit={submit} className="news-form">
              <label htmlFor="news-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="news-email"
                name="news-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={state === "error" || undefined}
                aria-describedby={state === "error" ? "news-error" : undefined}
                onInput={() => state === "error" && setState("idle")}
              />
              <button type="submit" className="btn btn-small">
                Subscribe
              </button>
              {state === "error" && (
                <p className="field-error" id="news-error" role="alert">
                  Enter an email address with an @ and a domain, like
                  name@example.com.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <ul className="social">
          {footer.social.map((s) => (
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
