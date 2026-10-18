import { CalendarPlus, FileText } from "lucide-react";
import { brand, meetings, type Meeting } from "../content";
import { timeOf } from "../lib/city";
import { PageHead } from "../components/PageHead";
import { MeetingRow } from "../components/MeetingRow";

function downloadIcs(m: Meeting) {
  const stamp = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const start = new Date(m.starts);
  const end = new Date(start.getTime() + m.minutes * 60000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${brand.full}//Meetings//EN`,
    "BEGIN:VEVENT",
    `UID:${m.id}@commonwell.example`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${m.body} meeting`,
    `LOCATION:${m.room}`,
    `DESCRIPTION:${m.summary}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = `${m.id}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function MeetingPage({ meeting: m }: { meeting: Meeting }) {
  const d = new Date(m.starts);
  const day = d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const others = meetings
    .filter((x) => x.id !== m.id && x.upcoming === m.upcoming)
    .slice(0, 2);

  return (
    <>
      <PageHead
        title={`${m.body}, ${d.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`}
        lede={m.summary}
        crumbs={[{ to: "/council", label: "Council & meetings" }]}
      >
        <dl className="head-facts">
          <div>
            <dt>When</dt>
            <dd>
              {day}, {timeOf(m.starts)}
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{m.room}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              {m.upcoming
                ? "Upcoming — open to the public"
                : "Held — outcomes below"}
            </dd>
          </div>
        </dl>
      </PageHead>

      <div className="wrap service-layout">
        <article className="prose-col">
          <h2>{m.upcoming ? "Agenda" : "Agenda and outcomes"}</h2>
          <ol className="agenda">
            {m.agenda.map((a) => (
              <li key={a.title}>
                <div className="agenda-head">
                  <h3>{a.title}</h3>
                  <span className="kind">{a.kind}</span>
                </div>
                <p>{a.detail}</p>
                {a.outcome && (
                  <p className="outcome">
                    <strong>Outcome:</strong> {a.outcome}
                  </p>
                )}
              </li>
            ))}
          </ol>

          {m.upcoming && (
            <>
              <h2>Speak at this meeting</h2>
              <p>
                Sign up at the door before the meeting starts, or email the City
                Clerk at{" "}
                <a href="mailto:clerk@commonwell.example">
                  clerk@commonwell.example
                </a>{" "}
                by 4:00 pm on the day. Each speaker has 3 minutes. Written
                comments received by noon are shared with every member.
              </p>
              <h2>Watch</h2>
              <p>
                Meetings stream live on Commonwell Community TV, channel 14, and
                are archived with captions within two working days.
              </p>
            </>
          )}
        </article>

        <aside className="service-aside" aria-label="Meeting tools">
          <div className="aside-card">
            {m.upcoming && (
              <button
                type="button"
                className="btn btn-citron btn-block"
                onClick={() => downloadIcs(m)}
              >
                <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
              </button>
            )}
            <h2 className="small-head">Documents</h2>
            <ul className="docs">
              {m.documents.map((doc) => (
                <li key={doc.name}>
                  <FileText size={18} aria-hidden="true" />
                  <span>
                    {doc.name}
                    <small>PDF · {doc.pages} pages</small>
                  </span>
                </li>
              ))}
            </ul>
            <p className="quiet-note">
              Documents are listed for the demo; the files are not included.
            </p>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="band band-mist" aria-labelledby="more-title">
          <div className="wrap">
            <h2 id="more-title">
              {m.upcoming ? "Also coming up" : "Other recent meetings"}
            </h2>
            <ul className="meeting-list">
              {others.map((x) => (
                <MeetingRow key={x.id} m={x} />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
