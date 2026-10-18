import type { ReactNode } from "react";
import { brand } from "../content";
import { annualPremium, money, type Line } from "../lib/quote";
import { Mark } from "./Logo";

type Props = {
  title: string;
  meta: [string, string][];
  lines: Line[];
  monthly: number;
  annual?: boolean;
  /** Extra controls printed at the foot of the sheet (the billing switch in the quote). */
  foot?: ReactNode;
  stamp?: string;
  className?: string;
};

/** The declarations page, drawn as the printed sheet a policy arrives as. Figures re-key so changes flash. */
export function PolicySchedule({
  title,
  meta,
  lines,
  monthly,
  annual = false,
  foot,
  stamp,
  className = "",
}: Props) {
  const total = annual ? annualPremium(monthly) : monthly;
  return (
    <section className={`schedule ${className}`} aria-label={title}>
      <header className="schedule-head">
        <Mark />
        <span>{brand.legal}</span>
      </header>
      <h2 className="schedule-title">{title}</h2>
      <dl className="schedule-meta">
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <table className="schedule-lines">
        <caption className="sr-only">Cover and limits</caption>
        <thead>
          <tr>
            <th scope="col">Section</th>
            <th scope="col">Cover</th>
            <th scope="col">Limit</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.title}>
              <td className="code">{l.code && <span>{l.code}</span>}</td>
              <th scope="row">{l.title}</th>
              <td className="figure">
                <span key={l.value}>{l.value}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="schedule-total">
        <span>{annual ? "Annual premium" : "Monthly premium"}</span>
        <strong key={total}>{money(total)}</strong>
      </p>
      {foot}
      {stamp && (
        <p className="stamp" aria-hidden="true">
          {stamp}
        </p>
      )}
    </section>
  );
}
