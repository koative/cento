import { Check, Plus, TriangleAlert } from "lucide-react";
import { Link } from "../router";
import { days, roomById, speakerBySlug, type Session } from "../content";
import { togglePlan, usePlan } from "../lib/plan";
import { TrackChip } from "./SpeakerCard";

type Props = {
  session: Session;
  showDay?: boolean;
  clash?: string;
  brief?: boolean;
};

export function SessionCard({
  session: s,
  showDay = false,
  clash,
  brief = false,
}: Props) {
  const inPlan = usePlan().includes(s.id);
  return (
    <article
      className="session"
      data-track={s.track ?? undefined}
      data-shared={s.track ? undefined : ""}
      data-planned={inPlan ? "" : undefined}
    >
      <p className="session-when">
        <time>
          {showDay && `${days[s.day].short} ${days[s.day].date} · `}
          {s.start}–{s.end}
        </time>
        <span>{roomById[s.room].name}</span>
      </p>
      <h3 className="session-title">{s.title}</h3>
      {s.speakers.length > 0 && (
        <p className="session-speakers">
          {s.speakers.map((slug, i) => (
            <span key={slug}>
              {i > 0 && " & "}
              <Link to={`/speakers/${slug}`}>{speakerBySlug[slug].name}</Link>
            </span>
          ))}
        </p>
      )}
      {!brief && <p className="session-text">{s.text}</p>}
      <div className="session-foot">
        {s.track && <span className="session-format">{s.format}</span>}
        {s.track && <TrackChip id={s.track} />}
        {s.seats && (
          <span className="session-seats">{s.seats} seats · Full Spectrum</span>
        )}
        {s.track && (
          <button
            type="button"
            className="plan-toggle"
            data-on={inPlan ? "" : undefined}
            aria-label={
              inPlan
                ? `Remove “${s.title}” from your agenda`
                : `Add “${s.title}” to your agenda`
            }
            onClick={() => togglePlan(s.id)}
          >
            {inPlan ? (
              <Check aria-hidden="true" />
            ) : (
              <Plus aria-hidden="true" />
            )}
            {inPlan ? "In your agenda" : "Add"}
          </button>
        )}
      </div>
      {clash && (
        <p className="session-clash">
          <TriangleAlert aria-hidden="true" />
          Overlaps with “{clash}”
        </p>
      )}
    </article>
  );
}
