import { Link } from "../router";
import { about, photos } from "../content";
import { Photo } from "../components/Photo";

export function About() {
  return (
    <div className="about-page">
      <header className="page-head wrap page-head-split">
        <div>
          <h1>{about.title}</h1>
          <p className="lede">{about.intro}</p>
        </div>
        <Photo photo={photos.pizzaiolo} className="arch head-img" eager />
      </header>

      <section className="wrap story" aria-label="Our story">
        <div className="story-text">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Photo photo={photos.firewood} className="story-img" />
      </section>

      <section className="wrap team" aria-labelledby="team-title">
        <h2 id="team-title" className="section-title">
          Who's cooking, who's pouring
        </h2>
        <ul className="team-list">
          {about.team.map((t) => (
            <li key={t.name}>
              <h3>{t.name}</h3>
              <p className="role">{t.role}</p>
              <p>{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="suppliers-band" aria-labelledby="suppliers-title">
        <div className="wrap suppliers-grid">
          <div>
            <h2 id="suppliers-title">Everyone who fills the pass</h2>
            <p>
              We name our suppliers on every menu because they do the hard part.
              Most of them eat here; one of them taught Marisol to fillet a
              sole.
            </p>
            <Photo photo={photos.burrata} className="arch suppliers-img" />
          </div>
          <table className="ledger">
            <caption className="sr-only">
              Our suppliers, what they send and how far it travels
            </caption>
            <thead>
              <tr>
                <th scope="col">Supplier</th>
                <th scope="col">What they send</th>
                <th scope="col">Distance</th>
              </tr>
            </thead>
            <tbody>
              {about.suppliers.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.what}</td>
                  <td>{s.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap about-close" aria-labelledby="about-close-title">
        <h2 id="about-close-title">Come and see the fire.</h2>
        <p>
          Sit at the counter and you'll watch Ines work the oven from three feet
          away.
        </p>
        <div className="actions">
          <Link to="/reservations" className="btn btn-primary">
            Book a table
          </Link>
          <Link to="/events" className="btn btn-ghost">
            Join a pizza school
          </Link>
        </div>
      </section>
    </div>
  );
}
