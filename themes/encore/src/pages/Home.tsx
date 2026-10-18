import { useMemo, useState } from "react";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "../router";
import {
  boxOfficeHours,
  brand,
  images,
  productions,
  programmes,
  tiers,
  zoneNames,
  type Production,
} from "../content";
import { availability, houseOf, performancesOf, seatPrice } from "../lib/house";
import {
  clock,
  money,
  openStatus,
  runDates,
  shortDate,
  weekDate,
} from "../lib/util";
import { ProductionRow } from "../components/ProductionRow";
import { SightLine } from "../components/SightLine";

export function Home() {
  const today = new Date();
  const upcoming = productions.filter((p) => performancesOf(p, today).length);
  const now = upcoming[0] ?? productions[0];
  const next = performancesOf(now, today).slice(0, 4);
  const family = productions.find((p) => p.genre === "Family")!;
  const accessDates = upcoming
    .flatMap((p) =>
      performancesOf(p, today)
        .filter((x) => x.access)
        .map((x) => ({ p, x })),
    )
    .sort((a, b) => a.x.id.localeCompare(b.x.id))
    .slice(0, 6);
  const status = openStatus(boxOfficeHours, today);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 className="display">{now.title}</h1>
            <p className="hero-credit">{now.credit}</p>
            <p className="hero-run">
              {now.stage} · {runDates(now.opens, now.closes)}
            </p>
            <p className="hero-line">{now.logline}</p>
            {now.quotes[0] && (
              <blockquote className="hero-quote">
                <p>“{now.quotes[0].text}”</p>
                <cite>{now.quotes[0].source}</cite>
              </blockquote>
            )}
            <div className="actions">
              <Link to={`/book/${now.slug}`} className="btn btn-red">
                Choose your seats
              </Link>
              <Link to={`/season/${now.slug}`} className="btn btn-line">
                About the play
              </Link>
            </div>
          </div>
          <figure className="hero-arch">
            <img
              src={now.image.src}
              alt={now.image.alt}
              width={now.image.w}
              height={now.image.h}
            />
          </figure>
        </div>
        {next.length > 0 && (
          <div className="wrap">
            <h2 className="sr-only">Next performances</h2>
            <ul className="next-perfs">
              {next.map((x) => {
                const a = availability(x.soldPct);
                return (
                  <li key={x.id}>
                    <Link to={`/book/${now.slug}?p=${x.id}`}>
                      <span className="np-date">{weekDate(x.date)}</span>
                      <span className="np-time">{clock(x.time)}</span>
                      <span className="avail" data-level={a.level}>
                        {x.access ?? a.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>The {brand.season} season</h2>
            <p>
              Two new plays, a new musical, three classics, our holiday show and
              the youth company — on the Mainstage and in the 98-seat Studio.
            </p>
          </div>
          <div className="bill">
            {upcoming.slice(0, 5).map((p) => (
              <ProductionRow key={p.slug} p={p} />
            ))}
          </div>
          <Link to="/season" className="text-link">
            The whole season, all {productions.length} productions{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <SeatPreview
        now={upcoming.find((p) => p.stage === "Mainstage") ?? productions[0]}
      />

      <section className="section spotlight">
        <div className="wrap spotlight-grid">
          <img
            src={family.image.src}
            alt={family.image.alt}
            width={family.image.w}
            height={family.image.h}
            loading="lazy"
          />
          <div>
            <h2>{family.title}</h2>
            <p className="spot-dates">
              {runDates(family.opens, family.closes)}
            </p>
            <p>{family.synopsis[1]}</p>
            <Link to={`/season/${family.slug}`} className="btn btn-line">
              Plan a family trip
            </Link>
          </div>
        </div>
      </section>

      {accessDates.length > 0 && (
        <section className="section section-tint">
          <div className="wrap access-grid">
            <div>
              <h2>Captioned, described, signed, relaxed</h2>
              <p>
                Every production has access performances. Book any seat; we'll
                make sure the view of the captions or interpreter is a good one.
              </p>
              <Link to="/visit" className="text-link">
                Access at Encore <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <table className="data-table">
              <caption className="sr-only">
                Upcoming access performances
              </caption>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Production</th>
                  <th scope="col">Performance</th>
                </tr>
              </thead>
              <tbody>
                {accessDates.map(({ p, x }) => (
                  <tr key={p.slug + x.id}>
                    <td className="num">
                      {shortDate(x.date)}, {clock(x.time)}
                    </td>
                    <td>
                      <Link to={`/book/${p.slug}?p=${x.id}`}>{p.title}</Link>
                    </td>
                    <td>{x.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap member-band">
          <img
            src={images.curtainCall.src}
            alt={images.curtainCall.alt}
            width={images.curtainCall.w}
            height={images.curtainCall.h}
            loading="lazy"
          />
          <div className="member-copy">
            <h2>Members book first and pay less</h2>
            <p>
              From free for under-30s to Patrons who keep new plays on our
              stage. Every tier skips the booking fee.
            </p>
            <ul className="tier-strip">
              {tiers.map((t) => (
                <li key={t.id}>
                  <strong>{t.name}</strong>
                  <span className="num">
                    {t.yearly ? `${money(t.yearly)} a year` : "Free"}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/membership" className="btn btn-red">
              Compare membership
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap learn-grid">
          <div>
            <h2>Eighty young people make theatre here every week</h2>
            <p>
              The Encore Youth Company, our juniors and our over-60s Late Shift
              share the Studio with the professionals. This season the youth
              company makes its own show, Tidewater.
            </p>
            <ul className="link-list">
              {programmes
                .filter((g) => g.audience === "Young people")
                .map((g) => (
                  <li key={g.id}>
                    <Link to="/learning">
                      <strong>{g.title}</strong>
                      <span>
                        Ages {g.ages} · {g.when}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <img
            src={images.youthCompany.src}
            alt={images.youthCompany.alt}
            width={images.youthCompany.w}
            height={images.youthCompany.h}
            loading="lazy"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap visit-band">
          <img
            src={images.house.src}
            alt={images.house.alt}
            width={images.house.w}
            height={images.house.h}
            loading="lazy"
          />
          <div>
            <h2>410 Lantern Street</h2>
            <p className="icon-line">
              <MapPin aria-hidden="true" /> Two minutes from the Lantern &amp;
              Pier bus stop, twelve from Union Station.
            </p>
            <p className="icon-line">
              <Clock aria-hidden="true" />
              <span>
                <span
                  className="live-dot"
                  data-open={status.open ? "" : undefined}
                />{" "}
                {status.label}. Doors and bar open 45 minutes before curtain.
              </span>
            </p>
            <Link to="/visit" className="btn btn-line">
              Plan your visit
            </Link>
          </div>
        </div>
      </section>

      <section className="closer">
        <img
          src={images.curtain.src}
          alt=""
          width={images.curtain.w}
          height={images.curtain.h}
          loading="lazy"
        />
        <div className="closer-copy">
          <h2 className="display">Curtain up at 7:30.</h2>
          <p>Choose a night, pick a seat, see your view before you pay.</p>
          <Link to={`/book/${now.slug}`} className="btn btn-cream">
            Book {now.title}
          </Link>
        </div>
      </section>
    </>
  );
}

/** Pick any Mainstage seat and see roughly what the stage looks like from it. */
function SeatPreview({ now }: { now: Production }) {
  const rows = useMemo(() => houseOf("Mainstage"), []);
  const [rowLabel, setRowLabel] = useState("E");
  const [number, setNumber] = useState(8);
  const row = rows.find((r) => r.label === rowLabel)!;
  const seats = row.blocks.flat();
  const seat = seats[Math.min(number, seats.length) - 1];
  const label = `View from ${seat.section} row ${seat.row}, seat ${seat.number}`;

  return (
    <section className="section house-dark seat-preview">
      <div className="wrap preview-grid">
        <div>
          <h2>Every seat, with its view</h2>
          <p>
            Before you pay, our seat map shows you roughly what the stage looks
            like from where you'll sit — how far, how high, and whether the
            proscenium takes a slice. Try it.
          </p>
          <div className="preview-controls">
            <label>
              Row
              <select
                value={rowLabel}
                onChange={(e) => {
                  setRowLabel(e.target.value);
                }}
              >
                {rows.map((r) => (
                  <option key={r.label} value={r.label}>
                    {r.section} {r.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Seat {seat.number} of {seats.length}
              <input
                type="range"
                min={1}
                max={seats.length}
                value={Math.min(number, seats.length)}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </label>
          </div>
          <p className="preview-zone">
            {zoneNames[seat.zone]} · {money(seatPrice(now, seat.zone, "full"))}{" "}
            for {now.title}
          </p>
          <Link to={`/book/${now.slug}`} className="btn btn-cream">
            Open the seat map
          </Link>
        </div>
        <figure className="preview-figure">
          <SightLine seat={seat} label={label} />
          <figcaption>{label}. Illustrative, not to scale.</figcaption>
        </figure>
      </div>
    </section>
  );
}
