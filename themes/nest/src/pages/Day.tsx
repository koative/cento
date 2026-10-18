import { ArrowRight, NotebookPen } from "lucide-react";
import { Link } from "../router";
import { images, menu } from "../content";
import { DayTimeline } from "../components/DayTimeline";
import { TourCta } from "../components/TourCta";

export function Day() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>A day at Nest</h1>
          <p className="lede">
            Pick an age group and scrub through the day. If you're reading this
            between 7:45 and 6:00 on a weekday, we'll show you what's happening
            in the rooms right now.
          </p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="wrap">
          <DayTimeline />
        </div>
      </section>

      <section className="section section-oat">
        <div className="wrap notes-block">
          <div>
            <h2>
              <NotebookPen aria-hidden="true" /> Nest Notes, the day as it
              happens
            </h2>
            <p>
              Every meal, sleep and diaper change goes into our parent app
              within minutes, with a photo or two from the room. At pickup your
              key person fills in the bits a log can't: what made them laugh,
              who they played with, what they were brave about.
            </p>
            <ul className="ticks-plain">
              <li>Sleep start and end times, for babies and twos</li>
              <li>What and how much they ate at each meal</li>
              <li>Diaper changes and potty trips</li>
              <li>Photos from projects, the garden and Forest Fridays</li>
              <li>Messages to and from the room, and your invoices</li>
            </ul>
          </div>
          <figure>
            <img
              src={images.rings.src}
              alt={images.rings.alt}
              width={images.rings.w}
              height={images.rings.h}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Outside, every day</h2>
            <p>
              The garden door is open most of the day. Waterproofs, boots and
              sun hats live here, so nobody misses out because of the weather.
              Larks and Owls spend every Friday morning in Elmbridge Woods with
              Ben.
            </p>
          </div>
          <div className="split-head">
            <h2>Three meals, one kitchen</h2>
            <p>
              {menu.note} Rosa posts the week's menu on the board by the door
              and in Nest Notes every Friday.
            </p>
            <Link to="/parents" className="text-link">
              Food, allergies and the full menu{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <TourCta title="See a real day, not a show day." />
    </>
  );
}
