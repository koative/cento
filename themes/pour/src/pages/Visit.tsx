import { brand, hours, images, visit } from "../content";

export function Visit() {
  return (
    <div className="page">
      <header className="page-head">
        <h1>Visit Pour</h1>
        <p className="lead">
          {brand.street}, {brand.area}. A shop by day and a bar by night, under
          the same tin ceiling.
        </p>
      </header>

      <div className="visit-grid">
        <section>
          <h2>Hours</h2>
          <table className="hours-table">
            <caption className="visually-hidden">
              Shop and bar opening hours
            </caption>
            <thead>
              <tr>
                <td />
                <th scope="col">Shop</th>
                <th scope="col">Bar</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h.day}>
                  <th scope="row">{h.day}</th>
                  <td>{h.shop}</td>
                  <td>{h.bar}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Contact</h2>
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </p>
        </section>

        <section>
          <h2>Getting here</h2>
          <svg
            className="street-map"
            viewBox="0 0 400 260"
            role="img"
            aria-labelledby="map-title"
          >
            <title id="map-title">
              Pour sits on the corner of Larch Street and 9th Avenue, two blocks
              east of the river path
            </title>
            <path className="map-river" d="M0 40C60 60 70 140 40 260H0Z" />
            <path
              className="map-road"
              d="M0 150H400M210 0V260M330 0V260M110 0V260"
            />
            <path className="map-road minor" d="M0 70H400M0 225H400" />
            <text x="250" y="142">
              Larch St
            </text>
            <text x="216" y="30" transform="rotate(90 216 30)">
              9th Ave
            </text>
            <text x="336" y="30" transform="rotate(90 336 30)">
              Grand Ave
            </text>
            <text x="8" y="252">
              River path
            </text>
            <circle className="map-stop" cx="330" cy="70" r="6" />
            <text x="342" y="84">
              Streetcar
            </text>
            <circle className="map-stop" cx="190" cy="165" r="6" />
            <text x="120" y="186">
              Bus 14 · 17
            </text>
            <g className="map-pin" transform="translate(222 118)">
              <path d="M0 22C-14 6-10-14 0-14S14 6 0 22Z" />
              <circle cy="-2" r="4" />
            </g>
            <text className="map-label" x="240" y="112">
              Pour
            </text>
          </svg>
          <ul className="directions">
            {visit.directions.map((d) => (
              <li key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
          <h3>Delivery</h3>
          <p>{visit.delivery}</p>
        </section>
      </div>

      <figure className="wide-photo">
        <img
          src={images.table}
          alt="Glasses of white wine and plates on a long candlelit table"
          width={1600}
          height={1066}
          loading="lazy"
        />
      </figure>

      <section className="section faq">
        <h2>Questions we get asked</h2>
        {visit.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
