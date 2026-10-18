import { useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, navigate } from "../router";
import {
  applySteps,
  campus,
  days,
  events,
  faculties,
  findings,
  halls,
  home,
  hours,
  images,
  institutes,
  keyDates,
  programmes,
  research,
  societies,
  studentVoice,
} from "../content";
import { ProgrammeRow } from "../components/ProgrammeRow";
import { EventRow } from "../components/EventRow";
import { Photo } from "../components/Photo";
import { dateParts, longDate, money } from "../lib/format";

export function Home() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");
  const sample = programmes[0];
  const sampleYear = sample.plan[0].modules.filter((m) => m.core);
  const cheapest = Math.min(...halls.map((h) => h.week));

  const find = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (level !== "all") params.set("level", level);
    navigate(`/programmes${params.size ? "?" + params : ""}`);
  };

  return (
    <>
      <section className="cover">
        <div className="wrap cover-grid">
          <div className="cover-text">
            <h1 className="display">{home.title}</h1>
            <p className="lead">{home.lead}</p>
            <form className="finder-mini" role="search" onSubmit={find}>
              <div className="finder-mini-field">
                <label htmlFor="home-q">Search programmes</label>
                <input
                  id="home-q"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="History, law, data…"
                />
              </div>
              <div className="finder-mini-field">
                <label htmlFor="home-level">Level</label>
                <select
                  id="home-level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="all">All levels</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
              <button className="btn btn-primary" type="submit">
                <Search aria-hidden="true" /> Find
              </button>
            </form>
          </div>
          <Photo
            img={images.hero}
            caption={home.caption}
            className="cover-photo"
            eager
          />
        </div>
        <div className="wrap">
          <ul className="date-strip" aria-label="Key dates">
            {keyDates.map((d) => {
              const p = dateParts(d.date);
              return (
                <li key={d.date}>
                  <Link to={d.to}>
                    <time dateTime={d.date}>
                      {p.day} {p.month} {p.year}
                    </time>
                    <span>{d.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="fac-h">
        <div className="section-head">
          <h2 id="fac-h">Four faculties, one lawn</h2>
          <p>
            Every department is a ten-minute walk from the Old Quad. Choose a
            faculty to see what it teaches.
          </p>
        </div>
        <ul className="faculty-index">
          {faculties.map((f) => {
            const list = programmes.filter((p) => p.faculty === f.id);
            return (
              <li key={f.id}>
                <Photo img={f.image} className="faculty-thumb" />
                <div>
                  <h3>{f.name}</h3>
                  <p>{f.blurb}</p>
                </div>
                <ul className="faculty-progs">
                  {list.map((p) => (
                    <li key={p.id}>
                      <Link to={`/programmes/${p.id}`}>
                        {p.title} <span>{p.award}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section section-stone" aria-labelledby="cat-h">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="cat-h">From the 2027 prospectus</h2>
            <Link to="/programmes" className="text-link">
              All {programmes.length} programmes{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="catalogue">
            {programmes.slice(0, 6).map((p) => (
              <ProgrammeRow key={p.id} p={p} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap voice" aria-label="A student's view">
        <Photo img={images.arches} className="voice-photo" />
        <blockquote>
          <p>{studentVoice.quote}</p>
          <footer>
            <strong>{studentVoice.name}</strong>
            {studentVoice.role}
          </footer>
        </blockquote>
      </section>

      <section className="section wrap plan-teaser" aria-labelledby="plan-h">
        <div>
          <h2 id="plan-h">Draw up your first year before you apply</h2>
          <p>
            Every programme page carries a module planner. Fix the core, choose
            your options, watch the credits reach 120 and see your week take
            shape — then send the plan with your application.
          </p>
          <Link to={`/programmes/${sample.id}`} className="btn btn-primary">
            Try it on {sample.title}
          </Link>
        </div>
        <figure className="mini-week">
          <figcaption className="mini-week-title">
            {sample.code} {sample.title} · {sample.plan[0].label}, core modules
            only
          </figcaption>
          <div className="mini-grid" aria-hidden="true">
            <span />
            {days.map((d) => (
              <span key={d} className="mini-day">
                {d}
              </span>
            ))}
            {hours.map((h) => (
              <div key={h} className="mini-row">
                <span className="mini-hour">{h}:00</span>
                {days.map((d) => {
                  const m = sampleYear.find((x) =>
                    x.slots.some((s) => s.day === d && s.hour === h),
                  );
                  return (
                    <span
                      key={d}
                      className="mini-cell"
                      data-on={m ? "" : undefined}
                    >
                      {m?.code}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </figure>
      </section>

      <section className="section section-ink" aria-labelledby="res-h">
        <div className="wrap research-feature">
          <div className="research-story">
            <h2 id="res-h">{research.story.title}</h2>
            <p>{research.story.text}</p>
            <Link to="/research" className="text-link text-link-light">
              Research at Quadwell <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <Photo img={images.microscope} className="research-photo" />
          <ul className="finding-list">
            {findings.slice(1, 4).map((f) => (
              <li key={f.title}>
                <time dateTime={f.date}>{longDate(f.date)}</time>
                <span>{f.title}</span>
                <small>
                  {institutes.find((i) => i.id === f.institute)?.name}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="ev-h">
        <div className="section-head section-head-row">
          <h2 id="ev-h">Coming up on campus</h2>
          <Link to="/events" className="text-link">
            All events <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="ev-list">
          {events.slice(0, 4).map((e) => (
            <EventRow key={e.id} e={e} />
          ))}
        </ul>
      </section>

      <section className="section section-stone" aria-labelledby="steps-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="steps-h">From first look to first lecture</h2>
            <p>
              Five steps, about ten months. Admissions answers the phone on
              weekdays, 9:00–17:00.
            </p>
          </div>
          <ol className="steps">
            {applySteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/admissions" className="text-link">
            Entry requirements, fees and funding{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap life-band" aria-labelledby="life-h">
        <Photo img={images.studyGroup} className="life-photo" />
        <div className="life-text">
          <h2 id="life-h">Life between lectures</h2>
          <p>
            Six halls from {money(cheapest)} a week, all within a fifteen-minute
            walk. {campus.societyCount} societies, a 25-metre pool, free
            lunchtime concerts every Wednesday and a city that stays up later
            than you'd think.
          </p>
          <p className="life-tags">{societies.slice(0, 8).join(" · ")}</p>
          <Link to="/campus-life" className="btn btn-outline">
            Campus life
          </Link>
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <img
          src={images.graduation.src}
          alt=""
          width={images.graduation.w}
          height={images.graduation.h}
          loading="lazy"
        />
        <div className="wrap close-inner">
          <h2 id="close-h">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="btn-row">
            <Link to="/apply" className="btn btn-light">
              Start your application
            </Link>
            <Link to="/events/autumn-open-day" className="btn btn-ghost-light">
              Book the open day
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
