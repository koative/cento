import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "../router";
import {
  faces,
  finder,
  frames,
  shapes,
  type Answers,
  type FaceShape,
} from "../content";
import { faceFrom } from "../lib/face";
import { money } from "../lib/cart";
import { FaceOutline } from "../components/FaceOutline";

export function FaceShapes() {
  const fromLink = faces.find(
    (f) =>
      f.id ===
      new URLSearchParams(window.location.hash.split("?")[1]).get("face"),
  )?.id;
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [picked, setPicked] = useState<FaceShape | undefined>(fromLink);
  const [frameId, setFrameId] = useState<string>();
  const [colourIndex, setColourIndex] = useState(0);

  const complete = answers.widest && answers.length && answers.jaw;
  const result =
    picked ?? (complete ? faceFrom(answers as Answers) : undefined);
  const info = faces.find((f) => f.id === result);
  const matches = result ? frames.filter((f) => f.faces.includes(result)) : [];
  const frame = matches.find((f) => f.id === frameId) ?? matches[0];
  const colour =
    frame?.colours[Math.min(colourIndex, frame.colours.length - 1)];
  const remaining = finder.questions.filter((q) => !answers[q.id]).length;

  function answer(id: keyof Answers, value: string) {
    setAnswers({ ...answers, [id]: value });
    setPicked(undefined);
    setFrameId(undefined);
  }

  function pick(id: FaceShape) {
    setPicked(id);
    setAnswers({});
    setFrameId(undefined);
  }

  function reset() {
    setAnswers({});
    setPicked(undefined);
    setFrameId(undefined);
  }

  return (
    <div className="page finder-page">
      <header className="page-head">
        <h1>{finder.title}</h1>
        <p className="lede">{finder.intro}</p>
      </header>

      <div className="finder">
        <div className="finder-questions">
          {finder.questions.map((q, i) => (
            <fieldset key={q.id} className="question">
              <legend>
                <span className="q-num">{i + 1} of 3</span> {q.label}
              </legend>
              <div className="pill-group">
                {q.options.map((o) => (
                  <label key={o.value} className="pill-option">
                    <input
                      type="radio"
                      name={q.id}
                      value={o.value}
                      checked={answers[q.id] === o.value}
                      onChange={() => answer(q.id, o.value)}
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="direct">
            <h2>Already know your face shape?</h2>
            <div
              className="pill-group"
              role="group"
              aria-label="Choose a face shape"
            >
              {faces.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="pill-option-button"
                  aria-pressed={picked === f.id}
                  onClick={() => pick(f.id)}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="text-button"
            onClick={reset}
            disabled={!result && !remaining}
          >
            <RotateCcw size={16} aria-hidden="true" /> Start again
          </button>
        </div>

        <section
          className="mirror"
          aria-labelledby="mirror-title"
          data-ready={info ? "" : undefined}
        >
          <FaceOutline
            face={result ?? "oval"}
            frame={frame}
            colour={colour}
            label={
              info && frame && colour
                ? `${info.name} face outline wearing ${frame.name} in ${colour.name}`
                : "Face outline waiting for your answers"
            }
            className="mirror-face"
          />
          <div className="mirror-text" aria-live="polite">
            {info ? (
              <>
                <h2 id="mirror-title">{info.name} face</h2>
                <p>{info.summary}</p>
                <p className="advice">{info.advice}</p>
                <p className="avoid">
                  <strong>Go easy on:</strong> {info.avoid}
                </p>
              </>
            ) : (
              <>
                <h2 id="mirror-title">Your result appears here</h2>
                <p>
                  {remaining} {remaining === 1 ? "question" : "questions"} to
                  go, or choose a face shape directly.
                </p>
              </>
            )}
          </div>

          {info && frame && colour && (
            <div className="try-on">
              <h3>Try on the outline</h3>
              <div
                className="try-frames"
                role="group"
                aria-label="Frames that suit this face"
              >
                {matches.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={f === frame}
                    onClick={() => {
                      setFrameId(f.id);
                      setColourIndex(0);
                    }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              <div
                className="swatches small"
                role="group"
                aria-label={`${frame.name} colours`}
              >
                {frame.colours.map((c, i) => (
                  <button
                    key={c.code}
                    type="button"
                    className="swatch-button"
                    aria-pressed={c === colour}
                    aria-label={c.name}
                    onClick={() => setColourIndex(i)}
                  >
                    <span
                      style={{ background: c.rim }}
                      data-finish={c.finish}
                    />
                  </button>
                ))}
              </div>
              <Link to={`/frames/${frame.id}`} className="btn">
                {frame.name} in {colour.name}, {money(frame.price)}{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          )}
        </section>
      </div>

      <section className="section shape-guide">
        <h2>All six face shapes</h2>
        <p className="lede">{finder.note}</p>
        <ul className="guide-rows">
          {faces.map((f) => (
            <li key={f.id}>
              <FaceOutline
                face={f.id}
                label={`${f.name} face outline`}
                className="guide-face"
              />
              <div>
                <h3>{f.name}</h3>
                <p>{f.summary}</p>
              </div>
              <div>
                <p>{f.advice}</p>
                <p className="suits">
                  {f.suits.map((s) => (
                    <span key={s} className="pill">
                      {shapes.find((x) => x.id === s)?.label}
                    </span>
                  ))}
                </p>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  pick(f.id);
                  window.scrollTo({
                    top: 0,
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "instant"
                      : "smooth",
                  });
                }}
              >
                Try {f.name.toLowerCase()} frames
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
