import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Construction,
  Droplets,
  Lightbulb,
  MessageSquare,
  Signpost,
  SprayCan,
  Trash2,
  TreeDeciduous,
  type LucideIcon,
} from "lucide-react";
import {
  issueTypes,
  stages,
  type IssueType,
  type Report as Filed,
} from "../content";
import { allReports, fileReport, findReport } from "../lib/reports";
import { councillorFor, nearestCorner, shortDate, wardAt } from "../lib/city";
import { CityMap } from "../components/CityMap";
import { Area, Field, validate, type Errors } from "../components/Field";
import { PageHead } from "../components/PageHead";
import { Stages } from "../components/Stages";

const icons: Record<IssueType, LucideIcon> = {
  pothole: Construction,
  streetlight: Lightbulb,
  missed: Trash2,
  graffiti: SprayCan,
  tree: TreeDeciduous,
  drain: Droplets,
  sign: Signpost,
  other: MessageSquare,
};

const labelOf = (t: IssueType) => issueTypes.find((x) => x.id === t)!;

function initialType(): IssueType {
  const want = new URLSearchParams(window.location.hash.split("?")[1]).get(
    "type",
  );
  return issueTypes.find((t) => t.id === want)?.id ?? "pothole";
}

export function Report() {
  const [type, setType] = useState<IssueType>(initialType);
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const [updates, setUpdates] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ report: Filed; joined: boolean } | null>(
    null,
  );

  const open = allReports().filter((r) => r.stage < stages.length - 1);
  const nearby =
    pin &&
    open.find(
      (r) => r.type === type && Math.hypot(r.x - pin.x, r.y - pin.y) < 70,
    );
  const ward = pin && wardAt(pin.x, pin.y);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      details: {
        missing:
          "Describe the problem in a sentence, e.g. “Deep pothole in the bike lane outside number 240”.",
        invalid: "Add a little more detail — at least 10 characters.",
      },
      ...(updates
        ? {
            email: {
              missing:
                "Enter an email for updates, or untick “Send me updates”.",
              invalid:
                "Check the email — it needs an @ and a domain, like name@example.com.",
            },
          }
        : {}),
    });
    if (!pin) {
      found.pin =
        "Place the pin on the map where the problem is — tap the map or focus it and use the arrow keys.";
      document.querySelector<HTMLElement>("#pin-map .city-map")?.focus();
    }
    setErrors(found);
    if (Object.keys(found).length || !pin) return;
    setBusy(true);
    window.setTimeout(() => {
      setDone({
        report: fileReport({
          type,
          x: pin.x,
          y: pin.y,
          filed: new Date().toISOString().slice(0, 10),
        }),
        joined: false,
      });
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  }

  function reset() {
    setDone(null);
    setPin(null);
    setErrors({});
  }

  return (
    <>
      <PageHead
        title="Report an issue"
        lede="Potholes, dark streetlights, missed pickups, graffiti, fallen branches. Tell us where and what — the right crew gets it straight away."
      />
      <div className="wrap report-layout">
        <div aria-live="polite" className="report-live">
          {done && (
            <section className="report-done" aria-labelledby="done-title">
              <Check size={28} aria-hidden="true" className="done-icon" />
              <h2 id="done-title">
                {done.joined
                  ? "Added to an existing report"
                  : "Report received"}
              </h2>
              <p className="ref-plate plate">{done.report.ref}</p>
              <p>
                {labelOf(done.report.type).label} near{" "}
                {nearestCorner(done.report.x, done.report.y)}, Ward{" "}
                {wardAt(done.report.x, done.report.y)}. Sent to{" "}
                {labelOf(done.report.type).dept}. We aim to fix this within{" "}
                {labelOf(done.report.type).days} working days.
              </p>
              <Stages stage={done.report.stage} />
              <p className="quiet-note">
                Demo only: the report is saved in this browser and nothing is
                sent to anyone.
              </p>
              <div className="row">
                <button type="button" className="btn btn-ink" onClick={reset}>
                  Report something else
                </button>
              </div>
            </section>
          )}
        </div>

        {!done && (
          <form
            className="report-form"
            onSubmit={submit}
            noValidate
            aria-describedby="report-note"
          >
            <fieldset className="type-set">
              <legend>
                <span className="step-n">1</span> What is the problem?
              </legend>
              <div className="type-grid">
                {issueTypes.map((t) => {
                  const Icon = icons[t.id];
                  return (
                    <label key={t.id} className="type-tile">
                      <input
                        type="radio"
                        name="type"
                        value={t.id}
                        checked={type === t.id}
                        onChange={() => setType(t.id)}
                      />
                      <Icon size={22} aria-hidden="true" />
                      <span>{t.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="where-set" id="pin-map">
              <legend>
                <span className="step-n">2</span> Where is it?
              </legend>
              <CityMap
                label={
                  pin
                    ? `City map. Pin placed near ${nearestCorner(pin.x, pin.y)}.`
                    : "City map. No pin placed yet."
                }
                pin={pin}
                onPick={(p) => {
                  setPin(p);
                  setErrors((e) => ({ ...e, pin: "" }));
                }}
                reports={open}
                className={errors.pin ? "map-invalid" : ""}
              />
              <p className="pin-readout" aria-live="polite">
                {pin && ward ? (
                  <>
                    Near <strong>{nearestCorner(pin.x, pin.y)}</strong> · Ward{" "}
                    {ward}, {councillorFor(ward).name}
                  </>
                ) : (
                  "No pin yet. Open reports are shown as dots."
                )}
              </p>
              {errors.pin && <p className="field-error">{errors.pin}</p>}
              {nearby && (
                <div className="nearby">
                  <p>
                    <strong>
                      {nearby.ref} is already open{" "}
                      {nearby.neighbours
                        ? `with ${nearby.neighbours} neighbours`
                        : ""}{" "}
                      nearby
                    </strong>{" "}
                    — {labelOf(nearby.type).label.toLowerCase()}, status{" "}
                    {stages[nearby.stage].toLowerCase()}, filed{" "}
                    {shortDate(nearby.filed)}.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() =>
                      setDone({
                        report: {
                          ...nearby,
                          neighbours: nearby.neighbours + 1,
                        },
                        joined: true,
                      })
                    }
                  >
                    That's the one — add my voice
                  </button>
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend>
                <span className="step-n">3</span> Details
              </legend>
              <Area
                label="What did you see?"
                name="details"
                required
                minLength={10}
                rows={4}
                hint="Size, which lane or side of the street, anything that helps the crew find it."
                error={errors.details}
              />
              <Field
                label="Photo (optional)"
                name="photo"
                type="file"
                accept="image/*"
                hint="JPEG or PNG up to 10 MB. Stays on your device in this demo."
              />
            </fieldset>

            <fieldset>
              <legend>
                <span className="step-n">4</span> Updates
              </legend>
              <label className="check">
                <input
                  type="checkbox"
                  checked={updates}
                  onChange={(e) => setUpdates(e.target.checked)}
                />
                Send me updates when the status changes
              </label>
              {updates && (
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
              )}
            </fieldset>

            <button
              className="btn btn-citron btn-large"
              disabled={busy}
              aria-busy={busy}
            >
              {busy ? "Sending report…" : "Send report"}{" "}
              {!busy && <ArrowRight size={20} aria-hidden="true" />}
            </button>
            <p className="quiet-note" id="report-note">
              Demo form: reports stay in your browser and nothing is sent.
            </p>
          </form>
        )}

        <aside
          className="report-aside"
          aria-label="Track a report and emergencies"
        >
          <Track />
          <div className="emergency">
            <h2>Danger right now?</h2>
            <p>
              A gas smell, a downed power line, a crash or a hole deep enough to
              cause one: call <a href="tel:911">911</a> first, then report it
              here.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Track() {
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Filed | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ref.trim())
      return setError(
        "Enter the reference from your confirmation, like CW-24817.",
      );
    const found = findReport(ref);
    setResult(found ?? null);
    setError(
      found
        ? ""
        : `We can't find ${ref.trim().toUpperCase()}. Check the number — it starts with CW- and has five digits.`,
    );
  }

  return (
    <section className="track" aria-labelledby="track-title">
      <h2 id="track-title">Track a report</h2>
      <p>
        Try{" "}
        <button
          type="button"
          className="text-btn"
          onClick={() => setRef("CW-24817")}
        >
          CW-24817
        </button>{" "}
        or the reference you were given.
      </p>
      <form onSubmit={submit} noValidate className="inline-form">
        <Field
          label="Reference number"
          name="ref"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          error={error}
          autoComplete="off"
        />
        <button className="btn btn-ink">Check status</button>
      </form>
      <div aria-live="polite">
        {result && (
          <div className="track-result">
            <h3>
              {result.ref} · {labelOf(result.type).label}
            </h3>
            <p>
              Near {nearestCorner(result.x, result.y)}, filed{" "}
              {shortDate(result.filed)}. {result.note}
            </p>
            <Stages stage={result.stage} />
          </div>
        )}
      </div>
    </section>
  );
}
