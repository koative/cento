/* One shared AudioContext, created on the first user gesture. Every call is a no-op where Web Audio is missing. */
let ctx: AudioContext | null = null;

export function audio(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export const freq = (midi: number, a4 = 440) => a4 * 2 ** ((midi - 69) / 12);

/** A soft, piano-like note: a triangle with a quieter octave above, decaying over ~1.5 s. */
export function playNote(midi: number, when = 0) {
  const c = audio();
  if (!c) return;
  const t = Math.max(c.currentTime, when);
  const out = c.createGain();
  out.gain.setValueAtTime(0.0001, t);
  out.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
  out.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
  out.connect(c.destination);
  for (const [type, mult, level] of [
    ["triangle", 1, 1],
    ["sine", 2, 0.25],
  ] as const) {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.value = freq(midi) * mult;
    g.gain.value = level;
    osc.connect(g).connect(out);
    osc.start(t);
    osc.stop(t + 1.6);
  }
}

/** A short wooden click for the metronome; the downbeat is higher. */
export function click(when: number, accent: boolean) {
  const c = audio();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "square";
  osc.frequency.value = accent ? 1760 : 1175;
  g.gain.setValueAtTime(accent ? 0.18 : 0.1, when);
  g.gain.exponentialRampToValueAtTime(0.0001, when + 0.05);
  osc.connect(g).connect(c.destination);
  osc.start(when);
  osc.stop(when + 0.06);
}

/** A sustained reference tone. Returns a stop function. */
export function drone(hz: number): () => void {
  const c = audio();
  if (!c) return () => {};
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.value = hz;
  const soften = c.createBiquadFilter();
  soften.type = "lowpass";
  soften.frequency.value = 1400;
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.08, c.currentTime + 0.15);
  osc.connect(soften).connect(g).connect(c.destination);
  osc.start();
  return () => {
    g.gain.cancelScheduledValues(c.currentTime);
    g.gain.setValueAtTime(g.gain.value, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12);
    osc.stop(c.currentTime + 0.15);
  };
}
