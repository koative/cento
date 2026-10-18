import { ArrowRight } from "lucide-react";
import { coach, images, pathway, results, squads, youthFaq } from "../content";
import { Link } from "../router";
import { money } from "../lib/format";

export function Youth() {
  const head = coach("sam");
  return (
    <>
      <section className="detail-hero wrap">
        <div className="detail-copy">
          <h1>Youth team</h1>
          <p className="lead">
            Three squads for climbers aged 6 to 18, coached by the people who
            set the walls. Some kids come for the games, some for the podiums;
            everyone learns to fall well, try hard and cheer for each other.
          </p>
          <div className="actions">
            <Link to="/classes/youth-taster" className="btn btn-tape">
              Book a Youth Taster <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              to="/events/youth-regional-qualifier"
              className="btn btn-line"
            >
              Regional qualifier, Dec 5
            </Link>
          </div>
        </div>
        <img
          src={images.youth}
          alt="A child in a harness reaching up a blue indoor climbing wall"
          className="detail-img"
          width={998}
          height={1500}
        />
      </section>

      <section className="wrap" aria-labelledby="path-title">
        <h2 id="path-title">From first climb to team hoodie</h2>
        <ol className="pathway">
          {pathway.map((p, i) => (
            <li key={p.title}>
              <span className="path-step" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap" aria-labelledby="squads-title">
        <h2 id="squads-title" className="h-sm">
          Squads this term
        </h2>
        <ul className="squad-table">
          {squads.map((s) => (
            <li key={s.id}>
              <h3>{s.name}</h3>
              <p className="sq-ages">Ages {s.ages}</p>
              <p className="sq-when">{s.when}</p>
              <p className="sq-text">{s.text}</p>
              <p className="num sq-fee">{money(s.fee)} / term</p>
            </li>
          ))}
        </ul>
        <p className="fine">
          Terms run ten weeks. Siblings get 10% off; funded places available —
          ask at the desk.
        </p>
      </section>

      <section className="band-dark" aria-labelledby="results-title">
        <div className="wrap results-grid">
          <div>
            <h2 id="results-title">This season</h2>
            <p className="lead-sm">
              Coached by {head.name}. {head.bio}
            </p>
          </div>
          <ul className="results">
            {results.map((r) => (
              <li key={r.event}>
                <span className="res-date">{r.date}</span>
                <strong>{r.event}</strong>
                <span>{r.result}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="yfaq-title">
        <h2 id="yfaq-title">For parents</h2>
        {youthFaq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
