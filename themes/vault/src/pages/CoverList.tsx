import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { audiences, covers, type Audience, type Cover } from "../content";
import { money } from "../lib/quote";

const letters = ["A", "B", "C", "D", "E", "F"];
const sorts: Record<
  string,
  { label: string; fn: (a: Cover, b: Cover) => number }
> = {
  usual: { label: "Most chosen first", fn: () => 0 },
  price: { label: "Price, lowest first", fn: (a, b) => a.from - b.from },
  priceDesc: { label: "Price, highest first", fn: (a, b) => b.from - a.from },
  name: { label: "Name, A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export function CoverList() {
  const [audience, setAudience] = useState<Audience | "all">("all");
  const [sort, setSort] = useState("usual");
  const shown = covers
    .filter((c) => audience === "all" || c.audience === audience)
    .sort(sorts[sort].fn);
  const base = covers.filter((c) => c.audience !== "add-on");

  return (
    <>
      <section className="wrap page-head">
        <h1>Cover</h1>
        <p className="lede">
          Six policies for the way you live — renting, owning, letting — and two
          add-ons for the things standard policies leave out. Every one is
          written in the same plain wording, section by section.
        </p>
      </section>

      <section className="wrap" aria-label="Cover list">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by situation">
            <button
              type="button"
              aria-pressed={audience === "all"}
              onClick={() => setAudience("all")}
            >
              Everything
            </button>
            {audiences.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={audience === a.id}
                onClick={() => setAudience(a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>
          <label className="sort">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "policy" : "policies"}
        </p>

        <ul className="cover-list">
          {shown.map((c) => {
            const codes = new Set(c.schedule.map((s) => s.code));
            return (
              <li key={c.slug} className="cover-row">
                <img
                  src={c.image}
                  alt=""
                  width={1100}
                  height={734}
                  loading="lazy"
                />
                <div className="cover-row-body">
                  <h2>
                    <Link to={`/cover/${c.slug}`}>{c.name}</Link>
                  </h2>
                  <p>{c.summary}</p>
                  {c.audience !== "add-on" && (
                    <p
                      className="letters"
                      aria-label={`Sections included: ${letters.filter((l) => codes.has(l)).join(", ")}`}
                    >
                      {letters.map((l) => (
                        <span
                          key={l}
                          data-on={codes.has(l) ? "" : undefined}
                          aria-hidden="true"
                        >
                          {l}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <p className="cover-row-price">
                  <span>
                    {c.audience === "add-on" ? "Add-on from" : "From"}
                  </span>
                  <strong className="num">{money(c.from)}</strong>
                  <span>a month</span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap compare" aria-labelledby="compare-h">
        <h2 id="compare-h">What each policy includes</h2>
        <p className="compare-note">
          The letters follow the standard US home policy form, so you can hold a
          Vault schedule against anyone else's.
        </p>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="compare-h"
        >
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Section</th>
                {base.map((c) => (
                  <th key={c.slug} scope="col">
                    <Link to={`/cover/${c.slug}`}>{c.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["A", "Dwelling / unit"],
                ["B", "Other structures"],
                ["C", "Personal property"],
                ["D", "Loss of use / rent"],
                ["E", "Liability"],
                ["F", "Medical payments"],
              ].map(([code, label]) => (
                <tr key={code}>
                  <th scope="row">
                    <span className="code-chip">{code}</span> {label}
                  </th>
                  {base.map((c) => {
                    const line = c.schedule.find((s) => s.code === code);
                    return (
                      <td key={c.slug}>
                        {line ? (
                          <>
                            <Check aria-hidden="true" size={16} />
                            <span>{line.limit}</span>
                          </>
                        ) : (
                          <span className="muted">Not included</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/quote" className="btn btn-primary">
          Price my cover <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </>
  );
}
