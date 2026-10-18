import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { hire, images, lessons, packs } from "../content";
import { money } from "../lib/util";

export function Lessons() {
  const [packId, setPackId] = useState<(typeof packs)[number]["id"]>("single");
  const pack = packs.find((p) => p.id === packId) ?? packs[0];

  return (
    <>
      <section className="page-head">
        <div className="wrap page-head-grid">
          <div>
            <h1>Lessons at Gull Point</h1>
            <p className="lede">
              Group lessons for three stages of learning, private sessions for
              anyone, and a Saturday club for kids. Every lesson includes a
              board, a wetsuit and a coach in the water beside you.
            </p>
          </div>
          <fieldset className="pills pack-toggle">
            <legend>Show prices for</legend>
            {packs.map((p) => (
              <label key={p.id}>
                <input
                  type="radio"
                  name="pack"
                  value={p.id}
                  checked={p.id === packId}
                  onChange={() => setPackId(p.id)}
                />
                <span>
                  {p.label}
                  {p.discount ? (
                    <small> −{Math.round(p.discount * 100)}%</small>
                  ) : null}
                </span>
              </label>
            ))}
          </fieldset>
          <p className="sr-only" aria-live="polite">
            Showing prices for {pack.label.toLowerCase()}
          </p>
        </div>
      </section>

      <section className="wrap lesson-list" aria-label="Lessons">
        {lessons.map((l) => {
          const each = l.packs
            ? Math.round(l.price * (1 - pack.discount))
            : l.price;
          return (
            <article key={l.id} className="lesson" id={l.id}>
              <img
                src={l.image.src}
                alt={l.image.alt}
                width={l.image.w}
                height={l.image.h}
                loading="lazy"
                style={{ objectPosition: l.image.pos }}
              />
              <div className="lesson-body">
                <h2>{l.name}</h2>
                <p className="lesson-who">{l.who}</p>
                <p>{l.summary}</p>
                <h3>You'll work on</h3>
                <ul className="ticks">
                  {l.learn.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <aside className="lesson-price" aria-label={`${l.name} price`}>
                <dl>
                  <div>
                    <dt>Length</dt>
                    <dd>{l.duration}</dd>
                  </div>
                  <div>
                    <dt>Group</dt>
                    <dd>{l.ratio}</dd>
                  </div>
                </dl>
                <p className="price">
                  <span className="num">{money(each)}</span>
                  <small>
                    {l.priceNote}
                    {l.packs && pack.count > 1
                      ? `, per lesson in a ${pack.count}-pack (${money(each * pack.count)})`
                      : ""}
                    {!l.packs && pack.count > 1 ? ", not part of packs" : ""}
                  </small>
                </p>
                <Link to={`/book?lesson=${l.id}`} className="btn btn-ink">
                  Book {l.name} <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </aside>
            </article>
          );
        })}
      </section>

      <section className="section times-band" aria-labelledby="h-times">
        <div className="wrap times-grid">
          <img
            src={images.bay.src}
            alt={images.bay.alt}
            width={images.bay.w}
            height={images.bay.h}
            loading="lazy"
          />
          <div>
            <h2 id="h-times">Why we don't have a timetable</h2>
            <p>
              Gull Point at low tide is a different beach from Gull Point at
              high tide, and the afternoon sea breeze turns clean lines into
              chop by about one o'clock. So lesson times follow the water.
            </p>
            <p>
              You pick a day and a preferred start. A coach reads the forecast
              that evening and texts you the confirmed time by 7 pm, usually
              within an hour of what you chose. If the ocean is unsafe or
              unteachable, we move or refund the lesson.
            </p>
            <Link to="/forecast" className="text-link">
              See this week's surf report{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-hire">
        <div className="wrap">
          <div className="section-head">
            <h2 id="h-hire">Boards, wetsuits and hire</h2>
            <p>
              Already surfing? Hire from the hut by the day. Lesson-goers can
              upgrade to a hard board once a coach says you're ready.
            </p>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">With a lesson</th>
                  <th scope="col">Hire only</th>
                </tr>
              </thead>
              <tbody>
                {hire.map((r) => (
                  <tr key={r.item}>
                    <th scope="row">{r.item}</th>
                    <td>{r.lesson}</td>
                    <td className="num">{r.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
