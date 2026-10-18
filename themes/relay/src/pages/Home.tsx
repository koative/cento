import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, navigate } from "../router";
import {
  home,
  modeLabel,
  network,
  services,
  shipments,
  trackSamples,
} from "../content";
import containerTrain from "../assets/container-train.jpg";
import { NetworkMap } from "../components/NetworkMap";
import { TrackForm } from "../components/TrackForm";
import { ScanLog, StatusPill, Waybill } from "../components/Waybill";
import { QuoteCalculator } from "../components/QuoteCalculator";
import { Departures } from "../components/Faq";
import { draft, type QuoteInput } from "../lib/quote";
import { mapShare, timeline } from "../lib/shipment";
import { hub } from "../lib/geo";
import { eur } from "../lib/format";

const flowCodes = ["BKD", "COL", "SRT", "LHL", "POD"];

export default function Home() {
  const [sel, setSel] = useState(trackSamples[0]);
  const s = shipments.find((x) => x.id === sel) ?? shipments[0];
  const [q, setQ] = useState<QuoteInput>(draft.current);
  const appRows = shipments.slice(0, 5);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.h1}</h1>
            <p className="lede">{home.lead}</p>
            <TrackForm />
            <div className="samples">
              <p id="sample-label">{home.trackHint}</p>
              <div
                className="sample-list"
                role="group"
                aria-labelledby="sample-label"
              >
                {trackSamples.map((id) => {
                  const x = shipments.find((y) => y.id === id)!;
                  return (
                    <button
                      key={id}
                      type="button"
                      className="sample"
                      aria-pressed={sel === id}
                      onClick={() => setSel(id)}
                    >
                      <span className="num">{id}</span>
                      <small>
                        {hub(x.route[0]).code} →{" "}
                        {hub(x.route[x.route.length - 1]).code} · {x.status}
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hero-board">
            <NetworkMap
              route={s.route}
              share={mapShare(s)}
              labels="all"
              label={`Network map of 22 Relay hubs with ${s.id} on its route from ${hub(s.route[0]).city} to ${hub(s.route[s.route.length - 1]).city}`}
            />
            <div className="hero-label">
              <Waybill s={s} />
              <div className="hero-scans" aria-live="polite">
                <ScanLog events={timeline(s)} limit={2} />
                <Link to={`/track/${s.id}`} className="text-link">
                  Full tracking record <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{home.modesTitle}</h2>
            <p>{home.modesText}</p>
          </div>
          <ul className="rate-board">
            {services.map((sv) => (
              <li key={sv.slug}>
                <Link to={`/services/${sv.slug}`}>
                  <span className={`mode-tag mode-${sv.mode}`}>
                    {modeLabel[sv.mode]}
                  </span>
                  <span className="rb-name">{sv.name}</span>
                  <span className="rb-summary">{sv.summary}</span>
                  <span className="rb-transit num">{sv.transit}</span>
                  <span className="rb-from num">{sv.from}</span>
                  <ArrowRight size={18} aria-hidden className="rb-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-grid">
          <figure className="band-photo">
            <img
              src={network.image}
              alt={network.imageAlt}
              width={1800}
              height={1269}
              loading="lazy"
            />
            <figcaption className="num">
              Port of Antwerp, container cranes at dusk
            </figcaption>
          </figure>
          <div className="band-copy">
            <h2>{home.bandTitle}</h2>
            <p>{home.bandText}</p>
            <Link to="/network" className="btn btn-ghost">
              See hubs and cut-offs <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="wrap quote-home">
          <div className="section-head">
            <h2>{home.quoteTitle}</h2>
            <p>{home.quoteText}</p>
          </div>
          <QuoteCalculator q={q} set={setQ} compact />
          <div className="quote-home-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                draft.current = q;
                navigate("/quote");
              }}
            >
              Continue to booking <ArrowRight size={18} aria-hidden />
            </button>
            <Link to="/quote" className="text-link">
              Add options and compare modes
            </Link>
          </div>
        </div>
      </section>

      <section className="section flow-section">
        <div className="wrap">
          <h2>{home.flowTitle}</h2>
          <ol className="flow">
            {home.flow.map((f, i) => (
              <li key={f.title}>
                <span className="flow-code num">{flowCodes[i]}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section platform-teaser">
        <div className="wrap split">
          <div>
            <h2>{home.platformTitle}</h2>
            <p className="lede-sm">{home.platformText}</p>
            <ul className="ticks">
              {home.platformPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="actions">
              <Link to="/app" className="btn btn-primary">
                Open the shipments demo <ArrowUpRight size={18} aria-hidden />
              </Link>
              <Link to="/platform" className="btn btn-ghost">
                Platform tour
              </Link>
            </div>
          </div>
          <div
            className="mock"
            aria-label="Preview of the shipment list in the Relay platform"
            role="img"
          >
            <div className="mock-bar">
              <span>Shipments</span>
              <span className="num">16 open · 2 exceptions</span>
            </div>
            <table aria-hidden="true">
              <tbody>
                {appRows.map((r) => (
                  <tr key={r.id}>
                    <td className="num">{r.id}</td>
                    <td>
                      {hub(r.route[0]).code} →{" "}
                      {hub(r.route[r.route.length - 1]).code}
                    </td>
                    <td>
                      <StatusPill status={r.status} />
                    </td>
                    <td className="num">{eur(r.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="night-band">
        <div className="wrap board-wrap">
          <div className="board-head">
            <h2>{home.boardTitle}</h2>
            <p>{home.boardNote}</p>
          </div>
          <Departures caption={home.boardTitle} />
        </div>
      </section>

      <section className="section">
        <div className="wrap testimonial">
          <img
            src={containerTrain}
            alt="A container train curving along the tracks toward Hamburg harbour"
            width={933}
            height={1400}
            loading="lazy"
          />
          <figure>
            <blockquote>
              <p>“{home.quote.text}”</p>
            </blockquote>
            <figcaption>
              <strong>{home.quote.name}</strong>
              <span>{home.quote.role}</span>
            </figcaption>
            <Link to="/customers" className="text-link">
              Read four customer stories <ArrowRight size={16} aria-hidden />
            </Link>
          </figure>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-row">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/quote" className="btn btn-primary btn-lg">
              Get a fixed rate
            </Link>
            <Link to="/network" className="btn btn-ghost btn-lg">
              Check cut-off times
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
