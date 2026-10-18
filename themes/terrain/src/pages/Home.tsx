import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link, navigate } from "../router";
import {
  grades,
  guides,
  home,
  images,
  kits,
  testimonials,
  trips,
  type Grade,
} from "../content";
import {
  dateRange,
  eur,
  findTrip,
  monthNames,
  spotsLabel,
  upcoming,
} from "../lib/trips";
import { Blaze } from "../components/Marks";
import { Signpost } from "../components/Signpost";
import { TripCard } from "../components/TripCard";

const featured = [
  "alta-via-huts",
  "laugavegur-crossing",
  "paine-w-trek",
  "toubkal-villages",
].map((s) => findTrip(s)!);

export function Home() {
  const board = upcoming();
  const open = board.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/route-finder" className="btn btn-primary">
                Find your route <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/trips" className="btn btn-ghost">
                See all {trips.length} trips
              </Link>
            </div>
            <ul className="hero-ranges" aria-label="Where we walk">
              {trips.map((t) => (
                <li key={t.slug}>
                  <Link to={`/trips/${t.slug}`}>{t.region}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-media">
            <img
              src={images.hero}
              alt={trips[0].imageAlt}
              width={1600}
              height={1066}
              fetchPriority="high"
            />
            <p className="hero-coords">
              46°36′ N • 11°43′ E • Seceda, Dolomites
            </p>
            <Signpost
              label="Next open departures"
              here="Leaving soon"
              signs={open.map(({ trip, dep }) => ({
                to: `/trips/${trip.slug}`,
                label: trip.name,
                meta: `${dateRange(dep.start, trip.days.length)} • ${trip.days.length} days`,
                grade: trip.grade,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section board-section" aria-labelledby="board-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="board-title">Departure board</h2>
            <p>
              The next date with places on every route. Groups close at ten or
              twelve walkers.
            </p>
          </div>
          <table className="board">
            <thead>
              <tr>
                <th scope="col">Dates</th>
                <th scope="col">Trip</th>
                <th scope="col">Grade</th>
                <th scope="col">Places</th>
                <th scope="col">From</th>
                <th scope="col">
                  <span className="sr-only">Book</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {board.map(({ trip, dep }) => (
                <tr key={dep.id}>
                  <td className="board-date">
                    {dateRange(dep.start, trip.days.length)}
                  </td>
                  <td>
                    <Link to={`/trips/${trip.slug}`} className="board-trip">
                      {trip.name}
                    </Link>
                    <span className="muted">
                      {trip.region} • {trip.days.length} days
                    </span>
                  </td>
                  <td>
                    <Blaze grade={trip.grade} />
                  </td>
                  <td
                    className="board-spots"
                    data-low={dep.spots <= 3 ? "" : undefined}
                  >
                    {spotsLabel(dep.spots)}
                  </td>
                  <td className="num">{eur(trip.price)}</td>
                  <td>
                    <Link
                      to={`/book?trip=${trip.slug}&dep=${dep.id}`}
                      className="text-link"
                    >
                      Book
                      <span className="sr-only">
                        {" "}
                        {trip.name}, {dateRange(dep.start, trip.days.length)}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="featured-title">Eight ranges, one way of walking</h2>
            <Link to="/trips" className="text-link">
              Compare every trip <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="featured-grid">
            {featured.map((t, i) => (
              <TripCard
                key={t.slug}
                trip={t}
                size={i === 0 ? "large" : "default"}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section grades-section"
        aria-labelledby="grades-title"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="grades-title">Three grades, painted on the rocks</h2>
            <p>
              Our grades borrow the waymarks on Alpine paths: blue for valley
              trails, red for mountain paths, black for the difficult ones. Pick
              by the longest day, not the average.
            </p>
          </div>
          <ol className="grade-scale">
            {([1, 2, 3] as Grade[]).map((g) => (
              <li key={g}>
                <Blaze grade={g} />
                <p className="grade-numbers">
                  {grades[g].hours}
                  <br />
                  {grades[g].ascent}
                </p>
                <p>{grades[g].text}</p>
                <p className="muted">
                  {trips
                    .filter((t) => t.grade === g)
                    .map((t) => t.name)
                    .join(" • ")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuickFinder />

      <section className="section day-section" aria-labelledby="day-title">
        <div className="wrap day-grid">
          <img
            src={images.hut}
            alt="Breakfast table in a wooden hut dining room, with beer glasses and a view through the window"
            loading="lazy"
            width={1600}
            height={1200}
          />
          <div>
            <h2 id="day-title">{home.dayTitle}</h2>
            <p className="lede">{home.dayLede}</p>
            <ol className="day-list">
              {home.day.map((d) => (
                <li key={d.time}>
                  <time>{d.time}</time>
                  <span>{d.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="guides-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="guides-title">Led by people who live there</h2>
            <Link to="/guides" className="text-link">
              Meet all {guides.length} guides <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="guide-strip">
            {guides.slice(0, 4).map((g) => (
              <li key={g.slug}>
                <img
                  src={g.image}
                  alt=""
                  loading="lazy"
                  width={1600}
                  height={1066}
                />
                <h3>
                  <Link to={`/guides/${g.slug}`} className="stretched">
                    {g.name}
                  </Link>
                </h3>
                <p className="muted">{g.base}</p>
                <blockquote>“{g.quote}”</blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark philosophy" aria-labelledby="ph-title">
        <div className="wrap ph-grid">
          <div>
            <h2 id="ph-title">{home.philosophyTitle}</h2>
            {home.philosophy.map((p) => (
              <p key={p} className="lede">
                {p}
              </p>
            ))}
            <dl className="principles">
              {home.principles.map((p) => (
                <div key={p.title}>
                  <dt>{p.title}</dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="btn btn-sign">
              How we work
            </Link>
          </div>
          <img
            src={images.group}
            alt="Four walkers with large packs following a dirt trail through a grassy meadow towards a forest"
            loading="lazy"
            width={1600}
            height={1066}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="notes-title">
        <div className="wrap">
          <h2 id="notes-title" className="center-title">
            From the trail
          </h2>
          <div className="quotes">
            {testimonials.map((t, i) => (
              <figure key={t.name} data-lead={i === 0 ? "" : undefined}>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  {t.name} • {t.trip}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="fine center-title">
            Sample reviews for this demonstration template.
          </p>
        </div>
      </section>

      <section className="section gear-teaser" aria-labelledby="gear-title">
        <div className="wrap gear-grid">
          <div>
            <h2 id="gear-title">What goes in the pack</h2>
            <p className="lede">
              Every trip comes with a packing list matched to how it's walked.
              Tick it off on your phone; it remembers where you got to.
            </p>
            <ul className="kit-lines">
              {kits.map((k) => (
                <li key={k.id}>
                  <strong>{k.name}</strong>
                  <span>{k.pack}</span>
                </li>
              ))}
            </ul>
            <Link to="/gear" className="btn btn-ghost">
              Open the gear list
            </Link>
          </div>
          <img
            src={images.gear}
            alt="Leather walking boots, a folded blue jacket and a grey rucksack resting on wet boulders"
            loading="lazy"
            width={1600}
            height={1066}
          />
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <div>
            <h2 id="close-title">Pick a date. We'll handle the rest.</h2>
            <p className="lede">
              A 25% deposit holds your place. If we can't run your date, you get
              every euro back.
            </p>
          </div>
          <Signpost
            label="Where next"
            here="You are here"
            signs={[
              { to: "/book", label: "Book a departure", meta: "5 minutes" },
              { to: "/route-finder", label: "Route finder", meta: "2 minutes" },
              { to: "/faq", label: "Questions first", meta: "FAQ" },
            ]}
          />
        </div>
      </section>
    </>
  );
}

function QuickFinder() {
  const [month, setMonth] = useState("0");
  const [days, setDays] = useState("6");
  const [grade, setGrade] = useState("2");
  const go = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/route-finder?month=${month}&days=${days}&grade=${grade}`);
  };
  return (
    <section className="section quiet" aria-labelledby="qf-title">
      <div className="wrap quiet-inner">
        <h2 id="qf-title">Not sure where to start?</h2>
        <p className="lede">
          Tell us when, how long and how hard. The route finder ranks all eight
          trips against what you said.
        </p>
        <form className="quick-finder" onSubmit={go}>
          <label>
            <span>Month</span>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="0">Any month</option>
              {monthNames.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Days I have</span>
            <select value={days} onChange={(e) => setDays(e.target.value)}>
              {[4, 5, 6, 7, 8].map((d) => (
                <option key={d} value={d}>
                  {d} days
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Grade</span>
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              {([1, 2, 3] as Grade[]).map((g) => (
                <option key={g} value={g}>
                  {grades[g].name} ({grades[g].blaze.toLowerCase()})
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-primary">
            Show my matches
          </button>
        </form>
      </div>
    </section>
  );
}
