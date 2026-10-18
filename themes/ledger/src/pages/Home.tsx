import { useState } from "react";
import { ArrowRight, Snowflake } from "lucide-react";
import { Link } from "../router";
import {
  accounts,
  envelopes,
  guides,
  home,
  pricing,
  transactions,
} from "../content";
import { money } from "../lib/format";
import { spent } from "../lib/store";
import { Allocator } from "../components/Allocator";
import { DebitCard } from "../components/DebitCard";

const preview = ["groceries", "eating", "transit", "fun", "trip"].map((id) => {
  const e = envelopes.find((x) => x.id === id)!;
  const out = spent(id, transactions);
  return { ...e, out, left: e.assigned - out };
});

export default function Home() {
  const [frozen, setFrozen] = useState(false);
  const net = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.heading}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start free
            </Link>
            <Link to="/app" className="btn btn-quiet btn-large">
              Open the live demo <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <p className="quiet-note">
            Free for one person. Plus from $7 a month.
          </p>
        </div>
        <div
          className="hero-product"
          aria-label="Ledger budget screen, sample data"
          role="group"
        >
          <div className="sheet">
            <div className="sheet-head">
              <span>October budget</span>
              <span className="sheet-safe">
                Safe to spend this week <strong className="num">$214.30</strong>
              </span>
            </div>
            <table className="ledger-table sheet-table">
              <caption className="sr-only">
                Five envelopes from a sample October budget
              </caption>
              <thead>
                <tr>
                  <th scope="col">Envelope</th>
                  <th scope="col" className="num-col">
                    Spent
                  </th>
                  <th scope="col" className="num-col">
                    Left
                  </th>
                </tr>
              </thead>
              <tbody>
                {preview.map((e) => (
                  <tr key={e.id}>
                    <th scope="row">
                      {e.name}
                      <span
                        className="meter"
                        data-over={e.left < 0 ? "" : undefined}
                        aria-hidden
                      >
                        <span
                          style={{
                            width: `${Math.min(100, (e.out / e.assigned) * 100)}%`,
                          }}
                        />
                      </span>
                    </th>
                    <td className="num">{money(e.out, { cents: false })}</td>
                    <td className={e.left < 0 ? "num neg" : "num"}>
                      {money(e.left, { cents: false })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hero-card">
            <DebitCard />
          </div>
        </div>
      </section>

      <section className="steps wrap" aria-labelledby="steps-h">
        <h2 id="steps-h" className="section-title">
          Three habits, one per payday
        </h2>
        <ol className="step-list">
          {home.steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-n num" aria-hidden>
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band-paper" aria-labelledby="alloc-h">
        <div className="wrap split split-alloc">
          <div className="split-copy">
            <h2 id="alloc-h">{home.allocator.heading}</h2>
            <p>{home.allocator.text}</p>
            <p className="aside">
              In the app the same table runs all month: what you assigned, what
              you spent, and what is left in every envelope.
            </p>
          </div>
          <Allocator />
        </div>
      </section>

      <section className="wrap split" aria-labelledby="acc-h">
        <div className="split-copy">
          <h2 id="acc-h">{home.accounts.heading}</h2>
          <p>{home.accounts.text}</p>
          <ul className="tick-list">
            {home.accounts.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <table className="ledger-table accounts-preview">
          <caption className="sr-only">
            Sample linked accounts and net worth
          </caption>
          <thead>
            <tr>
              <th scope="col">Account</th>
              <th scope="col" className="num-col">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id}>
                <th scope="row">
                  {a.name}
                  <small>
                    {a.institution} ·· {a.mask}
                  </small>
                </th>
                <td className={a.balance < 0 ? "num neg" : "num"}>
                  {money(a.balance)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <th scope="row">Net worth</th>
              <td className="num">{money(net)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="band band-plum" aria-labelledby="card-h">
        <div className="wrap split card-split">
          <div className="card-stage">
            <DebitCard frozen={frozen} />
            <button
              className="btn btn-light"
              aria-pressed={frozen}
              onClick={() => setFrozen((f) => !f)}
            >
              <Snowflake size={17} aria-hidden />{" "}
              {frozen ? "Unfreeze card" : "Freeze card"}
            </button>
            <p className="card-status" role="status">
              {frozen
                ? "Card frozen. New purchases are declined; subscriptions keep working."
                : "Card active. Spending comes out of your envelopes."}
            </p>
          </div>
          <div className="split-copy">
            <h2 id="card-h">{home.card.heading}</h2>
            <p>{home.card.text}</p>
            <Link to="/features" className="text-link">
              Everything the card does
            </Link>
          </div>
        </div>
      </section>

      <section
        className="wrap quote-block"
        aria-label="From a Ledger household"
      >
        <blockquote>
          <p>{home.quote.text}</p>
          <footer>
            <strong>{home.quote.name}</strong> {home.quote.detail}
          </footer>
        </blockquote>
        <Link to="/households" className="text-link">
          How four households set up their month
        </Link>
      </section>

      <section className="wrap guides-teaser" aria-labelledby="guides-h">
        <div className="row-head">
          <h2 id="guides-h">From the money guides</h2>
          <Link to="/guides" className="text-link">
            All guides
          </Link>
        </div>
        <ul className="guide-rows">
          {guides.slice(0, 3).map((g) => (
            <li key={g.slug}>
              <Link to={`/guides/${g.slug}`}>
                <strong>{g.title}</strong>
                <span className="guide-excerpt">{g.excerpt}</span>
                <span className="guide-topic">{g.topic}</span>
                <span className="guide-time num">{g.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="band band-paper" aria-labelledby="sec-h">
        <div className="wrap split">
          <div className="split-copy">
            <h2 id="sec-h">Ledger can see your money. It can never move it.</h2>
            <Link to="/security" className="text-link">
              How we protect your accounts
            </Link>
          </div>
          <dl className="ruled-list">
            {home.security.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap price-strip" aria-labelledby="price-h">
        <h2 id="price-h">Three plans, all paid by the people who use them</h2>
        <ul>
          {pricing.plans.map((p) => (
            <li key={p.id}>
              <span>{p.name}</span>
              <strong className="num">
                {p.monthly ? `$${p.monthly}` : "$0"}
              </strong>
              <small>{p.monthly ? "a month" : "forever"}</small>
              <span className="price-who">{p.who}</span>
            </li>
          ))}
        </ul>
        <Link to="/pricing" className="text-link">
          Compare plans
        </Link>
      </section>

      <section className="close wrap" aria-labelledby="close-h">
        <h2 id="close-h">{home.close.heading}</h2>
        <p>{home.close.text}</p>
        <div className="actions">
          <Link to="/signup" className="btn btn-primary btn-large">
            Create your account
          </Link>
          <Link to="/app" className="btn btn-quiet btn-large">
            Look around the demo first
          </Link>
        </div>
      </section>
    </>
  );
}
