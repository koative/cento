import { useState } from "react";
import { Check, Plus, Star } from "lucide-react";
import { Link } from "../router";
import { findCraft, type Talent } from "../content";
import { BENCH_MAX, toggleBench, useBench } from "../lib/bench";
import { money } from "../lib/util";
import { Hallmark, initialsOf } from "./Hallmark";

export function Availability({ t }: { t: Talent }) {
  return (
    <span className="avail" data-status={t.availability}>
      {t.availabilityNote}
    </span>
  );
}

/** Add-to-bench toggle; the hallmark strikes when a member joins the bench. */
export function BenchButton({
  t,
  compact = false,
}: {
  t: Talent;
  compact?: boolean;
}) {
  const onBench = useBench().includes(t.id);
  const [full, setFull] = useState(false);
  const first = t.name.split(" ")[0];
  return (
    <span className="bench-btn-wrap">
      <button
        type="button"
        className={`btn ${onBench ? "btn-ink" : "btn-line"} bench-btn`}
        aria-pressed={onBench}
        onClick={() => setFull(!toggleBench(t.id))}
      >
        {onBench ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
        {compact
          ? onBench
            ? "On bench"
            : "Bench"
          : onBench
            ? `${first} is on your bench`
            : `Add ${first} to bench`}
      </button>
      {full && !onBench && (
        <span className="bench-full" role="status">
          Your bench holds {BENCH_MAX}. <Link to="/bench">Remove someone</Link>{" "}
          first.
        </span>
      )}
    </span>
  );
}

export function TalentRow({ t }: { t: Talent }) {
  const craft = findCraft(t.craft);
  return (
    <article className="t-row">
      <Link
        to={`/talent/${t.id}`}
        className="t-row-photo"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={t.photo} alt="" width={640} height={800} loading="lazy" />
      </Link>
      <div className="t-row-main">
        <h3>
          <Link to={`/talent/${t.id}`}>{t.name}</Link>
        </h3>
        <p className="t-row-title">{t.title}</p>
        <p className="t-row-meta">
          {craft?.name} · {t.location}
        </p>
        <ul className="tags" aria-label="Skills">
          {t.skills.slice(0, 4).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="t-row-terms">
        <p className="rate">
          <strong>{money(t.rate)}</strong> / day
        </p>
        <p className="t-row-rating">
          <Star aria-hidden="true" /> {t.rating.toFixed(1)}{" "}
          <span>({t.reviews} reviews)</span>
        </p>
        <Availability t={t} />
      </div>
      <div className="t-row-action">
        <BenchButton t={t} compact />
      </div>
    </article>
  );
}

export function TalentCard({ t }: { t: Talent }) {
  const craft = findCraft(t.craft);
  return (
    <article className="t-card">
      <div className="t-card-photo">
        <img src={t.photo} alt="" width={640} height={800} loading="lazy" />
        <Hallmark
          className="t-card-mark"
          initials={initialsOf(t.name)}
          register={t.register}
          craft={craft?.name ?? ""}
          size={76}
        />
      </div>
      <h3>
        <Link to={`/talent/${t.id}`} className="stretch">
          {t.name}
        </Link>
      </h3>
      <p className="t-card-craft">{craft?.name}</p>
      <p className="t-card-terms">
        <span className="rate">
          <strong>{money(t.rate)}</strong> / day
        </span>
        <Availability t={t} />
      </p>
    </article>
  );
}
