import { useState, type FormEvent } from "react";
import { navigate } from "../router";
import {
  addDays,
  isOpen,
  nightsBetween,
  nightsOf,
  setDraft,
  today,
  useDraft,
} from "../lib/stay";
import { useErrors, validate } from "../lib/forms";
import { Field } from "./Field";

/** Arrival, departure and party size; hands the dates to the booking flow. */
export function StayBar() {
  const draft = useDraft();
  const { errors, setErrors, onChange } = useErrors();
  const [arrive, setArrive] = useState(draft.checkIn ?? "");
  const [leave, setLeave] = useState(draft.checkOut ?? "");
  const min = today();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    if (arrive && leave && nightsBetween(arrive, leave) < 2)
      extra.leave = "Stays are two nights or more. Choose a later departure.";
    else if (arrive && leave && !nightsOf(arrive, leave).every(isOpen))
      extra.arrive =
        "Part of those dates falls between seasons (we close 25 Oct – 12 Dec and 6 Apr – 5 Jun). Choose dates within a season.";
    const found = validate(
      form,
      {
        arrive: "Choose an arrival date from today onwards.",
        leave: "Choose a departure date after your arrival.",
        guests: "Choose how many guests.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    const guests = Number(new FormData(form).get("guests"));
    setDraft({
      checkIn: arrive,
      checkOut: leave,
      adults: Math.min(guests, 5),
      children: 0,
    });
    navigate("/book");
  }

  return (
    <form
      className="staybar"
      noValidate
      onSubmit={submit}
      onChange={onChange}
      aria-label="Check availability"
    >
      <Field
        label="Arrive"
        name="arrive"
        type="date"
        required
        min={min}
        value={arrive}
        onChange={(e) => {
          setArrive(e.target.value);
          if (e.target.value && (!leave || leave <= e.target.value))
            setLeave(addDays(e.target.value, 3));
        }}
        error={errors.arrive}
      />
      <Field
        label="Leave"
        name="leave"
        type="date"
        required
        min={arrive ? addDays(arrive, 1) : min}
        value={leave}
        onChange={(e) => setLeave(e.target.value)}
        error={errors.leave}
      />
      <Field label="Guests" name="guests" error={errors.guests}>
        <select defaultValue={String(draft.adults + draft.children)} required>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </Field>
      <button className="btn btn-primary">Check availability</button>
    </form>
  );
}
