import { useMemo } from "react";
import type { Game, Palette, SceneKind } from "../content";
import {
  SPRITES,
  colorsFor,
  discPath,
  mix,
  ridge,
  ridgePath,
  rng,
  spritePaths,
  type Colors,
} from "../lib/pixels";

/*
 * Key art and "screenshots" for every game, drawn as pixel art on a 160×90 grid.
 * The seed decides layout, so each shot is stable between renders.
 */
const W = 160;
const H = 90;

type Layer = { fill: string; d: string; opacity?: number };
type Painter = (p: Palette, rand: () => number, c: Colors) => Layer[];

const rect = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y}h${w}v${h}h${-w}z`;
const between = (rand: () => number, lo: number, hi: number) =>
  Math.round(lo + rand() * (hi - lo));

function bands(
  top: string,
  bottom: string,
  y0: number,
  y1: number,
  n: number,
): Layer[] {
  const step = (y1 - y0) / n;
  return Array.from({ length: n }, (_, i) => ({
    fill: mix(top, bottom, i / (n - 1)),
    d: rect(0, Math.round(y0 + i * step), W, Math.ceil(step) + 1),
  }));
}

const sprite = (
  name: keyof typeof SPRITES,
  c: Colors,
  x: number,
  y: number,
  flip = false,
): Layer[] => spritePaths(SPRITES[name], c, x, y, flip);

const hillsLine = (rand: () => number, base: number, amps: number[]) => {
  const phases = amps.map(() => rand() * Math.PI * 2);
  return ridgePath(W, H, (x) => base + ridge(x, W, phases, amps));
};

/** Pixel line between two points (Bresenham), as one path. */
function line(x0: number, y0: number, x1: number, y1: number) {
  let d = "";
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    d += rect(x0, y0, 1, 1);
    if (x0 === x1 && y0 === y1) return d;
    const e2 = 2 * err;
    if (e2 >= dy) ((err += dy), (x0 += sx));
    if (e2 <= dx) ((err += dx), (y0 += sy));
  }
}

const painters: Record<SceneKind, Painter> = {
  hills(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, 64, 6)];
    out.push({ fill: p.light, d: discPath(between(rand, 100, 145), 18, 7) });
    for (let i = 0; i < 3; i++)
      out.push(
        ...sprite("cloud", c, between(rand, 0, 140), between(rand, 6, 30)),
      );
    out.push({ fill: p.far, d: hillsLine(rand, 52, [5, 3, 2]) });
    out.push({ fill: p.near, d: hillsLine(rand, 64, [4, 2, 1]) });
    out.push(
      { fill: p.ground, d: rect(0, 76, W, 14) },
      { fill: p.near, d: rect(0, 76, W, 2) },
    );
    let tufts = "";
    for (let x = between(rand, 0, 5); x < W; x += between(rand, 4, 9))
      tufts += rect(x, 75, 1, 1);
    out.push(
      { fill: p.near, d: tufts },
      {
        fill: mix(p.ground, p.ink, 0.25),
        d: rect(0, 82, W, 1) + rect(0, 87, W, 1),
      },
    );
    const blobX = between(rand, 26, 60);
    for (
      let x = blobX + between(rand, 22, 34);
      x < W - 8;
      x += between(rand, 30, 48)
    ) {
      out.push(...sprite("thistle", c, x, 67));
      out.push(
        ...sprite("berry", c, x + between(rand, -4, 8), between(rand, 44, 58)),
      );
    }
    if (rand() > 0.4)
      out.push(
        ...sprite("bee", c, between(rand, 90, 140), between(rand, 28, 40)),
      );
    out.push(
      ...(rand() > 0.5
        ? sprite("blobUp", c, blobX, between(rand, 44, 56))
        : sprite("blob", c, blobX, 66)),
    );
    return out;
  },

  space(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, H, 8)];
    let stars = "";
    let bright = "";
    for (let i = 0; i < 46; i++)
      stars += rect(between(rand, 0, W - 1), between(rand, 0, H - 1), 1, 1);
    for (let i = 0; i < 8; i++) {
      const x = between(rand, 2, W - 3);
      const y = between(rand, 2, H - 3);
      bright += rect(x, y - 1, 1, 3) + rect(x - 1, y, 3, 1);
    }
    out.push(
      { fill: p.light, d: stars, opacity: 0.55 },
      { fill: p.light, d: bright },
    );
    const planet = (cx: number, cy: number, r: number, color: string) => {
      out.push({ fill: mix(color, p.ink, 0.45), d: discPath(cx, cy, r) });
      out.push({ fill: color, d: discPath(cx - 1, cy - 1, r - 1) });
      out.push({
        fill: mix(color, p.light, 0.5),
        d: rect(cx - Math.round(r / 2), cy - Math.round(r / 2), 2, 2),
      });
    };
    const mirror = rand() > 0.5;
    const swap = rand() > 0.6;
    const X = (x: number) => (mirror ? W - x : x);
    const big = {
      x: X(between(rand, 92, 130)),
      y: between(rand, 24, 62),
      r: between(rand, 12, 21),
    };
    planet(big.x, big.y, big.r, swap ? p.near : p.far);
    if (rand() > 0.3) {
      let ring = "";
      for (let a = 0; a < Math.PI * 2; a += 0.04) {
        const x = Math.round(big.x + Math.cos(a) * (big.r + 8));
        const y = Math.round(big.y + Math.sin(a) * 3);
        if (Math.sin(a) < 0 && Math.abs(x - big.x) < big.r) continue;
        ring += rect(x, y, 1, 1);
      }
      out.push({ fill: p.light, d: ring, opacity: 0.85 });
    }
    const small = {
      x: X(between(rand, 20, 58)),
      y: between(rand, 16, 72),
      r: between(rand, 5, 10),
    };
    planet(small.x, small.y, small.r, swap ? p.far : p.near);
    planet(
      between(rand, 60, 100),
      rand() > 0.5 ? between(rand, 70, 82) : between(rand, 8, 18),
      between(rand, 2, 4),
      p.accent,
    );
    let path = "";
    const rx = Math.abs(big.x - small.x) / 2 + 6;
    const mx = (big.x + small.x) / 2;
    const my = (big.y + small.y) / 2;
    for (let a = 0, i = 0; a < Math.PI * 2; a += 0.05, i++) {
      if (i % 4) continue;
      path += rect(
        Math.round(mx + Math.cos(a) * rx),
        Math.round(my + Math.sin(a) * (big.r + 6)),
        1,
        1,
      );
    }
    out.push({ fill: p.accent, d: path, opacity: 0.9 });
    const t = rand() * Math.PI;
    out.push(
      ...sprite(
        "ship",
        c,
        Math.round(mx + Math.cos(t) * rx) - 5,
        Math.round(my + Math.sin(t) * (big.r + 6)) - 3,
        Math.sin(t) > 0,
      ),
    );
    return out;
  },

  sea(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, 56, 6)];
    const sunX = between(rand, 30, 120);
    out.push({ fill: mix(p.light, p.accent, 0.35), d: discPath(sunX, 56, 11) });
    for (let i = 0; i < 2; i++)
      out.push(
        ...sprite("cloud", c, between(rand, 0, 140), between(rand, 6, 26)).map(
          (l) => ({ ...l, opacity: 0.7 }),
        ),
      );
    out.push({ fill: p.far, d: hillsLine(rand, 52, [2, 1.5, 1]) });
    out.push(...bands(mix(p.ground, p.sky2, 0.35), p.ground, 56, H, 5));
    let shine = "";
    for (let y = 58; y < H; y += 3) {
      const w = Math.max(2, 14 - (y - 58) / 3);
      shine += rect(
        sunX - Math.round(w / 2) + between(rand, -2, 2),
        y,
        Math.round(w),
        1,
      );
    }
    out.push({ fill: p.light, d: shine, opacity: 0.55 });
    let waves = "";
    for (let i = 0; i < 26; i++)
      waves += rect(
        between(rand, 0, W - 6),
        between(rand, 60, H - 2),
        between(rand, 2, 5),
        1,
      );
    out.push({ fill: p.light, d: waves, opacity: 0.3 });
    const left = rand() > 0.5;
    const cx = left ? between(rand, 10, 36) : between(rand, 120, 148);
    let cliff = "";
    for (let x = cx - 26; x < cx + 26; x++) {
      const top =
        52 + Math.round(Math.abs(x - cx) ** 1.25 / 2.2) + (x % 5 === 0 ? 1 : 0);
      cliff += rect(x, top, 1, H - top);
    }
    out.push(
      { fill: p.near, d: cliff },
      { fill: mix(p.near, p.light, 0.12), d: rect(cx - 6, 52, 12, 2) },
    );
    out.push({
      fill: p.accent,
      d: `M${cx} 39L${left ? W : 0} ${between(rand, 24, 46)}V${between(rand, 52, 60)}Z`,
      opacity: 0.22,
    });
    out.push(...sprite("lighthouse", c, cx - 3, 36));
    out.push(
      ...sprite(
        "boat",
        c,
        left ? between(rand, 70, 140) : between(rand, 10, 80),
        between(rand, 62, 76),
      ),
    );
    return out;
  },

  deep(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, H, 8)];
    for (let i = 0; i < 3; i++) {
      const x = between(rand, 0, W);
      out.push({
        fill: p.light,
        d: `M${x} 0h10L${x - 18} ${H}h-6Z`,
        opacity: 0.07,
      });
    }
    out.push({ fill: p.light, d: rect(0, 0, W, 1), opacity: 0.6 });
    out.push({ fill: p.ground, d: hillsLine(rand, 82, [3, 2]) });
    for (let i = 0; i < 9; i++) {
      const x = between(rand, 2, W - 4);
      const h = between(rand, 14, 36);
      let weed = "";
      for (let y = 0; y < h; y++)
        weed += rect(x + (Math.floor(y / 4) % 2), 84 - y, 2, 1);
      out.push({ fill: i % 2 ? p.far : p.near, d: weed });
    }
    let bubbles = "";
    for (let i = 0; i < 14; i++) {
      const s = rand() > 0.7 ? 2 : 1;
      bubbles += rect(between(rand, 0, W - 2), between(rand, 4, 76), s, s);
    }
    out.push({ fill: p.light, d: bubbles, opacity: 0.7 });
    const school = Array.from({ length: 4 }, () => ({
      x: between(rand, 6, 140),
      y: between(rand, 12, 70),
      flip: rand() > 0.5,
    }));
    const other: Colors = {
      ...c,
      h: p.accent,
      d: mix(p.accent, p.ink, 0.3),
      a: p.light,
    };
    school.forEach((f, i) =>
      out.push(...sprite("fish", i ? other : c, f.x, f.y, f.flip)),
    );
    const hx = school[0].x + (school[0].flip ? 12 : -4);
    out.push(
      { fill: p.ink, d: rect(hx + 2, 0, 1, school[0].y - 2), opacity: 0.7 },
      ...sprite("hook", c, hx, school[0].y - 2),
    );
    return out;
  },

  city(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, 66, 6)];
    let stars = "";
    for (let i = 0; i < 24; i++)
      stars += rect(between(rand, 0, W - 1), between(rand, 0, 34), 1, 1);
    out.push(
      { fill: p.light, d: stars, opacity: 0.5 },
      ...sprite("moon", c, between(rand, 12, 140), between(rand, 6, 14)),
    );
    for (const [fill, base, lo, hi, lit] of [
      [p.far, 72, 18, 46, 0.25],
      [p.near, 76, 10, 30, 0.45],
    ] as const) {
      let block = "";
      let windows = "";
      for (let x = between(rand, -6, 0); x < W;) {
        const w = between(rand, 10, 22);
        const top = base - between(rand, lo, hi);
        block += rect(x, top, w, H - top);
        for (let wy = top + 3; wy < base - 4; wy += 4)
          for (let wx = x + 2; wx < x + w - 2; wx += 3)
            if (rand() < lit) windows += rect(wx, wy, 1, 2);
        x += w + between(rand, 0, 3);
      }
      out.push(
        { fill, d: block },
        { fill: p.accent, d: windows, opacity: 0.85 },
      );
    }
    const sx = between(rand, 30, 66);
    out.push({ fill: mix(p.near, p.ink, 0.4), d: rect(sx - 4, 46, 72, 30) });
    out.push(
      { fill: p.accent, d: rect(sx, 49, 64, 4) },
      {
        fill: mix(p.accent, p.light, 0.6),
        d: rect(sx, 56, 64, 18),
        opacity: 0.9,
      },
    );
    for (let i = 0; i < 4; i++)
      out.push(...sprite("washer", c, sx + 3 + i * 15, 62));
    out.push(
      { fill: p.ground, d: rect(0, 76, W, 14) },
      { fill: p.light, d: rect(0, 76, W, 1), opacity: 0.18 },
    );
    let dashes = "";
    for (let x = between(rand, 0, 6); x < W; x += 12)
      dashes += rect(x, 84, 6, 1);
    out.push({ fill: p.accent, d: dashes, opacity: 0.5 });
    out.push(
      ...sprite("cat", c, sx + 66 + between(rand, 0, 20), 68, rand() > 0.5),
    );
    return out;
  },

  cards(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, H, 6)];
    const faces: (keyof typeof SPRITES)[] = [
      "heart",
      "star",
      "blob",
      "fish",
      "kite",
      "ship",
    ];
    const deck = [...faces, ...faces].sort(() => rand() - 0.5);
    const up = new Set(
      Array.from({ length: between(rand, 2, 5) }, () => between(rand, 0, 11)),
    );
    deck.forEach((face, i) => {
      const x = 23 + (i % 4) * 30;
      const y = 8 + Math.floor(i / 4) * 26;
      out.push({ fill: p.ink, d: rect(x + 1, y + 1, 24, 22), opacity: 0.3 });
      if (up.has(i)) {
        out.push({ fill: p.near, d: rect(x, y, 24, 22) });
        const s = SPRITES[face];
        const w = Math.max(...s.map((r) => r.length));
        out.push(
          ...sprite(
            face,
            c,
            x + Math.round((24 - w) / 2),
            y + Math.round((22 - s.length) / 2),
          ),
        );
      } else {
        let dots = "";
        for (let dy = 3; dy < 20; dy += 4)
          for (let dx = 3 + (dy % 8 ? 2 : 0); dx < 22; dx += 4)
            dots += rect(x + dx, y + dy, 1, 1);
        out.push(
          { fill: p.far, d: rect(x, y, 24, 22) },
          { fill: p.hero, d: dots, opacity: 0.55 },
        );
      }
    });
    return out;
  },

  sky(p, rand, c) {
    const out = [...bands(p.sky, p.sky2, 0, 76, 7)];
    for (let i = 0; i < 4; i++)
      out.push(
        ...sprite("cloud", c, between(rand, -4, 150), between(rand, 4, 50)),
      );
    out.push({ fill: p.far, d: hillsLine(rand, 72, [3, 2, 1]) });
    out.push(
      { fill: p.near, d: hillsLine(rand, 80, [3, 1]) },
      { fill: p.ground, d: rect(0, 85, W, 5) },
    );
    const palettes: Colors[] = [
      c,
      { ...c, h: p.accent, d: mix(p.accent, p.ink, 0.3) },
      { ...c, h: "#5b3fd1", d: "#3a2896" },
    ];
    const count = between(rand, 2, 3);
    for (let i = 0; i < count; i++) {
      const kx = 20 + i * 48 + between(rand, 0, 24);
      const ky = between(rand, 10, 36);
      const ax = kx + between(rand, -30, 30);
      out.push({ fill: p.ink, d: line(kx + 3, ky + 7, ax, 85), opacity: 0.55 });
      let tail = "";
      for (let t = 0; t < 8; t++)
        tail += rect(kx + 3 + (t % 2 ? 1 : -1), ky + 7 + t, 1, 1);
      out.push(
        { fill: palettes[i].h === p.accent ? p.hero : p.accent, d: tail },
        ...sprite("kite", palettes[i], kx, ky),
      );
    }
    return out;
  },
};

type SceneProps = {
  game: Game;
  seed: number;
  label?: string;
  className?: string;
};

export function Scene({ game, seed, label, className = "" }: SceneProps) {
  const layers = useMemo(
    () =>
      painters[game.scene](game.palette, rng(seed), colorsFor(game.palette)),
    [game, seed],
  );
  return (
    <svg
      className={`scene ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ backgroundColor: game.palette.sky2 }}
    >
      {layers.map((l, i) => (
        <path key={i} d={l.d} fill={l.fill} opacity={l.opacity} />
      ))}
    </svg>
  );
}
