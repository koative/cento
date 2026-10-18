import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { findings, institutes, research } from "../content";
import { longDate } from "../lib/format";
import { Photo } from "../components/Photo";

export function Research() {
  const [filter, setFilter] = useState("all");
  const shown = findings.filter(
    (f) => filter === "all" || f.institute === filter,
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>{research.title}</h1>
        <p className="lead">{research.lead}</p>
      </header>

      <section className="wrap story" aria-labelledby="story-h">
        <Photo
          img={research.story.image}
          className="story-photo"
          eager
          caption="Clean glassware in the Coastal Change lab, ready for the next batch of marsh sediment samples."
        />
        <div className="story-text">
          <h2 id="story-h">{research.story.title}</h2>
          <p>{research.story.text}</p>
          <Link to="/events/marsh-lecture" className="text-link">
            Hear Prof. Marlow at the Ferrier Lecture{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="inst-h">
        <div className="section-head">
          <h2 id="inst-h">Five institutes</h2>
          <p>
            Each one brings researchers from at least two faculties together,
            and each takes undergraduate summer researchers every year.
          </p>
        </div>
        <ol className="institutes">
          {institutes.map((i) => (
            <li key={i.id}>
              <Photo img={i.image} className="inst-photo" />
              <div className="inst-text">
                <h3>{i.name}</h3>
                <p className="inst-lead">Director: {i.lead}</p>
                <p>{i.text}</p>
                <ul className="tag-list">
                  {i.themes.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-stone" aria-labelledby="find-h">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="find-h">Recent findings</h2>
            <div className="field field-inline">
              <label htmlFor="find-filter">Institute</label>
              <select
                id="find-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All institutes</option>
                {institutes.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ul className="finding-table" aria-live="polite">
            {shown.map((f) => (
              <li key={f.title}>
                <time dateTime={f.date}>{longDate(f.date)}</time>
                <span className="finding-title">{f.title}</span>
                <span className="finding-inst">
                  {institutes.find((i) => i.id === f.institute)?.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap phd" aria-labelledby="phd-h">
        <h2 id="phd-h">Doctoral study</h2>
        <p>{research.phd}</p>
        <div className="btn-row">
          <Link
            to="/events/postgraduate-open-evening"
            className="btn btn-primary"
          >
            Postgraduate open evening
          </Link>
          <Link to="/programmes" className="btn btn-outline">
            Master's programmes
          </Link>
        </div>
      </section>
    </>
  );
}
