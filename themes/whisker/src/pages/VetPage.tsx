import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { days, services, speciesLabel, vets, type Vet } from "../content";
import { ServiceList } from "../components/ServiceList";
import { VetCard } from "../components/VetCard";

export function VetPage({ vet: v }: { vet: Vet }) {
  const theirServices = services.filter((s) => s.vets.includes(v.slug));
  const others = vets.filter((o) => o.slug !== v.slug).slice(0, 3);

  return (
    <>
      <section className="profile wrap">
        <figure className="polaroid polaroid-lg">
          <img
            src={v.pet.image.src}
            alt={v.pet.image.alt}
            width={v.pet.image.w}
            height={v.pet.image.h}
          />
          <figcaption>
            {v.pet.name} — {v.pet.about}
          </figcaption>
        </figure>
        <div className="profile-copy">
          <p className="crumbs">
            <Link to="/vets">Vets & nurses</Link>{" "}
            <span aria-hidden="true">/</span> <span>{v.name}</span>
          </p>
          <h1>{v.name}</h1>
          <p className="profile-role">{v.role}</p>
          {v.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <blockquote className="profile-quote">
            <p>“{v.quote}”</p>
          </blockquote>
          <Link
            to={v.bookable ? `/book?vet=${v.slug}` : "/book?reason=nurse"}
            className="btn btn-primary btn-lg"
          >
            {v.bookable ? `Book with ${v.short}` : "Book a nurse clinic"}{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <dl className="spec-card">
          <div>
            <dt>Qualifications</dt>
            <dd>{v.credentials}</dd>
          </div>
          <div>
            <dt>At Whisker since</dt>
            <dd>{v.since}</dd>
          </div>
          <div>
            <dt>Special interests</dt>
            <dd>{v.interests.join(", ")}</dd>
          </div>
          <div>
            <dt>Sees</dt>
            <dd>{v.species.map((s) => speciesLabel[s]).join(", ")}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>{v.languages.join(", ")}</dd>
          </div>
          <div>
            <dt>In clinic</dt>
            <dd>
              <ul className="week" aria-label="Days in clinic">
                {days.map((d) => (
                  <li key={d} data-on={v.days.includes(d) ? "" : undefined}>
                    <span aria-hidden="true">{d[0]}</span>
                    <span className="sr-only">
                      {d}: {v.days.includes(d) ? "in" : "off"}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      {theirServices.length > 0 && (
        <section className="section wrap" aria-labelledby="h-their">
          <h2 id="h-their">{v.short} leads</h2>
          <ServiceList items={theirServices} />
        </section>
      )}

      <section className="section wrap" aria-labelledby="h-others">
        <h2 id="h-others">Also on the team</h2>
        <div className="vet-row vet-row-small">
          {others.map((o) => (
            <VetCard key={o.slug} vet={o} />
          ))}
        </div>
      </section>
    </>
  );
}
