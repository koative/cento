import { useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { rooms, type Room } from "../content";
import { GrowthChart } from "../components/GrowthChart";
import { TourCta } from "../components/TourCta";
import { money } from "../lib/fees";

const stages: { id: string; label: string; match: Room["stage"][] }[] = [
  { id: "all", label: "All rooms", match: [] },
  { id: "little", label: "Babies & toddlers", match: ["Infants", "Toddlers"] },
  { id: "nursery", label: "Twos & preschool", match: ["Twos", "Preschool"] },
  { id: "school", label: "School age", match: ["School age"] },
];

const ageText = (m: number) => {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  const parts = [
    y && `${y} year${y > 1 ? "s" : ""}`,
    mo && `${mo} month${mo > 1 ? "s" : ""}`,
  ].filter(Boolean);
  return parts.join(" ") || "newborn";
};

export function Rooms() {
  const [age, setAge] = useState(20);
  const [stage, setStage] = useState("all");
  const filter = stages.find((s) => s.id === stage)!;
  const shown = rooms.filter(
    (r) => !filter.match.length || filter.match.includes(r.stage),
  );
  const mine = rooms.find((r) => age >= r.minMonths && age < r.maxMonths);
  const next = mine && rooms[rooms.indexOf(mine) + 1];

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Rooms by age</h1>
          <p className="lede">
            Six rooms, from first feeds to after-school soccer. Children move up
            when they're ready, usually around the ages below, with a few visits
            to the new room first.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap finder">
          <div className="finder-controls">
            <label htmlFor="age" className="finder-label">
              How old is your child?
            </label>
            <output htmlFor="age" className="finder-age">
              {ageText(age)}
            </output>
            <input
              id="age"
              type="range"
              min={0}
              max={95}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              aria-valuetext={ageText(age)}
            />
            <p className="finder-result" aria-live="polite">
              {mine ? (
                <>
                  That's the <Link to={`/rooms/${mine.id}`}>{mine.name}</Link>{" "}
                  room
                  {next
                    ? `, moving up to ${next.name} in about ${mine.maxMonths - age} month${mine.maxMonths - age > 1 ? "s" : ""}.`
                    : "."}
                </>
              ) : (
                "We take babies from 3 months. Book a tour now: Wrens places go six to nine months ahead."
              )}
            </p>
          </div>
          <GrowthChart
            age={age}
            caption="Typical ages for each room. Exact move-up dates are agreed with you."
          />
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <div
            className="filter-row"
            role="group"
            aria-label="Filter rooms by stage"
          >
            {stages.map((s) => (
              <button
                key={s.id}
                type="button"
                className="chip"
                aria-pressed={s.id === stage}
                onClick={() => setStage(s.id)}
              >
                {s.label}
              </button>
            ))}
            <p className="quiet" aria-live="polite">
              {shown.length} {shown.length === 1 ? "room" : "rooms"}
            </p>
          </div>
          <ul className="room-list">
            {shown.map((r) => (
              <li
                key={r.id}
                className="room-row"
                data-mine={r === mine ? "" : undefined}
                style={{ "--room": r.color } as CSSProperties}
              >
                <Link
                  to={`/rooms/${r.id}`}
                  className="room-row-photo"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={r.image.src}
                    alt=""
                    width={r.image.w}
                    height={r.image.h}
                    loading="lazy"
                  />
                </Link>
                <div className="room-row-body">
                  <p className="room-ages">
                    <span className="dot" aria-hidden="true" /> {r.ages}
                    {r === mine && (
                      <span className="mine-tag">Your child's room</span>
                    )}
                  </p>
                  <h2>
                    <Link to={`/rooms/${r.id}`}>{r.name}</Link>
                  </h2>
                  <p>{r.summary}</p>
                  <dl className="facts">
                    <div>
                      <dt>Ratio</dt>
                      <dd>{r.ratio}</dd>
                    </div>
                    <div>
                      <dt>Places</dt>
                      <dd className="num">{r.places}</dd>
                    </div>
                    <div>
                      <dt>From</dt>
                      <dd className="num">
                        {money(Math.min(...r.sessions.map((s) => s.price)))} /
                        session
                      </dd>
                    </div>
                  </dl>
                  <Link to={`/rooms/${r.id}`} className="text-link">
                    Inside {r.name} <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TourCta title="See the rooms with a child in them." />
    </>
  );
}
