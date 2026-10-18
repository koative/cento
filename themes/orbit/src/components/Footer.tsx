import { Link } from "../router";
import { brand, missions, newsletter, vehicles } from "../content";
import { described, useFormFlow } from "../lib/form";
import { Mark } from "./Logo";

const rules = {
  "alert-email": { message: "Enter an email address like name@company.com." },
};

export function Footer() {
  const form = useFormFlow(rules, 800);
  const error = form.errors["alert-email"];

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name.toLowerCase()}</span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <span className="muted">{brand.hours}</span>
          </address>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div>
            <h2>Launch</h2>
            <ul>
              <li>
                <Link to="/rideshare">Rideshare pricing</Link>
              </li>
              <li>
                <Link to="/manifest">Launch manifest</Link>
              </li>
              <li>
                <Link to="/reserve">Reserve a slot</Link>
              </li>
              <li>
                <Link to="/vehicles">Vehicles</Link>
              </li>
              {vehicles.map((v) => (
                <li key={v.id}>
                  <Link to={`/vehicles/${v.id}`}>{v.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Missions</h2>
            <ul>
              <li>
                <Link to="/missions">All missions</Link>
              </li>
              {missions.slice(0, 4).map((m) => (
                <li key={m.slug}>
                  <Link to={`/missions/${m.slug}`}>{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link to="/about">About Orbit</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              {brand.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="footer-alerts">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          {form.status === "done" ? (
            <p className="form-success">
              You are on the list. The next alert goes out when{" "}
              {missions[0].name}'s date is confirmed.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={(e) => form.submit(e)}
              className="inline-form"
            >
              <label htmlFor="alert-email">Email</label>
              <div className="inline-row">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  onInput={() => form.clear("alert-email")}
                  {...described("alert-email", error)}
                />
                <button
                  className="btn btn-primary"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending" ? "Adding…" : "Subscribe"}
                </button>
              </div>
              {error && (
                <p className="field-error" id="alert-email-error">
                  {error}
                </p>
              )}
            </form>
          )}
          <p aria-live="polite" className="visually-hidden">
            {form.status === "done" ? "Subscribed to launch alerts." : ""}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p className="muted">
          Forms on this site send nothing. Prices, flights and people are sample
          content.
        </p>
      </div>
    </footer>
  );
}
