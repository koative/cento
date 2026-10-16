import { useState } from "react";
import { ArrowUpRight, Bookmark, ArrowRight } from "lucide-react";
import landscape from "./assets/landscape.jpg";
const stories = [
  {
    title: "The quiet mathematics of a forest",
    topic: "Earth",
    time: "8 min read",
    dek: "Beneath the canopy, a network of relationships is changing how we think about an ecosystem.",
    body: "A forest is more than a collection of trees. It is a landscape of exchanges: light and water, nutrients and shelter, competition and cooperation. Looking at those relationships as a network reveals questions that a single tree could never answer. This fictional editorial explores how a change of scale can change the questions we ask.",
  },
  {
    title: "What do we mean by empty space?",
    topic: "Space",
    time: "11 min read",
    dek: "The most interesting thing about a vacuum might be how little it resembles nothing.",
    body: "When we describe a place as empty, we usually mean that the things we expected are absent. Physics asks a more exacting question: what remains when familiar matter is removed? This fictional introduction invites readers to think carefully about the language we use for the universe.",
  },
  {
    title: "A memory is a moving thing",
    topic: "Mind",
    time: "6 min read",
    dek: "Remembering is not simply replaying. It is one of the most creative things a mind does.",
    body: "A remembered room can feel completely vivid even when its details have changed. Memory connects an earlier experience to the person doing the remembering now. This fictional essay considers the questions at that meeting point, and the value of being curious about our own certainty.",
  },
  {
    title: "The materials we have yet to imagine",
    topic: "Matter",
    time: "9 min read",
    dek: "A conversation about designing with properties, rather than starting with familiar things.",
    body: "The history of making is also a history of materials. Each new way of arranging matter expands the designer’s vocabulary. This fictional feature asks what it might mean to begin with a desired behaviour, then work backwards towards a material that could provide it.",
  },
];
export default function App() {
  const [topic, setTopic] = useState("All"),
    [active, setActive] = useState<number | null>(null),
    [saved, setSaved] = useState<number[]>([]);
  const toggle = (i: number) =>
    setSaved(saved.includes(i) ? saved.filter((n) => n !== i) : [...saved, i]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <div className="publication-meta">
          <span>AN INDEPENDENT JOURNAL OF CURIOSITY</span>
          <span>VOLUME 07 · AUTUMN 2026</span>
          <a href="#reading">Reading list ({saved.length})</a>
        </div>
        <a className="wordmark" href="#">
          horizon<span>Beyond what we know.</span>
        </a>
        <nav aria-label="Journal subjects">
          {["All", "Earth", "Space", "Mind", "Matter"].map((t) => (
            <button
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              key={t}
            >
              {t === "All" ? "The latest" : t}
            </button>
          ))}
        </nav>
      </header>
      <main id="main">
        <section className="lead">
          <div className="lead-story">
            <h1>
              There is always
              <br />
              <em>another question.</em>
            </h1>
            <p>
              Good science begins with curiosity.
              <br />
              So does a good read.
            </p>
            <div className="orbit-model" aria-label="An abstract orbital model">
              <div className="orbit o1" />
              <div className="orbit o2" />
              <div className="orbit o3" />
              <div className="planet" />
              <span>EXPLORING THE SPACE BETWEEN IDEAS</span>
            </div>
          </div>
          <article className="featured">
            <img
              src={landscape}
              alt="Sunlight filtering through a lush forest canopy"
            />
            <div className="story-meta">
              <span>EARTH</span>
              <span>8 MIN READ</span>
            </div>
            <h2>
              The quiet mathematics
              <br />
              of a forest
            </h2>
            <p>{stories[0].dek}</p>
            <button onClick={() => setActive(active === 0 ? null : 0)}>
              Read the story <ArrowUpRight size={18} />
            </button>
          </article>
          <aside>
            <h2>
              Small questions.
              <br />
              Expansive answers.
            </h2>
            <p>
              Our imagined journal connects ideas across science, culture and
              the everyday. Written for people who would rather understand than
              simply know.
            </p>
            <div className="editor-note">
              <span>A NOTE FROM THE EDITOR</span>
              <h3>
                Stay with
                <br />
                the question.
              </h3>
              <p>
                Not every story needs a neat ending. Sometimes the best thing we
                can offer is a better place to begin.
              </p>
              <span>— The Horizon desk</span>
            </div>
          </aside>
        </section>
        <section className="journal">
          <div className="journal-heading">
            <h2>
              {topic === "All"
                ? "The latest thinking"
                : `Exploring ${topic.toLowerCase()}`}
            </h2>
            <span>
              {
                stories.filter((s) => topic === "All" || s.topic === topic)
                  .length
              }{" "}
              stories to get lost in
            </span>
          </div>
          <div className="story-list">
            {stories.map(
              (s, i) =>
                (topic === "All" || s.topic === topic) && (
                  <article key={s.title}>
                    <span className="topic">{s.topic}</span>
                    <div>
                      <h3>
                        <button
                          onClick={() => setActive(active === i ? null : i)}
                        >
                          {s.title}
                        </button>
                      </h3>
                      <p>{s.dek}</p>
                      <span>{s.time}</span>
                    </div>
                    <button
                      className="bookmark"
                      aria-label={`${saved.includes(i) ? "Remove" : "Save"} ${s.title}`}
                      aria-pressed={saved.includes(i)}
                      onClick={() => toggle(i)}
                    >
                      <Bookmark
                        size={21}
                        fill={saved.includes(i) ? "currentColor" : "none"}
                      />
                    </button>
                  </article>
                ),
            )}
          </div>
          {active !== null && (
            <article className="reader" aria-live="polite">
              <div>
                <span>{stories[active].topic} / A fictional editorial</span>
                <button onClick={() => setActive(null)}>Close article</button>
              </div>
              <h2>{stories[active].title}</h2>
              <p>{stories[active].body}</p>
              <button className="reader-save" onClick={() => toggle(active)}>
                {saved.includes(active)
                  ? "Remove from reading list"
                  : "Save for later"}
                <Bookmark size={17} />
              </button>
            </article>
          )}
        </section>
        <section className="reading" id="reading">
          <h2>
            A little room
            <br />
            for <em>later.</em>
          </h2>
          <div>
            <h3>Your reading list</h3>
            {saved.length === 0 ? (
              <p>
                Save a story with the bookmark icon. Your collection will be
                here for this visit.
              </p>
            ) : (
              saved.map((i) => (
                <div className="saved-story" key={i}>
                  <button
                    onClick={() => {
                      setActive(i);
                      document
                        .querySelector(".journal")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {stories[i].title}
                    <ArrowRight size={17} />
                  </button>
                  <button
                    aria-label={`Remove saved ${stories[i].title}`}
                    onClick={() => toggle(i)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
            <span>Stored in this page only. Resets when you leave.</span>
          </div>
        </section>
      </main>
      <footer>
        <a href="#" className="footer-mark">
          horizon
        </a>
        <p>
          Fictional science publication · Illustrative articles, not research
          reporting · Koative
        </p>
        <a href="#main">Keep asking ↗</a>
      </footer>
    </>
  );
}
