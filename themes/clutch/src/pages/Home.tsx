import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  articles,
  brand,
  clutchHouse,
  divisions,
  home,
  images,
  matches,
  opponents,
  partners,
  players,
  products,
} from "../content";
import {
  byDate,
  day,
  divisionOf,
  gameScore,
  longDate,
  money,
  scoreline,
  time,
} from "../lib/format";
import { StandingsTable } from "../components/StandingsTable";
import { MatchRow } from "../components/MatchRow";
import { RoundTape } from "../components/RoundTape";
import { MerchArt } from "../components/MerchArt";

const upcoming = matches.filter((m) => !m.games).sort(byDate);
const results = matches
  .filter((m) => m.games)
  .sort(byDate)
  .reverse();
const next = upcoming[0];
const last = results[0];
const decider = last.games![last.games!.length - 1];
const [lead, ...moreNews] = [...articles].sort(byDate).reverse();
const kit = products[0];

export function Home() {
  const nextOpp = opponents[next.opponent];
  const lastOpp = opponents[last.opponent];
  const lastScore = scoreline(last)!;

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/matches" className="btn">
                Schedule & results
              </Link>
              <Link to={`/shop/${kit.id}`} className="btn btn-ghost">
                Shop the 2026 jersey
              </Link>
            </div>
          </div>

          <figure className="hero-media cut">
            <img
              src={images.hero}
              alt="A Clutch player in a headset leans into a monitor lit orange in a dark practice room."
              width={1800}
              height={1200}
            />
            <Link to={`/matches/${next.id}`} className="next-card">
              <span className="next-label">
                Next match · {divisionOf(next.division).game}
              </span>
              <span className="next-vs">
                <span className="sb-tag sb-us">{brand.tag}</span>
                <span className="next-v">vs</span>
                <span className="sb-tag sb-them">{nextOpp.tag}</span>
              </span>
              <span className="next-when">
                {day(next.date)} · {time(next.date)}
              </span>
              <span className="next-where">
                {next.event} {next.stage} · {next.venue}
              </span>
            </Link>
          </figure>
        </div>
      </section>

      <section className="ticker" aria-label="Latest result">
        <div className="wrap ticker-row">
          <strong className="ticker-final">Final</strong>
          <span>
            {last.event} · {last.stage}
          </span>
          <span className="ticker-score num">
            {brand.tag} {lastScore[0]}–{lastScore[1]} {lastOpp.tag}
          </span>
          {last.games!.map((g) => (
            <span key={g.name} className="num">
              {g.name} {gameScore(g).join("–")}
            </span>
          ))}
          <Link to={`/matches/${last.id}`} className="ticker-link">
            Match centre <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Next up</h2>
          <Link to="/matches" className="text-link">
            Full schedule <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="match-list">
          {upcoming.map((m) => (
            <MatchRow key={m.id} match={m} />
          ))}
        </ul>
      </section>

      <section className="section section-deck">
        <div className="wrap replay">
          <div className="replay-copy">
            <h2>Down 8–12. Won 14–12.</h2>
            <p>
              The decider against {lastOpp.name} on {longDate(last.date)}, one
              round at a time. Press play, or drag through the rounds and watch{" "}
              {decider.name} turn.
            </p>
            <Link to={`/matches/${last.id}`} className="text-link">
              Every map of the series <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          {"tape" in decider && (
            <RoundTape
              id="home"
              tape={decider.tape}
              moments={decider.moments}
              map={decider.name}
              opponent={lastOpp.tag}
            />
          )}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Three games, twelve players</h2>
          <Link to="/teams" className="text-link">
            All rosters <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="division-columns">
          {divisions.map((d) => (
            <div key={d.id} className="division-col">
              <h3>{d.game}</h3>
              <p className="division-meta">
                {d.genre} · {d.standing}
              </p>
              <ul>
                {players
                  .filter((p) => p.division === d.id)
                  .map((p) => (
                    <li key={p.id}>
                      <Link to={`/players/${p.id}`}>
                        <span className="num roster-no">
                          {String(p.number).padStart(2, "0")}
                        </span>
                        <strong>{p.handle}</strong>
                        <span>{p.role}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="house-band">
        <img
          src={images.house}
          alt="The Clutch House screening hall: an audience in the dark watching a match on a big screen."
          width={1600}
          height={900}
          loading="lazy"
        />
        <div className="wrap house-copy">
          <h2>{home.houseTitle}</h2>
          <p>{clutchHouse.text}</p>
          <Link to="/club" className="btn">
            Visit Clutch House
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>From the club</h2>
          <Link to="/news" className="text-link">
            All news <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="news-split">
          <Link to={`/news/${lead.slug}`} className="news-lead">
            <img
              src={lead.image}
              alt={lead.imageAlt}
              width={1800}
              height={1200}
              loading="lazy"
              className="cut"
            />
            <span className="news-cat">{lead.category}</span>
            <strong>{lead.title}</strong>
            <span>{lead.dek}</span>
          </Link>
          <ul className="news-list">
            {moreNews.slice(0, 4).map((a) => (
              <li key={a.slug}>
                <Link to={`/news/${a.slug}`}>
                  <span className="news-cat">
                    {a.category} · {day(a.date)}
                  </span>
                  <strong>{a.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-deck">
        <div className="wrap form-grid">
          <div>
            <h2>Recent form</h2>
            <ul className="match-list compact">
              {results.slice(0, 5).map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </ul>
          </div>
          <div>
            <h2>League table</h2>
            <StandingsTable compact />
          </div>
        </div>
      </section>

      <section className="section wrap kit">
        <Link to={`/shop/${kit.id}`} className="kit-art">
          <MerchArt product={kit} />
          <span className="sr-only">{kit.name}</span>
        </Link>
        <div className="kit-copy">
          <h2>Your name on the 2026 jersey</h2>
          <p>
            {kit.blurb} Add any handle up to {kit.nameplate!.max} characters and
            we print it in Rotterdam.
          </p>
          <p className="kit-price num">
            {money(kit.price)}{" "}
            <span>+ {money(kit.nameplate!.price)} name print</span>
          </p>
          <Link to={`/shop/${kit.id}`} className="btn">
            Personalise yours
          </Link>
          <ul className="kit-more">
            {products.slice(2, 5).map((p) => (
              <li key={p.id}>
                <Link to={`/shop/${p.id}`}>
                  <MerchArt product={p} />
                  <span>{p.name}</span>
                  <span className="num">{money(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap partners-strip">
        <h2>Backed by</h2>
        <ul>
          {partners.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong>
              <span>{p.role}</span>
            </li>
          ))}
        </ul>
        <Link to="/partners" className="text-link">
          Partner with Clutch <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.close}</h2>
          <p className="close-match num">
            {brand.name} vs {nextOpp.name} · {day(next.date)}, {time(next.date)}{" "}
            · {next.event} {next.stage}
          </p>
          <div className="actions">
            <Link to={`/matches/${next.id}`} className="btn">
              Read the preview
            </Link>
            <Link to="/club" className="btn btn-ghost">
              Watch at Clutch House
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
