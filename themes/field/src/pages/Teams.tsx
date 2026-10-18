import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { groups, teams, type Group } from "../content";
import { fmtDate, upcoming } from "../lib/club";
import { Img, PageHead } from "../components/Bits";
import { Shirt } from "../components/Kit";

type WhoFilter = "all" | "women" | "men" | "mixed";
const whoMatch: Record<WhoFilter, string[]> = {
  all: ["Men", "Women", "Boys", "Girls", "Mixed"],
  women: ["Women", "Girls"],
  men: ["Men", "Boys"],
  mixed: ["Mixed"],
};

export function Teams() {
  const [group, setGroup] = useState<Group | "all">("all");
  const [who, setWho] = useState<WhoFilter>("all");
  const list = teams.filter(
    (t) =>
      (group === "all" || t.group === group) && whoMatch[who].includes(t.who),
  );

  return (
    <>
      <PageHead
        title="Teams"
        lede="Eight squads, one club. Every team trains on The Common, wears the same green shirt and drinks from the same tea hut."
      />
      <section className="section-tight">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter teams">
            <fieldset className="segmented">
              <legend>Section</legend>
              {[{ id: "all" as const, label: "All" }, ...groups].map((g) => (
                <label key={g.id}>
                  <input
                    type="radio"
                    name="group"
                    checked={group === g.id}
                    onChange={() => setGroup(g.id)}
                  />
                  <span>{g.label}</span>
                </label>
              ))}
            </fieldset>
            <div className="field field-inline">
              <label htmlFor="who">Who plays</label>
              <select
                id="who"
                value={who}
                onChange={(e) => setWho(e.target.value as WhoFilter)}
              >
                <option value="all">Everyone</option>
                <option value="women">Women &amp; girls</option>
                <option value="men">Men &amp; boys</option>
                <option value="mixed">Mixed teams</option>
              </select>
            </div>
          </div>
          <p className="count" role="status">
            {list.length} {list.length === 1 ? "team" : "teams"}
          </p>

          {list.length ? (
            <ul className="team-list">
              {list.map((t) => {
                const next = upcoming(t.slug)[0];
                return (
                  <li key={t.slug} className="team-row">
                    <Img photo={t.photo} />
                    <div className="team-row-main">
                      <div className="team-row-title">
                        <Shirt n={t.captain} size={48} />
                        <h2>
                          <Link to={`/teams/${t.slug}`}>{t.name}</Link>
                        </h2>
                      </div>
                      <p>{t.lede}</p>
                    </div>
                    <dl className="team-facts">
                      <div>
                        <dt>Ages</dt>
                        <dd>{t.ages}</dd>
                      </div>
                      <div>
                        <dt>Format</dt>
                        <dd>{t.format}-a-side</dd>
                      </div>
                      <div>
                        <dt>Matchday</dt>
                        <dd>{t.matchday}</dd>
                      </div>
                      <div>
                        <dt>Next</dt>
                        <dd>
                          {next
                            ? `${fmtDate(next.date)} v ${next.opp}`
                            : "No game scheduled"}
                        </dd>
                      </div>
                    </dl>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="empty">
              <p>
                No team matches both filters. Mini Kickers and Walking Football
                are mixed, so try "Everyone".
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setGroup("all");
                  setWho("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}

          <aside className="note-band">
            <h2>Can't see your age group?</h2>
            <p>
              We're starting an Under-13 Boys team as soon as a second coach is
              found. Join the waiting list, or help run it.
            </p>
            <Link to="/join" className="text-link">
              Register interest <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
