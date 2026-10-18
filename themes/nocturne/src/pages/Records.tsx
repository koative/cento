import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { images, nights, recordsPage } from "../content";
import { longDate } from "../lib/format";
import { NightPlayer } from "../components/NightPlayer";
import { SlipCard } from "../components/Cards";

export function Records() {
  const [latest, ...older] = nights;
  return (
    <>
      <header className="page-head wrap">
        <h1>Record of the night</h1>
        <p className="lede">{recordsPage.intro}</p>
      </header>

      <section className="wrap night-section" aria-labelledby="latest">
        <div className="night-head">
          <h2 id="latest">
            {longDate(latest.date)}: {latest.title}
          </h2>
          <p className="muted">
            Selected by {latest.selector} · {latest.plays.length} sides
          </p>
        </div>
        <NightPlayer night={latest} full />
        <blockquote className="selector-note">
          <p>{latest.note}</p>
          <footer>{latest.selector}</footer>
        </blockquote>
      </section>

      <section className="section section-rule wrap" aria-labelledby="archive">
        <h2 id="archive">{recordsPage.archiveTitle}</h2>
        <ul className="slip-archive">
          {older.map((n) => (
            <SlipCard key={n.id} night={n} />
          ))}
        </ul>
      </section>

      <section className="section section-walnut">
        <div className="wrap split">
          <div>
            <h2>{recordsPage.ritualTitle}</h2>
            <dl className="spec-list">
              {recordsPage.ritual.map((r) => (
                <div key={r.term}>
                  <dt>{r.term}</dt>
                  <dd>{r.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/events" className="text-link">
              Album nights and guest selectors <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <figure className="arch">
            <img
              src={images.selector.src}
              alt={images.selector.alt}
              width={images.selector.w}
              height={images.selector.h}
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </>
  );
}
