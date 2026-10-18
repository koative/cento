import { spa } from "../content";
import { Link } from "../router";
import { money } from "../lib/stay";

export function Spa() {
  return (
    <>
      <header className="page-head wrap">
        <h1>The bathhouse</h1>
        <p className="lede">{spa.intro}</p>
        <p className="hours">{spa.hours}</p>
      </header>

      <section className="wrap spa-hero" aria-label="Photographs">
        <img
          src={spa.image.src}
          alt={spa.image.alt}
          width={1280}
          height={853}
        />
        <img src={spa.lake.src} alt={spa.lake.alt} width={1800} height={1200} />
      </section>

      <section className="section wrap spa-rooms" aria-labelledby="rooms-h">
        <h2 id="rooms-h">Heat, then cold, then rest</h2>
        <ul className="heat-list">
          {spa.rooms.map((r) => (
            <li key={r.name}>
              <span className="heat-temp num">{r.temp}</span>
              <span className="heat-name">{r.name}</span>
              <span className="heat-text">{r.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-pine" aria-labelledby="inf-h">
        <div className="wrap spa-split">
          <div>
            <h2 id="inf-h">Infusions, every day on the hour</h2>
            <p>
              Mia or Gion pours water and oils over the stones and waves the
              heat round the room with a linen towel. Arrive five minutes early;
              the door closes when it starts.
            </p>
            <img
              src={spa.fire.src}
              alt={spa.fire.alt}
              width={1280}
              height={853}
              loading="lazy"
            />
          </div>
          <table className="schedule">
            <caption className="sr-only">Daily infusion schedule</caption>
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Infusion</th>
                <th scope="col">With</th>
              </tr>
            </thead>
            <tbody>
              {spa.infusions.map((i) => (
                <tr key={i.time}>
                  <td className="num">{i.time}</td>
                  <td>{i.name}</td>
                  <td>{i.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="treat-h">
        <h2 id="treat-h">Treatments</h2>
        <ul className="menu-list treatments">
          {spa.treatments.map((t) => (
            <li key={t.name}>
              <span className="menu-name">{t.name}</span>
              <span className="menu-price num">
                {t.minutes} min · {money(t.price)}
              </span>
              <span className="menu-detail">{t.text}</span>
            </li>
          ))}
        </ul>
        <p className="small">
          Book treatments at reception, or add the private bathhouse hour when
          you <Link to="/book">reserve your stay</Link>.
        </p>
      </section>

      <section className="section wrap faq" aria-labelledby="rules-h">
        <h2 id="rules-h">Before you come down</h2>
        {spa.rules.map((r) => (
          <details key={r.q}>
            <summary>{r.q}</summary>
            <p>{r.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
