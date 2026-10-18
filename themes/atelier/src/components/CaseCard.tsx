import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import { serviceById, type Case, type Photo as PhotoData } from "../content";
import { Cover } from "./Art";

export const disciplineList = (c: Case) =>
  c.disciplines.map((d) => serviceById(d).short).join(", ");

export function CaseCard({
  c,
  size = "large",
  headingLevel = 3,
}: {
  c: Case;
  size?: "large" | "small";
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article className={`case-card case-card-${size}`}>
      <Link to={`/work/${c.slug}`} className="case-link">
        <div className="case-art">
          <Cover c={c} />
          <span className="case-open" aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>
        <div className="case-caption">
          <H>{c.client}</H>
          <span className="tabular">{c.year}</span>
        </div>
      </Link>
      <p className="case-meta">{disciplineList(c)}</p>
      {size === "large" && <p className="case-summary">{c.summary}</p>}
    </article>
  );
}

export function Photo({
  p,
  lazy = true,
  className,
}: {
  p: PhotoData;
  lazy?: boolean;
  className?: string;
}) {
  return (
    <img
      src={p.src}
      alt={p.alt}
      width={p.w}
      height={p.h}
      loading={lazy ? "lazy" : undefined}
      className={className}
    />
  );
}
