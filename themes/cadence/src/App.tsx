import { useState } from "react";
import { ArrowUpRight, Users, Search, Check, ArrowRight } from "lucide-react";
const people = [
  {
    name: "Morgan Lee",
    role: "Product designer",
    stage: "Portfolio review",
    color: "#e7c9b8",
    note: "Systems thinker with a thoughtful portfolio of tools for small teams.",
    time: "Tomorrow, 10:30",
  },
  {
    name: "Taylor Brooks",
    role: "Frontend engineer",
    stage: "Team conversation",
    color: "#b8c9dc",
    note: "Builds expressive interfaces with a strong accessibility practice.",
    time: "Thursday, 14:00",
  },
  {
    name: "Alex Rivera",
    role: "Product designer",
    stage: "Intro call",
    color: "#d3d9b4",
    note: "A visual storyteller moving from editorial into digital products.",
    time: "Friday, 11:00",
  },
  {
    name: "Jamie Park",
    role: "Frontend engineer",
    stage: "Portfolio review",
    color: "#d6c5db",
    note: "Enjoys performance work and turning complex systems into clear experiences.",
    time: "Friday, 15:30",
  },
];
export default function App() {
  const [person, setPerson] = useState(0);
  const [filter, setFilter] = useState("All roles");
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const p = people[person];
  return (
    <>
      <a className="skip" href="#main">
        Skip to candidates
      </a>
      <div className="app">
        <aside className="sidebar">
          <a className="brand" href="#">
            cadence<span>.</span>
          </a>
          <div className="team">
            <span className="team-symbol">N</span>
            <div>
              North Studio<small>Hiring workspace</small>
            </div>
          </div>
          <nav>
            <a className="active" href="#main">
              <Users />
              People <span>4</span>
            </a>
            <a href="#roles">
              Open roles <span>2</span>
            </a>
            <a href="#schedule">
              Conversations <span>3</span>
            </a>
          </nav>
          <div className="sidebar-note">
            A good team starts
            <br />
            with a conversation.<small>Fictional demo workspace</small>
          </div>
        </aside>
        <main id="main">
          <header>
            <span>North Studio / People</span>
            <span className="avatar">NS</span>
          </header>
          <div className="welcome">
            <h1>
              Good people.
              <br />A little closer.
            </h1>
            <p>A thoughtful place to find your next teammate.</p>
          </div>
          <section className="hiring">
            <div className="candidates">
              <div className="tools">
                <label>
                  <Search />
                  <input
                    aria-label="Search candidates"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find a person"
                    type="search"
                  />
                </label>
                <select
                  aria-label="Filter by role"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All roles</option>
                  <option>Product designer</option>
                  <option>Frontend engineer</option>
                </select>
              </div>
              <div className="list-heading">
                <span>People in progress</span>
                <span>{shortlist.length} shortlisted</span>
              </div>
              {people
                .filter(
                  (x) =>
                    (filter === "All roles" || x.role === filter) &&
                    x.name.toLowerCase().includes(query.toLowerCase()),
                )
                .map((x) => (
                  <button
                    key={x.name}
                    className={
                      "person " + (x.name === p.name ? "selected" : "")
                    }
                    onClick={() => setPerson(people.indexOf(x))}
                  >
                    <span className="initials" style={{ background: x.color }}>
                      {x.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span>
                      <strong>{x.name}</strong>
                      <small>{x.role}</small>
                    </span>
                    <span className="stage">
                      {shortlist.includes(x.name) ? "Shortlisted" : x.stage}
                    </span>
                  </button>
                ))}
              {!people.some(
                (x) =>
                  (filter === "All roles" || x.role === filter) &&
                  x.name.toLowerCase().includes(query.toLowerCase()),
              ) && (
                <p className="empty">
                  No people match. Try another name or role.
                </p>
              )}
            </div>
            <article className="profile">
              <div className="profile-top">
                <span
                  className="initials large"
                  style={{ background: p.color }}
                >
                  {p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  Candidate profile <ArrowUpRight />
                </span>
              </div>
              <h2>{p.name}</h2>
              <p className="role">{p.role}</p>
              <p>{p.note}</p>
              <div className="conversation" id="schedule">
                <small>Next conversation</small>
                <strong>{p.time}</strong>
                <span>30 minutes · Studio introduction</span>
              </div>
              <button
                className="primary"
                onClick={() =>
                  setShortlist(
                    shortlist.includes(p.name)
                      ? shortlist.filter((x) => x !== p.name)
                      : [...shortlist, p.name],
                  )
                }
              >
                {shortlist.includes(p.name)
                  ? "Remove from shortlist"
                  : "Add to shortlist"}
                <Check />
              </button>
              <p role="status" className="status">
                {shortlist.includes(p.name)
                  ? `${p.name} is on your local shortlist.`
                  : "Your shortlist stays in this demo."}
              </p>
            </article>
          </section>
          <section className="open-roles" id="roles">
            <div>
              <h2>Room for good work.</h2>
              <p>Two roles. One curious team.</p>
            </div>
            <article>
              <h3>Product designer</h3>
              <span>Design / Remote-friendly</span>
              <b>2 candidates in progress</b>
            </article>
            <article>
              <h3>Frontend engineer</h3>
              <span>Engineering / Remote-friendly</span>
              <b>2 candidates in progress</b>
            </article>
          </section>
        </main>
      </div>
      <footer>
        <span>Cadence — fictional hiring workspace</span>
        <span>No applications or personal information are sent.</span>
      </footer>
    </>
  );
}
