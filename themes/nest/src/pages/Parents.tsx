import { useState } from "react";
import { closures, faqs, menu, packList, policies, settling } from "../content";
import { TourCta } from "../components/TourCta";

const sections = [
  { id: "settling", label: "Settling in" },
  { id: "pack", label: "What to pack" },
  { id: "food", label: "Food & allergies" },
  { id: "policies", label: "Policies" },
  { id: "closures", label: "Closures" },
  { id: "faq", label: "FAQ" },
];

export function Parents() {
  const [packed, setPacked] = useState<string[]>([]);
  const jump = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    el?.focus({ preventScroll: true });
  };

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Parent info</h1>
          <p className="lede">
            Everything we'd tell you over a cup of tea at your first visit: how
            settling in works, what to pack, food, sickness, closures and the
            questions everyone asks.
          </p>
          <div className="jump" role="group" aria-label="Jump to a section">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className="chip"
                onClick={() => jump(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        id="settling"
        tabIndex={-1}
        aria-labelledby="settling-h"
      >
        <div className="wrap split">
          <div className="split-head">
            <h2 id="settling-h">Settling in, over about two weeks</h2>
            <p>
              Every child is different, so these steps stretch or shrink. You'll
              never be asked to leave a child who isn't ready.
            </p>
          </div>
          <ol className="steps">
            {settling.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section section-oat"
        id="pack"
        tabIndex={-1}
        aria-labelledby="pack-h"
      >
        <div className="wrap split">
          <div className="split-head">
            <h2 id="pack-h">What to pack</h2>
            <p>
              Label everything. Boots and waterproofs stay at Nest on your
              child's peg. Tick things off as you go; this list is just for you.
            </p>
            <p className="quiet" aria-live="polite">
              {packed.length} of {packList.length} packed
            </p>
          </div>
          <ul className="pack">
            {packList.map((item) => (
              <li key={item}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={packed.includes(item)}
                    onChange={(e) =>
                      setPacked((p) =>
                        e.target.checked
                          ? [...p, item]
                          : p.filter((x) => x !== item),
                      )
                    }
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section"
        id="food"
        tabIndex={-1}
        aria-labelledby="food-h"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="food-h">Food & allergies</h2>
            <p>{menu.note}</p>
          </div>
          <div
            className="menu-board"
            role="region"
            aria-label={menu.week}
            tabIndex={0}
          >
            <table>
              <caption>{menu.week}</caption>
              <thead>
                <tr>
                  <td />
                  {menu.meals.map((m) => (
                    <th key={m} scope="col">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {menu.days.map((d) => (
                  <tr key={d.day}>
                    <th scope="row">{d.day}</th>
                    {d.items.map((it) => (
                      <td key={it}>{it}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="section section-oat"
        id="policies"
        tabIndex={-1}
        aria-labelledby="policies-h"
      >
        <div className="wrap split">
          <div className="split-head">
            <h2 id="policies-h">The policies you'll actually need</h2>
            <p>
              The full documents are in Nest Notes and on the board by the
              office. Here's the short version.
            </p>
          </div>
          <dl className="policy-list">
            {policies.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="section"
        id="closures"
        tabIndex={-1}
        aria-labelledby="closures-h"
      >
        <div className="wrap split">
          <div className="split-head">
            <h2 id="closures-h">Closures, 2026–27</h2>
            <p>
              We're open 50 weeks a year. These days are already built into the
              monthly fee.
            </p>
          </div>
          <table className="week-table">
            <caption className="sr-only">Closure dates</caption>
            <tbody>
              {closures.map((c) => (
                <tr key={c.when}>
                  <th scope="row" className="num">
                    {c.when}
                  </th>
                  <td>{c.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="section section-oat"
        id="faq"
        tabIndex={-1}
        aria-labelledby="faq-h"
      >
        <div className="wrap split">
          <div className="split-head">
            <h2 id="faq-h">Questions parents ask</h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <TourCta title="Still wondering? Ask us in person." />
    </>
  );
}
