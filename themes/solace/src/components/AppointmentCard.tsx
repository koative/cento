import { brand, type Clinician, type Location, type Service } from "../content";
import { fmtDay, fmtTime, fromIso, type Slot } from "../lib/schedule";

type Props = {
  service?: Service;
  clinician?: Clinician;
  location?: Location;
  slot?: Slot;
  patient: string;
  /** Booking reference once confirmed. */
  reference?: string;
};

/** The printed appointment card Solace hands over at reception, filled in live as the visit is planned. */
export function AppointmentCard({
  service,
  clinician,
  location,
  slot,
  patient,
  reference,
}: Props) {
  const rows: [string, string | undefined][] = [
    ["Patient", patient.trim() || undefined],
    ["Visit", service && `${service.name}, ${service.minutes} min`],
    ["With", clinician ? clinician.name : "First available clinician"],
    ["Where", location && `${location.name}, ${location.street}`],
    ["Day", slot && fmtDay(fromIso(slot.date))],
    ["Time", slot && fmtTime(slot.time)],
  ];
  return (
    <section
      className="appt-card"
      aria-label="Your appointment card"
      data-confirmed={reference ? "" : undefined}
    >
      <header>
        <svg viewBox="0 0 28 28" aria-hidden="true">
          <rect x="10" y="2" width="8" height="24" rx="2.5" />
          <rect x="2" y="10" width="24" height="8" rx="2.5" />
        </svg>
        <div>
          <p className="appt-brand">{brand.full}</p>
          <p className="appt-kind">Appointment card</p>
        </div>
      </header>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd key={value ?? "blank"} data-blank={value ? undefined : ""}>
              {value ?? <span className="visually-hidden">Not chosen yet</span>}
            </dd>
          </div>
        ))}
      </dl>
      <footer>
        {service && (
          <p>
            Please bring: {service.bring.slice(0, 2).join("; ").toLowerCase()}.
          </p>
        )}
        <p>
          Arrive ten minutes early. To change or cancel, call{" "}
          {location?.phone ?? brand.phone} at least 24 hours ahead.
        </p>
      </footer>
      {reference && (
        <svg className="appt-stamp" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" />
          <circle cx="60" cy="60" r="44" />
          <text x="60" y="58" textAnchor="middle" className="stamp-main">
            Booked
          </text>
          <text x="60" y="76" textAnchor="middle" className="stamp-ref">
            {reference}
          </text>
        </svg>
      )}
    </section>
  );
}
