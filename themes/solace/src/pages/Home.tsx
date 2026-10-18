import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  clinicians,
  home,
  images,
  locations,
  patients,
  services,
} from "../content";
import { ClinicianBadge } from "../components/ClinicianBadge";
import {
  clinicianBy,
  fmtTime,
  fromIso,
  locationBy,
  nextSlots,
  openState,
  serviceBy,
} from "../lib/schedule";

export function Home() {
  const sameDay = serviceBy("same-day")!;
  const next = nextSlots(sameDay, 4);
  const children = serviceBy("well-child")!;
  const longTerm = serviceBy("long-term")!;
  const now = new Date();

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="row">
            <Link to="/book" className="btn btn-large">
              Book a visit <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn-quiet btn-large">
              Our services
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src={images.hero}
            alt={home.heroAlt}
            width={1800}
            height={1291}
          />
        </figure>
        <div className="next-slots">
          <h2>Next same-day appointments</h2>
          <ul>
            {next.map((s) => (
              <li key={`${s.date}${s.time}${s.clinician}`}>
                <Link
                  to={`/book?service=same-day&clinician=${s.clinician}&location=${s.location}`}
                >
                  <span className="ns-time">
                    {fromIso(s.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}{" "}
                    {fmtTime(s.time)}
                  </span>
                  <span className="ns-who">
                    {clinicianBy(s.clinician)?.name},{" "}
                    {locationBy(s.location)?.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section index">
        <div className="section-head">
          <h2>What brings you in?</h2>
          <p>
            Eight kinds of visit, each with the time it really needs. Pick one
            to see what happens, who you’ll see and what it costs.
          </p>
        </div>
        <ul className="index-list">
          {services.map((s) => (
            <li key={s.slug}>
              <Link to={`/services/${s.slug}`}>
                <span className="index-name">{s.name}</span>
                <span className="index-short">{s.short}</span>
                <span className="index-meta">
                  {s.minutes} min · {s.ages}
                </span>
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="band">
        <div>
          <h2>{home.sameDay.title}</h2>
          <p>{home.sameDay.text}</p>
        </div>
        <div className="row">
          <a href={brand.phoneHref} className="btn">
            <Phone size={18} aria-hidden="true" /> {brand.phone}
          </a>
          <Link to="/book?service=same-day" className="btn btn-quiet">
            Book same-day online
          </Link>
        </div>
      </section>

      <section className="section feature">
        <figure className="feature-figure">
          <img
            src={children.image}
            alt={children.alt}
            loading="lazy"
            width={1600}
            height={1458}
          />
        </figure>
        <div className="feature-text">
          <h2>Children’s care has its own clinic.</h2>
          <p>
            Northfield is built for families: a separate waiting room for
            babies, a garden for the restless, and a paediatric nurse
            practitioner who does nothing but children’s health. Well-child
            checks follow your child from five days old to eighteen.
          </p>
          <p>
            Tuesday mornings, the baby clinic runs as a drop-in — weigh-ins,
            feeding questions and a room of parents who are just as tired as
            you.
          </p>
          <Link to={`/services/${children.slug}`} className="link-arrow">
            Well-child checks <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section feature feature-flip">
        <figure className="feature-figure">
          <img
            src={longTerm.image}
            alt={longTerm.alt}
            loading="lazy"
            width={1800}
            height={1200}
          />
        </figure>
        <div className="feature-text">
          <h2>Diabetes, asthma, blood pressure — with a named team.</h2>
          <p>{longTerm.lede}</p>
          <Link to={`/services/${longTerm.slug}`} className="link-arrow">
            Long-term conditions <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section people">
        <div className="section-head">
          <h2>Eight clinicians. The same faces every time.</h2>
          <p>
            Choose who you see when you register, and keep them. Between them
            they speak eight languages.
          </p>
          <Link to="/clinicians" className="link-arrow">
            Meet everyone <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="badge-row">
          {clinicians.slice(0, 4).map((c) => (
            <ClinicianBadge key={c.slug} clinician={c} />
          ))}
        </div>
      </section>

      <section className="section first-visit">
        <h2>Your first visit, in four steps.</h2>
        <ol className="steps">
          {home.firstVisit.map((s, i) => (
            <li key={s.title}>
              <span className="step-n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <Link to="/patients" className="link-arrow">
          Registering as a new patient{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <section className="section clinics">
        <div className="section-head">
          <h2>Three clinics across Alder Bay.</h2>
          <p>
            Every clinic offers same-day visits and vaccinations. Your record
            follows you, so you can use whichever is nearest that day.
          </p>
        </div>
        <ul className="clinic-list">
          {locations.map((l) => {
            const state = openState(l, now);
            return (
              <li key={l.slug}>
                <h3>{l.name}</h3>
                <p className="clinic-street">
                  {l.street}, {l.area}
                </p>
                <p className="open-state" data-open={state.open || undefined}>
                  {state.text}
                </p>
                <p>{l.note}</p>
                <a href={l.phoneHref}>{l.phone}</a>
              </li>
            );
          })}
        </ul>
        <Link to="/locations" className="link-arrow">
          Hours, map and directions <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <section className="section voices">
        <h2 className="visually-hidden">What patients say</h2>
        <blockquote className="voice-lead">
          <p>“{home.voices[0].quote}”</p>
          <footer>
            {home.voices[0].name}, <span>{home.voices[0].detail}</span>
          </footer>
        </blockquote>
        <div className="voice-pair">
          {home.voices.slice(1).map((v) => (
            <blockquote key={v.name}>
              <p>“{v.quote}”</p>
              <footer>
                {v.name}, <span>{v.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section already">
        <figure>
          <img
            src={images.prescriptions}
            alt="A pharmacist reaches for a box of medicine on a pharmacy shelf"
            loading="lazy"
            width={1800}
            height={1200}
          />
        </figure>
        <div>
          <h2>Already a patient?</h2>
          <dl className="already-list">
            {patients.topics.slice(0, 3).map((t) => (
              <div key={t.title}>
                <dt>{t.title}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
          <Link to="/patients" className="link-arrow">
            All patient information <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="closing">
        <img
          src={images.together}
          alt="A grandfather and his grandson lie on a living-room rug, chins on their hands, deep in conversation"
          loading="lazy"
          width={1600}
          height={900}
        />
        <div className="closing-text">
          <h2>{home.closing.title}</h2>
          <p>{home.closing.text}</p>
          <div className="row">
            <Link to="/book" className="btn btn-large">
              Book an introductory visit
            </Link>
            <a href={brand.phoneHref} className="btn btn-quiet btn-large">
              Call {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
