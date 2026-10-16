import { useState } from "react";
import { ArrowUpRight, Ticket, Minus, Plus } from "lucide-react";
import theatre from "./assets/theatre.jpg";
const rows = ["A", "B", "C", "D"];
const unavailable = ["A3", "A4", "B6", "C1", "C2", "D8"];
const price = (seat: string) =>
  seat[0] === "A" ? 32 : seat[0] === "B" ? 28 : 24;
export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [performance, setPerformance] = useState("Friday 16 Oct · 19:30");
  const [summary, setSummary] = useState("");
  const total = selected.reduce((s, x) => s + price(x), 0);
  function toggle(seat: string) {
    setSelected(
      selected.includes(seat)
        ? selected.filter((x) => x !== seat)
        : selected.length < 6
          ? [...selected, seat]
          : selected,
    );
    setSummary("");
  }
  return (
    <>
      <header>
        <a href="#" className="brand">
          ENCORE<span>THEATRE HOUSE</span>
        </a>
        <nav aria-label="Main">
          <a href="#production">On stage</a>
          <a href="#seats">
            Find your seat <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="production" id="production">
          <div className="production-title">
            <span className="season">THE AUTUMN SEASON / 2026</span>
            <h1>
              The space
              <br />
              <em>between</em>
              <br />
              the words.
            </h1>
            <p>
              A new play about the things we leave unsaid.
              <br />
              Written by Ada Vale. Directed by Rowan Ellis.
            </p>
            <a href="#seats">
              An evening worth being here for <ArrowUpRight size={18} />
            </a>
          </div>
          <figure>
            <img
              src={theatre}
              alt="Theatrical performance under warm stage lighting"
            />
            <figcaption>
              16 OCTOBER — 7 NOVEMBER
              <br />
              <span>A fictional production in two acts.</span>
            </figcaption>
          </figure>
        </section>
        <section className="programme-note">
          <span>ABOUT THE PRODUCTION</span>
          <p>
            Three siblings return to a house they thought they had left behind.
            Over one long evening, an ordinary dinner becomes an extraordinary
            conversation.
          </p>
          <div>
            <span>Running time</span>
            <b>2 hrs 15 min</b>
            <small>Including one interval</small>
          </div>
        </section>
        <section className="booking" id="seats">
          <div className="seat-heading">
            <h2>
              Your seat.
              <br />
              Your evening.
            </h2>
            <label>
              Choose a performance
              <select
                value={performance}
                onChange={(e) => {
                  setPerformance(e.target.value);
                  setSelected([]);
                  setSummary("");
                }}
              >
                <option>Friday 16 Oct · 19:30</option>
                <option>Saturday 17 Oct · 19:30</option>
                <option>Sunday 18 Oct · 14:30</option>
              </select>
            </label>
          </div>
          <div className="booking-layout">
            <div className="seating-plan">
              <div className="stage">THE STAGE</div>
              <div className="seat-rows">
                {rows.map((row) => (
                  <div className="seat-row" key={row}>
                    <span>{row}</span>
                    {Array.from({ length: 8 }, (_, i) => {
                      const seat = row + (i + 1);
                      return (
                        <button
                          key={seat}
                          disabled={
                            unavailable.includes(seat) ||
                            (!selected.includes(seat) && selected.length === 6)
                          }
                          aria-label={`Seat ${seat}${unavailable.includes(seat) ? ", unavailable" : `, £${price(seat)}`}`}
                          aria-pressed={selected.includes(seat)}
                          onClick={() => toggle(seat)}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                    <span>{row}</span>
                  </div>
                ))}
              </div>
              <div className="seat-legend">
                <span>
                  <i />
                  Available
                </span>
                <span>
                  <i className="selected" />
                  Selected
                </span>
                <span>
                  <i className="unavailable" />
                  Unavailable
                </span>
              </div>
              <p>
                Illustrative seating plan. Select up to six seats.
                <br />
                Row A £32 · Row B £28 · Rows C–D £24
              </p>
            </div>
            <aside className="ticket-summary">
              <Ticket size={30} strokeWidth={1} />
              <h3>
                The space
                <br />
                between the words.
              </h3>
              <p>{performance}</p>
              <div className="chosen-seats">
                <span>Your seats</span>
                <strong>
                  {selected.length
                    ? selected.join(", ")
                    : "Choose a seat on the plan"}
                </strong>
              </div>
              <div className="total">
                <span>
                  {selected.length}{" "}
                  {selected.length === 1 ? "ticket" : "tickets"}
                </span>
                <b>£{total}</b>
              </div>
              <button
                disabled={!selected.length}
                onClick={() =>
                  setSummary(
                    `${selected.length} ${selected.length === 1 ? "ticket" : "tickets"} for ${performance}, seats ${selected.join(", ")} — £${total}. Demo only; no seats held or purchased.`,
                  )
                }
              >
                Preview tickets <ArrowUpRight size={18} />
              </button>
              <p role="status" className="status">
                {summary ||
                  "This is a local ticket preview. No payment or booking takes place."}
              </p>
            </aside>
          </div>
        </section>
        <section className="visit">
          <h2>Make an evening of it.</h2>
          <div>
            <details>
              <summary>When should I arrive?</summary>
              <p>
                The fictional foyer opens 45 minutes before the performance.
                Take your time, find your seat, and settle into the evening.
              </p>
            </details>
            <details>
              <summary>Is the theatre accessible?</summary>
              <p>
                This demo plan does not represent a real venue. Replace this
                section with verified access information, step-free routes,
                companion policies and booking contacts before launch.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <strong>ENCORE / BE HERE FOR IT</strong>
        <p>
          Fictional theatre by Koative. Production, cast, seating and prices are
          illustrative.
        </p>
      </footer>
    </>
  );
}
