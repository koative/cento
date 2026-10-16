import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Sun, Moon } from "lucide-react";
import skincare from "./assets/skincare.jpg";
const steps = [
  {
    name: "Cleanse",
    title: "A clean beginning.",
    text: "A soft, unhurried first step. Wash away the day without making a ceremony of it.",
    product: "Cloud milk cleanser",
    detail: "Cream texture · 150 ml",
  },
  {
    name: "Nourish",
    title: "A moment for moisture.",
    text: "A few drops. A slower breath. An everyday texture that makes the ordinary feel considered.",
    product: "Dew facial oil",
    detail: "Silky texture · 30 ml",
  },
  {
    name: "Finish",
    title: "Keep the good feeling.",
    text: "Finish your routine with a comfortable cream and a little time to yourself.",
    product: "Soft seal cream",
    detail: "Cushion texture · 50 ml",
  },
];
export default function App() {
  const [step, setStep] = useState(1);
  const [texture, setTexture] = useState("Lightweight");
  const [time, setTime] = useState("Morning");
  const [result, setResult] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  return (
    <>
      <div className="announcement">
        A little care, every day. &nbsp; A fictional skincare studio.
      </div>
      <header>
        <a className="logo" href="#">
          aura<span>care comes naturally</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#ritual">The ritual</a>
          <a href="#philosophy">Our thinking</a>
        </nav>
        <a className="nav-cta" href="#finder">
          Find your rhythm <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="intro">
          <div className="type-panel">
            <h1>
              Daily care.
              <br />
              Quiet <em>joy.</em>
            </h1>
            <p>
              Considered skincare for the space
              <br />
              between your busy days.
            </p>
            <a className="button" href="#ritual">
              Meet your daily ritual <ArrowRight size={18} />
            </a>
            <div className="intro-bottom">
              <span>
                Good to your skin.
                <br />
                Easy on your shelf.
              </span>
              <span>
                Everyday essentials.
                <br />
                Thoughtfully imagined.
              </span>
            </div>
          </div>
          <div className="photo-panel">
            <img
              src={skincare}
              alt="Amber facial oil bottle on a wooden pedestal in warm afternoon light"
            />
            <span className="photo-note">
              Make room
              <br />
              for a softer day.
            </span>
          </div>
          <div className="vertical-note">THE ART OF A LITTLE EVERY DAY</div>
        </section>
        <section id="ritual" className="ritual">
          <div className="ritual-heading">
            <h2>
              Three steps.
              <br />
              <em>Your kind of care.</em>
            </h2>
            <p>
              A simple routine, with space to make it yours.
              <br />
              Explore our concept collection.
            </p>
          </div>
          <div className="ritual-layout">
            <div className="step-list" role="group" aria-label="Ritual steps">
              {steps.map((s, i) => (
                <button
                  key={s.name}
                  className={step === i ? "active" : ""}
                  aria-pressed={step === i}
                  onClick={() => setStep(i)}
                >
                  <span>0{i + 1}</span>
                  <strong>{s.name}</strong>
                  <ArrowRight size={22} />
                </button>
              ))}
            </div>
            <div className="ritual-description" key={step}>
              <span className="step-count">Step {step + 1} of 3</span>
              <h3>{steps[step].title}</h3>
              <p>{steps[step].text}</p>
              <div className="product-strip">
                <div>
                  <strong>{steps[step].product}</strong>
                  <small>{steps[step].detail}</small>
                </div>
                <a
                  href="#finder"
                  aria-label="Build a routine with this product"
                >
                  <ArrowUpRight size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="finder" className="finder">
          <div>
            <h2>
              Meet your
              <br />
              <em>everyday edit.</em>
            </h2>
            <p>
              A tiny ritual finder. Pick how you like your skincare to feel, and
              we’ll build a sample routine.
            </p>
            <small>
              Cosmetic concept only. These are texture preferences, not medical
              recommendations.
            </small>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setResult(true);
            }}
          >
            <fieldset>
              <legend>When is your quiet moment?</legend>
              {["Morning", "Evening"].map((t) => (
                <button
                  type="button"
                  key={t}
                  aria-pressed={time === t}
                  onClick={() => {
                    setTime(t);
                    setResult(false);
                  }}
                >
                  {t === "Morning" ? <Sun size={19} /> : <Moon size={19} />} {t}
                  {time === t && <Check size={16} />}
                </button>
              ))}
            </fieldset>
            <label htmlFor="texture">What texture feels like you?</label>
            <select
              id="texture"
              aria-label="Preferred texture"
              value={texture}
              onChange={(e) => {
                setTexture(e.target.value);
                setResult(false);
              }}
            >
              <option>Lightweight</option>
              <option>Rich and comforting</option>
              <option>A little of both</option>
            </select>
            <button className="button" type="submit">
              Build my sample ritual <ArrowRight size={19} />
            </button>
            {result && (
              <div role="status" className="result">
                <strong>Your {time.toLowerCase()} edit</strong>
                <p>
                  Cloud milk cleanser →{" "}
                  {texture === "Lightweight"
                    ? "Dew light serum"
                    : texture === "Rich and comforting"
                      ? "Dew facial oil"
                      : "Dew balancing lotion"}{" "}
                  → Soft seal cream.
                </p>
                <small>
                  Selected for a {texture.toLowerCase()} feel. An illustrative
                  routine; no products are ordered.
                </small>
              </div>
            )}
          </form>
        </section>
        <section id="philosophy" className="philosophy">
          <span className="big-a" aria-hidden="true">
            a
          </span>
          <div>
            <h2>
              Care doesn’t need
              <br />
              to be complicated.
            </h2>
            <p>
              Fewer decisions. Familiar textures. A daily pause you can look
              forward to. Aura is an imagined skincare studio built around one
              idea: make a little room for yourself.
            </p>
            <a href="#finder">
              Find your everyday edit <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="newsletter">
          <h2>A softer kind of inbox.</h2>
          {joined ? (
            <p role="status">
              You're on the demo list. Nothing has been sent or stored.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setJoined(true);
                setEmail("");
              }}
            >
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label="Join the demo newsletter">
                <ArrowRight size={22} />
              </button>
            </form>
          )}
          <small>Try the local signup. No email delivery.</small>
        </section>
      </main>
      <footer>
        <a className="logo" href="#">
          aura
        </a>
        <p>Fictional brand and products. An Elseform template.</p>
        <a href="../../">
          Explore all templates <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
