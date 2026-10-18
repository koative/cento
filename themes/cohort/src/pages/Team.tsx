import { Link } from "../router";
import {
  brand,
  domainById,
  firmStory,
  funds,
  partners,
  staff,
} from "../content";
import { compact } from "../lib/format";

export function Team() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>Six people who have done the job.</h1>
        <div className="story">
          {firmStory.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </header>

      <section className="section wrap" aria-labelledby="partners">
        <h2 id="partners" className="section-title">
          The partnership
        </h2>
        <ul className="partner-list">
          {partners.map((p) => (
            <li key={p.slug}>
              <h3>
                <Link to={`/team/${p.slug}`}>{p.name}</Link>
              </h3>
              <p className="roster-role">
                {p.role} · {p.based}
              </p>
              <p>{p.before}</p>
              <p className="partner-focus">
                {p.focus.map((f) => domainById(f).name).join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap team-split">
        <div>
          <h2 className="section-title">Behind the partners</h2>
          <ul className="staff">
            {staff.map((s) => (
              <li key={s.name}>
                <span>{s.name}</span>
                <span>{s.role}</span>
              </li>
            ))}
          </ul>
          <h2 className="section-title">Offices</h2>
          <ul className="staff">
            {brand.offices.map((o) => (
              <li key={o.city}>
                <span>{o.city}</span>
                <span>{o.address}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-title">Our funds</h2>
          <div className="ledger-scroll">
            <table className="funds">
              <caption className="sr-only">Cohort funds by vintage</caption>
              <thead>
                <tr>
                  <th scope="col">Fund</th>
                  <th scope="col" className="num">
                    Vintage
                  </th>
                  <th scope="col" className="num">
                    Size
                  </th>
                  <th scope="col" className="num">
                    Companies
                  </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((f) => (
                  <tr key={f.name}>
                    <th scope="row">{f.name}</th>
                    <td className="num">{f.year}</td>
                    <td className="num">{compact(f.size)}</td>
                    <td className="num">{f.companies}</td>
                    <td>{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine funds-note">
            Fund sizes are committed capital. We do not publish returns; our
            limited partners receive them quarterly.
          </p>
        </div>
      </section>
    </div>
  );
}
