import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { bookBySlug, club, images, pickBooks } from "../content";
import { Link } from "../router";
import { addLine } from "../lib/cart";
import { dateLong, money } from "../lib/format";
import { BookCover } from "../components/BookCover";
import { BookCard } from "../components/BookCard";

export function BookClub() {
  const current = bookBySlug(club.current);
  const [months, setMonths] = useState(club.plans[1].months);
  const [hardback, setHardback] = useState(false);
  const [added, setAdded] = useState("");
  const plan = club.plans.find((p) => p.months === months) ?? club.plans[1];
  const perMonth = plan.perMonth + (hardback ? club.hardbackExtra : 0);
  const total = perMonth * plan.months;
  const detail = `${plan.label} · ${hardback ? "Hardback" : "Paperback"}`;

  function add() {
    addLine({
      slug: "club",
      title: "Index Club membership",
      detail,
      unit: total,
      qty: 1,
    });
    setAdded(`Index Club, ${detail.toLowerCase()}, added to your bag.`);
  }

  return (
    <div className="page club-page">
      <header className="page-head page-head-split">
        <div>
          <h1>{club.heading}</h1>
          <p className="lede">{club.lede}</p>
        </div>
        <img
          src={images.armchair}
          alt="A patterned armchair piled with books in a small, crowded room"
          width={1600}
          height={1200}
        />
      </header>

      {current && (
        <section className="club-feature club-feature-page">
          <BookCover book={current} />
          <div>
            <h2>
              This month: <em>{current.title}</em>
            </h2>
            <p>{current.blurb[0]}</p>
            <p className="club-meta">
              Meeting {dateLong(club.meetings[0].date)}, 7pm, Room Three ·{" "}
              <Link to="/events/salt-orchard-club">Reserve a chair</Link>
            </p>
            <Link to={`/books/${current.slug}`} className="text-link">
              Read about the book <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      <section className="club-how" aria-labelledby="how-title">
        <h2 id="how-title">How a month works</h2>
        <ol className="steps">
          {club.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="membership" aria-labelledby="join-title">
        <div>
          <h2 id="join-title">Choose a membership</h2>
          <p>
            Paid up front, one novel a month, no renewal unless you ask. Collect
            from the shop for free or we post it with your other orders.
          </p>
        </div>
        <div className="builder">
          <fieldset className="plans">
            <legend>Length</legend>
            {club.plans.map((p) => (
              <label key={p.months} className="plan">
                <input
                  type="radio"
                  name="plan"
                  checked={p.months === months}
                  onChange={() => setMonths(p.months)}
                />
                <span className="plan-name">{p.label}</span>
                <span className="plan-price">{money(p.perMonth)} / month</span>
              </label>
            ))}
          </fieldset>
          <div className="switch-row">
            <span id="fmt-label">Paperback</span>
            <button
              type="button"
              role="switch"
              aria-checked={hardback}
              aria-labelledby="fmt-label-2"
              className="switch"
              onClick={() => setHardback(!hardback)}
            >
              <span />
            </button>
            <span id="fmt-label-2">
              Hardback (+{money(club.hardbackExtra)} / month)
            </span>
          </div>
          <p className="builder-total">
            <span>
              {plan.months} books at {money(perMonth)}
            </span>
            <strong>{money(total)}</strong>
          </p>
          <button type="button" className="btn btn-wide" onClick={add}>
            Add membership to bag
          </button>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View bag</Link>
              </>
            )}
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="meet-title">
        <h2 id="meet-title">Next meetings</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Book</th>
              <th scope="col">Where</th>
            </tr>
          </thead>
          <tbody>
            {club.meetings.map((m) => {
              const b = bookBySlug(m.book);
              return (
                <tr key={m.date}>
                  <td>{dateLong(m.date)}, 7pm</td>
                  <td>{b && <Link to={`/books/${b.slug}`}>{b.title}</Link>}</td>
                  <td>Room Three</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="band">
        <h2>Lately in the club</h2>
        <div className="shelf-row shelf-row-4">
          {pickBooks(club.past).map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions members ask</h2>
        {club.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
