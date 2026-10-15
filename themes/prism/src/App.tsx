import { useState } from "react";
import { ArrowUpRight, ArrowDown, ArrowRight, Plus, Minus } from "lucide-react";
const sessions = [
  {
    day: 0,
    time: "09:30",
    track: "Ideas",
    name: "The beautiful unfinished",
    person: "Ari Bell",
    format: "Opening talk",
  },
  {
    day: 0,
    time: "11:00",
    track: "Making",
    name: "A website is a place",
    person: "Noor Voss",
    format: "Workshop",
  },
  {
    day: 0,
    time: "14:00",
    track: "Ideas",
    name: "Against the predictable",
    person: "Eden Park",
    format: "Conversation",
  },
  {
    day: 0,
    time: "16:00",
    track: "Making",
    name: "Type that moves you",
    person: "Sam Okoro",
    format: "Live session",
  },
  {
    day: 1,
    time: "09:30",
    track: "Making",
    name: "Building with happy accidents",
    person: "Remy Lee",
    format: "Workshop",
  },
  {
    day: 1,
    time: "11:00",
    track: "Ideas",
    name: "Small studios, big questions",
    person: "Jo Rivera",
    format: "Panel",
  },
  {
    day: 1,
    time: "14:00",
    track: "Making",
    name: "From screen to something real",
    person: "Ari Bell",
    format: "Live session",
  },
  {
    day: 1,
    time: "16:00",
    track: "Ideas",
    name: "What happens next?",
    person: "Everyone",
    format: "Closing conversation",
  },
];
export default function App() {
  const [day, setDay] = useState(0),
    [track, setTrack] = useState("All tracks"),
    [ticket, setTicket] = useState("Full spectrum"),
    [qty, setQty] = useState(1),
    [selected, setSelected] = useState(false);
  const price = ticket === "Full spectrum" ? 180 : 95;
  return (
    <>
      <header>
        <a className="logo" href="#">
          prism
          <span>
            <ArrowUpRight size={31} strokeWidth={2.5} aria-hidden="true" />
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#program">Program</a>
          <a href="#people">People</a>
          <a href="#tickets" className="header-cta">
            Come curious <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="poster">
          <div className="poster-meta">
            <span>A GATHERING FOR CREATIVE MINDS</span>
            <span>BERLIN · 14—15 MAY 2027</span>
          </div>
          <div className="poster-body">
            <div>
              <h1>
                Different
                <br />
                angles.
                <br />
                <span>New ideas.</span>
              </h1>
              <p>
                Two days of getting a little lost.
                <br />
                In conversations, possibilities, and the work
                <br className="desktop-break" /> we haven't made yet.
              </p>
            </div>
            <div className="fold-scene" aria-hidden="true">
              <div className="fold">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="circle-type">CHANGE YOUR POINT OF VIEW</span>
            </div>
          </div>
          <div className="poster-bottom">
            <a href="#program">
              Explore the program <ArrowDown size={19} />
            </a>
            <span>Design / Culture / Creative technology</span>
          </div>
        </section>
        <section className="intro">
          <h2>
            Good things happen
            <br />
            between disciplines.
          </h2>
          <p>
            Prism brings together people who make things and people who ask
            questions. No perfect answers required. Just an open mind, a fresh
            notebook, and a willingness to see things differently.
          </p>
        </section>
        <section id="program" className="program">
          <div className="section-top">
            <h2>
              Make room
              <br />
              for possibility.
            </h2>
            <p>
              Follow a thread. Or take a detour.
              <br />
              Your day is yours to shape.
            </p>
          </div>
          <div className="program-controls">
            <div role="tablist" aria-label="Conference day">
              {["Friday, May 14", "Saturday, May 15"].map((x, i) => (
                <button
                  id={`day-${i}`}
                  role="tab"
                  aria-selected={day === i}
                  aria-controls="agenda"
                  key={x}
                  onClick={() => setDay(i)}
                >
                  {x}
                </button>
              ))}
            </div>
            <label>
              Explore{" "}
              <select
                aria-label="Program track"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
              >
                {["All tracks", "Ideas", "Making"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
          <div
            id="agenda"
            role="tabpanel"
            aria-labelledby={`day-${day}`}
            className="agenda"
          >
            {sessions
              .filter(
                (x) =>
                  x.day === day &&
                  (track === "All tracks" || x.track === track),
              )
              .map((x) => (
                <article key={x.name}>
                  <time>{x.time}</time>
                  <div>
                    <span className={`track ${x.track.toLowerCase()}`}>
                      {x.track}
                    </span>
                    <h3>{x.name}</h3>
                    <p>
                      {x.person} <span>— {x.format}</span>
                    </p>
                  </div>
                  <ArrowUpRight size={28} />
                </article>
              ))}
          </div>
          <p className="program-note">
            Illustrative program. All speakers and sessions are fictional.
          </p>
        </section>
        <section id="people" className="people">
          <div className="people-heading">
            <h2>
              Fresh perspectives.
              <br />
              Familiar curiosity.
            </h2>
            <span>
              Meet a few of the minds
              <br />
              in the room.
            </span>
          </div>
          <div className="speakers">
            {[
              {
                name: "Ari Bell",
                job: "Independent art director",
                shape: "loop",
                color: "orange",
              },
              {
                name: "Noor Voss",
                job: "Creative technologist",
                shape: "steps",
                color: "purple",
              },
              {
                name: "Eden Park",
                job: "Design researcher",
                shape: "orbit",
                color: "lime",
              },
            ].map((x) => (
              <article key={x.name}>
                <div className={`speaker-art ${x.color}`} aria-hidden="true">
                  <div className={x.shape}>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <h3>{x.name}</h3>
                <p>{x.job}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="tickets" className="ticket-section">
          <div>
            <h2>
              See you
              <br />
              from a<br />
              <em>new angle.</em>
            </h2>
            <p>
              Bring your questions.
              <br />
              Leave with a few more.
            </p>
          </div>
          <div className="ticket">
            <div className="ticket-top">
              <span>PRISM / BERLIN 2027</span>
              <ArrowUpRight size={28} />
            </div>
            <h3>
              Your place
              <br />
              in the room.
            </h3>
            <label className="ticket-label">
              Choose your pass
              <select
                aria-label="Ticket type"
                value={ticket}
                onChange={(e) => {
                  setTicket(e.target.value);
                  setSelected(false);
                }}
              >
                <option>Full spectrum</option>
                <option>Friday only</option>
                <option>Saturday only</option>
              </select>
            </label>
            <p className="ticket-description">
              {ticket === "Full spectrum"
                ? "Both days. Every talk. All the possibilities."
                : "One full day of talks and creative discovery."}
            </p>
            <div className="quantity">
              <span>People</span>
              <div>
                <button
                  aria-label="Remove one ticket"
                  disabled={qty === 1}
                  onClick={() => {
                    setQty(qty - 1);
                    setSelected(false);
                  }}
                >
                  <Minus size={16} />
                </button>
                <output>{qty}</output>
                <button
                  aria-label="Add one ticket"
                  disabled={qty === 4}
                  onClick={() => {
                    setQty(qty + 1);
                    setSelected(false);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="ticket-total">
              <span>Illustrative total</span>
              <strong>€{price * qty}</strong>
            </div>
            <button className="book" onClick={() => setSelected(true)}>
              Choose this experience <ArrowRight size={18} />
            </button>
            <p className="ticket-status" role="status">
              {selected
                ? `${qty} ${ticket.toLowerCase()} ${qty === 1 ? "pass" : "passes"} selected. Demo only — no booking or payment.`
                : "Demo selector. No real tickets are sold."}
            </p>
            <div className="ticket-perf" aria-hidden="true" />
          </div>
        </section>
      </main>
      <footer>
        <a className="logo" href="#">
          prism
          <ArrowUpRight size={31} strokeWidth={2.5} aria-hidden="true" />
        </a>
        <span>Different by design.</span>
        <p>
          A fictional conference.
          <br />
          Made for Koative Templates.
        </p>
      </footer>
    </>
  );
}
