import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  campus,
  halls,
  images,
  societies,
  studentVoice,
  support,
} from "../content";
import { money } from "../lib/format";
import { CampusMap } from "../components/CampusMap";
import { Photo } from "../components/Photo";

type Catering = "all" | "catered" | "self";
type HallSort = "price" | "walk";

export function CampusLife() {
  const [catering, setCatering] = useState<Catering>("all");
  const [ensuite, setEnsuite] = useState(false);
  const [sort, setSort] = useState<HallSort>("price");

  const list = halls
    .filter((h) => catering === "all" || (catering === "catered") === h.catered)
    .filter((h) => !ensuite || h.ensuite)
    .sort((a, b) => (sort === "price" ? a.week - b.week : a.walk - b.walk));

  return (
    <>
      <header className="page-head wrap page-head-photo">
        <div>
          <h1>{campus.title}</h1>
          <p className="lead">{campus.lead}</p>
        </div>
        <Photo
          img={images.readingRoom}
          caption="The Fenwick Library reading room, open 24 hours in term."
          eager
        />
      </header>

      <section className="section wrap" aria-labelledby="halls-h">
        <div className="section-head">
          <h2 id="halls-h">Halls of residence</h2>
          <p>
            Every first-year undergraduate who applies by 31 March is guaranteed
            a room. {campus.hallsNote}
          </p>
        </div>

        <div className="hall-controls">
          <fieldset className="segmented">
            <legend className="sr-only">Catering</legend>
            {(
              [
                ["all", "All halls"],
                ["catered", "Catered"],
                ["self", "Self-catered"],
              ] as const
            ).map(([v, label]) => (
              <label key={v}>
                <input
                  type="radio"
                  name="catering"
                  checked={catering === v}
                  onChange={() => setCatering(v)}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <label className="check">
            <input
              type="checkbox"
              checked={ensuite}
              onChange={(e) => setEnsuite(e.target.checked)}
            />
            <span>En-suite only</span>
          </label>
          <div className="field field-inline">
            <label htmlFor="hall-sort">Sort</label>
            <select
              id="hall-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as HallSort)}
            >
              <option value="price">Lowest price first</option>
              <option value="walk">Closest to the quad</option>
            </select>
          </div>
          <p className="results-count small" aria-live="polite">
            {list.length} of {halls.length} halls
          </p>
        </div>

        {list.length ? (
          <ul className="halls">
            {list.map((h) => (
              <li key={h.id}>
                <div className="hall-name">
                  <h3>{h.name}</h3>
                  <p>
                    {h.catered ? "Catered" : "Self-catered"} ·{" "}
                    {h.ensuite ? "En-suite" : "Shared bathroom"} · {h.rooms}{" "}
                    rooms
                  </p>
                </div>
                <p className="hall-note">{h.note}</p>
                <dl className="hall-facts">
                  <div>
                    <dt>Per week</dt>
                    <dd className="num">{money(h.week)}</dd>
                  </div>
                  <div>
                    <dt>Contract</dt>
                    <dd className="num">{h.weeks} weeks</dd>
                  </div>
                  <div>
                    <dt>Walk to quad</dt>
                    <dd className="num">{h.walk} min</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No catered hall has only en-suite rooms on that filter — Ashgrove
              House is the nearest match.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setEnsuite(false)}
            >
              Show shared-bathroom halls too
            </button>
          </div>
        )}
      </section>

      <section className="section section-stone" aria-labelledby="map-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="map-h">The campus on one page</h2>
            <p>
              From the Foundry Labs on the river to the Medical School by the
              Infirmary, it is twelve minutes on foot end to end.
            </p>
          </div>
          <CampusMap />
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="soc-h">
        <div>
          <h2 id="soc-h">{campus.societyCount} societies and clubs</h2>
          <p>
            Run by students through the Students' Union, with a grant for every
            society and the Cellar, the Union's own venue, for anything that
            needs a stage. A few of them:
          </p>
          <ul className="society-list">
            {societies.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <Photo
          img={images.orchestra}
          caption="The University Orchestra rehearses on Tuesday nights; anyone can audition."
        />
      </section>

      <section
        className="section wrap voice voice-flip"
        aria-label="A student's view"
      >
        <blockquote>
          <p>{studentVoice.quote}</p>
          <footer>
            <strong>{studentVoice.name}</strong>
            {studentVoice.role}
          </footer>
        </blockquote>
        <Photo img={images.studyGroup} className="voice-photo" />
      </section>

      <section className="section section-ink" aria-labelledby="sup-h">
        <div className="wrap">
          <h2 id="sup-h">Someone to ask</h2>
          <dl className="support-list">
            {support.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
          <Link to="/events" className="text-link text-link-light">
            See campus for yourself at an open day{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
