import { ArrowRight, Check, PlayCircle } from "lucide-react";
import { Link } from "../router";
import {
  courses,
  home,
  instructors,
  pricing,
  subjects,
  workspace,
} from "../content";
import { CourseTile } from "../components/course";
import { LensStudy } from "../components/LensStudy";

export default function Home() {
  const featured = home.featured.map((slug) =>
    courses.find((c) => c.slug === slug)!,
  );
  const [lead, ...rest] = featured;
  const membership = pricing.plans.find((p) => p.id === "membership")!;
  const peak = Math.max(...home.week.map((d) => d.minutes));
  const firstLesson = workspace.lessons[0];

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>
            {home.heroTitle[0]}{" "}
            <mark className="hl hl-draw">{home.heroTitle[1]}</mark>{" "}
            {home.heroTitle[2]}
          </h1>
          <p className="lede">{home.heroText}</p>
          <div className="actions">
            <Link to="/courses" className="btn btn-primary btn-lg">
              Browse all courses <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              to={`/learn/${firstLesson.id}`}
              className="btn btn-quiet btn-lg"
            >
              <PlayCircle size={18} aria-hidden /> Try a free lesson
            </Link>
          </div>
          <p className="hero-note">{home.heroNote}</p>
        </div>
        <figure className="hero-figure">
          <img
            src={home.hero}
            alt={home.heroImageAlt}
            width={1800}
            height={1200}
            fetchPriority="high"
          />
          <figcaption className="hero-lesson">
            <span className="hero-lesson-course">
              Learning to See · Lesson 2 of 5
            </span>
            <span className="hero-lesson-title">
              {workspace.lessons[1].title}
            </span>
            <span className="meter" aria-hidden="true">
              <span style={{ width: "40%" }} />
            </span>
            <span className="hero-lesson-foot num">
              9 min · notes saved 2 min ago
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Popular this season</h2>
          <Link to="/courses" className="text-link">
            See all {courses.length} courses{" "}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="featured">
          <CourseTile course={lead} large />
          <div className="featured-rest">
            {rest.map((c) => (
              <CourseTile key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap subjects">
        <div className="subjects-intro">
          <h2>{home.subjectsTitle}</h2>
          <p>{home.subjectsText}</p>
        </div>
        <ul className="subject-index">
          {subjects.map((s) => {
            const list = courses.filter((c) => c.subject === s);
            return (
              <li key={s}>
                <a href={`#/courses?subject=${s}`}>
                  <span className="subject-name">{s}</span>
                  <span className="subject-courses">
                    {list.map((c) => c.title).join(" · ")}
                  </span>
                  <span className="subject-count num">
                    {list.length} {list.length === 1 ? "course" : "courses"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head stacked">
            <h2>{home.weekTitle}</h2>
            <p>{home.weekText}</p>
          </div>
          <ol className="week">
            {home.week.map((d) => (
              <li key={d.day}>
                <p className="week-day">{d.day}</p>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <span className="week-bar" aria-hidden="true">
                  <span style={{ width: `${(d.minutes / peak) * 100}%` }} />
                </span>
                <p className="week-min num">{d.minutes} min</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap pull">
        <blockquote>
          <p>“{home.quote.text}”</p>
          <footer>
            <strong>{home.quote.name}</strong> — {home.quote.note}
          </footer>
        </blockquote>
      </section>

      <section className="section ink-band">
        <div className="wrap workspace-teaser">
          <div className="workspace-copy">
            <h2>{home.workspaceTitle}</h2>
            <p>{home.workspaceText}</p>
            <ul className="ticks">
              {home.workspacePoints.map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden /> {p}
                </li>
              ))}
            </ul>
            <Link to="/learn" className="btn btn-marker btn-lg">
              Open the demo workspace <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
          <LensStudy />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Taught by people who still do the work</h2>
          <Link to="/instructors" className="text-link">
            Meet the instructors <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="faces">
          {instructors.map((p) => (
            <li key={p.slug}>
              <Link to={`/instructors/${p.slug}`}>
                <img
                  src={p.image}
                  alt=""
                  width={400}
                  height={500}
                  loading="lazy"
                />
                <span className="faces-name">{p.name}</span>
                <span className="faces-role">{p.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap learners">
        <h2>{home.learnersTitle}</h2>
        <div className="learners-grid">
          {home.learners.map((l) => (
            <figure key={l.alt}>
              <img
                src={l.image}
                alt={l.alt}
                width={1400}
                height={930}
                loading="lazy"
              />
              <figcaption>{l.text}</figcaption>
            </figure>
          ))}
        </div>
        <ul className="stories">
          {home.stories.map((s) => (
            <li key={s.name}>
              <blockquote>
                <p>“{s.text}”</p>
                <footer>
                  <strong>{s.name}</strong>, {s.course}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap price-strip">
        <h2>Two ways to pay</h2>
        <dl>
          <div>
            <dt>Single course</dt>
            <dd>
              <span className="num">from ${pricing.plans[0].monthly}</span> paid
              once, yours for good
            </dd>
          </div>
          <div>
            <dt>Membership</dt>
            <dd>
              <span className="num">${membership.yearly}/month</span> billed
              yearly, with every course included
            </dd>
          </div>
        </dl>
        <Link to="/pricing" className="text-link">
          Compare plans <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create a free account
            </Link>
            <Link
              to={`/learn/${firstLesson.id}`}
              className="btn btn-quiet btn-lg"
            >
              Watch lesson one
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
