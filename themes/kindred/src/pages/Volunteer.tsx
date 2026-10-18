import { useState, type FormEvent } from "react";
import { CalendarDays, Check, LoaderCircle } from "lucide-react";
import { home, volunteer } from "../content";
import { pause, validate, type Errors } from "../lib/util";
import { Field, FieldError, useErrors } from "../components/Field";

const messages: Record<string, string> = {
  vname: "Tell us your name.",
  vemail:
    "Enter an email like name@example.com so we can send orientation details.",
  role: "Choose the role you'd like to start with — you can change later.",
  orientation:
    "Pick an orientation session; everyone does one before their first shift.",
  adult: "Tick to confirm you meet the minimum age for the role.",
};

export function Volunteer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [summary, setSummary] = useState({ name: "", role: "", date: "" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = data.getAll("when").length
      ? {}
      : { when: "Tick at least one time you could usually come in." };
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    setSummary({
      name: String(data.get("vname")).split(" ")[0],
      role: volunteer.roles.find((r) => r.id === data.get("role"))?.title ?? "",
      date: String(data.get("orientation")),
    });
    setState("done");
  }

  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>Volunteer & foster</h1>
        <p className="lede">{volunteer.intro}</p>
      </header>

      <section className="wrap section" aria-labelledby="roles-h">
        <h2 id="roles-h">Roles we're recruiting for</h2>
        <div className="table-scroll">
          <table className="roles">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">What you'll do</th>
                <th scope="col">Time</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {volunteer.roles.map((r) => (
                <tr key={r.id}>
                  <th scope="row">{r.title}</th>
                  <td>{r.what}</td>
                  <td>{r.commitment}</td>
                  <td>{r.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band band-marigold" aria-labelledby="foster-h">
        <div className="wrap foster">
          <img
            src={home.foster.photo}
            alt={home.foster.alt}
            width={1024}
            height={768}
            loading="lazy"
          />
          <div>
            <h2 id="foster-h">
              Fostering: the most useful spare room in Millbrook
            </h2>
            <p>{volunteer.fosterText}</p>
            <p>{home.foster.text}</p>
          </div>
        </div>
      </section>

      <section className="wrap section signup" aria-labelledby="signup-h">
        <div>
          <h2 id="signup-h">Sign up for an orientation</h2>
          <p>
            Orientations run twice a month at the shelter and last two hours: a
            tour, the safety talk, and your first supervised half-hour with the
            animals.
          </p>
          <ul className="dates">
            {volunteer.orientations.map((o) => (
              <li key={o.date}>
                <CalendarDays aria-hidden="true" />
                <span>{o.date}</span>
                <span className="num">{o.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {state === "done" ? (
          <div className="success" role="status">
            <span className="success-mark" aria-hidden="true">
              <Check />
            </span>
            <h3>
              See you on {summary.date}, {summary.name}.
            </h3>
            <p>
              You're booked in to start as a {summary.role.toLowerCase()}.
              Grace, our volunteer manager, will email the details and a short
              reading list. Wear closed-toe shoes.
            </p>
            <p className="demo-note">Demo form — nothing was sent.</p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form form-card"
            aria-busy={state === "sending"}
          >
            <div className="form-row">
              <Field
                label="Your name"
                name="vname"
                required
                autoComplete="name"
                error={errors.vname}
              />
              <Field
                label="Email"
                name="vemail"
                type="email"
                required
                autoComplete="email"
                error={errors.vemail}
              />
            </div>
            <Field label="Role to start with" name="role" error={errors.role}>
              <select required defaultValue="">
                <option value="" disabled>
                  Choose a role
                </option>
                {volunteer.roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.age})
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Orientation session"
              name="orientation"
              error={errors.orientation}
            >
              <select required defaultValue="">
                <option value="" disabled>
                  Choose a date
                </option>
                {volunteer.orientations.map((o) => (
                  <option key={o.date} value={o.date}>
                    {o.date}, {o.time}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset
              className="choice"
              data-invalid={errors.when ? "" : undefined}
              aria-describedby={errors.when ? "f-when-err" : undefined}
            >
              <legend>When could you usually come in?</legend>
              <div className="check-grid">
                {volunteer.availability.map((a) => (
                  <label key={a} className="check">
                    <input
                      type="checkbox"
                      name="when"
                      value={a}
                      onChange={() =>
                        errors.when && setErrors(({ when: _, ...rest }) => rest)
                      }
                    />{" "}
                    {a}
                  </label>
                ))}
              </div>
              <FieldError id="f-when-err" error={errors.when} />
            </fieldset>
            <div className="field" data-invalid={errors.adult ? "" : undefined}>
              <label className="check">
                <input
                  type="checkbox"
                  name="adult"
                  required
                  aria-describedby={errors.adult ? "f-adult-err" : undefined}
                />
                I meet the minimum age for this role
              </label>
              <FieldError id="f-adult-err" error={errors.adult} />
            </div>
            <button className="btn btn-primary" disabled={state === "sending"}>
              {state === "sending" ? (
                <>
                  <LoaderCircle className="spin" aria-hidden="true" /> Booking
                  your place…
                </>
              ) : (
                "Book my orientation"
              )}
            </button>
            <p className="demo-note">
              Demo form: nothing you type is sent or stored.
            </p>
          </form>
        )}
        <p className="sr-only" aria-live="polite">
          {state === "done" ? `Orientation booked for ${summary.date}.` : ""}
        </p>
      </section>
    </div>
  );
}
