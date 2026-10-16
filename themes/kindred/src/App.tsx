import { useState } from "react";
import { PawPrint, ArrowUpRight, Heart, Check, ArrowRight } from "lucide-react";
import dog from "./assets/dog.jpg";
import cat from "./assets/cat.jpg";
import puppy from "./assets/puppy.jpg";
const pets = [
  {
    name: "Milo",
    kind: "Dogs",
    age: "3 years",
    note: "Professional sunshine finder.",
    img: dog,
    about:
      "Milo is a fictional, easygoing dog who enjoys long walks and quiet company. This profile is a demonstration.",
  },
  {
    name: "Clover",
    kind: "Cats",
    age: "2 years",
    note: "Small cat. Very big opinions.",
    img: cat,
    about:
      "Clover is a fictional, curious cat who likes window seats and gentle play. This profile is a demonstration.",
  },
  {
    name: "Peanut",
    kind: "Dogs",
    age: "8 months",
    note: "Still growing into those ears.",
    img: puppy,
    about:
      "Peanut is a fictional young dog with a playful personality. This profile is a demonstration.",
  },
];
export default function App() {
  const [filter, setFilter] = useState("Everyone");
  const [selected, setSelected] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <>
      <header>
        <a className="brand" href="#">
          <PawPrint size={26} />
          kindred
        </a>
        <nav>
          <a href="#friends">Meet the crew</a>
          <a href="#how">How it works</a>
        </nav>
        <span>Good hearts. New starts.</span>
      </header>
      <main>
        <section className="intro">
          <div>
            <h1>
              Your person
              <br />
              might have
              <br />
              <em>four paws.</em>
            </h1>
            <p>
              A new best friend. A familiar feeling.
              <br />
              Make room for a little more love.
            </p>
            <a className="btn" href="#friends">
              Meet your kind of kindred <ArrowRight size={19} />
            </a>
          </div>
          <div className="hero-pet">
            <img src={dog} alt="A friendly dog looking toward the camera" />
            <div className="pet-label">
              <PawPrint size={23} />
              <span>
                Hi, I'm Milo.
                <br />
                <strong>Looking for my people.</strong>
              </span>
            </div>
            <span className="hello">
              GOOD DOG
              <br />
              ENERGY.
            </span>
          </div>
        </section>
        <section className="friends" id="friends">
          <div className="friends-head">
            <h2>A few good souls.</h2>
            <div>
              {["Everyone", "Dogs", "Cats"].map((x) => (
                <button
                  aria-pressed={filter === x}
                  key={x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="pet-grid">
            {pets
              .filter((p) => filter === "Everyone" || p.kind === filter)
              .map((p) => (
                <article key={p.name}>
                  <div className="pet-photo">
                    <img
                      src={p.img}
                      alt={p.name + ", a fictional adoption profile"}
                    />
                    <span>{p.age}</span>
                  </div>
                  <div className="pet-title">
                    <h3>{p.name}</h3>
                    <Heart size={23} />
                  </div>
                  <p>{p.note}</p>
                  <button
                    onClick={() => {
                      setSelected(selected === p.name ? "" : p.name);
                      setDone(false);
                    }}
                    aria-expanded={selected === p.name}
                  >
                    Get to know {p.name} <ArrowUpRight size={18} />
                  </button>
                  {selected === p.name && (
                    <div className="pet-about">
                      <p>{p.about}</p>
                      <a href="#meet">
                        Plan a hello <ArrowRight size={16} />
                      </a>
                    </div>
                  )}
                </article>
              ))}
          </div>
        </section>
        <section className="how" id="how">
          <h2>
            Love takes
            <br />
            <em>
              a little getting
              <br />
              to know.
            </em>
          </h2>
          <ol>
            <li>
              <strong>Find a familiar feeling.</strong>
              <p>
                Explore the profiles. Take your time. Different friends need
                different homes.
              </p>
            </li>
            <li>
              <strong>Start with a hello.</strong>
              <p>
                Prepare a meeting request and think about the questions you want
                to ask.
              </p>
            </li>
            <li>
              <strong>Make space for a new chapter.</strong>
              <p>
                Real adoption involves a shelter conversation, care planning and
                an appropriate match.
              </p>
            </li>
          </ol>
        </section>
        <section className="meet" id="meet">
          <div>
            <PawPrint size={33} />
            <h2>
              One hello
              <br />
              could change a lot.
            </h2>
            <p>
              This is a fictional shelter. Try a local meeting request with demo
              details.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label>
              I'd like to meet
              <select
                required
                value={selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                  setDone(false);
                }}
              >
                <option value="">Choose a friend</option>
                {pets.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
            <label>
              Email
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDone(false);
                }}
              />
            </label>
            <button className="btn">
              Prepare a hello <ArrowRight size={18} />
            </button>
            {done && (
              <p role="status">
                <Check size={18} /> Your demo hello for {selected} is ready. No
                meeting was booked and no email was sent.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <span>Kindred · Fictional pet adoption template</span>
        <a href="../../">Koative collection</a>
      </footer>
    </>
  );
}
