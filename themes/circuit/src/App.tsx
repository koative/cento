import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Smartphone,
  Laptop,
  Gamepad2,
  Headphones,
  Check,
  Plus,
  Minus,
  Wrench,
  RotateCcw,
} from "lucide-react";
const devices = [
  { name: "Phone", icon: Smartphone, base: 49 },
  { name: "Laptop", icon: Laptop, base: 89 },
  { name: "Console", icon: Gamepad2, base: 69 },
  { name: "Audio", icon: Headphones, base: 39 },
];
const issues = [
  "Cracked screen",
  "Battery trouble",
  "Won’t turn on",
  "Something else",
];
export default function App() {
  const [device, setDevice] = useState(0);
  const [issue, setIssue] = useState("Cracked screen");
  const [slot, setSlot] = useState("Tomorrow, 10:00");
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(-1);
  const d = devices[device];
  const estimate =
    d.base +
    (issue === "Cracked screen" ? 50 : issue === "Won’t turn on" ? 30 : 0);
  return (
    <>
      <a className="skip" href="#repair">
        Skip to repair finder
      </a>
      <header className="nav">
        <a className="brand" href="#">
          <Wrench />
          circuit
        </a>
        <nav>
          <a href="#repair">Find your fix</a>
          <a href="#approach">Repair, rethink</a>
          <a href="#faq">Before you visit</a>
        </nav>
        <span className="small">Good things deserve another go.</span>
      </header>
      <main>
        <section className="circuit-intro">
          <h1>
            A little broken.
            <br />
            <span>A lot of life left.</span>
          </h1>
          <div className="intro-bottom">
            <p>
              Your favourite devices aren't done yet. Let's find the fix, keep
              the good bits, and get you going again.
            </p>
            <a href="#repair" className="btn">
              Find your fix <ArrowRight />
            </a>
          </div>
          <div
            className="circuit-art"
            aria-label="Animated geometric circuit paths"
          >
            <svg viewBox="0 0 1000 160">
              <g fill="none" stroke="#aacf64" strokeWidth="3">
                <path d="M0 80H170L220 30H380L430 80H570L620 130H780L830 80H1000" />
                <path d="M0 120H130L180 70H330L380 120H540L590 70H730L780 20H1000" />
                <path d="M0 40H100L150 90H300L350 40H500L550 90H700L750 140H1000" />
              </g>
              {[180, 380, 580, 780].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={[70, 120, 80, 20][i]}
                  r="9"
                  fill="#234a3a"
                  stroke="#dce8ae"
                  strokeWidth="3"
                  className="pulse-point"
                  style={{ animationDelay: i * 0.3 + "s" }}
                />
              ))}
            </svg>
            <span>REPAIR IS A FRESH START.</span>
          </div>
        </section>
        <section id="repair" className="repair-section">
          <div className="repair-context">
            <h2>
              Let's figure
              <br />
              this out.
            </h2>
            <p>
              A few details help us prepare a sample repair plan. No technical
              vocabulary required.
            </p>
            <ol>
              {[
                "Choose your device",
                "Tell us what happened",
                "Pick a time",
              ].map((x, i) => (
                <li className={step >= i + 1 ? "active" : ""} key={x}>
                  <span>{step > i + 1 ? <Check /> : i + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
            <p className="demo">
              Fictional repair studio. Prices, times and bookings are for
              demonstration only.
            </p>
          </div>
          <div className="repair-form">
            {confirmed ? (
              <div className="confirmed">
                <span>
                  <Check />
                </span>
                <h2>
                  Another go,
                  <br />
                  coming right up.
                </h2>
                <p role="status">
                  Your {d.name.toLowerCase()} repair plan for{" "}
                  {slot.toLowerCase()} is ready. This is a local demo; no
                  appointment has been booked.
                </p>
                <dl>
                  <div>
                    <dt>Device</dt>
                    <dd>{d.name}</dd>
                  </div>
                  <div>
                    <dt>Issue</dt>
                    <dd>{issue}</dd>
                  </div>
                  <div>
                    <dt>Illustrative starting price</dt>
                    <dd>€{estimate}</dd>
                  </div>
                </dl>
                <button
                  className="btn secondary"
                  onClick={() => {
                    setConfirmed(false);
                    setStep(1);
                  }}
                >
                  Start another repair <RotateCcw />
                </button>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  <h3>
                    {step === 1
                      ? "What needs a little care?"
                      : step === 2
                        ? "What happened?"
                        : "When works for you?"}
                  </h3>
                  <span>{step} / 3</span>
                </div>
                {step === 1 ? (
                  <div className="device-grid">
                    {devices.map((x, i) => {
                      const Icon = x.icon;
                      return (
                        <button
                          key={x.name}
                          aria-pressed={device === i}
                          onClick={() => setDevice(i)}
                        >
                          <Icon strokeWidth={1.2} />
                          <span>{x.name}</span>
                          {device === i && <Check className="chosen" />}
                        </button>
                      );
                    })}
                  </div>
                ) : step === 2 ? (
                  <div className="issue-list">
                    {issues.map((x) => (
                      <button
                        key={x}
                        aria-pressed={issue === x}
                        onClick={() => setIssue(x)}
                      >
                        {x}
                        <span>{issue === x ? <Check /> : <Plus />}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="slot-list">
                    <p>Sample availability · no live calendar connected</p>
                    {[
                      "Tomorrow, 10:00",
                      "Tomorrow, 14:30",
                      "Friday, 11:00",
                      "Friday, 16:00",
                    ].map((x) => (
                      <button
                        key={x}
                        aria-pressed={slot === x}
                        onClick={() => setSlot(x)}
                      >
                        {x}
                        {slot === x && <Check />}
                      </button>
                    ))}
                    <div className="repair-price">
                      <span>Illustrative starting price</span>
                      <strong>€{estimate}</strong>
                      <p>
                        Final cost requires a real diagnosis and your approval.
                      </p>
                    </div>
                  </div>
                )}
                <div className="form-actions">
                  {step > 1 && (
                    <button className="back" onClick={() => setStep(step - 1)}>
                      Back
                    </button>
                  )}
                  <button
                    className="btn"
                    onClick={() =>
                      step < 3 ? setStep(step + 1) : setConfirmed(true)
                    }
                  >
                    {step === 3 ? "Prepare repair plan" : "Continue"}
                    <ArrowRight />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
        <section id="approach" className="repair-belief">
          <h2>
            New isn't always
            <br />
            <em>the answer.</em>
          </h2>
          <div>
            <p>
              There's a story in a well-used device. The music you found. The
              work you made. The people you called.
            </p>
            <p>Repair gives that story another chapter.</p>
            <div className="belief-strip">
              <span>Understand it.</span>
              <span>Repair it.</span>
              <span>Keep it going.</span>
            </div>
          </div>
        </section>
        <section id="faq" className="faq section">
          <h2>
            A few things
            <br />
            before you pop in.
          </h2>
          <div>
            {[
              [
                "Should I back up my device?",
                "Yes. For a real repair, back up your data and remove sensitive information where possible. This demonstration does not access your device or data.",
              ],
              [
                "Will you tell me the price first?",
                "A real service should diagnose the issue and explain the proposed cost before you approve the work. All prices here are illustrative starting points.",
              ],
              [
                "Is this an actual repair booking?",
                "No. Circuit is a fictional website template. Your choices stay in this browser session and no appointment is created.",
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
          <Wrench />
          circuit
        </a>
        <span>
          Fictional electronics repair concept by Koative. Local demonstration
          only.
        </span>
        <a href="#repair">
          Give it another go <ArrowUpRight />
        </a>
      </footer>
    </>
  );
}
