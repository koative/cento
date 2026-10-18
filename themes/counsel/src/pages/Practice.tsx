import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { areas, type Audience } from "../content";
import { personBySlug } from "../lib/util";
import { PageHead } from "../components/PageHead";
import { Closing } from "../components/Closing";

const filters: { id: Audience | "all"; label: string }[] = [
  { id: "all", label: "All areas" },
  { id: "business", label: "For businesses" },
  { id: "individual", label: "For individuals" },
];

export function Practice() {
  const [filter, setFilter] = useState<Audience | "all">("all");
  const shown =
    filter === "all" ? areas : areas.filter((a) => a.audience.includes(filter));

  return (
    <>
      <PageHead
        title="Practice areas"
        lede="Eight practices, each led by a partner who answers their own phone. Most clients come to us for one and stay for a second."
      >
        <div
          className="segmented"
          role="group"
          aria-label="Show practice areas"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </PageHead>

      <section className="wrap section-tight" aria-label="Practice areas list">
        <p className="visually-hidden" aria-live="polite">
          {shown.length} practice areas shown
        </p>
        <ol className="practice-rows">
          {shown.map((a) => {
            const lead = personBySlug(a.lead);
            return (
              <li key={a.slug}>
                <img
                  src={a.image}
                  alt=""
                  width={480}
                  height={320}
                  loading="lazy"
                />
                <div>
                  <h2>
                    <Link to={`/practice/${a.slug}`}>{a.name}</Link>
                  </h2>
                  <p>{a.short}</p>
                </div>
                <dl>
                  <dt>Lead partner</dt>
                  <dd>{lead?.name}</dd>
                  <dt>Acts for</dt>
                  <dd>
                    {a.audience
                      .map((x) =>
                        x === "business" ? "Businesses" : "Individuals",
                      )
                      .join(" & ")}
                  </dd>
                </dl>
                <ArrowRight
                  className="row-arrow"
                  size={20}
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ol>
      </section>

      <Closing title="Not sure which area fits? Describe it and we will route it." />
    </>
  );
}
