import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { services, speciesLabel, vets, type Service } from "../content";
import { money } from "../lib/format";
import { Faq } from "../components/Faq";
import { ServiceList, SpeciesIcons } from "../components/ServiceList";
import { VetCard } from "../components/VetCard";

export function ServicePage({ service: s }: { service: Service }) {
  const team = vets.filter((v) => s.vets.includes(v.slug));
  const related = services
    .filter(
      (o) =>
        o.slug !== s.slug && o.species.some((sp) => s.species.includes(sp)),
    )
    .slice(0, 3);

  return (
    <>
      <section className="service-hero wrap">
        <div className="service-hero-copy">
          <p className="crumbs">
            <Link to="/services">Services</Link>{" "}
            <span aria-hidden="true">/</span> <span>{s.name}</span>
          </p>
          <h1>{s.name}</h1>
          <p className="lede">{s.intro}</p>
          <div className="service-meta">
            <SpeciesIcons species={s.species} />
            <span>{s.species.map((sp) => speciesLabel[sp]).join(" · ")}</span>
          </div>
          <div className="actions">
            <Link
              to={`/book?reason=${s.reason}`}
              className="btn btn-primary btn-lg"
            >
              Book this <ArrowRight aria-hidden="true" />
            </Link>
            <span className="from-price">
              {s.from === 0 ? (
                "Free to start"
              ) : (
                <>
                  from <b>{money(s.from)}</b>
                </>
              )}
            </span>
          </div>
        </div>
        <div
          className="service-hero-media"
          data-pair={s.extra ? "" : undefined}
        >
          <img
            src={s.image.src}
            alt={s.image.alt}
            width={s.image.w}
            height={s.image.h}
          />
          {s.extra && (
            <img
              src={s.extra.src}
              alt={s.extra.alt}
              width={s.extra.w}
              height={s.extra.h}
              loading="lazy"
            />
          )}
        </div>
      </section>

      <section className="section wrap service-body">
        <div className="service-main">
          <h2>At the appointment</h2>
          <ol className="steps">
            {s.steps.map((st) => (
              <li key={st.title}>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>

          <h2>Questions owners ask</h2>
          <Faq items={s.faqs} />
        </div>

        <aside className="service-side">
          <div className="price-card">
            <h2>Prices</h2>
            <table className="price-table">
              <thead>
                <tr>
                  <th scope="col">Visit</th>
                  <th scope="col">Time</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {s.visits.map((v) => (
                  <tr key={v.name}>
                    <th scope="row">{v.name}</th>
                    <td>{v.duration}</td>
                    <td className="num">{money(v.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fine">
              Medicines, lab fees and extra procedures are quoted separately.
              Health-plan members save 10–15%.
            </p>
          </div>
          <div className="prep">
            <h2>Before you come</h2>
            <ul>
              {s.prep.map((p) => (
                <li key={p}>
                  <Check aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="section wrap" aria-labelledby="h-team">
        <h2 id="h-team">Who you'll see</h2>
        <div className="vet-row vet-row-small">
          {team.map((v) => (
            <VetCard key={v.slug} vet={v} />
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section wrap" aria-labelledby="h-related">
          <h2 id="h-related">Often booked alongside</h2>
          <ServiceList items={related} />
        </section>
      )}
    </>
  );
}
