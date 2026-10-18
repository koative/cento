import type { Ride } from "../content";

/** Elevation profile drawn from the ride's sample points; heights are relative, distance is to scale. */
export function Profile({ ride }: { ride: Ride }) {
  const w = 300;
  const h = 64;
  const max = Math.max(...ride.profile);
  const pts = ride.profile.map(
    (v, i) =>
      `${((i / (ride.profile.length - 1)) * w).toFixed(1)},${(h - (v / max) * (h - 6)).toFixed(1)}`,
  );
  return (
    <svg
      className="profile"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Elevation profile: ${ride.climb} m of climbing over ${ride.distance} km`}
    >
      <polygon
        points={`0,${h} ${pts.join(" ")} ${w},${h}`}
        className="profile-fill"
      />
      <polyline
        points={pts.join(" ")}
        className="profile-line"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
