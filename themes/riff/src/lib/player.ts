import { useSyncExternalStore } from "react";
import { releases, type Release, type Track } from "../content";
import { seeded } from "./format";

/** Every track plays a preview of this many seconds. */
export const PREVIEW = 30;

type State = {
  slug: string | null;
  index: number;
  playing: boolean;
  pos: number;
};
let state: State = { slug: null, index: 0, playing: false, pos: 0 };
const listeners = new Set<() => void>();
let timer: number | undefined;
let last = 0;

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

export function usePlayer() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

export function current(
  s: State = state,
): { release: Release; track: Track } | null {
  const release = releases.find((r) => r.slug === s.slug);
  return release ? { release, track: release.tracks[s.index] } : null;
}

function start(pos: number) {
  const now = current();
  if (!now) return;
  sound.start(now.release.slug, now.track, pos);
  clearInterval(timer);
  last = performance.now();
  timer = window.setInterval(() => {
    const t = performance.now();
    const pos = state.pos + (t - last) / 1000;
    last = t;
    if (pos < PREVIEW) return set({ pos });
    const release = current()!.release;
    if (state.index + 1 < release.tracks.length)
      play(release.slug, state.index + 1);
    else stop(0);
  }, 200);
  set({ playing: true, pos });
}

function stop(pos = state.pos) {
  clearInterval(timer);
  sound.stop();
  set({ playing: false, pos });
}

/** Play a track; pressing the playing track again pauses it. */
export function play(slug: string, index: number) {
  if (state.slug === slug && state.index === index)
    return state.playing ? stop() : start(state.pos);
  stop(0);
  set({ slug, index, pos: 0 });
  start(0);
}

export const toggle = () => (state.playing ? stop() : start(state.pos));

export function seek(pos: number) {
  if (state.playing) start(pos);
  else set({ pos });
}

export function skip(delta: 1 | -1) {
  const now = current();
  if (!now) return;
  const n = now.release.tracks.length;
  play(now.release.slug, (state.index + delta + n) % n);
}

export function close() {
  stop(0);
  set({ slug: null, index: 0 });
}

/* ------------------------------------------------------------ sound
 * A real preview file plays when the track has `audio`; otherwise a small
 * Web Audio sketch (bass riff + kick at the track's tempo) stands in for it.
 */

const sound = (() => {
  let ctx: AudioContext | null = null;
  let out: GainNode | null = null;
  let file: HTMLAudioElement | null = null;

  function stop() {
    file?.pause();
    out?.disconnect();
    out = null;
  }

  function start(slug: string, track: Track, from: number) {
    stop();
    if (track.audio) {
      file ??= new Audio();
      if (file.src !== track.audio) file.src = track.audio;
      file.currentTime = from;
      void file.play().catch(() => {});
      return;
    }
    ctx ??= new AudioContext();
    void ctx.resume();
    out = ctx.createGain();
    out.gain.value = 0.16;
    out.connect(ctx.destination);

    const rnd = seeded(slug + track.title);
    const scale = [0, 3, 5, 7, 10, 12];
    const riff = Array.from({ length: 8 }, () =>
      rnd() < 0.8 ? scale[Math.floor(rnd() * scale.length)] : null,
    );
    const step = 60 / track.bpm / 2;
    const t0 = ctx.currentTime + 0.05;
    for (let i = Math.ceil(from / step); i * step < PREVIEW; i++) {
      const t = t0 + i * step - from;
      const note = riff[i % 8];
      // second half of each four-bar phrase drops a fourth, so the sketch moves
      if (note !== null)
        pluck(
          ctx,
          out,
          t,
          110 * 2 ** ((track.root + note - (i % 32 >= 16 ? 5 : 0)) / 12),
          step,
        );
      if (i % 4 === 0) kick(ctx, out, t);
    }
  }

  return { start, stop };
})();

function pluck(
  ctx: AudioContext,
  out: GainNode,
  t: number,
  freq: number,
  len: number,
) {
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const env = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2400, t);
  filter.frequency.exponentialRampToValueAtTime(300, t + len);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.6, t + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0001, t + len * 0.95);
  osc.connect(filter).connect(env).connect(out);
  osc.start(t);
  osc.stop(t + len);
}

function kick(ctx: AudioContext, out: GainNode, t: number) {
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.frequency.setValueAtTime(140, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.18);
  env.gain.setValueAtTime(0.9, t);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  osc.connect(env).connect(out);
  osc.start(t);
  osc.stop(t + 0.26);
}
