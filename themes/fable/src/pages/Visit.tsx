import { Bike, Bus, Car, TrainFront } from "lucide-react";
import { Link } from "../router";
import {
  accessibility,
  brand,
  days,
  faqs,
  gettingHere,
  hours,
  hoursNote,
} from "../content";
import { hoursLabel, openStatus } from "../lib/format";
import { MapExplorer } from "../components/MapExplorer";
import { DayPlan } from "../components/DayPlan";

const travelIcons = [TrainFront, Bus, Car, Bike];

export function Visit() {
  const status = openStatus();
  const today = new Date().getDay();

  return (
    <>
      <section className="page-hero wrap visit-hero">
        <div>
          <h1>Plan your visit</h1>
          <p className="lede">
            Pick who’s coming, choose the galleries you want to see, and we’ll
            lay out the day — with lunch, and time to get lost on the way.
          </p>
        </div>
        <div className="hours-card">
          <p className="status" data-open={status.open ? "" : undefined}>
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </p>
          <table>
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {[2, 3, 4, 5, 6, 0, 1].map((d) => (
                <tr key={d} aria-current={d === today ? "date" : undefined}>
                  <th scope="row">{days[d]}</th>
                  <td className="tnum">{hoursLabel(hours[d])}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small">{hoursNote}</p>
        </div>
      </section>

      <section
        className="section band band-paper2"
        aria-labelledby="planner-title"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="planner-title">Build your day</h2>
            <p>
              Your plan is saved on this device, so it is still here when you
              come back to book.
            </p>
          </div>
          <MapExplorer />
          <DayPlan />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="travel-title">
        <h2 id="travel-title">Getting here</h2>
        <p className="lede-sm">
          {brand.address.join(", ")}. Look for the brick tram shed with the
          yellow doors.
        </p>
        <ul className="travel">
          {gettingHere.map((g, i) => {
            const Icon = travelIcons[i];
            return (
              <li key={g.title}>
                <Icon aria-hidden="true" />
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section wrap access" aria-labelledby="access-title">
        <div>
          <h2 id="access-title">Access for everyone</h2>
          <p>
            Questions about a visit? Call our access line on{" "}
            <a href={brand.phoneHref}>{brand.phone}</a> and Dele’s team will
            talk it through.
          </p>
        </div>
        <ul className="ticks">
          {accessibility.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="section wrap food" aria-labelledby="food-title">
        <h2 id="food-title">Lunch, snacks and naps</h2>
        <div className="food-grid">
          <div>
            <h3>Crumbs café</h3>
            <p>
              Soup from the courtyard garden, grilled cheese, fruit cups and
              good coffee. Kids’ lunch box $7.50. High chairs and a microwave
              for baby food.
            </p>
          </div>
          <div>
            <h3>Picnic room</h3>
            <p>
              Bring your own lunch and eat at the long tables next to the café.
              We are nut-aware, so please leave nut snacks at home.
            </p>
          </div>
          <div>
            <h3>Buggies &amp; lockers</h3>
            <p>
              Buggy park by the entrance. Coin-free lockers big enough for a
              changing bag and three coats.
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Good to know</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p>
          Still wondering? Email{" "}
          <a href={`mailto:${brand.email}`}>{brand.email}</a> or{" "}
          <Link to="/tickets">book your tickets</Link> now.
        </p>
      </section>
    </>
  );
}
