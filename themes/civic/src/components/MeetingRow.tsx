import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { Meeting } from "../content";
import { timeOf } from "../lib/city";

export function MeetingRow({ m }: { m: Meeting }) {
  const d = new Date(m.starts);
  return (
    <li className="meeting-row">
      <div className="date-plate" aria-hidden="true">
        <span>{d.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong>{d.getDate()}</strong>
      </div>
      <div>
        <h3>
          <Link to={`/council/${m.id}`}>
            {m.body}{" "}
            <span className="visually-hidden">
              ,{" "}
              {d.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
            </span>
          </Link>
        </h3>
        <p className="meeting-line">
          {d.toLocaleDateString("en-US", { weekday: "long" })}{" "}
          {timeOf(m.starts)} · {m.room}
        </p>
        <p>{m.summary}</p>
      </div>
      <ArrowRight size={20} aria-hidden="true" className="row-go" />
    </li>
  );
}
