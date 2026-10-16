import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Plus } from "lucide-react";
const essentials = [
  {
    name: "Drinking water",
    hint: "A personal supply plan, suited to your household.",
    group: "Supplies",
  },
  {
    name: "Shelf-stable food",
    hint: "Familiar food and a manual can opener.",
    group: "Supplies",
  },
  {
    name: "First-aid kit",
    hint: "Check expiry dates and your personal requirements.",
    group: "Supplies",
  },
  {
    name: "Torch and batteries",
    hint: "Keep a light where you can find it.",
    group: "Equipment",
  },
  {
    name: "Charged power bank",
    hint: "Include the right cable for your phone.",
    group: "Equipment",
  },
  {
    name: "Household contact card",
    hint: "Keep a paper copy of important contacts.",
    group: "Plan",
  },
];
export default function App() {
  const [checked, setChecked] = useState<string[]>([]);
  const [people, setPeople] = useState(2);
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState(false);
  return (
    <>
      <a className="skip" href="#main">
        Skip to preparedness checklist
      </a>
      <header>
        <a className="brand" href="#">
          <ShieldCheck />
          beacon
        </a>
        <nav>
          <a href="#checklist">Your checklist</a>
          <a href="#plan">Your plan</a>
        </nav>
        <span>Prepared feels better.</span>
      </header>
      <main id="main">
        <section className="welcome">
          <div>
            <h1>
              A little preparation.
              <br />A little more peace.
            </h1>
            <p>
              Make a simple household kit, one useful thing at a time. Start
              where you are. Build it together.
            </p>
            <a className="primary" href="#checklist">
              Start your checklist <ArrowRight />
            </a>
          </div>
          <div className="prepared-mark">
            <div className="signal-ring one" />
            <div className="signal-ring two" />
            <div className="signal-ring three" />
            <div className="signal-center">
              <ShieldCheck />
            </div>
            <span>
              Small steps.
              <br />
              Stronger together.
            </span>
          </div>
        </section>
        <section className="preparation" id="checklist">
          <div className="checklist">
            <div className="list-title">
              <h2>The everyday essentials.</h2>
              <span>
                {checked.length} of {essentials.length} ready
              </span>
            </div>
            <div className="filter">
              {["All", "Supplies", "Equipment", "Plan"].map((x) => (
                <button
                  key={x}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ))}
            </div>
            {essentials
              .filter((x) => filter === "All" || x.group === filter)
              .map((x) => (
                <label className="check-row" key={x.name}>
                  <input
                    type="checkbox"
                    checked={checked.includes(x.name)}
                    onChange={() => {
                      setChecked(
                        checked.includes(x.name)
                          ? checked.filter((n) => n !== x.name)
                          : [...checked, x.name],
                      );
                      setSaved(false);
                    }}
                  />
                  <span>
                    <strong>{x.name}</strong>
                    <small>{x.hint}</small>
                  </span>
                  <span className="ready-tag">
                    {checked.includes(x.name) ? "Ready" : "To prepare"}
                  </span>
                </label>
              ))}
          </div>
          <aside className="household" id="plan">
            <h2>
              Your household,
              <br />
              your starting point.
            </h2>
            <label>
              People in your household
              <select
                value={people}
                onChange={(e) => {
                  setPeople(+e.target.value);
                  setSaved(false);
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <option key={x} value={x}>
                    {x} {x === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
            </label>
            <div className="kit-count">
              <strong>{checked.length}</strong>
              <span>
                of 6 essentials
                <br />
                checked and ready
              </span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${(checked.length / 6) * 100}%` }} />
            </div>
            <p>
              Prepare {people} printed contact {people === 1 ? "card" : "cards"}{" "}
              so everyone has the same plan.
            </p>
            <button className="primary" onClick={() => setSaved(true)}>
              Save household checklist <Check />
            </button>
            <p className="status" role="status">
              {saved
                ? `Checklist saved for ${people} ${people === 1 ? "person" : "people"}: ${checked.length} of 6 items ready.`
                : "Your selections stay in this demo until reload."}
            </p>
          </aside>
        </section>
        <section className="conversation">
          <h2>
            The best plan starts
            <br />
            with a conversation.
          </h2>
          <div>
            <article>
              <h3>Agree on a meeting place.</h3>
              <p>
                Choose somewhere familiar and accessible. Write it down and make
                sure everyone knows the route.
              </p>
            </article>
            <article>
              <h3>Know who to check on.</h3>
              <p>
                Think about neighbours, family members and anyone who may need a
                little extra support.
              </p>
            </article>
            <article>
              <h3>Review it together.</h3>
              <p>
                Needs change. Make time to revisit supplies, contact details and
                arrangements.
              </p>
            </article>
          </div>
        </section>
        <div className="demo-note">
          This fictional template demonstrates a checklist interface. It is not
          an official emergency plan or a complete safety guide. Consult your
          local emergency management authority for location-specific guidance.
        </div>
      </main>
      <footer>
        <span>Beacon — fictional preparedness project</span>
        <span>A little more ready, together.</span>
      </footer>
    </>
  );
}
