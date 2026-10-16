import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  BookOpen,
  PenLine,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import observation from "./assets/observation.jpg";
const lenses = [
  {
    name: "Shape",
    text: "Follow the meeting of two planes. Where does one shape become another?",
    position: "50% 50%",
  },
  {
    name: "Light",
    text: "Compare the brightest surface with the deepest shadow. Notice how light describes depth.",
    position: "15% 25%",
  },
  {
    name: "Rhythm",
    text: "Trace the repeated windows. Look for the moment the pattern changes.",
    position: "80% 70%",
  },
];
const lessons = [
  {
    name: "Notice the ordinary",
    time: "6 min",
    title: "Great ideas start with paying attention.",
    body: "Before you make something new, look carefully at what already exists. The shape of a receipt. The rhythm of a street. The way a familiar tool sits in your hand. Observation is a skill you can practice.",
    task: "Choose one object near you. Describe three things you have never noticed about it.",
  },
  {
    name: "Find the useful question",
    time: "8 min",
    title: "A better question opens a different door.",
    body: "The first question is rarely the most useful one. Ask who the work is for, what they need to do, and what gets in their way. Replace a broad ambition with a specific question you can explore.",
    task: "Write one broad question. Then rewrite it for one person in one situation.",
  },
  {
    name: "Make a small experiment",
    time: "10 min",
    title: "Give your idea something to push against.",
    body: "An experiment turns a thought into something you can learn from. Keep the scope small. Make a paper sketch, a rough model, or a single screen. Choose one thing you want to understand before you begin.",
    task: "Sketch the smallest version of your idea. Write what you want to learn from it.",
  },
  {
    name: "Reflect and repeat",
    time: "5 min",
    title: "The next version starts with what you learned.",
    body: "Look at the experiment without defending it. What surprised you? What worked? What was confusing? Keep the useful parts and give the next version one clear intention.",
    task: "Write one thing to keep, one thing to change, and one thing to try next.",
  },
];
export default function App() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [saved, setSaved] = useState(false);
  const [lens, setLens] = useState(0);
  const l = lessons[index];
  return (
    <>
      <header>
        <a className="brand" href="#">
          <GraduationCap size={27} />
          campus
        </a>
        <span>Make room for what you could become.</span>
        <a href="../../">
          All templates <ArrowUpRightIcon />
        </a>
      </header>
      <div className="workspace">
        <aside>
          <a href="#lesson" className="back">
            <ArrowLeft size={16} /> Creative foundations
          </a>
          <h2>
            Learning
            <br />
            to see.
          </h2>
          <p>A short course in creative attention.</p>
          <div className="progress">
            <span>{done.length} of 4 lessons complete</span>
            <div>
              <i style={{ width: done.length * 25 + "%" }} />
            </div>
          </div>
          <nav aria-label="Course lessons">
            {lessons.map((l, i) => (
              <button
                key={l.name}
                aria-current={index === i ? "step" : undefined}
                onClick={() => {
                  setIndex(i);
                  setSaved(false);
                }}
              >
                <span>
                  {done.includes(i) ? (
                    <Check size={17} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <div>
                  {l.name}
                  <small>{l.time}</small>
                </div>
              </button>
            ))}
          </nav>
          <div className="course-foot">
            <BookOpen size={23} />
            <p>
              Your pace.
              <br />
              Your perspective.
            </p>
          </div>
        </aside>
        <main id="lesson">
          <div className="lesson-top">
            <span>CREATIVE FOUNDATIONS</span>
            <span>
              Lesson {index + 1} / 4 · {l.time}
            </span>
          </div>
          <section className="lesson" key={index}>
            <div className="observation-study">
              <div className="observation-image">
                <img
                  src={observation}
                  alt="Architectural study of intersecting building planes and repeated windows"
                  style={{
                    objectPosition: lenses[lens].position,
                    transform: `scale(${lens === 0 ? 1 : 1.35})`,
                  }}
                />
                <span>FIELD STUDY / ARCHITECTURE</span>
              </div>
              <div className="observation-guide">
                <h2>Look a little closer.</h2>
                <p>{lenses[lens].text}</p>
                <div aria-label="Observation lens">
                  {lenses.map((l, i) => (
                    <button
                      key={l.name}
                      aria-pressed={lens === i}
                      onClick={() => setLens(i)}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
                <small>
                  A worked example. Try this with the world around you.
                </small>
              </div>
            </div>
            <h1>{l.title}</h1>
            <p>{l.body}</p>
            <div className="exercise">
              <PenLine size={22} />
              <div>
                <h2>Try this.</h2>
                <p>{l.task}</p>
              </div>
            </div>
            <div className="complete-row">
              <button
                className="btn"
                disabled={done.includes(index)}
                onClick={() => setDone([...done, index])}
              >
                {done.includes(index)
                  ? "Lesson completed"
                  : "Mark lesson complete"}
                <CheckCircle2 size={19} />
              </button>
              {index < 3 && (
                <button
                  className="next"
                  onClick={() => {
                    setIndex(index + 1);
                    setSaved(false);
                  }}
                >
                  Next lesson <ArrowRight size={18} />
                </button>
              )}
            </div>
            {done.length === 4 && (
              <p role="status" className="finished">
                Course complete. Four small steps, a new way of seeing.
              </p>
            )}
          </section>
          <section className="notebook">
            <div>
              <h2>Your notebook</h2>
              <p>Ideas have to start somewhere.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSaved(true);
              }}
            >
              <label className="sr-only" htmlFor="note">
                Lesson notes
              </label>
              <textarea
                id="note"
                value={notes[index] || ""}
                onChange={(e) => {
                  setNotes({ ...notes, [index]: e.target.value });
                  setSaved(false);
                }}
                placeholder="What did you notice?"
                rows={4}
              />
              <div>
                <small>Notes stay in this session only.</small>
                <button type="submit">
                  Save note <Check size={16} />
                </button>
              </div>
              {saved && (
                <p role="status">Note saved for “{l.name}” in this session.</p>
              )}
            </form>
          </section>
        </main>
      </div>
      <footer>
        <span>Campus · Fictional learning experience</span>
        <a href="../../">Koative collection</a>
      </footer>
    </>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={15} style={{ transform: "rotate(-45deg)" }} />;
}
