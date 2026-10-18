import { pricing } from "../content";
import { FeesCalculator } from "../components/FeesCalculator";
import { TourCta } from "../components/TourCta";
import { money } from "../lib/fees";

export function Fees() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Fees calculator</h1>
          <p className="lede">
            Choose a room, then a session for each day. Every day can be
            different. The slip on the right adds it up, takes off any pre-K
            credit or sibling discount, and shows you the monthly bill.
          </p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="wrap">
          <FeesCalculator />
        </div>
      </section>
      <section className="section section-oat">
        <div className="wrap split">
          <div className="split-head">
            <h2>How billing works</h2>
            <p>No surprises: one invoice a month, through Nest Notes.</p>
          </div>
          <dl className="policy-list">
            {pricing.notes.map((n) => (
              <div key={n.title}>
                <dt>{n.title}</dt>
                <dd>{n.text}</dd>
              </div>
            ))}
            <div>
              <dt>Registration</dt>
              <dd>
                A one-off{" "}
                <span className="num">{money(pricing.registration)}</span> when
                you accept a place, plus a deposit of {pricing.deposit}.
              </dd>
            </div>
            <div>
              <dt>Holiday club</dt>
              <dd>
                Swifts holiday club days are{" "}
                <span className="num">{money(pricing.holidayDay)}</span>, booked
                per day in Nest Notes.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <TourCta title="Numbers look right? Come and see the rooms." />
    </>
  );
}
