import { useEffect, useRef } from "react";

const EARTH_KM = 6371;
const MU = 398600.4418; // km³/s², Earth's gravitational parameter
const R = 104; // drawn Earth radius

/** Altitudes are exaggerated ×5 so 350 km and 1,200 km read as different rings. */
const ringRadius = (alt: number) => R * (1 + (alt / EARTH_KM) * 5);

export function periodMinutes(alt: number) {
  const a = EARTH_KM + alt;
  return (2 * Math.PI * Math.sqrt((a * a * a) / MU)) / 60;
}

type Props = {
  altitude: number;
  inclination: number;
  reference?: number;
  label?: string;
};

export function OrbitDiagram({
  altitude,
  inclination,
  reference,
  label,
}: Props) {
  const rx = ringRadius(altitude);
  const ry = rx * 0.3;
  const back = useRef<SVGCircleElement>(null);
  const front = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const place = (theta: number) => {
      const x = rx * Math.cos(theta);
      const y = ry * Math.sin(theta);
      const inFront = y > 0;
      for (const [el, show] of [
        [back.current, !inFront],
        [front.current, inFront],
      ] as const) {
        if (!el) continue;
        el.setAttribute("cx", String(x));
        el.setAttribute("cy", String(y));
        el.style.opacity = show ? "1" : "0";
      }
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0.9);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const seconds = periodMinutes(altitude) / 10; // one drawn orbit every ~10 s
    const tick = (t: number) => {
      place(((t - start) / 1000 / seconds) * Math.PI * 2);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rx, ry, altitude]);

  const tilt = `rotate(${-inclination})`;
  const refR = reference ? ringRadius(reference) : 0;

  return (
    <svg
      className="orbit-diagram"
      viewBox="-210 -210 420 420"
      role="img"
      aria-label={`${label ?? "Orbit"}: ${altitude} km circular orbit at ${inclination}° inclination, period ${periodMinutes(altitude).toFixed(1)} minutes`}
    >
      <g transform={tilt}>
        {reference && reference !== altitude && (
          <ellipse className="o-ref" rx={refR} ry={refR * 0.3} />
        )}
        <ellipse
          key={`${altitude}-${inclination}`}
          className="o-path o-back"
          rx={rx}
          ry={ry}
          pathLength={1}
        />
        <circle ref={back} className="o-sat" r={4.5} />
      </g>

      <g className="o-earth">
        <circle r={R} className="o-disc" />
        <ellipse rx={R} ry={R * 0.3} className="o-grid" />
        <ellipse
          rx={R * 0.95}
          ry={R * 0.28}
          cy={-R * 0.45}
          className="o-grid"
        />
        <ellipse rx={R * 0.95} ry={R * 0.28} cy={R * 0.45} className="o-grid" />
        <ellipse rx={R * 0.35} ry={R} className="o-grid" />
        <ellipse rx={R * 0.75} ry={R} className="o-grid" />
        <line y1={-R - 14} y2={R + 14} className="o-axis" />
      </g>

      <g transform={tilt}>
        {reference && reference !== altitude && (
          <path
            className="o-ref"
            d={`M ${-refR} 0 A ${refR} ${refR * 0.3} 0 0 0 ${refR} 0`}
          />
        )}
        <path
          key={`${altitude}-${inclination}`}
          className="o-path"
          d={`M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`}
          pathLength={1}
        />
        <circle ref={front} className="o-sat" r={4.5} />
      </g>
    </svg>
  );
}
