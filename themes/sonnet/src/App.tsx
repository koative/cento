import { useState } from "react";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
const langs = [
  {
    name: "French",
    hello: "Bonjour.",
    pron: "bon-zhoor",
    phrase: "A hello can open a whole world.",
    color: "#b8452c",
  },
  {
    name: "Italian",
    hello: "Ciao.",
    pron: "chow",
    phrase: "Start with a word. Stay for the conversation.",
    color: "#427658",
  },
  {
    name: "Spanish",
    hello: "Hola.",
    pron: "oh-lah",
    phrase: "Find your voice in another language.",
    color: "#8c5b08",
  },
];
export default function App() {
  const [lang, setLang] = useState(0),
    [level, setLevel] = useState("A fresh start"),
    [day, setDay] = useState("Tuesday"),
    [saved, setSaved] = useState(false);
  const l = langs[lang];
  return (
    <>
      <header>
        <a className="brand" href="#">
          sonnet<span>Language, lived.</span>
        </a>
        <nav>
          <a href="#classroom">Find your class</a>
          <a href="#approach">Our approach</a>
        </nav>
      </header>
      <main>
        <section className="sonnet-opening">
          <div>
            <h1>
              A different language.
              <br />
              <em>A bigger world.</em>
            </h1>
            <p>
              For the café conversation. The new neighbor. The story you want to
              tell. Small-group language learning that starts with living.
            </p>
            <a href="#classroom">
              Let's find your words <ArrowUpRight size={21} />
            </a>
          </div>
          <div
            className="word-card"
            style={{ "--word": l.color } as React.CSSProperties}
          >
            <div className="card-top">
              <span>YOUR FIRST WORD</span>
              <span>{l.name}</span>
            </div>
            <strong>{l.hello}</strong>
            <i>/{l.pron}/</i>
            <p>{l.phrase}</p>
            <div className="language-tabs">
              {langs.map((x, i) => (
                <button
                  key={x.name}
                  aria-pressed={i === lang}
                  onClick={() => {
                    setLang(i);
                    setSaved(false);
                  }}
                >
                  {x.name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="classroom" className="classroom">
          <div className="classroom-heading">
            <h2>
              Make room
              <br />
              for conversation.
            </h2>
            <p>
              Your first class, your way. Try the course finder to build an
              example learning plan.
            </p>
          </div>
          <div className="planner">
            <div className="planner-row">
              <label htmlFor="language">I'd like to speak</label>
              <select
                id="language"
                value={lang}
                onChange={(e) => {
                  setLang(+e.target.value);
                  setSaved(false);
                }}
              >
                {langs.map((x, i) => (
                  <option key={x.name} value={i}>
                    {x.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="planner-row">
              <span>I'm starting from</span>
              <div className="tabs">
                {["A fresh start", "A little experience"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={level === x}
                    onClick={() => {
                      setLevel(x);
                      setSaved(false);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="planner-row">
              <span>My good evening is</span>
              <div className="day-options">
                {["Tuesday", "Thursday", "Saturday"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={day === x}
                    onClick={() => {
                      setDay(x);
                      setSaved(false);
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="class-result">
              <div>
                <h3>
                  {l.name} for{" "}
                  {level === "A fresh start"
                    ? "beginners"
                    : "returning learners"}
                </h3>
                <p>{day} · 18:30–20:00 · Six-week example course</p>
                <span>
                  Conversation practice, a small group, and space to make
                  mistakes.
                </span>
              </div>
              <button className="action" onClick={() => setSaved(true)}>
                {saved ? <Check size={22} /> : <ArrowRight size={22} />}
                <span>{saved ? "Plan saved" : "Save my plan"}</span>
              </button>
            </div>
            <p role="status" className="status">
              {saved
                ? `${l.name} on ${day} saved locally. This is a demo, not a class booking.`
                : ""}
            </p>
          </div>
        </section>
        <section className="approach" id="approach">
          <div className="big-quote">
            “The best words
            <br />
            are the ones
            <br />
            <em>you actually use.</em>”
          </div>
          <div>
            <h2>
              Less perfect.
              <br />
              More present.
            </h2>
            <p>
              Speak from the first session. Learn through ordinary situations.
              Let your questions shape the conversation.
            </p>
            <p>
              Our fictional curriculum makes room for the way adults learn: with
              context, repetition, and a reason to come back.
            </p>
            <a href="#classroom">
              Build your learning rhythm <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Koative collection</a>
        <p>
          Sonnet is a fictional language school. Course plans are local
          demonstrations.
        </p>
      </footer>
    </>
  );
}
