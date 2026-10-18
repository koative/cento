import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { passes, passFaq, passNotes, trialPrice } from "../content";
import { Faq, PageHead } from "../components/Lists";

export function Passes() {
  const [committed, setCommitted] = useState(false);

  return (
    <>
      <PageHead
        title="Passes that fit your week."
        intro="Pay per class, buy a card you can share, or join for a month at a time. No joining fee, no annual fee, nothing to cancel but the membership itself."
      />

      <section className="wrap trial-strip" aria-labelledby="trial-strip-title">
        <h2 id="trial-strip-title">
          New here? Your first class is{" "}
          <span className="num">${trialPrice}</span>.
        </h2>
        <p>
          Any beginner or open-level class, any style. Don't love it? Your
          second trial, in another style, is free.
        </p>
        <Link to="/trial" className="btn btn-ink">
          Book a trial <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <section className="section wrap" aria-labelledby="passes-title">
        <div className="section-head section-head-row">
          <h2 id="passes-title">Cards and memberships</h2>
          <fieldset className="toggle">
            <legend className="sr-only">Membership term</legend>
            <label>
              <input
                type="radio"
                name="term"
                checked={!committed}
                onChange={() => setCommitted(false)}
              />
              <span>Month to month</span>
            </label>
            <label>
              <input
                type="radio"
                name="term"
                checked={committed}
                onChange={() => setCommitted(true)}
              />
              <span>6-month commitment</span>
            </label>
          </fieldset>
        </div>

        <ul className="pass-list">
          {passes.map((p) => {
            const price = committed && p.committed ? p.committed : p.price;
            return (
              <li
                key={p.id}
                className="pass"
                data-featured={p.id === "unlimited" ? "" : undefined}
              >
                <h3>{p.name}</h3>
                <p className="pass-line">{p.line}</p>
                <ul className="pass-includes">
                  {p.includes.map((x) => (
                    <li key={x}>
                      <Check size={16} aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
                <p className="pass-price">
                  <b className="num">${price}</b>
                  <span>
                    {p.unit === "month"
                      ? "a month"
                      : p.unit === "card"
                        ? `$${p.perClass} a class`
                        : "per class"}
                    {p.unit === "month" && committed && p.committed && (
                      <>
                        <br />
                        saves ${(p.price - p.committed) * 6} over 6 months
                      </>
                    )}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
        <p className="sr-only" aria-live="polite">
          {committed
            ? "Showing 6-month commitment prices"
            : "Showing month-to-month prices"}
        </p>
        <ul className="notes">
          {passNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <section className="section-paper2">
        <div className="wrap calc-cta">
          <h2>Not sure which one?</h2>
          <p className="lede">
            Pin the classes you'd actually go to on the timetable. My week
            prices every pass against your real schedule and picks the cheapest.
          </p>
          <Link to="/timetable" className="btn btn-ink">
            Price my week <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap faq-wrap" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions people ask at the desk</h2>
        <Faq items={passFaq} />
      </section>
    </>
  );
}
