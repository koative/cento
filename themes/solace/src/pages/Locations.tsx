import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { locations, services } from "../content";
import { ClinicMap } from "../components/ClinicMap";
import { DAYS, WEEK, fmtTime, openState } from "../lib/schedule";

export function Locations() {
  const [selected, setSelected] = useState(locations[0].slug);
  const now = new Date();
  const today = now.getDay();

  return (
    <>
      <header className="page-head">
        <h1>Locations & hours</h1>
        <p className="lede">
          Three clinics, one record. Use whichever is nearest that day — your
          clinician’s notes are there before you are.
        </p>
      </header>

      <section className="locations">
        <ClinicMap selected={selected} onSelect={setSelected} />
        <div className="loc-tabs" role="tablist" aria-label="Clinics">
          {locations.map((l) => {
            const state = openState(l, now);
            return (
              <button
                key={l.slug}
                type="button"
                role="tab"
                id={`tab-${l.slug}`}
                aria-selected={selected === l.slug}
                aria-controls={`panel-${l.slug}`}
                tabIndex={selected === l.slug ? 0 : -1}
                onClick={() => setSelected(l.slug)}
                onKeyDown={(e) => {
                  if (
                    e.key !== "ArrowDown" &&
                    e.key !== "ArrowUp" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "ArrowLeft"
                  )
                    return;
                  e.preventDefault();
                  const step =
                    e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
                  const next =
                    locations[
                      (locations.indexOf(l) + step + locations.length) %
                        locations.length
                    ].slug;
                  setSelected(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }}
              >
                <span className="loc-name">{l.name}</span>
                <span className="loc-street">{l.street}</span>
                <span
                  className="open-state"
                  data-open={state.open || undefined}
                >
                  {state.text}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {locations.map((l) => (
        <section
          key={l.slug}
          className="loc-panel"
          role="tabpanel"
          id={`panel-${l.slug}`}
          aria-labelledby={`tab-${l.slug}`}
          hidden={selected !== l.slug}
        >
          <div className="loc-info">
            <h2>{l.name}</h2>
            <p className="lede-small">{l.note}</p>
            <p>
              {l.street}
              <br />
              {l.area}
              <br />
              <a href={l.phoneHref}>{l.phone}</a>
            </p>
            <h3>Getting here</h3>
            <p>{l.getting}</p>
            <h3>Access</h3>
            <p>{l.access}</p>
            <ul className="pill-list">
              {l.extras.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="loc-side">
            <table className="hours">
              <caption>Opening hours</caption>
              <tbody>
                {WEEK.map((d) => {
                  const h = l.hours[d];
                  return (
                    <tr key={d} aria-current={d === today ? "date" : undefined}>
                      <th scope="row">{DAYS[d]}</th>
                      <td>
                        {h ? `${fmtTime(h[0])} – ${fmtTime(h[1])}` : "Closed"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h3>Offered here</h3>
            <ul className="loc-services">
              {services
                .filter((s) => s.locations.includes(l.slug))
                .map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
            </ul>
            <Link to={`/book?location=${l.slug}`} className="btn">
              Book at {l.name} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}
