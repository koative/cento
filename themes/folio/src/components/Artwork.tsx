import { useId, type ReactNode } from "react";
import type { Art } from "../content";

/** Deterministic PRNG so a seed always draws the same picture. */
function rng(seed: number) {
  let a = seed * 2654435761;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  art: Art;
  w: number;
  h: number;
  label?: string;
  className?: string;
};

/**
 * Authored geometry standing in for each artist's practice. Coordinates are in
 * centimetres, so the drawing keeps the real proportions of the work.
 */
export function Artwork({ art, w, h, label, className }: Props) {
  const id = useId().replace(/:/g, "");
  const r = rng(art.seed);
  const [ground, ...c] = art.colors;
  const s = Math.min(w, h);
  let body: ReactNode = null;

  switch (art.kind) {
    case "field": {
      const m = s * 0.08;
      const gap = s * 0.05;
      const split = 0.38 + r() * 0.24;
      const tall = h - m * 2 - gap;
      body = (
        <g filter={`url(#${id}b)`}>
          <rect
            x={m}
            y={m}
            width={w - m * 2}
            height={tall * split}
            fill={c[0]}
            opacity={0.94}
          />
          <rect
            x={m}
            y={m + tall * split + gap}
            width={w - m * 2}
            height={tall * (1 - split)}
            fill={c[1]}
            opacity={0.9}
          />
          {r() > 0.5 && (
            <rect
              x={m * 1.6}
              y={m + tall * split - gap * 0.2}
              width={w - m * 3.2}
              height={gap * 0.6}
              fill={ground}
              opacity={0.55}
            />
          )}
        </g>
      );
      break;
    }
    case "grid": {
      const m = s * 0.09;
      const cols = 8 + Math.floor(r() * 9);
      const cell = (w - m * 2) / cols;
      const rows = Math.floor((h - m * 2) / cell);
      const top = (h - rows * cell) / 2;
      const cells: ReactNode[] = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          if (r() < 0.11)
            cells.push(
              <rect
                key={x + "-" + y}
                x={m + x * cell + cell * 0.12}
                y={top + y * cell + cell * 0.12}
                width={cell * 0.76}
                height={cell * 0.76}
                fill={c[1]}
                opacity={0.88}
              />,
            );
      const lines: ReactNode[] = [];
      for (let x = 0; x <= cols; x++)
        lines.push(
          <line
            key={"v" + x}
            x1={m + x * cell}
            x2={m + x * cell}
            y1={top}
            y2={top + rows * cell}
          />,
        );
      for (let y = 0; y <= rows; y++)
        lines.push(
          <line
            key={"h" + y}
            x1={m}
            x2={w - m}
            y1={top + y * cell}
            y2={top + y * cell}
          />,
        );
      body = (
        <>
          {cells}
          <g stroke={c[0]} strokeWidth={s * 0.0022} opacity={0.75}>
            {lines}
          </g>
        </>
      );
      break;
    }
    case "forms": {
      const barY = h * (0.56 + r() * 0.12);
      const discR = w * (0.2 + r() * 0.06);
      const discX = w * (0.38 + r() * 0.24);
      const halfR = w * (0.12 + r() * 0.06);
      const halfX = discX < w / 2 ? w * 0.68 : w * 0.3;
      body = (
        <>
          <circle
            cx={discX}
            cy={barY - discR - h * 0.03}
            r={discR}
            fill={c[0]}
          />
          <path
            d={`M${halfX - halfR} ${barY} a${halfR} ${halfR} 0 0 1 ${halfR * 2} 0z`}
            fill={c[2]}
          />
          <rect
            x={w * 0.14}
            y={barY}
            width={w * 0.72}
            height={h * 0.022}
            fill={c[1]}
          />
          <rect
            x={w * (0.2 + r() * 0.3)}
            y={barY + h * 0.022}
            width={w * 0.18}
            height={h * (0.14 + r() * 0.1)}
            fill={c[0]}
            opacity={0.35}
          />
        </>
      );
      break;
    }
    case "stripes": {
      const bands: ReactNode[] = [];
      let x = 0;
      let last = -1;
      while (x < w) {
        const bw = w * (0.025 + r() * 0.11);
        let k = Math.floor(r() * (c.length + 1)) - 1;
        if (k === last) k = (k + 1) % c.length;
        last = k;
        if (k >= 0)
          bands.push(
            <rect
              key={x}
              x={x}
              y={0}
              width={bw + 0.05}
              height={h}
              fill={c[k]}
            />,
          );
        x += bw;
      }
      body = <>{bands}</>;
      break;
    }
    case "arcs": {
      const corner = [
        [0, h],
        [w, h],
        [0, 0],
        [w, 0],
      ][art.seed % 4];
      const rings: ReactNode[] = [];
      let rad = Math.hypot(w, h) * 1.04;
      let i = 0;
      while (rad > s * 0.06) {
        rings.push(
          <circle
            key={i}
            cx={corner[0]}
            cy={corner[1]}
            r={rad}
            fill={i % 2 ? ground : c[(i / 2) % c.length]}
          />,
        );
        rad -= s * (0.05 + r() * 0.1);
        i++;
      }
      body = <>{rings}</>;
      break;
    }
    case "fold": {
      const a = w * (0.15 + r() * 0.3);
      const b = w * (0.55 + r() * 0.3);
      const t = s * 0.05;
      body = (
        <>
          <path
            d={`M${a} 0 L${w} 0 L${w} ${h} L${b} ${h}z`}
            fill={c[1]}
            opacity={0.75}
          />
          <path
            d={`M${a - t} 0 L${a + t * 1.6} 0 L${b + t * 1.6} ${h} L${b - t} ${h}z`}
            fill={c[0]}
            opacity={0.85}
            filter={`url(#${id}b)`}
          />
          <line
            x1={a}
            y1={0}
            x2={b}
            y2={h}
            stroke="#fff"
            strokeWidth={s * 0.006}
            opacity={0.7}
          />
        </>
      );
      break;
    }
    case "weave": {
      const n = 7 + Math.floor(r() * 4);
      const pitch = w / n;
      const rows = Math.ceil(h / pitch);
      const band = pitch * 0.82;
      const shift = 1 + Math.floor(r() * 2);
      const parts: ReactNode[] = [];
      for (let y = 0; y < rows; y++)
        parts.push(
          <rect
            key={"r" + y}
            x={0}
            y={y * pitch + (pitch - band) / 2}
            width={w}
            height={band}
            fill={c[y % c.length]}
          />,
        );
      for (let x = 0; x < n; x++)
        for (let y = 0; y < rows; y++)
          if ((x + y * shift) % 2 === 0)
            parts.push(
              <rect
                key={x + "-" + y}
                x={x * pitch + (pitch - band) / 2}
                y={y * pitch}
                width={band}
                height={pitch}
                fill={c[(x + 1) % c.length]}
              />,
            );
      body = <>{parts}</>;
      break;
    }
    case "horizon": {
      const line = h * (0.42 + r() * 0.24);
      body = (
        <>
          <rect
            x={0}
            y={0}
            width={w}
            height={line}
            fill="#fff"
            opacity={0.18}
          />
          <rect x={0} y={line} width={w} height={h - line} fill={c[0]} />
          <rect
            x={w * (0.1 + r() * 0.3)}
            y={line - h * 0.012}
            width={w * (0.25 + r() * 0.35)}
            height={h * 0.02}
            fill={c[1]}
            filter={`url(#${id}b)`}
          />
        </>
      );
      break;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id={id + "b"} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={s * 0.0035} />
        </filter>
      </defs>
      <rect width={w} height={h} fill={ground} />
      {body}
    </svg>
  );
}
