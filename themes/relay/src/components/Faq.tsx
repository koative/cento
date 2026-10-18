import type { CSSProperties } from "react";
import { departures } from "../content";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Split-flap style departures board: the Rotterdam yard as a dispatcher sees it. */
export function Departures({ caption }: { caption: string }) {
  return (
    <div className="board">
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Dep</th>
            <th scope="col">Destination</th>
            <th scope="col" className="board-via">
              Service
            </th>
            <th scope="col">Dock</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((d, i) => (
            <tr
              key={d.time + d.to}
              style={{ "--d": `${i * 70}ms` } as CSSProperties}
            >
              <td className="num">{d.time}</td>
              <td>{d.to}</td>
              <td className="board-via">{d.via}</td>
              <td className="num">{d.dock}</td>
              <td
                className={`board-status ${d.status.startsWith("Delayed") ? "late" : d.status === "Gate closed" ? "closed" : d.status === "Loading" ? "now" : ""}`}
              >
                {d.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
