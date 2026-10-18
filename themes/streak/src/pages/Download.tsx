import { download } from "../content";
import { formatDate } from "../lib/format";
import { EMAIL, Field, useForm } from "../components/form";
import { Phone } from "../components/Phone";
import { StoreButtons } from "../components/Parts";

export default function Download() {
  const form = useForm({ email: "", platform: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter the email you read on your phone."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete. Check it has a name, an @ and a domain."
        : undefined,
    platform: v.platform
      ? undefined
      : "Choose iPhone or Android so we send the right link.",
  }));

  return (
    <div className="page">
      <section className="download-hero wrap">
        <div>
          <h1>{download.hero.title}</h1>
          <p className="lede">{download.hero.lede}</p>
          <StoreButtons />

          <div className="send-link">
            <h2>On a computer right now?</h2>
            <p>
              We'll email you a link that opens the right store on your phone.
            </p>
            {form.status !== "done" ? (
              <form onSubmit={form.submit} noValidate className="inline-form">
                <Field
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field
                  form={form}
                  name="platform"
                  label="Phone"
                  options={["iPhone", "Android"]}
                  required
                />
                <button
                  className="btn btn-primary"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending" ? "Sending…" : "Email me the link"}
                </button>
              </form>
            ) : (
              <button
                type="button"
                className="btn btn-quiet btn-small"
                onClick={form.reset}
              >
                Send to another address
              </button>
            )}
            <p
              className={form.status === "done" ? "form-success" : "quiet-note"}
              role="status"
            >
              {form.status === "done"
                ? `Sent. Open the email on your ${form.values.platform} and tap the link to install Streak.`
                : "Demo form: nothing is sent anywhere."}
            </p>
          </div>
        </div>
        <div className="download-stage">
          <Phone
            screen="lock"
            label="Streak's lock-screen chain widget and a morning reminder"
          />
        </div>
      </section>

      <section className="reqs wrap" aria-labelledby="req-title">
        <h2 id="req-title">Requirements</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="req-title"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Device</th>
                <th scope="col">Needs</th>
                <th scope="col">Size</th>
              </tr>
            </thead>
            <tbody>
              {download.requirements.map(([d, n, s]) => (
                <tr key={d}>
                  <th scope="row">{d}</th>
                  <td>{n}</td>
                  <td>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="quiet-note">Available in {download.languages}</p>
      </section>

      <section className="releases wrap" aria-labelledby="rel-title">
        <h2 id="rel-title">What's new</h2>
        <ol>
          {download.releases.map((r) => (
            <li key={r.version}>
              <p className="rel-head">
                <strong>Version {r.version}</strong>
                <time dateTime={r.date}>{formatDate(r.date)}</time>
              </p>
              <ul>
                {r.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
