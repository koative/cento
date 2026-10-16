import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  Disc3,
} from "lucide-react";
const records = [
  {
    title: "After the rain",
    artist: "The Quiet Hours",
    genre: "Modal jazz / 1964",
    color: "#b64d2d",
    length: 242,
  },
  {
    title: "Soft corners",
    artist: "Yuna Quartet",
    genre: "Piano / 1978",
    color: "#758676",
    length: 218,
  },
  {
    title: "Between stations",
    artist: "Milo Reed",
    genre: "Ambient / 1982",
    color: "#b1a16a",
    length: 276,
  },
];
function clock(n: number) {
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
}
export default function App() {
  const [record, setRecord] = useState(0),
    [playing, setPlaying] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [requested, setRequested] = useState("");
  const current = records[record];
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setElapsed((n) => (n < current.length ? n + 1 : 0)),
      1000,
    );
    return () => clearInterval(id);
  }, [playing, current.length]);
  function choose(n: number) {
    setRecord(n);
    setElapsed(0);
  }
  return (
    <>
      <header>
        <a href="#listening">The listening room</a>
        <a href="#" className="brand">
          nocturne<span>LISTENING BAR</span>
        </a>
        <a href="#table">
          Find a table <ArrowUpRight size={14} />
        </a>
      </header>
      <main>
        <section className="room">
          <div className="room-copy">
            <h1>
              Stay for
              <br />
              another
              <br />
              <em>side.</em>
            </h1>
            <p>
              Good records. Something in your glass.
              <br />A little room for the night to unfold.
            </p>
            <a href="#listening" className="text-link">
              Step into the room <ArrowRight size={17} />
            </a>
            <span className="room-hours">
              THURSDAY—SUNDAY / 18:00 UNTIL LATE
            </span>
          </div>
          <div className="listening-visual">
            <div className="turntable" aria-hidden="true">
              <div className="platter">
                <div className={`vinyl ${playing ? "spinning" : ""}`}>
                  <div
                    className="record-label"
                    style={{ background: current.color }}
                  >
                    <span>
                      NOCTURNE
                      <br />
                      SELECTIONS
                    </span>
                    <i />
                    <small>SIDE A / 33 RPM</small>
                  </div>
                </div>
              </div>
              <div className={`tonearm ${playing ? "lowered" : ""}`}>
                <i />
              </div>
              <div className="power-light" />
              <span className="turntable-name">N — 33</span>
              <div className="speed-control">33 / 45</div>
            </div>
            <div className="visual-caption">
              <Disc3 size={17} />
              <span>
                Analog warmth.
                <br />
                Undivided attention.
              </span>
              <span>EST. FOR THE EVENING</span>
            </div>
          </div>
        </section>
        <section id="listening" className="record-room">
          <div className="record-intro">
            <h2>
              A record.
              <br />A mood.
              <br />
              <em>Your evening.</em>
            </h2>
            <p>
              Choose a sleeve from tonight's imaginary collection. Let the
              turntable set the pace.
            </p>
            <p className="demo-note">
              Silent player simulation. No audio plays.
              <br />
              All records and artists are fictional.
            </p>
          </div>
          <div className="record-console">
            <div className="sleeves" aria-label="Record collection">
              {records.map((x, i) => (
                <button
                  key={x.title}
                  aria-label={`Select ${x.title}`}
                  aria-pressed={record === i}
                  className={`sleeve sleeve-${i}`}
                  onClick={() => choose(i)}
                >
                  <div className="cover-art" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>{x.title}</span>
                  <small>{x.artist}</small>
                </button>
              ))}
            </div>
            <div className="now-playing">
              <div>
                <span className="now-label">ON THE TURNTABLE</span>
                <h3>{current.title}</h3>
                <p>
                  {current.artist} · {current.genre}
                </p>
              </div>
              <div className="transport">
                <button
                  className="play"
                  aria-label={playing ? "Pause simulation" : "Play simulation"}
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? <Pause size={21} /> : <Play size={21} />}
                </button>
                <button
                  aria-label="Next record"
                  onClick={() => choose((record + 1) % records.length)}
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
            <div className="timeline">
              <time>{clock(elapsed)}</time>
              <progress
                aria-label="Simulated track progress"
                max={current.length}
                value={elapsed}
              />
              <time>{clock(current.length)}</time>
            </div>
            <div className="player-status" role="status">
              {playing
                ? "Turntable running · silent simulation"
                : "Needle resting · press play to begin"}
            </div>
          </div>
        </section>
        <section className="bar">
          <div className="bar-art" aria-hidden="true">
            <div className="glass">
              <div className="drink" />
              <i />
              <i />
            </div>
            <span>
              A SLOWER KIND
              <br />
              OF EVENING.
            </span>
          </div>
          <div className="bar-menu">
            <h2>
              Small pours.
              <br />
              Long conversations.
            </h2>
            <p>
              A short, considered menu.
              <br />
              Made for the space between songs.
            </p>
            <dl>
              <div>
                <dt>
                  Midnight old fashioned <small>Rye, walnut, orange</small>
                </dt>
                <dd>14</dd>
              </div>
              <div>
                <dt>
                  The last word <small>Gin, green herbs, lime</small>
                </dt>
                <dd>13</dd>
              </div>
              <div>
                <dt>
                  Soft spoken{" "}
                  <small>Roasted pear, tea, soda · Alcohol free</small>
                </dt>
                <dd>9</dd>
              </div>
              <div>
                <dt>
                  Something to share{" "}
                  <small>Olives, cultured butter, warm sourdough</small>
                </dt>
                <dd>12</dd>
              </div>
            </dl>
            <span className="menu-note">Illustrative menu · prices in EUR</span>
          </div>
        </section>
        <section id="table" className="reservation">
          <div>
            <h2>
              There's a place
              <br />
              <em>for you here.</em>
            </h2>
            <p>
              A table for two. A seat at the bar.
              <br />
              We keep a little space for the unexpected.
            </p>
            <span className="address">
              An imaginary corner of Copenhagen.
              <br />
              Thursday to Sunday, 18:00–01:00.
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setRequested(
                `${data.get("name")}, your table for ${data.get("people")} on ${data.get("date")} at ${data.get("time")} is selected. Demo only — no request was sent.`,
              );
            }}
            onChange={() => setRequested("")}
          >
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="given-name"
                  placeholder="First name"
                  required
                  maxLength={60}
                />
              </label>
              <label>
                Your evening
                <input
                  aria-label="Your evening"
                  name="date"
                  type="date"
                  required
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Guests
                <select aria-label="Number of guests" name="people">
                  <option>2</option>
                  <option>1</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </label>
              <label>
                Arrival
                <select aria-label="Arrival time" name="time">
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                  <option>21:00</option>
                  <option>22:00</option>
                </select>
              </label>
            </div>
            <button className="request" type="submit">
              Request a little space <ArrowRight size={18} />
            </button>
            <p className="request-status" role="status">
              {requested || "Demo table request. Nothing is sent or reserved."}
            </p>
          </form>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          nocturne
        </a>
        <span>
          Put the phone down.
          <br />
          Let the record play.
        </span>
        <p>
          A fictional listening bar.
          <br />An Elseform template.
        </p>
      </footer>
    </>
  );
}
