import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { alerts, alertTopics, type Alert } from "../content";
import { AlertRow } from "../components/AlertRow";
import { Field, validate, type Errors } from "../components/Field";
import { PageHead } from "../components/PageHead";

export function Alerts() {
  const [topic, setTopic] = useState<Alert["topic"] | "All">("All");
  const list = alerts.filter((a) => topic === "All" || a.topic === topic);

  return (
    <>
      <PageHead
        title="Alerts & closures"
        lede="Water advisories, road closures, collection changes and park closures — updated by the departments as things change."
      />
      <div className="wrap alerts-layout">
        <div>
          <fieldset className="chip-set chip-row">
            <legend className="visually-hidden">Filter by topic</legend>
            {(["All", ...alertTopics] as const).map((t) => (
              <label key={t} className="chip">
                <input
                  type="radio"
                  name="alert-topic"
                  checked={topic === t}
                  onChange={() => setTopic(t)}
                />
                {t}{" "}
                <span className="chip-n">
                  {t === "All"
                    ? alerts.length
                    : alerts.filter((a) => a.topic === t).length}
                </span>
              </label>
            ))}
          </fieldset>
          <ul className="alert-list" aria-live="polite">
            {list.map((a) => (
              <AlertRow key={a.id} alert={a} />
            ))}
          </ul>
        </div>
        <Signup />
      </div>
    </>
  );
}

function Signup() {
  const [channel, setChannel] = useState<"email" | "text">("email");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ to: string; topics: string[] } | null>(
    null,
  );

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      contact:
        channel === "email"
          ? {
              missing: "Enter the email address for alerts.",
              invalid:
                "Check the email — it needs an @ and a domain, like name@example.com.",
            }
          : {
              missing: "Enter a mobile number for text alerts.",
              invalid: "Use a 10-digit US mobile number, like 555 014 2290.",
            },
    });
    const topics = alertTopics.filter(
      (t) =>
        (form.elements.namedItem(`topic-${t}`) as HTMLInputElement).checked,
    );
    if (!topics.length)
      found.topics =
        "Choose at least one topic, or we would have nothing to send you.";
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const to = (form.elements.namedItem("contact") as HTMLInputElement).value;
    window.setTimeout(() => {
      setBusy(false);
      setDone({ to, topics });
    }, 800);
  }

  return (
    <aside className="signup aside-card" aria-labelledby="signup-title">
      <h2 id="signup-title">Get alerts</h2>
      <p>
        Only the topics you choose. Urgent water and weather alerts arrive
        within minutes.
      </p>
      <div aria-live="polite">
        {done && (
          <div className="success">
            <Check size={22} aria-hidden="true" />
            <p>
              <strong>You're signed up.</strong> {done.topics.join(", ")} alerts
              will go to {done.to}. Reply STOP to any message to unsubscribe.
            </p>
          </div>
        )}
      </div>
      {!done && (
        <form onSubmit={submit} noValidate>
          <fieldset className="chip-set">
            <legend>Send alerts by</legend>
            <label className="chip">
              <input
                type="radio"
                name="channel"
                checked={channel === "email"}
                onChange={() => setChannel("email")}
              />{" "}
              Email
            </label>
            <label className="chip">
              <input
                type="radio"
                name="channel"
                checked={channel === "text"}
                onChange={() => setChannel("text")}
              />{" "}
              Text message
            </label>
          </fieldset>
          <Field
            key={channel}
            label={channel === "email" ? "Email address" : "Mobile number"}
            name="contact"
            type={channel === "email" ? "email" : "tel"}
            pattern={
              channel === "text"
                ? "\\D*\\d{3}\\D*\\d{3}\\D*\\d{4}\\D*"
                : undefined
            }
            autoComplete={channel === "email" ? "email" : "tel"}
            required
            error={errors.contact}
          />
          <fieldset
            className="check-set"
            aria-describedby={errors.topics ? "topics-error" : undefined}
          >
            <legend>Topics</legend>
            {alertTopics.map((t) => (
              <label key={t} className="check">
                <input
                  type="checkbox"
                  name={`topic-${t}`}
                  defaultChecked={t === "Water" || t === "Weather"}
                />{" "}
                {t}
              </label>
            ))}
            {errors.topics && (
              <p className="field-error" id="topics-error">
                {errors.topics}
              </p>
            )}
          </fieldset>
          <button
            className="btn btn-citron btn-block"
            disabled={busy}
            aria-busy={busy}
          >
            {busy ? "Signing you up…" : "Sign up for alerts"}
          </button>
          <p className="quiet-note">Demo form: nothing is sent.</p>
        </form>
      )}
    </aside>
  );
}
