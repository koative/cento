import { useState } from "react";
import { ArrowRight, Copy, FileText } from "lucide-react";
import { Link } from "../router";
import { shipments, track, trackSamples, type Shipment } from "../content";
import { TrackForm } from "../components/TrackForm";
import { NetworkMap } from "../components/NetworkMap";
import { ScanLog, StatusPill, Waybill } from "../components/Waybill";
import { hub } from "../lib/geo";
import { mapShare, schedule, timeline } from "../lib/shipment";
import { when } from "../lib/format";

const codes: [string, string][] = [
  ["BKD", "Booked: rate fixed and reference issued"],
  ["PLN", "Planned: collection slot and vehicle assigned"],
  ["COL", "Collected: pallets and seal scanned at the shipper"],
  ["DEP", "Departed a hub, port, terminal or airport"],
  ["ARR", "Arrived at a hub: weighed, measured, photographed"],
  ["OFD", "Out for delivery with a two-hour window"],
  ["POD", "Proof of delivery: signature and photo"],
  ["EXC", "Exception: the cause and the next step"],
];

export function Track() {
  return (
    <>
      <section className="page-head">
        <div className="wrap track-head">
          <h1>{track.h1}</h1>
          <p className="lede">{track.lead}</p>
          <TrackForm />
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap split">
          <div>
            <h2 className="h3">Sample numbers</h2>
            <ul className="sample-links">
              {trackSamples.map((id) => {
                const s = shipments.find((x) => x.id === id)!;
                return (
                  <li key={id}>
                    <Link to={`/track/${id}`}>
                      <span className="num">{id}</span>
                      <span>
                        {hub(s.route[0]).city} →{" "}
                        {hub(s.route[s.route.length - 1]).city}
                      </span>
                      <StatusPill status={s.status} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="h3">Reading a scan history</h2>
            <dl className="code-list">
              {codes.map(([c, t]) => (
                <div key={c}>
                  <dt className="num">{c}</dt>
                  <dd>{t}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function documents(s: Shipment) {
  const docs = [
    s.mode === "air"
      ? "Air waybill"
      : s.mode === "sea"
        ? "Sea waybill"
        : "eCMR consignment note",
    "Booking confirmation",
  ];
  if (s.mode === "sea" || s.route.includes("FXT"))
    docs.push("Customs declaration");
  if (s.status === "Delivered")
    docs.push("Proof of delivery (signature + photo)");
  return docs;
}

export function TrackShipment({ s }: { s: Shipment }) {
  const events = timeline(s);
  const { eta } = schedule(s);
  const from = hub(s.route[0]);
  const to = hub(s.route[s.route.length - 1]);
  const [copied, setCopied] = useState("");

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(
        "Tracking link copied. Anyone with the link sees this page, not prices.",
      );
    } catch {
      setCopied(`Copy this link: ${window.location.href}`);
    }
  }

  return (
    <>
      <section className="page-head track-result-head">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="crumbs">
            <Link to="/track">Track</Link>
            <span aria-hidden>/</span>
            <span className="num">{s.id}</span>
          </nav>
          <div className="track-title">
            <h1 className="num-display">{s.id}</h1>
            <StatusPill status={s.status} />
          </div>
          <p className="lede">
            {from.city} to {to.city}.{" "}
            {s.status === "Delivered"
              ? `Delivered ${when(eta)}, signed by ${s.pod}.`
              : s.status === "Booked"
                ? `Collection planned ${when(new Date(s.pickup))}.`
                : s.status === "Exception"
                  ? "Needs attention: see the latest scan."
                  : `Expected ${when(eta)}.`}
          </p>
        </div>
      </section>

      {s.exception && (
        <div className="wrap">
          <div className="alert" role="note">
            <strong>Exception</strong>
            <p>{s.exception}</p>
          </div>
        </div>
      )}

      <section className="section-tight">
        <div className="wrap track-layout">
          <div className="track-map">
            <NetworkMap
              route={s.route}
              share={mapShare(s)}
              labels="route"
              label={`Route of ${s.id} from ${from.city} to ${to.city}`}
            />
          </div>
          <div className="track-side">
            <Waybill s={s} />
            <div className="track-actions">
              <button type="button" className="btn btn-ghost" onClick={share}>
                <Copy size={16} aria-hidden /> Copy tracking link
              </button>
              <p className="muted small" aria-live="polite">
                {copied}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap split">
          <div>
            <h2>Scan history</h2>
            <ScanLog events={events} />
          </div>
          <div>
            <h2 className="h3">Documents</h2>
            <ul className="doc-list">
              {documents(s).map((d) => (
                <li key={d}>
                  <FileText size={18} aria-hidden />
                  <span>{d}</span>
                  <span className="muted small">PDF · sign in to download</span>
                </li>
              ))}
            </ul>
            <h2 className="h3">Track another</h2>
            <TrackForm compact />
            <Link to="/app" className="text-link">
              See this shipment in the platform demo{" "}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
