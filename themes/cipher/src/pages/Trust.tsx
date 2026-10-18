import { CircleCheck, Mail } from "lucide-react";
import { brand, trust } from "../content";
import { UptimeBars } from "../components/Charts";
import { Faq } from "../components/bits";
import { EMAIL, Field, useForm } from "../components/form";

export default function Trust() {
  const form = useForm({ email: "", company: "", docs: "", nda: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter your work email so we know where to send the documents."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete. Check it has a name, an @ and a domain."
        : undefined,
    company:
      v.company.trim().length < 2
        ? "Enter your company name; reports are watermarked with it."
        : undefined,
    docs: !v.docs ? "Choose at least one document." : undefined,
    nda:
      v.docs.includes("SOC 2") || v.docs.includes("Penetration")
        ? v.nda
          ? undefined
          : "The SOC 2 report and pen test summary need the click-through NDA."
        : undefined,
  }));
  const picked = form.values.docs ? form.values.docs.split("|") : [];
  const toggle = (d: string) =>
    form.set(
      "docs",
      (picked.includes(d)
        ? picked.filter((x) => x !== d)
        : [...picked, d]
      ).join("|"),
    );

  return (
    <>
      <header className="page-head wrap">
        <h1>{trust.heading}</h1>
        <p className="lede">{trust.lede}</p>
      </header>

      <section className="wrap status-panel" aria-labelledby="status-title">
        <div className="status-top">
          <h2 id="status-title">
            <CircleCheck size={22} aria-hidden /> {trust.status.label}
          </h2>
          <p className="num">
            {trust.status.uptime} uptime · {trust.status.window}
          </p>
        </div>
        <UptimeBars
          days={trust.uptime}
          summary={`${trust.status.uptime} uptime over the last 90 days, with three partial days`}
        />
        <div className="status-scale" aria-hidden>
          <span>90 days ago</span>
          <span>Today</span>
        </div>
        <ul className="incidents">
          {trust.incidents.map((i) => (
            <li key={i.date}>
              <p className="num quiet small">{i.date}</p>
              <h3>{i.title}</h3>
              <p>{i.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap certs" aria-labelledby="certs-title">
        <h2 id="certs-title">Reports and certifications</h2>
        <ul className="cert-rows">
          {trust.certifications.map((c) => (
            <li key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.detail}</p>
              <span className="pill">{c.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap docs-request" aria-labelledby="docs-title">
        <div>
          <h2 id="docs-title">Request documents</h2>
          <p>
            Public documents arrive straight away. Reports under NDA are sent
            within one business day, watermarked with your company name.
          </p>
          <p className="quiet small">Demo form: nothing is sent anywhere.</p>
        </div>
        <div className="form-panel">
          {form.status === "done" ? (
            <div className="form-success-block" role="status">
              <h3>Request logged</h3>
              <p>
                {picked.length} document{picked.length === 1 ? "" : "s"} for{" "}
                {form.values.company}. In a live trust center they would arrive
                at {form.values.email} within one business day.
              </p>
              <button className="btn btn-quiet" onClick={form.reset}>
                Request something else
              </button>
            </div>
          ) : (
            <form onSubmit={form.submit} noValidate>
              <fieldset
                className="check-group"
                aria-describedby={form.errors.docs ? "docs-err" : undefined}
              >
                <legend>Documents</legend>
                {trust.documents.map((d, i) => (
                  <label key={d}>
                    <input
                      type="checkbox"
                      name={i === 0 ? "docs" : undefined}
                      checked={picked.includes(d)}
                      onChange={() => toggle(d)}
                    />
                    {d}
                  </label>
                ))}
                {form.errors.docs && (
                  <p className="field-error" id="docs-err">
                    {form.errors.docs}
                  </p>
                )}
              </fieldset>
              <div className="field-row">
                <Field
                  form={form}
                  name="email"
                  label="Work email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field
                  form={form}
                  name="company"
                  label="Company"
                  autoComplete="organization"
                  required
                />
              </div>
              <Field
                form={form}
                name="nda"
                type="checkbox"
                label="I accept the mutual NDA for reports marked “under NDA”."
              />
              <button
                className="btn btn-primary"
                disabled={form.status === "sending"}
              >
                {form.status === "sending"
                  ? "Sending request…"
                  : "Request documents"}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="wrap practices" aria-labelledby="practices-title">
        <h2 id="practices-title">How we protect your data</h2>
        <dl>
          {trust.practices.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap" aria-labelledby="sub-title">
        <h2 id="sub-title">Subprocessors</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Purpose</th>
                <th scope="col">Data location</th>
              </tr>
            </thead>
            <tbody>
              {trust.subprocessors.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.purpose}</td>
                  <td>{s.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="quiet small">
          Changes are announced to customers 30 days before a new subprocessor
          starts.
        </p>
      </section>

      <section className="wrap disclosure" aria-labelledby="vd-title">
        <h2 id="vd-title">Vulnerability disclosure</h2>
        <p>{trust.disclosure}</p>
        <a className="btn btn-quiet" href={`mailto:${brand.security}`}>
          <Mail size={16} aria-hidden /> {brand.security}
        </a>
      </section>

      <section className="faq-section wrap" aria-labelledby="tfaq-title">
        <h2 id="tfaq-title">Security questions</h2>
        <Faq items={trust.faq} />
      </section>
    </>
  );
}
