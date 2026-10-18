import type { KeyboardEvent } from "react";
import type { Room } from "../content";
import { bookedFor, hhmm, slots, type Booking } from "../lib";

export type Pick = { roomId: string; start: number; length: number };

type Props = {
  rooms: Room[];
  date: Date;
  headcount: number;
  pick: Pick | null;
  mine: Booking[];
  /** Hour (decimal) before which today's slots are gone. */
  cutoff: number;
  onPick: (roomId: string, start: number) => void;
};

/**
 * The lobby room board: rooms down the side, the day across the top in half hours.
 * Arrow keys move between free slots; Enter or Space picks a start time.
 */
export function RoomBoard({
  rooms,
  date,
  headcount,
  pick,
  mine,
  cutoff,
  onPick,
}: Props) {
  const onKey = (e: KeyboardEvent<HTMLTableElement>) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    };
    const move = moves[e.key];
    const from = (e.target as HTMLElement).closest<HTMLElement>("[data-r]");
    if (!move || !from) return;
    e.preventDefault();
    const cells = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        "button[data-r]:not(:disabled)",
      ),
    );
    const r = Number(from.dataset.r);
    const c = Number(from.dataset.c);
    // Nearest enabled cell in the arrow's direction.
    const next = cells
      .filter((b) => {
        const br = Number(b.dataset.r);
        const bc = Number(b.dataset.c);
        return move[0]
          ? Math.sign(br - r) === move[0]
          : br === r && Math.sign(bc - c) === move[1];
      })
      .sort((a, b) => {
        const d = (x: HTMLButtonElement) =>
          Math.abs(Number(x.dataset.r) - r) * 100 +
          Math.abs(Number(x.dataset.c) - c);
        return d(a) - d(b);
      })[0];
    next?.focus();
  };

  // One tab stop for the whole grid: the picked cell, else the first enabled one.
  let tabStop = pick ? `${pick.roomId}@${pick.start}` : "";

  const rows = rooms.map((room) => {
    const taken = bookedFor(room, date);
    const yours = mine.filter((b) => b.roomId === room.id);
    const small = room.capacity < headcount;
    const cells = slots.map((t) => {
      const state = yours.some((b) => t >= b.start && t < b.end)
        ? "yours"
        : taken.some(([s, e]) => t >= s && t < e)
          ? "busy"
          : t < cutoff
            ? "past"
            : pick &&
                pick.roomId === room.id &&
                t >= pick.start &&
                t < pick.start + pick.length
              ? "picked"
              : "free";
      const enabled = !small && (state === "free" || state === "picked");
      if (enabled && !tabStop) tabStop = `${room.id}@${t}`;
      return { t, state, enabled };
    });
    return { room, small, cells };
  });

  return (
    <div className="board-scroll">
      <table className="board" onKeyDown={onKey}>
        <caption className="sr-only">
          Meeting room availability, half-hour slots from 8:00 to 20:00
        </caption>
        <thead>
          <tr>
            <th scope="col" className="board-corner">
              Room
            </th>
            {slots.map((t) => (
              <th
                key={t}
                scope="col"
                className="board-hour"
                data-half={t % 1 ? "" : undefined}
              >
                {t % 1 ? <span className="sr-only">{hhmm(t)}</span> : hhmm(t)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ room, small, cells }, r) => (
            <tr
              key={room.id}
              data-small={small ? "" : undefined}
              data-active={pick?.roomId === room.id ? "" : undefined}
            >
              <th scope="row" className="board-room">
                <strong>{room.name}</strong>
                <span>
                  {room.capacity} seats{small ? " · too small" : ""}
                </span>
              </th>
              {cells.map(({ t, state, enabled }, c) => (
                <td
                  key={t}
                  data-state={state}
                  data-start={
                    pick?.roomId === room.id && pick.start === t
                      ? ""
                      : undefined
                  }
                >
                  <button
                    type="button"
                    data-r={r}
                    data-c={c}
                    disabled={!enabled}
                    tabIndex={tabStop === `${room.id}@${t}` ? 0 : -1}
                    aria-pressed={state === "picked"}
                    aria-label={`${room.name}, ${hhmm(t)}, ${small ? "too small for your group" : { free: "free", picked: "selected", busy: "booked", past: "already passed", yours: "your booking" }[state]}`}
                    onClick={() => onPick(room.id, t)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
