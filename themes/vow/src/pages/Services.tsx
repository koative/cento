import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { addOns, comparison, faqs, guestTiers, packages } from "../content";
import { money } from "../lib/plan";

export function Services() {
  const [tier, setTier] = useState(0);

  return (
    <div className="page services-page">
      <header className="page-head">
        <h1>Four ways to work with us</h1>
        <p className="lede">
          Every fee is flat and set by package and guest count, never a
          percentage of your budget. We take no commission from suppliers, so
          our advice costs the same whichever way it goes.
        </p>
      </header>

      <section className="packages" aria-labelledby="pk-title">
        <div className="packages-head">
          <h2 id="pk-title">Packages and fees</h2>
          <div className="segmented" role="group" aria-label="Guest count">
            {guestTiers.map((t, i) => (
              <button
                key={t}
                type="button"
                aria-pressed={tier === i}
                onClick={() => setTier(i)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <ol className="package-list" aria-live="polite">
          {packages.map((p) => {
            const price = p.prices[tier];
            return (
              <li
                key={p.id}
                className="package"
                data-unavailable={price === null || undefined}
              >
                <div className="package-name">
                  <h3>{p.name}</h3>
                  <p className="meta">
                    {p.kind} · {p.joins}
                  </p>
                </div>
                <p className="package-price num">
                  {price === null ? "Up to 20 guests only" : money(price)}
                </p>
                <p className="package-summary">{p.summary}</p>
                <ul className="ticks">
                  {p.includes.map((x) => (
                    <li key={x}>
                      <Check size={16} strokeWidth={1.5} aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        <p className="fine">
          Fees cover our planning and on-the-day team. Suppliers invoice you
          directly. Paid in three instalments: 30% to book, 40% at six months,
          30% a month before.
        </p>
      </section>

      <section className="compare" aria-labelledby="cmp-title">
        <h2 id="cmp-title">What each one includes</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="cmp-title"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Service</span>
                </th>
                {packages.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {packages.map((p) => (
                    <td key={p.id}>
                      {row.in.includes(p.id) ? (
                        <Check
                          size={18}
                          strokeWidth={1.5}
                          role="img"
                          aria-label="Included"
                        />
                      ) : (
                        <Minus
                          size={18}
                          strokeWidth={1}
                          role="img"
                          aria-label="Not included"
                          className="muted"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="addons" aria-labelledby="ad-title">
        <h2 id="ad-title">Add to any package</h2>
        <dl className="menu-list">
          {addOns.map((a) => (
            <div key={a.name}>
              <dt>
                {a.name} <span className="num">{a.price}</span>
              </dt>
              <dd>{a.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions couples ask first</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Not sure which one?</h2>
        <p>
          The planner suggests a package from your date and guest count. Or tell
          us and we will suggest one.
        </p>
        <div className="actions">
          <Link to="/enquire" className="btn">
            Enquire
          </Link>
          <Link to="/planner" className="text-link">
            Open the planner
          </Link>
        </div>
      </section>
    </div>
  );
}
