import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Check,
  Plus,
  Minus,
  Eye,
  KeyRound,
} from "lucide-react";
const people = [
  {
    name: "Alex Morgan",
    initials: "AM",
    role: "Engineering",
    app: "Production API",
    risk: "Elevated",
    reason: "Admin access has not been reviewed in 90 days.",
  },
  {
    name: "Sam Rivera",
    initials: "SR",
    role: "Design",
    app: "Design library",
    risk: "Low",
    reason: "Access matches the current project assignment.",
  },
  {
    name: "Taylor Kim",
    initials: "TK",
    role: "Operations",
    app: "Billing console",
    risk: "Elevated",
    reason: "Temporary access exceeded its planned end date.",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(-1);
  const p = people[active];
  return (
    <>
      <a className="skip" href="#review">
        Skip to access review
      </a>
      <header className="nav">
        <a className="brand" href="#">
          <ShieldCheck />
          cipher
        </a>
        <nav>
          <a href="#review">Explore the product</a>
          <a href="#principles">Our approach</a>
          <a href="#answers">Questions</a>
        </nav>
        <span className="small">Identity, understood.</span>
      </header>
      <main>
        <section className="cipher-opening">
          <h1>
            Trust is a decision.
            <br />
            <span>Make it a clear one.</span>
          </h1>
          <div>
            <p>
              See who has access. Understand why.
              <br />
              Keep your people moving, with nothing left to guess.
            </p>
            <a href="#review">
              Try an access review <ArrowRight />
            </a>
          </div>
          <div className="trust-line" aria-hidden="true">
            <i />
            <span />
            <i />
            <span />
            <i />
            <span />
            <i />
            <span />
            <i />
          </div>
        </section>
        <section id="review" className="review">
          <div className="review-nav">
            <div>
              <Lock size={18} />
              <strong>Access review</strong>
              <span>Q4 · Fictional workspace</span>
            </div>
            <span>{Object.keys(decisions).length} of 3 reviewed</span>
          </div>
          <div className="review-body">
            <aside>
              <div className="queue-heading">
                REVIEW QUEUE <span>3</span>
              </div>
              {people.map((x, i) => (
                <button
                  key={x.name}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className="avatar">{x.initials}</span>
                  <span>
                    <strong>{x.name}</strong>
                    <small>{x.app}</small>
                  </span>
                  {decisions[x.name] ? (
                    <Check size={16} />
                  ) : (
                    <span className={"risk-dot " + x.risk.toLowerCase()} />
                  )}
                </button>
              ))}
            </aside>
            <div className="review-detail">
              <div className="identity">
                <span className="avatar large">{p.initials}</span>
                <div>
                  <h2>{p.name}</h2>
                  <p>{p.role} team · Fictional identity</p>
                </div>
                <span className={"risk " + p.risk.toLowerCase()}>
                  {p.risk} risk
                </span>
              </div>
              <div className="access-path">
                <span>{p.name}</span>
                <ArrowRight />
                <span>{p.role}</span>
                <ArrowRight />
                <strong>{p.app}</strong>
              </div>
              <div className="review-explanation">
                <div>
                  <Eye />
                  <h3>Why this needs a look</h3>
                  <p>{p.reason}</p>
                </div>
                <dl>
                  <div>
                    <dt>Access level</dt>
                    <dd>
                      {p.risk === "Elevated" ? "Administrator" : "Member"}
                    </dd>
                  </div>
                  <div>
                    <dt>Last active</dt>
                    <dd>2 days ago</dd>
                  </div>
                  <div>
                    <dt>Access source</dt>
                    <dd>Direct assignment</dd>
                  </div>
                </dl>
              </div>
              <div className="decision">
                <p>
                  {decisions[p.name]
                    ? `Decision recorded: ${decisions[p.name]}.`
                    : "You decide what happens next."}
                </p>
                <button
                  className="btn secondary"
                  onClick={() =>
                    setDecisions({ ...decisions, [p.name]: "Revoke access" })
                  }
                >
                  Revoke access
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    setDecisions({ ...decisions, [p.name]: "Keep access" })
                  }
                >
                  Keep access <Check />
                </button>
              </div>
              <p role="status" className="demo">
                {decisions[p.name]
                  ? `${p.name}: ${decisions[p.name]}. Saved locally for this session only.`
                  : "Interactive demonstration. No real accounts are connected."}
              </p>
            </div>
          </div>
        </section>
        <section id="principles" className="principles section">
          <h2>
            Security that
            <br />
            speaks human.
          </h2>
          <div>
            <article>
              <KeyRound />
              <h3>Context before action.</h3>
              <p>
                An account is only part of the story. Put teams, resources and
                reasons in the same frame.
              </p>
            </article>
            <article>
              <Eye />
              <h3>The whole picture.</h3>
              <p>
                Give reviewers enough detail to decide, without asking them to
                become investigators.
              </p>
            </article>
            <article>
              <Check />
              <h3>A decision you can follow.</h3>
              <p>
                Clear outcomes and a visible trail make the next review easier
                than the last.
              </p>
            </article>
          </div>
        </section>
        <section id="answers" className="answers section">
          <h2>A few clear answers.</h2>
          <div>
            {[
              [
                "Does this connect to my systems?",
                "This template is a local product demonstration. Connect a real identity provider and authorization backend before production use.",
              ],
              [
                "What happens when I revoke access?",
                "Only the fictional review state changes in this browser session. No account permissions are changed.",
              ],
              [
                "Can I use it for another product?",
                "Yes. The review workspace, decision states and marketing sections are editable React components.",
              ],
            ].map(([q, a], i) => (
              <article key={q}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
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
          <ShieldCheck />
          cipher
        </a>
        <span>
          Fictional identity security concept by Koative. Synthetic identities
          and risk signals.
        </span>
        <a href="#review">
          Try the workspace <ArrowUpRight />
        </a>
      </footer>
    </>
  );
}
