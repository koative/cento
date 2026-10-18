import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  categories,
  cities,
  jobs,
  levels,
  salaryGuide,
  salaryRoles,
  type City,
  type Level,
} from "../content";
import { Link } from "../router";
import { band, k, money, ordinal, percentile } from "../lib/format";
import { JobRow } from "../components/JobRow";
import { SalaryScale } from "../components/SalaryScale";

type SortKey = "role" | Level;

function verdict(p: number) {
  if (p < 25)
    return "below most of the market. Worth asking whether the range has room.";
  if (p < 45) return "a little under the middle of the market.";
  if (p <= 55) return "right at the middle of the market.";
  if (p <= 75) return "above the middle of the market. A solid offer.";
  return "in the top quarter of the market. A strong offer.";
}

export function Salaries() {
  const [roleId, setRoleId] = useState("product-designer");
  const [city, setCity] = useState<City>("Chicago");
  const [level, setLevel] = useState<Level>("Mid");
  const [offerText, setOfferText] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "Mid",
    dir: -1,
  });

  const role = salaryRoles.find((r) => r.id === roleId)!;
  const b = band(roleId, city, level);
  const offer = Number(offerText.replace(/[^0-9.]/g, ""));
  const validOffer = offer >= 10000 && offer <= 1000000;
  const p = validOffer ? percentile(b, offer) : null;
  const openings = jobs.filter((j) => j.role === roleId);

  const rows = salaryRoles
    .map((r) => ({
      r,
      by: Object.fromEntries(
        levels.map((l) => [l, band(r.id, city, l).p50]),
      ) as Record<Level, number>,
    }))
    .sort(
      (x, y) =>
        (sort.key === "role"
          ? x.r.label.localeCompare(y.r.label)
          : x.by[sort.key] - y.by[sort.key]) * sort.dir,
    );

  const sortBy = (key: SortKey) =>
    setSort((s) => ({
      key,
      dir: s.key === key ? (s.dir === 1 ? -1 : 1) : key === "role" ? 1 : -1,
    }));
  const ariaSort = (key: SortKey) =>
    sort.key === key
      ? sort.dir === 1
        ? "ascending"
        : "descending"
      : undefined;

  return (
    <div className="page">
      <div className="wrap page-head">
        <h1>{salaryGuide.title}</h1>
        <p className="lede">{salaryGuide.intro}</p>
      </div>

      <section className="wrap checker" id="checker" aria-labelledby="check-h">
        <h2 id="check-h" className="sr-only">
          Check a salary
        </h2>
        <div className="checker-controls">
          <label className="field">
            <span>Role</span>
            <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
              {categories.map((c) => (
                <optgroup key={c.id} label={c.label}>
                  {salaryRoles
                    .filter((r) => r.category === c.id)
                    .map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Where</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value as City)}
            >
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <fieldset className="field segmented">
            <legend>Level</legend>
            <div>
              {levels.map((l) => (
                <label key={l}>
                  <input
                    type="radio"
                    name="level"
                    value={l}
                    checked={level === l}
                    onChange={() => setLevel(l)}
                  />
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="field">
            <span>An offer you have (optional)</span>
            <input
              type="text"
              inputMode="numeric"
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              placeholder="e.g. 125,000"
              aria-describedby="offer-hint"
            />
            <small id="offer-hint">Yearly base pay in dollars.</small>
          </label>
        </div>

        <div className="checker-result">
          <p className="checker-median">
            <span className="num">{money(b.p50)}</span>
            <span>
              median base for a {level.toLowerCase()} {role.label.toLowerCase()}
              , {city}
            </span>
          </p>
          <SalaryScale
            band={b}
            offer={validOffer ? offer : undefined}
            label={`Pay distribution for ${role.label}, ${level}, ${city}`}
          />
          <p className="verdict" aria-live="polite">
            {p !== null
              ? `${k(offer)} lands around the ${ordinal(p)} percentile — ${verdict(p)}`
              : offerText
                ? "Type a yearly figure between $10,000 and $1,000,000 to place it on the scale."
                : "Type an offer above to see where it lands."}
          </p>
        </div>
      </section>

      {openings.length > 0 && (
        <section className="wrap section-tight" aria-labelledby="hiring-h">
          <h2 id="hiring-h" className="section-title">
            Hiring for this role now
          </h2>
          <div className="listing-stack">
            {openings.map((j) => (
              <JobRow key={j.id} job={j} />
            ))}
          </div>
        </section>
      )}

      <section className="wrap section" aria-labelledby="table-h">
        <div className="section-head">
          <h2 id="table-h" className="section-title">
            Median base pay in {city}
          </h2>
          <p className="fine">Select a column header to sort.</p>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="table-h"
        >
          <table className="pay-table">
            <thead>
              <tr>
                {(["role", ...levels] as SortKey[]).map((key) => (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={ariaSort(key)}
                    className={key === "role" ? "" : "num"}
                  >
                    <button type="button" onClick={() => sortBy(key)}>
                      {key === "role" ? "Role" : key}
                      {sort.key === key &&
                        (sort.dir === 1 ? (
                          <ArrowUp aria-hidden="true" />
                        ) : (
                          <ArrowDown aria-hidden="true" />
                        ))}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ r, by }) => (
                <tr key={r.id} data-current={r.id === roleId ? "" : undefined}>
                  <th scope="row">
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => {
                        setRoleId(r.id);
                        document
                          .getElementById("checker")
                          ?.scrollIntoView({ block: "start" });
                      }}
                    >
                      {r.label}
                    </button>
                  </th>
                  {levels.map((l) => (
                    <td key={l} className="num">
                      {k(by[l])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section method" aria-labelledby="method-h">
        <h2 id="method-h" className="section-title">
          How we get the numbers
        </h2>
        <div className="method-text">
          {salaryGuide.method.map((m) => (
            <p key={m}>{m}</p>
          ))}
          <p className="fine">
            {salaryGuide.note} Looking for these roles?{" "}
            <Link to="/jobs">Search current listings</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
