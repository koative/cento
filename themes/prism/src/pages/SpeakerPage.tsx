import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  sessionsBySpeaker,
  speakers,
  trackById,
  type Speaker,
} from "../content";
import { byStart } from "../lib/plan";
import { SessionCard } from "../components/SessionCard";
import { Portrait, SpeakerCard, TrackChip } from "../components/SpeakerCard";

export function SpeakerPage({ speaker: s }: { speaker: Speaker }) {
  const own = sessionsBySpeaker(s.slug).sort(byStart);
  const related = [
    ...speakers.filter((x) => x.track === s.track && x.slug !== s.slug),
    ...speakers.filter((x) => x.track !== s.track),
  ].slice(0, 4);

  return (
    <div className="wrap page">
      <Link to="/speakers" className="back">
        <ArrowLeft aria-hidden="true" /> All speakers
      </Link>

      <div className="speaker-hero" data-track={s.track}>
        <Portrait speaker={s} eager />
        <div className="speaker-intro">
          <h1>{s.name}</h1>
          <p className="speaker-meta">
            {s.role}, {s.org} · {s.city}
          </p>
          <TrackChip id={s.track} />
          <blockquote className="speaker-quote">
            <p>{s.quote}</p>
          </blockquote>
        </div>
      </div>

      <div className="speaker-body">
        <section className="prose">
          <h2>About {s.name.split(" ")[0]}</h2>
          {s.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h3>Talks about</h3>
          <ul className="topic-list">
            {s.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {s.pastEdition && (
            <p>
              Spoke at{" "}
              <Link to={`/editions/${s.pastEdition}`}>
                Prism {s.pastEdition}
              </Link>
              .
            </p>
          )}
        </section>

        <section className="speaker-sessions" aria-labelledby="at-prism">
          <h2 id="at-prism">At Prism 2027</h2>
          <p className="section-note">
            {own.length} {own.length === 1 ? "session" : "sessions"} in the{" "}
            {trackById[s.track].name} track and beyond. Add them to your agenda;
            it's saved on this device.
          </p>
          {own.map((x) => (
            <SessionCard key={x.id} session={x} showDay />
          ))}
          <div className="actions">
            <Link to="/agenda" className="btn btn-line">
              Open your agenda
            </Link>
            <Link to="/tickets" className="btn btn-ink">
              Get tickets
            </Link>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>
            {related[0]?.track === s.track
              ? `More in ${trackById[s.track].name}`
              : "More speakers"}
          </h2>
          <Link to="/speakers" className="more">
            All speakers <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="speaker-grid">
          {related.map((r) => (
            <SpeakerCard key={r.slug} speaker={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
