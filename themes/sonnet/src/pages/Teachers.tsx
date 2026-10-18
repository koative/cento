import { useState } from "react";
import { Link } from "../router";
import { courses, glosses, languages, teachers, type LangId } from "../content";
import { langStyle, PageHead } from "../components/Bits";
import { langOf } from "../lib/format";

export function Teachers() {
  const [lang, setLang] = useState<LangId | "">("");
  const shown = teachers.filter((t) => !lang || t.langs.includes(lang));
  return (
    <div className="wrap page">
      <PageHead
        title="Eight teachers, six languages, one staffroom."
        lead="Every Sonnet teacher speaks the language they teach as a first language, holds a teaching qualification and is on a salaried contract. Most of them also argue about grammar over lunch."
        gloss={glosses.teachers}
      />

      <div className="filters">
        <div className="chips" role="group" aria-label="Teaches">
          <button
            type="button"
            aria-pressed={lang === ""}
            onClick={() => setLang("")}
          >
            Everyone
          </button>
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={lang === l.id}
              onClick={() => setLang(l.id)}
              style={langStyle(l.color)}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      <ul className="teacher-list" aria-live="polite">
        {shown.map((t) => {
          const taught = courses.filter((c) => c.teacher === t.id);
          return (
            <li
              key={t.id}
              className="teacher"
              style={langStyle(langOf(t.langs[0]).color)}
            >
              <div className="teacher-name">
                <h2>{t.name}</h2>
                <p className="pron">/{t.pron}/</p>
                <p className="teacher-role">{t.role}</p>
              </div>
              <div className="teacher-body">
                <p className="teacher-facts">
                  <span>
                    {t.langs.map((id) => langOf(id).name).join(" and ")}
                  </span>
                  <span>From {t.from}</span>
                  <span>At Sonnet since {t.since}</span>
                </p>
                <p>{t.bio}</p>
                <p className="fav">
                  Favourite word: <b>{t.word.term}</b>, {t.word.gloss}.
                </p>
                {taught.length > 0 && (
                  <p className="teacher-courses">
                    Teaches{" "}
                    {taught.map((c, n) => (
                      <span key={c.id}>
                        {n > 0 && (n === taught.length - 1 ? " and " : ", ")}
                        <Link to={`/courses/${c.id}`}>{c.title}</Link>
                      </span>
                    ))}
                    .
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="aside-note">
        <h2>Want a particular teacher?</h2>
        <p>
          One-to-one lessons can be booked with any of them. Mention who you
          would like when you <Link to="/enrol">enrol</Link>, and we will match
          diaries.
        </p>
      </aside>
    </div>
  );
}
