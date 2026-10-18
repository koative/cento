import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { brand, classes, type BakeClass } from "../content";
import { Link } from "../router";
import { money } from "../lib/cart";
import { dayLabel, fromIso } from "../lib/time";

const levels: (BakeClass["level"] | "All")[] = [
  "All",
  "Beginner",
  "Confident",
  "Family",
];

export function Classes() {
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const list = classes.filter((c) => level === "All" || c.level === level);

  return (
    <>
      <header className="page-head">
        <h1>Baking classes</h1>
        <p className="lede">
          Small classes in the old print room above the shop: eight benches, a
          teaching oven, and the same flour we use downstairs. Everything you
          make goes home with you.
        </p>
      </header>

      <section className="section" aria-label="Classes">
        <fieldset className="chips">
          <legend>Level</legend>
          {levels.map((l) => (
            <label key={l} className="chip">
              <input
                type="radio"
                name="level"
                checked={level === l}
                onChange={() => setLevel(l)}
              />
              {l}
            </label>
          ))}
        </fieldset>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "class" : "classes"}
        </p>

        <ul className="class-list">
          {list.map((c) => {
            const next = c.sessions.find((s) => s.left > 0);
            return (
              <li key={c.id} className="class-row">
                <img
                  src={c.image}
                  alt=""
                  width={600}
                  height={450}
                  loading="lazy"
                />
                <div className="class-row-body">
                  <h2>
                    <Link to={`/classes/${c.id}`}>{c.name}</Link>
                  </h2>
                  <p>{c.summary}</p>
                  <p className="class-meta">
                    <span>{c.level}</span>
                    <span>{c.duration}</span>
                    <span>with {c.teacher}</span>
                  </p>
                </div>
                <div className="class-row-side">
                  <span className="class-price">{money(c.price)}</span>
                  <span>
                    {next
                      ? `Next: ${dayLabel(fromIso(next.date))}, ${next.left} left`
                      : "All dates full"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section split-note">
        <h2>Private classes for six to eight</h2>
        <p>
          Birthdays, team days, a sourdough intervention for a friend. We run
          any class privately on weekday evenings from $780 for the room.
        </p>
        <a
          className="text-link"
          href={`mailto:${brand.email}?subject=Private%20class`}
        >
          Email us about a private class{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </section>
    </>
  );
}
