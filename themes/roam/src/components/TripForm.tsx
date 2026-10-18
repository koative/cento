import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { stations } from "../content";
import { rentalDays, setDraft, useDraft, type Draft } from "../lib/booking";
import { clock, fromToday, shortDate } from "../lib/format";
import { validate } from "../lib/forms";
import { Field, useErrors } from "./Field";

const times = Array.from({ length: 33 }, (_, i) => {
  const mins = 6 * 60 + i * 30;
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
});

type Props = {
  submitLabel: string;
  onDone: () => void;
  id: string;
  compact?: boolean;
};

/** Where and when: the first step of every booking, also used as the home search. */
export function TripForm({ submitLabel, onDone, id, compact }: Props) {
  const d = useDraft();
  const [elsewhere, setElsewhere] = useState(d.dropoff !== d.pickup);
  const { errors, setErrors, onChange } = useErrors();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;
    const trip: Partial<Draft> = {
      pickup: data.pickup,
      dropoff: elsewhere ? data.dropoff : data.pickup,
      from: data.from,
      fromTime: data.fromTime,
      to: data.to,
      toTime: data.toTime,
      young: data.young === "on",
    };
    const extra: Record<string, string> = {};
    const days = rentalDays({
      from: data.from,
      fromTime: data.fromTime,
      to: data.to,
      toTime: data.toTime,
    });
    if (data.from && data.to && !days)
      extra.to = "Return has to be after pickup. Pick a later date or time.";
    else if (days > 60)
      extra.to =
        "We rent for up to 60 days at a time. For longer, call any station about a monthly rate.";
    if (elsewhere && data.dropoff === data.pickup)
      extra.dropoff =
        "That's the pickup station. Choose another, or untick Return elsewhere.";
    const found = validate(
      form,
      {
        from: `Choose a pickup date from today, ${shortDate(fromToday(0))}, onward.`,
        to: "Choose a return date.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setDraft(trip);
    onDone();
  };

  const toggle = (on: boolean) => {
    setElsewhere(on);
    setDraft({
      dropoff: on
        ? (stations.find((s) => s.id !== d.pickup)?.id ?? d.pickup)
        : d.pickup,
    });
  };

  return (
    <form
      id={id}
      className={`trip-form${compact ? " trip-compact" : ""}`}
      noValidate
      onSubmit={submit}
      onChange={onChange}
    >
      <Field
        label="Pick up at"
        name="pickup"
        error={errors.pickup}
        className="span-2"
      >
        <select
          value={d.pickup}
          required
          onChange={(e) =>
            setDraft({
              pickup: e.target.value,
              dropoff: elsewhere ? d.dropoff : e.target.value,
            })
          }
        >
          {stations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </Field>

      <label className="check span-2">
        <input
          type="checkbox"
          checked={elsewhere}
          onChange={(e) => toggle(e.target.checked)}
        />
        <span>Return elsewhere</span>
      </label>

      {elsewhere && (
        <Field
          label="Return to"
          name="dropoff"
          error={errors.dropoff}
          className="span-2"
        >
          <select
            value={d.dropoff}
            required
            onChange={(e) => setDraft({ dropoff: e.target.value })}
          >
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field
        label="Pickup date"
        name="from"
        type="date"
        required
        min={fromToday(0)}
        defaultValue={d.from}
        error={errors.from}
      />
      <Field label="Pickup time" name="fromTime" error={errors.fromTime}>
        <select defaultValue={d.fromTime}>
          {times.map((t) => (
            <option key={t} value={t}>
              {clock(t)}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label="Return date"
        name="to"
        type="date"
        required
        min={fromToday(0)}
        defaultValue={d.to}
        error={errors.to}
      />
      <Field label="Return time" name="toTime" error={errors.toTime}>
        <select defaultValue={d.toTime}>
          {times.map((t) => (
            <option key={t} value={t}>
              {clock(t)}
            </option>
          ))}
        </select>
      </Field>

      <label className="check span-2">
        <input type="checkbox" name="young" defaultChecked={d.young} />
        <span>Main driver is 21–24</span>
      </label>

      <button type="submit" className="btn btn-sign btn-wide span-2">
        {submitLabel} <ArrowRight aria-hidden="true" />
      </button>
    </form>
  );
}
