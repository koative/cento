import { useEffect, useId, useRef, useState } from "react";
import { peaks, rooms, type Room } from "../content";
import { Link } from "../router";
import { Ridge, altToY } from "./Ridge";

const inView = (room: Room, x: number) =>
  x >= room.view[0] && x <= room.view[1];
/** Labels alternate between two rows (percent from the top) so neighbouring names never collide. */
const labelRow = (i: number) => (i % 2 ? 22 : 7);
const tallestIn = (room: Room) =>
  peaks.filter((p) => inView(room, p.x)).sort((a, b) => b.alt - a.alt)[0];

/**
 * The engraved panorama table from the terrace: every summit named, and the slice of the range
 * framed by a room's window. With `chooser`, guests switch rooms and watch the window slide.
 */
export function Panorama({
  roomId,
  chooser = false,
}: {
  roomId: string;
  chooser?: boolean;
}) {
  const [current, setCurrent] = useState(roomId);
  const room = rooms.find((r) => r.id === current) ?? rooms[0];
  const [peakId, setPeakId] = useState(tallestIn(room).id);
  const peak = peaks.find((p) => p.id === peakId) ?? tallestIn(room);
  const seenFrom = rooms.filter((r) => inView(r, peak.x));
  const uid = useId();
  const scroller = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // On narrow screens the stage scrolls sideways: bring the chosen window into the middle.
  useEffect(() => {
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const centre = ((room.view[0] + room.view[1]) / 200) * el.scrollWidth;
    const smooth =
      moved.current && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: centre - el.clientWidth / 2,
      behavior: smooth ? "smooth" : "instant",
    });
    moved.current = true;
  }, [room]);

  const chooseRoom = (id: string) => {
    setCurrent(id);
    const next = rooms.find((r) => r.id === id)!;
    if (!inView(next, peak.x)) setPeakId(tallestIn(next).id);
  };

  return (
    <div className="pano">
      {chooser && (
        <fieldset className="pano-rooms">
          <legend className="sr-only">Show the view from</legend>
          {rooms.map((r) => (
            <label key={r.id} className="chip">
              <input
                type="radio"
                name={`${uid}-room`}
                value={r.id}
                checked={r.id === current}
                onChange={() => chooseRoom(r.id)}
              />
              <span>{r.name}</span>
            </label>
          ))}
        </fieldset>
      )}

      <div
        ref={scroller}
        className="pano-scroll"
        tabIndex={0}
        role="group"
        aria-label="Panorama of the peaks south of the house; scroll sideways on small screens"
      >
        <div className="pano-stage">
          <Ridge className="pano-ridge" />
          <div
            className="pano-window"
            style={{
              left: `${room.view[0]}%`,
              width: `${room.view[1] - room.view[0]}%`,
            }}
            aria-hidden="true"
          >
            <span>{room.name} window</span>
          </div>
          {peaks.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="pano-peak"
              style={{
                left: `${p.x}%`,
                top: `${labelRow(i)}%`,
                height: `${altToY(p.alt) / 3 - labelRow(i)}%`,
              }}
              data-align={p.x < 12 ? "start" : p.x > 90 ? "end" : undefined}
              aria-pressed={p.id === peak.id}
              data-out={inView(room, p.x) ? undefined : ""}
              onClick={() => setPeakId(p.id)}
            >
              <span className="pano-label">
                {p.name}{" "}
                <span className="num">{p.alt.toLocaleString("en-US")}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pano-info" aria-live="polite">
        <p className="pano-peak-name">
          {peak.name}{" "}
          <span className="num">{peak.alt.toLocaleString("en-US")} m</span>
        </p>
        <p>{peak.note}</p>
        <p className="pano-seen">
          {seenFrom.length ? (
            <>
              Seen from{" "}
              {seenFrom.map((r, i) => (
                <span key={r.id}>
                  {i > 0 && (i === seenFrom.length - 1 ? " and " : ", ")}
                  <Link to={`/rooms/${r.id}`}>{r.name}</Link>
                </span>
              ))}
              .
            </>
          ) : (
            "Seen from the terrace."
          )}
        </p>
      </div>
    </div>
  );
}
