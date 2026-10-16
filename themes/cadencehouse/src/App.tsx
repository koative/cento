import { useState } from "react";
import { ArrowUpRight, Power, Plus, Minus } from "lucide-react";
const rooms = [
  {
    name: "The live room",
    rate: 480,
    detail:
      "A generous, warm-sounding space for a band in full conversation. Piano, drums and room to breathe.",
    size: "82 m²",
    equipment: "Steinway upright · Ludwig kit · ribbon microphones",
  },
  {
    name: "The control room",
    rate: 360,
    detail:
      "Make the small decisions that change everything. An analog heart with a thoroughly modern workflow.",
    size: "36 m²",
    equipment: "32-channel desk · tape machine · nearfield monitors",
  },
  {
    name: "The writing room",
    rate: 220,
    detail:
      "A quieter corner for an idea that is still taking shape. Sit down, plug in and see where the day goes.",
    size: "24 m²",
    equipment: "Rhodes piano · modular synth · vocal booth",
  },
];
export default function App() {
  const [room, setRoom] = useState(0),
    [hours, setHours] = useState(4),
    [power, setPower] = useState(true),
    [saved, setSaved] = useState(false);
  const r = rooms[room];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          cadence<span>HOUSE</span>
        </a>
        <nav>
          <a href="#rooms">The rooms</a>
          <a href="#approach">The way we work</a>
          <a href="#rooms">Book some time ↗</a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-title">
            <h1>
              Good things
              <br />
              take a take.
            </h1>
            <p>
              An independent recording house.
              <br />
              For sounds with a little soul.
            </p>
          </div>
          <div
            className={"console " + (!power ? "off" : "")}
            aria-label="Interactive recording console"
          >
            <div className="console-top">
              <span>CADENCE HOUSE / ANALOG HEART</span>
              <button onClick={() => setPower(!power)} aria-pressed={power}>
                <Power size={15} />
                {power ? "Console on" : "Console off"}
              </button>
            </div>
            <div className="meters">
              <div className="meter">
                <span>VU</span>
                <div className="meter-lines">−20　−10　−5　0　+3</div>
                <i />
              </div>
              <div className="meter">
                <span>VU</span>
                <div className="meter-lines">−20　−10　−5　0　+3</div>
                <i />
              </div>
              <div className="tape">
                <div />
                <div />
                <span>THE SOUND OF BEING HERE</span>
              </div>
            </div>
            <div className="channels">
              {[
                "KICK",
                "SNARE",
                "BASS",
                "KEYS",
                "GUITAR",
                "VOICE",
                "ROOM",
                "MASTER",
              ].map((c, i) => (
                <div className="channel" key={c}>
                  <div className="knob" />
                  <div className="fader">
                    <i style={{ top: `${20 + ((i * 13) % 55)}%` }} />
                  </div>
                  <span>{c}</span>
                  <b />
                </div>
              ))}
            </div>
          </div>
          <div className="console-foot">
            <span>WARM CIRCUITS. OPEN MINDS.</span>
            <span>Turn the console on and off. Visual demo; no audio.</span>
          </div>
        </section>
        <section className="room-section" id="rooms">
          <div className="room-heading">
            <h2>Room for your sound.</h2>
            <p>Choose the space. We’ll help you find the feeling.</p>
          </div>
          <div className="booking">
            <div className="room-tabs">
              {rooms.map((v, i) => (
                <button
                  aria-pressed={room === i}
                  onClick={() => {
                    setRoom(i);
                    setSaved(false);
                  }}
                  key={v.name}
                >
                  <span>{v.name}</span>
                  <ArrowUpRight size={23} />
                </button>
              ))}
            </div>
            <article className="room-details" aria-live="polite">
              <div className="room-spec">
                <span>{r.size}</span>
                <span>DAYLIGHT / ANALOG / YOUR PACE</span>
              </div>
              <h3>{r.name}</h3>
              <p>{r.detail}</p>
              <p className="equipment">{r.equipment}</p>
              <div className="session">
                <div>
                  <span>Session length</span>
                  <div className="hours">
                    <button
                      aria-label="Shorter session"
                      disabled={hours === 2}
                      onClick={() => {
                        setHours(hours - 2);
                        setSaved(false);
                      }}
                    >
                      <Minus size={15} />
                    </button>
                    <strong>{hours} hours</strong>
                    <button
                      aria-label="Longer session"
                      disabled={hours === 10}
                      onClick={() => {
                        setHours(hours + 2);
                        setSaved(false);
                      }}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
                <div className="price">
                  <strong>€{(r.rate * hours) / 4}</strong>
                  <span>illustrative session rate</span>
                </div>
              </div>
              <button className="save" onClick={() => setSaved(true)}>
                {saved ? "Session added to your plan" : "Plan a session"}
                <ArrowUpRight size={18} />
              </button>
              {saved && (
                <p className="feedback">
                  {hours} hours in {r.name.toLowerCase()}. This is a local
                  sample plan, not a booking.
                </p>
              )}
            </article>
          </div>
        </section>
        <section className="approach" id="approach">
          <h2>
            Leave the door
            <br />
            open to <em>something.</em>
          </h2>
          <p>
            Some of the best sounds happen between takes. We built a house for
            that: good instruments, patient people, and enough space to follow
            an idea all the way through.
          </p>
          <div>
            <span>Recording</span>
            <span>Production</span>
            <span>Mixing</span>
            <span>Writing</span>
          </div>
        </section>
      </main>
      <footer>
        <a href="#">cadence house</a>
        <p>
          Fictional studio · Visual console and local session planner · Koative
        </p>
        <a href="#rooms">Make some time ↗</a>
      </footer>
    </>
  );
}
