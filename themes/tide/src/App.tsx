import { useState } from "react";
import { ArrowUpRight, ArrowDown, MapPin, Clock, Check } from "lucide-react";
import ocean from "./assets/ocean.jpg";
const places = [
  {
    name: "Brighton shore",
    date: "Saturday, 24 October",
    time: "09:00–11:00",
    point: "Meet at the west promenade",
    spots: 18,
    description:
      "A gentle beach walk with a purpose. We’ll collect, sort, and record what the tide leaves behind.",
  },
  {
    name: "Bristol harbourside",
    date: "Sunday, 25 October",
    time: "10:00–12:00",
    point: "Meet beside the floating harbour",
    spots: 12,
    description:
      "Follow the water through the city. Help our local crew care for the banks and the places between.",
  },
  {
    name: "Cornwall coast",
    date: "Saturday, 31 October",
    time: "09:30–12:00",
    point: "Meet at the north beach access",
    spots: 24,
    description:
      "A longer morning along the sand. Bring a friend and leave this stretch of coastline a little lighter.",
  },
];
export default function App() {
  const [location, setLocation] = useState(0);
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const p = places[location];
  return (
    <>
      <header>
        <a href="#" className="brand">
          <svg width="40" height="28" viewBox="0 0 40 28" aria-hidden="true">
            <path
              d="M1 9Q10 1 20 9T39 9M1 20Q10 12 20 20T39 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          tide
        </a>
        <nav aria-label="Main navigation">
          <a href="#mission">Our purpose</a>
          <a href="#impact">In motion</a>
          <a href="#join" className="join-link">
            Find your shoreline <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <img
            src={ocean}
            alt="A blue ocean wave rising in the pale morning light"
          />
          <div className="hero-type">
            <h1>
              The ocean
              <br />
              connects <em>us.</em>
            </h1>
            <p>
              So let’s show up for it.
              <br />
              Small actions. Shared shores. A better blue.
            </p>
            <a href="#join" className="button">
              Make a little change <ArrowUpRight size={20} />
            </a>
          </div>
          <a className="scroll-note" href="#mission">
            A movement starts at the water’s edge <ArrowDown size={18} />
          </a>
          <span className="hero-label">An ocean conservation concept</span>
        </section>
        <section id="mission" className="mission">
          <div className="mission-side">
            <span>
              One ocean.
              <br />
              All of us.
            </span>
            <svg viewBox="0 0 160 110" aria-hidden="true">
              <path
                d="M0 30Q40 0 80 30T160 30M0 60Q40 30 80 60T160 60M0 90Q40 60 80 90T160 90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <h2>
              Big change begins
              <br />
              on your <em>little stretch.</em>
            </h2>
            <p>
              We believe caring for the ocean should feel close to home. A
              morning on the beach. A conversation with a neighbour. The
              decision to pick something up.
            </p>
            <p>
              Tide is an imagined community bringing people together around the
              water they love. Start where you are. Bring what you can.
            </p>
            <a href="#join">
              Meet your local crew <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section id="join" className="join">
          <div className="section-title">
            <h2>
              See you by
              <br />
              the water.
            </h2>
            <p>
              Choose a sample cleanup.
              <br />
              Good company comes with the territory.
            </p>
          </div>
          <div className="join-layout">
            <div className="locations" aria-label="Cleanup locations">
              {places.map((place, i) => (
                <button
                  key={place.name}
                  onClick={() => {
                    setLocation(i);
                    setJoined(false);
                    setName("");
                  }}
                  aria-pressed={location === i}
                >
                  <span>
                    <MapPin size={18} />
                    {place.name}
                  </span>
                  <ArrowUpRight size={20} />
                </button>
              ))}
              <small>
                Illustrative events for this template.
                <br />
                No real events or places are reserved.
              </small>
            </div>
            <article className="event">
              <div className="event-top">
                <span>Community cleanup</span>
                <span>{p.spots} sample spaces</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="event-detail">
                <span>
                  <Clock size={16} />
                  {p.date} · {p.time}
                </span>
                <span>
                  <MapPin size={16} />
                  {p.point}
                </span>
              </div>
              {joined ? (
                <div role="status" className="confirmation">
                  <Check size={23} />
                  <div>
                    <strong>See you in spirit, {name}.</strong>
                    <p>
                      Your demo place at {p.name} is confirmed locally. Nothing
                      has been booked or sent.
                    </p>
                    <button onClick={() => setJoined(false)}>
                      Edit signup
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setJoined(true);
                  }}
                >
                  <div className="fields">
                    <label>
                      Your name
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="given-name"
                      />
                    </label>
                    <label>
                      Your email
                      <input required type="email" autoComplete="email" />
                    </label>
                  </div>
                  <button className="button" type="submit">
                    Join this demo cleanup <ArrowUpRight size={18} />
                  </button>
                  <small>
                    Your details stay on this page and reset on reload.
                  </small>
                </form>
              )}
            </article>
          </div>
        </section>
        <section id="impact" className="impact">
          <div>
            <h2>
              Every small
              <br />
              thing <em>counts.</em>
            </h2>
            <p>
              Sample season report
              <br />
              Illustrative data, not measured impact.
            </p>
          </div>
          <div className="impact-data">
            <div>
              <strong>38</strong>
              <p>
                Shoreline mornings
                <br />
                spent together
              </p>
            </div>
            <div>
              <strong>640</strong>
              <p>
                People showing up
                <br />
                for their local water
              </p>
            </div>
            <div>
              <strong>1.2t</strong>
              <p>
                Of litter collected
                <br />
                in our sample season
              </p>
            </div>
          </div>
        </section>
        <section className="closing">
          <h2>
            Same planet.
            <br />
            Same tide.
          </h2>
          <a href="#join">
            Find your shoreline <ArrowUpRight size={28} />
          </a>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          tide
        </a>
        <p>Fictional conservation project · Koative Templates</p>
        <a href="../../">
          Explore the collection <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
