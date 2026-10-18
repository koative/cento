import { useState } from "react";
import { brand, events, images, sites, type EventKind } from "../content";
import { EventList } from "../components/EventList";
import { day } from "../lib/format";
import { useSignups } from "../lib/signups";

const kinds: EventKind[] = [
  "Beach clean",
  "Seagrass planting",
  "Reef build",
  "Survey",
  "Training",
];
const monthOf = (iso: string) =>
  day(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

export function Volunteer() {
  const signups = useSignups();
  const [kind, setKind] = useState<EventKind | "All">("All");
  const [site, setSite] = useState("all");
  const [month, setMonth] = useState("all");
  const [open, setOpen] = useState(false);

  const months = [...new Set(events.map((e) => monthOf(e.date)))];
  const shown = events.filter(
    (e) =>
      (kind === "All" || e.kind === kind) &&
      (site === "all" || e.site === site) &&
      (month === "all" || monthOf(e.date) === month) &&
      (!open || e.spots - e.taken - (signups[e.id] ?? 0) > 0),
  );
  const reset = () => {
    setKind("All");
    setSite("all");
    setMonth("all");
    setOpen(false);
  };

  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Give a tide</h1>
          <p className="lede">
            Two and a half hours around low water, kit provided, tea afterwards.
            Pick a date, check the tide, and book your places.
          </p>
        </div>
        <dl className="expect">
          <div>
            <dt>Kit</dt>
            <dd>
              Gloves, pickers, bags, buckets and hi-vis provided. Waders on
              planting days.
            </dd>
          </div>
          <div>
            <dt>Ages</dt>
            <dd>
              Most cleans from 8 with an adult. Minimum ages are listed on each
              event.
            </dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>
              Every event lists its terrain. Merrow Bay has a step-free ramp and
              a beach wheelchair to borrow.
            </dd>
          </div>
          <div>
            <dt>Groups</dt>
            <dd>
              Teams of 10 or more: email{" "}
              <a href={`mailto:${brand.volunteerEmail}`}>
                {brand.volunteerEmail}
              </a>{" "}
              for a private tide.
            </dd>
          </div>
        </dl>
      </header>

      <section className="wrap section-tight" aria-labelledby="events-h">
        <h2 id="events-h" className="sr-only">
          Events
        </h2>
        <div className="filter-bar filter-bar-wide">
          <div className="chips" role="group" aria-label="Type of event">
            {(["All", ...kinds] as const).map((k) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label>
              <span>Place</span>
              <select value={site} onChange={(e) => setSite(e.target.value)}>
                <option value="all">All places</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Month</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="all">Any month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={open}
                onChange={(e) => setOpen(e.target.checked)}
              />
              <span>Places left only</span>
            </label>
          </div>
          <p className="filter-status" aria-live="polite">
            {shown.length} of {events.length} events
          </p>
        </div>

        {shown.length ? (
          <EventList items={shown} />
        ) : (
          <div className="empty">
            <p>
              No events match those filters. Try another month, or clear the
              filters to see the whole tide table.
            </p>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="wrap section photo-split">
        <img
          src={images.shoreline.src}
          alt={images.shoreline.alt}
          width={images.shoreline.w}
          height={images.shoreline.h}
          loading="lazy"
        />
        <div>
          <h2>Why low water</h2>
          <p>
            The strandline catches what floats. The lower shore catches what
            sinks, snags and tangles: rope in the gullies, line around the
            rocks, plastic buried in the sand bars. It is only open for a few
            hours a day.
          </p>
          <p>
            Working the falling tide also keeps crews safe. We start ninety
            minutes before low water, work down with the sea, and are back at
            the strandline before the flood. Crew leaders carry the official
            tide table and a whistle; three blasts means everyone up the beach.
          </p>
        </div>
      </section>
    </>
  );
}
