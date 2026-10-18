import { useState, type FormEvent } from "react";
import { brand, socials } from "../content";
import { Link } from "../router";
import { pause, validate } from "../lib/format";
import { Field, useErrors } from "./Field";

const columns = [
  {
    title: "Live",
    links: [
      ["/tour", "Tour dates"],
      ["/videos", "Videos"],
    ],
  },
  {
    title: "Records",
    links: [
      ["/music", "Discography"],
      ["/music/low-ceiling", "Low Ceiling"],
    ],
  },
  {
    title: "Store",
    links: [
      ["/merch", "Merch"],
      ["/cart", "Cart"],
      ["/checkout", "Checkout"],
    ],
  },
  {
    title: "Band",
    links: [
      ["/about", "About"],
      ["/press", "Press"],
    ],
  },
];

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      email: "Enter an email like you@example.com so we can send the dates.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    setState("done");
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-list">
          <h2>The mailing list</h2>
          <p>
            New dates land in your inbox 48 hours before they go on sale. One
            email a month, give or take a tour.
          </p>
          {state === "done" ? (
            <p className="form-done" role="status">
              You're on the list. The next email comes from {brand.email}.
            </p>
          ) : (
            <form
              className="inline-form"
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
              <button className="btn btn-red" disabled={state === "sending"}>
                {state === "sending" ? "Adding…" : "Sign up"}
              </button>
            </form>
          )}
          <p aria-live="polite" className="sr-only">
            {state === "done" ? "Signed up to the mailing list." : ""}
          </p>
        </div>

        {columns.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
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
      </div>

      <div className="wrap footer-base">
        <p className="footer-mark" aria-hidden="true">
          {brand.name}
        </p>
        <div className="footer-meta">
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a> ·{" "}
            <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>
          </p>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
          <p>
            {brand.name} is a fictional brand — a{" "}
            <a href="https://koative.github.io/cento/">Cento</a> template by
            Koative.
          </p>
        </div>
      </div>
    </footer>
  );
}
