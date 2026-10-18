import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Play, Square } from "lucide-react";
import { audio, click } from "../lib/audio";

const METERS = [
  { label: "2/4", beats: 2, accents: [0] },
  { label: "3/4", beats: 3, accents: [0] },
  { label: "4/4", beats: 4, accents: [0] },
  { label: "6/8", beats: 6, accents: [0, 3] },
];
const MARKINGS: [number, string][] = [
  [40, "Largo"],
  [60, "Adagio"],
  [76, "Andante"],
  [108, "Moderato"],
  [120, "Allegro"],
  [168, "Presto"],
];
const MIN = 40;
const MAX = 208;

export function Metronome() {
  const [bpm, setBpm] = useState(84);
  const [meter, setMeter] = useState(METERS[2]);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(-1);
  const taps = useRef<number[]>([]);
  const live = useRef({ bpm, meter });
  live.current = { bpm, meter };

  useEffect(() => {
    const c = running ? audio() : null;
    if (!c) {
      setBeat(-1);
      return;
    }
    const queue: { beat: number; time: number }[] = [];
    let next = c.currentTime + 0.06;
    let count = 0;
    const schedule = window.setInterval(() => {
      while (next < c.currentTime + 0.12) {
        const { bpm, meter } = live.current;
        const b = count % meter.beats;
        click(next, meter.accents.includes(b));
        queue.push({ beat: b, time: next });
        // 6/8 is felt in eighths: the click runs at the eighth-note rate of the dotted-quarter tempo.
        next += meter.beats === 6 ? 60 / bpm / 3 : 60 / bpm;
        count++;
      }
    }, 25);
    let frame = requestAnimationFrame(function draw() {
      while (queue.length && queue[0].time <= c.currentTime)
        setBeat(queue.shift()!.beat);
      frame = requestAnimationFrame(draw);
    });
    return () => {
      clearInterval(schedule);
      cancelAnimationFrame(frame);
    };
  }, [running]);

  const set = (n: number) =>
    setBpm(Math.min(MAX, Math.max(MIN, Math.round(n))));

  const tap = () => {
    const now = performance.now();
    taps.current = [...taps.current.filter((t) => now - t < 2500), now].slice(
      -5,
    );
    if (taps.current.length < 2) return;
    const gaps = taps.current.slice(1).map((t, i) => t - taps.current[i]);
    set(60000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length));
  };

  const marking = MARKINGS.filter(([from]) => bpm >= from).at(-1)![1];

  return (
    <section className="tool metronome" aria-labelledby="metronome-h">
      <h2 id="metronome-h">Metronome</h2>
      <div className="metro-readout">
        <output className="metro-bpm" htmlFor="bpm" aria-live="off">
          {bpm}
        </output>
        <span className="metro-unit">
          {meter.beats === 6 ? "dotted quarters" : "beats"} per minute
          <em>{marking}</em>
        </span>
      </div>
      <div className="metro-beats" aria-hidden="true">
        {Array.from({ length: meter.beats }, (_, i) => (
          <span
            key={i}
            data-on={beat === i ? "" : undefined}
            data-accent={meter.accents.includes(i) ? "" : undefined}
          />
        ))}
      </div>
      <div className="metro-tempo">
        <button
          type="button"
          className="icon-btn"
          onClick={() => set(bpm - 1)}
          aria-label="One beat per minute slower"
        >
          <Minus aria-hidden="true" />
        </button>
        <label className="sr-only" htmlFor="bpm">
          Tempo in beats per minute
        </label>
        <input
          id="bpm"
          type="range"
          min={MIN}
          max={MAX}
          value={bpm}
          onChange={(e) => set(Number(e.target.value))}
        />
        <button
          type="button"
          className="icon-btn"
          onClick={() => set(bpm + 1)}
          aria-label="One beat per minute faster"
        >
          <Plus aria-hidden="true" />
        </button>
      </div>
      <fieldset className="segmented">
        <legend>Time signature</legend>
        {METERS.map((m) => (
          <button
            key={m.label}
            type="button"
            aria-pressed={m === meter}
            onClick={() => setMeter(m)}
          >
            {m.label}
          </button>
        ))}
      </fieldset>
      <div className="tool-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setRunning((r) => !r)}
          aria-pressed={running}
        >
          {running ? (
            <Square aria-hidden="true" />
          ) : (
            <Play aria-hidden="true" />
          )}
          {running ? "Stop" : "Start"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={tap}>
          Tap tempo
        </button>
      </div>
    </section>
  );
}
