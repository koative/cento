import type { Talent } from "../content";
import { hourLabel, hoursSeenFrom, localTime, runs } from "../lib/util";

type Props = {
  crew: Talent[];
  viewer: number;
  viewerHours: [number, number];
  viewerLabel: string;
};

const pct = (h: number) => `${(h / 24) * 100}%`;

/** Each person's working day drawn on the viewer's 24-hour clock, with the hours everyone shares marked across all rows. */
export function Overlap({ crew, viewer, viewerHours, viewerLabel }: Props) {
  const you = hoursSeenFrom(viewerHours[0], viewerHours[1], viewer, viewer);
  const rows = crew.map((t) => ({
    t,
    slots: hoursSeenFrom(t.hours[0], t.hours[1], t.tz, viewer),
  }));
  const shared = you.map((on, h) => on && rows.every((r) => r.slots[h]));
  const sharedRuns = runs(shared);
  const total = shared.filter(Boolean).length;

  const track = (slots: boolean[], kind: string) => (
    <div className="ov-track" aria-hidden="true">
      {sharedRuns.map(([s, len]) => (
        <SplitBar key={`s${s}`} start={s} len={len} className="ov-shared" />
      ))}
      {runs(slots).map(([s, len]) => (
        <SplitBar key={s} start={s} len={len} className={`ov-bar ov-${kind}`} />
      ))}
    </div>
  );

  return (
    <figure className="ov">
      <div className="ov-grid">
        <div className="ov-label ov-scale">Your time, 24 h</div>
        <div className="ov-ruler" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} style={{ left: pct(i * 3) }}>
              {String(i * 3).padStart(2, "0")}
            </span>
          ))}
        </div>
        <div className="ov-count ov-count-head">Shared</div>

        <div className="ov-label">
          <strong>You</strong>
          <span>
            {viewerLabel} · {hourLabel(viewerHours[0])}–
            {hourLabel(viewerHours[1])}
          </span>
        </div>
        {track(you, "you")}
        <div className="ov-count">—</div>

        {rows.map(({ t, slots }) => {
          const overlap = slots.filter((on, h) => on && you[h]).length;
          return (
            <div className="ov-row" key={t.id}>
              <div className="ov-label">
                <strong>{t.name}</strong>
                <span>
                  {t.location.split(",")[0]} · {localTime(t.tz)} now
                </span>
              </div>
              {track(slots, "member")}
              <div className="ov-count">
                {overlap} h
                <span className="sr-only"> overlap with your day</span>
              </div>
            </div>
          );
        })}
      </div>
      <figcaption>
        {crew.length === 0
          ? "Add members to see your shared hours."
          : total
            ? `Everyone is working together for ${total} ${total === 1 ? "hour" : "hours"} of your day, from ${hourLabel(sharedRuns[0][0])} to ${hourLabel(sharedRuns[0][0] + sharedRuns[0][1])}.`
            : "There is no hour when the whole crew and you are working at once. Async handovers will carry this project."}
      </figcaption>
    </figure>
  );
}

/** A run on a 24-hour track; runs that pass midnight are drawn as two pieces. */
function SplitBar({
  start,
  len,
  className,
}: {
  start: number;
  len: number;
  className: string;
}) {
  const first = Math.min(len, 24 - start);
  return (
    <>
      <span
        className={className}
        style={{ left: pct(start), width: pct(first) }}
      />
      {len > first && (
        <span
          className={className}
          style={{ left: 0, width: pct(len - first) }}
        />
      )}
    </>
  );
}
