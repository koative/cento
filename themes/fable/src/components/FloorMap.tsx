import { amenities, exhibits, mapAreas } from "../content";
import { Shape } from "./Shape";

type Props = {
  label: string;
  selected?: string;
  onSelect: (slug: string) => void;
  /** Galleries outside the family's ages are drawn faded but stay reachable. */
  isDimmed?: (slug: string) => boolean;
  /** Planned stops, in order, numbered on the map. */
  order?: string[];
};

export function FloorMap({
  label,
  selected,
  onSelect,
  isDimmed,
  order = [],
}: Props) {
  return (
    <div className="floor" role="group" aria-label={label}>
      {amenities.map((a) => (
        <div
          key={a.id}
          className={`floor-amenity is-${a.id}`}
          style={{ gridArea: mapAreas[a.id] }}
        >
          <span>{a.label}</span>
          {a.note && <small>{a.note}</small>}
        </div>
      ))}
      {exhibits.map((e) => {
        const n = order.indexOf(e.slug) + 1;
        const dim = isDimmed?.(e.slug);
        return (
          <button
            key={e.slug}
            type="button"
            className="floor-room"
            data-swatch={e.swatch}
            data-dim={dim ? "" : undefined}
            style={{ gridArea: mapAreas[e.slug] }}
            aria-pressed={selected === e.slug}
            onClick={() => onSelect(e.slug)}
          >
            <Shape kind={e.shape} swatch={e.swatch} />
            <span className="floor-name">{e.name}</span>
            <span className="floor-meta">
              {e.floor} · {e.ageLabel}
            </span>
            {dim && <span className="sr-only"> (better for other ages)</span>}
            {n > 0 && (
              <span className="floor-order">
                <span className="sr-only">, stop </span>
                {n}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
