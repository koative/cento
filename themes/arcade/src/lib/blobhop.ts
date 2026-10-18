import type { Palette } from "../content";
import {
  SPRITES,
  colorsFor,
  drawSprite,
  mix,
  ridge,
  rng,
  spriteSize,
  type Colors,
} from "./pixels";

/*
 * The Blob Hop demo: a one-button runner on a 192×108 pixel canvas.
 * Tap to hop, hold to float higher. Thistles on the ground, bees up high, berries in between.
 */
export const VIEW = { w: 192, h: 108 };
const GROUND = 92;
const BLOB_X = 30;
const GRAVITY = 980;
const FLOAT_GRAVITY = 470;
const JUMP = -255;
const MAX_FLOAT = 0.24;

type Thing = {
  kind: "thistle" | "bee" | "berry";
  x: number;
  y: number;
  taken?: boolean;
};

export type Game = {
  y: number;
  vy: number;
  grounded: boolean;
  holding: boolean;
  floatTime: number;
  landed: number;
  speed: number;
  dist: number;
  berries: number;
  nextAt: number;
  things: Thing[];
  rand: () => number;
  time: number;
};

const blobH = spriteSize(SPRITES.blob).h;

export function newGame(seed = Date.now()): Game {
  return {
    y: GROUND - blobH,
    vy: 0,
    grounded: true,
    holding: false,
    floatTime: 0,
    landed: 0,
    speed: 82,
    dist: 0,
    berries: 0,
    nextAt: 150,
    things: [],
    rand: rng(seed),
    time: 0,
  };
}

export const scoreOf = (g: Game) => Math.floor(g.dist / 8) + g.berries * 25;

export function press(g: Game) {
  g.holding = true;
  if (!g.grounded) return;
  g.vy = JUMP;
  g.grounded = false;
  g.floatTime = 0;
}

export function release(g: Game) {
  g.holding = false;
  if (g.vy < -160) g.vy = -160;
}

function spawn(g: Game) {
  const r = g.rand;
  const x = VIEW.w + 8;
  const late = g.dist > 2400;
  if (late && r() < 0.28) {
    g.things.push({ kind: "bee", x, y: GROUND - 52 - Math.round(r() * 6) });
    g.things.push({ kind: "thistle", x: x + 4, y: GROUND - 9 });
  } else {
    g.things.push({ kind: "thistle", x, y: GROUND - 9 });
    if (g.dist > 900 && r() < 0.35)
      g.things.push({ kind: "thistle", x: x + 7, y: GROUND - 9 });
  }
  if (r() < 0.6)
    g.things.push({
      kind: "berry",
      x: x + 30 + Math.round(r() * 20),
      y: GROUND - 26 - Math.round(r() * 14),
    });
  // The gap must be clearable: airtime is ~0.55 s, so leave at least that much ground plus a landing.
  g.nextAt = g.dist + g.speed * 0.75 + 40 + r() * 90;
}

const hit = (
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
) => ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

/** Advance the world; returns "over" when Blob touches a thistle or a bee. */
export function step(g: Game, dt: number): "over" | void {
  g.time += dt;
  g.speed = Math.min(176, 82 + g.time * 2.6);
  const dx = g.speed * dt;
  g.dist += dx;

  const floating = g.holding && g.vy < 0 && g.floatTime < MAX_FLOAT;
  if (floating) g.floatTime += dt;
  g.vy += (floating ? FLOAT_GRAVITY : GRAVITY) * dt;
  g.y += g.vy * dt;
  if (g.y >= GROUND - blobH) {
    if (!g.grounded) g.landed = 0.12;
    g.y = GROUND - blobH;
    g.vy = 0;
    g.grounded = true;
  }
  g.landed = Math.max(0, g.landed - dt);

  if (g.dist >= g.nextAt) spawn(g);
  for (const t of g.things) t.x -= dx * (t.kind === "bee" ? 1.15 : 1);
  g.things = g.things.filter((t) => t.x > -16);

  for (const t of g.things) {
    if (t.kind === "berry") {
      if (!t.taken && hit(BLOB_X, g.y, 12, 10, t.x, t.y, 4, 4)) {
        t.taken = true;
        g.berries++;
      }
      continue;
    }
    const box =
      t.kind === "thistle"
        ? [t.x + 1, t.y + 1, 5, 8]
        : [t.x + 1, t.y + 2, 6, 4];
    if (hit(BLOB_X + 2, g.y + 2, 8, 7, box[0], box[1], box[2], box[3]))
      return "over";
  }
}

/* ------------------------------------------------------------ drawing */

type Art = {
  c: Colors;
  p: Palette;
  far: number[];
  near: number[];
  bands: string[];
};

export function makeArt(p: Palette): Art {
  const r = rng(7);
  const ph = [r() * 6, r() * 6, r() * 6];
  const width = VIEW.w * 2;
  return {
    c: colorsFor(p),
    p,
    far: Array.from({ length: width }, (_, x) =>
      Math.round(62 + ridge(x, width, ph, [6, 3, 2])),
    ),
    near: Array.from({ length: width }, (_, x) =>
      Math.round(76 + ridge(x, width, ph.slice().reverse(), [4, 3, 1])),
    ),
    bands: Array.from({ length: 7 }, (_, i) => mix(p.sky, p.sky2, i / 6)),
  };
}

function drawRidge(
  ctx: CanvasRenderingContext2D,
  heights: number[],
  offset: number,
  color: string,
) {
  ctx.fillStyle = color;
  const n = heights.length;
  for (let x = 0; x < VIEW.w; x++) {
    const h = heights[(((x + Math.floor(offset)) % n) + n) % n];
    ctx.fillRect(x, h, 1, VIEW.h - h);
  }
}

export function draw(ctx: CanvasRenderingContext2D, g: Game, art: Art) {
  const { c, p } = art;
  const band = Math.ceil(GROUND / art.bands.length);
  art.bands.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, i * band, VIEW.w, band);
  });
  ctx.fillStyle = p.light;
  for (let y = -8; y < 8; y++) {
    const half = Math.round(Math.sqrt(64 - (y + 0.5) ** 2));
    ctx.fillRect(150 - half, 22 + y, half * 2, 1);
  }
  const cloudX = (base: number, rate: number) =>
    ((((base - g.dist * rate) % 240) + 240) % 240) - 24;
  drawSprite(ctx, SPRITES.cloud, c, cloudX(40, 0.05), 12);
  drawSprite(ctx, SPRITES.cloud, c, cloudX(150, 0.08), 28);
  drawRidge(ctx, art.far, g.dist * 0.2, p.far);
  drawRidge(ctx, art.near, g.dist * 0.5, p.near);

  ctx.fillStyle = p.ground;
  ctx.fillRect(0, GROUND, VIEW.w, VIEW.h - GROUND);
  ctx.fillStyle = p.near;
  ctx.fillRect(0, GROUND, VIEW.w, 2);
  const shift = Math.floor(g.dist) % 9;
  for (let x = -shift; x < VIEW.w; x += 9) ctx.fillRect(x, GROUND - 1, 1, 1);
  ctx.fillStyle = mix(p.ground, p.ink, 0.25);
  const stripe = Math.floor(g.dist) % 14;
  for (let x = -stripe; x < VIEW.w; x += 14) ctx.fillRect(x, GROUND + 6, 7, 1);

  for (const t of g.things) {
    if (t.kind === "berry" && t.taken) continue;
    const bob =
      t.kind === "bee" ? Math.round(Math.sin(g.time * 9 + t.x * 0.1) * 2) : 0;
    drawSprite(ctx, SPRITES[t.kind], c, t.x, t.y + bob);
  }

  const frame =
    g.landed > 0
      ? SPRITES.blobSquash
      : g.grounded
        ? SPRITES.blob
        : SPRITES.blobUp;
  const size = spriteSize(frame);
  drawSprite(ctx, frame, c, BLOB_X + 6 - size.w / 2, g.y + blobH - size.h);
}
