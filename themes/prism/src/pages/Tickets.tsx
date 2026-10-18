import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { passes, ticketNotes, tickets } from "../content";
import { money } from "../lib/forms";

const features = [
  {
    label: "Talks, Thursday & Friday",
    passes: ["full", "conference", "student"],
  },
  { label: "One talk day", passes: ["day"] },
  { label: "Workshop or walk seat", passes: ["full"] },
  { label: "Long-table dinner", passes: ["full"] },
  {
    label: "Opening night & Afterlight party",
    passes: ["full", "conference", "student", "day"],
  },
  {
    label: "Lunch and coffee",
    passes: ["full", "conference", "student", "day"],
  },
  { label: "Main Hall live stream", passes: ["online"] },
  {
    label: "Recordings for a year",
    passes: ["full", "conference", "student", "online"],
  },
];

export function Tickets() {
  const [team, setTeam] = useState(false);
  const [size, setSize] = useState(tickets.teamSize);
  const factor = team ? 1 - tickets.teamDiscount : 1;
  const people = team ? size : 1;

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Tickets</h1>
        <p className="lede">
          Early-bird prices until {tickets.earlyBirdEnds}. Every pass includes
          lunch, coffee, the parties and captions on every talk. Prices include
          21% VAT.
        </p>
      </header>

      <div className="ticket-controls">
        <div className="seg" role="group" aria-label="Who's coming">
          <button
            type="button"
            aria-pressed={!team}
            onClick={() => setTeam(false)}
          >
            Just me
          </button>
          <button
            type="button"
            aria-pressed={team}
            onClick={() => setTeam(true)}
          >
            A team of {tickets.teamSize}+
          </button>
        </div>
        {team && (
          <div className="stepper" role="group" aria-label="Team size">
            <button
              type="button"
              aria-label="One fewer person"
              disabled={size <= tickets.teamSize}
              onClick={() => setSize((n) => n - 1)}
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite">{size} people</output>
            <button
              type="button"
              aria-label="One more person"
              disabled={size >= 40}
              onClick={() => setSize((n) => n + 1)}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="section-note">
          {team
            ? `${tickets.teamDiscount * 100}% off every pass for teams of ${tickets.teamSize} or more, on one invoice.`
            : "Booking for colleagues? Teams save 15%."}
        </p>
      </div>

      <div className="passes">
        {passes.map((p) => {
          const each = Math.round(p.earlyPrice * factor);
          return (
            <article
              key={p.id}
              className="pass"
              data-featured={p.featured ? "" : undefined}
            >
              <h2>{p.name}</h2>
              <p className="pass-text">{p.text}</p>
              <p className="pass-price">
                <span className="pp-now">{money(each)}</span>
                {p.price !== p.earlyPrice && (
                  <s>{money(Math.round(p.price * factor))}</s>
                )}
                <span className="pp-unit">
                  per person{team && ` · ${money(each * people)} for ${people}`}
                </span>
              </p>
              <ul className="pass-includes">
                {p.includes.map((i) => (
                  <li key={i}>
                    <Check aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              {p.note && <p className="pass-note">{p.note}</p>}
              <Link
                to={`/register?pass=${p.id}${team ? `&qty=${size}` : ""}`}
                className={`btn ${p.featured ? "btn-ink" : "btn-line"}`}
              >
                Choose {p.name}
              </Link>
            </article>
          );
        })}
      </div>

      <section className="section">
        <h2 className="h-section">Compare passes</h2>
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Included</th>
                {passes.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.label}>
                  <th scope="row">{f.label}</th>
                  {passes.map((p) => (
                    <td key={p.id}>
                      {f.passes.includes(p.id) && <Check aria-hidden="true" />}
                      <span className="sr-only">
                        {f.passes.includes(p.id) ? "Included" : "Not included"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section notes-grid">
        {ticketNotes.map((n) => (
          <div key={n.title}>
            <h2>{n.title}</h2>
            <p>{n.text}</p>
          </div>
        ))}
      </section>

      <p className="quiet-line">
        Questions about invoices or accessibility? See the{" "}
        <Link to="/about">FAQ</Link> or write to{" "}
        <a href="mailto:hello@prism.example">hello@prism.example</a>.
      </p>
    </div>
  );
}
