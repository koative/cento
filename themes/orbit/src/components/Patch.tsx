import type { Mission } from "../content";
import { vehicleName } from "../lib/format";

/** A mission patch drawn from the mission's own data: orbit tilt, payload count, colour. */
export function Patch({
  mission,
  size = 120,
}: {
  mission: Mission;
  size?: number;
}) {
  const id = `patch-${mission.slug}`;
  const tilt =
    -(mission.orbit.inclination > 90
      ? 180 - mission.orbit.inclination
      : mission.orbit.inclination) / 2.4;
  let seed = [...mission.slug].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const stars = Array.from(
    { length: Math.min(9, 3 + Math.ceil(mission.payloads / 6)) },
    () => [30 + rand() * 40, 26 + rand() * 22],
  );

  return (
    <svg
      className="patch"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${mission.name} mission patch`}
    >
      <defs>
        <path id={`${id}-top`} d="M 14 50 A 36 36 0 0 1 86 50" />
        <path id={`${id}-bottom`} d="M 10 50 A 40 40 0 0 0 90 50" />
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="31" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="var(--night)" />
      <circle
        cx="50"
        cy="50"
        r="46.5"
        fill="none"
        stroke={mission.hue}
        strokeWidth="1.5"
      />
      <circle
        cx="50"
        cy="50"
        r="31.5"
        fill="none"
        stroke={mission.hue}
        strokeWidth="0.8"
        opacity="0.6"
      />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width="100" height="100" fill="#0f2233" />
        {stars.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 0.9 : 0.55}
            fill="#e9eef2"
          />
        ))}
        <circle cx="50" cy="118" r="52" fill="#1c4a6e" />
        <circle
          cx="50"
          cy="118"
          r="52"
          fill="none"
          stroke="#a9cde6"
          strokeWidth="1.2"
        />
        <ellipse
          cx="50"
          cy="56"
          rx="40"
          ry="9"
          transform={`rotate(${tilt} 50 56)`}
          fill="none"
          stroke={mission.hue}
          strokeWidth="1.3"
        />
        <path
          d="M 50 80 C 50 66, 56 52, 70 44"
          fill="none"
          stroke="#e9eef2"
          strokeWidth="1.1"
          strokeDasharray="2 1.6"
        />
        <circle cx="70" cy="44" r="2.4" fill={mission.hue} />
      </g>
      <text className="patch-text">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {mission.name.toUpperCase()}
        </textPath>
      </text>
      <text className="patch-text patch-small">
        <textPath
          href={`#${id}-bottom`}
          startOffset="50%"
          textAnchor="middle"
          dominantBaseline="hanging"
        >
          {mission.flight} · {vehicleName(mission.vehicle).toUpperCase()}
        </textPath>
      </text>
    </svg>
  );
}
