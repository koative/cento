import { Link } from "../router";
import { brand } from "../content";

// Six iris blades: each edge of the inner hexagon, extended until it meets the rim.
const R = 30;
const r = 9;
const blades = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3;
  const b = ((i + 1) * Math.PI) / 3;
  const [x, y] = [r * Math.cos(a), r * Math.sin(a)];
  const [dx, dy] = [r * Math.cos(b) - x, r * Math.sin(b) - y].map((v) => v / r);
  const dot = x * dx + y * dy;
  const t = -dot + Math.sqrt(dot * dot - (x * x + y * y - R * R));
  return `M${x.toFixed(2)} ${y.toFixed(2)}L${(x + t * dx).toFixed(2)} ${(y + t * dy).toFixed(2)}`;
}).join("");

export function Iris({ className = "iris" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-32 -32 64 64" aria-hidden="true">
      <circle r={R} fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path
        d={blades}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle className="iris-pupil" r={r - 2.5} />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <Iris />
      <span>{brand.name}</span>
    </Link>
  );
}
