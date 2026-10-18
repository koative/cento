import { modeLabel, services, type Shipment, type Status } from "../content";
import { hub } from "../lib/geo";
import { num, when } from "../lib/format";
import { schedule, type ScanEvent } from "../lib/shipment";

const tone: Record<Status, string> = {
  Booked: "neutral",
  "In transit": "info",
  "Out for delivery": "info",
  Delivered: "ok",
  Exception: "bad",
};

export function StatusPill({ status }: { status: Status }) {
  return <span className={`pill pill-${tone[status]}`}>{status}</span>;
}

/** Decorative barcode drawn from the tracking number’s characters (not a scannable symbology). */
export function Barcode({ value }: { value: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of value.replace(/-/g, "")) {
    const code = ch.charCodeAt(0);
    for (let i = 0; i < 4; i++) {
      const w = ((code >> i) & 3) + 1;
      if (i % 2 === 0) bars.push({ x, w });
      x += w + 1;
    }
  }
  return (
    <svg
      className="barcode"
      viewBox={`0 0 ${x} 40`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} width={b.w} height="40" />
      ))}
    </svg>
  );
}

/** The shipment as a printed consignment label: the core object of the Relay world. */
export function Waybill({ s }: { s: Shipment }) {
  const from = hub(s.route[0]);
  const to = hub(s.route[s.route.length - 1]);
  const { eta, distance } = schedule(s);
  const service = services.find((x) => x.slug === s.service);
  return (
    <article className="waybill" aria-label={`Consignment ${s.id}`}>
      <header className="waybill-head">
        <span className="waybill-id num">{s.id}</span>
        <StatusPill status={s.status} />
      </header>
      <div className="waybill-route">
        <div>
          <span className="wb-code">{from.code}</span>
          <span className="wb-city">{from.city}</span>
        </div>
        <svg viewBox="0 0 60 12" aria-hidden="true" className="wb-arrow">
          <path
            d="M0 6h54M48 1l6 5-6 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div>
          <span className="wb-code">{to.code}</span>
          <span className="wb-city">{to.city}</span>
        </div>
      </div>
      <dl className="waybill-grid">
        <div>
          <dt>{s.status === "Delivered" ? "Delivered" : "ETA"}</dt>
          <dd className="num">
            {s.status === "Booked"
              ? `Collect ${when(new Date(s.pickup))}`
              : when(eta)}
          </dd>
        </div>
        <div>
          <dt>Service</dt>
          <dd>{service?.name ?? modeLabel[s.mode]}</dd>
        </div>
        <div>
          <dt>Load</dt>
          <dd className="num">
            {s.pallets} plt · {num(s.weight)} kg
          </dd>
        </div>
        <div>
          <dt>Distance</dt>
          <dd className="num">{num(distance)} km</dd>
        </div>
        <div className="wide">
          <dt>Unit</dt>
          <dd className="num">{s.unit}</dd>
        </div>
      </dl>
      <Barcode value={s.id} />
    </article>
  );
}

export function ScanLog({
  events,
  limit,
}: {
  events: ScanEvent[];
  limit?: number;
}) {
  const list = limit ? events.slice(0, limit) : events;
  return (
    <ol className="scan-log">
      {list.map((e, i) => (
        <li
          key={`${e.code}-${i}`}
          className={e.tone ? `is-${e.tone}` : undefined}
        >
          <span className="scan-code num">{e.code}</span>
          <div>
            <p className="scan-text">{e.text}</p>
            <p className="scan-meta num">
              <time dateTime={e.at.toISOString()}>{when(e.at)}</time> ·{" "}
              {e.place}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
