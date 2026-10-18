import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { wards } from "../content";
import { Link } from "../router";
import {
  councillorFor,
  locate,
  longDate,
  nextCollection,
  streetNames,
  wardAt,
} from "../lib/city";
import { CityMap } from "./CityMap";

/** Address → ward, councillor, collection day and polling place. */
export function StreetLookup({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [street, setStreet] = useState("Mill St");
  const [number, setNumber] = useState("240");
  const [error, setError] = useState("");
  const [found, setFound] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(() => ({ ...locate("Mill St", 240)!, label: "240 Mill St" }));
  const H = `h${headingLevel}` as const;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = Number(number);
    if (
      !number.trim() ||
      !Number.isInteger(n) ||
      n < 1 ||
      n > (street.endsWith("Ave") ? 599 : 1199)
    ) {
      setError(
        `Enter a house number between 1 and ${street.endsWith("Ave") ? 599 : 1199} for ${street}.`,
      );
      setFound(null);
      return;
    }
    setError("");
    setFound({ ...locate(street, n)!, label: `${n} ${street}` });
  }

  const ward = found && wardAt(found.x, found.y);
  const pickup = ward && nextCollection(ward);
  const councillor = ward && councillorFor(ward);

  return (
    <div className="lookup">
      <form className="lookup-form" onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="lk-number">House number</label>
          <input
            id="lk-number"
            inputMode="numeric"
            autoComplete="off"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "lk-error" : undefined}
          />
        </div>
        <div className="field">
          <label htmlFor="lk-street">Street</label>
          <select
            id="lk-street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          >
            {streetNames.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-ink">
          <Search size={18} aria-hidden="true" /> Look up
        </button>
        {error && (
          <p className="field-error lookup-error" id="lk-error">
            {error}
          </p>
        )}
      </form>
      <div className="lookup-result" aria-live="polite">
        {found && ward && pickup && councillor ? (
          <>
            <H className="lookup-address">
              {found.label}{" "}
              <span className="plate plate-small">Ward {ward}</span>
            </H>
            <dl className="facts">
              <div>
                <dt>Next collection</dt>
                <dd>
                  <strong>
                    {pickup.days === 0
                      ? "Today"
                      : pickup.days === 1
                        ? "Tomorrow"
                        : longDate(pickup.date)}
                  </strong>
                  {pickup.days < 2 && <> ({longDate(pickup.date)})</>} — trash,
                  plus {pickup.second.toLowerCase()}. Curb by 7:00 am.
                </dd>
              </div>
              <div>
                <dt>Your councillor</dt>
                <dd>
                  <Link to="/council">{councillor.name}</Link> ·{" "}
                  {councillor.hours}
                </dd>
              </div>
              <div>
                <dt>Polling place</dt>
                <dd>{wards[ward].polling}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="lookup-empty">
            Enter an address to see your trash day, ward, councillor and polling
            place.
          </p>
        )}
      </div>
      <CityMap
        className="lookup-map"
        label={
          found
            ? `Map of Commonwell with ${found.label} marked in Ward ${ward}`
            : "Map of Commonwell's wards"
        }
        pin={found}
        showWards
        ward={ward}
      />
    </div>
  );
}
