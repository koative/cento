import { ArrowLeft, ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Link, navigate } from "../router";
import { cars, photos, stations, type Station } from "../content";
import { setDraft } from "../lib/booking";
import { hoursLabel, money, openStatus, weekdays } from "../lib/format";
import { RegionMap } from "../components/RegionMap";
import { CarDrawing } from "../components/CarDrawing";

export function LocationPage({ station }: { station: Station }) {
  const status = openStatus(station);
  const today = new Date().getDay();
  const pic = photos[station.photo];
  const here = cars.filter((c) => c.stations.includes(station.id));
  const others = stations.filter((s) => s.id !== station.id);

  const book = () => {
    setDraft({ pickup: station.id, dropoff: station.id, step: 1 });
    navigate("/book");
  };

  return (
    <>
      <section className="wrap station-head">
        <Link to="/locations" className="back-link">
          <ArrowLeft aria-hidden="true" /> Locations
        </Link>
        <div className="station-head-grid">
          <div>
            <p className="station-sign station-sign-lg">
              <span className="station-code">{station.code}</span>
              {station.kind}
            </p>
            <h1>{station.name}</h1>
            <p className="lede">{station.intro}</p>
            <p className="station-now">
              <span className="status" data-open={status.open ? "" : undefined}>
                {status.label}
              </span>
            </p>
            <div className="station-actions">
              <button type="button" className="btn btn-sign" onClick={book}>
                Book from {station.short} <ArrowRight aria-hidden="true" />
              </button>
              <a className="btn btn-outline" href={station.phoneHref}>
                <Phone aria-hidden="true" /> {station.phone}
              </a>
            </div>
          </div>
          <figure className="station-photo">
            <img src={pic.src} alt={pic.alt} width={pic.w} height={pic.h} />
          </figure>
        </div>
      </section>

      <section className="section wrap station-body">
        <div>
          <h2>Finding the counter</h2>
          <p className="station-counter">
            <MapPin aria-hidden="true" />
            <span>
              {station.counter}
              <br />
              {station.address.join(", ")}
            </span>
          </p>
          <ol className="directions">
            {station.directions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h3>After hours</h3>
          <p>{station.afterHours}</p>
        </div>

        <div>
          <h2>
            <Clock aria-hidden="true" className="h-icon" /> Hours
          </h2>
          {station.allDay ? (
            <p className="hours-all">Every day, all day and all night.</p>
          ) : (
            <table className="hours tnum">
              <tbody>
                {weekdays.map((w, i) => (
                  <tr key={w} data-today={i === today ? "" : undefined}>
                    <th scope="row">{w}</th>
                    <td>{hoursLabel(station.hours[i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <RegionMap
            active={[station.id]}
            links
            label={`Map with ${station.name} highlighted`}
          />
        </div>
      </section>

      <section className="section band-concrete" aria-labelledby="here-title">
        <div className="wrap">
          <h2 id="here-title">Parked at {station.short}</h2>
          <ul className="here-list">
            {here.map((c) => (
              <li key={c.id}>
                <CarDrawing car={c} />
                <Link to={`/fleet/${c.id}`} className="card-link">
                  {c.name}
                </Link>
                <span className="tnum">
                  {c.className} · {money(c.rate)}/day
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="other-title">
        <h2 id="other-title">Other stations</h2>
        <ul className="station-list station-list-row">
          {others.map((s) => (
            <li key={s.id}>
              <span className="station-code">{s.code}</span>
              <Link to={`/locations/${s.id}`} className="card-link">
                {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
