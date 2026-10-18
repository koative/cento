import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { Area as AreaT } from "../content";
import { insightsIn, peopleIn, personBySlug } from "../lib/util";
import { PageHead } from "../components/PageHead";
import { LimitationClock } from "../components/LimitationClock";
import { PersonCard } from "../components/PersonCard";
import { InsightList } from "../components/InsightList";
import { Faqs } from "../components/Faqs";
import { Closing } from "../components/Closing";

export function Area({ area }: { area: AreaT }) {
  const lead = personBySlug(area.lead);
  const team = peopleIn(area.slug);
  const writing = insightsIn(area.slug);

  return (
    <>
      <PageHead
        title={area.name}
        lede={area.short}
        trail={[{ to: "/practice", label: "Practice areas" }]}
      />

      <section className="wrap area-intro">
        <div className="prose">
          {area.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <aside className="area-aside">
          <img
            src={area.image}
            alt={area.imageAlt}
            width={1600}
            height={1067}
          />
          {lead && (
            <p>
              Led by <Link to={`/people/${lead.slug}`}>{lead.name}</Link>,{" "}
              {lead.role.toLowerCase()}, {lead.office}.
            </p>
          )}
          <Link to={`/enquiry?area=${area.slug}`} className="btn">
            Enquire about this area <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className="section wrap" aria-labelledby="services-title">
        <h2 id="services-title" className="section-title">
          What we do
        </h2>
        <dl className="services">
          {area.services.map((s) => (
            <div key={s.name}>
              <dt>{s.name}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap" aria-labelledby="matters-title">
        <h2 id="matters-title" className="section-title">
          Representative matters
        </h2>
        <ul className="matters">
          {area.matters.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="night" aria-labelledby="deadline-title">
        <div className="wrap night-grid">
          <div>
            <h2 id="deadline-title" className="section-title">
              Deadlines that apply
            </h2>
            <p>
              Time limits in {area.name.toLowerCase()} can be short. Check where
              yours stands, then talk to us before it runs.
            </p>
          </div>
          <LimitationClock area={area.slug} />
        </div>
      </section>

      <section className="section wrap fee-note" aria-labelledby="fee-title">
        <h2 id="fee-title" className="section-title">
          How we charge
        </h2>
        <div>
          <p>{area.fees}</p>
          <Link to="/fees" className="text-link">
            Fee schedule and hourly rates{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="team-title">
        <h2 id="team-title" className="section-title">
          Your lawyers
        </h2>
        <div className="people-grid">
          {team.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
      </section>

      <section className="section wrap faq-section" aria-labelledby="faq-title">
        <h2 id="faq-title" className="section-title">
          Questions we are asked
        </h2>
        <Faqs items={area.faqs} />
      </section>

      {writing.length > 0 && (
        <section className="section wrap" aria-labelledby="writing-title">
          <h2 id="writing-title" className="section-title">
            Further reading
          </h2>
          <InsightList items={writing} />
        </section>
      )}

      <Closing
        title={`Talk to us about ${area.name.toLowerCase()}.`}
        to={`/enquiry?area=${area.slug}`}
      />
    </>
  );
}
