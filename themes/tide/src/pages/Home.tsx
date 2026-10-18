import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  events,
  giving,
  home,
  images,
  programmes,
  reports,
  sites,
  themes,
} from "../content";
import { Ledger } from "../components/Ledger";
import { TidePlanner } from "../components/TidePlanner";
import { EventList } from "../components/EventList";
import { Composition, YearBars } from "../components/Charts";
import { count, money, shortDate } from "../lib/format";
import { clock, workWindow } from "../lib/tide";

export function Home() {
  const next = events[0];
  const nextSite = sites.find((s) => s.id === next.site)!;
  const nextWin = workWindow({ site: nextSite, highWater: next.highWater });
  const planned = events.slice(0, 3);
  const [pick, setPick] = useState(planned[0].id);
  const picked = planned.find((e) => e.id === pick)!;
  const latest = reports[0];
  const spend = latest.money.spend.reduce((s, x) => s + x.amount, 0);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/volunteer" className="btn btn-sea">
                Find a low-tide clean
              </Link>
              <Link to="/donate" className="btn btn-ghost">
                Give monthly
              </Link>
            </div>
          </div>
          <figure className="hero-figure">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              width={images.hero.w}
              height={images.hero.h}
            />
            <Link to={`/volunteer/${next.id}`} className="next-tide">
              <strong>Next clean: {next.title}</strong>
              <span className="num">
                {shortDate(next.date)} · {clock(nextWin.start)}–
                {clock(nextWin.end)} · {nextSite.name}
              </span>
              <span className="next-tide-go">
                {next.spots - next.taken} places left{" "}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </figure>
        </div>
        <ul className="wrap theme-strip" aria-label="What we do">
          {themes.map((t) => (
            <li key={t.id}>
              <strong>{t.id}</strong>
              <span>{t.blurb}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Seven programmes, one coastline</h2>
          <p>
            From the strandline to twelve metres down: cleaning, replanting,
            counting and teaching on the same stretch of coast since{" "}
            {brand.founded}.
          </p>
        </div>
        <Ledger items={programmes} />
      </section>

      <section className="section band-shallow">
        <div className="wrap planner-wrap">
          <div className="planner-intro">
            <h2>Why every clean starts at a different time</h2>
            <p>
              We work the bottom of the tide, when the lower shore and its
              gullies are open. The window moves about fifty minutes later every
              day, so the calendar follows the sea. Pick an event and run the
              tide to see what the crew will find.
            </p>
            <div className="chips" role="group" aria-label="Choose an event">
              {planned.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  className="chip"
                  aria-pressed={pick === e.id}
                  onClick={() => setPick(e.id)}
                >
                  {shortDate(e.date)} ·{" "}
                  {sites.find((s) => s.id === e.site)!.name}
                </button>
              ))}
            </div>
          </div>
          <TidePlanner
            key={picked.id}
            event={picked}
            site={sites.find((s) => s.id === picked.site)!}
            heading={picked.title}
          />
        </div>
      </section>

      <section className="statement wrap">
        <blockquote>
          <p>{home.statement.text}</p>
        </blockquote>
        <p className="statement-note">{home.statement.note}</p>
      </section>

      <section className="section wrap">
        <div className="section-head section-head-row">
          <h2>Coming up on the tide table</h2>
          <Link to="/volunteer" className="text-link">
            All events and filters <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <EventList items={events.slice(0, 4)} />
      </section>

      <section className="section band-paper2">
        <div className="wrap impact-grid">
          <div>
            <h2>
              {count(latest.kg)} kg off our beaches in {latest.year}
            </h2>
            <p>
              Every bag is weighed on the slipway and one in ten is sorted.
              Fishing gear has overtaken packaging as the second largest share
              of what we collect.
            </p>
            <Composition report={latest} />
            <Link to={`/impact/${latest.year}`} className="text-link">
              Read the {latest.year} impact report{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <YearBars reports={reports} current={latest.year} />
        </div>
      </section>

      <section className="section wrap field-notes">
        <img
          src={images.haul.src}
          alt={images.haul.alt}
          width={images.haul.w}
          height={images.haul.h}
          loading="lazy"
        />
        <div>
          <h2>Who turns up</h2>
          {home.voices.map((v) => (
            <figure key={v.by} className="voice">
              <blockquote>
                <p>{v.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{v.by}</strong>, {v.role}
              </figcaption>
            </figure>
          ))}
          <p className="field-notes-foot">
            {count(latest.volunteers)} volunteers gave {count(latest.hours)}{" "}
            hours last year. No experience needed; we provide the kit.
          </p>
        </div>
      </section>

      <section className="section wrap money">
        <div className="section-head">
          <h2>Where a pound goes</h2>
          <p>
            In {latest.year} we spent {money(spend)}.{" "}
            {Math.round(
              ((latest.money.spend[0].amount + latest.money.spend[1].amount) /
                spend) *
                100,
            )}
            p in every pound went on the shore, in schools and on training
            volunteers.
          </p>
        </div>
        <div className="spend-bar" aria-hidden="true">
          {latest.money.spend.map((s, i) => (
            <span
              key={s.label}
              style={{ flexGrow: s.amount, background: `var(--cat-${i + 1})` }}
            />
          ))}
        </div>
        <ul className="spend-legend">
          {latest.money.spend.map((s, i) => (
            <li key={s.label}>
              <span
                className="swatch"
                style={{ background: `var(--cat-${i + 1})` }}
                aria-hidden="true"
              />
              {s.label}
              <strong className="num">{money(s.amount)}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="close">
        <div className="wrap close-grid">
          <h2>
            {money(giving.monthly[1].amount)} a month {giving.monthly[1].does}.
          </h2>
          <div>
            <p>
              Monthly gifts let us book boats, buy seed and promise schools a
              place a year ahead. Cancel any time.
            </p>
            <div className="actions">
              <Link to="/donate" className="btn btn-buoy">
                Give monthly
              </Link>
              <Link to="/volunteer" className="btn btn-paper-ghost">
                Volunteer instead
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
