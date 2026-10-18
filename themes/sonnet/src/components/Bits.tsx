import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import type { Course, Gloss, Question } from "../content";
import { langOf, levelText, money, schedule, shortDate } from "../lib/format";

export function PageHead({
  title,
  lead,
  gloss,
  children,
}: {
  title: string;
  lead: string;
  gloss?: Gloss;
  children?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
      {gloss && (
        <p className="gloss">
          <b>{gloss.word}</b> <span className="pron">/{gloss.pron}/</span>{" "}
          <i>{gloss.pos}</i> {gloss.def}
        </p>
      )}
    </div>
  );
}

export const langStyle = (color: string) =>
  ({ "--lang": color }) as CSSProperties;

/** One course as a ledger row: language, title and summary, when, price. */
export function CourseRow({
  course,
  level = 3,
}: {
  course: Course;
  level?: 2 | 3;
}) {
  const lang = langOf(course.lang);
  const H = level === 2 ? "h2" : "h3";
  return (
    <li className="course-row" style={langStyle(lang.color)}>
      <p className="course-lang">
        <span className="lang-name">{lang.name}</span>
        <span className="level-tag">{levelText(course)}</span>
      </p>
      <div className="course-main">
        <H>
          <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </H>
        <p>{course.summary}</p>
      </div>
      <p className="course-when">
        <span>{schedule(course.sessions)}</span>
        <span>
          {course.format} · starts {shortDate(course.start)}
        </span>
      </p>
      <p className="course-price">
        <span className="num">{money(course.price)}</span>
        <span className={course.seatsLeft <= 2 ? "seats low" : "seats"}>
          {course.seatsLeft} {course.seatsLeft === 1 ? "place" : "places"} left
        </span>
      </p>
    </li>
  );
}

/** A test sentence with the chosen word in the gap, marked in red pen the way a teacher would. */
export function Marked({
  q,
  chosen,
  lang,
}: {
  q: Question;
  chosen: number | null;
  lang: string;
}) {
  const [before, after] = q.prompt.split("___");
  const right = chosen === q.answer;
  return (
    <p className="marked" lang={lang}>
      {before}
      <span className={"gap " + (right ? "is-right" : "is-wrong")}>
        {right ? (
          <>
            {q.options[q.answer]}
            <Check
              className="tick"
              size={18}
              strokeWidth={2.5}
              aria-label="correct"
            />
          </>
        ) : (
          <>
            {chosen !== null && (
              <del>
                <span className="vh">your answer: </span>
                {q.options[chosen]}
              </del>
            )}
            <ins>
              <span className="vh">correct answer: </span>
              {q.options[q.answer]}
            </ins>
          </>
        )}
      </span>
      {after}
    </p>
  );
}

export function MoreLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className="more">
      {children} <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
