import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { crafts, talent } from "../content";
import { money } from "../lib/util";

export function Crafts() {
  const top = Math.max(...crafts.map((c) => c.median));
  return (
    <>
      <section className="page-head wrap">
        <h1>Crafts on the register</h1>
        <p className="lede">
          Every member is admitted to one craft and reviewed by people who
          practise it. Medians are the middle published day rate across members
          in that craft.
        </p>
      </section>

      <section className="wrap" aria-label="All crafts">
        <ol className="craft-table">
          {crafts.map((c) => {
            const members = talent.filter((t) => t.craft === c.slug);
            return (
              <li key={c.slug}>
                <div className="craft-table-name">
                  <h2>
                    <Link to={`/crafts/${c.slug}`} className="stretch">
                      {c.name}
                    </Link>
                  </h2>
                  <p>{c.short}</p>
                </div>
                <div className="craft-table-rate">
                  <span className="rate">
                    <strong>{money(c.median)}</strong> median / day
                  </span>
                  <span className="rate-bar" aria-hidden="true">
                    <span style={{ width: `${(c.median / top) * 100}%` }} />
                  </span>
                </div>
                <div
                  className="craft-table-faces"
                  aria-label={`${members.length} featured ${members.length === 1 ? "member" : "members"}`}
                >
                  {members.map((m) => (
                    <img
                      key={m.id}
                      src={m.photo}
                      alt={m.name}
                      width={640}
                      height={800}
                      loading="lazy"
                    />
                  ))}
                </div>
                <ArrowRight aria-hidden="true" className="craft-table-arrow" />
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section wrap split-cta">
        <h2>Not sure which craft you need?</h2>
        <p>
          Describe the outcome instead. When you post a project, the Guild desk
          reads it and suggests the craft within a working day.
        </p>
        <Link to="/post" className="btn btn-seal">
          Post a project
        </Link>
      </section>
    </>
  );
}
