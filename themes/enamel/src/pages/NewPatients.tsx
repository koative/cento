import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  bring,
  comfortMenu,
  firstVisit,
  images,
  newPatientFaqs,
  policies,
} from "../content";
import { Faq } from "../components/Faq";

export function NewPatients() {
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>New patients</h1>
        <p className="lede">
          We're taking new patients of every age. Most are seen within eight
          working days; emergencies the same day. Here's exactly what to expect.
        </p>
        <Link to="/book?t=check-up" className="btn btn-primary">
          Book a first check-up <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className="wrap first-visit" aria-labelledby="fv-h">
        <h2 id="fv-h">The first hour</h2>
        <ol className="timeline">
          {firstVisit.map((s) => (
            <li key={s.title}>
              <span className="tl-at tnum">{s.at}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap np-split" aria-labelledby="bring-h">
        <div>
          <h2 id="bring-h">What to bring</h2>
          <ul className="ticks">
            {bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <img
          src={images.model}
          alt="A stone model of a lower jaw on a lab articulator"
          width={1024}
          height={590}
          loading="lazy"
        />
      </section>

      <section className="band band-gum" aria-labelledby="comfort-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="comfort-h">The comfort menu</h2>
            <p>
              Ask for any of these when you book or on the day. None of them
              cost extra.
            </p>
          </div>
          <dl className="comfort-list comfort-cols">
            {comfortMenu.map((c) => (
              <div key={c.title}>
                <dt>{c.title}</dt>
                <dd>{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap np-split" aria-labelledby="pol-h">
        <div>
          <h2 id="pol-h">The small print, in large print</h2>
          <dl className="policy-list">
            {policies.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
          <p>
            Children are welcome from their first tooth — see{" "}
            <Link to="/treatments/children">children's check-ups</Link>.
          </p>
        </div>
        <div>
          <h2>Questions</h2>
          <Faq items={newPatientFaqs} />
        </div>
      </section>
    </div>
  );
}
