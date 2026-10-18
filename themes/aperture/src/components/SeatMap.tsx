import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { Accessibility } from "lucide-react";
import type { Screen } from "../content";
import { seatRows, sightline, type Seat } from "../lib/programme";

type Props = {
  screen: Screen;
  taken: Set<string>;
  selected: string[];
  onToggle: (seat: Seat) => void;
  /** The seat under the pointer or keyboard focus, for the sightline preview. */
  onActive: (seat: Seat) => void;
};

export function SeatMap({
  screen,
  taken,
  selected,
  onToggle,
  onActive,
}: Props) {
  const rows = seatRows(screen);
  const middle = rows[Math.floor(rows.length * 0.6)];
  const [cursor, setCursor] = useState(
    middle[Math.floor(middle.length / 2)].id,
  );
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the map scrolls sideways; start centred on the middle seats.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  const move = (e: KeyboardEvent, seat: Seat, r: number) => {
    const n = seat.n - 1;
    const next: Record<string, Seat | undefined> = {
      ArrowLeft: rows[r][n - 1],
      ArrowRight: rows[r][n + 1],
      ArrowUp: rows[r - 1]?.[n],
      ArrowDown: rows[r + 1]?.[n],
      Home: rows[r][0],
      End: rows[r][rows[r].length - 1],
    };
    if (!(e.key in next)) return;
    e.preventDefault();
    const to = next[e.key];
    if (!to) return;
    setCursor(to.id);
    document.getElementById(`seat-${to.id}`)?.focus();
  };

  const centre = (screen.perRow + 1) / 2;

  return (
    <div className="house">
      <div className="house-screen" aria-hidden="true">
        <svg viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d="M10 34 Q200 4 390 34" />
        </svg>
        <span>Screen</span>
      </div>
      <p className="seat-hint">Swipe the map sideways to see every seat.</p>
      <div className="seat-scroll" ref={scroller}>
        <div
          className="seat-map"
          role="group"
          aria-label={`Seats in ${screen.name}. Arrow keys move between seats; Enter or Space chooses one.`}
        >
          {rows.map((row, r) => (
            <div className="seat-row" key={row[0].row}>
              <span className="row-label" aria-hidden="true">
                {row[0].row}
              </span>
              {row.map((seat) => {
                const isTaken = taken.has(seat.id);
                const isPicked = selected.includes(seat.id);
                const { distance } = sightline(screen, r);
                // Rows curve towards the screen, deepest at the ends.
                const arc = ((seat.n - centre) / centre) ** 2;
                return (
                  <span
                    className="seat-cell"
                    key={seat.id}
                    data-aisle={screen.aisles.includes(seat.n) ? "" : undefined}
                  >
                    <button
                      id={`seat-${seat.id}`}
                      type="button"
                      className="seat"
                      style={{ "--arc": arc } as CSSProperties}
                      tabIndex={cursor === seat.id ? 0 : -1}
                      aria-pressed={isPicked}
                      aria-disabled={isTaken || undefined}
                      data-state={
                        isTaken ? "taken" : isPicked ? "picked" : "free"
                      }
                      data-access={seat.access ? "" : undefined}
                      aria-label={`Row ${seat.row}, seat ${seat.n}${seat.access ? ", wheelchair space" : ""}, ${distance.toFixed(1)} metres from the screen${isTaken ? ", taken" : ""}`}
                      onClick={() => {
                        setCursor(seat.id);
                        if (!isTaken) onToggle(seat);
                      }}
                      onFocus={() => onActive(seat)}
                      onPointerEnter={() => onActive(seat)}
                      onKeyDown={(e) => move(e, seat, r)}
                    >
                      {seat.access ? (
                        <Accessibility aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true">{seat.n}</span>
                      )}
                    </button>
                  </span>
                );
              })}
              <span className="row-label" aria-hidden="true">
                {row[0].row}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ul className="seat-legend" aria-label="Key">
        <li>
          <span className="seat seat-key" data-state="free" /> Available
        </li>
        <li>
          <span className="seat seat-key" data-state="picked" /> Your seats
        </li>
        <li>
          <span className="seat seat-key" data-state="taken" /> Taken
        </li>
        <li>
          <span className="seat seat-key" data-state="free" data-access="">
            <Accessibility aria-hidden="true" />
          </span>{" "}
          Wheelchair space
        </li>
      </ul>
    </div>
  );
}

/** Top-down sightline: how wide the screen looks from the active row. */
export function Sightline({ screen, row }: { screen: Screen; row: number }) {
  const depth =
    screen.firstRow + (screen.rows.length - 1) * screen.rowPitch + 1.2;
  const s = 150 / depth;
  const half = (screen.screenWidth * s) / 2;
  const { distance, angle, verdict } = sightline(screen, row);
  const y = 14 + distance * s;
  const a = (angle * Math.PI) / 360;
  const arcR = 26;
  return (
    <figure className="sightline">
      <svg
        viewBox="0 0 220 180"
        role="img"
        aria-label={`From row ${screen.rows[row]}: ${distance.toFixed(1)} metres away, the screen fills ${Math.round(angle)} degrees of your view`}
      >
        <line
          className="sl-screen"
          x1={110 - half}
          y1="14"
          x2={110 + half}
          y2="14"
        />
        {screen.rows.map((name, i) => (
          <circle
            key={name}
            className="sl-row"
            data-on={i === row ? "" : undefined}
            cx="110"
            cy={14 + sightline(screen, i).distance * s}
            r={i === row ? 5 : 2}
          />
        ))}
        <path
          className="sl-cone"
          d={`M${110 - half} 14L110 ${y}L${110 + half} 14`}
        />
        <path
          className="sl-arc"
          d={`M${110 - arcR * Math.sin(a)} ${y - arcR * Math.cos(a)}A${arcR} ${arcR} 0 0 1 ${110 + arcR * Math.sin(a)} ${y - arcR * Math.cos(a)}`}
        />
      </svg>
      <figcaption>
        <strong>
          Row {screen.rows[row]} · {Math.round(angle)}°
        </strong>
        <span>
          {distance.toFixed(1)} m from the {screen.screenWidth} m screen.{" "}
          {verdict}
        </span>
      </figcaption>
    </figure>
  );
}
