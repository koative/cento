import { useMemo, useState } from "react";
import {
  deliveryKinds,
  upcoming,
  type DeliveryKind,
  type Tier,
} from "../content";

type Delivery = { kind: DeliveryKind; subject: string; preview: string };
type Day = { date: Date; items: Delivery[] };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/** The Almanac ships on the 20th of Feb, May, Aug and Nov. */
const ALMANAC_MONTHS = [1, 4, 7, 10];

function kindsOn(d: Date): DeliveryKind[] {
  const dow = d.getDay();
  const date = d.getDate();
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const kinds: DeliveryKind[] = [];
  if (dow === 0) kinds.push("letter");
  if (dow === 3) kinds.push("field-note");
  if (dow === 5 && date <= 7) kinds.push("audio");
  if (date === 20 && ALMANAC_MONTHS.includes(d.getMonth()))
    kinds.push("almanac");
  if (dow === 4 && date > daysInMonth - 7) kinds.push("call");
  return kinds;
}

/** Every day of next month with what this tier would receive on it. */
function buildMonth(tier: Tier, now: Date): Day[] {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const count = new Date(year, month + 1, 0).getDate();
  const seen: Partial<Record<DeliveryKind, number>> = {};
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const items = kindsOn(date)
      .filter((k) => tier.receives.includes(k))
      .map((kind) => {
        const n = seen[kind] ?? 0;
        seen[kind] = n + 1;
        const pool = upcoming[kind];
        return { kind, ...pool[n % pool.length] };
      });
    return { date, items };
  });
}

export function DeliveryCalendar({ tier }: { tier: Tier }) {
  const days = useMemo(() => buildMonth(tier, new Date()), [tier]);
  const firstWithMail = days.find((d) => d.items.length)!;
  const [picked, setPicked] = useState<number | null>(null);
  const selected =
    days.find((d) => d.date.getDate() === picked && d.items.length) ??
    firstWithMail;

  const monthName = days[0].date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const lead = days[0].date.getDay();
  const totals = days
    .flatMap((d) => d.items)
    .reduce<Partial<Record<DeliveryKind, number>>>(
      (acc, it) => ({ ...acc, [it.kind]: (acc[it.kind] ?? 0) + 1 }),
      {},
    );
  const totalCount = Object.values(totals).reduce((a, b) => a + (b ?? 0), 0);

  return (
    <div className="cal" data-tier={tier.id}>
      <div className="cal-month">
        <div className="cal-top">
          <h3 className="cal-title">{monthName}</h3>
          <p className="cal-sum" aria-live="polite">
            {tier.name}: {totalCount} {totalCount === 1 ? "email" : "emails"}{" "}
            next month
          </p>
        </div>
        <div
          className="cal-grid"
          role="group"
          aria-label={`Deliveries in ${monthName}`}
        >
          {WEEKDAYS.map((w) => (
            <span key={w} className="cal-wd" aria-hidden="true">
              {w}
            </span>
          ))}
          {Array.from({ length: lead }, (_, i) => (
            <span key={`pad-${i}`} className="cal-pad" aria-hidden="true" />
          ))}
          {days.map((d) => {
            const n = d.date.getDate();
            const label = d.date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            });
            if (!d.items.length)
              return (
                <span key={n} className="cal-day" aria-hidden="true">
                  {n}
                </span>
              );
            return (
              <button
                key={n}
                type="button"
                className="cal-day has-mail"
                aria-pressed={d === selected}
                aria-label={`${label}: ${d.items.map((it) => deliveryKinds[it.kind].name).join(", ")}`}
                onClick={() => setPicked(n)}
              >
                <span className="cal-n">{n}</span>
                <span className="cal-marks" aria-hidden="true">
                  {d.items.map((it) => (
                    <i key={it.kind} data-kind={it.kind} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
        <ul className="cal-legend">
          {(Object.keys(deliveryKinds) as DeliveryKind[]).map((k) => (
            <li key={k} data-off={tier.receives.includes(k) ? undefined : ""}>
              <i data-kind={k} aria-hidden="true" />
              {deliveryKinds[k].name}
              <span className="cal-legend-n">
                {totals[k]
                  ? `× ${totals[k]}`
                  : tier.receives.includes(k)
                    ? "not this month"
                    : "not in plan"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <section className="inbox" aria-live="polite" aria-label="Inbox preview">
        <h3 className="inbox-date">
          {selected.date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <ul>
          {selected.items.map((it) => (
            <li key={it.kind} className="mail" data-kind={it.kind}>
              <p className="mail-from">
                <span>{deliveryKinds[it.kind].from}</span>
                <span className="mail-time">{deliveryKinds[it.kind].time}</span>
              </p>
              <p className="mail-subject">{it.subject}</p>
              <p className="mail-preview">{it.preview}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
