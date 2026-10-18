import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { drinks, nights, type Night } from "../content";
import { longDate, slipOf } from "../lib/format";
import { NightPlayer } from "../components/NightPlayer";
import { DrinkLine, SlipCard } from "../components/Cards";

export function NightPage({ night }: { night: Night }) {
  const { entries } = slipOf(night);
  const played = new Set(entries.map((e) => e.album.id));
  const pairings = drinks.filter((d) => played.has(d.listen.album)).slice(0, 4);
  const artists = new Set(entries.map((e) => e.album.artist)).size;
  const others = nights.filter((n) => n.id !== night.id).slice(0, 3);

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/records" className="text-link">
          <ArrowLeft aria-hidden="true" /> Record of the night
        </Link>
      </div>

      <header className="page-head wrap">
        <h1>{night.title}</h1>
        <p className="lede">
          {longDate(night.date)}, selected by {night.selector}. {entries.length}{" "}
          sides from {artists} artists, logged by hand at the desk.
        </p>
      </header>

      <section className="wrap night-section" aria-label="The slip">
        <NightPlayer night={night} full />
        <blockquote className="selector-note">
          <p>{night.note}</p>
          <footer>{night.selector}</footer>
        </blockquote>
      </section>

      {pairings.length > 0 && (
        <section
          className="section section-rule wrap"
          aria-labelledby="pairings"
        >
          <h2 id="pairings">Drinks that go with this slip</h2>
          <p className="muted">
            Each of these lists a record from tonight as its listening pair.
          </p>
          <ul className="drink-lines drink-lines-cols">
            {pairings.map((d) => (
              <DrinkLine key={d.id} drink={d} />
            ))}
          </ul>
        </section>
      )}

      <section
        className="section section-rule wrap"
        aria-labelledby="more-slips"
      >
        <h2 id="more-slips">More slips</h2>
        <ul className="slip-archive">
          {others.map((n) => (
            <SlipCard key={n.id} night={n} />
          ))}
        </ul>
      </section>
    </>
  );
}
