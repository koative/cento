import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { areas, listings } from "../content";
import { money } from "../lib/format";
import { CityMap } from "../components/CityMap";

export function Neighborhoods() {
  return (
    <>
      <section className="page-head wrap">
        <h1>Neighborhood guides</h1>
        <p className="lede">
          Port Ellery is six places that happen to share a river. These guides
          are written by the agents who live in each one: what the streets are
          like, how long the walk to the station really takes, and what a home
          costs this year.
        </p>
      </section>

      <section className="wrap section-tight">
        <CityMap
          label="Map of Port Ellery. Choose a neighborhood to open its guide."
          listings={listings}
          areaLinks
        />
      </section>

      <section className="wrap section">
        <h2>Side by side</h2>
        <div className="table-scroll">
          <table className="data-table num">
            <thead>
              <tr>
                <th scope="col">Neighborhood</th>
                <th scope="col">Median sale</th>
                <th scope="col">Median rent</th>
                <th scope="col">Per sq ft</th>
                <th scope="col">Typical home</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a.slug}>
                  <th scope="row">
                    <Link to={"/neighborhoods/" + a.slug}>{a.name}</Link>
                  </th>
                  <td>{money(a.medianSale)}</td>
                  <td>{money(a.medianRent)} / mo</td>
                  <td>{money(a.pricePerSqft)}</td>
                  <td className="wrap-cell">{a.typical}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine">
          Medians from completed sales and new tenancies on our books over the
          last twelve months.
        </p>
      </section>

      <section className="wrap section guide-list">
        {areas.map((a) => (
          <article key={a.slug} className="guide-row">
            <img src={a.image} alt="" loading="lazy" />
            <div>
              <h2>
                <Link to={"/neighborhoods/" + a.slug}>{a.name}</Link>
              </h2>
              <p>{a.line}</p>
              <p className="muted">{a.commute}.</p>
              <Link
                to={"/neighborhoods/" + a.slug}
                className="text-link"
                aria-hidden="true"
                tabIndex={-1}
              >
                Read the guide <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
