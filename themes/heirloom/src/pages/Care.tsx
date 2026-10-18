import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { care } from "../content";
import { Faq } from "../components/Bits";

export function Care() {
  const [mm, setMm] = useState("");
  const value = Number(mm);
  const inRange = mm !== "" && value >= 14 && value <= 21;
  // Nearest size by inside diameter.
  const nearest = inRange
    ? care.sizes.reduce((best, row) =>
        Math.abs(Number(row[1]) - value) < Math.abs(Number(best[1]) - value)
          ? row
          : best,
      )
    : null;

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{care.title}</h1>
        <p className="lede">{care.intro}</p>
      </header>

      <section className="sizing">
        <div>
          <h2>Find your ring size</h2>
          <ol className="tips">
            {care.sizingTips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <div className="field measure">
            <label htmlFor="f-mm">
              Inside diameter of a ring that fits (mm)
            </label>
            <input
              id="f-mm"
              type="number"
              inputMode="decimal"
              min={14}
              max={21}
              step={0.1}
              placeholder="e.g. 17.3"
              value={mm}
              onChange={(e) => setMm(e.target.value)}
              aria-describedby="f-mm-result"
            />
            <p id="f-mm-result" className="measure-result" aria-live="polite">
              {nearest
                ? `Closest size: US ${nearest[0]} · UK ${nearest[3]} · EU ${nearest[4]}`
                : mm
                  ? "Enter a diameter between 14 and 21 mm; most adult rings fall in that range."
                  : "The matching row lights up in the chart."}
            </p>
          </div>
        </div>
        <div className="table-wrap">
          <table className="size-table">
            <caption>Ring size conversions</caption>
            <thead>
              <tr>
                <th scope="col">US</th>
                <th scope="col">Diameter mm</th>
                <th scope="col">Circumference mm</th>
                <th scope="col">UK</th>
                <th scope="col">EU</th>
              </tr>
            </thead>
            <tbody>
              {care.sizes.map((row) => (
                <tr key={row[0]} data-match={row === nearest || undefined}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th scope="row" key={i}>
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Looking after fine jewellery</h2>
        </div>
        <dl className="promises">
          {care.careGuide.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section faq-section">
        <h2>Warranty, returns and delivery</h2>
        <Faq items={care.faqs} />
        <Link to="/appointments" className="text-link">
          Book a resizing or care appointment{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
