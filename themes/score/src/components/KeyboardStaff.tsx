import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Play, Square, Trash2 } from "lucide-react";
import { playNote } from "../lib/audio";
import { Staff, STAFF_SLOTS, noteName, type StaffNote } from "./Staff";

/* C4 to E5. White keys map to A S D F G H J K L ; and black keys to W E T Y U O P, like a DAW. */
const WHITE = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76];
const BLACK = [
  { midi: 61, after: 0 },
  { midi: 63, after: 1 },
  { midi: 66, after: 3 },
  { midi: 68, after: 4 },
  { midi: 70, after: 5 },
  { midi: 73, after: 7 },
  { midi: 75, after: 8 },
];
const KEYMAP: Record<string, number> = Object.fromEntries([
  ..."asdfghjkl;".split("").map((k, i) => [k, WHITE[i]] as const),
  ..."wetyuop".split("").map((k, i) => [k, BLACK[i].midi] as const),
]);
const SHORTCUT = Object.fromEntries(
  Object.entries(KEYMAP).map(([k, m]) => [m, k.toUpperCase()]),
);

type Played = StaffNote & { at: number };

export function KeyboardStaff({ compact = false }: { compact?: boolean }) {
  const [notes, setNotes] = useState<Played[]>([]);
  const [down, setDown] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | undefined>();
  const [playing, setPlaying] = useState(false);
  const timers = useRef<number[]>([]);
  const nextId = useRef(0);

  const stopPlayback = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPlaying(false);
    setCurrent(undefined);
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const strike = (midi: number) => {
    if (playing) stopPlayback();
    playNote(midi);
    setDown(midi);
    window.setTimeout(() => setDown((d) => (d === midi ? null : d)), 180);
    setNotes((n) =>
      [...n, { id: nextId.current++, midi, at: performance.now() }].slice(
        -STAFF_SLOTS,
      ),
    );
  };

  const playBack = () => {
    if (playing) return stopPlayback();
    setPlaying(true);
    let t = 0;
    notes.forEach((n, i) => {
      if (i > 0) t += Math.min(1000, Math.max(160, n.at - notes[i - 1].at));
      timers.current.push(
        window.setTimeout(() => {
          playNote(n.midi);
          setCurrent(i);
        }, t),
      );
    });
    timers.current.push(window.setTimeout(stopPlayback, t + 700));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const midi = KEYMAP[e.key.toLowerCase()];
    if (midi === undefined || e.repeat || e.metaKey || e.ctrlKey || e.altKey)
      return;
    e.preventDefault();
    strike(midi);
  };

  const last = notes.at(-1);
  const label = notes.length
    ? `Staff with ${notes.length} engraved ${notes.length === 1 ? "note" : "notes"}: ${notes.map((n) => noteName(n.midi)).join(", ")}`
    : "Empty treble staff, waiting for the first note";

  return (
    <div className={`instrument${compact ? " instrument-compact" : ""}`}>
      <div className="manuscript">
        <Staff notes={notes} current={current} label={label} />
        <div className="manuscript-foot">
          <p className="manuscript-names" aria-hidden="true">
            {notes.length
              ? notes.map((n) => noteName(n.midi)).join("  ")
              : "Every melody starts with one note."}
          </p>
          <div className="manuscript-actions">
            <button
              type="button"
              className="btn btn-quiet"
              onClick={playBack}
              disabled={!notes.length}
            >
              {playing ? (
                <Square aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
              {playing ? "Stop" : "Play it back"}
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                stopPlayback();
                setNotes([]);
              }}
              disabled={!notes.length}
            >
              <Trash2 aria-hidden="true" />
              Clear
            </button>
          </div>
        </div>
      </div>
      <div
        className="keys"
        role="group"
        aria-label="Piano keyboard, C4 to E5. Letter keys A to semicolon play white notes."
        onKeyDown={onKeyDown}
      >
        {WHITE.map((midi) => (
          <button
            key={midi}
            type="button"
            className="key key-white"
            data-down={down === midi ? "" : undefined}
            aria-label={`Play ${noteName(midi)}`}
            onPointerDown={(e) => {
              e.preventDefault();
              e.currentTarget.focus();
              strike(midi);
            }}
            onClick={(e) => e.detail === 0 && strike(midi)}
          >
            <span className="key-name">{noteName(midi).replace(/\d/, "")}</span>
            {!compact && <kbd className="key-kbd">{SHORTCUT[midi]}</kbd>}
          </button>
        ))}
        {BLACK.map(({ midi, after }) => (
          <button
            key={midi}
            type="button"
            className="key key-black"
            style={{ left: `${((after + 1) / WHITE.length) * 100}%` }}
            data-down={down === midi ? "" : undefined}
            aria-label={`Play ${noteName(midi)}`}
            onPointerDown={(e) => {
              e.preventDefault();
              e.currentTarget.focus();
              strike(midi);
            }}
            onClick={(e) => e.detail === 0 && strike(midi)}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {last ? `${noteName(last.midi)} engraved` : ""}
      </p>
    </div>
  );
}
