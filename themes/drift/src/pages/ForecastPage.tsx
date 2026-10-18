import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { images, lessons, spots } from "../content";
import { Forecast } from "../components/Forecast";

const glossary = [
  [
    "Wave height",
    "Face height in feet at the spot, front to back of the wave. Beginners want 1 to 3 ft; above chest-high, whitewater gets heavy.",
  ],
  [
    "Period",
    "Seconds between waves. Under 8 s is short-period wind swell: weaker and messier. 10 s and up is groundswell: cleaner, more powerful, longer gaps between sets.",
  ],
  [
    "Wind",
    "Offshore wind (from the land, east here) grooms the faces. Onshore wind (from the sea) crumbles them. Most days the sea breeze turns onshore around midday.",
  ],
  [
    "Tide",
    "Gull Point works best from mid to high tide; the Jetty on a low, pushing tide. Big tides can change a spot completely in two hours.",
  ],
];

const pictures = [images.bay, images.lineup, images.barrel];

export function ForecastPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Surf report</h1>
          <p className="lede">
            Seven days of swell, wind and tide for our three spots, rated for
            each lesson level. It's the chart a coach reads each evening before
            setting the next day's lesson times.
          </p>
        </div>
      </section>

      <section className="wrap fc-page" aria-label="Seven-day forecast">
        <Forecast />
      </section>

      <section className="section glossary-band" aria-labelledby="h-read">
        <div className="wrap glossary-grid">
          <div>
            <h2 id="h-read">How to read a surf forecast</h2>
            <p>
              Four numbers decide whether a morning is worth it. Learn these and
              you can plan your own sessions after your lessons end.
            </p>
            <Link to="/camps/central-coast-road-trip" className="text-link">
              We teach this properly on the Road Trip{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <dl className="glossary">
            {glossary.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section" aria-labelledby="h-spots">
        <div className="wrap">
          <div className="section-head">
            <h2 id="h-spots">Our three spots</h2>
            <p>
              All within a ten-minute walk of the hut. We choose between them
              every morning.
            </p>
          </div>
          <ul className="spots">
            {spots.map((s, n) => (
              <li key={s.id}>
                <img
                  src={pictures[n].src}
                  alt={pictures[n].alt}
                  width={pictures[n].w}
                  height={pictures[n].h}
                  loading="lazy"
                />
                <div>
                  <h3>{s.name}</h3>
                  <p className="spot-kind">{s.kind}</p>
                  <p>{s.text}</p>
                  <dl className="spot-facts">
                    <div>
                      <dt>Best tide</dt>
                      <dd>{s.bestTide}</dd>
                    </div>
                    <div>
                      <dt>Lessons</dt>
                      <dd>{lessons.find((l) => l.id === s.bestFor)?.name}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
