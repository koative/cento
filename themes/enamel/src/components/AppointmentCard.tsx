import { brand } from "../content";
import { Mark } from "./Logo";

export type Appointment = {
  name: string;
  treatment: string;
  dentist: string;
  date: string;
  time: string;
  reference?: string;
};

/** The printed reminder card every dental patient has in a wallet somewhere. */
export function AppointmentCard({
  a,
  sample,
}: {
  a: Appointment;
  sample?: boolean;
}) {
  return (
    <article
      className="appt-card"
      aria-label={sample ? "Sample appointment card" : "Your appointment card"}
    >
      <header>
        <span className="appt-brand">
          <Mark size={22} />
          {brand.name.toLowerCase()}
        </span>
        {a.reference && <span className="appt-ref tnum">{a.reference}</span>}
      </header>
      <p className="appt-title">Your next appointment</p>
      <dl>
        <div>
          <dt>Patient</dt>
          <dd>{a.name}</dd>
        </div>
        <div>
          <dt>For</dt>
          <dd>{a.treatment}</dd>
        </div>
        <div>
          <dt>With</dt>
          <dd>{a.dentist}</dd>
        </div>
        <div className="appt-when">
          <dt>Date</dt>
          <dd>{a.date}</dd>
        </div>
        <div className="appt-when">
          <dt>Time</dt>
          <dd className="tnum">{a.time}</dd>
        </div>
      </dl>
      <footer>
        {brand.address[0]} · {brand.phone}
        <br />
        Please give 24 hours' notice if you can't make it.
      </footer>
    </article>
  );
}
