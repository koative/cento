import { useState, type FormEvent } from "react";
import { EMAIL_MSG, emailTypo, nextSunday, pause, validate } from "../lib/util";
import { Field, useErrors } from "./Field";

type Props = {
  id: string;
  button?: string;
  tone?: "paper" | "ink";
  note?: string;
};

/** One-field free signup used in the hero, the closing band and the footer. */
export function SubscribeForm({
  id,
  button = "Subscribe free",
  tone = "paper",
  note,
}: Props) {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email"));
    const typo = emailTypo(email);
    const found = validate(
      form,
      { email: EMAIL_MSG },
      typo ? { email: typo } : {},
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    setDone(
      `You're in. The next Sunday Letter reaches ${email} on ${nextSunday()} at 7:00.`,
    );
    form.reset();
  };

  return (
    <div className={`signup signup-${tone}`}>
      <form
        noValidate
        onSubmit={submit}
        onChange={onChange}
        className="signup-form"
        aria-busy={busy}
      >
        <Field
          idPrefix={id}
          label="Email address"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
        />
        <button className="btn btn-solid" type="submit" disabled={busy}>
          {busy ? "Adding you…" : button}
        </button>
      </form>
      <p className="signup-status" aria-live="polite">
        {done}
      </p>
      {note && !done && <p className="signup-note">{note}</p>}
    </div>
  );
}
