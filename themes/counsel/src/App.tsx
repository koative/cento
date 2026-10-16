import { useState } from "react";
import { ArrowUpRight, ArrowRight, Scale, Check } from "lucide-react";
import building from "./assets/building.jpg";
const practices = [
  {
    name: "Business & contracts",
    text: "For the decisions that shape the work you do.",
    items: ["Commercial agreements", "Business formation", "Contract review"],
  },
  {
    name: "Property & place",
    text: "Clear thinking for the places that matter.",
    items: ["Property transactions", "Leasing questions", "Ownership planning"],
  },
  {
    name: "People & transitions",
    text: "Considered support for a changing chapter.",
    items: ["Personal planning", "Family transitions", "Estate administration"],
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [summary, setSummary] = useState(false);
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Scale size={26} /> COUNSEL<span>Independent legal practice</span>
        </a>
        <nav>
          <a href="#practice">Our work</a>
          <a href="#enquiry">
            Make an enquiry <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="opening">
          <h1>
            Clarity, when
            <br />
            it matters <em>most.</em>
          </h1>
          <div className="opening-bottom">
            <p>
              A thoughtful approach to complex questions.
              <br />
              We start by understanding what matters to you.
            </p>
            <a
              href="#practice"
              className="round-link"
              aria-label="Explore our practice"
            >
              <ArrowRight size={28} />
            </a>
          </div>
        </section>
        <section id="practice" className="practice">
          <aside>
            <h2>Our practice</h2>
            <p>
              Good questions are
              <br />a good place to start.
            </p>
            {practices.map((p, i) => (
              <button
                key={p.name}
                aria-pressed={active === i}
                onClick={() => {
                  setActive(i);
                  setSummary(false);
                }}
              >
                {p.name}
                <ArrowUpRight size={18} />
              </button>
            ))}
          </aside>
          <article key={active} className="practice-detail">
            <img
              src={building}
              alt="Shelves of books in a warmly lit library"
            />
            <div>
              <h3>{practices[active].name}</h3>
              <p>{practices[active].text}</p>
              <ul>
                {practices[active].items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <a href="#enquiry">
                Start a conversation <ArrowRight size={18} />
              </a>
            </div>
          </article>
        </section>
        <section className="principle">
          <h2>
            Understand the whole picture.
            <br />
            <em>Then find the way forward.</em>
          </h2>
          <p>
            This fictional practice introduces a considered service experience.
            The content is illustrative and is not legal advice.
          </p>
        </section>
        <section className="enquiry" id="enquiry">
          <div>
            <h2>
              Your next
              <br />
              chapter starts here.
            </h2>
            <p>
              Prepare an enquiry brief. Nothing is sent; no professional
              relationship is created.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSummary(true);
            }}
          >
            <label>
              Your name
              <input
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSummary(false);
                }}
                placeholder="Alex Morgan"
              />
            </label>
            <label>
              Area of interest
              <select
                value={active}
                onChange={(e) => {
                  setActive(Number(e.target.value));
                  setSummary(false);
                }}
              >
                {practices.map((p, i) => (
                  <option value={i} key={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn">
              Prepare enquiry <ArrowUpRight size={18} />
            </button>
            {summary && (
              <p role="status">
                <Check size={18} /> Brief prepared for {name}:{" "}
                {practices[active].name}. Demo only — no enquiry sent.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <span>Counsel · Fictional legal practice. No legal advice.</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
