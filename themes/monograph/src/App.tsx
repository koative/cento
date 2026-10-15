import { useState } from "react";
import { ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import architecture from "./assets/architecture.jpg";
import reading from "./assets/reading.jpg";
const stories = [
  {
    title: "The buildings that teach us to slow down",
    topic: "Architecture",
    author: "Elena Moss",
    time: "6 min read",
    intro:
      "What happens when a building makes room for the things that cannot be measured?",
    body: "A threshold is a small act of hospitality. It gives the body time to arrive before the mind catches up. In the spaces we return to, the important things are rarely the grand gestures: a bench near the entrance, a window low enough to sit beside, a corner that holds the afternoon light. These are invitations to pay attention.\n\nPerhaps a good building does not need to make a statement. Perhaps it only needs to leave enough room for a life to unfold inside it.",
    image: architecture,
  },
  {
    title: "In praise of the unfinished",
    topic: "Culture",
    author: "Theo Wells",
    time: "4 min read",
    intro:
      "The sketch, the fragment, the work in progress. A case for leaving a little room.",
    body: "An unfinished thing asks something of its audience. We become collaborators, following a line beyond the edge of the paper or imagining the last note of a melody. There is generosity in this space.\n\nThe notebook can sometimes tell us more than the exhibition. It holds the wrong turns, the reconsidered choices, and the sudden change of direction that made the final work possible.",
  },
  {
    title: "A room of borrowed lives",
    topic: "Books",
    author: "Mara Ellis",
    time: "5 min read",
    intro:
      "Inside the independent bookshops that become a neighborhood’s living room.",
    body: "The best bookshops are maps drawn by people. Every shelf is a suggestion; every unexpected pairing is the beginning of a conversation. You may arrive looking for a title and leave with a question instead.\n\nTo spend an hour among books is to practice a useful kind of wandering. The shop offers something a search field cannot: the possibility of finding what you did not know to ask for.",
    image: reading,
  },
  {
    title: "The ordinary, observed",
    topic: "Culture",
    author: "Luca Reed",
    time: "3 min read",
    intro:
      "A walk without a destination is sometimes the most useful journey of all.",
    body: "Take the longer way home. Notice the color of a door you have passed a hundred times. Wait at the crossing without reaching for your phone. The ordinary world is not short on material; we are sometimes short on attention.\n\nObservation is a practice, not a gift. It begins with the willingness to look again.",
  },
];
export default function App() {
  const [topic, setTopic] = useState("Everything");
  const [open, setOpen] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const filtered = stories.filter(
    (s) => topic === "Everything" || s.topic === topic,
  );
  return (
    <>
      <header>
        <div className="mast-top">
          <span>An independent journal of considered living</span>
          <span>Volume 08 · Autumn 2026</span>
        </div>
        <a className="masthead" href="#">
          Monograph<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <div>
            {["Everything", "Architecture", "Culture", "Books"].map((t) => (
              <button
                key={t}
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <a href="#letter">
            The Sunday letter <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="issue-intro">
          <p>
            Ideas worth spending
            <br />a little time with.
          </p>
          <h1>
            A slower look
            <br />
            at a <em>moving world.</em>
          </h1>
          <span>
            Read generously.
            <br />
            Think independently.
          </span>
        </section>
        <section className="issue" aria-label="Journal stories">
          <div className="issue-heading">
            <h2>{topic === "Everything" ? "In this issue" : topic}</h2>
            <span>{filtered.length} stories to sit with</span>
          </div>
          <div className="stories">
            {filtered.map((s, i) => (
              <article
                className={`story ${i === 0 ? "lead" : ""} ${!s.image ? "text-story" : ""}`}
                key={s.title}
              >
                {s.image && (
                  <img
                    src={s.image}
                    alt={
                      s.topic === "Books"
                        ? "Shelves of books in a warmly lit library"
                        : "Sculptural white architecture against a pale sky"
                    }
                    loading={i > 0 ? "lazy" : "eager"}
                  />
                )}
                <div className="story-content">
                  <div className="story-meta">
                    <span>{s.topic}</span>
                    <span>{s.time}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.intro}</p>
                  <div className="byline">
                    <span>By {s.author}</span>
                    <button
                      aria-label={`${open === s.title ? "Close" : "Read"} ${s.title}`}
                      aria-expanded={open === s.title}
                      onClick={() => setOpen(open === s.title ? null : s.title)}
                    >
                      {open === s.title ? (
                        <Minus size={19} />
                      ) : (
                        <ArrowUpRight size={19} />
                      )}
                    </button>
                  </div>
                  {open === s.title && (
                    <div className="reading" aria-label={s.title}>
                      {s.body.split("\n\n").map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      <button onClick={() => setOpen(null)}>
                        Close story <Minus size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="quote">
          <div className="quote-mark">“</div>
          <blockquote>
            The world is full of obvious things which nobody by any chance ever
            observes.
          </blockquote>
          <div>
            <span>Arthur Conan Doyle</span>
            <span>The Hound of the Baskervilles, 1902</span>
          </div>
        </section>
        <section className="letter" id="letter">
          <div>
            <h2>
              Good things
              <br />
              take <em>Sunday.</em>
            </h2>
            <p>
              A quiet collection of stories, discoveries, and things worth
              noticing. An imagined letter for a more considered inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            <label htmlFor="email">A place for the Sunday letter</label>
            <div className="email-row">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="Your email address"
                required
              />
              <button aria-label="Subscribe to the Sunday letter" type="submit">
                <ArrowRight size={25} />
              </button>
            </div>
            {subscribed ? (
              <p role="status">
                You're on the demo list, {email}. No email was sent or saved to
                a server.
              </p>
            ) : (
              <p>A local demo. No spam, no actual subscription.</p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <a href="#">Monograph</a>
        <p>
          A fictional independent journal.
          <br />
          Original demonstration stories by Koative.
        </p>
        <span>Made for curious minds.</span>
      </footer>
    </>
  );
}
