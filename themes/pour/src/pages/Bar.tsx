import { Link } from "../router";
import { bar, brand, colours, hours, images, wines } from "../content";
import { money } from "../lib/cart";

const pouring = wines.filter((w) => w.glass);

export function Bar() {
  return (
    <div className="page bar-page">
      <header className="bar-head">
        <div>
          <h1>The bar</h1>
          <p className="lead">{bar.intro}</p>
          <ul className="bar-notes">
            {bar.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <img
          src={images.chalkboard}
          alt="The bar at Pour after dark, bulbs hanging over the chalkboard"
          width={1400}
          height={933}
        />
      </header>

      <div className="menu-cols">
        <section className="menu-block">
          <h2>By the glass</h2>
          <p className="menu-legend">
            <span>Glass</span>
            <span>Bottle at the bar</span>
          </p>
          {colours.map((c) => {
            const list = pouring.filter((w) => w.colour === c);
            if (!list.length) return null;
            return (
              <div key={c} className="menu-group">
                <h3>{c}</h3>
                <ul>
                  {list.map((w) => (
                    <li key={w.id}>
                      <div>
                        <Link to={"/wines/" + w.id}>{w.name}</Link>
                        <small>
                          {w.producer} · {w.grapes} · {w.country}
                        </small>
                      </div>
                      <span className="num">{money(w.glass!)}</span>
                      <span className="num">{money(w.price + 15)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="menu-group">
            <h3>Something else</h3>
            <ul>
              {bar.extras.map((x) => (
                <li key={x.name}>
                  <div>
                    <span>{x.name}</span>
                    <small>{x.detail}</small>
                  </div>
                  <span className="num">{money(x.price)}</span>
                  <span />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="menu-block">
          <h2>Small plates</h2>
          <ul className="plates">
            {bar.plates.map((p) => (
              <li key={p.name}>
                <div>
                  <span>{p.name}</span>
                  <small>{p.detail}</small>
                </div>
                <span className="num">{money(p.price)}</span>
              </li>
            ))}
          </ul>
          <img
            src={images.plates}
            alt="A plate of salami, cheeses, olives and toasted bread"
            width={1300}
            height={927}
            loading="lazy"
          />
        </section>
      </div>

      <section className="section bar-hours">
        <h2>When the bar is open</h2>
        <table className="hours-table">
          <caption className="visually-hidden">Bar opening hours</caption>
          <tbody>
            {hours.map((h) => (
              <tr key={h.day}>
                <th scope="row">{h.day}</th>
                <td>{h.bar}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Walk in at {brand.street}. Six or more?{" "}
          <a href={`mailto:${brand.email}?subject=Long%20table`}>Email us</a> a
          day ahead. Want a seat with a story?{" "}
          <Link to="/tastings">See the tastings</Link>.
        </p>
      </section>
    </div>
  );
}
