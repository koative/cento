import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Play,
  Pause,
  Plus,
  Minus,
  Check,
  Wind,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import studio from "./assets/studio.jpg";
const classes = [
  {
    name: "A softer start",
    type: "Gentle flow",
    time: "07:30",
    duration: "45 min",
    teacher: "with Maya",
    day: "Monday",
  },
  {
    name: "Room to breathe",
    type: "Breath & movement",
    time: "12:00",
    duration: "30 min",
    teacher: "with Noah",
    day: "Monday",
  },
  {
    name: "Come back to yourself",
    type: "Restorative yoga",
    time: "18:30",
    duration: "60 min",
    teacher: "with Ellis",
    day: "Monday",
  },
  {
    name: "Find your grounding",
    type: "Slow flow",
    time: "08:00",
    duration: "45 min",
    teacher: "with Ellis",
    day: "Tuesday",
  },
  {
    name: "The quiet hour",
    type: "Restorative yoga",
    time: "18:00",
    duration: "60 min",
    teacher: "with Maya",
    day: "Tuesday",
  },
  {
    name: "Space in the middle",
    type: "Breath & movement",
    time: "12:30",
    duration: "30 min",
    teacher: "with Noah",
    day: "Wednesday",
  },
  {
    name: "Move a little slower",
    type: "Gentle flow",
    time: "17:30",
    duration: "45 min",
    teacher: "with Maya",
    day: "Wednesday",
  },
];
export default function App() {
  const [breathing, setBreathing] = useState(false),
    [seconds, setSeconds] = useState(0),
    [day, setDay] = useState("Monday"),
    [selected, setSelected] = useState(""),
    [confirmed, setConfirmed] = useState(""),
    [faq, setFaq] = useState<number | null>(0),
    [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!breathing) return;
    const timer = setInterval(() => setSeconds((s) => (s + 1) % 10), 1000);
    return () => clearInterval(timer);
  }, [breathing]);
  const phase = seconds < 4 ? "Breathe in" : "Breathe out";
  return (
    <>
      <header className="header">
        <a href="#" className="wordmark">
          still<span>mindful movement</span>
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav className={menu ? "open" : ""} aria-label="Main navigation">
          <a href="#philosophy" onClick={() => setMenu(false)}>
            Our philosophy
          </a>
          <a href="#practice" onClick={() => setMenu(false)}>
            The practice
          </a>
          <a
            href="#classes"
            className="nav-book"
            onClick={() => setMenu(false)}
          >
            Find your class <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>
              Less noise.
              <br />
              More <em>you.</em>
            </h1>
            <p>
              A little movement. A deeper breath.
              <br />A space to find your own rhythm again.
            </p>
            <a href="#classes" className="pill-button">
              Make a little space <ArrowUpRight size={18} />
            </a>
            <div className="hero-bottom">
              <span>Yoga, breath & a gentler way of being.</span>
              <a href="#philosophy" aria-label="Explore our philosophy">
                <ArrowDown size={19} />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={studio}
              alt="A person practicing yoga above a mist-covered mountain valley"
              fetchPriority="high"
            />
            <div className="image-caption">
              <span>
                Be here.
                <br />
                Just as you are.
              </span>
              <svg viewBox="0 0 60 60" aria-hidden="true">
                <path d="M30 0v60M0 30h60M9 9l42 42M9 51L51 9M3 18l54 24M18 3l24 54M3 42l54-24M18 57L42 3" />
              </svg>
            </div>
          </div>
        </section>
        <section id="philosophy" className="philosophy">
          <div className="section-mark">
            <Sun size={28} strokeWidth={1} />
            <span>A kinder kind of practice</span>
          </div>
          <h2>
            You don't need to become
            <br />
            someone new.
            <br />
            <em>Just come back to yourself.</em>
          </h2>
          <div className="philosophy-bottom">
            <span>Movement without the measuring.</span>
            <p>
              No perfect poses. No keeping up. Just thoughtful movement, a
              welcoming space, and the freedom to meet yourself exactly where
              you are.
            </p>
          </div>
        </section>
        <section id="practice" className="breath-section">
          <div className="breath-copy">
            <h2>
              Take this moment.
              <br />
              <em>It's yours.</em>
            </h2>
            <p>
              Before you do the next thing, try doing a little less. Follow the
              circle for a slow, easy breath. Let it feel comfortable.
            </p>
            <button
              className="outline-button"
              onClick={() => {
                setBreathing(!breathing);
                if (!breathing) setSeconds(0);
              }}
            >
              {breathing ? <Pause size={15} /> : <Play size={15} />}{" "}
              {breathing ? "Pause breathing" : "Take a breath"}
            </button>
            <small>In for 4 · Out for 6 · At your own pace</small>
          </div>
          <div className={"breathing-visual " + (breathing ? "running" : "")}>
            <div className="breath-ring ring-outer" />
            <div className="breath-ring ring-middle" />
            <div className="breath-core">
              <Wind size={29} strokeWidth={1} />
              <span aria-live="polite">
                {breathing ? phase : "A moment of still"}
              </span>
              <small>
                {breathing
                  ? `${seconds < 4 ? 4 - seconds : 10 - seconds} seconds`
                  : "Press play. Come home."}
              </small>
            </div>
          </div>
        </section>
        <section id="classes" className="classes">
          <div className="classes-heading">
            <h2>
              A practice for
              <br />
              <em>your kind of day.</em>
            </h2>
            <p>
              Bring your whole self.
              <br />
              We'll meet you on the mat.
            </p>
          </div>
          <div className="schedule-tabs" role="group" aria-label="Class day">
            {["Monday", "Tuesday", "Wednesday"].map((d) => (
              <button
                key={d}
                aria-pressed={day === d}
                className={day === d ? "active" : ""}
                onClick={() => {
                  setDay(d);
                  setSelected("");
                }}
              >
                {d}
              </button>
            ))}
            <span>Illustrative weekly schedule</span>
          </div>
          <div className="class-list">
            {classes
              .filter((c) => c.day === day)
              .map((c, i) => (
                <div className="class-row" key={c.name}>
                  <div className="class-time">
                    <span>{c.time}</span>
                    <small>{c.duration}</small>
                  </div>
                  <div className="class-title">
                    <h3>{c.name}</h3>
                    <span>
                      {c.type} <i /> {c.teacher}
                    </span>
                  </div>
                  <span className="class-level">All levels welcome</span>
                  <button
                    aria-label={`Choose ${c.name}`}
                    onClick={() => {
                      setSelected(c.name);
                      setConfirmed("");
                    }}
                    className={selected === c.name ? "chosen" : ""}
                  >
                    {selected === c.name ? (
                      <Check size={18} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </button>
                </div>
              ))}
          </div>
          {selected && (
            <form
              className="signup"
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmed(selected);
                setSelected("");
              }}
            >
              <div>
                <h3>A little time for {selected.toLowerCase()}.</h3>
                <p>Try the booking flow. No reservation or email is sent.</p>
              </div>
              <label>
                Your email
                <input type="email" required placeholder="you@example.com" />
              </label>
              <button className="pill-button">
                Confirm demo place <ArrowRight size={16} />
              </button>
            </form>
          )}
          {confirmed && (
            <p role="status" className="confirmation">
              <Check size={18} /> You're on the demo list for “{confirmed}”.
              Nothing has been booked or sent.
            </p>
          )}
        </section>
        <section className="faq">
          <div>
            <Moon size={25} strokeWidth={1} />
            <h2>
              A few things
              <br />
              <em>you might wonder.</em>
            </h2>
          </div>
          <div>
            {[
              {
                q: "Do I need to have practiced before?",
                a: "Not at all. Every practice offers space to explore at your own pace. Start with a gentle flow or a restorative class, and let your teacher know it is your first visit.",
              },
              {
                q: "What should I bring?",
                a: "Wear something you can move and breathe in. Bring a water bottle and your curiosity. In this studio concept, mats and props are always part of the practice.",
              },
              {
                q: "What if I just need a quiet moment?",
                a: "That counts, too. Try the breathing practice above, pause whenever you need, and make the moment your own. There is no finish line here.",
              },
            ].map((item, i) => (
              <div className="faq-item" key={item.q}>
                <button
                  aria-expanded={faq === i}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  {item.q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {faq === i && <p>{item.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a className="wordmark" href="#">
            still
          </a>
          <p>
            A little more space.
            <br />A little more you.
          </p>
          <a href="#classes">
            Meet us on the mat <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>A fictional wellness studio. No real classes or bookings.</span>
          <a href="../../">
            A Koative template <ArrowUpRight size={13} />
          </a>
          <span>Move gently. Stay curious.</span>
        </div>
      </footer>
    </>
  );
}
