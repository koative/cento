import { useState, type FormEvent } from "react";
import { Clock } from "lucide-react";
import { care, deliveryFaq, deliveryWindows, zones } from "../content";
import { Link } from "../router";
import { money } from "../lib/cart";
import {
  cutoffMessage,
  earliest,
  longDate,
  useNow,
  zoneFor,
} from "../lib/delivery";

export function Delivery() {
  const now = useNow();
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  function check(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) {
      setResult({ ok: false, text: "Type a postcode first, like EB4 2LT." });
      return;
    }
    const zone = zoneFor(code);
    setResult(
      zone
        ? {
            ok: true,
            text: `Yes, ${code.trim().toUpperCase()} is in ${zone.name} (${zone.areas}). Delivery costs ${money(zone.fee)}; the earliest we can be there is ${longDate(earliest(now, zone.sameDay))}.`,
          }
        : {
            ok: false,
            text: `We don't reach ${code.trim().toUpperCase()} yet. We deliver to EB1–EB12, or you can collect from the studio for free.`,
          },
    );
  }

  return (
    <>
      <header className="page-head">
        <h1>Delivery &amp; FAQ</h1>
        <p className="lead">
          One van, one driver, a dozen postcodes. Here is exactly where we go,
          when, and what happens if nobody is home.
        </p>
        <p className="cutoff">
          <Clock size={18} aria-hidden="true" />
          {cutoffMessage(now)}
        </p>
      </header>

      <section
        className="section checker surface-tissue"
        aria-labelledby="check"
      >
        <h2 id="check">Do we deliver to you?</h2>
        <form className="checker-form" onSubmit={check} noValidate>
          <div className="field">
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="EB4 2LT"
              autoComplete="postal-code"
              aria-describedby="postcode-result"
            />
          </div>
          <button type="submit" className="btn">
            Check
          </button>
        </form>
        <p
          id="postcode-result"
          className="checker-result"
          aria-live="polite"
          data-error={result && !result.ok ? "" : undefined}
        >
          {result?.text}
        </p>
      </section>

      <section className="section" aria-labelledby="zones">
        <h2 id="zones">Zones and fees</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Zone</th>
                <th scope="col">Neighbourhoods</th>
                <th scope="col">Postcodes</th>
                <th scope="col" className="num">
                  Fee
                </th>
                <th scope="col">Same day</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z) => (
                <tr key={z.id}>
                  <th scope="row">{z.name}</th>
                  <td>{z.areas}</td>
                  <td>
                    EB{z.districts[0]}–EB{z.districts[z.districts.length - 1]}
                  </td>
                  <td className="num">{money(z.fee)}</td>
                  <td>{z.sameDay ? "Order by 1 pm" : "Next day only"}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Studio pickup</th>
                <td>14 Larkspur Row</td>
                <td>Any</td>
                <td className="num">Free</td>
                <td>Ready from 10 am</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="h3 windows-title">Delivery windows</h3>
        <ul className="windows">
          {deliveryWindows.map((w) => (
            <li key={w.id}>
              {w.label}
              <span>{w.price ? "+" + money(w.price) : "Included"}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section care-section" aria-labelledby="care">
        <h2 id="care">When they arrive</h2>
        <ol className="care-list">
          {care.map((c) => (
            <li key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
        <Link to="/journal/tulips-that-last" className="text-link">
          The full tulip care guide
        </Link>
      </section>

      <section className="section faq-section" aria-labelledby="faq">
        <h2 id="faq">Questions we get every day</h2>
        <div className="faq">
          {deliveryFaq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
