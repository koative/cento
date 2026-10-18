import { Link } from "../router";
import {
  brand,
  faqs,
  hours,
  houseRules,
  images,
  kitchen,
  kitchenHours,
  taproomIntro,
} from "../content";
import { money, openStatus } from "../lib/util";
import { TapBoard } from "../components/TapBoard";
import { FlightBuilder } from "../components/FlightBuilder";
import { HoursTable } from "../components/HoursTable";

const tagNames: Record<string, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  NA: "Alcohol-free",
};

export function Taproom() {
  const status = openStatus(hours);
  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>{taproomIntro.title}</h1>
          <p className="lede">{taproomIntro.text}</p>
          <p className="status-line" data-open={status.open ? "" : undefined}>
            {status.label} · {brand.street}
          </p>
        </div>
        <figure className="page-head-figure">
          <img
            src={images.flight}
            alt="A flight of four beers, pale gold to ruby, in a wooden paddle on the bar"
            width={1600}
            height={1080}
          />
        </figure>
      </header>

      <section className="section section-board" aria-labelledby="taps-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="taps-title">On tap</h2>
            <p>{taproomIntro.growler}</p>
          </div>
          <TapBoard caption="Taproom tap list with pour sizes and prices" />
        </div>
      </section>

      <section className="section" aria-labelledby="flight-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="flight-title">Build your flight</h2>
            <p>
              Four 5 oz pours for $14. Choose them here, then read the tap
              numbers to the bar — we'll pour them in the order shown.
            </p>
          </div>
          <FlightBuilder id="taproom" />
        </div>
      </section>

      <section
        className="section section-kitchen"
        aria-labelledby="kitchen-title"
      >
        <div className="wrap kitchen">
          <div className="kitchen-head">
            <h2 id="kitchen-title">From the kitchen hatch</h2>
            <p>{kitchenHours}</p>
            <figure>
              <img
                src={images.pretzel}
                alt="A golden soft pretzel with coarse salt on a wooden board"
                loading="lazy"
                width={1200}
                height={900}
              />
            </figure>
          </div>
          <div className="kitchen-menu">
            {kitchen.map((group) => (
              <div key={group.title} className="menu-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((d) => (
                    <li key={d.name} className="menu-item">
                      <p className="menu-line">
                        <span className="menu-name">{d.name}</span>
                        <span className="menu-dots" aria-hidden="true" />
                        <span className="menu-price tnum">
                          {money(d.price)}
                        </span>
                      </p>
                      <p className="menu-text">
                        {d.text}
                        {d.tags?.map((t) => (
                          <abbr
                            key={t}
                            title={tagNames[t]}
                            className="menu-tag"
                          >
                            {t}
                          </abbr>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rules-title">
        <div className="wrap visit">
          <div className="visit-copy">
            <h2 id="rules-title">House rules & hours</h2>
            <HoursTable />
            <p>
              Groups of ten or more:{" "}
              <Link to="/tours">book a private tour</Link> and we'll hold a
              table.
            </p>
          </div>
          <figure className="visit-figure">
            <img
              src={images.yard}
              alt="Friends at picnic tables on a gravel beer yard under shade trees"
              loading="lazy"
              width={1800}
              height={899}
            />
          </figure>
          <ul className="rules">
            {houseRules.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-faq" aria-labelledby="faq-title">
        <div className="wrap faq">
          <h2 id="faq-title">Before you come</h2>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
