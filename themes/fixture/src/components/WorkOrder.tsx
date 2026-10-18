import { useEffect, useRef, type ReactNode } from "react";
import { estimateOptions, tiers } from "../content";
import { estimate, type EstimateInput } from "../lib/estimate";
import { money } from "../lib/format";

type SheetProps = {
  no: string;
  title: string;
  stamp?: string;
  children: ReactNode;
  className?: string;
};

/** The canary copy of a carbon work-order pad: perforated top, printed field boxes, a stamp when booked. */
export function WorkOrder({
  no,
  title,
  stamp,
  children,
  className = "",
}: SheetProps) {
  return (
    <div className={`wo ${className}`}>
      <div className="work-order">
        <div className="wo-head">
          <span className="wo-title">{title}</span>
          <span className="wo-no">
            No. <b>{no}</b>
          </span>
        </div>
        {children}
      </div>
      {stamp && (
        <span className="wo-stamp" aria-hidden="true">
          {stamp}
        </span>
      )}
    </div>
  );
}

export function WoField({
  label,
  children,
  wide,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="wo-field" data-wide={wide ? "" : undefined}>
      <span className="wo-label">{label}</span>
      <span className="wo-value">{children}</span>
    </div>
  );
}

/** Line items and total for an estimate; lines whose amount just changed get a highlighter pass. */
export function EstimateLines({
  input,
  live,
}: {
  input: EstimateInput;
  live?: boolean;
}) {
  const e = estimate(input);
  const prev = useRef<Record<string, number> | null>(null);
  useEffect(() => {
    prev.current = Object.fromEntries(e.lines.map((l) => [l.key, l.value]));
  });
  const age = estimateOptions.age.find((a) => a.id === input.age);
  const access = estimateOptions.access.find((a) => a.id === input.access);
  const timing = estimateOptions.timing.find((t) => t.id === input.timing);
  const qty = `${input.qty} ${input.qty === 1 ? e.service.model.unit : e.service.model.units}`;

  return (
    <>
      <div className="wo-fields">
        <WoField label="Job" wide>
          {e.service.name}
        </WoField>
        <WoField label="Quantity">{qty}</WoField>
        <WoField label="Built">{age?.label}</WoField>
        <WoField label="Access">{access?.label}</WoField>
        <WoField label="Timing">{timing?.label}</WoField>
        <WoField label="Zone" wide>
          {e.area
            ? `${e.area.name} · ${tiers[e.area.tier].label}`
            : input.zip
              ? `ZIP ${input.zip} — not on our map`
              : "No ZIP given"}
        </WoField>
      </div>
      <table className="wo-lines">
        <caption className="sr-only">Estimate line items</caption>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {e.lines.map((l) => {
            const flash =
              live && prev.current !== null && prev.current[l.key] !== l.value;
            return (
              <tr
                key={flash ? `${l.key}-${l.value}` : l.key}
                data-flash={flash ? "" : undefined}
              >
                <td>{l.label}</td>
                <td>{money(l.value)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Estimate range</th>
            <td>
              <span
                className="wo-total"
                aria-live={live ? "polite" : undefined}
              >
                {money(e.low)} – {money(e.high)}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
