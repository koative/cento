import { bands } from "../content";

/** A-weighting per octave band: how loud each band sounds to a human ear relative to 1 kHz. */
const A_WEIGHT = [-39.4, -26.2, -16.1, -8.6, -3.2, 0, 1.2, 1, -1.1, -6.6];

/**
 * Attenuation in dB at frequency f. Active cancelling peaks in the low range and fades
 * above ~1 kHz; passive isolation from cups or tips rises with frequency.
 */
export function attenuation(
  f: number,
  anc: number,
  passive: number,
  strength: number,
) {
  const active = (anc * strength) / Math.pow(1 + Math.pow(f / 1000, 2), 0.9);
  const lowRoll = Math.min(1, f / 60); // cancelling is weaker in the deepest sub-bass
  return active * (0.7 + 0.3 * lowRoll) + (passive * f) / (f + 300);
}

export function residual(
  levels: number[],
  anc: number,
  passive: number,
  strength: number,
) {
  return levels.map((l, i) =>
    Math.max(4, l - attenuation(bands[i], anc, passive, strength)),
  );
}

/** Overall perceived level in dB(A) from octave-band levels. */
export function dbA(levels: number[]) {
  return (
    10 *
    Math.log10(
      levels.reduce((s, l, i) => s + Math.pow(10, (l + A_WEIGHT[i]) / 10), 0),
    )
  );
}
