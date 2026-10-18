import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { Link } from "../router";
import { artists, days, tickets, type Artist } from "../content";
import {
  clashAdvice,
  clashesWith,
  duration,
  minutes,
  setsOn,
  span,
  stageOf,
  togglePick,
  usePlan,
} from "../lib/schedule";
import { money } from "../lib/order";
import { Waveform } from "../components/Waveform";

export function ArtistPage({ artist: a }: { artist: Artist }) {
  const slugs = usePlan();
  const on = slugs.includes(a.slug);
  const clashes = on ? clashesWith(a, slugs) : [];
  const stage = stageOf(a);
  const day = days.find((d) => d.id === a.day)!;
  const [s, e] = span(a);
  const dayTicket = tickets.find((t) => t.day === a.day)!;

  const sameStage = setsOn(a.day).filter((x) => x.stage === a.stage);
  const i = sameStage.findIndex((x) => x.slug === a.slug);
  const around = [sameStage[i - 1], sameStage[i + 1]].filter(
    (x): x is Artist => !!x,
  );
  const sameTime = artists
    .filter((x) => x.day === a.day && x.stage !== a.stage)
    .sort(
      (x, y) => Math.abs(minutes(x.start) - s) - Math.abs(minutes(y.start) - s),
    )
    .slice(0, 3);

  return (
    <article data-stage={a.stage}>
      <header className="artist-hero">
        <div className="wrap">
          <Link to="/lineup" className="back">
            <ArrowLeft aria-hidden="true" /> Lineup
          </Link>
          <h1>{a.name}</h1>
          <p className="artist-hero-meta">
            {a.origin} · {a.genre} · {a.format}
          </p>
        </div>
        <Waveform seed={a.slug} className="artist-wave" />
      </header>

      <div className="wrap artist-body">
        <aside className="set-card" aria-label="Set time">
          <dl>
            <div>
              <dt>Day</dt>
              <dd>{day.long}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd className="num">
                {a.start} — {a.end}
              </dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>{stage.name}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{duration(e - s)}</dd>
            </div>
          </dl>
          <button
            type="button"
            className={`btn ${on ? "btn-line" : "btn-acid"}`}
            aria-pressed={on}
            onClick={() => togglePick(a.slug)}
          >
            {on ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
            {on ? "In your timetable" : "Add to my timetable"}
          </button>
          <div aria-live="polite" className="set-clash">
            {clashes.map((c) => (
              <p key={c.slug}>{clashAdvice(a, c)}</p>
            ))}
          </div>
          <Link to="/timetable" className="text-link">
            See the whole {day.short} timetable{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </aside>

        <div className="artist-copy">
          {a.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h2>Sounds like</h2>
          <ul className="moods">
            {a.moods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <h2>Recent records</h2>
          <ul className="releases">
            {a.releases.map((r) => (
              <li key={r.title}>
                <strong>{r.title}</strong>
                <span>
                  {r.label}, {r.year}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section
        className="wrap section artist-stage"
        aria-labelledby="stage-title"
      >
        <img
          src={stage.image}
          alt={stage.alt}
          loading="lazy"
          width="800"
          height="600"
        />
        <div>
          <h2 id="stage-title">On the {stage.name} stage</h2>
          <p>{stage.text}</p>
          {around.length > 0 && (
            <>
              <h3>Before and after</h3>
              <ul className="mini-list">
                {around.map((x) => (
                  <li key={x.slug}>
                    <span className="num">{x.start}</span>
                    <Link to={`/lineup/${x.slug}`}>{x.name}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link to="/venue" className="text-link">
            Find {stage.name} on the map <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="wrap section-tight" aria-labelledby="same-title">
        <h2 id="same-title">Around the same time</h2>
        <ul className="artist-list artist-list-small">
          {sameTime.map((x) => (
            <li key={x.slug} data-stage={x.stage}>
              <Link to={`/lineup/${x.slug}`}>
                <Waveform seed={x.slug} bars={28} />
                <span className="artist-name">{x.name}</span>
                <span className="artist-meta">
                  {x.genre} · {x.origin}
                </span>
                <span className="artist-when">
                  <span className="stage-tag">{stageOf(x).name}</span>
                  {x.start}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="close close-small" aria-labelledby="artist-cta">
        <div className="wrap close-inner">
          <h2 id="artist-cta">
            Catch {a.name} on {day.long.split(" ")[0]}
          </h2>
          <div>
            <p>
              {day.short} day ticket {money(dayTicket.price)} · Weekend from{" "}
              {money(tickets[0].price)}
            </p>
            <Link to="/tickets" className="btn btn-ink">
              Get tickets
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
