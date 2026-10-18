import type { KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Link } from "../router";
import { areas, city, type AreaSlug, type Listing } from "../content";
import { areaOf, pinPrice, price } from "../lib/format";

type Props = {
  label: string;
  listings: Listing[];
  /** District shown as selected. */
  activeArea?: AreaSlug | "all";
  /** Districts become toggle buttons. */
  onArea?: (slug: AreaSlug) => void;
  /** Districts become links to their guides. */
  areaLinks?: boolean;
  /** Listing whose pin is emphasised (hovered card, current home). */
  highlight?: string | null;
  /** Pins become buttons that open a preview instead of links. */
  selected?: string | null;
  onSelect?: (id: string | null) => void;
  /** Extra marker, e.g. the office. */
  marker?: { x: number; y: number; label: string };
};

export function CityMap({
  label,
  listings,
  activeArea = "all",
  onArea,
  areaLinks,
  highlight,
  selected,
  onSelect,
  marker,
}: Props) {
  const preview = listings.find((l) => l.id === selected);

  function district(slug: AreaSlug, shape: string, name: string) {
    const on = activeArea === slug;
    if (areaLinks)
      return (
        <a
          key={slug}
          href={"#/neighborhoods/" + slug}
          aria-label={`${name} neighborhood guide`}
          className="district"
        >
          <path d={shape} />
        </a>
      );
    if (onArea)
      return (
        <path
          key={slug}
          d={shape}
          className="district"
          role="button"
          tabIndex={0}
          aria-pressed={on}
          aria-label={`${on ? "Show all neighborhoods" : "Show homes in " + name}`}
          data-on={on || undefined}
          onClick={() => onArea(slug)}
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            onArea(slug);
          }}
        />
      );
    return (
      <path
        key={slug}
        d={shape}
        className="district"
        data-on={on || undefined}
      />
    );
  }

  return (
    <div className="city-map">
      <div className="map-canvas">
        <svg viewBox="0 0 1000 700" role="group" aria-label={label}>
          <rect width="1000" height="700" className="map-land" />
          {areas.map((a) => district(a.slug, a.shape, a.name))}
          <g aria-hidden="true">
            {city.contours.map((d) => (
              <path key={d} d={d} className="map-contour" />
            ))}
            <path d={city.park} className="map-park" />
            {city.streets.map((d) => (
              <path key={d} d={d} className="map-street" />
            ))}
            {city.roads.map((d) => (
              <path key={d} d={d} className="map-road" />
            ))}
            <path d={city.harbor} className="map-water" />
            <path d={city.river} className="map-river" />
            <path d={city.rail} className="map-rail" />
            <path d={city.rail} className="map-rail-ties" />
            <rect
              x={city.station.x - 7}
              y={city.station.y - 7}
              width="14"
              height="14"
              className="map-station"
            />
            <text
              x={city.station.x + 14}
              y={city.station.y + 22}
              className="map-small"
            >
              {city.station.label}
            </text>
            <text
              x={city.riverName.x}
              y={city.riverName.y}
              transform={`rotate(${city.riverName.rotate} ${city.riverName.x} ${city.riverName.y})`}
              className="map-water-label"
            >
              {city.riverName.label}
            </text>
            <text
              x={city.harborName.x}
              y={city.harborName.y}
              className="map-water-label"
              textAnchor="middle"
            >
              {city.harborName.label}
            </text>
            <text
              x={city.parkName.x}
              y={city.parkName.y}
              className="map-small"
              textAnchor="middle"
            >
              {city.parkName.label}
            </text>
            {areas.map((a) => (
              <text
                key={a.slug}
                x={a.label.x}
                y={a.label.y}
                className="map-area-label"
                data-on={activeArea === a.slug || undefined}
              >
                {a.name}
              </text>
            ))}
            <g className="map-furniture" transform="translate(28 640)">
              <path d="M0 0h100M0 -6v12M50 -4v8M100 -6v12" />
              <text x="0" y="-14" className="map-small">
                ½ mile
              </text>
            </g>
            <g className="map-furniture" transform="translate(960 640)">
              <path d="M0 -34 L9 -6 L0 -12 L-9 -6 Z" className="map-north" />
              <text x="0" y="12" textAnchor="middle" className="map-small">
                N
              </text>
            </g>
          </g>
        </svg>

        {listings.map((l) => {
          const style = { left: `${l.pin.x / 10}%`, top: `${l.pin.y / 7}%` };
          const cls =
            "pin" + (l.id === highlight || l.id === selected ? " is-hot" : "");
          return onSelect ? (
            <button
              key={l.id}
              type="button"
              className={cls}
              style={style}
              aria-pressed={l.id === selected}
              aria-label={`${l.address}, ${price(l)}`}
              onClick={() => onSelect(l.id === selected ? null : l.id)}
            >
              <span className="pin-text num">{pinPrice(l)}</span>
            </button>
          ) : (
            <Link
              key={l.id}
              to={"/homes/" + l.id}
              className={cls}
              style={style}
              aria-label={`${l.address}, ${price(l)}`}
            >
              <span className="pin-text num">{pinPrice(l)}</span>
            </Link>
          );
        })}

        {marker && (
          <span
            className="pin pin-office is-hot"
            style={{ left: `${marker.x / 10}%`, top: `${marker.y / 7}%` }}
          >
            <span className="pin-text">{marker.label}</span>
          </span>
        )}
      </div>

      {preview && onSelect && (
        <div
          className="map-preview"
          data-side={preview.pin.x > 620 ? "left" : "right"}
          style={{
            left: `${preview.pin.x / 10}%`,
            top: `${preview.pin.y / 7}%`,
          }}
        >
          <img src={preview.images[0].src} alt="" />
          <div>
            <p className="num">{price(preview)}</p>
            <Link to={"/homes/" + preview.id}>{preview.address}</Link>
            <p className="card-area">
              {areaOf(preview.area).name} · {preview.beds} bd
            </p>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close preview"
            onClick={() => onSelect(null)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
