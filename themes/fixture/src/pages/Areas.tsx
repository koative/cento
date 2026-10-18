import { useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { areas, brand, rates, tiers } from "../content";
import { areaForZip } from "../lib/estimate";
import { money } from "../lib/format";
import { AreaMap } from "../components/AreaMap";

export function Areas() {
  const [selected, setSelected] = useState("old-mill");
  const [zipError, setZipError] = useState("");
  const [zipResult, setZipResult] = useState("");
  const area = areas.find((a) => a.slug === selected) ?? areas[0];
  const card = useRef<HTMLElement>(null);
  const show = (slug: string) => {
    setSelected(slug);
    card.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const check = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("zip") as HTMLInputElement;
    const zip = input.value.trim();
    if (!/^\d{5}$/.test(zip)) {
      setZipResult("");
      setZipError("Enter a 5-digit ZIP code, like 40703.");
      input.focus();
      return;
    }
    setZipError("");
    const found = areaForZip(zip);
    if (!found) {
      setZipResult(
        `${zip} isn't on our map. Call ${brand.phone} and we'll tell you who covers it.`,
      );
      return;
    }
    setSelected(found.slug);
    setZipResult(
      found.tier === "none"
        ? `${zip} is ${found.name} — outside our area. ${found.note}`
        : `${zip} is ${found.name}: ${tiers[found.tier].label.toLowerCase()}, ${tiers[found.tier].fee.toLowerCase()}. We cover you.`,
    );
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>Service areas</h1>
        <p className="lede">
          Every van leaves the Foundry Lane depot in Old Mill. Inside the ring
          road there is no trip fee; the six outer neighbourhoods add{" "}
          {money(rates.outerZone)}. Emergency arrival targets below are for the
          on-call van at night.
        </p>
      </section>

      <section className="wrap areas-layout" aria-label="Coverage map">
        <div className="map-frame">
          <AreaMap selected={selected} onSelect={setSelected} />
          <ul className="map-key" aria-label="Map key">
            <li data-tier="core">Core zone — no trip fee</li>
            <li data-tier="outer">
              Outer zone — {money(rates.outerZone)} trip
            </li>
            <li data-tier="none">Not covered</li>
          </ul>
        </div>

        <div className="area-panel">
          <form className="zip-check" noValidate onSubmit={check}>
            <div className="field" data-invalid={zipError ? "" : undefined}>
              <label htmlFor="f-zip-check">Check a ZIP code</label>
              <div className="inline-field">
                <input
                  id="f-zip-check"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="40703"
                  aria-invalid={zipError ? true : undefined}
                  aria-describedby={zipError ? "zip-check-err" : undefined}
                />
                <button type="submit" className="btn btn-ink">
                  Check
                </button>
              </div>
              {zipError && (
                <p className="field-error" id="zip-check-err">
                  {zipError}
                </p>
              )}
            </div>
            <p className="zip-result" aria-live="polite">
              {zipResult}
            </p>
          </form>

          <article className="area-card" aria-live="polite" ref={card}>
            <h2>{area.name}</h2>
            <p className="area-tier" data-tier={area.tier}>
              {tiers[area.tier].label} · {tiers[area.tier].fee}
            </p>
            <dl>
              <div>
                <dt>ZIP codes</dt>
                <dd>{area.zips.join(", ")}</dd>
              </div>
              <div>
                <dt>Emergency arrival</dt>
                <dd>{area.arrival || "—"}</dd>
              </div>
            </dl>
            <p>{area.note}</p>
            {area.tier !== "none" && (
              <Link to="/book" className="btn btn-live">
                Book a visit in {area.name}
              </Link>
            )}
          </article>
        </div>
      </section>

      <section className="wrap area-table-wrap" aria-labelledby="area-table-h">
        <h2 id="area-table-h">Every neighbourhood we cover</h2>
        <div className="table-scroll">
          <table className="area-table">
            <thead>
              <tr>
                <th scope="col">Neighbourhood</th>
                <th scope="col">ZIP</th>
                <th scope="col">Zone</th>
                <th scope="col">Trip fee</th>
                <th scope="col">Emergency arrival</th>
              </tr>
            </thead>
            <tbody>
              {areas
                .filter((a) => a.tier !== "none")
                .map((a) => (
                  <tr
                    key={a.slug}
                    data-selected={a.slug === selected ? "" : undefined}
                  >
                    <th scope="row">
                      <button
                        type="button"
                        className="link-button"
                        onClick={() => show(a.slug)}
                      >
                        {a.name}
                      </button>
                    </th>
                    <td>{a.zips.join(", ")}</td>
                    <td>{tiers[a.tier].label}</td>
                    <td>
                      {a.tier === "outer" ? money(rates.outerZone) : "$0"}
                    </td>
                    <td>{a.arrival}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
