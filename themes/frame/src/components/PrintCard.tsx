import { Link } from "../router";
import { findFrame, type Print } from "../content";
import { money } from "../lib/store";

export function PrintCard({ print }: { print: Print }) {
  const frame = findFrame(print.frameId)!;
  const left = print.edition - print.sold;
  return (
    <article className="print-card">
      <Link to={`/prints/${print.id}`} className="print-card-link">
        <span className="print-card-img">
          <img
            src={frame.src}
            alt=""
            width={frame.w}
            height={frame.h}
            loading="lazy"
          />
        </span>
        <span className="label">
          <span className="label-title">{frame.title}</span>
          <span>{frame.series.title}</span>
          <span className="print-card-meta">
            <span>
              {left ? `From ${money(print.prices.s)}` : "Edition complete"}
            </span>
            <span>
              {left
                ? `${left} of ${print.edition} left`
                : `${print.edition} of ${print.edition} sold`}
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}
