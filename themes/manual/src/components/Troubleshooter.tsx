import { useEffect, useRef, useState } from "react";
import { ArrowRight, CircleCheck, LifeBuoy, RotateCcw } from "lucide-react";
import { Link, navigate } from "../router";
import type { Flow } from "../content";
import { articleBySlug, codeOf } from "../lib/manual";
import { setHandoff } from "../lib/forms";

type Answered = { id: string; answer: string };

/**
 * A printed-manual flowchart you can walk: each answer is pinned to the spine above the
 * current question, any earlier answer can be changed, and dead ends hand the whole path to support.
 */
export function Troubleshooter({ flow }: { flow: Flow }) {
  const [trail, setTrail] = useState<Answered[]>([]);
  const [current, setCurrent] = useState(flow.start);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const step = flow.steps[current];

  useEffect(() => {
    if (moved.current) heading.current?.focus({ preventScroll: false });
  }, [current, trail.length]);

  const question = (id: string) => {
    const s = flow.steps[id];
    return s.kind === "ask" ? s.text : "";
  };

  const answer = (label: string, next: string) => {
    moved.current = true;
    setTrail((t) => [...t, { id: current, answer: label }]);
    setCurrent(next);
  };

  const rewind = (i: number) => {
    moved.current = true;
    setCurrent(trail[i].id);
    setTrail((t) => t.slice(0, i));
  };

  const escalate = (topic: string) => {
    setHandoff({
      flow: flow.title,
      topic,
      trail: trail.map((t) => ({ q: question(t.id), a: t.answer })),
    });
    navigate("/contact");
  };

  const article =
    step.kind === "fix" && step.article
      ? articleBySlug(step.article)
      : undefined;

  return (
    <div className="ts">
      <ol className="ts-spine">
        {trail.map((t, i) => (
          <li key={t.id} className="ts-node ts-done">
            <span className="ts-step">Step {i + 1}</span>
            <p className="ts-q">{question(t.id)}</p>
            <p className="ts-a">
              <span>{t.answer}</span>
              <button
                type="button"
                className="link-btn"
                onClick={() => rewind(i)}
              >
                Change<span className="sr-only"> answer to step {i + 1}</span>
              </button>
            </p>
          </li>
        ))}

        <li key={current} className="ts-node ts-current" data-kind={step.kind}>
          {step.kind === "ask" && (
            <>
              <span className="ts-step">Step {trail.length + 1}</span>
              <h3 ref={heading} tabIndex={-1}>
                {step.text}
              </h3>
              {step.detail && <p className="ts-detail">{step.detail}</p>}
              <div className="ts-options">
                {step.options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    className="ts-option"
                    onClick={() => answer(o.label, o.next)}
                  >
                    <span>{o.label}</span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            </>
          )}

          {step.kind === "fix" && (
            <>
              <span className="ts-step ts-step-fix">
                <CircleCheck aria-hidden="true" /> Likely fix
              </span>
              <h3 ref={heading} tabIndex={-1}>
                {step.title}
              </h3>
              <p>{step.text}</p>
              <div className="ts-actions">
                {article && (
                  <Link
                    to={`/articles/${article.slug}`}
                    className="btn btn-ink"
                  >
                    Read {codeOf(article)}: {article.title}
                  </Link>
                )}
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={() => escalate(flow.category)}
                >
                  Didn't work? Send this to support
                </button>
              </div>
            </>
          )}

          {step.kind === "escalate" && (
            <>
              <span className="ts-step ts-step-escalate">
                <LifeBuoy aria-hidden="true" /> Hand over to support
              </span>
              <h3 ref={heading} tabIndex={-1}>
                {step.title}
              </h3>
              <p>{step.text}</p>
              <div className="ts-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => escalate(step.topic)}
                >
                  Send these {trail.length} answers to support
                </button>
              </div>
            </>
          )}
        </li>
      </ol>

      {trail.length > 0 && (
        <button
          type="button"
          className="link-btn ts-restart"
          onClick={() => rewind(0)}
        >
          <RotateCcw aria-hidden="true" /> Start over
        </button>
      )}
    </div>
  );
}
