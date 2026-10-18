import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { crafts, findCraft, post, talent } from "../content";
import { useBench } from "../lib/bench";
import { hashParams, pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { Hallmark } from "../components/Hallmark";

const MIN_BRIEF = 80;

type Draft = {
  title: string;
  craft: string;
  brief: string;
  budget: string;
  timeline: string;
  invite: string[];
};
type Posted = Draft & { ref: string; email: string };

const messages = {
  title:
    "Give the project a title of at least 8 characters, e.g. “Identity for a sourdough bakery”.",
  craft:
    "Choose the craft closest to the work. Pick the nearest one if you are unsure; the desk can move it.",
  brief: `Describe the work in at least ${MIN_BRIEF} characters: what you need, who it is for, and what done looks like.`,
  budget: "Pick a budget range so members know whether the project fits them.",
  timeline: "Pick when you need this finished, or choose Flexible.",
  start: "Choose a start date from today onwards, or leave it empty.",
  name: "Add your name so members know who they are talking to.",
  email: "Enter an email like you@company.com; replies arrive there.",
};

export function Post() {
  const params = hashParams();
  const bench = useBench();
  const preset =
    params
      .get("invite")
      ?.split(",")
      .filter((id) => talent.some((t) => t.id === id)) ?? [];
  const invitable = talent.filter(
    (t) => bench.includes(t.id) || preset.includes(t.id),
  );
  const [draft, setDraft] = useState<Draft>({
    title: "",
    craft:
      findCraft(params.get("craft") ?? "")?.slug ??
      findCraft(talent.find((t) => t.id === preset[0])?.craft ?? "")?.slug ??
      "",
    brief: "",
    budget: "",
    timeline: "",
    invite: preset.length ? preset : bench,
  });
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Posted | null>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

  const update = (patch: Partial<Draft>) =>
    setDraft((d) => ({ ...d, ...patch }));
  const toggleInvite = (id: string) =>
    update({
      invite: draft.invite.includes(id)
        ? draft.invite.filter((i) => i !== id)
        : [...draft.invite, id],
    });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(1100);
    setBusy(false);
    const n = Math.floor(1000 + Math.random() * 9000);
    setDone({
      ...draft,
      ref: `GLD-${n}`,
      email: String(new FormData(form).get("email")),
    });
  };

  const craftName = findCraft(draft.craft)?.name;
  const invited = talent.filter((t) => draft.invite.includes(t.id));

  const live = (
    <p className="sr-only" aria-live="polite">
      {done
        ? `Project posted as ${done.ref}.`
        : busy
          ? "Posting your project…"
          : ""}
    </p>
  );

  if (done) {
    const doneInvited = talent.filter((t) => done.invite.includes(t.id));
    return (
      <>
        {live}
        <section className="wrap post-done">
          <Hallmark
            className="struck"
            initials="G"
            register={Number(done.ref.slice(4))}
            craft={findCraft(done.craft)?.name ?? ""}
            size={120}
          />
          <h1 ref={doneHeading} tabIndex={-1}>
            Your project is posted.
          </h1>
          <p className="lede">
            “{done.title}” is on the register as <strong>{done.ref}</strong>.{" "}
            {doneInvited.length
              ? `${doneInvited.map((t) => t.name).join(", ")} ${doneInvited.length === 1 ? "has" : "have"} been invited and usually reply within one working day.`
              : "Invite members from the register whenever you are ready; the brief waits for you."}{" "}
            Replies will go to {done.email}.
          </p>
          <dl className="facts facts-inline">
            <div>
              <dt>Craft</dt>
              <dd>{findCraft(done.craft)?.name}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{done.budget}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{done.timeline}</dd>
            </div>
          </dl>
          <div className="close-actions">
            <Link to="/talent" className="btn btn-seal">
              Invite more members
            </Link>
            <Link to="/how-it-works" className="btn btn-line">
              What happens next
            </Link>
          </div>
          <p className="quiet">
            This is a demo: nothing was sent and no project was created.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      {live}
      <section className="page-head wrap">
        <h1>{post.title}</h1>
        <p className="lede">{post.lede}</p>
      </section>

      <div className="wrap post-layout">
        <form
          className="post-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
          aria-busy={busy}
        >
          <fieldset>
            <legend>The work</legend>
            <Field
              label="Project title"
              name="title"
              required
              minLength={8}
              maxLength={90}
              value={draft.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="Identity for a sourdough bakery"
              error={errors.title}
            />
            <Field label="Craft" name="craft" error={errors.craft}>
              <select
                required
                value={draft.craft}
                onChange={(e) => update({ craft: e.target.value })}
              >
                <option value="">Choose a craft…</option>
                {crafts.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Describe the work"
              name="brief"
              hint={`What you need, who it is for, what done looks like. ${draft.brief.length < MIN_BRIEF ? `${MIN_BRIEF - draft.brief.length} more characters needed.` : `${draft.brief.length} characters.`}`}
              error={errors.brief}
            >
              <textarea
                required
                minLength={MIN_BRIEF}
                rows={7}
                value={draft.brief}
                onChange={(e) => update({ brief: e.target.value })}
                placeholder="We are opening a second bakery in March and need an identity that works on bags, boxes, signage and a small website…"
              />
            </Field>
          </fieldset>

          <fieldset>
            <legend>Budget and timing</legend>
            <ChoiceGroup
              name="budget"
              label="Budget"
              options={post.budgets}
              value={draft.budget}
              error={errors.budget}
              onPick={(budget) => update({ budget })}
            />
            <ChoiceGroup
              name="timeline"
              label="Finished by"
              options={post.timelines}
              value={draft.timeline}
              error={errors.timeline}
              onPick={(timeline) => update({ timeline })}
            />
            <Field
              label="Earliest start (optional)"
              name="start"
              type="date"
              min={today}
              error={errors.start}
            />
          </fieldset>

          <fieldset>
            <legend>Who should see it</legend>
            {invitable.length ? (
              <div
                className="invite-list"
                role="group"
                aria-label="Invite members"
              >
                {invitable.map((t) => (
                  <label key={t.id} className="invite">
                    <input
                      type="checkbox"
                      checked={draft.invite.includes(t.id)}
                      onChange={() => toggleInvite(t.id)}
                    />
                    <img src={t.photo} alt="" width={640} height={800} />
                    <span>
                      <strong>{t.name}</strong>
                      <span className="muted">{findCraft(t.craft)?.name}</span>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="muted">
                Your bench is empty, so nobody is invited yet. You can post now
                and invite later, or{" "}
                <Link to="/talent">add members to your bench</Link> first.
              </p>
            )}
            <div
              className="radio-row"
              role="radiogroup"
              aria-label="Visibility"
            >
              <label className="check">
                <input
                  type="radio"
                  name="visibility"
                  value="invited"
                  defaultChecked
                />
                Invited members only
              </label>
              <label className="check">
                <input type="radio" name="visibility" value="public" />
                Public on the register
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>You</legend>
            <div className="field-pair">
              <Field
                label="Your name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Work email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                error={errors.email}
              />
            </div>
            <Field
              label="Company (optional)"
              name="company"
              autoComplete="organization"
            />
          </fieldset>

          <div className="form-foot">
            <button
              className="btn btn-seal btn-lg"
              type="submit"
              disabled={busy}
            >
              {busy ? "Posting…" : "Post project"}
            </button>
            <p className="quiet">Demo form: nothing is sent anywhere.</p>
          </div>
        </form>

        <aside className="notice" aria-label="Preview of your brief">
          <div className="notice-sheet">
            <h2>{draft.title || "Untitled project"}</h2>
            <p className="notice-meta">
              {[
                craftName ?? "Craft",
                draft.budget || "Budget",
                draft.timeline || "Timeline",
              ].join(" · ")}
            </p>
            <p className="notice-brief">
              {draft.brief || "Your description appears here as you write it."}
            </p>
            {invited.length > 0 && (
              <div className="notice-invited">
                <span>Invited</span>
                <ul>
                  {invited.map((t) => (
                    <li key={t.id}>
                      <img
                        src={t.photo}
                        alt={t.name}
                        width={640}
                        height={800}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="notice-next">
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1600}
              height={1201}
              loading="lazy"
            />
            <h2>{post.aside.title}</h2>
            <ul className="checks">
              {post.aside.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

type ChoiceProps = {
  name: string;
  label: string;
  options: string[];
  value: string;
  error?: string;
  onPick: (v: string) => void;
};

function ChoiceGroup({
  name,
  label,
  options,
  value,
  error,
  onPick,
}: ChoiceProps) {
  return (
    <fieldset
      className="field choice-group"
      data-invalid={error ? "" : undefined}
      aria-describedby={error ? `f-${name}-err` : undefined}
    >
      <legend>{label}</legend>
      <div className="chips">
        {options.map((o) => (
          <label key={o} className="chip">
            <input
              type="radio"
              name={name}
              value={o}
              required
              checked={value === o}
              onChange={() => onPick(o)}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="field-error" id={`f-${name}-err`}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
