import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { bands, scenes, type Product } from "../content";
import { attenuation, dbA, residual } from "../lib/noise";

const W = 640;
const H = 300;
const PAD = { l: 40, r: 12, t: 14, b: 30 };
const x = (f: number) =>
  PAD.l + ((Math.log10(f) - Math.log10(20)) / 3) * (W - PAD.l - PAD.r);
const y = (db: number) => PAD.t + (1 - db / 100) * (H - PAD.t - PAD.b);

/** Catmull-Rom through the band points, written as cubic Béziers. */
function curve(levels: number[]) {
  const p = levels.map((l, i) => [x(bands[i]), y(l)]);
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [a, b, c, e] = [
      p[i - 1] ?? p[i],
      p[i],
      p[i + 1],
      p[i + 2] ?? p[i + 1],
    ];
    const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
}

function feelsLike(db: number) {
  if (db < 35) return "a bedroom at night";
  if (db < 45) return "a library reading room";
  if (db < 55) return "a quiet office";
  if (db < 65) return "a normal conversation";
  return "a busy street";
}

type Audio = {
  ctx: AudioContext;
  tone: BiquadFilterNode;
  low: BiquadFilterNode;
  out: GainNode;
};

export function NoiseLab({
  product,
  title,
  text,
}: {
  product: Product;
  title: string;
  text: string;
}) {
  const id = useId();
  const [sceneId, setSceneId] = useState(scenes[0].id);
  const [strength, setStrength] = useState(80);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<Audio | null>(null);
  const scene = scenes.find((s) => s.id === sceneId) ?? scenes[0];
  const { anc, passive } = product.specs ?? { anc: 0, passive: 0 };
  const s = strength / 100;
  const left = residual(scene.levels, anc, passive, s);
  const before = Math.round(dbA(scene.levels));
  const after = Math.round(dbA(left));

  // Rendered audio follows the chart: overall gain from the high-band isolation, a low shelf for the cancelled rumble.
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const high = attenuation(4000, anc, passive, s);
    const low = attenuation(125, anc, passive, s);
    const t = a.ctx.currentTime;
    a.tone.type = scene.tone.type;
    a.tone.frequency.setTargetAtTime(scene.tone.frequency, t, 0.05);
    a.tone.Q.setTargetAtTime(scene.tone.q, t, 0.05);
    a.low.gain.setTargetAtTime(-(low - high), t, 0.08);
    a.out.gain.setTargetAtTime(0.35 * Math.pow(10, -high / 20), t, 0.08);
  }, [scene, anc, passive, s, playing]);

  useEffect(() => () => void audio.current?.ctx.close(), []);

  function toggle() {
    if (playing) {
      void audio.current?.ctx.suspend();
      setPlaying(false);
      return;
    }
    if (!audio.current) {
      const ctx = new AudioContext();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i++) {
        // Leaky-integrated white noise: a soft, rumbling brown noise closer to real rooms than hiss.
        last = (last + 0.04 * (Math.random() * 2 - 1)) / 1.04;
        data[i] = last * 3.2;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const tone = ctx.createBiquadFilter();
      const low = ctx.createBiquadFilter();
      low.type = "lowshelf";
      low.frequency.value = 500;
      const out = ctx.createGain();
      out.gain.value = 0;
      src.connect(tone).connect(low).connect(out).connect(ctx.destination);
      src.start();
      audio.current = { ctx, tone, low, out };
    } else void audio.current.ctx.resume();
    setPlaying(true);
  }

  return (
    <section className="lab" aria-labelledby={id + "-h"}>
      <div className="lab-inner">
        <div className="lab-copy">
          <h2 id={id + "-h"}>{title}</h2>
          <p>{text}</p>

          <fieldset className="scene-picker">
            <legend>Where are you?</legend>
            {scenes.map((sc) => (
              <label key={sc.id}>
                <input
                  type="radio"
                  name={id + "-scene"}
                  value={sc.id}
                  checked={sc.id === sceneId}
                  onChange={() => setSceneId(sc.id)}
                />
                <span>{sc.name}</span>
              </label>
            ))}
          </fieldset>

          <div className="lab-slider">
            <label htmlFor={id + "-s"}>
              Cancelling on {product.name}
              <output htmlFor={id + "-s"} className="num">
                {strength === 0 ? "Off" : strength + "%"}
              </output>
            </label>
            <input
              id={id + "-s"}
              type="range"
              min={0}
              max={100}
              step={5}
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              aria-valuetext={
                strength === 0
                  ? "Off, passive isolation only"
                  : `${strength} percent`
              }
              style={{ ["--fill" as string]: strength + "%" }}
            />
          </div>

          <div className="lab-readout" aria-live="polite">
            <p>
              <span className="muted">In the {scene.name.toLowerCase()}</span>
              <b className="num">{before} dB(A)</b>
            </p>
            <p>
              <span className="muted">At your ear</span>
              <b className="num quiet">{after} dB(A)</b>
            </p>
            <p className="feels">About as loud as {feelsLike(after)}.</p>
          </div>

          <button
            type="button"
            className="btn btn-ghost-dark"
            onClick={toggle}
            aria-pressed={playing}
          >
            {playing ? (
              <Pause size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" />
            )}
            {playing ? "Pause the room" : "Play the room"}
          </button>
        </div>

        <figure className="lab-chart">
          <img
            src={scene.image}
            alt={scene.alt}
            className="lab-photo"
            width={1400}
            height={933}
            loading="lazy"
          />
          <figcaption className="lab-place">{scene.place}</figcaption>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Noise spectrum: ${before} dB(A) in the ${scene.name.toLowerCase()}, ${after} dB(A) at your ear with cancelling at ${strength}%.`}
          >
            {[20, 40, 60, 80].map((db) => (
              <g key={db}>
                <line
                  x1={PAD.l}
                  x2={W - PAD.r}
                  y1={y(db)}
                  y2={y(db)}
                  className="grid"
                />
                <text
                  x={PAD.l - 8}
                  y={y(db) + 4}
                  textAnchor="end"
                  className="tick"
                >
                  {db}
                </text>
              </g>
            ))}
            {[63, 250, 1000, 4000, 16000].map((f) => (
              <g key={f}>
                <line
                  x1={x(f)}
                  x2={x(f)}
                  y1={PAD.t}
                  y2={H - PAD.b}
                  className="grid"
                />
                <text x={x(f)} y={H - 10} textAnchor="middle" className="tick">
                  {f >= 1000 ? f / 1000 + "k" : f}
                </text>
              </g>
            ))}
            <path
              d={
                curve(scene.levels) +
                `L${x(bands[9])} ${y(0)}L${x(bands[0])} ${y(0)}Z`
              }
              className="ambient"
            />
            <path d={curve(scene.levels)} className="ambient-line" />
            <path d={curve(left)} className="residual" />
          </svg>
          <p className="lab-key">
            <span className="key-ambient">The room</span>
            <span className="key-residual">At your ear</span>
            <span className="muted">
              Hz across, dB up. Modelled from our chamber measurements; fit and
              ears vary.
            </span>
          </p>
        </figure>
      </div>
    </section>
  );
}
