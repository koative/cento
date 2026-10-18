import { useState } from "react";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { Link } from "../router";
import { brand } from "../content";
import { clock, isoDay, longDate } from "../lib/format";
import { season, type DatedRecital } from "../lib/school";
import { Coda, RecitalRow } from "../components/Bits";

/** Build and download a one-event .ics file for the recital (local time, 90 minutes). */
function saveToCalendar(r: DatedRecital) {
  const stamp = (d: Date) =>
    `${isoDay(d).replace(/-/g, "")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;
  const [h, m] = r.time.split(":").map(Number);
  const start = new Date(r.date);
  start.setHours(h, m);
  const end = new Date(start.getTime() + 90 * 60_000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${brand.full}//Recitals//EN`,
    "BEGIN:VEVENT",
    `UID:${r.id}@score.example`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${r.title} — ${brand.full}`,
    `LOCATION:${r.venue.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = `${r.id}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function RecitalPage({ r }: { r: DatedRecital }) {
  const [saved, setSaved] = useState(false);
  const { upcoming } = season();
  const isPast = !upcoming.some((u) => u.id === r.id);
  const others = upcoming.filter((u) => u.id !== r.id).slice(0, 3);

  return (
    <div className="page recital">
      <div className="wrap">
        <Link to="/recitals" className="back-link">
          <ArrowLeft aria-hidden="true" /> All recitals
        </Link>
      </div>
      <article className="wrap concert-programme">
        <header>
          <h1>{r.title}</h1>
          <p className="cp-when">
            {r.kind} · {longDate(r.date)} at {clock(r.time)}
            {isPast && " · this concert has taken place"}
          </p>
          <p className="cp-where">{r.venue}</p>
        </header>
        <p className="cp-desc">{r.description}</p>
        <h2 className="cp-h">Programme</h2>
        <ol className="cp-list">
          {r.programme.map((item) => (
            <li key={item.piece}>
              <span className="cp-composer">{item.composer}</span>
              <span className="cp-piece">{item.piece}</span>
              <span className="cp-performers">{item.performers}</span>
            </li>
          ))}
        </ol>
        <footer className="cp-foot">
          <p>
            <strong>Entry:</strong> {r.entry}
          </p>
          {!isPast && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                saveToCalendar(r);
                setSaved(true);
              }}
            >
              <CalendarPlus aria-hidden="true" />
              Save to calendar
            </button>
          )}
          <p className="cp-saved" aria-live="polite">
            {saved &&
              `${r.id}.ics downloaded — open it to add the concert to your calendar.`}
          </p>
        </footer>
      </article>

      {others.length > 0 && (
        <section className="wrap more-recitals" aria-labelledby="more-h">
          <h2 id="more-h">Also coming up</h2>
          <div className="recital-list">
            {others.map((o) => (
              <RecitalRow key={o.id} r={o} />
            ))}
          </div>
        </section>
      )}

      <Coda
        title="Want to be on the next programme?"
        text="Every student who wants to play gets a recital spot each term. It starts with a free trial lesson."
      />
    </div>
  );
}
