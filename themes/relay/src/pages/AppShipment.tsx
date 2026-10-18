import { useState, type FormEvent } from "react";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Link } from "../router";
import { app, DEMO_NOW, services } from "../content";
import { addNote, resolveException, useApp } from "../lib/store";
import { hub } from "../lib/geo";
import { eur, eurCents, num, when } from "../lib/format";
import { mapShare, schedule, timeline } from "../lib/shipment";
import { NetworkMap } from "../components/NetworkMap";
import { ScanLog, StatusPill, Waybill } from "../components/Waybill";

const actions = [
  "Re-delivery booked with the consignee",
  "Corrected documents uploaded",
  "Return to sender requested",
];

export default function AppShipment({ id }: { id: string }) {
  const { shipments, notes, resolved } = useApp();
  const s = shipments.find((x) => x.id === id)!;
  const [action, setAction] = useState(actions[0]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const from = hub(s.route[0]);
  const to = hub(s.route[s.route.length - 1]);
  const { distance } = schedule(s);
  const service = services.find((x) => x.slug === s.service);
  const thread = notes[s.id] ?? [];
  const fuel = s.cost * 0.12;

  function post(e: FormEvent) {
    e.preventDefault();
    if (text.trim().length < 3)
      return setError(
        "Write at least a few words so the control tower knows what you need.",
      );
    addNote(s.id, { at: DEMO_NOW, author: app.user.name, text: text.trim() });
    setText("");
    setError("");
  }

  return (
    <div className="app-page">
      <Link to="/app/shipments" className="back-link">
        <ArrowLeft size={16} aria-hidden /> Shipments
      </Link>
      <header className="app-head">
        <div>
          <div className="track-title">
            <h1 className="num-display">{s.id}</h1>
            <StatusPill status={s.status} />
          </div>
          <p className="muted">
            {s.customer} · {s.ref} · {from.city} → {to.city} · {service?.name}
          </p>
        </div>
        <Link to={`/track/${s.id}`} className="btn btn-ghost">
          Public tracking page <ExternalLink size={16} aria-hidden />
        </Link>
      </header>

      {s.status === "Exception" && s.exception && (
        <section className="alert" aria-labelledby="exc-h">
          <h2 id="exc-h">Exception</h2>
          <p>{s.exception}</p>
          <form
            className="resolve"
            onSubmit={(e) => {
              e.preventDefault();
              resolveException(s.id, action);
            }}
          >
            <div className="field">
              <label htmlFor="resolve-action">Resolution</label>
              <select
                id="resolve-action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                {actions.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Mark as resolved</button>
          </form>
        </section>
      )}
      <p
        aria-live="polite"
        className={resolved[s.id] ? "notice is-ok" : "notice"}
      >
        {resolved[s.id]
          ? `Exception resolved: ${resolved[s.id]}. Status set back to In transit.`
          : ""}
      </p>

      <div className="app-grid">
        <section className="panel span-2 map-panel" aria-label="Route">
          <NetworkMap
            route={s.route}
            share={mapShare(s)}
            labels="route"
            label={`Route of ${s.id} from ${from.city} to ${to.city}`}
          />
        </section>
        <section className="panel" aria-label="Consignment">
          <Waybill s={s} />
        </section>

        <section className="panel span-2" aria-labelledby="scan-h">
          <h2 id="scan-h">Scan history</h2>
          <ScanLog events={timeline(s)} />
        </section>

        <div className="stack-col">
          <section className="panel" aria-labelledby="cost-h">
            <h2 id="cost-h">Charges</h2>
            <table className="rate-lines">
              <tbody>
                <tr>
                  <th scope="row">Linehaul, {num(distance)} km</th>
                  <td className="num">{eurCents(s.cost - fuel)}</td>
                </tr>
                <tr>
                  <th scope="row">Fuel surcharge</th>
                  <td className="num">{eurCents(fuel)}</td>
                </tr>
                <tr className="rate-sum">
                  <th scope="row">Total excl. VAT</th>
                  <td className="num">{eur(s.cost)}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="panel" aria-labelledby="doc-h">
            <h2 id="doc-h">Documents</h2>
            <ul className="doc-list">
              <li>
                <FileText size={18} aria-hidden />
                <span>
                  {s.mode === "air"
                    ? "Air waybill"
                    : s.mode === "sea"
                      ? "Sea waybill"
                      : "eCMR"}
                </span>
              </li>
              <li>
                <FileText size={18} aria-hidden />
                <span>Booking confirmation</span>
              </li>
              {s.status === "Delivered" && (
                <li>
                  <FileText size={18} aria-hidden />
                  <span>POD, signed {s.pod}</span>
                </li>
              )}
            </ul>
          </section>
        </div>

        <section className="panel span-3" aria-labelledby="notes-h">
          <h2 id="notes-h">Notes to the control tower</h2>
          {thread.length ? (
            <ul className="thread-list">
              {thread.map((n, i) => (
                <li key={i}>
                  <span className="avatar alt" aria-hidden>
                    {app.user.initials}
                  </span>
                  <p>
                    <strong>
                      {n.author} ·{" "}
                      <span className="num">{when(new Date(n.at))}</span>
                    </strong>
                    {n.text}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              No notes yet. The control tower replies here within 15 minutes,
              day and night.
            </p>
          )}
          <form onSubmit={post} className="note-form" noValidate>
            <div className="field">
              <label htmlFor="note">Add a note</label>
              <textarea
                id="note"
                rows={3}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError("");
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "note-err" : undefined}
                placeholder="e.g. Please call the consignee 30 minutes before arrival."
              />
              <p className="field-error" id="note-err" aria-live="polite">
                {error}
              </p>
            </div>
            <button className="btn btn-primary">Post note</button>
          </form>
        </section>
      </div>
    </div>
  );
}
