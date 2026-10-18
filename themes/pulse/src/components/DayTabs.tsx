import { useRef, type KeyboardEvent } from "react";
import { days, type DayId } from "../content";

/** Festival-day tabs with arrow-key movement; the panel they control carries `panel` as its id. */
export function DayTabs({
  day,
  onChange,
  panel,
  note,
}: {
  day: DayId;
  onChange: (d: DayId) => void;
  panel: string;
  note?: (d: DayId) => string;
}) {
  const list = useRef<HTMLDivElement>(null);
  const onKey = (e: KeyboardEvent) => {
    const i = days.findIndex((d) => d.id === day);
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = days[(i + step + days.length) % days.length].id;
    onChange(next);
    list.current?.querySelector<HTMLElement>(`#tab-${next}`)?.focus();
  };

  return (
    <div
      className="day-tabs"
      role="tablist"
      aria-label="Festival day"
      ref={list}
      onKeyDown={onKey}
    >
      {days.map((d) => (
        <button
          key={d.id}
          id={`tab-${d.id}`}
          type="button"
          role="tab"
          aria-selected={d.id === day}
          aria-controls={panel}
          tabIndex={d.id === day ? 0 : -1}
          onClick={() => onChange(d.id)}
        >
          <strong>{d.label}</strong>
          <span>{note ? note(d.id) : d.hours}</span>
        </button>
      ))}
    </div>
  );
}
