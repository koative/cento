import { useEffect, useState } from "react";
import { ChevronLeft, Pause, Play, RotateCcw } from "lucide-react";
import { Link } from "../router";
import { coffees, guides, type Guide } from "../content";
import { Qty } from "../components/Qty";
import { CoffeeCard } from "../components/CoffeeCard";

const clock = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function GuidePage({ guide }: { guide: Guide }) {
  const [brews, setBrews] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const end = guide.steps[guide.steps.length - 1].at;
  const current = guide.steps.reduce(
    (last, s, i) => (s.at <= elapsed ? i : last),
    0,
  );

  useEffect(() => {
    if (!running) return;
    const started = Date.now() - elapsed * 1000;
    const id = setInterval(() => {
      const t = (Date.now() - started) / 1000;
      setElapsed(Math.min(t, end));
      if (t >= end) setRunning(false);
    }, 200);
    return () => clearInterval(id);
    // elapsed is read once when starting; re-running on every tick would reset the interval.
  }, [running, end]);

  const suits = coffees
    .filter((c) => c.brewWith.includes(guide.slug))
    .slice(0, 3);
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <div className="page guide-page">
      <Link to="/brew" className="back-link">
        <ChevronLeft size={16} aria-hidden="true" /> All brew guides
      </Link>

      <header className="guide-hero">
        <div>
          <h1>{guide.name}</h1>
          <p className="muted">{guide.method}</p>
          <p className="lead">{guide.intro}</p>
        </div>
        <img src={guide.image} alt={guide.imageAlt} width={1200} height={800} />
      </header>

      <dl className="recipe">
        {(
          [
            ["Time", guide.time],
            ["Ratio", `1:${guide.ratio}`],
            ["Grind", guide.grind],
            ["Water", guide.water],
            ["Skill", guide.level],
          ] as const
        ).map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="guide-body">
        <aside className="guide-side">
          <section className="calc" aria-labelledby="h-calc">
            <h2 id="h-calc">Scale the recipe</h2>
            <div className="calc-row">
              <span id="brews-label">Brewing for</span>
              <Qty
                value={brews}
                onChange={setBrews}
                label="brews"
                max={guide.slug === "espresso" ? 4 : 6}
              />
            </div>
            <p className="calc-out" aria-live="polite">
              <span>
                <b>{guide.dose * brews} g</b> coffee
              </span>
              <span>
                <b>{guide.dose * guide.ratio * brews} g</b>{" "}
                {guide.slug === "espresso" ? "in the cup" : "water"}
              </span>
            </p>
          </section>
          <section aria-labelledby="h-gear">
            <h2 id="h-gear">You will need</h2>
            <ul className="gear">
              {guide.gear.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="steps" aria-labelledby="h-steps">
          <div className="timer">
            <h2 id="h-steps">Method</h2>
            <p className="timer-clock" role="timer" aria-label="Brew timer">
              {clock(elapsed)}
            </p>
            <div className="timer-buttons">
              <button
                type="button"
                className="btn btn-small"
                onClick={() => setRunning(!running)}
                disabled={elapsed >= end}
              >
                {running ? (
                  <Pause size={16} aria-hidden="true" />
                ) : (
                  <Play size={16} aria-hidden="true" />
                )}
                {running ? "Pause" : elapsed ? "Resume" : "Start timer"}
              </button>
              <button
                type="button"
                className="btn btn-small btn-ghost"
                onClick={() => {
                  setRunning(false);
                  setElapsed(0);
                }}
                disabled={!elapsed}
              >
                <RotateCcw size={16} aria-hidden="true" /> Reset
              </button>
            </div>
            <div className="timer-track" aria-hidden="true">
              <span style={{ transform: `scaleX(${elapsed / end})` }} />
            </div>
          </div>
          <ol className="step-list">
            {guide.steps.map((s, i) => (
              <li
                key={s.at}
                aria-current={elapsed > 0 && i === current ? "step" : undefined}
                data-done={elapsed > 0 && i < current ? "" : undefined}
              >
                <span className="step-at">{clock(s.at)}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="sr-step visually-hidden" aria-live="polite">
            {elapsed > 0
              ? `${guide.steps[current].title}: ${guide.steps[current].text}`
              : ""}
          </p>
          <p className="tip">
            <b>Dialling in.</b> {guide.tip}
          </p>
        </section>
      </div>

      {suits.length > 0 && (
        <section className="related" aria-labelledby="h-suits">
          <h2 id="h-suits">Coffees we brew this way</h2>
          <div className="shelf">
            {suits.map((c) => (
              <CoffeeCard key={c.id} coffee={c} />
            ))}
          </div>
        </section>
      )}

      <nav className="other-guides" aria-label="Other brew guides">
        {others.map((g) => (
          <Link key={g.slug} to={"/brew/" + g.slug}>
            {g.name} <span>{g.time}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
