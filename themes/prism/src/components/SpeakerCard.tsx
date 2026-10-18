import { Link } from "../router";
import { trackById, type Speaker, type TrackId } from "../content";

export function TrackChip({ id }: { id: TrackId }) {
  return (
    <span className="chip" data-track={id}>
      {trackById[id].name}
    </span>
  );
}

/** Portraits are printed duotone in their track colour, full colour on hover. */
export function Portrait({
  speaker,
  eager = false,
}: {
  speaker: Speaker;
  eager?: boolean;
}) {
  return (
    <span className="portrait" data-track={speaker.track}>
      <img
        src={speaker.photo}
        alt=""
        width={800}
        height={1000}
        loading={eager ? "eager" : "lazy"}
      />
    </span>
  );
}

export function SpeakerCard({
  speaker,
  eager,
}: {
  speaker: Speaker;
  eager?: boolean;
}) {
  return (
    <Link to={`/speakers/${speaker.slug}`} className="speaker-card">
      <Portrait speaker={speaker} eager={eager} />
      <span className="speaker-name">{speaker.name}</span>
      <span className="speaker-role">
        {speaker.role}, {speaker.org}
      </span>
      <TrackChip id={speaker.track} />
    </Link>
  );
}
