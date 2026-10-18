import { ArrowRight, Check } from "lucide-react";
import { navigate } from "../router";
import { deals, dealsCopy, photos, type Deal } from "../content";
import { setDraft } from "../lib/booking";

function use(deal: Deal) {
  setDraft({ code: deal.code, step: 1 });
  navigate("/book");
}

export function Deals() {
  const [lead, ...rest] = deals;
  const leadPic = photos[lead.photo];

  return (
    <>
      <section className="page-head wrap">
        <h1>{dealsCopy.title}</h1>
        <p className="lede">{dealsCopy.intro}</p>
      </section>

      <section className="wrap deal-lead" aria-labelledby={`deal-${lead.code}`}>
        <img
          src={leadPic.src}
          alt={leadPic.alt}
          width={leadPic.w}
          height={leadPic.h}
        />
        <div className="ticket">
          <p className="code code-lg">{lead.code}</p>
          <h2 id={`deal-${lead.code}`}>{lead.title}</h2>
          <p>{lead.summary}</p>
          <ul className="ticks">
            {lead.terms.map((t) => (
              <li key={t}>
                <Check aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className="deal-until">Book by {lead.until}</p>
          <button
            type="button"
            className="btn btn-sign"
            onClick={() => use(lead)}
          >
            Book with {lead.code} <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="section wrap" aria-label="More deals">
        <ul className="deal-list">
          {rest.map((d) => {
            const p = photos[d.photo];
            return (
              <li key={d.code} className="ticket ticket-row">
                <img
                  src={p.src}
                  alt=""
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                />
                <div className="ticket-main">
                  <p className="code">{d.code}</p>
                  <h2>{d.title}</h2>
                  <p>{d.summary}</p>
                </div>
                <ul className="ticket-terms">
                  {d.terms.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                  <li className="deal-until">Book by {d.until}</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => use(d)}
                >
                  Book with {d.code}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="muted deals-note">
          One code per booking. The booking checks your dates, car and stations
          and tells you exactly why if a code doesn't fit.
        </p>
      </section>
    </>
  );
}
