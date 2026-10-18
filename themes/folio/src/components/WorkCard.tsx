import type { CSSProperties, ReactNode } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Link } from "../router";
import { artistBySlug, type Status, type Work } from "../content";
import { dims, price } from "../lib/format";
import { shortlist, toggleShortlist } from "../lib/store";
import { Artwork } from "./Artwork";

/** The gallery's red dot: full for sold, half for reserved. */
export function StatusMark({ status }: { status: Status }) {
  if (status === "available") return null;
  return (
    <span className="status-mark" data-status={status}>
      <svg viewBox="0 0 10 10" aria-hidden="true">
        <circle
          cx="5"
          cy="5"
          r="4.25"
          data-ring={status === "reserved" || undefined}
        />
        {status === "reserved" && <path d="M5 .75a4.25 4.25 0 0 1 0 8.5z" />}
      </svg>
      {status === "sold" ? "Sold" : "Reserved"}
    </span>
  );
}

/** A wall label: artist, title and year, medium, size, price. */
export function Tombstone({
  work,
  as: Heading = "h3",
}: {
  work: Work;
  as?: "h2" | "h3";
}) {
  const artist = artistBySlug(work.artist);
  return (
    <div className="tombstone">
      <Heading>
        <span className="t-artist">{artist?.name}</span>
        <span className="t-title">
          <cite>{work.title}</cite>, {work.year}
        </span>
      </Heading>
      <p>{work.medium}</p>
      <p className="t-dims">
        {dims(work)}
        {work.edition ? ` · ${work.edition}` : ""}
      </p>
      <p className="t-price">
        {work.status === "sold" ? <StatusMark status="sold" /> : price(work)}
        {work.status === "reserved" && <StatusMark status="reserved" />}
      </p>
    </div>
  );
}

/** The work hung on a plate of wall, proportions intact, with its label beneath. */
export function WorkPlate({
  work,
  className,
}: {
  work: Work;
  className?: string;
}) {
  const artist = artistBySlug(work.artist);
  const wide = work.w / work.h >= 1;
  return (
    <div
      className={"plate " + (className ?? "")}
      style={{ "--ar": `${work.w} / ${work.h}` } as CSSProperties}
      data-wide={wide || undefined}
    >
      <Artwork
        art={work.art}
        w={work.w}
        h={work.h}
        label={`${work.title} by ${artist?.name}, ${work.year}`}
      />
    </div>
  );
}

export function SaveButton({ work, wide }: { work: Work; wide?: boolean }) {
  const saved = shortlist.use().includes(work.id);
  if (work.status === "sold") return null;
  return (
    <button
      type="button"
      className={"save" + (wide ? " btn btn-ghost" : "")}
      aria-pressed={saved}
      onClick={() => toggleShortlist(work.id)}
    >
      {saved ? (
        <BookmarkCheck size={18} aria-hidden="true" />
      ) : (
        <Bookmark size={18} aria-hidden="true" />
      )}
      {saved ? "Saved to list" : "Save to list"}
      {!wide && <span className="visually-hidden">: {work.title}</span>}
    </button>
  );
}

export function WorkCard({
  work,
  as,
  children,
}: {
  work: Work;
  as?: "h2" | "h3";
  children?: ReactNode;
}) {
  return (
    <article className="work-card">
      <Link
        to={`/viewing-room/${work.id}`}
        className="work-link"
        aria-label={`${work.title}, view details`}
      >
        <WorkPlate work={work} />
      </Link>
      <Tombstone work={work} as={as} />
      {children}
    </article>
  );
}
