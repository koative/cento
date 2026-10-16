import { useState, useRef } from "react";
import { ArrowUpRight, Play, Check, Volume2 } from "lucide-react";
const notes = [
  { name: "C", hz: 261.63 },
  { name: "D", hz: 293.66 },
  { name: "E", hz: 329.63 },
  { name: "F", hz: 349.23 },
  { name: "G", hz: 392 },
  { name: "A", hz: 440 },
  { name: "B", hz: 493.88 },
  { name: "C5", hz: 523.25 },
];
export default function App() {
  const [active, setActive] = useState(""),
    [instrument, setInstrument] = useState("Piano"),
    [level, setLevel] = useState("First notes"),
    [saved, setSaved] = useState(false),
    [played, setPlayed] = useState<string[]>([]);
  const audio = useRef<AudioContext | null>(null);
  function play(i: number) {
    setActive(notes[i].name);
    setPlayed((p) => [...p.slice(-7), notes[i].name]);
    try {
      audio.current ??= new AudioContext();
      const ctx = audio.current;
      void ctx.resume();
      const osc = ctx.createOscillator(),
        gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = notes[i].hz;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch {}
    setTimeout(() => setActive(""), 350);
  }
  return (
    <>
      <header>
        <a className="brand" href="#">
          score<span>Music starts here.</span>
        </a>
        <nav>
          <a href="#play">The practice room</a>
          <a href="#lessons">Find a lesson</a>
        </nav>
      </header>
      <main>
        <section className="score-intro">
          <h1>
            You're closer
            <br />
            than you think.
          </h1>
          <div>
            <p>
              To your first chord.
              <br />
              To that song you love.
              <br />
              To making a little more music.
            </p>
            <a href="#lessons">
              Find your starting point <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="practice" id="play">
          <div className="practice-top">
            <div>
              <h2>
                Go on.
                <br />
                Play something.
              </h2>
              <p>A small keyboard. A good beginning.</p>
            </div>
            <span>
              <Volume2 size={16} /> Sound plays when you press a key
            </span>
          </div>
          <div className="keyboard" aria-label="Interactive one-octave piano">
            {notes.map((n, i) => (
              <button
                className={active === n.name ? "key active" : "key"}
                key={n.name}
                aria-label={"Play " + n.name}
                onClick={() => play(i)}
              >
                <span>{n.name === "C5" ? "C" : n.name}</span>
                {[0, 1, 3, 4, 5].includes(i) && <i aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className="phrase">
            <span>Your phrase</span>
            <output aria-live="polite">
              {played.length
                ? played.join("  ·  ")
                : "Every melody starts with one note."}
            </output>
            <button onClick={() => setPlayed([])} disabled={!played.length}>
              Clear
            </button>
          </div>
        </section>
        <section className="lessons" id="lessons">
          <div>
            <h2>
              A teacher.
              <br />A little practice.
              <br />
              Your own rhythm.
            </h2>
            <p>
              Learning music isn't a race. It's a regular moment to listen, try,
              and surprise yourself.
            </p>
          </div>
          <div className="lesson-finder">
            <h3>Find your first session</h3>
            <label>
              I'd like to learn
              <select
                value={instrument}
                onChange={(e) => {
                  setInstrument(e.target.value);
                  setSaved(false);
                }}
              >
                {["Piano", "Guitar", "Voice", "Drums"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <fieldset>
              <legend>My starting point</legend>
              <div className="tabs">
                {["First notes", "Finding my rhythm", "Ready for more"].map(
                  (x) => (
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
                  ),
                )}
              </div>
            </fieldset>
            <div className="lesson-summary">
              <strong>
                {instrument} · {level}
              </strong>
              <span>45-minute example session / £35</span>
              <p>
                {level === "First notes"
                  ? "A welcoming introduction, built around listening and trying."
                  : level === "Finding my rhythm"
                    ? "Bring a piece you love. We will imagine a route through it."
                    : "Explore technique, expression, and a more personal repertoire."}
              </p>
            </div>
            <button className="action" onClick={() => setSaved(true)}>
              {saved ? <Check size={17} /> : <Play size={17} />}{" "}
              {saved ? "Session plan saved" : "Save session plan"}
            </button>
            <p role="status" className="status">
              {saved
                ? `${instrument} plan saved locally. No real lesson was booked.`
                : ""}
            </p>
          </div>
        </section>
        <section className="practice-notes">
          <span>Listen closely.</span>
          <span>Try again.</span>
          <span>Make it yours.</span>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Score is a fictional music school. Keyboard sound is generated
          locally; lessons are demonstrations.
        </p>
      </footer>
    </>
  );
}
