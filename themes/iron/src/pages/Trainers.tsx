import { useState } from "react";
import { Link } from "../router";
import { categories, trainers, type CategoryId } from "../content";
import { Rates } from "../components/Rates";
import { Disc } from "../components/Marks";
import { TrainerCard } from "../components/Sessions";

export function Trainers() {
  const [focus, setFocus] = useState<CategoryId | "all">("all");
  const shown = trainers.filter(
    (t) => focus === "all" || t.focus.includes(focus),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>Trainers</h1>
        <p className="lede">
          Six full-time coaches. No commission, no sales targets, no one hired
          for their follower count. Every one of them coaches classes and takes
          personal clients.
        </p>
      </header>

      <section className="wrap" aria-label="Coaches">
        <div className="list-tools">
          <fieldset className="chips">
            <legend>Coaches who teach</legend>
            <button
              type="button"
              className="chip"
              aria-pressed={focus === "all"}
              onClick={() => setFocus("all")}
            >
              Everything
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="chip"
                aria-pressed={focus === cat.id}
                onClick={() => setFocus(cat.id)}
              >
                <Disc category={cat.id} />
                {cat.name}
              </button>
            ))}
          </fieldset>
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} {shown.length === 1 ? "coach" : "coaches"} shown
        </p>
        <ul className="trainer-grid">
          {shown.map((t) => (
            <TrainerCard key={t.id} t={t} />
          ))}
        </ul>
      </section>

      <section className="wrap section pt" aria-labelledby="pt">
        <div>
          <h2 id="pt">Personal training</h2>
          <p>
            Same rate with every coach. Your first session is a movement screen
            and a plan; after that, sessions follow a written block that you can
            also run on your own.
          </p>
          <Link to="/join?plan=coached" className="btn btn-primary">
            Start with Coached membership
          </Link>
        </div>
        <Rates />
      </section>
    </>
  );
}
