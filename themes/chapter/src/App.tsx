import { useState } from "react";
import { ArrowUpRight, Headphones, Plus, Check, BookOpen } from "lucide-react";
import landscape from "./assets/landscape.jpg";
const episodes = [
  {
    title: "The art of paying attention",
    guest: "With Lena Moss",
    length: "42 min",
    topic: "On noticing",
    desc: "A field recording, a long walk, and a conversation about what happens when we stop trying to get somewhere.",
    notes:
      "Lena talks about keeping a notebook without a plan, returning to the same place in different weather, and learning to describe a landscape without owning it. This fictional episode is an invitation to look at the ordinary for a little longer.",
  },
  {
    title: "A room of our making",
    guest: "With Theo Park",
    length: "36 min",
    topic: "On belonging",
    desc: "The things we keep, the spaces we share, and the quiet work of making a home.",
    notes:
      "Theo considers the difference between a room that photographs well and a room that holds a life. We follow the story of a chipped cup, a borrowed table, and a window that catches the last light of the day.",
  },
  {
    title: "Learning to begin again",
    guest: "With Iris Bell",
    length: "51 min",
    topic: "On change",
    desc: "Why starting over might be a practice, not a failure. A conversation without a five-year plan.",
    notes:
      "Iris shares a fictional story of leaving a familiar path and becoming a beginner. We discuss the discomfort of being bad at something, the help of a patient friend, and the small rituals that make change feel possible.",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [notes, setNotes] = useState(false);
  const [queue, setQueue] = useState<number[]>([]);
  const e = episodes[active];
  return (
    <>
      <header>
        <a href="#" className="masthead">
          chapter.
        </a>
        <span>CONVERSATIONS FOR A CONSIDERED LIFE</span>
        <a href="#episodes">
          The episodes <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="feature">
          <div className="issue">
            <span>VOLUME IV</span>
            <Headphones size={24} />
            <span>AUTUMN 2026</span>
          </div>
          <div className="cover">
            <img
              src={landscape}
              alt="Morning fog drifting across a green rolling landscape"
            />
            <span className="cover-caption">An invitation to slow down.</span>
          </div>
          <div className="feature-copy">
            <p className="topic">
              {e.topic} / {e.length}
            </p>
            <h1>{e.title}</h1>
            <p className="byline">{e.guest}</p>
            <p>{e.desc}</p>
            <div className="episode-actions">
              <button onClick={() => setNotes(!notes)} aria-expanded={notes}>
                <BookOpen size={17} />
                {notes ? "Close episode notes" : "Read episode notes"}
              </button>
              <button
                aria-label={
                  queue.includes(active)
                    ? "Remove from listening list"
                    : "Save to listening list"
                }
                onClick={() =>
                  setQueue(
                    queue.includes(active)
                      ? queue.filter((i) => i !== active)
                      : [...queue, active],
                  )
                }
              >
                {queue.includes(active) ? (
                  <Check size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </button>
            </div>
            <div className="waveform" aria-hidden="true">
              {Array.from({ length: 42 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: `${9 + Math.abs(Math.sin(i * 0.71)) * 28}px`,
                    animationDelay: `${i * 0.03}s`,
                  }}
                />
              ))}
            </div>
            <p className="demo-note">
              A fictional audio journal. Explore the notes; no audio recording
              is included.
            </p>
          </div>
        </section>
        {notes && (
          <section className="notes">
            <span>EPISODE NOTES</span>
            <h2>{e.title}</h2>
            <p>{e.notes}</p>
            <p>
              Try this: spend ten minutes somewhere familiar, without your
              phone. Write down three things you had not noticed before.
            </p>
          </section>
        )}
        <section id="episodes" className="episodes">
          <div className="episode-heading">
            <h2>
              A little more
              <br />
              to sit with.
            </h2>
            <p>
              Unhurried conversations.
              <br />A different way into the everyday.
            </p>
          </div>
          {episodes.map((x, i) => (
            <article key={x.title}>
              <span className="episode-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <button
                className="episode-select"
                aria-pressed={active === i}
                onClick={() => {
                  setActive(i);
                  setNotes(false);
                }}
              >
                <span>{x.topic}</span>
                <h3>{x.title}</h3>
                <p>{x.guest}</p>
              </button>
              <span className="duration">{x.length}</span>
              <button
                className="save"
                onClick={() =>
                  setQueue(
                    queue.includes(i)
                      ? queue.filter((n) => n !== i)
                      : [...queue, i],
                  )
                }
                aria-label={`${queue.includes(i) ? "Remove" : "Save"} ${x.title}`}
              >
                {queue.includes(i) ? <Check size={20} /> : <Plus size={20} />}
              </button>
            </article>
          ))}
        </section>
        <section className="listening-list">
          <div>
            <h2>Your listening list</h2>
            <p>Good conversations keep. Save an episode for another moment.</p>
          </div>
          <div>
            <p className="status" role="status">
              {queue.length
                ? `${queue.length} ${queue.length === 1 ? "episode" : "episodes"} saved for later.`
                : "Your list is quiet for now."}
            </p>
            {queue.map((i) => (
              <div className="queued" key={i}>
                <span>{episodes[i].title}</span>
                <button onClick={() => setQueue(queue.filter((n) => n !== i))}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <strong>chapter. / THERE IS ALWAYS MORE TO THE STORY.</strong>
        <p>
          Fictional publication by Koative. Reading and saved-list interactions
          stay local.
        </p>
      </footer>
    </>
  );
}
