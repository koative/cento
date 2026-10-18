import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "../router";
import {
  courses,
  glosses,
  languages,
  levelInfo,
  levelTest,
  levelTests,
  type LangId,
  type Level,
} from "../content";
import { CourseRow, langStyle, Marked, PageHead } from "../components/Bits";
import { levelFor, savePlacement } from "../lib/placement";

const order: Level[] = ["A1", "A2", "B1", "B2", "C1"];
const NOT_SURE = -1;

export function LevelTest() {
  const [lang, setLang] = useState<LangId | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const focusRef = useRef<HTMLHeadingElement>(null);
  const questions = lang ? levelTests[lang]! : [];
  const done = lang !== null && step === questions.length;
  const score = answers.filter((a, n) => a === questions[n]?.answer).length;
  const level = levelFor(score);

  useEffect(() => {
    if (lang) focusRef.current?.focus();
  }, [lang, step]);

  useEffect(() => {
    if (done && lang) savePlacement({ lang, level, score });
  }, [done, lang, level, score]);

  function restart() {
    setLang(null);
    setStep(0);
    setAnswers([]);
  }

  if (!lang) return <Choose onStart={setLang} />;

  const l = languages.find((x) => x.id === lang)!;

  if (done) {
    const fits = courses.filter(
      (c) => c.lang === lang && c.levels.includes(level),
    );
    const nearest = fits.length
      ? fits
      : courses
          .filter((c) => c.lang === lang)
          .sort(
            (a, b) =>
              Math.abs(order.indexOf(a.levels[0]) - order.indexOf(level)) -
              Math.abs(order.indexOf(b.levels[0]) - order.indexOf(level)),
          )
          .slice(0, 1);
    return (
      <div className="wrap page test" style={langStyle(l.color)}>
        <div className="result-head">
          <div>
            <h1 ref={focusRef} tabIndex={-1}>
              Your {l.name}: <span className="result-level">{level}</span>
            </h1>
            <p className="lead">
              <b>{levelInfo[level].name}.</b> {levelInfo[level].can}
            </p>
            <p className="result-score">
              {score} of {questions.length} correct. Your teacher will check
              this in the first lesson; groups can be switched free of charge in
              the first two weeks.
            </p>
          </div>
          <div className="actions">
            <Link
              to={nearest[0] ? `/enrol?course=${nearest[0].id}` : "/enrol"}
              className="btn"
            >
              Enrol at {level} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <button type="button" className="btn btn-ghost" onClick={restart}>
              <RotateCcw size={17} aria-hidden="true" /> Take it again
            </button>
          </div>
        </div>

        <section className="sheet" aria-labelledby="sheet-h">
          <h2 id="sheet-h">Your sheet, marked</h2>
          <ol>
            {questions.map((q, n) => (
              <li key={q.prompt}>
                <Marked
                  q={q}
                  chosen={answers[n] === NOT_SURE ? null : answers[n]}
                  lang={l.code}
                />
                <p className="gloss-line">
                  {q.gloss} <span className="sheet-level">{q.level}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-labelledby="fit-h">
          <h2 id="fit-h">
            {fits.length
              ? `${l.name} groups at ${level}`
              : `The closest ${l.name} group this term`}
          </h2>
          <ul className="course-list">
            {nearest.map((c) => (
              <CourseRow key={c.id} course={c} />
            ))}
          </ul>
        </section>
      </div>
    );
  }

  const q = questions[step];
  const chosen = answers[step];
  const [before, after] = q.prompt.split("___");

  function pick(n: number) {
    const next = [...answers];
    next[step] = n;
    setAnswers(next);
  }

  return (
    <div className="wrap page test" style={langStyle(l.color)}>
      <div className="test-bar">
        <h1 ref={focusRef} tabIndex={-1}>
          {l.name} level test{" "}
          <span className="test-count">
            · question {step + 1} of {questions.length}
          </span>
        </h1>
        <div className="verse-progress" aria-hidden="true">
          {questions.map((_, n) => (
            <span
              key={n}
              data-state={n < step ? "done" : n === step ? "now" : undefined}
            />
          ))}
        </div>
      </div>

      <form
        className="question"
        onSubmit={(e) => {
          e.preventDefault();
          if (chosen !== undefined) setStep(step + 1);
        }}
      >
        <fieldset key={step}>
          <legend>
            <span className="prompt" lang={l.code}>
              {before}
              <span className="blank" aria-label="blank">
                {chosen !== undefined && chosen !== NOT_SURE
                  ? q.options[chosen]
                  : ""}
              </span>
              {after}
            </span>
            <span className="gloss-line">{q.gloss}</span>
          </legend>
          <div className="options">
            {q.options.map((o, n) => (
              <label key={o} className="option">
                <input
                  type="radio"
                  name="answer"
                  checked={chosen === n}
                  onChange={() => pick(n)}
                />
                <span lang={l.code}>{o}</span>
              </label>
            ))}
            <label className="option option-unsure">
              <input
                type="radio"
                name="answer"
                checked={chosen === NOT_SURE}
                onChange={() => pick(NOT_SURE)}
              />
              <span>I'm not sure</span>
            </label>
          </div>
        </fieldset>
        <div className="question-nav">
          {step > 0 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={18} aria-hidden="true" /> Previous
            </button>
          )}
          <button type="submit" className="btn" disabled={chosen === undefined}>
            {step === questions.length - 1 ? "Mark my sheet" : "Next sentence"}{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button type="button" className="text-btn" onClick={restart}>
            Change language
          </button>
        </div>
      </form>
    </div>
  );
}

function Choose({ onStart }: { onStart: (l: LangId) => void }) {
  const tested = languages.filter((l) => levelTests[l.id]);
  const [pick, setPick] = useState<LangId>(tested[0].id);
  return (
    <div className="wrap page test">
      <PageHead
        title={levelTest.title}
        lead={levelTest.lead}
        gloss={glosses.test}
      />
      <form
        className="choose"
        onSubmit={(e) => {
          e.preventDefault();
          onStart(pick);
        }}
      >
        <fieldset>
          <legend>Which language are you testing?</legend>
          <div className="choose-grid">
            {tested.map((l) => (
              <label
                key={l.id}
                className="choose-lang"
                style={langStyle(l.color)}
              >
                <input
                  type="radio"
                  name="lang"
                  checked={pick === l.id}
                  onChange={() => setPick(l.id)}
                />
                <span className="choose-name">{l.name}</span>
                <span className="choose-hello" lang={l.code}>
                  {l.hello}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <p className="fine">{levelTest.spokenOnly}</p>
        <button type="submit" className="btn">
          Start the {languages.find((l) => l.id === pick)!.name} test{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
      <ol className="how-test">
        <li>
          <b>Eight sentences.</b> Each has one gap and three possible words.
          They begin at A1 and end at C1.
        </li>
        <li>
          <b>Say when you don't know.</b> "I'm not sure" is always an option and
          counts the same as a wrong answer, without the luck.
        </li>
        <li>
          <b>Get your sheet back marked.</b> In red pen, with the right word
          written in, and the groups that fit your level this term.
        </li>
      </ol>
    </div>
  );
}
