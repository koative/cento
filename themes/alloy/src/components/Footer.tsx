import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { brand, footer, projects } from "../content";
import { Logo } from "./Logo";
import { pause } from "../lib/forms";

export function Footer() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "bulletin-email",
    ) as HTMLInputElement;
    if (!input.value.trim())
      return setError("Enter your email address to get the bulletin.");
    if (!input.checkValidity())
      return setError(
        "That email looks incomplete. Check it has an @ and a domain, like name@company.com.",
      );
    setError("");
    setState("sending");
    await pause(800);
    setState("done");
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Link to="/" className="home-link" aria-label={`${brand.name}, home`}>
            <Logo />
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p className="footer-safety">
            24-hour safety line{" "}
            <a href={`tel:${brand.safetyLine.replace(/\s/g, "")}`}>
              {brand.safetyLine}
            </a>
          </p>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/safety">Safety</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Work with us</h2>
            <ul>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/tender">Tenders and quotes</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>On site now</h2>
            <ul>
              {projects
                .filter((p) => p.status === "On site")
                .map((p) => (
                  <li key={p.slug}>
                    <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </nav>

        <div className="bulletin">
          <h2>{footer.bulletin.title}</h2>
          <p>{footer.bulletin.text}</p>
          {state === "done" ? (
            <p className="bulletin-done" role="status">
              <Check aria-hidden="true" size={18} /> You're on the list. The
              next bulletin goes out in January.
            </p>
          ) : (
            <form noValidate onSubmit={submit} className="bulletin-form">
              <label htmlFor="bulletin-email">Work email</label>
              <div className="bulletin-row">
                <input
                  id="bulletin-email"
                  name="bulletin-email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "bulletin-err" : undefined}
                  onChange={() => error && setError("")}
                />
                <button
                  className="btn btn-signal"
                  type="submit"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "Adding…" : "Subscribe"}
                  {state === "idle" && (
                    <ArrowRight aria-hidden="true" size={18} />
                  )}
                </button>
              </div>
              {error && (
                <p id="bulletin-err" className="field-error">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="quiet">Demo form: nothing is sent or stored.</p>
        </div>
      </div>

      <div className="wrap footer-base">
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
