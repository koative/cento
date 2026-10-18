import { useState } from "react";
import { days, vets, type Day } from "../content";
import { VetCard } from "../components/VetCard";

const dayNames: Record<Day, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

export function Vets() {
  const [day, setDay] = useState<Day | "any">("any");
  const shown = vets.filter((v) => day === "any" || v.days.includes(day));
  const vetsShown = shown.filter((v) => v.bookable);
  const nursesShown = shown.filter((v) => !v.bookable);

  return (
    <>
      <section className="page-head wrap">
        <h1>Vets & nurses</h1>
        <p className="lede">
          Six clinicians, about seventy years of practice between us, and six
          pets at home who keep us humble. Book the same person each time —
          continuity is our default.
        </p>
      </section>

      <section className="section wrap" aria-label="Team">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Who's in on">
            <button
              type="button"
              className="chip"
              aria-pressed={day === "any"}
              onClick={() => setDay("any")}
            >
              Whole team
            </button>
            {days.map((d) => (
              <button
                key={d}
                type="button"
                className="chip"
                aria-pressed={day === d}
                onClick={() => setDay(d)}
              >
                <span aria-hidden="true">{d}</span>
                <span className="sr-only">{dayNames[d]}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {day === "any"
            ? "Everyone at Whisker"
            : `In clinic on ${dayNames[day]}: ${shown.length} of ${vets.length}`}
        </p>

        {vetsShown.length > 0 && (
          <>
            <h2 className="group-title">Veterinarians</h2>
            <div className="vet-row">
              {vetsShown.map((v) => (
                <VetCard key={v.slug} vet={v} />
              ))}
            </div>
          </>
        )}
        {nursesShown.length > 0 && (
          <>
            <h2 className="group-title">Nurses</h2>
            <div className="vet-row">
              {nursesShown.map((v) => (
                <VetCard key={v.slug} vet={v} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="section wrap split-note">
        <h2>Joining the team</h2>
        <p>
          We hire a newly qualified vet every two years and mentor them for the
          first eighteen months. If that's you, write to{" "}
          <a href="mailto:jobs@whisker.example">jobs@whisker.example</a> with a
          note about the case you learned most from.
        </p>
      </section>
    </>
  );
}
