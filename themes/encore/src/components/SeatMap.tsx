import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { Accessibility } from "lucide-react";
import { zoneNames, type Production } from "../content";
import {
  houseOf,
  isSold,
  seatPrice,
  type Performance,
  type Seat,
} from "../lib/house";
import { money } from "../lib/util";

type Props = {
  production: Production;
  perf: Performance;
  selected: string[];
  full: boolean;
  onToggle: (seat: Seat) => void;
  onLook: (seat: Seat) => void;
};

/**
 * The auditorium as a grid of real buttons. One seat is in the tab order at a time;
 * arrow keys walk the rows, Enter or Space takes the seat.
 */
export function SeatMap({
  production,
  perf,
  selected,
  full,
  onToggle,
  onLook,
}: Props) {
  const house = useMemo(() => houseOf(production.stage), [production.stage]);
  const lines = useMemo(() => house.map((r) => r.blocks.flat()), [house]);
  const mid = lines[Math.floor(lines.length / 2)];
  const [active, setActive] = useState(mid[Math.floor(mid.length / 2)].id);
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the house is wider than the viewport: start with the centre aisle in view.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).dataset.seat;
    if (!id) return;
    const r = lines.findIndex((line) => line.some((s) => s.id === id));
    const c = lines[r].findIndex((s) => s.id === id);
    let next: Seat | undefined;
    if (e.key === "ArrowLeft") next = lines[r][c - 1];
    else if (e.key === "ArrowRight") next = lines[r][c + 1];
    else if (e.key === "Home") next = lines[r][0];
    else if (e.key === "End") next = lines[r][lines[r].length - 1];
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const line = lines[r + (e.key === "ArrowUp" ? -1 : 1)];
      const here = lines[r][c].across;
      next = line?.reduce((best, s) =>
        Math.abs(s.across - here) < Math.abs(best.across - here) ? s : best,
      );
    } else return;
    e.preventDefault();
    if (!next) return;
    setActive(next.id);
    root.current
      ?.querySelector<HTMLButtonElement>(`[data-seat="${next.id}"]`)
      ?.focus();
  };

  return (
    <div className="seatmap-scroll" ref={scroller}>
      <div
        className="seatmap"
        ref={root}
        onKeyDown={move}
        role="group"
        aria-label={`Seating plan, ${production.stage}`}
      >
        <div className="stage-edge" aria-hidden="true">
          Stage
        </div>
        {house.map((row, i) => {
          const heading =
            row.section !== "Studio" && row.section !== house[i - 1]?.section;
          // Rows curve toward the stage; the end labels sit at the height of the end seats.
          const curve = row.blocks[0][0].elevated ? 10 : 7;
          return (
            <div key={row.label} className="seat-row-wrap">
              {heading && (
                <p className="seat-section" aria-hidden="true">
                  {row.section}
                </p>
              )}
              <div
                className="seat-row"
                style={{ "--edge": `${-curve}px` } as CSSProperties}
              >
                <span className="row-label" aria-hidden="true">
                  {row.label}
                </span>
                {row.blocks.map((block, b) => (
                  <div className="seat-block" key={b}>
                    {block.map((seat) => {
                      const sold = isSold(perf, seat);
                      const taken = selected.includes(seat.id);
                      const blocked = sold || (full && !taken);
                      const price = seatPrice(production, seat.zone, "full");
                      return (
                        <button
                          key={seat.id}
                          type="button"
                          className="seat"
                          data-seat={seat.id}
                          data-zone={seat.zone}
                          data-sold={sold ? "" : undefined}
                          style={
                            {
                              "--lift": `${-seat.across * seat.across * curve}px`,
                            } as CSSProperties
                          }
                          aria-pressed={taken}
                          aria-disabled={blocked || undefined}
                          aria-label={`${seat.section} row ${seat.row}, seat ${seat.number}, ${zoneNames[seat.zone]}, ${sold ? "sold" : money(price)}`}
                          tabIndex={seat.id === active ? 0 : -1}
                          onClick={() => !blocked && onToggle(seat)}
                          onFocus={() => {
                            setActive(seat.id);
                            onLook(seat);
                          }}
                          onPointerEnter={() => onLook(seat)}
                        >
                          {seat.zone === "wheelchair" && (
                            <Accessibility aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <span className="row-label" aria-hidden="true">
                  {row.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
