import { useState } from "react";
import { ArrowUpRight, ArrowRight, Plus, Minus, Film } from "lucide-react";
import screen from "./assets/screen.jpg";
const films = [
  {
    name: "The quiet between",
    director: "A film by Ellis North",
    genre: "A nocturnal road story",
    time: "20:30",
    length: "108 min",
    date: "Friday 16 October",
  },
  {
    name: "A place to disappear",
    director: "A film by Ren Okada",
    genre: "Cities, memory, and the spaces we leave",
    time: "18:15",
    length: "94 min",
    date: "Saturday 17 October",
  },
  {
    name: "Where the light goes",
    director: "A film by Alma Reed",
    genre: "An intimate portrait of a disappearing coast",
    time: "21:00",
    length: "116 min",
    date: "Sunday 18 October",
  },
];
export default function App() {
  const [selected, setSelected] = useState(0);
  const [tickets, setTickets] = useState(1);
  const [receipt, setReceipt] = useState("");
  const film = films[selected];
  return (
    <>
      <header>
        <a className="wordmark" href="#programme">
          APERTURE
          <Film size={26} />
        </a>
        <nav aria-label="Main">
          <a href="#programme">On screen</a>
          <a href="#tickets">
            Your evening <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <div className="intro">
          <p>Independent cinema. Shared darkness.</p>
          <span>16—18 OCT / AUTUMN PROGRAMME</span>
        </div>
        <section id="programme" className="programme">
          <div className="film-screen">
            <img
              src={screen}
              alt="Deep blue night sky over a distant horizon"
            />
            <div className="screen-top">
              <span>THIS WEEK AT APERTURE</span>
              <span>SCREEN 1 · ORIGINAL VERSION</span>
            </div>
            <div className="film-title">
              <h1>{film.name}</h1>
              <p>{film.director}</p>
            </div>
            <div className="screen-bottom">
              <span>{film.genre}</span>
              <span>{film.length}</span>
            </div>
          </div>
          <aside>
            <h2>
              Stay for
              <br />
              the credits.
            </h2>
            <p>Three films worth getting lost in. Choose your next evening.</p>
            <div className="film-list">
              {films.map((f, i) => (
                <button
                  key={f.name}
                  aria-pressed={selected === i}
                  onClick={() => {
                    setSelected(i);
                    setReceipt("");
                  }}
                >
                  <span>
                    {f.date}
                    <b>{f.name}</b>
                  </span>
                  <ArrowRight size={19} />
                </button>
              ))}
            </div>
            <p className="small">
              A fictional cinema programme.
              <br />A real love of the big screen.
            </p>
          </aside>
        </section>
        <section className="ticket-strip" id="tickets">
          <div>
            <span>YOUR SCREENING</span>
            <h2>{film.name}</h2>
            <p>
              {film.date} · {film.time} · Screen 1
            </p>
          </div>
          <div className="ticket-quantity">
            <span>Seats · £12 each</span>
            <div>
              <button
                aria-label="Remove ticket"
                disabled={tickets === 1}
                onClick={() => {
                  setTickets(tickets - 1);
                  setReceipt("");
                }}
              >
                <Minus />
              </button>
              <output aria-label="Ticket quantity">{tickets}</output>
              <button
                aria-label="Add ticket"
                disabled={tickets === 6}
                onClick={() => {
                  setTickets(tickets + 1);
                  setReceipt("");
                }}
              >
                <Plus />
              </button>
            </div>
          </div>
          <button
            className="reserve"
            onClick={() =>
              setReceipt(
                `${tickets} ${tickets === 1 ? "seat" : "seats"} for ${film.name} at ${film.time} — £${tickets * 12}. Local preview only; no seats reserved.`,
              )
            }
          >
            Preview tickets · £{tickets * 12}
            <ArrowUpRight size={22} />
          </button>
          <p className="status" role="status">
            {receipt}
          </p>
        </section>
        <section className="cinema-note">
          <h2>
            Arrive early.
            <br />
            Leave somewhere else.
          </h2>
          <div>
            <p>
              Our imagined corner cinema has one screen, a small bar, and a
              programme that makes room for unfamiliar voices. No trailers you
              have seen a hundred times. Just a little room for the unexpected.
            </p>
            <p>
              Doors open 30 minutes before each screening.
              <br />
              All films shown with English subtitles where needed.
            </p>
          </div>
          <div className="stamp">
            LIGHTS
            <br />
            DOWN.
            <br />
            <Film size={38} />
          </div>
        </section>
      </main>
      <footer>
        <strong>APERTURE / INDEPENDENT PICTURES</strong>
        <p>
          Fictional cinema demo by Koative. Ticket selections stay in this
          browser.
        </p>
      </footer>
    </>
  );
}
