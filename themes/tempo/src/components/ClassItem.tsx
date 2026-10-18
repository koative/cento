import { Check, Plus } from "lucide-react";
import { Link } from "../router";
import {
  instructorBySlug,
  styleBySlug,
  weekdays,
  type DanceClass,
} from "../content";
import { clock, endOf } from "../lib/util";
import { toggleClass } from "../lib/week";

export function spotsLabel(left: number) {
  if (left === 0) return "Full · waitlist open";
  if (left <= 3) return `${left} spot${left === 1 ? "" : "s"} left`;
  return `${left} spots`;
}

/** One class on the board; the button pins it to "My week". */
export function ClassItem({
  c,
  picked,
  clash,
  showDay = false,
}: {
  c: DanceClass;
  picked: boolean;
  clash?: string;
  showDay?: boolean;
}) {
  const style = styleBySlug(c.style);
  const teacher = instructorBySlug(c.teacher);
  return (
    <article className="class-item" data-picked={picked ? "" : undefined}>
      <p className="ci-time">
        {showDay && <span>{weekdays[c.day].slice(0, 3)} </span>}
        <time>{clock(c.start)}</time>–<time>{clock(endOf(c))}</time>
      </p>
      <h3 className="ci-title">
        <Link to={`/styles/${c.style}`}>{c.title}</Link>
      </h3>
      <p className="ci-meta">
        {style?.name} · {teacher?.name.split(" ")[0]} · Studio {c.studio}
      </p>
      <p className="ci-foot">
        <span className="ci-level">{c.level}</span>
        <span className="ci-spots" data-low={c.spotsLeft <= 3 ? "" : undefined}>
          {spotsLabel(c.spotsLeft)}
        </span>
      </p>
      {clash && <p className="ci-clash">Overlaps {clash}</p>}
      <button
        type="button"
        className="ci-add"
        aria-pressed={picked}
        aria-label={`${picked ? "Remove" : "Add"} ${c.title}, ${weekdays[c.day]} ${clock(c.start)}, ${picked ? "from" : "to"} my week`}
        onClick={() => toggleClass(c.id)}
      >
        {picked ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <Plus size={18} aria-hidden="true" />
        )}
        <span>{picked ? "Added" : "Add"}</span>
      </button>
    </article>
  );
}
