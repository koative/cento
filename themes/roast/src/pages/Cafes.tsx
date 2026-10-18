import { MapPin, Phone } from "lucide-react";
import { barMenu, brand, cafes, cafesPage, fmtHours, images } from "../content";
import { money } from "../cart";

export function Cafes() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  return (
    <div className="page cafes-page">
      <header className="page-head">
        <h1>{cafesPage.title}</h1>
        <p className="lead">{cafesPage.intro}</p>
      </header>

      <div className="cafe-list">
        {cafes.map((c) => {
          const today = c.week[now.getDay()];
          const open = today && hour >= today[0] && hour < today[1];
          return (
            <article key={c.id} className="cafe">
              <img
                src={c.image}
                alt={c.imageAlt}
                loading="lazy"
                width={1200}
                height={900}
              />
              <div className="cafe-text">
                <h2>{c.name}</h2>
                <p className="cafe-status" data-open={open || undefined}>
                  {open
                    ? `Open now · ${fmtHours(today)}`
                    : today
                      ? `Today ${fmtHours(today)}`
                      : "Closed today"}
                </p>
                <p>{c.description}</p>
                <p className="cafe-address">
                  <MapPin size={18} aria-hidden="true" /> {c.address}
                </p>
                <table className="hours">
                  <caption className="visually-hidden">
                    Opening hours, {c.name}
                  </caption>
                  <tbody>
                    {c.hours.map((h) => (
                      <tr key={h.days}>
                        <th scope="row">{h.days}</th>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className="tags">
                  {c.extras.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <section className="bar-menu" aria-labelledby="h-menu">
        <div>
          <h2 id="h-menu">{cafesPage.menuTitle}</h2>
          <p className="muted">{cafesPage.menuNote}</p>
        </div>
        <ul>
          {barMenu.map((m) => (
            <li key={m.name}>
              <span>
                <strong>{m.name}</strong>
                <small>{m.detail}</small>
              </span>
              <span className="dots" aria-hidden="true" />
              <span className="num">{money(m.price)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="tours" aria-labelledby="h-tours">
        <img
          src={images.cupping.src}
          alt={images.cupping.alt}
          loading="lazy"
          width={1200}
          height={800}
        />
        <div>
          <h2 id="h-tours">{cafesPage.toursTitle}</h2>
          <p>{cafesPage.toursText}</p>
          <a className="btn btn-ghost" href={brand.phoneHref}>
            <Phone size={18} aria-hidden="true" /> Call {brand.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
