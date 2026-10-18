import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { artists, flash } from "../content";
import { money } from "../lib/ink";
import { FlashArt } from "../components/FlashArt";

export function Artists() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>The artists</h1>
        <p className="lede">
          Four residents, one guest chair. Each artist draws their own flash,
          sets their own day rate and answers their own booking requests.
        </p>
      </header>

      <ul className="wrap artist-rows">
        {artists.map((a) => {
          const sheets = flash.filter((d) => d.artist === a.id);
          return (
            <li key={a.id} className="artist-row">
              <img
                src={a.photo.src}
                alt={a.photo.alt}
                width={a.photo.w}
                height={a.photo.h}
                loading="lazy"
              />
              <div className="artist-row-body">
                <h2>
                  <Link to={`/artists/${a.id}`}>{a.name}</Link>
                </h2>
                <p className="artist-role">
                  {a.role} · {a.pronouns}
                </p>
                <p>{a.intro}</p>
                <dl className="spec compact">
                  <div>
                    <dt>Books</dt>
                    <dd>
                      <span className="books" data-state={a.books}>
                        {a.books === "open" ? "Open" : "Waitlist"}
                      </span>{" "}
                      {a.nextOpening}
                    </dd>
                  </div>
                  <div>
                    <dt>In the studio</dt>
                    <dd>{a.days}</dd>
                  </div>
                  <div>
                    <dt>Day rate</dt>
                    <dd>{money(a.dayRate)}</dd>
                  </div>
                </dl>
                <ul className="mini-sheets" aria-label={`Flash by ${a.name}`}>
                  {sheets.slice(0, 4).map((d) => (
                    <li key={d.id}>
                      <Link to={`/flash/${d.id}`} aria-label={d.name}>
                        <FlashArt art={d.id} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/artists/${a.id}`} className="text-link">
                  {a.name.split(" ")[0]}'s page and {sheets.length} sheets{" "}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
