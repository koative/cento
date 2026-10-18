import type { Palette } from "../content";

/*
 * Sprites are strings of palette letters, one per pixel:
 * . clear · k ink · w light · h hero · d hero dark · a accent · g ground · n near · f far
 * Faces use their own letters: r hair · s skin · c shirt.
 */
export const SPRITES = {
  blob: [
    "....hhhh....",
    "..hhhhhhhh..",
    ".hhhwhhhhhh.",
    ".hhwhhhhhhh.",
    "hhhhwkhhwkhh",
    "hhhhkkhhkkhh",
    "hahhhhhhhhah",
    "dhhhhkkkhhhd",
    ".dddhhhhddd.",
    "..dddddddd..",
  ],
  blobUp: [
    "....hhhh....",
    "...hhhhhh...",
    "..hhwhhhhh..",
    "..hwhhhhhh..",
    "..hhwkhwkh..",
    "..hhkkhkkh..",
    "..ahhhhhha..",
    "..hhhkkhhh..",
    "..dhhhhhhd..",
    "...dhhhhd...",
    "....dddd....",
  ],
  blobSquash: [
    "...hhhhhhhh...",
    ".hhwhhhhhhhhh.",
    "hhwhwkhhhwkhhh",
    "hahhkkhhhkkhah",
    "dhhhhhkkkhhhhd",
    ".dddddddddddd.",
  ],
  thistle: [
    ".a..a..",
    "..aaa.a",
    "a.aaa..",
    ".aaaaa.",
    "..aaa..",
    "...n...",
    ".n.n...",
    "..nn.n.",
    "...nn..",
  ],
  berry: [".n..", "aaa.", "awaa", ".aa."],
  bee: ["..ww....", ".wwww...", "..ww.ak.", "kakakaka", "akakakak", ".kakaka."],
  cloud: [
    "....www.....",
    "..wwwwwww...",
    ".wwwwwwwwww.",
    "wwwwwwwwwwww",
    ".wwwwwwwwww.",
  ],
  ship: [
    "....ww.....",
    "...wkkw....",
    ".hhhhhhhh..",
    "ahhhhhhhhhh",
    ".dddddddd..",
    "..d....d...",
  ],
  lighthouse: [
    "...k...",
    "..kkk..",
    ".kaaak.",
    ".kaaak.",
    "kkkkkkk",
    "..hhh..",
    "..hhh..",
    "..www..",
    "..www..",
    ".hhhhh.",
    ".hhhhh.",
    ".wwwww.",
    ".wwwww.",
    ".hhhhh.",
    "hhhhhhh",
    "kkkkkkk",
  ],
  boat: [
    "....w....",
    "....ww...",
    "....www..",
    "....w....",
    "hhhhhhhhh",
    ".ddddddd.",
  ],
  fish: ["...hhhh..a", ".hhhhhhhaa", "hwkhhhhhaa", ".dddddddaa", "...dddd..a"],
  hook: ["..k", "..k", "..k", "k.k", "kk."],
  cat: [
    "k.....k..",
    "kk...kk..",
    "kkkkkkk..",
    "kakkkak..",
    "kkkkkkk..",
    ".kkkkkk.k",
    ".kkkkkkk.",
    ".kk..kk..",
  ],
  washer: [
    "kkkkkkkkkk",
    "kwwwwwaawk",
    "kwwwwwwwwk",
    "kwwkkkkwwk",
    "kwkhhhhkwk",
    "kwkhwhhkwk",
    "kwkhhhhkwk",
    "kwwkkkkwwk",
    "kwwwwwwwwk",
    "kkkkkkkkkk",
  ],
  kite: [
    "...h...",
    "..hhh..",
    ".hhwhh.",
    "hhhwhhh",
    ".ddwdd.",
    "..ddd..",
    "...d...",
  ],
  star: [
    "...a...",
    "...a...",
    "aaaaaaa",
    ".aaaaa.",
    "..aaa..",
    ".aa.aa.",
    ".a...a.",
  ],
  heart: [".hh.hh.", "hhwhhhh", "hwhhhhh", ".hhhhh.", "..hhh..", "...h..."],
  moon: ["..www.", ".ww...", "ww....", "ww....", "ww....", ".ww...", "..www."],
} satisfies Record<string, string[]>;

export type SpriteName = keyof typeof SPRITES;

export type Colors = Record<string, string>;

export const colorsFor = (p: Palette): Colors => ({
  k: p.ink,
  w: p.light,
  h: p.hero,
  d: p.heroDark,
  a: p.accent,
  g: p.ground,
  n: p.near,
  f: p.far,
});

/** One SVG path per colour, each pixel run drawn as a 1px-tall rectangle. */
export function spritePaths(
  grid: string[],
  colors: Colors,
  x = 0,
  y = 0,
  flip = false,
) {
  const byColor: Record<string, string> = {};
  const w = Math.max(...grid.map((r) => r.length));
  grid.forEach((row, ry) => {
    const line = flip ? row.padEnd(w, ".").split("").reverse().join("") : row;
    let start = 0;
    for (let i = 1; i <= line.length; i++) {
      if (i < line.length && line[i] === line[start]) continue;
      const c = colors[line[start]];
      if (c)
        byColor[c] =
          (byColor[c] ?? "") +
          `M${x + start} ${y + ry}h${i - start}v1h${start - i}z`;
      start = i;
    }
  });
  return Object.entries(byColor).map(([fill, d]) => ({ fill, d }));
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  grid: string[],
  colors: Colors,
  x: number,
  y: number,
) {
  const ox = Math.round(x);
  const oy = Math.round(y);
  grid.forEach((row, ry) => {
    for (let i = 0; i < row.length; i++) {
      const c = colors[row[i]];
      if (!c) continue;
      ctx.fillStyle = c;
      ctx.fillRect(ox + i, oy + ry, 1, 1);
    }
  });
}

export const spriteSize = (grid: string[]) => ({
  w: Math.max(...grid.map((r) => r.length)),
  h: grid.length,
});

/** Deterministic random numbers so every screenshot draws the same way twice. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mix two #rrggbb colours. */
export function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return (
    "#" +
    pa
      .map((v, i) =>
        Math.round(v + (pb[i] - v) * t)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

/** A pixel disc as one path. */
export function discPath(cx: number, cy: number, r: number) {
  let d = "";
  for (let y = -r; y < r; y++) {
    const half = Math.round(Math.sqrt(r * r - (y + 0.5) ** 2));
    d += `M${cx - half} ${cy + y}h${half * 2}v1h${-half * 2}z`;
  }
  return d;
}

/** Height of a looping ridge at column x (period = width) built from a few sines. */
export function ridge(
  x: number,
  width: number,
  phases: number[],
  amps: number[],
) {
  return amps.reduce(
    (h, a, i) =>
      h + a * Math.sin((x * (i + 1) * 2 * Math.PI) / width + phases[i]),
    0,
  );
}

/** A stepped skyline path: one column per pixel from a height function, closed at the bottom. */
export function ridgePath(
  width: number,
  bottom: number,
  heightAt: (x: number) => number,
) {
  let d = `M0 ${bottom}`;
  for (let x = 0; x < width; x++) {
    const y = Math.round(heightAt(x));
    d += `V${y}H${x + 1}`;
  }
  return d + `V${bottom}Z`;
}
