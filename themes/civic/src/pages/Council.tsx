import { useState } from "react";
import { Mail } from "lucide-react";
import { images, meetings, members } from "../content";
import { councillorFor, nearestCorner, wardAt } from "../lib/city";
import { CityMap } from "../components/CityMap";
import { MeetingRow } from "../components/MeetingRow";
import { PageHead } from "../components/PageHead";

export function Council() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const ward = pin && wardAt(pin.x, pin.y);
  const list = meetings.filter((m) => m.upcoming === (tab === "upcoming"));

  return (
    <>
      <PageHead
        title="Council & meetings"
        lede="Seven elected members set the budget, pass ordinances and answer to you. Every meeting is open to the public and streamed live."
      />

      <section className="section wrap" aria-labelledby="meet-title">
        <div className="section-head">
          <h2 id="meet-title">Meetings</h2>
          <div className="tabs" role="tablist" aria-label="Meetings">
            {(["upcoming", "past"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`tab-${t}`}
                aria-selected={tab === t}
                aria-controls="meeting-panel"
                tabIndex={tab === t ? 0 : -1}
                onClick={() => setTab(t)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
                  const next = t === "upcoming" ? "past" : "upcoming";
                  setTab(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }}
              >
                {t === "upcoming" ? "Upcoming" : "Past, with outcomes"}
              </button>
            ))}
          </div>
        </div>
        <ul
          className="meeting-list"
          id="meeting-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
        >
          {list.map((m) => (
            <MeetingRow key={m.id} m={m} />
          ))}
        </ul>
      </section>

      <section className="band band-mist" aria-labelledby="members-title">
        <div className="wrap">
          <h2 id="members-title">Your council</h2>
          <ul className="members">
            {members.map((m) => (
              <li
                key={m.id}
                className="member"
                data-on={ward && m.ward === ward ? "" : undefined}
              >
                <span className="member-badge plate" aria-hidden="true">
                  {m.ward ? `W${m.ward}` : m.role === "Mayor" ? "M" : "AL"}
                </span>
                <h3>{m.name}</h3>
                <p className="member-role">
                  {m.role} · since {m.since}
                </p>
                <p>{m.bio}</p>
                <dl className="facts facts-tight">
                  <div>
                    <dt>Committees</dt>
                    <dd>{m.committees.join("; ")}</dd>
                  </div>
                  <div>
                    <dt>Office hours</dt>
                    <dd>{m.hours}</dd>
                  </div>
                </dl>
                <a href={`mailto:${m.email}`} className="arrow-link">
                  <Mail size={16} aria-hidden="true" /> Email{" "}
                  {m.name.split(" ")[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section wrap ward-finder"
        aria-labelledby="ward-title"
      >
        <div>
          <h2 id="ward-title">Which ward are you in?</h2>
          <p>
            Point to where you live. Four councillors each represent one ward;
            the mayor and two at-large councillors represent the whole city.
          </p>
          <div aria-live="polite" className="ward-answer">
            {pin && ward ? (
              <p>
                Near {nearestCorner(pin.x, pin.y)}: <strong>Ward {ward}</strong>
                , represented by <strong>{councillorFor(ward).name}</strong>.
                Their card is highlighted above.
              </p>
            ) : (
              <p>No point chosen yet.</p>
            )}
          </div>
          <img
            src={images.chamber.src}
            alt={images.chamber.alt}
            width={images.chamber.w}
            height={images.chamber.h}
            loading="lazy"
            className="ward-photo"
          />
        </div>
        <CityMap
          label={
            ward ? `Ward map, Ward ${ward} selected` : "Ward map of Commonwell"
          }
          pin={pin}
          onPick={setPin}
          showWards
          ward={ward}
        />
      </section>
    </>
  );
}
