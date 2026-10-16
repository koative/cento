import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  Shield,
} from "lucide-react";
import interior from "./assets/interior.jpg";
const plans = [
  {
    name: "The essentials",
    base: 12,
    tag: "A little peace of mind",
    items: [
      "Everyday belongings",
      "Accidental damage",
      "Digital policy summary",
    ],
  },
  {
    name: "A little more",
    base: 19,
    tag: "Room for what matters",
    items: [
      "Everything in essentials",
      "Bicycle and laptop cover",
      "Away-from-home belongings",
    ],
  },
  {
    name: "The whole picture",
    base: 29,
    tag: "A broader safety net",
    items: [
      "Everything in a little more",
      "Higher item limits",
      "Priority support pathway",
    ],
  },
];
export default function App() {
  const [type, setType] = useState("Apartment");
  const [value, setValue] = useState(25000);
  const [plan, setPlan] = useState(1);
  const [annual, setAnnual] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(-1);
  const price = (base: number) =>
    Math.round(
      (base + value / 10000 + (type === "House" ? 5 : 0)) * (annual ? 0.9 : 1),
    );
  return (
    <>
      <a className="skip" href="#quote">
        Skip to plan explorer
      </a>
      <header className="nav">
        <a className="brand" href="#">
          <Shield />
          vault.
        </a>
        <nav>
          <a href="#quote">Find your fit</a>
          <a href="#care">Our way</a>
          <a href="#questions">Good questions</a>
        </nav>
        <span className="small">For the life you're building.</span>
      </header>
      <main>
        <section className="vault-intro">
          <div className="intro-title">
            <h1>
              Life happens.
              <br />
              <em>Keep living.</em>
            </h1>
            <p>
              A clearer way to think about protecting the things that make your
              life yours.
            </p>
            <a href="#quote" className="btn">
              Find your kind of cover <ArrowRight />
            </a>
            <span className="demo">
              Fictional insurance concept. Explore illustrative plans.
            </span>
          </div>
          <div className="life-objects">
            <img
              className="home-photograph"
              src={interior}
              alt="A sunlit living room with a sofa and carefully chosen everyday objects"
            />
            <div className="policy-sheet">
              <div className="policy-head">
                <Shield size={19} />
                <span>Your everyday, considered.</span>
              </div>
              <h2>{plans[plan].name}</h2>
              <dl>
                <div>
                  <dt>Home</dt>
                  <dd>{type}</dd>
                </div>
                <div>
                  <dt>Belongings</dt>
                  <dd>€{value.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Sample monthly price</dt>
                  <dd>€{price(plans[plan].base)}</dd>
                </div>
              </dl>
              <a href="#quote">
                Explore your plan <ArrowUpRight size={16} />
              </a>
              <span className="policy-note">
                ILLUSTRATIVE PLAN · NO POLICY ISSUED
              </span>
            </div>
          </div>
        </section>
        <section id="quote" className="quote-section">
          <div className="quote-title">
            <h2>
              What does
              <br />
              home look like?
            </h2>
            <p>
              Start with a few details. See how a sample plan could fit your
              everyday.
            </p>
          </div>
          <div className="quote-inputs">
            <label className="field">
              Your home
              <select
                aria-label="Your home"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setSaved(false);
                }}
              >
                <option>Apartment</option>
                <option>House</option>
                <option>Shared home</option>
              </select>
            </label>
            <label className="value-input">
              Illustrative belongings value
              <strong>€{value.toLocaleString()}</strong>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={value}
                onChange={(e) => {
                  setValue(+e.target.value);
                  setSaved(false);
                }}
              />
            </label>
            <label className="billing">
              <input
                type="checkbox"
                checked={annual}
                onChange={(e) => {
                  setAnnual(e.target.checked);
                  setSaved(false);
                }}
              />
              Annual payment <span>10% sample discount</span>
            </label>
          </div>
        </section>
        <section className="plans">
          <div className="plan-heading">
            <h2>Different lives. Different fits.</h2>
            <p>
              Compare fictional benefits. Real insurance requires policy terms,
              exclusions and underwriting.
            </p>
          </div>
          <div className="plan-grid">
            {plans.map((p, i) => (
              <button
                key={p.name}
                className="plan"
                aria-pressed={plan === i}
                onClick={() => {
                  setPlan(i);
                  setSaved(false);
                }}
              >
                <span className="plan-mark">
                  {plan === i ? <Check /> : <Plus />}
                </span>
                <h3>{p.name}</h3>
                <p>{p.tag}</p>
                <strong className="price">
                  €{price(p.base)}
                  <small>/ month</small>
                </strong>
                <ul>
                  {p.items.map((x) => (
                    <li key={x}>
                      <Check />
                      {x}
                    </li>
                  ))}
                </ul>
                <span className="choose">
                  {plan === i ? "Selected plan" : "Choose this plan"}
                  <ArrowRight />
                </span>
              </button>
            ))}
          </div>
          <div className="plan-summary">
            <div>
              <strong>{plans[plan].name}</strong>
              <p>
                {type} · €{value.toLocaleString()} belongings ·{" "}
                {annual ? "annual" : "monthly"} payment
              </p>
            </div>
            <button className="btn" onClick={() => setSaved(true)}>
              Save plan summary <ArrowRight />
            </button>
          </div>
          {saved && (
            <p className="saved" role="status">
              Your {plans[plan].name.toLowerCase()} summary is ready at €
              {price(plans[plan].base)}/month equivalent. Local demo only; no
              policy or quote has been issued.
            </p>
          )}
        </section>
        <section id="care" className="care">
          <h2>
            Less fine print.
            <br />
            More <em>understanding.</em>
          </h2>
          <div>
            <p>
              Insurance should leave you with clarity, not another list of
              questions. This concept puts the important choices where you can
              see them.
            </p>
            <div>
              <span>Clear language.</span>
              <span>Considered choices.</span>
              <span>A human perspective.</span>
            </div>
          </div>
        </section>
        <section id="questions" className="questions section">
          <h2>
            Good questions,
            <br />
            clear answers.
          </h2>
          <div>
            {[
              [
                "Is this a real insurance quote?",
                "No. Vault is a fictional website template. All benefits and prices are illustrative and do not represent a policy or offer.",
              ],
              [
                "Does the calculator store my information?",
                "Your selections stay in memory in this browser session and reset when you reload. Nothing is sent to a server.",
              ],
              [
                "Can I change my plan selection?",
                "Yes. Adjust your home details, choose another plan, or change the payment option at any time in this demonstration.",
              ],
            ].map(([q, a], i) => (
              <article key={q}>
                <button
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  {q}
                  {open === i ? <Minus /> : <Plus />}
                </button>
                {open === i && <p>{a}</p>}
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <a className="brand" href="#">
          vault.
        </a>
        <span>
          Fictional insurance concept by Koative. No insurance is sold.
          Illustrative pricing is not financial advice.
        </span>
        <a href="#quote">
          Find your fit <ArrowUpRight />
        </a>
      </footer>
    </>
  );
}
