import {
  brand,
  charter,
  clutchHouse,
  images,
  staff,
  timeline,
} from "../content";

export function Club() {
  return (
    <>
      <header className="page-head wrap club-head">
        <h1>The club</h1>
        <p className="lede">
          Clutch started in {brand.founded} as five friends in a Katendrecht LAN
          café who kept losing open qualifiers in the last round. Seven years
          later we field three teams, run an academy and have a warehouse on the
          harbour — and we still play for the last round.
        </p>
      </header>

      <section className="wrap section story" aria-labelledby="story-h">
        <img
          src={images.squad}
          alt="Clutch players in headsets at the practice desks on the Clutch House training floor."
          width={1600}
          height={1066}
          className="cut"
        />
        <div>
          <h2 id="story-h">How we got here</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.year}>
                <span className="num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="house-band house-band-tall" aria-labelledby="house-h">
        <img
          src={images.house}
          alt="Match night in the Clutch House screening hall."
          width={1600}
          height={900}
          loading="lazy"
        />
        <div className="wrap house-copy">
          <h2 id="house-h">Clutch House</h2>
          <p>{clutchHouse.text}</p>
          <dl className="hours">
            {clutchHouse.hours.map((h) => (
              <div key={h.day}>
                <dt>{h.day}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <address>
            {brand.address.join(", ")} ·{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </address>
        </div>
      </section>

      <section className="wrap section charter" aria-labelledby="charter-h">
        <div>
          <h2 id="charter-h">Player welfare charter</h2>
          <p>
            Esports careers are short. We want ours to be long, so every Clutch
            player and coach is entitled to the following, in writing, reviewed
            each January by the players' council.
          </p>
        </div>
        <ul>
          {charter.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="staff-h">
        <h2 id="staff-h">Staff</h2>
        <ul className="staff">
          {staff.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong>
              <span>{s.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="wrap section contact-strip"
        aria-labelledby="contact-h"
      >
        <h2 id="contact-h">Get in touch</h2>
        <dl>
          <div>
            <dt>General & visits</dt>
            <dd>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </dd>
          </div>
          <div>
            <dt>Press & interviews</dt>
            <dd>
              <a href={`mailto:${brand.pressEmail}`}>{brand.pressEmail}</a>
            </dd>
          </div>
          <div>
            <dt>Partnerships</dt>
            <dd>
              <a href={`mailto:${brand.partnersEmail}`}>
                {brand.partnersEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt>Jobs</dt>
            <dd>
              <a href="mailto:jobs@clutch.example">jobs@clutch.example</a> —
              we're hiring a video editor and a part-time physio.
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
