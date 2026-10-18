import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  examSteps,
  faces,
  frames,
  home,
  images,
  included,
  reviews,
  stores,
} from "../content";
import { money } from "../lib/cart";
import { hoursLabel, openStatus } from "../lib/hours";
import { FrameArt } from "../components/FrameArt";
import { FrameCard, stamp } from "../components/FrameCard";
import { FaceOutline } from "../components/FaceOutline";

const tray = ["orla", "hale", "cato", "ines"].map((id) =>
  frames.find((f) => f.id === id)!,
);
const popular = [
  "bram",
  "juno",
  "wren",
  "ash",
  "sol",
  "tove",
  "mika",
  "lido",
].map((id) => frames.find((f) => f.id === id)!);
const sun = frames.filter((f) => f.line === "sun");

export function Home() {
  const today = new Date().getDay();
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="actions">
            <Link to="/frames" className="btn">
              Shop frames from $145 <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/eye-test" className="btn btn-quiet">
              Book an eye test
            </Link>
          </div>
        </div>
        <figure className="hero-photo">
          <img
            src={images.browline}
            alt="Ash glasses in tortoise and gold, open on a white book"
            width={1800}
            height={1200}
          />
        </figure>
        <ul className="tray" aria-label="Four frames from the collection">
          {tray.map((f) => (
            <li key={f.id}>
              <Link to={`/frames/${f.id}`}>
                <FrameArt
                  frame={f}
                  colour={f.colours[0]}
                  className="frame-art"
                />
                <span className="tray-name">{f.name}</span>
                <span className="tray-stamp">{stamp(f.sizes[0])}</span>
                <span className="tray-price">{money(f.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="receipt-band">
        <div className="receipt-intro">
          <h2>{home.priceTitle}</h2>
          <p>{home.priceBody}</p>
          <Link to="/lenses" className="text-link">
            What costs extra, and why{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div
          className="receipt"
          aria-label="Itemised price for Orla in Tortoise"
        >
          <p className="receipt-head">
            <span>Order ticket</span>
            <span>Orla · Tortoise C.02 · 49□21-145</span>
          </p>
          <table>
            <tbody>
              <tr>
                <th scope="row">Orla frame, hand-polished acetate</th>
                <td>$145</td>
              </tr>
              {included.map((i) => (
                <tr key={i.item}>
                  <th scope="row">
                    {i.item}
                    <small>{i.note}</small>
                  </th>
                  <td>$0</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td>$145</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Most tried on this month</h2>
          <Link to="/frames" className="text-link">
            See all {frames.length} frames{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="frame-grid">
          {popular.map((f) => (
            <FrameCard key={f.id} frame={f} />
          ))}
        </div>
      </section>

      <section className="finder-teaser">
        <div>
          <h2>{home.finderTitle}</h2>
          <p>{home.finderBody}</p>
          <Link to="/face-shapes" className="btn">
            Start the face-shape finder{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ul className="face-row">
          {faces.map((face) => {
            const frame = frames.find(
              (f) => f.faces.includes(face.id) && f.line === "optical",
            )!;
            return (
              <li key={face.id}>
                <Link to={`/face-shapes?face=${face.id}`}>
                  <FaceOutline
                    face={face.id}
                    frame={frame}
                    colour={frame.colours[0]}
                    label={`${face.name} face outline wearing ${frame.name}`}
                  />
                  <span>{face.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="sun-band">
        <img
          src={images.clearSun}
          alt="Lido sunglasses in clear acetate with amber lenses, in bright sun beside the sea"
          loading="lazy"
          width={1600}
          height={1066}
        />
        <div className="sun-panel">
          <h2>{home.sunTitle}</h2>
          <p>{home.sunBody}</p>
          <ul className="sun-list">
            {sun.map((f) => (
              <li key={f.id}>
                <Link to={`/frames/${f.id}`}>
                  <span>{f.name}</span>
                  <span>{f.summary}</span>
                  <span>{money(f.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lens-teaser">
        <img
          src={images.trialLenses}
          alt="An optometrist's trial lens case, rows of numbered lenses with a trial frame in front"
          loading="lazy"
          width={1400}
          height={934}
        />
        <div>
          <h2>{home.lensTitle}</h2>
          <p>{home.lensBody}</p>
          <Link to="/lenses" className="text-link">
            Read the lens guide <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="exam-band">
        <div className="exam-photo">
          <img
            src={images.phoropter}
            alt="A patient looking through a phoropter while the optometrist compares lenses"
            loading="lazy"
            width={1600}
            height={1066}
          />
        </div>
        <div className="exam-text">
          <h2>{home.examTitle}</h2>
          <p>{home.examBody}</p>
          <ol className="steps">
            {examSteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <Link to="/stores" className="btn btn-lime exam-cta">
            Exam prices and stores <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Four stores, each with an exam room</h2>
          <Link to="/stores" className="text-link">
            All store details <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="store-lines">
          {stores.map((s) => {
            const status = openStatus(s);
            return (
              <li key={s.id}>
                <Link to={`/stores/${s.id}`}>
                  <span className="store-city">{s.city}</span>
                  <span className="store-name">{s.name}</span>
                  <span>{s.address}</span>
                  <span>Today {hoursLabel(s, today)}</span>
                  <span className="status" data-open={status.open || undefined}>
                    {status.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="reviews" aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="visually-hidden">
          What customers say
        </h2>
        {reviews.map((r) => (
          <figure key={r.name}>
            <blockquote>
              <p>{r.quote}</p>
            </blockquote>
            <figcaption>
              {r.name}
              <span>{r.detail}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="chart-close">
        <h2 aria-label={home.closeLines.join(" ")}>
          {home.closeLines.map((line, i) => (
            <span key={line} className={`chart-line l${i}`} aria-hidden="true">
              {line}
            </span>
          ))}
        </h2>
        <p>{home.closeBody}</p>
        <Link to="/eye-test" className="btn btn-lime">
          Choose a store and time <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
