import { useRef, useState } from "react";
import { ArrowRight, Check, Clock, Plus } from "lucide-react";
import { Link } from "../router";
import { ageGroups, exhibits } from "../content";
import { clock } from "../lib/format";
import { suits, toggleAge, toggleStop, usePlan } from "../lib/plan";
import { FloorMap } from "./FloorMap";
import { Shape } from "./Shape";

/** Signature: the museum floor map. Pick who is coming, tap a gallery, add it to your day. */
export function MapExplorer() {
  const plan = usePlan();
  const [selected, setSelected] = useState(exhibits[0].slug);
  const [said, setSaid] = useState("");
  const card = useRef<HTMLElement>(null);
  const ex = exhibits.find((e) => e.slug === selected) ?? exhibits[0];
  const planned = plan.stops.includes(ex.slug);
  const fits = suits(plan.ages, ex.ages);
  const matching = exhibits.filter((e) => suits(plan.ages, e.ages)).length;

  function toggle() {
    toggleStop(ex.slug);
    const count = plan.stops.length + (planned ? -1 : 1);
    setSaid(
      `${ex.name} ${planned ? "removed from" : "added to"} your day. ${count} ${count === 1 ? "gallery" : "galleries"} planned.`,
    );
  }

  return (
    <div className="explorer">
      <fieldset className="chips">
        <legend>Who’s coming?</legend>
        {ageGroups.map((a) => (
          <label key={a.id} className="chip">
            <input
              type="checkbox"
              checked={plan.ages.includes(a.id)}
              onChange={() => toggleAge(a.id)}
            />
            <span>{a.label}</span>
          </label>
        ))}
        <span className="chips-count" aria-live="polite">
          {plan.ages.length
            ? `${matching} of ${exhibits.length} galleries suit your family`
            : "Showing every gallery"}
        </span>
      </fieldset>

      <div className="explorer-body">
        <div className="explorer-map">
          <FloorMap
            label="Museum floor map"
            selected={ex.slug}
            onSelect={(slug) => {
              setSelected(slug);
              // On stacked layouts the room card sits below the map: bring it into view.
              if (matchMedia("(max-width: 1024px)").matches)
                requestAnimationFrame(() =>
                  card.current?.scrollIntoView({
                    block: "nearest",
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "auto"
                      : "smooth",
                  }),
                );
            }}
            isDimmed={(slug) =>
              !suits(plan.ages, exhibits.find((e) => e.slug === slug)!.ages)
            }
            order={plan.stops}
          />
          <p className="map-note">
            Plan not to scale: ground floor, first floor, courtyard and roof
            shown together.
          </p>
        </div>

        <article
          className="room-card"
          data-swatch={ex.swatch}
          key={ex.slug}
          ref={card}
        >
          <Shape kind={ex.shape} swatch={ex.swatch} className="room-shape" />
          <h3>{ex.name}</h3>
          <p className="room-sign">{ex.sign}</p>
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
          </dl>
          {!fits && (
            <p className="room-warn">
              Best for other ages — younger siblings may find it tricky.
            </p>
          )}
          {ex.sessions.length > 0 && (
            <ul className="room-sessions" aria-label="Today’s sessions">
              {ex.sessions.map((s) => (
                <li key={s.time}>
                  <Clock aria-hidden="true" />
                  <span className="tnum">{clock(s.time)}</span> {s.title}
                </li>
              ))}
            </ul>
          )}
          <div className="room-actions">
            <button
              type="button"
              className="btn btn-ink"
              aria-pressed={planned}
              onClick={toggle}
            >
              {planned ? (
                <Check aria-hidden="true" />
              ) : (
                <Plus aria-hidden="true" />
              )}
              {planned ? "In our day" : "Add to our day"}
            </button>
            <Link to={`/exhibits/${ex.slug}`} className="text-link">
              About {ex.name} <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
    </div>
  );
}
