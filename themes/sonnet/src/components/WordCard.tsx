import { useState } from "react";
import { courses, languages } from "../content";
import { langStyle, MoreLink } from "./Bits";

/** The first word in six languages: a vocabulary card that re-inks itself when you pick another language. */
export function WordCard() {
  const [i, setI] = useState(0);
  const l = languages[i];
  const count = courses.filter((c) => c.lang === l.id).length;
  return (
    <div className="word-card" style={langStyle(l.color)}>
      <div className="word-ink" key={l.id}>
        <p className="word-top">
          <span>First word</span>
          <span>
            {l.name} · <span lang={l.code}>{l.native}</span>
          </span>
        </p>
        <p className="word-hello" lang={l.code}>
          {l.hello}
          {l.helloScript && (
            <span className="word-script">{l.helloScript}</span>
          )}
        </p>
        <p className="word-pron">/{l.pron}/</p>
        <blockquote>
          <p lang={l.code}>{l.phrase}</p>
          <p className="word-tr">{l.translation}</p>
        </blockquote>
        <MoreLink to={`/courses?lang=${l.id}`}>
          {count} {l.name} {count === 1 ? "course" : "courses"} this term
        </MoreLink>
      </div>
      <div
        className="word-tabs"
        role="group"
        aria-label="Show the first word in"
      >
        {languages.map((x, n) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={n === i}
            onClick={() => setI(n)}
          >
            {x.name}
          </button>
        ))}
      </div>
    </div>
  );
}
