import { useState } from "react";
import {
  brand,
  coasts,
  featureLabels,
  villas,
  villasPage,
  type Coast,
  type Feature,
} from "../content";
import { addDays, daysBetween, fmtDay, isDay, today } from "../lib/dates";
import {
  checkStay,
  lowestRate,
  money,
  quoteFor,
  setStay,
  useStay,
} from "../lib/stay";
import { IslandMap } from "../components/IslandMap";
import { VillaCard } from "../components/VillaCard";

type Sort = "price-asc" | "price-desc" | "sleeps";

export function Villas() {
  const stay = useStay();
  const [coast, setCoast] = useState<Coast | "all">("all");
  const [guests, setGuests] = useState(stay.adults + stay.children);
  const [needs, setNeeds] = useState<Feature[]>([]);
  const [sort, setSort] = useState<Sort>("price-asc");
  const [onlyFree, setOnlyFree] = useState(false);
  const [active, setActive] = useState<string>();

  const hasDates =
    isDay(stay.arrival) &&
    isDay(stay.departure) &&
    stay.departure > stay.arrival;
  const fitOf = (slug: string) => {
    if (!hasDates) return undefined;
    const villa = villas.find((v) => v.slug === slug)!;
    const problem = checkStay(villa, stay.arrival, stay.departure);
    return problem
      ? { free: false, note: problem }
      : {
          free: true,
          note: `Free ${fmtDay(stay.arrival)} – ${fmtDay(stay.departure)} · ${money(quoteFor(villa, stay.arrival, stay.departure, stay.adults).total)} in total`,
        };
  };

  const shown = villas
    .filter((v) => coast === "all" || v.coast === coast)
    .filter((v) => v.sleeps >= guests)
    .filter((v) => needs.every((n) => v.features.includes(n)))
    .filter((v) => !onlyFree || fitOf(v.slug)?.free)
    .sort((a, b) =>
      sort === "sleeps"
        ? b.sleeps - a.sleeps
        : (lowestRate(a) - lowestRate(b)) * (sort === "price-asc" ? 1 : -1),
    );

  const toggleNeed = (f: Feature) =>
    setNeeds((n) => (n.includes(f) ? n.filter((x) => x !== f) : [...n, f]));
  const reset = () => {
    setCoast("all");
    setGuests(1);
    setNeeds([]);
    setOnlyFree(false);
  };

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{villasPage.title}</h1>
        <p className="lede">{villasPage.lede}</p>
      </header>

      <form
        className="filters wrap"
        aria-label="Filter the villas"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="chips">
          <legend>Coast</legend>
          {(["all", ...Object.keys(coasts)] as (Coast | "all")[]).map((c) => (
            <label key={c} className="chip">
              <input
                type="radio"
                name="coast"
                checked={coast === c}
                onChange={() => setCoast(c)}
              />
              <span>{c === "all" ? "Whole island" : coasts[c].label}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="chips">
          <legend>Must have</legend>
          {(Object.keys(featureLabels) as Feature[]).map((f) => (
            <label key={f} className="chip">
              <input
                type="checkbox"
                checked={needs.includes(f)}
                onChange={() => toggleNeed(f)}
              />
              <span>{featureLabels[f]}</span>
            </label>
          ))}
        </fieldset>

        <div className="filter-row">
          <label className="mini-field">
            Guests
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}+
                </option>
              ))}
            </select>
          </label>
          <label className="mini-field">
            Arrive
            <input
              type="date"
              min={today()}
              value={stay.arrival}
              onChange={(e) => {
                const arrival = e.target.value;
                const nights = hasDates
                  ? daysBetween(stay.arrival, stay.departure)
                  : 7;
                setStay({
                  arrival,
                  departure: isDay(arrival) ? addDays(arrival, nights) : "",
                });
              }}
            />
          </label>
          <label className="mini-field">
            Leave
            <input
              type="date"
              min={stay.arrival || today()}
              value={stay.departure}
              onChange={(e) => setStay({ departure: e.target.value })}
            />
          </label>
          <label className="mini-field">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="price-asc">Price, lowest first</option>
              <option value="price-desc">Price, highest first</option>
              <option value="sleeps">Largest first</option>
            </select>
          </label>
          <label className="check" data-disabled={hasDates ? undefined : ""}>
            <input
              type="checkbox"
              checked={onlyFree}
              disabled={!hasDates}
              onChange={(e) => setOnlyFree(e.target.checked)}
            />
            Only houses free for my dates
          </label>
          {hasDates && (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setStay({ arrival: "", departure: "" })}
            >
              Clear dates
            </button>
          )}
        </div>
      </form>

      <div className="wrap villas-layout">
        <div>
          <p className="result-count" aria-live="polite">
            {shown.length === villas.length
              ? `All ${villas.length} houses`
              : `${shown.length} of ${villas.length} houses`}
            {hasDates &&
              ` · prices for ${daysBetween(stay.arrival, stay.departure)} nights from ${fmtDay(stay.arrival)}`}
          </p>
          {shown.length ? (
            <div className="villa-grid">
              {shown.map((v, i) => (
                <VillaCard
                  key={v.slug}
                  villa={v}
                  fit={fitOf(v.slug)}
                  onHover={setActive}
                  headingLevel="h2"
                  eager={i < 2}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No house fits all of that.</h2>
              <p>
                Try a different coast, fewer must-haves or other dates. Or tell
                us what you need and we will look at the calendars for you.
              </p>
              <div className="actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={reset}
                >
                  Show every house
                </button>
                <a href={`mailto:${brand.email}`} className="btn btn-quiet">
                  Write to us
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="villas-map">
          <IslandMap
            label={`Map of ${brand.island} showing the houses that match`}
            active={active}
            onActive={setActive}
            pins={shown.map((v) => ({
              id: v.slug,
              to: `/villas/${v.slug}`,
              label: v.name,
              detail: `from ${money(lowestRate(v))} a night`,
              ...v.map,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
