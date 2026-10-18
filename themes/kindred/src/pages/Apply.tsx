import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "../router";
import { animals, brand, type Animal } from "../content";
import {
  ageLabel,
  feeFor,
  money,
  pause,
  reference,
  validate,
  type Errors,
} from "../lib/util";
import { Field, FieldError, useErrors } from "../components/Field";
import { TagChip } from "../components/KennelCard";

const stages = ["About you", "Your home", "The match"];

const messages: Record<string, string> = {
  name: "Tell us your full name, as it appears on your ID.",
  email:
    "Enter an email like name@example.com — that's where we'll confirm your meet.",
  phone:
    "Enter a phone number with at least 10 digits so a counsellor can call you.",
  age: "Adopters need to be 21 or over. Tick the box to confirm.",
  street: "Enter your street address.",
  zip: "Enter a 5-digit ZIP code.",
  homeType: "Choose the kind of home you live in.",
  tenure: "Tell us whether you own or rent.",
  landlord:
    "Renters need their landlord's OK. Tick to confirm, and we'll help with the paperwork.",
  adults: "Enter how many adults live with you (at least 1).",
  alone: "Choose roughly how long the home is empty on a weekday.",
  about:
    "Write a few sentences (at least 30 characters) about what you're hoping for.",
  meet: "Pick a date from tomorrow onwards for your first meet.",
  agree:
    "Tick to confirm the details are true — we can't review the application otherwise.",
};

export function Apply({ animal }: { animal?: Animal }) {
  const [stage, setStage] = useState(0);
  const [animalId, setAnimalId] = useState(animal?.id ?? "");
  const [tenure, setTenure] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [ref, setRef] = useState("");
  const [name, setName] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const sets = useRef<(HTMLFieldSetElement | null)[]>([]);
  const top = useRef<HTMLDivElement>(null);
  const chosen = animals.find((a) => a.id === animalId);

  function check(i: number): boolean {
    const set = sets.current[i];
    if (!set) return false;
    const extra: Errors = {};
    const meet = set.querySelector<HTMLInputElement>('input[name="meet"]');
    if (meet?.value && new Date(meet.value + "T12:00").getDay() === 1)
      extra.meet =
        "We're closed on Mondays — pick any other day for your meet.";
    const found = validate(set, messages, extra);
    setErrors(found);
    return Object.keys(found).length === 0;
  }

  function goTo(i: number) {
    setStage(i);
    requestAnimationFrame(() =>
      top.current?.scrollIntoView({ block: "start" }),
    );
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (stage < stages.length - 1) {
      if (check(stage)) goTo(stage + 1);
      return;
    }
    if (!check(stage)) return;
    setName(String(new FormData(e.currentTarget).get("name")).split(" ")[0]);
    setState("sending");
    await pause(1200);
    setRef(reference("KIN"));
    setState("done");
    window.scrollTo({ top: 0 });
  }

  if (state === "done") {
    return (
      <div className="wrap page apply">
        <div className="success" role="status" aria-live="polite">
          <span className="success-mark" aria-hidden="true">
            <Check />
          </span>
          <h1>
            Thank you, {name}. Application {ref} is in.
          </h1>
          <p className="lede">
            {chosen
              ? `${chosen.name} is now marked as pending, so nobody else can apply while we talk.`
              : "We'll match you with animals to meet based on your answers."}{" "}
            Here's what happens next:
          </p>
          <ol className="steps">
            <li>
              <h2>Today</h2>
              <p>
                A copy of your answers lands in your inbox from{" "}
                {brand.adoptEmail}.
              </p>
            </li>
            <li>
              <h2>Within 2 days</h2>
              <p>
                An adoption counsellor calls to talk it through and confirm your
                meet date.
              </p>
            </li>
            <li>
              <h2>The meet</h2>
              <p>
                Bring everyone who lives with you. Allow an hour; there's
                coffee.
              </p>
            </li>
          </ol>
          <p className="demo-note">
            This is a demo — nothing was sent and no animal is actually
            reserved.
          </p>
          <Link to="/animals" className="btn btn-quiet">
            Back to the animals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page apply" ref={top}>
      <header className="page-head">
        <h1>
          {animal ? `Apply to adopt ${animal.name}` : "Adoption application"}
        </h1>
        <p className="lede">
          About fifteen minutes. There are no trick questions — the more
          honestly you answer, the better we can match.
        </p>
      </header>

      <ol className="stepper" aria-label="Application progress">
        {stages.map((s, i) => (
          <li
            key={s}
            data-state={i < stage ? "done" : i === stage ? "now" : undefined}
            aria-current={i === stage ? "step" : undefined}
          >
            <span className="stepper-n">
              {i < stage ? <Check aria-hidden="true" /> : i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <div className="apply-grid">
        <form
          noValidate
          onSubmit={submit}
          onChange={onChange}
          className="form"
          aria-busy={state === "sending"}
        >
          <fieldset
            ref={(el) => void (sets.current[0] = el)}
            hidden={stage !== 0}
          >
            <legend>About you</legend>
            <Field
              label="Full name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
            <div className="form-row">
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[\d\s\(\)\+\.\-]{10,}"
                error={errors.phone}
              />
            </div>
            <div className="form-row">
              <Field
                label="Street address"
                name="street"
                required
                autoComplete="street-address"
                error={errors.street}
              />
              <Field
                label="ZIP code"
                name="zip"
                required
                inputMode="numeric"
                pattern="[0-9]{5}"
                autoComplete="postal-code"
                error={errors.zip}
              />
            </div>
            <div className="field" data-invalid={errors.age ? "" : undefined}>
              <label className="check">
                <input
                  type="checkbox"
                  name="age"
                  required
                  aria-describedby={errors.age ? "f-age-err" : undefined}
                />
                I'm 21 or over and can show photo ID at the meet
              </label>
              <FieldError id="f-age-err" error={errors.age} />
            </div>
          </fieldset>

          <fieldset
            ref={(el) => void (sets.current[1] = el)}
            hidden={stage !== 1}
          >
            <legend>Your home</legend>
            <fieldset
              className="choice"
              data-invalid={errors.homeType ? "" : undefined}
              aria-describedby={errors.homeType ? "f-homeType-err" : undefined}
            >
              <legend>Type of home</legend>
              {["Apartment or condo", "House", "Something else"].map((v) => (
                <label key={v} className="check">
                  <input type="radio" name="homeType" value={v} required /> {v}
                </label>
              ))}
              <FieldError id="f-homeType-err" error={errors.homeType} />
            </fieldset>
            <fieldset
              className="choice"
              data-invalid={errors.tenure ? "" : undefined}
              aria-describedby={errors.tenure ? "f-tenure-err" : undefined}
            >
              <legend>Do you own or rent?</legend>
              {["Own", "Rent"].map((v) => (
                <label key={v} className="check">
                  <input
                    type="radio"
                    name="tenure"
                    value={v}
                    required
                    onChange={() => setTenure(v)}
                  />{" "}
                  {v}
                </label>
              ))}
              <FieldError id="f-tenure-err" error={errors.tenure} />
            </fieldset>
            {tenure === "Rent" && (
              <div
                className="field"
                data-invalid={errors.landlord ? "" : undefined}
              >
                <label className="check">
                  <input
                    type="checkbox"
                    name="landlord"
                    required
                    aria-describedby={
                      errors.landlord ? "f-landlord-err" : undefined
                    }
                  />
                  My lease allows pets, or my landlord has agreed in writing
                </label>
                <FieldError id="f-landlord-err" error={errors.landlord} />
              </div>
            )}
            <div className="form-row">
              <Field
                label="Adults in the home"
                name="adults"
                type="number"
                min={1}
                max={12}
                defaultValue={1}
                required
                error={errors.adults}
              />
              <Field
                label="Children's ages"
                name="kids"
                hint="Leave blank if none"
                placeholder="e.g. 4 and 9"
              />
            </div>
            <Field
              label="On a weekday, the home is empty for"
              name="alone"
              error={errors.alone}
            >
              <select required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>Hardly ever</option>
                <option>Up to 4 hours</option>
                <option>4 to 6 hours</option>
                <option>More than 6 hours</option>
              </select>
            </Field>
            <Field
              label="Other animals at home"
              name="pets"
              hint="Species, age, and whether they've lived with others before"
            >
              <textarea rows={3} />
            </Field>
          </fieldset>

          <fieldset
            ref={(el) => void (sets.current[2] = el)}
            hidden={stage !== 2}
          >
            <legend>The match</legend>
            <Field label="Who would you like to meet?" name="animal">
              <select
                value={animalId}
                onChange={(e) => setAnimalId(e.target.value)}
              >
                <option value="">Not sure yet — help me choose</option>
                {animals.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.breed}, {ageLabel(a.ageMonths)})
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="What are you hoping for?"
              name="about"
              hint="Your routine, what drew you to them, what worries you"
              error={errors.about}
            >
              <textarea rows={5} required minLength={30} />
            </Field>
            <Field
              label="Preferred date for a first meet"
              name="meet"
              type="date"
              required
              min={new Date(Date.now() + 86_400_000).toISOString().slice(0, 10)}
              hint="Open Tuesday to Sunday"
              error={errors.meet}
            />
            <div className="field" data-invalid={errors.agree ? "" : undefined}>
              <label className="check">
                <input
                  type="checkbox"
                  name="agree"
                  required
                  aria-describedby={errors.agree ? "f-agree-err" : undefined}
                />
                The details above are true, and I'm happy for Kindred to call me
                about them
              </label>
              <FieldError id="f-agree-err" error={errors.agree} />
            </div>
          </fieldset>

          <div className="form-nav">
            {stage > 0 && (
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => (setErrors({}), goTo(stage - 1))}
              >
                <ArrowLeft aria-hidden="true" /> Back
              </button>
            )}
            <button className="btn btn-primary" disabled={state === "sending"}>
              {state === "sending" ? (
                <>
                  <LoaderCircle className="spin" aria-hidden="true" /> Sending
                  application…
                </>
              ) : stage < stages.length - 1 ? (
                <>
                  Continue to {stages[stage + 1].toLowerCase()}{" "}
                  <ArrowRight aria-hidden="true" />
                </>
              ) : (
                "Send application"
              )}
            </button>
          </div>
          <p className="demo-note">
            Demo form: nothing you type is sent or stored.
          </p>
          <p className="sr-only" aria-live="polite">
            {state === "sending"
              ? "Sending your application."
              : `Step ${stage + 1} of ${stages.length}: ${stages[stage]}.`}
          </p>
        </form>

        <aside className="apply-aside" aria-label="Your match">
          {chosen ? (
            <div className="mini-kennel" data-tag={chosen.tag}>
              <img
                src={chosen.photo}
                alt={chosen.alt}
                width={480}
                height={360}
                style={
                  chosen.focus ? { objectPosition: chosen.focus } : undefined
                }
              />
              <p className="mini-kennel-name">{chosen.name}</p>
              <p className="kcard-meta">
                {chosen.sex} · {ageLabel(chosen.ageMonths)} · Kennel{" "}
                {chosen.kennel}
              </p>
              <TagChip animal={chosen} />
              <p>
                Adoption fee{" "}
                <strong className="num">{money(feeFor(chosen))}</strong>, due on
                the day you take {chosen.name} home.
              </p>
            </div>
          ) : (
            <div className="mini-kennel">
              <p className="mini-kennel-name">Not sure yet?</p>
              <p>
                That's fine — about a third of applicants are. Tell us about
                your life and we'll suggest who to meet, or try the{" "}
                <Link to="/match">matching quiz</Link> first.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
