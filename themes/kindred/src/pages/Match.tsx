import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { ArrowLeft, ArrowRight, Check, Minus, RotateCcw } from "lucide-react";
import { Link } from "../router";
import { animals, quiz } from "../content";
import { rank, type Answers } from "../lib/match";
import { ageLabel } from "../lib/util";
import { TagChip } from "../components/KennelCard";

export function Match() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= quiz.length;
  const heading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  // Move focus to the new question (or the results) after each step, but not on first load.
  useEffect(() => {
    if (!started.current) return;
    heading.current?.focus();
  }, [step]);

  function go(n: number) {
    started.current = true;
    setStep(n);
  }

  return (
    <div className="wrap page match-page">
      <header className="page-head">
        <h1>Find your match</h1>
        <p className="lede">
          Seven questions, about two minutes. We'll rank everyone at Kindred
          against your answers and tell you why — the good fits and the honest
          cautions.
        </p>
      </header>

      {done ? (
        <Results
          answers={answers}
          heading={heading}
          onEdit={go}
          onRestart={() => (setAnswers({}), go(0))}
        />
      ) : (
        <div className="quiz-layout">
          <Question
            step={step}
            answers={answers}
            setAnswers={setAnswers}
            heading={heading}
            go={go}
          />
          <Running answers={answers} />
        </div>
      )}
    </div>
  );
}

/** The signature board: every animal's face, dimming out or lighting up as answers come in. */
function Running({ answers }: { answers: Answers }) {
  const ranked = rank(answers).filter((m) => m.score >= 50);
  const inIds = new Set(ranked.map((m) => m.animal.id));
  const lead = Object.keys(answers).length ? ranked.slice(0, 3) : [];
  const leadIds = new Set(lead.map((m) => m.animal.id));
  return (
    <aside className="running" aria-labelledby="running-h">
      <h2 id="running-h" className="mini-h">
        Still in the running
      </h2>
      <p className="running-count" aria-live="polite">
        <span className="num">{ranked.length}</span> of {animals.length}
        {lead.length > 0 &&
          ` · leading: ${lead.map((m) => m.animal.name).join(", ")}`}
      </p>
      <ul className="running-faces">
        {animals.map((a) => (
          <li
            key={a.id}
            data-out={inIds.has(a.id) ? undefined : ""}
            data-lead={leadIds.has(a.id) ? "" : undefined}
          >
            <img
              src={a.photo}
              alt=""
              width={46}
              height={46}
              style={a.focus ? { objectPosition: a.focus } : undefined}
            />
            <span>{a.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

type QuestionProps = {
  step: number;
  answers: Answers;
  setAnswers: (a: Answers) => void;
  heading: RefObject<HTMLHeadingElement | null>;
  go: (n: number) => void;
};

function Question({ step, answers, setAnswers, heading, go }: QuestionProps) {
  const q = quiz[step];
  const value = answers[q.id];
  return (
    <form
      className="quiz"
      onSubmit={(e) => {
        e.preventDefault();
        if (value) go(step + 1);
      }}
    >
      <ol
        className="quiz-progress"
        aria-label={`Question ${step + 1} of ${quiz.length}`}
      >
        {quiz.map((item, i) => (
          <li
            key={item.id}
            data-state={i < step ? "done" : i === step ? "now" : undefined}
          >
            {i < step ? (
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Back to question ${i + 1}: ${item.question}`}
              />
            ) : (
              <span />
            )}
          </li>
        ))}
      </ol>
      <fieldset key={q.id} className="quiz-q">
        <legend>
          <span className="quiz-count">
            Question {step + 1} of {quiz.length}
          </span>
          <h2 ref={heading} tabIndex={-1}>
            {q.question}
          </h2>
        </legend>
        <p className="quiz-help">{q.help}</p>
        <div className="quiz-options">
          {q.options.map((o) => (
            <label key={o.value} className="quiz-option">
              <input
                type="radio"
                name={q.id}
                value={o.value}
                checked={value === o.value}
                onChange={() => setAnswers({ ...answers, [q.id]: o.value })}
              />
              <span className="quiz-option-label">{o.label}</span>
              {o.detail && (
                <span className="quiz-option-detail">{o.detail}</span>
              )}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="quiz-nav">
        {step > 0 && (
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => go(step - 1)}
          >
            <ArrowLeft aria-hidden="true" /> Back
          </button>
        )}
        <button className="btn btn-primary" disabled={!value}>
          {step === quiz.length - 1 ? "Show my matches" : "Next question"}{" "}
          <ArrowRight aria-hidden="true" />
        </button>
        {!value && <p className="quiz-hint">Pick one answer to continue.</p>}
      </div>
    </form>
  );
}

type ResultsProps = {
  answers: Answers;
  heading: RefObject<HTMLHeadingElement | null>;
  onEdit: (step: number) => void;
  onRestart: () => void;
};

function Results({ answers, heading, onEdit, onRestart }: ResultsProps) {
  const ranked = rank(answers);
  const top = ranked.slice(0, 3);
  const more = ranked.slice(3).filter((m) => m.score >= 50);
  const ruledOut = animals.length - ranked.length;

  return (
    <section className="results-q" aria-labelledby="res-h">
      <div className="res-head">
        <h2 id="res-h" ref={heading} tabIndex={-1}>
          {top.length
            ? `Meet ${top
                .map((m) => m.animal.name)
                .join(", ")
                .replace(/, ([^,]*)$/, " and $1")} first`
            : "No one fits that just yet"}
        </h2>
        <p aria-live="polite" className="res-sub">
          {ranked.length} of {animals.length} animals could suit you.
          {ruledOut > 0 &&
            ` ${ruledOut} need a home without children or other pets you have, so we've left them out.`}
        </p>
        <ul className="answer-chips" aria-label="Your answers">
          {quiz.map((q, i) => (
            <li key={q.id}>
              <button type="button" onClick={() => onEdit(i)}>
                {q.options.find((o) => o.value === answers[q.id])?.label}
                <span className="sr-only">
                  {" "}
                  — change answer to “{q.question}”
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {top.length > 0 ? (
        <ol className="fits">
          {top.map((m, i) => (
            <li
              key={m.animal.id}
              className="fit"
              style={{ "--i": i } as CSSProperties}
              data-tag={m.animal.tag}
            >
              <img
                src={m.animal.photo}
                alt={m.animal.alt}
                width={480}
                height={360}
                style={
                  m.animal.focus
                    ? { objectPosition: m.animal.focus }
                    : undefined
                }
              />
              <div className="fit-body">
                <p className="fit-score">
                  <span className="num">{m.score}%</span> fit
                </p>
                <h3>
                  <Link to={`/animals/${m.animal.id}`}>{m.animal.name}</Link>
                </h3>
                <p className="kcard-meta">
                  {ageLabel(m.animal.ageMonths)} · {m.animal.breed}
                </p>
                <ul className="why">
                  {m.reasons.slice(0, 3).map((r) => (
                    <li key={r}>
                      <Check aria-hidden="true" /> {r}
                    </li>
                  ))}
                  {m.cautions.slice(0, 2).map((c) => (
                    <li key={c} data-caution="">
                      <Minus aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
                <div className="fit-foot">
                  <TagChip animal={m.animal} />
                  <Link
                    to={`/apply/${m.animal.id}`}
                    className="btn btn-primary btn-small"
                  >
                    Apply for {m.animal.name}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty">
          Your answers rule out everyone currently at Kindred — that happens,
          and it's useful to know. New animals arrive most weeks; try changing
          an answer above or call us on the adoption line.
        </p>
      )}

      {more.length > 0 && (
        <div className="also">
          <h3>Also worth meeting</h3>
          <ul>
            {more.map((m) => (
              <li key={m.animal.id}>
                <img
                  src={m.animal.photo}
                  alt=""
                  width={46}
                  height={46}
                  loading="lazy"
                />
                <Link to={`/animals/${m.animal.id}`}>{m.animal.name}</Link>
                <span className="row-note">
                  {m.cautions[0] ?? m.reasons[0] ?? m.animal.breed}
                </span>
                <span className="num">{m.score}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="res-note">
        A score is a starting point for a conversation, not a verdict. Our
        counsellors will talk through any animal you're drawn to.
      </p>
      <button type="button" className="btn btn-quiet" onClick={onRestart}>
        <RotateCcw aria-hidden="true" /> Start again
      </button>
    </section>
  );
}
