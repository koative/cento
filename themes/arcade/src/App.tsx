import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  RotateCcw,
  Gamepad2,
  Star,
  Heart,
  Moon,
  Cloud,
  Diamond,
  Triangle,
  Sparkles,
} from "lucide-react";
const symbols = [
  { name: "Star", Icon: Star },
  { name: "Heart", Icon: Heart },
  { name: "Moon", Icon: Moon },
  { name: "Cloud", Icon: Cloud },
  { name: "Diamond", Icon: Diamond },
  { name: "Triangle", Icon: Triangle },
];
function deal() {
  const cards = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
export default function App() {
  const [cards, setCards] = useState(deal),
    [open, setOpen] = useState<number[]>([]),
    [matched, setMatched] = useState<number[]>([]),
    [moves, setMoves] = useState(0),
    [concept, setConcept] = useState<string | null>(null),
    [joined, setJoined] = useState(false);
  const complete = matched.length === 12;
  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open;
    const timer = setTimeout(
      () => {
        if (cards[a] === cards[b]) setMatched((m) => [...m, a, b]);
        setOpen([]);
      },
      cards[a] === cards[b] ? 350 : 900,
    );
    return () => clearTimeout(timer);
  }, [open, cards]);
  function flip(i: number) {
    if (open.length === 2 || open.includes(i) || matched.includes(i)) return;
    if (open.length === 1) setMoves((m) => m + 1);
    setOpen((o) => [...o, i]);
  }
  function reset() {
    setCards(deal());
    setOpen([]);
    setMatched([]);
    setMoves(0);
  }
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Gamepad2 size={30} />
          odd<span>box</span>
          <small>GAMES</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#games">Our games</a>
          <a href="#studio">The humans</a>
          <a className="play-link" href="#play">
            Go play <ArrowUpRight size={18} />
          </a>
        </nav>
      </header>
      <main>
        <section className="welcome">
          <h1>
            Serious about
            <br />
            <span>not being serious.</span>
          </h1>
          <div>
            <p>
              Little games. Big feelings.
              <br />
              We make curious worlds for
              <br />
              your perfectly ordinary Tuesday.
            </p>
            <a href="#play">
              Try something fun <ArrowDownIcon />
            </a>
          </div>
          <div className="sticker" aria-hidden="true">
            <Sparkles size={22} />
            <span>
              MADE TO
              <br />
              MAKE YOU
              <br />
              SMILE
            </span>
          </div>
        </section>
        <section id="play" className="playground">
          <div className="game-intro">
            <span className="live-label">
              <i />
              PLAY IN YOUR BROWSER
            </span>
            <h2>
              PAIR
              <br />
              UP<span>!</span>
            </h2>
            <p>
              A tiny game for a happy brain.
              <br />
              Find the six matching pairs.
              <br />
              How few moves can you make?
            </p>
            <div className="game-stats">
              <div>
                <strong>{String(moves).padStart(2, "0")}</strong>
                <span>MOVES</span>
              </div>
              <div>
                <strong>
                  {matched.length / 2}
                  <small>/6</small>
                </strong>
                <span>PAIRS FOUND</span>
              </div>
            </div>
            <button className="reset" onClick={reset}>
              <RotateCcw size={16} /> Start over
            </button>
            <p className="keys">
              Keyboard friendly. Tab to a card,
              <br />
              then press Enter or Space to flip it.
            </p>
          </div>
          <div className="game-cabinet">
            <div className="cabinet-top">
              <span>ODDBOX MINI № 001</span>
              <span>ONE PLAYER / ALL AGES</span>
            </div>
            <div className="card-grid" aria-label="Memory game board">
              {cards.map((symbol, i) => {
                const revealed = open.includes(i) || matched.includes(i);
                const Icon = symbols[symbol].Icon;
                return (
                  <button
                    key={i}
                    className={`game-card ${revealed ? "revealed" : ""} ${matched.includes(i) ? "matched" : ""}`}
                    data-symbol={symbol}
                    aria-label={`Card ${i + 1}, ${matched.includes(i) ? "matched " + symbols[symbol].name : revealed ? symbols[symbol].name : "face down"}`}
                    aria-pressed={revealed}
                    aria-disabled={matched.includes(i) || open.length === 2}
                    onClick={() => flip(i)}
                  >
                    <span className="card-back" aria-hidden="true">
                      <Gamepad2 size={35} />
                    </span>
                    <span
                      className={`card-front symbol-${symbol}`}
                      aria-hidden="true"
                    >
                      <Icon size={43} strokeWidth={2.5} />
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="cabinet-bottom" role="status">
              {complete
                ? `Lovely work! All six pairs in ${moves} moves.`
                : open.length === 2
                  ? cards[open[0]] === cards[open[1]]
                    ? "A perfect little pair!"
                    : "Not quite. Remember those shapes."
                  : "Take your time. Good things come in pairs."}
              <Star size={16} />
            </div>
          </div>
        </section>
        <section id="games" className="games">
          <div className="section-heading">
            <h2>
              Small worlds.
              <br />
              Big main-character energy.
            </h2>
            <span>
              A few things from
              <br />
              our very full heads.
            </span>
          </div>
          <div className="game-catalog">
            <article className="catalog-item">
              <div className="catalog-art pair-art" aria-hidden="true">
                <div>
                  <Heart />
                  <Star />
                </div>
                <span>PAIR UP!</span>
              </div>
              <div className="catalog-info">
                <h3>Pair Up!</h3>
                <span>Memory / Available here</span>
              </div>
              <p>
                A little matching. A little remembering.
                <br />A surprisingly good way to spend a minute.
              </p>
              <a href="#play">
                Play right here <ArrowUpRight size={17} />
              </a>
            </article>
            <article className="catalog-item">
              <div className="catalog-art orbital-art" aria-hidden="true">
                <div className="planet">
                  <i />
                </div>
                <span>
                  ORBITAL
                  <br />
                  DELIVERY
                </span>
              </div>
              <div className="catalog-info">
                <h3>Orbital Delivery</h3>
                <span>Puzzle / Concept</span>
              </div>
              <p>
                The universe's smallest courier has
                <br />
                the universe's most unreasonable route.
              </p>
              <button
                aria-expanded={concept === "orbital"}
                onClick={() =>
                  setConcept(concept === "orbital" ? null : "orbital")
                }
              >
                Read the concept <ArrowUpRight size={17} />
              </button>
              {concept === "orbital" && (
                <p className="concept">
                  Plan a route between tiny planets using gravity and a very
                  limited fuel tank. This is a fictional game concept, not a
                  downloadable release.
                </p>
              )}
            </article>
            <article className="catalog-item">
              <div className="catalog-art blob-art" aria-hidden="true">
                <div className="blob">
                  <i />
                  <i />
                </div>
                <span>BLOB HOP</span>
              </div>
              <div className="catalog-info">
                <h3>Blob Hop</h3>
                <span>Adventure / Concept</span>
              </div>
              <p>
                No arms. No plan. Absolutely
                <br />
                unreasonable amounts of optimism.
              </p>
              <button
                aria-expanded={concept === "blob"}
                onClick={() => setConcept(concept === "blob" ? null : "blob")}
              >
                Read the concept <ArrowUpRight size={17} />
              </button>
              {concept === "blob" && (
                <p className="concept">
                  Bounce through a changing world where your squishy shape is
                  your superpower. This is a fictional game concept, not a
                  downloadable release.
                </p>
              )}
            </article>
          </div>
        </section>
        <section id="studio" className="studio">
          <div className="studio-title">
            <h2>
              Small team.
              <br />
              Weird ideas.
              <br />
              <span>Very good snacks.</span>
            </h2>
            <Gamepad2 size={80} strokeWidth={1.4} />
          </div>
          <div className="studio-copy">
            <p>
              We believe play is for everyone. Not just the people with fancy
              controllers and lightning reflexes.
            </p>
            <p>
              Oddbox is a fictional independent studio with a soft spot for
              simple mechanics, unexpected characters, and games that make you
              say “one more go.”
            </p>
            <p>
              Our mini game above is real, though.
              <br />
              Go on. Beat your score.
            </p>
            <a href="#play">
              One more go <ArrowRight size={18} />
            </a>
          </div>
        </section>
        <section className="newsletter">
          <div>
            <h2>
              A little odd
              <br />
              in your inbox.
            </h2>
            <p>Imaginary updates from your favorite imaginary studio.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setJoined(true);
            }}
            onChange={() => setJoined(false)}
          >
            <label htmlFor="email">Your email</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="player@your.world"
                required
                autoComplete="email"
              />
              <button type="submit" aria-label="Join the demo list">
                <ArrowRight size={23} />
              </button>
            </div>
            <p role="status">
              {joined
                ? "You made the demo list! No email was stored or sent."
                : "Demo signup only. No emails are collected."}
            </p>
          </form>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <Gamepad2 size={26} />
          odd<span>box</span>
        </a>
        <span>PLAY IS A PERFECTLY GOOD USE OF TIME.</span>
        <p>
          Fictional studio. Real little game.
          <br />A Koative template.
        </p>
      </footer>
    </>
  );
}
function ArrowDownIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </svg>
  );
}
