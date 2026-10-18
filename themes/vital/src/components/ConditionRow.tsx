import {
  ArrowRight,
  MessageSquareText,
  CalendarClock,
  Video,
} from "lucide-react";
import { Link } from "../router";
import { visitTypes, type Condition, type VisitType } from "../content";
import { money } from "../lib/care";

export const visitIcon: Record<VisitType, typeof Video> = {
  video: Video,
  message: MessageSquareText,
  scheduled: CalendarClock,
};

export function ConditionRow({ c }: { c: Condition }) {
  return (
    <li className="cond-row">
      <Link to={`/conditions/${c.slug}`}>
        <span className="cond-name">{c.name}</span>
        <span className="cond-symptoms">
          {c.symptoms.slice(0, 3).join(" · ")}
        </span>
        <span className="cond-types">
          {c.visitTypes.map((t) => {
            const Icon = visitIcon[t];
            return (
              <span key={t} className="type-tag">
                <Icon aria-hidden="true" />
                {visitTypes[t].short}
              </span>
            );
          })}
        </span>
        <span className="cond-price num">from {money(c.price)}</span>
        <ArrowRight className="cond-arrow" aria-hidden="true" />
      </Link>
    </li>
  );
}
