import { useState } from "react";
import { ArrowUpRight, ArrowRight, Flag, Check } from "lucide-react";
import football from "./assets/football.jpg";
const fixtures = [
  {
    home: "Field United",
    away: "Eastside Rovers",
    date: "Sat 17 Oct",
    time: "14:00",
    team: "First team",
    location: "The Common · Home",
    result: "Upcoming",
  },
  {
    home: "North End",
    away: "Field United",
    date: "Sun 18 Oct",
    time: "11:00",
    team: "Women",
    location: "North Park · Away",
    result: "Upcoming",
  },
  {
    home: "Field United",
    away: "Oak Athletic",
    date: "Sat 24 Oct",
    time: "10:30",
    team: "Under 18",
    location: "The Common · Home",
    result: "Upcoming",
  },
  {
    home: "Field United",
    away: "Riverside FC",
    date: "Sat 10 Oct",
    time: "3 — 1",
    team: "First team",
    location: "The Common · Home",
    result: "Results",
  },
  {
    home: "Field United",
    away: "Parkside",
    date: "Sun 11 Oct",
    time: "2 — 2",
    team: "Women",
    location: "The Common · Home",
    result: "Results",
  },
];
export default function App() {
  const [tab, setTab] = useState("Upcoming");
  const [team, setTeam] = useState("All teams");
  const [training, setTraining] = useState("Tuesday · Open training");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const visible = fixtures.filter(
    (f) => f.result === tab && (team === "All teams" || f.team === team),
  );
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Flag size={28} />
          FIELD
          <span>
            UNITED
            <br />
            COMMUNITY CLUB
          </span>
        </a>
        <nav aria-label="Main">
          <a href="#fixtures">Match centre</a>
          <a href="#join">
            Find your team <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main>
        <section className="matchday">
          <div className="club-title">
            <h1>
              Our game.
              <br />
              Our ground.
              <br />
              <span>Our people.</span>
            </h1>
            <p>
              Football belongs to everyone.
              <br />
              There is a place for you here.
            </p>
            <a href="#join">
              Get involved <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="next-match">
            <div className="match-label">
              <span>NEXT UP / FIRST TEAM</span>
              <span>THE COMMON</span>
            </div>
            <div className="match-teams">
              <div>
                <span className="crest">FU</span>
                <b>
                  Field
                  <br />
                  United
                </b>
              </div>
              <span className="versus">v</span>
              <div>
                <span className="crest away">ER</span>
                <b>
                  Eastside
                  <br />
                  Rovers
                </b>
              </div>
            </div>
            <div className="match-date">
              <b>SAT 17 OCT</b>
              <span>KICK-OFF 14:00</span>
            </div>
            <p>
              Bring a friend. Bring your voice.
              <br />
              Touchline tea is on.
            </p>
            <div className="pitch-lines" aria-hidden="true">
              <svg viewBox="0 0 400 110" fill="none" stroke="currentColor">
                <path d="M10 100V10H390V100 M200 10V100 M10 25H65V85H10 M390 25H335V85H390" />
                <circle cx="200" cy="55" r="35" />
              </svg>
            </div>
          </div>
        </section>
        <div className="club-band">
          <span>ONE CLUB.</span>
          <span>MANY STORIES.</span>
          <span>EVERYONE WELCOME.</span>
        </div>
        <section className="fixtures" id="fixtures">
          <div className="fixture-heading">
            <h2>From the touchline.</h2>
            <label className="sr-only" htmlFor="team">
              Filter by team
            </label>
            <select
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            >
              {["All teams", "First team", "Women", "Under 18"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="fixture-tabs" aria-label="Fixture view">
            {["Upcoming", "Results"].map((t) => (
              <button
                key={t}
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="fixture-list">
            {visible.length ? (
              visible.map((f) => (
                <article key={f.home + f.away}>
                  <div>
                    <span>{f.date}</span>
                    <small>{f.team}</small>
                  </div>
                  <h3>
                    {f.home}
                    <span>{f.away}</span>
                  </h3>
                  <strong>{f.time}</strong>
                  <p>{f.location}</p>
                </article>
              ))
            ) : (
              <p className="empty-state" role="status">
                No {tab.toLowerCase()} for {team.toLowerCase()} in this demo.
                Choose another team to explore the programme.
              </p>
            )}
          </div>
        </section>
        <section className="join" id="join">
          <div className="join-photo">
            <img
              src={football}
              alt="Football resting on a green grass pitch"
              loading="lazy"
            />
            <span>THE BEST PART IS BEING PART OF IT.</span>
          </div>
          <div className="join-form">
            <h2>
              Pull on a shirt.
              <br />
              Find your people.
            </h2>
            <p>
              New to the game or coming back to it? Our fictional open sessions
              are a place to start.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMessage(
                  `${name.trim()}, you are on the demo list for ${training}. No signup was sent; your details stay in this page.`,
                );
              }}
            >
              <label>
                Your first name
                <input
                  required
                  maxLength={50}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setMessage("");
                  }}
                  placeholder="First name"
                />
              </label>
              <label>
                Choose a session
                <select
                  value={training}
                  onChange={(e) => {
                    setTraining(e.target.value);
                    setMessage("");
                  }}
                >
                  <option>Tuesday · Open training</option>
                  <option>Thursday · Women's training</option>
                  <option>Saturday · Walking football</option>
                </select>
              </label>
              <button type="submit">
                Preview my place <ArrowRight size={18} />
              </button>
              <p className="status" role="status">
                {message ||
                  "No pressure. No payment. This form is a local demonstration."}
              </p>
            </form>
          </div>
        </section>
        <section className="club-values">
          <h2>
            A club is more
            <br />
            than a score.
          </h2>
          <p>
            Field United is an imagined community club. The players, volunteers,
            families, and familiar faces on the touchline make the game what it
            is. This template gives every part of that community a home.
          </p>
        </section>
      </main>
      <footer>
        <strong>FIELD UNITED / THE GAME IS OURS</strong>
        <p>
          Fictional football club by Koative. Fixtures, results, sessions and
          names are illustrative.
        </p>
      </footer>
    </>
  );
}
