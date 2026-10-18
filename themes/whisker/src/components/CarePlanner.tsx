import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "../router";
import { planMultiplier, plans, type Species } from "../content";
import {
  ageLabel,
  careCard,
  planFor,
  statusOf,
  type CareStatus,
} from "../lib/care";
import { cardDate, money } from "../lib/format";
import { load, save } from "../lib/store";
import { Stamp } from "./Stamp";

export type PlannerPet = {
  name: string;
  species: Species;
  month: number;
  year: number;
  given: string[];
};
export const PLANNER_KEY = "whisker.planner";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const statusText: Record<CareStatus, string> = {
  given: "Given",
  unrecorded: "Not recorded",
  soon: "Due soon",
  planned: "Planned",
};

function defaultPet(today: Date): PlannerPet {
  const born = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  return {
    name: "Juniper",
    species: "dog",
    month: born.getMonth(),
    year: born.getFullYear(),
    given: [],
  };
}

/** Signature interaction: a live vaccine & check-up record card, stamped as doses are given. */
export function CarePlanner({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);
  const [pet, setPet] = useState<PlannerPet>(() =>
    load(PLANNER_KEY, defaultPet(today)),
  );
  const [announce, setAnnounce] = useState("");
  useEffect(() => save(PLANNER_KEY, pet), [pet]);

  const born = new Date(pet.year, pet.month, 1);
  const rows = careCard(pet.species, born, today);
  const plan = plans.find((p) => p.id === planFor(pet.species, born, today))!;
  const mult =
    pet.species === "dog"
      ? planMultiplier["dog-small"]
      : planMultiplier[pet.species];
  const name = pet.name.trim() || "Your pet";
  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - i);
  const H = `h${headingLevel}` as const;

  const toggle = (key: string, title: string) => {
    const given = pet.given.includes(key);
    setPet({
      ...pet,
      given: given ? pet.given.filter((g) => g !== key) : [...pet.given, key],
    });
    setAnnounce(
      given ? `${title}: stamp removed.` : `${title}: stamped as given.`,
    );
  };

  return (
    <div className="planner">
      <form className="planner-controls" onSubmit={(e) => e.preventDefault()}>
        <H className="planner-title">Fill in the card</H>
        <div className="field">
          <label htmlFor="pl-name">Pet's name</label>
          <input
            id="pl-name"
            value={pet.name}
            maxLength={24}
            autoComplete="off"
            onChange={(e) => setPet({ ...pet, name: e.target.value })}
          />
        </div>
        <fieldset className="field">
          <legend>Species</legend>
          <div className="seg">
            {(["dog", "cat", "rabbit"] as Species[]).map((s) => (
              <label key={s} className="seg-option">
                <input
                  type="radio"
                  name="pl-species"
                  value={s}
                  checked={pet.species === s}
                  onChange={() => setPet({ ...pet, species: s })}
                />
                <span>{s[0].toUpperCase() + s.slice(1)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend>Born</legend>
          <div className="pair">
            <label className="sr-only" htmlFor="pl-month">
              Birth month
            </label>
            <select
              id="pl-month"
              value={pet.month}
              onChange={(e) =>
                setPet({ ...pet, month: Number(e.target.value) })
              }
            >
              {months.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="pl-year">
              Birth year
            </label>
            <select
              id="pl-year"
              value={pet.year}
              onChange={(e) => setPet({ ...pet, year: Number(e.target.value) })}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <p className="planner-help">
          Tap a row's stamp box when a dose has been given. Your card is saved
          on this device only.
        </p>
      </form>

      <article className="record" aria-label={`${name}'s health record`}>
        <header className="record-head">
          <p className="record-clinic">
            Whisker Veterinary Clinic · Health record
          </p>
          <dl className="record-fields">
            <div>
              <dt>Name</dt>
              <dd>{name}</dd>
            </div>
            <div>
              <dt>Species</dt>
              <dd>{pet.species[0].toUpperCase() + pet.species.slice(1)}</dd>
            </div>
            <div>
              <dt>Age</dt>
              <dd>{ageLabel(born, today)}</dd>
            </div>
          </dl>
        </header>

        {rows.length ? (
          <table className="record-table">
            <caption className="sr-only">
              Vaccines and check-ups from nine months ago to two years ahead
            </caption>
            <thead>
              <tr>
                <th scope="col">Due</th>
                <th scope="col">Care</th>
                <th scope="col">Record</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const key = `${pet.species}:${r.id}`;
                const status = statusOf(r, pet.given.includes(key), today);
                return (
                  <tr key={key} data-status={status}>
                    <td className="record-date">{cardDate(r.date)}</td>
                    <td>
                      <strong>{r.title}</strong>
                      <span>{r.detail}</span>
                      {(status === "soon" || status === "unrecorded") && (
                        <Link
                          to={`/book?reason=${r.reason}`}
                          className="record-book"
                        >
                          <CalendarDays aria-hidden="true" /> Book this
                        </Link>
                      )}
                    </td>
                    <td className="record-cell">
                      <button
                        type="button"
                        className="stamp-box"
                        aria-pressed={status === "given"}
                        aria-label={`${r.title}, ${cardDate(r.date)}: ${status === "given" ? "remove stamp" : "mark as given"}`}
                        onClick={() => toggle(key, r.title)}
                      >
                        {status === "given" ? (
                          <Stamp
                            date={cardDate(r.date).replace(/,? \d{4}$/, "")}
                            tilt={((i * 7) % 15) - 8}
                          />
                        ) : (
                          <span className={`record-status record-${status}`}>
                            {statusText[status]}
                          </span>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="record-empty">
            That birth date is in the future. Pick the month your pet was born.
          </p>
        )}

        <footer className="record-foot">
          <p>
            Suits the <strong>{plan.name}</strong> plan — from{" "}
            {money(Math.round(plan.base * mult))}/month.
          </p>
          <Link to="/plans" className="text-link">
            Compare plans
          </Link>
        </footer>
      </article>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
