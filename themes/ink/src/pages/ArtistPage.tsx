import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { artists, flash, type Artist } from "../content";
import { money } from "../lib/ink";
import { FlashCard } from "../components/FlashCard";

export function ArtistPage({ artist: a }: { artist: Artist }) {
  const sheets = flash.filter((d) => d.artist === a.id);
  const others = artists.filter((o) => o.id !== a.id);
  const first = a.name.split(" ")[0];

  return (
    <div className="page">
      <div className="wrap">
        <Link to="/artists" className="back-link">
          <ArrowLeft aria-hidden="true" /> All artists
        </Link>
      </div>

      <section className="wrap artist-top">
        <img
          src={a.photo.src}
          alt={a.photo.alt}
          width={a.photo.w}
          height={a.photo.h}
        />
        <div>
          <h1>{a.name}</h1>
          <p className="artist-role">
            {a.role} · {a.pronouns} · tattooing since {a.since}
          </p>
          {a.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <blockquote className="pull">
            <p>{a.quote}</p>
          </blockquote>
        </div>
      </section>

      <section
        className="wrap section artist-facts"
        aria-labelledby="booking-with"
      >
        <h2 id="booking-with">Booking with {first}</h2>
        <dl className="spec">
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
            <dt>Styles</dt>
            <dd>{a.styles.join(", ")}</dd>
          </div>
          <div>
            <dt>Day rate</dt>
            <dd>{money(a.dayRate)} for six hours</dd>
          </div>
          <div>
            <dt>Guest spots</dt>
            <dd>
              {a.guestSpots.length ? (
                <ul className="plain">
                  {a.guestSpots.map((g) => (
                    <li key={g.city}>
                      {g.city} — {g.dates}
                    </li>
                  ))}
                </ul>
              ) : (
                "None planned — in Eastbrook all season"
              )}
            </dd>
          </div>
        </dl>
        <Link to={`/book?artist=${a.id}`} className="btn btn-red">
          {a.books === "open"
            ? `Request a session with ${first}`
            : `Join ${first}'s waitlist`}
        </Link>
      </section>

      <section className="wrap section">
        <h2>{first}'s flash</h2>
        <div className="flash-grid">
          {sheets.map((d) => (
            <FlashCard key={d.id} design={d} />
          ))}
        </div>
      </section>

      <section className="wrap section">
        <h2>Also in the studio</h2>
        <ul className="other-artists">
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/artists/${o.id}`}>
                <img
                  src={o.photo.src}
                  alt=""
                  width={o.photo.w}
                  height={o.photo.h}
                  loading="lazy"
                />
                <span className="artist-name">{o.name}</span>
                <span className="artist-role">{o.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
