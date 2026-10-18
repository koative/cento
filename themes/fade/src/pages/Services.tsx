import { Link } from "../router";
import {
  addOns,
  barbers,
  policies,
  serviceGroups,
  services,
  servicesPage,
  tierSurcharge,
  type Tier,
} from "../content";
import { money } from "../lib/format";
import { PageHead } from "../components/PageHead";
import { PriceList } from "../components/PriceList";

export function Services() {
  const tiers = Object.keys(tierSurcharge) as Tier[];
  return (
    <>
      <PageHead title={servicesPage.title} intro={servicesPage.intro} />

      <div className="wrap services-layout">
        <div className="board services-board">
          {serviceGroups.map((g) => (
            <section
              key={g.id}
              aria-labelledby={`g-${g.id}`}
              className="service-group"
            >
              <h2 id={`g-${g.id}`}>{g.title}</h2>
              <p className="group-note">{g.note}</p>
              <PriceList
                items={services.filter((s) => s.group === g.id)}
                detailed
              />
            </section>
          ))}
        </div>

        <aside className="services-side">
          <section aria-labelledby="tiers-title">
            <h2 id="tiers-title">Who cuts, what it adds</h2>
            <table className="tier-table">
              <thead>
                <tr>
                  <th scope="col">Level</th>
                  <th scope="col">Barbers</th>
                  <th scope="col">Adds</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t}>
                    <th scope="row">{t}</th>
                    <td>
                      {barbers
                        .filter((b) => b.tier === t)
                        .map((b) => b.name.split(" ")[0])
                        .join(", ")}
                    </td>
                    <td>
                      {tierSurcharge[t] ? `+${money(tierSurcharge[t])}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="addons-title">
            <h2 id="addons-title">{servicesPage.addOnsTitle}</h2>
            <ul className="addon-list">
              {addOns.map((a) => (
                <li key={a.id}>
                  <span>{a.name}</span>
                  <span className="price-num">+{money(a.price)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="unsure-title" className="unsure">
            <h2 id="unsure-title">Not sure what to ask for?</h2>
            <p>
              Build the cut on the fade chart. It picks the right service and
              writes the description into your booking.
            </p>
            <Link to="/fade-chart" className="btn btn-ink">
              Open the fade chart
            </Link>
          </section>
        </aside>
      </div>

      <section className="wrap policies" aria-labelledby="policies-title">
        <h2 id="policies-title">{servicesPage.policiesTitle}</h2>
        <dl>
          {policies.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
