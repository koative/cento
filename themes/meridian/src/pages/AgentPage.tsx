import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link } from "../router";
import { listings, recentSales, type Agent } from "../content";
import { areaOf, money } from "../lib/format";
import { ListingCard } from "../components/ListingCard";

export function AgentPage({ agent: a }: { agent: Agent }) {
  const homes = listings.filter((l) => l.agent === a.id);
  const sold = recentSales.filter((s) => s.agent === a.id);

  return (
    <article>
      <div className="wrap crumbs">
        <Link to="/agents" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> All agents
        </Link>
      </div>
      <header className="wrap profile">
        <img src={a.photo} alt={`Portrait of ${a.name}`} />
        <div>
          <h1>{a.name}</h1>
          <p className="agent-role">{a.role}</p>
          {a.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <dl className="particulars num">
            <div>
              <dt>Neighborhoods</dt>
              <dd>
                {a.areas.map((s, i) => (
                  <span key={s}>
                    {i > 0 && ", "}
                    <Link to={"/neighborhoods/" + s}>{areaOf(s).name}</Link>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>With Meridian since</dt>
              <dd>{a.since}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{a.languages}</dd>
            </div>
          </dl>
          <div className="btn-row">
            <a href={a.phoneHref} className="btn">
              <Phone size={17} aria-hidden="true" />{" "}
              <span className="num">{a.phone}</span>
            </a>
            <a href={"mailto:" + a.email} className="btn btn-quiet">
              <Mail size={17} aria-hidden="true" /> {a.email}
            </a>
          </div>
        </div>
      </header>

      <section className="quote wrap quote-small">
        <blockquote>
          <p>“{a.quote.text}”</p>
          <footer>{a.quote.by}</footer>
        </blockquote>
      </section>

      {homes.length > 0 && (
        <section className="wrap section">
          <h2>{a.name.split(" ")[0]}'s homes on the market</h2>
          <div className="card-grid card-grid-3">
            {homes.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      )}

      {sold.length > 0 && (
        <section className="wrap section">
          <h2>Recently sold</h2>
          <div className="table-scroll">
            <table className="data-table num">
              <thead>
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Neighborhood</th>
                  <th scope="col">Achieved</th>
                  <th scope="col">Days on market</th>
                </tr>
              </thead>
              <tbody>
                {sold.map((s) => (
                  <tr key={s.address}>
                    <th scope="row">{s.address}</th>
                    <td>{areaOf(s.area).name}</td>
                    <td>{money(s.achieved)}</td>
                    <td>{s.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
