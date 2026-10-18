import { Baby, Cat, Check, Dog, Minus, X } from "lucide-react";
import { Link } from "../router";
import { tags, type Animal, type Fit } from "../content";
import { ageLabel } from "../lib/util";

const fitWord: Record<Fit, string> = { yes: "Yes", ask: "Untested", no: "No" };
const fitIcon = { yes: Check, ask: Minus, no: X };
const who = [
  { key: "kids", label: "Kids", Icon: Baby },
  { key: "dogs", label: "Dogs", Icon: Dog },
  { key: "cats", label: "Cats", Icon: Cat },
] as const;

export function GoodWith({
  animal,
  full = false,
}: {
  animal: Animal;
  full?: boolean;
}) {
  return (
    <ul
      className="goodwith"
      data-full={full ? "" : undefined}
      aria-label="Good with"
    >
      {who.map(({ key, label, Icon }) => {
        const fit = animal.goodWith[key];
        const Mark = fitIcon[fit];
        return (
          <li key={key} data-fit={fit}>
            <Icon aria-hidden="true" className="gw-icon" />
            <Mark aria-hidden="true" className="gw-mark" />
            <span className={full ? undefined : "sr-only"}>
              {label}: {fitWord[fit]}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function TagChip({ animal }: { animal: Animal }) {
  return (
    <span className="tag-chip" data-tag={animal.tag}>
      <svg viewBox="0 0 12 14" width="12" height="14" aria-hidden="true">
        <circle
          cx="6"
          cy="2.4"
          r="1.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect x="1" y="4.5" width="10" height="9" rx="3" />
      </svg>
      {tags[animal.tag].label}
    </span>
  );
}

/** The kennel-door card: punched, clipped, and swinging slightly when you reach for it. */
export function KennelCard({ animal: a }: { animal: Animal }) {
  return (
    <article className="kcard" data-tag={a.tag}>
      <div className="kcard-top">
        <span>
          <span className="kcard-k">Kennel </span>
          {a.kennel}
        </span>
        <span>
          <span className="kcard-k">Here </span>
          {a.daysHere} days
        </span>
      </div>
      <img
        src={a.photo}
        alt={a.alt}
        loading="lazy"
        width={480}
        height={360}
        style={a.focus ? { objectPosition: a.focus } : undefined}
      />
      <h3 className="kcard-name">
        <Link to={`/animals/${a.id}`}>{a.name}</Link>
      </h3>
      <p className="kcard-meta">
        {a.sex} · {ageLabel(a.ageMonths)} · {a.breed}
      </p>
      <p className="kcard-line">{a.line}</p>
      <div className="kcard-foot">
        <TagChip animal={a} />
        <GoodWith animal={a} />
      </div>
    </article>
  );
}
