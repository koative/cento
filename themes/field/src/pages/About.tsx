import { useState } from "react";
import { Bus, Car, Mail } from "lucide-react";
import {
  brand,
  clubhouseHours,
  committee,
  facilities,
  history,
  photos,
} from "../content";
import { Img, PageHead } from "../components/Bits";

/** Areas of The Common in map units (viewBox 0 0 400 270). */
const areas: Record<
  string,
  { x: number; y: number; w: number; h: number; label: string; pitch?: boolean }
> = {
  p1: { x: 16, y: 16, w: 196, h: 128, label: "1", pitch: true },
  p2: { x: 228, y: 16, w: 156, h: 108, label: "2", pitch: true },
  p3: { x: 228, y: 140, w: 104, h: 76, label: "3", pitch: true },
  mini: { x: 344, y: 140, w: 40, h: 76, label: "" },
  club: { x: 16, y: 160, w: 120, h: 56, label: "Clubhouse" },
  park: { x: 148, y: 160, w: 64, h: 56, label: "P" },
};

function GroundMap({ active }: { active: string }) {
  return (
    <svg
      className="ground-map"
      viewBox="0 0 400 270"
      role="img"
      aria-label="Map of The Common: three pitches, a small-sided area, the clubhouse and car park off Ashby Lane"
    >
      <rect width="400" height="270" rx="10" className="gm-grass" />
      {Object.entries(areas).map(([id, a]) => (
        <g
          key={id}
          className="gm-area"
          data-active={active === id ? "" : undefined}
        >
          <rect x={a.x} y={a.y} width={a.w} height={a.h} rx={a.pitch ? 2 : 6} />
          {a.pitch && (
            <g className="gm-lines">
              <path d={`M${a.x + a.w / 2} ${a.y}v${a.h}`} />
              <circle cx={a.x + a.w / 2} cy={a.y + a.h / 2} r={a.h / 7} />
              <path
                d={`M${a.x} ${a.y + a.h * 0.25}h${a.w * 0.14}v${a.h * 0.5}h${-a.w * 0.14}M${a.x + a.w} ${a.y + a.h * 0.25}h${-a.w * 0.14}v${a.h * 0.5}h${a.w * 0.14}`}
              />
            </g>
          )}
          {id === "mini" && (
            <g className="gm-lines">
              <path
                d={`M${a.x} ${a.y + a.h / 2}h${a.w}M${a.x + a.w / 2} ${a.y}v${a.h}`}
              />
            </g>
          )}
          <text x={a.x + a.w / 2} y={a.y + a.h / 2 + 4} textAnchor="middle">
            {a.label}
          </text>
        </g>
      ))}
      <rect x="0" y="232" width="400" height="38" className="gm-road" />
      <text x="200" y="256" textAnchor="middle" className="gm-road-label">
        Ashby Lane
      </text>
      <path d="M180 232v-16" className="gm-gate" />
    </svg>
  );
}

export function About() {
  const [active, setActive] = useState("p1");

  return (
    <>
      <PageHead
        title="The club"
        lede={`Founded in ${brand.founded} by brickworks lads with borrowed shirts. Still on the same patch of grass, still run entirely by volunteers, now with a few more teams.`}
      />

      <section className="section-tight">
        <div className="wrap story-grid">
          <div className="prose">
            <p>
              Field United has never had a benefactor, a big sponsor or a paid
              manager. It has had a groundsman for twenty-eight years, a tea hut
              that has outlasted three clubhouses, and a few hundred people each
              season who give up a Saturday.
            </p>
            <p>
              The club is a not-for-profit community amateur sports club. Every
              pound of fees, bar takings and quiz-night raffles goes back into
              pitches, kit, referees and coaching courses. The accounts are read
              out at the AGM every September and anyone with a membership gets a
              vote.
            </p>
          </div>
          <Img photo={photos.clubhouse} className="story-photo" />
        </div>
      </section>

      <section className="section paper-2" aria-labelledby="history-title">
        <div className="wrap">
          <h2 id="history-title">Seventy-four seasons on The Common</h2>
          <ol className="timeline">
            {history.map((h) => (
              <li key={h.year}>
                <span className="tl-year num">{h.year}</span>
                <p>{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="ground-title">
        <div className="wrap ground-grid">
          <div>
            <h2 id="ground-title">The ground</h2>
            <p>
              {brand.address.join(", ")}. Choose an area to find it on the map.
            </p>
            <ul className="facilities">
              {facilities.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    aria-pressed={active === f.id}
                    onClick={() => setActive(f.id)}
                    onFocus={() => setActive(f.id)}
                  >
                    <b>{f.name}</b>
                    <span>{f.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="ground-side">
            <GroundMap active={active} />
            <ul className="directions">
              <li>
                <Bus aria-hidden="true" size={20} />
                <span>
                  Bus 14 from Millbrook station stops at Ashby Lane, a
                  two-minute walk from the gate.
                </span>
              </li>
              <li>
                <Car aria-hidden="true" size={20} />
                <span>
                  Free car park for 60. On festival Saturdays please park on
                  Ashby Lane and keep the gate clear.
                </span>
              </li>
            </ul>
            <h3>Clubhouse hours</h3>
            <dl className="hours">
              {clubhouseHours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd className="num">{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section paper-2" aria-labelledby="committee-title">
        <div className="wrap staff-grid">
          <div>
            <h2 id="committee-title">The committee</h2>
            <p>
              Elected at the AGM every September. Any member can stand; meetings
              are the first Monday of the month in the clubhouse.
            </p>
          </div>
          <ul className="staff">
            {committee.map((c) => (
              <li key={c.name}>
                <b>{c.name}</b>
                <span>{c.role}</span>
                <span className="staff-teams num">Since {c.since}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="help-title">
        <div className="wrap">
          <div className="note-band note-band-photo">
            <Img photo={photos.flag} />
            <div>
              <h2 id="help-title">Give us a Saturday</h2>
              <p>
                Linesman, tea hut, kit wash, pitch markings at 7am, or a lift to
                an away game. Three hours a season makes a difference and you'll
                be thanked in the Monday Sheet whether you like it or not.
              </p>
              <a
                href={`mailto:${brand.email}?subject=Volunteering`}
                className="btn btn-primary"
              >
                <Mail aria-hidden="true" size={18} /> Email the secretary
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
