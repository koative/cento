import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Pause, Play } from "lucide-react";
import { Link } from "../router";
import { products, type Video } from "../content";
import { clock, saveProgress, useProgress } from "../lib/format";
import { Mockup } from "./Mockup";

const SPEEDS = [1, 2, 8];

/*
 * The signature: a demo player with no video file. The playhead, chapter
 * timeline, chapter list and the "on screen" parts list all run off one clock,
 * and progress is saved so thumbnails across the site show how far you got.
 */
export function Player({
  video,
  head,
  children,
}: {
  video: Video;
  head: ReactNode;
  children: ReactNode;
}) {
  const saved = useProgress()[video.slug] ?? 0;
  const [t, setT] = useState(saved >= video.duration ? 0 : saved);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [hover, setHover] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastSaved = useRef(saved);
  const { chapters, duration } = video;

  // Advance the playhead while playing.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = ((now - prev) / 1000) * speed;
      prev = now;
      setT((cur) => Math.min(duration, cur + dt));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed, duration]);

  useEffect(() => {
    if (t >= duration) setPlaying(false);
  }, [t, duration]);

  // Persist progress every five seconds of movement, and on pause.
  useEffect(() => {
    if (Math.abs(t - lastSaved.current) < 5 && playing) return;
    if (Math.round(t) === Math.round(lastSaved.current)) return;
    lastSaved.current = t;
    saveProgress(video.slug, t);
  }, [t, playing, video.slug]);

  const chapterAt = (time: number) =>
    chapters.reduce((found, c, i) => (c.t <= time ? i : found), 0);
  const ci = chapterAt(t);
  const chapter = chapters[ci];
  const items = video.onScreen;
  const current = items.reduce<number>(
    (found, it, i) => (it.t <= t ? i : found),
    -1,
  );

  function seek(time: number) {
    setT(Math.max(0, Math.min(duration, time)));
  }

  function toggle() {
    if (!playing && t >= duration) setT(0);
    setPlaying(!playing);
  }

  function timeAt(clientX: number) {
    const r = track.current!.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * duration;
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seek(timeAt(e.clientX));
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const time = Math.max(0, Math.min(duration, timeAt(e.clientX)));
    setHover(time);
    if (dragging.current) seek(time);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, () => number> = {
      ArrowRight: () => t + 5,
      ArrowUp: () => t + 5,
      ArrowLeft: () => t - 5,
      ArrowDown: () => t - 5,
      PageUp: () => chapters[Math.min(ci + 1, chapters.length - 1)].t,
      PageDown: () =>
        t - chapter.t > 3 || ci === 0 ? chapter.t : chapters[ci - 1].t,
      Home: () => 0,
      End: () => duration,
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    seek(move());
  }

  return (
    <div className="player">
      <div className="player-main">
        <div className="stage" data-playing={playing || undefined}>
          <img src={video.image} alt={video.alt} width={1600} height={900} />
          <button
            type="button"
            className="stage-hit"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
          >
            {!playing && (
              <span className="stage-play" aria-hidden="true">
                <Play size={34} fill="currentColor" />
              </span>
            )}
          </button>
          <p className="chapter-card" aria-hidden="true" key={ci}>
            <span>
              Chapter {ci + 1} of {chapters.length}
            </span>
            {chapter.title}
          </p>
        </div>

        <div className="controls">
          <button
            type="button"
            className="ctl"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>
          <span className="ctl-time">
            {clock(t)} <span aria-hidden="true">/</span> {clock(duration)}
          </span>
          <div
            ref={track}
            className="timeline"
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(t)}
            aria-valuetext={`${clock(t)}, ${chapter.title}`}
            onKeyDown={onKey}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => setHover(null)}
          >
            <div className="segments">
              {chapters.map((c, i) => {
                const end = chapters[i + 1]?.t ?? duration;
                const fill = Math.max(0, Math.min(1, (t - c.t) / (end - c.t)));
                return (
                  <span
                    key={c.t}
                    className="segment"
                    style={{ flexGrow: end - c.t }}
                    data-hover={
                      (hover !== null && chapterAt(hover) === i) || undefined
                    }
                  >
                    <span style={{ transform: `scaleX(${fill})` }} />
                  </span>
                );
              })}
            </div>
            {items.map((it, i) => (
              <span
                key={it.t + it.name}
                className="marker"
                style={{ left: (it.t / duration) * 100 + "%" }}
                data-passed={i <= current || undefined}
              />
            ))}
            <span
              className="playhead"
              style={{ left: (t / duration) * 100 + "%" }}
            />
            {hover !== null && (
              <span
                className="scrub-tip"
                style={{
                  left: `clamp(4.5rem, ${(hover / duration) * 100}%, calc(100% - 4.5rem))`,
                }}
                aria-hidden="true"
              >
                <strong>{clock(hover)}</strong>
                {chapters[chapterAt(hover)].title}
              </span>
            )}
          </div>
          <button
            type="button"
            className="ctl ctl-speed"
            onClick={() =>
              setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])
            }
            aria-label={`Playback speed ${speed}×, change`}
          >
            {speed}×
          </button>
        </div>
        <p className="player-note">
          Demo player: no video file is loaded. Scrub the timeline (arrow keys,
          Page Up/Down between chapters) and the chapters and parts list follow
          along. Your place is saved on this device.
        </p>
        <p className="visually-hidden" aria-live="polite">
          {`Chapter ${ci + 1}: ${chapter.title}`}
        </p>
        {head}
      </div>

      <aside className="player-side" aria-label="Chapters and parts">
        <h2>Chapters</h2>
        <ol className="chapters">
          {chapters.map((c, i) => (
            <li key={c.t}>
              <button
                type="button"
                onClick={() => seek(c.t)}
                aria-current={i === ci ? "step" : undefined}
              >
                <span className="chapter-time">{clock(c.t)}</span>
                {c.title}
              </button>
            </li>
          ))}
        </ol>

        <h2>On screen</h2>
        <ul className="on-screen">
          {items.map((it, i) => {
            const product = it.product
              ? products.find((p) => p.id === it.product)
              : undefined;
            return (
              <li
                key={it.t + it.name}
                data-current={i === current || undefined}
                data-passed={i <= current || undefined}
              >
                <button
                  type="button"
                  className="chapter-time"
                  onClick={() => seek(it.t)}
                  aria-label={`Jump to ${clock(it.t)}`}
                >
                  {clock(it.t)}
                </button>
                <div>
                  {i === current && <span className="now">On screen now</span>}
                  <p className="item-name">
                    {product ? (
                      <Link to={"/shop/" + product.id}>{it.name}</Link>
                    ) : (
                      it.name
                    )}
                  </p>
                  <p className="item-note">{it.note}</p>
                </div>
                {product && (
                  <Mockup
                    kind={product.kind}
                    color={product.colors[0]}
                    label=""
                    className="item-mock"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="player-body">{children}</div>
    </div>
  );
}
