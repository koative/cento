import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { careers, images, jobs } from "../content";
import { Steps } from "../components/Steps";

export function Careers() {
  const [team, setTeam] = useState("All");
  const teams = ["All", ...new Set(jobs.map((j) => j.team))];
  const shown = jobs.filter((j) => team === "All" || j.team === team);

  return (
    <>
      <section className="page-head night careers-head">
        <img
          className="head-photo"
          src={images.testStand.src}
          alt=""
          width={images.testStand.w}
          height={images.testStand.h}
        />
        <div className="wrap">
          <h1>Careers</h1>
          <p className="lede">{careers.intro}</p>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="section-head">
            <h2>Open roles</h2>
            <div
              className="segmented wrap-ok"
              role="radiogroup"
              aria-label="Team"
            >
              {teams.map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    name="team"
                    checked={team === t}
                    onChange={() => setTeam(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>
          <ul className="job-list">
            {shown.map((j) => (
              <li key={j.slug}>
                <Link to={`/careers/${j.slug}`}>
                  <span className="job-title">
                    <strong>{j.title}</strong>
                    <span>{j.summary}</span>
                  </span>
                  <span className="job-meta">
                    <span>{j.team}</span>
                    <span>{j.location}</span>
                    <span className="tnum">{j.salary}</span>
                  </span>
                  <ArrowRight aria-hidden="true" size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap split">
          <div>
            <h2>What you get</h2>
            <dl className="benefits">
              {careers.benefits.map((b) => (
                <div key={b.title}>
                  <dt>{b.title}</dt>
                  <dd>{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <img
            src={images.integration.src}
            alt={images.integration.alt}
            width={images.integration.w}
            height={images.integration.h}
            loading="lazy"
            className="rounded-photo tall"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>How we hire</h2>
          <Steps steps={careers.process} />
        </div>
      </section>
    </>
  );
}
