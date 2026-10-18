import { useState } from "react";
import {
  Accessibility,
  ArrowLeft,
  Check,
  Clock,
  Plus,
  Ticket,
  Users,
} from "lucide-react";
import { Link, navigate } from "../router";
import { exhibits, type Exhibit } from "../content";
import { clock } from "../lib/format";
import { toggleStop, usePlan } from "../lib/plan";
import { ExhibitCard } from "../components/ExhibitCard";
import { FloorMap } from "../components/FloorMap";
import { Shape } from "../components/Shape";

export function ExhibitPage({ ex }: { ex: Exhibit }) {
  const plan = usePlan();
  const planned = plan.stops.includes(ex.slug);
  const [tried, setTried] = useState<string[]>([]);
  const related = ex.related
    .map((s) => exhibits.find((e) => e.slug === s))
    .filter((e): e is Exhibit => !!e);

  return (
    <>
      <section className="ex-hero wrap" data-swatch={ex.swatch}>
        <div className="ex-hero-copy">
          <Link to="/exhibits" className="back-link">
            <ArrowLeft aria-hidden="true" /> All exhibits
          </Link>
          <Shape kind={ex.shape} swatch={ex.swatch} className="ex-hero-shape" />
          <h1>{ex.name}</h1>
          <p className="ex-hero-sign">{ex.sign}</p>
          <dl className="plate">
            <div>
              <dt>For</dt>
              <dd>{ex.ageLabel}</dd>
            </div>
            <div>
              <dt>Stay</dt>
              <dd>About {ex.stay} min</dd>
            </div>
            <div>
              <dt>Noise</dt>
              <dd>{ex.noise}</dd>
            </div>
            <div>
              <dt>Mess</dt>
              <dd>{ex.mess}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{ex.floor}</dd>
            </div>
          </dl>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-ink"
              aria-pressed={planned}
              onClick={() => toggleStop(ex.slug)}
            >
              {planned ? (
                <Check aria-hidden="true" />
              ) : (
                <Plus aria-hidden="true" />
              )}
              {planned ? "In our day plan" : "Add to our day plan"}
            </button>
            <Link to="/tickets" className="btn btn-line">
              <Ticket aria-hidden="true" /> Book tickets
            </Link>
          </div>
          <p className="sr-only" aria-live="polite">
            {planned ? `${ex.name} is in your day plan.` : ""}
          </p>
        </div>
        <div className="ex-hero-photo">
          <img src={ex.image} alt={ex.alt} width={1280} height={960} />
        </div>
      </section>

      <section className="section wrap ex-body">
        <div className="prose">
          <p className="lede">{ex.intro}</p>
          {ex.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <aside className="try" aria-labelledby="try-title">
          <h2 id="try-title">Things to try</h2>
          <p className="try-count" aria-live="polite">
            {tried.length} of {ex.tryThis.length} done
            {tried.length === ex.tryThis.length ? ". Gallery complete!" : ""}
          </p>
          <ul>
            {ex.tryThis.map((t) => (
              <li key={t}>
                <label>
                  <input
                    type="checkbox"
                    checked={tried.includes(t)}
                    onChange={() =>
                      setTried((cur) =>
                        cur.includes(t)
                          ? cur.filter((x) => x !== t)
                          : [...cur, t],
                      )
                    }
                  />
                  <span>{t}</span>
                </label>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section-tight wrap ex-info">
        <div>
          <h2>
            <Clock aria-hidden="true" /> Today’s sessions
          </h2>
          {ex.sessions.length ? (
            <ul className="session-list">
              {ex.sessions.map((s) => (
                <li key={s.time}>
                  <strong className="tnum">{clock(s.time)}</strong> {s.title}{" "}
                  <small>{s.minutes} min, free with admission</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No scheduled sessions: The Climb is open all day, staffed at the
              top and bottom.
            </p>
          )}
        </div>
        <div>
          <h2>
            <Users aria-hidden="true" /> For grown-ups
          </h2>
          <p>{ex.grownUps}</p>
        </div>
        <div>
          <h2>
            <Accessibility aria-hidden="true" /> Access
          </h2>
          <p>{ex.access}</p>
        </div>
      </section>

      <section className="section wrap ex-where" aria-labelledby="where-title">
        <div className="section-head">
          <h2 id="where-title">Where to find it</h2>
          <p>{ex.name} is highlighted. Tap any other room to go there.</p>
        </div>
        <FloorMap
          label={`Floor map with ${ex.name} highlighted`}
          selected={ex.slug}
          onSelect={(slug) => navigate(`/exhibits/${slug}`)}
          order={plan.stops}
        />
      </section>

      <section className="section wrap" aria-labelledby="related-title">
        <h2 id="related-title">Nearby, and just as good</h2>
        <div className="ex-grid">
          {related.map((r) => (
            <ExhibitCard key={r.slug} ex={r} />
          ))}
        </div>
      </section>
    </>
  );
}
