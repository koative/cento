import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import {
  destinationBySlug,
  months,
  monthNames,
  type Destination,
  type Journey,
  type Rating,
} from "../content";
import { duration, money } from "../lib/plan";

/** "Apr–May, Sep–Oct" from the months rated 2. */
export function bestMonths(rating: Rating[]) {
  const runs: string[] = [];
  let start = -1;
  for (let m = 0; m <= 12; m++) {
    const on = m < 12 && rating[m] === 2;
    if (on && start < 0) start = m;
    if (!on && start >= 0) {
      runs.push(
        start === m - 1 ? months[start] : `${months[start]}–${months[m - 1]}`,
      );
      start = -1;
    }
  }
  return runs.join(", ");
}

export function routeName(j: Journey) {
  return j.stops.map((s) => destinationBySlug(s.slug)?.name).join(" → ");
}

export function DestinationCard({
  d,
  lazy = true,
  large,
}: {
  d: Destination;
  lazy?: boolean;
  large?: boolean;
}) {
  return (
    <article className={`dest-card${large ? " dest-card--large" : ""}`}>
      <Link to={`/destinations/${d.slug}`} className="dest-link">
        <img
          src={d.photo.src}
          alt={d.photo.alt}
          loading={lazy ? "lazy" : undefined}
        />
        <h3>
          <span className="place">{d.name}</span>
          <span className="dest-country">{d.country}</span>
        </h3>
      </Link>
      <p className="dest-summary">{d.summary}</p>
      <dl className="facts">
        <div>
          <dt>Best</dt>
          <dd>{bestMonths(d.rating)}</dd>
        </div>
        <div>
          <dt>Flight</dt>
          <dd>≈ {duration(d.flightHours)}</dd>
        </div>
        <div>
          <dt>From</dt>
          <dd>{money(d.nightly)}/night</dd>
        </div>
      </dl>
    </article>
  );
}

export function JourneyRow({ j, lazy = true }: { j: Journey; lazy?: boolean }) {
  const nights = j.stops.reduce((s, x) => s + x.nights, 0);
  return (
    <li className="journey-row">
      <img src={j.photo.src} alt="" loading={lazy ? "lazy" : undefined} />
      <div className="journey-main">
        <h3>
          <Link to={`/journeys/${j.slug}`} className="stretched">
            {j.name}
          </Link>
        </h3>
        <p className="journey-route">{routeName(j)}</p>
        <p className="journey-summary">{j.summary}</p>
      </div>
      <dl className="journey-data">
        <div>
          <dt>Length</dt>
          <dd>{nights + 1} days</dd>
        </div>
        <div>
          <dt>Pace</dt>
          <dd>{j.pace}</dd>
        </div>
        <div>
          <dt>From</dt>
          <dd>{money(j.priceFrom)}</dd>
        </div>
      </dl>
      <ArrowUpRight className="journey-arrow" aria-hidden="true" />
    </li>
  );
}

const ratingLabel = ["Off season", "Good", "Our pick"];

export function SeasonChart({ d }: { d: Destination }) {
  const max = 105;
  const min = 25;
  const h = 150;
  const bar = 30;
  const gap = 12;
  const w = 12 * (bar + gap);
  return (
    <figure className="season">
      <svg viewBox={`0 0 ${w} ${h + 44}`} aria-hidden="true">
        {d.highs.map((t, i) => {
          const bh = ((t - min) / (max - min)) * h;
          const xx = i * (bar + gap) + gap / 2;
          return (
            <g key={i} data-rating={d.rating[i]}>
              <rect x={xx} y={h - bh} width={bar} height={bh} rx={2} />
              <text className="season-temp" x={xx + bar / 2} y={h - bh - 6}>
                {t}°
              </text>
              <text className="season-month" x={xx + bar / 2} y={h + 20}>
                {months[i].charAt(0)}
              </text>
            </g>
          );
        })}
        <line x1={0} x2={w} y1={h} y2={h} className="season-base" />
      </svg>
      <figcaption>
        <span className="key" data-rating="2">
          Our pick
        </span>
        <span className="key" data-rating="1">
          Good
        </span>
        <span className="key" data-rating="0">
          Off season
        </span>
        <span>Average daytime high, °F</span>
      </figcaption>
      <div className="sr-only">
        <table>
          <caption>Average high and our rating by month in {d.name}</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">High °F</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {d.highs.map((t, i) => (
              <tr key={i}>
                <th scope="row">{monthNames[i]}</th>
                <td>{t}</td>
                <td>{ratingLabel[d.rating[i]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
