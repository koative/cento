import { Link } from "../router";
import { house } from "../content";

export function House() {
  const { images } = house;
  return (
    <div className="page house-page">
      <header className="page-head">
        <h1 className="display">{house.title}</h1>
        <p className="lede">{house.intro}</p>
      </header>

      <img className="house-lead" src={images.lead} alt={images.leadAlt} />

      <section className="house-story" aria-labelledby="story-title">
        <h2 id="story-title">Since 2013, on Rue de Charonne</h2>
        <div className="house-story-text">
          {house.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <img src={images.cutting} alt={images.cuttingAlt} loading="lazy" />
      </section>

      <section
        className="section principles"
        aria-labelledby="principles-title"
      >
        <h2 id="principles-title">How we work</h2>
        <dl>
          {house.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section makers" aria-labelledby="makers-title">
        <div className="makers-media">
          <img src={images.table} alt={images.tableAlt} loading="lazy" />
        </div>
        <div>
          <h2 id="makers-title">Where it is made</h2>
          <p>Every product page names its workshop. These are all of them.</p>
          <table className="makers-table">
            <thead>
              <tr>
                <th scope="col">Place</th>
                <th scope="col">What</th>
                <th scope="col">Who, and since when</th>
              </tr>
            </thead>
            <tbody>
              {house.makers.map((m) => (
                <tr key={m.place}>
                  <th scope="row">{m.place}</th>
                  <td>{m.what}</td>
                  <td>{m.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section people" aria-labelledby="people-title">
        <h2 id="people-title">The studio</h2>
        <ul>
          {house.people.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p className="people-role">{p.role}</p>
              <p>{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="atelier-band" aria-labelledby="visit-title">
        <img src={images.thread} alt={images.threadAlt} loading="lazy" />
        <div>
          <h2 id="visit-title">Visit the atelier</h2>
          <p>
            The Paris atelier is one floor above the Charonne shop. Ask in store
            on a weekday afternoon, or write ahead and we will set a time.
          </p>
          <div className="actions">
            <Link to="/stores" className="btn btn-paper">
              Stores and hours
            </Link>
            <Link
              to="/journal/forty-hours-in-a-coat"
              className="btn btn-paper-line"
            >
              Forty hours in a coat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
