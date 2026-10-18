import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  NotebookPen,
  Phone,
} from "lucide-react";
import { Link } from "../router";
import {
  app,
  owners,
  stages,
  type ActivityKind,
  type Contact,
} from "../content";
import { logActivity, moveDeal, useWorkspace } from "../lib/store";
import { ago, initials, longDate, money, shortDate } from "../lib/format";
import { Field, useForm } from "../components/form";

const kinds: Record<ActivityKind, { label: string; Icon: typeof Phone }> = {
  call: { label: "Call", Icon: Phone },
  email: { label: "Email", Icon: Mail },
  meeting: { label: "Meeting", Icon: CalendarDays },
  note: { label: "Note", Icon: NotebookPen },
};

function LogActivity({ contact }: { contact: Contact }) {
  const [logged, setLogged] = useState("");
  const form = useForm(
    { kind: "Call", date: app.today, text: "" },
    (v) => ({
      kind: v.kind ? undefined : "Choose what kind of touch this was.",
      date: !v.date
        ? "Pick the date it happened."
        : v.date > app.today
          ? "Log what happened; plan future touches as a next step."
          : undefined,
      text:
        v.text.trim().length < 8
          ? "Write at least a short sentence so a colleague can pick this up."
          : undefined,
    }),
    (v) => {
      const kind = (Object.keys(kinds) as ActivityKind[]).find(
        (k) => kinds[k].label === v.kind,
      )!;
      logActivity(contact.id, {
        kind,
        date: v.date,
        text: v.text.trim(),
        by: app.me,
      });
      setLogged(`${v.kind} logged on ${contact.name}'s timeline.`);
      form.reset();
    },
  );

  return (
    <form
      className="log-form"
      onSubmit={form.submit}
      noValidate
      aria-labelledby="h-log"
    >
      <h3 id="h-log">Log a touch</h3>
      <div className="field-row">
        <Field
          form={form}
          name="kind"
          label="Type"
          options={Object.values(kinds).map((k) => k.label)}
        />
        <Field
          form={form}
          name="date"
          label="Date"
          type="date"
          max={app.today}
          required
        />
      </div>
      <Field
        form={form}
        name="text"
        label="What happened"
        multiline
        placeholder="e.g. Called about the redlines; legal wants a 60-day termination clause."
      />
      <button
        className="btn btn-primary"
        disabled={form.status === "sending"}
        aria-busy={form.status === "sending"}
      >
        {form.status === "sending" ? "Logging…" : "Log it"}
      </button>
      <p className="form-success" role="status">
        {logged}
      </p>
    </form>
  );
}

export default function AppContact({ id }: { id: string }) {
  const { contacts, deals } = useWorkspace();
  const contact = contacts.find((c) => c.id === id)!;
  const owner = owners.find((o) => o.id === contact.owner)!;
  const theirs = deals.filter((d) => d.contactId === contact.id);
  const last = contact.activity[0]?.date;
  const others = contacts
    .filter((c) => c.owner === contact.owner && c.id !== contact.id)
    .slice(0, 4);

  return (
    <div className="app-page">
      <Link to="/app/contacts" className="text-link back">
        <ArrowLeft size={16} aria-hidden /> All contacts
      </Link>
      <header className="contact-head">
        <span className="avatar avatar-xl">{initials(contact.name)}</span>
        <div>
          <h1>{contact.name}</h1>
          <p className="app-sub">
            {contact.title}, {contact.company} · {contact.city}
          </p>
        </div>
        <span className="chip chip-lg" data-status={contact.status}>
          {contact.status}
        </span>
        <div className="contact-actions">
          <a className="btn btn-quiet" href={`mailto:${contact.email}`}>
            <Mail size={16} aria-hidden /> Email
          </a>
          <a
            className="btn btn-quiet"
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
          >
            <Phone size={16} aria-hidden /> Call
          </a>
        </div>
      </header>

      <div className="contact-layout">
        <div className="contact-main">
          <section className="sheet" aria-labelledby="h-deals">
            <h2 id="h-deals">Deals</h2>
            {theirs.length ? (
              <ul className="contact-deals">
                {theirs.map((d) => (
                  <li key={d.id}>
                    <div>
                      <strong>{d.title}</strong>
                      <span className="row-sub">
                        {money(d.value)} · closes {shortDate(d.close)} · next:{" "}
                        {d.next}
                      </span>
                    </div>
                    <div className="field field-inline">
                      <label htmlFor={`stage-${d.id}`}>Stage</label>
                      <select
                        id={`stage-${d.id}`}
                        value={d.stage}
                        onChange={(e) =>
                          moveDeal(d.id, e.target.value as typeof d.stage)
                        }
                      >
                        {stages.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">No deals yet.</p>
            )}
          </section>

          <section className="sheet" aria-labelledby="h-timeline">
            <h2 id="h-timeline">Timeline</h2>
            <LogActivity contact={contact} />
            <ol className="timeline">
              {contact.activity.map((a, i) => {
                const { Icon, label } = kinds[a.kind];
                return (
                  <li key={`${a.date}-${i}-${a.text.length}`}>
                    <span className="timeline-icon">
                      <Icon size={15} aria-hidden />
                    </span>
                    <span className="timeline-date">
                      {label} · {longDate(a.date)} ·{" "}
                      {owners.find((o) => o.id === a.by)?.name}
                    </span>
                    <p>{a.text}</p>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside className="contact-side" aria-label="Contact details">
          <dl className="sheet facts">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{owner.name}</dd>
            </div>
            <div>
              <dt>Last touch</dt>
              <dd>
                {last ? `${shortDate(last)}, ${ago(last, app.today)}` : "Never"}
              </dd>
            </div>
          </dl>
          <nav className="sheet" aria-labelledby="h-others">
            <h2 id="h-others">More of {owner.name.split(" ")[0]}'s contacts</h2>
            <ul className="mini-list">
              {others.map((c) => (
                <li key={c.id}>
                  <Link to={`/app/contacts/${c.id}`}>
                    {c.name} <span className="row-sub">{c.company}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
