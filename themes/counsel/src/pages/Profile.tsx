import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "../router";
import { people, type Person } from "../content";
import { areaBySlug, insightsBy, tel } from "../lib/util";
import { PageHead } from "../components/PageHead";
import { PersonCard } from "../components/PersonCard";
import { InsightList } from "../components/InsightList";
import { Closing } from "../components/Closing";

export function Profile({ person }: { person: Person }) {
  const first = person.name.split(" ")[0];
  const writing = insightsBy(person.slug);
  const colleagues = people
    .filter(
      (p) =>
        p.slug !== person.slug && p.areas.some((a) => person.areas.includes(a)),
    )
    .slice(0, 4);

  return (
    <>
      <PageHead
        title={person.name}
        trail={[{ to: "/people", label: "People" }]}
      >
        <p className="lede">
          {person.role}, {person.office}
        </p>
      </PageHead>

      <section className="wrap profile">
        <div className="profile-side">
          <img
            src={person.image}
            alt={`Portrait of ${person.name}`}
            width={800}
            height={1000}
            style={
              person.imagePosition
                ? { objectPosition: person.imagePosition }
                : undefined
            }
          />
          <ul className="contact-lines">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={tel(person.phone)}>{person.phone}</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </li>
          </ul>
          <Link
            to={`/enquiry?lawyer=${person.slug}&area=${person.areas[0]}`}
            className="btn"
          >
            Enquire with {first} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="profile-main">
          <div className="prose">
            {person.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h2 className="sub-title">Representative matters</h2>
          <ul className="matters">
            {person.matters.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <h2 className="sub-title">Credentials</h2>
          <dl className="facts">
            <dt>Practice areas</dt>
            <dd>
              <ul>
                {person.areas.map((a) => (
                  <li key={a}>
                    <Link to={`/practice/${a}`}>{areaBySlug(a)?.name}</Link>
                  </li>
                ))}
              </ul>
            </dd>
            <dt>Admitted</dt>
            <dd>
              <ul>
                {person.admitted.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </dd>
            <dt>Education</dt>
            <dd>
              <ul>
                {person.education.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </dd>
            <dt>Languages</dt>
            <dd>{person.languages.join(", ")}</dd>
          </dl>

          {writing.length > 0 && (
            <>
              <h2 className="sub-title">Writing</h2>
              <InsightList items={writing} />
            </>
          )}
        </div>
      </section>

      {colleagues.length > 0 && (
        <section className="section wrap" aria-labelledby="colleagues-title">
          <h2 id="colleagues-title" className="section-title">
            Works alongside
          </h2>
          <div className="people-grid">
            {colleagues.map((p) => (
              <PersonCard key={p.slug} person={p} />
            ))}
          </div>
        </section>
      )}

      <Closing
        title={`Speak to ${first} about your matter.`}
        to={`/enquiry?lawyer=${person.slug}&area=${person.areas[0]}`}
      />
    </>
  );
}
