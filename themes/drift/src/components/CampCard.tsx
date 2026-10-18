import { Link } from "../router";
import type { Camp } from "../content";
import { longDate, money } from "../lib/util";

export function nextDeparture(camp: Camp) {
  return camp.departures.find((d) => d.spots > 0);
}

export function CampCard({ camp }: { camp: Camp }) {
  const next = nextDeparture(camp);
  return (
    <article className="camp-card">
      <img
        src={camp.image.src}
        alt={camp.image.alt}
        width={camp.image.w}
        height={camp.image.h}
        loading="lazy"
        style={{ objectPosition: camp.image.pos }}
      />
      <div className="camp-card-body">
        <p className="tags">
          <span className="tag">{camp.level}</span>
          <span>{camp.place}</span>
        </p>
        <h3>
          <Link to={`/camps/${camp.id}`}>{camp.name}</Link>
        </h3>
        <p>{camp.summary}</p>
        <p className="camp-card-meta">
          <span>{camp.length}</span>
          <span className="num">from {money(camp.price)}</span>
        </p>
        <p className="camp-card-next">
          {next
            ? `Next: ${longDate(next.date)} · ${next.spots} ${next.spots === 1 ? "place" : "places"} left`
            : "All dates full — join the waitlist"}
        </p>
      </div>
    </article>
  );
}
