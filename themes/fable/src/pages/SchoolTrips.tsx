import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { brand, images, programmes, tripFacts } from "../content";
import { isoLocal, longDate, parseIso } from "../lib/format";
import {
  pause,
  reference,
  useErrors,
  validate,
  type Errors,
} from "../lib/forms";
import { Field } from "../components/Field";

export function SchoolTrips() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [sent, setSent] = useState<{
    ref: string;
    school: string;
    date: string;
  } | null>(null);
  const first = new Date(Date.now() + 14 * 864e5);
  while (first.getDay() < 2 || first.getDay() > 5)
    first.setDate(first.getDate() + 1);
  const earliest = isoLocal(first);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const students = Number(data.get("students"));
    const chaperones = Number(data.get("chaperones"));
    const date = String(data.get("date"));
    const extra: Errors = {};
    if (date && date >= earliest) {
      const day = parseIso(date).getDay();
      if (day < 2 || day > 5)
        extra.date =
          "School visits run Tuesday to Friday. Pick one of those days.";
    }
    if (students >= 10 && chaperones < Math.ceil(students / 6))
      extra.chaperones = `For ${students} students we need at least ${Math.ceil(students / 6)} chaperones (one per six).`;
    const found = validate(
      form,
      {
        school: "Add your school’s name.",
        teacher: "Add the name of the lead teacher.",
        email: "Add a school email like name@school.example so we can confirm.",
        grade: "Choose the grade your students are in.",
        students:
          "Groups are between 10 and 90 students. Enter a number in that range.",
        chaperones: "Enter how many adults are coming, at least 1.",
        date: `Pick a date on or after ${longDate(earliest)}: we need two weeks to prepare.`,
        programme: "Choose a workshop, or self-guided.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(1000);
    setSent({
      ref: reference("SCH"),
      school: String(data.get("school")),
      date,
    });
    setState("idle");
  }

  return (
    <>
      <section className="page-hero page-hero-photo wrap">
        <div>
          <h1>School trips</h1>
          <p className="lede">
            Hands-on workshops for Pre-K to Grade 5, matched to the science
            standards and led by our museum educators. Your class gets the
            galleries, a workshop and a lunchroom.
          </p>
        </div>
        <img
          src={images.school}
          alt="A child slots coloured wooden pegs onto a counting board."
          width={1280}
          height={854}
        />
      </section>

      <section className="section wrap" aria-labelledby="prog-title">
        <h2 id="prog-title">Workshops</h2>
        <ul className="programmes">
          {programmes.map((p) => (
            <li key={p.id}>
              <h3>{p.title}</h3>
              <p className="prog-grade">{p.grade}</p>
              <p>{p.text}</p>
              <p className="prog-meta">
                <span>{p.minutes} min</span> {p.links}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="section band band-paper2"
        aria-labelledby="facts-title"
      >
        <div className="wrap facts">
          <h2 id="facts-title">The practical bit</h2>
          <dl>
            {tripFacts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap enquiry" aria-labelledby="req-title">
        <div className="enquiry-intro">
          <h2 id="req-title">Request a class visit</h2>
          <p>
            Tell us about your group and we’ll confirm a date and workshop
            within three school days. Teachers can visit free beforehand to
            plan.
          </p>
          <p>
            Prefer to talk? Call Priya’s team on{" "}
            <a href={brand.phoneHref}>{brand.phone}</a> or email{" "}
            <a href={`mailto:${brand.groupsEmail}`}>{brand.groupsEmail}</a>.
          </p>
        </div>
        <div aria-live="polite">
          {sent ? (
            <div className="form-done">
              <Check aria-hidden="true" />
              <h3>Request received for {sent.school}</h3>
              <p>
                Reference <strong className="tnum">{sent.ref}</strong>. We’ll
                hold {longDate(sent.date)} for you and confirm by email. This is
                a demo: nothing was sent.
              </p>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => setSent(null)}
              >
                Request another visit
              </button>
            </div>
          ) : (
            <form
              className="form-card"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <div className="field-grid">
                <Field
                  label="School"
                  name="school"
                  required
                  autoComplete="organization"
                  error={errors.school}
                />
                <Field
                  label="Lead teacher"
                  name="teacher"
                  required
                  autoComplete="name"
                  error={errors.teacher}
                />
                <Field
                  label="School email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  error={errors.phone}
                />
                <Field label="Grade" name="grade" error={errors.grade}>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a grade
                    </option>
                    {[
                      "Pre-K",
                      "Kindergarten",
                      "Grade 1",
                      "Grade 2",
                      "Grade 3",
                      "Grade 4",
                      "Grade 5",
                      "Mixed grades",
                    ].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Workshop"
                  name="programme"
                  error={errors.programme}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a workshop
                    </option>
                    {programmes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.grade})
                      </option>
                    ))}
                    <option value="self">Self-guided, no workshop</option>
                  </select>
                </Field>
                <Field
                  label="Students"
                  name="students"
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={90}
                  required
                  error={errors.students}
                  hint="10 to 90"
                />
                <Field
                  label="Chaperones"
                  name="chaperones"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  required
                  error={errors.chaperones}
                  hint="One per six students"
                />
                <Field
                  label="Preferred date"
                  name="date"
                  type="date"
                  min={earliest}
                  required
                  error={errors.date}
                  hint="Tuesday to Friday, two weeks ahead"
                />
              </div>
              <Field
                label="Anything we should know? (optional)"
                name="notes"
                error={errors.notes}
              >
                <textarea
                  rows={4}
                  placeholder="Access needs, allergies, what you are studying in class…"
                />
              </Field>
              <label className="check-line">
                <input type="checkbox" name="titleI" />{" "}
                <span>We are a Title I school (visits are free)</span>
              </label>
              <button
                className="btn btn-coral btn-lg"
                disabled={state === "sending"}
              >
                <Send aria-hidden="true" />{" "}
                {state === "sending" ? "Sending request…" : "Send request"}
              </button>
              <p className="quiet-note">Demo form: nothing is sent anywhere.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
