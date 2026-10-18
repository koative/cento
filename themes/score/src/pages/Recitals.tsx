import { useState } from "react";
import { images, recitalNotes, venues } from "../content";
import { season } from "../lib/school";
import { Coda, RecitalRow } from "../components/Bits";

export function Recitals() {
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  const all = season();
  const shown = all[view];

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Recitals & concerts</h1>
        <p className="lede">{recitalNotes.intro}</p>
      </header>

      <section className="wrap season" aria-labelledby="season-h">
        <div className="season-head">
          <h2 id="season-h">This season</h2>
          <fieldset className="segmented">
            <legend className="sr-only">Show</legend>
            <button
              type="button"
              aria-pressed={view === "upcoming"}
              onClick={() => setView("upcoming")}
            >
              Coming up ({all.upcoming.length})
            </button>
            <button
              type="button"
              aria-pressed={view === "past"}
              onClick={() => setView("past")}
            >
              Already played ({all.past.length})
            </button>
          </fieldset>
        </div>
        {shown.length ? (
          <div className="recital-list">
            {shown.map((r) => (
              <RecitalRow key={r.id} r={r} />
            ))}
          </div>
        ) : (
          <p className="empty">
            Nothing here yet — next season's dates go up in August.
          </p>
        )}
      </section>

      <section className="wrap perform" aria-labelledby="perform-h">
        <img
          src={images.recitalHall.src}
          alt={images.recitalHall.alt}
          width={images.recitalHall.w}
          height={images.recitalHall.h}
          loading="lazy"
        />
        <div>
          <h2 id="perform-h">Playing in a recital</h2>
          <ol className="plain-steps">
            {recitalNotes.howToPlay.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h3>Where</h3>
          <ul className="venue-list">
            {Object.values(venues).map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      <Coda
        title="The best seat is on the stage."
        text="Students who start this term can play in the next student recital. Begin with a free trial lesson."
      />
    </div>
  );
}
