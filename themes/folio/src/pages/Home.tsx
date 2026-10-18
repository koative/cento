import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  artists,
  events,
  exhibitionBySlug,
  exhibitions,
  home,
  images,
  shop,
  workById,
  works,
} from "../content";
import { dateRange, eventDate, openState } from "../lib/format";
import { ExhibitionCard, ShopCard, artistNames } from "../components/Cards";
import { WorkCard, WorkPlate } from "../components/WorkCard";
import { ScaleView } from "../components/ScaleView";

export function Home() {
  const [lead, ...alsoOn] = exhibitions.filter((e) => e.status === "current");
  const leadWork = workById(lead.works[0])!;
  const upcoming = exhibitions.filter((e) => e.status === "upcoming");
  const forSale = works
    .filter((w) => w.viewingRoom && w.status === "available")
    .slice(0, 4);
  const scaleWork = workById("measured-light-7")!;
  const [active, setActive] = useState(artists[0].slug);
  const activeWork = works.find((w) => w.artist === active)!;
  const state = openState(new Date());

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-text">
          <h1 id="hero-title" className="display">
            {lead.title}
          </h1>
          <p className="hero-artist">{artistNames(lead)}</p>
          <p className="hero-meta">
            <time dateTime={lead.opens}>
              {dateRange(lead.opens, lead.closes)}
            </time>
            <span>{lead.space}</span>
            <span>Free entry</span>
          </p>
          <p className="lede">{lead.summary}</p>
          <div className="actions">
            <Link to={`/exhibitions/${lead.slug}`} className="btn">
              See the exhibition
            </Link>
            <Link to="/viewing-room" className="btn btn-ghost">
              Prices in the viewing room
            </Link>
          </div>
        </div>
        <figure className="hero-wall">
          <Link
            to={`/viewing-room/${leadWork.id}`}
            aria-label={`${leadWork.title}, view details`}
          >
            <WorkPlate work={leadWork} className="plate-hero" />
          </Link>
          <figcaption>
            <cite>{leadWork.title}</cite>, {leadWork.year}. {leadWork.medium},{" "}
            {leadWork.h} × {leadWork.w} cm
          </figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="also-title">
        <div className="section-head">
          <h2 id="also-title">Also on view</h2>
          <Link to="/exhibitions" className="text-link">
            All exhibitions <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="ex-pair">
          {alsoOn.map((ex) => (
            <ExhibitionCard key={ex.slug} ex={ex} />
          ))}
        </div>
      </section>

      <section className="bleed" aria-labelledby="visit-strip-title">
        <img
          src={images.facade}
          alt="The brick corner of the gallery building against a clear blue sky"
          loading="lazy"
          width={1600}
          height={1067}
        />
        <div className="bleed-text">
          <h2 id="visit-strip-title">
            Three rooms on Tanner Street, always free
          </h2>
          <p>
            <span
              className="open-dot"
              data-open={state.open || undefined}
              aria-hidden="true"
            />
            {state.text}. Thursdays open late until 20:00.
          </p>
          <Link to="/visit" className="text-link">
            Plan your visit <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="vr-title">
        <div className="section-head">
          <h2 id="vr-title">In the viewing room</h2>
          <p className="section-note">
            Every available work, with its price on the label. Save works to a
            list and ask about them together.
          </p>
        </div>
        <div className="work-grid">
          {forSale.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
        <Link to="/viewing-room" className="btn btn-ghost section-cta">
          Open the viewing room
        </Link>
      </section>

      <section className="section scale-section" aria-labelledby="scale-title">
        <div className="scale-intro">
          <h2 id="scale-title">See it at true scale</h2>
          <p>
            Screens make every painting the same size. Hang{" "}
            <cite>{scaleWork.title}</cite> on a gallery wall, a living room or a
            hallway, set the height, and see how much room {scaleWork.w}{" "}
            centimetres really takes. Every work in the viewing room has this
            view.
          </p>
        </div>
        <ScaleView work={scaleWork} />
      </section>

      <section className="section roster" aria-labelledby="roster-title">
        <h2 id="roster-title">Artists</h2>
        <div className="roster-body">
          <ul className="roster-list">
            {artists.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/artists/${a.slug}`}
                  onMouseEnter={() => setActive(a.slug)}
                  onFocus={() => setActive(a.slug)}
                  data-current={active === a.slug || undefined}
                >
                  <span className="roster-name">{a.name}</span>
                  <span className="roster-practice">{a.practice}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="roster-preview" aria-hidden="true">
            <WorkPlate
              work={activeWork}
              key={activeWork.id}
              className="plate-preview"
            />
            <p>
              <cite>{activeWork.title}</cite>, {activeWork.year}
            </p>
          </div>
        </div>
      </section>

      <section className="section events" aria-labelledby="events-title">
        <div className="section-head">
          <h2 id="events-title">Talks, tours and late nights</h2>
          <p className="section-note">
            All free. Places are limited where noted.
          </p>
        </div>
        <ol className="event-list">
          {events.map((ev) => {
            const ex = exhibitionBySlug(ev.exhibition);
            return (
              <li key={ev.id}>
                <time dateTime={`${ev.date}T${ev.time}`}>
                  <span>{eventDate(ev.date)}</span>
                  <span>{ev.time}</span>
                </time>
                <span className="event-kind">{ev.kind}</span>
                <div>
                  <h3>{ev.title}</h3>
                  <p>
                    {ev.detail}{" "}
                    {ex && (
                      <Link to={`/exhibitions/${ex.slug}`}>{ex.title}</Link>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section" aria-labelledby="next-title">
        <div className="section-head">
          <h2 id="next-title">Coming next</h2>
        </div>
        <div className="ex-pair">
          {upcoming.map((ex) => (
            <ExhibitionCard key={ex.slug} ex={ex} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="shop-title">
        <div className="section-head">
          <h2 id="shop-title">Editions and books</h2>
          <Link to="/shop" className="text-link">
            Visit the shop <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="shop-grid">
          {shop.slice(0, 4).map((item) => (
            <ShopCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <img
          src={images.doorway}
          alt=""
          loading="lazy"
          width={1800}
          height={1295}
        />
        <div className="close-text">
          <h2 id="close-title">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <Link to="/enquire" className="btn">
            Book a private viewing
          </Link>
        </div>
      </section>
    </>
  );
}
