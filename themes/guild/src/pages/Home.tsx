import { useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, navigate } from "../router";
import {
  crafts,
  findCraft,
  findTalent,
  home,
  talent,
  type Talent,
} from "../content";
import { money } from "../lib/util";
import { Availability, TalentCard } from "../components/Talent";
import { Hallmark, initialsOf } from "../components/Hallmark";
import { Overlap } from "../components/Overlap";

const pick = (ids: string[]) =>
  ids.map(findTalent).filter((t): t is Talent => !!t);

export function Home() {
  const [q, setQ] = useState("");
  const search = (e: FormEvent) => {
    e.preventDefault();
    navigate(
      q.trim() ? `/talent?q=${encodeURIComponent(q.trim())}` : "/talent",
    );
  };
  const ledger = pick(["ines-duarte", "dev-raman", "mai-takeda-brook"]);
  const lead = ledger[0];
  const vouchers = pick(lead.vouchedBy);
  const featured = talent.filter((t) => t.availability === "now").slice(0, 4);
  const sample = pick(["ines-duarte", "malik-osei", "dev-raman"]);
  const escrow = home.escrow.example;
  const escrowTotal = escrow.milestones.reduce((s, m) => s + m.amount, 0);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.headline}</h1>
          <p className="lede">{home.lede}</p>
          <form className="hero-search" role="search" onSubmit={search}>
            <label htmlFor="hero-q" className="sr-only">
              Search members by craft, skill or name
            </label>
            <Search aria-hidden="true" />
            <input
              id="hero-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={home.searchHint}
            />
            <button className="btn btn-seal" type="submit">
              Search the register
            </button>
          </form>
          <p className="hero-popular">
            Popular:{" "}
            {home.popular.map((p, i) => (
              <span key={p}>
                <Link to={`/talent?q=${encodeURIComponent(p)}`}>{p}</Link>
                {i < home.popular.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>

        <div className="ledger" aria-label="Three members on the register">
          <div className="ledger-head" aria-hidden="true">
            <span>Member</span>
            <span>Day rate</span>
          </div>
          <ol>
            {ledger.map((t) => (
              <li key={t.id} className="ledger-entry">
                <img src={t.photo} alt="" width={640} height={800} />
                <div>
                  <Link to={`/talent/${t.id}`} className="ledger-name">
                    {t.name}
                  </Link>
                  <span className="ledger-craft">
                    {findCraft(t.craft)?.name} · {t.location.split(",")[0]}
                  </span>
                  <Availability t={t} />
                </div>
                <span className="rate">
                  <strong>{money(t.rate)}</strong>
                </span>
              </li>
            ))}
          </ol>
          <p className="ledger-vouch">
            <Hallmark
              initials={initialsOf(lead.name)}
              register={lead.register}
              craft={findCraft(lead.craft)?.name ?? ""}
              size={64}
            />
            <span>
              {lead.name.split(" ")[0]} was vouched for by{" "}
              {vouchers.map((v, i) => (
                <span key={v.id}>
                  <Link to={`/talent/${v.id}`}>{v.name}</Link>
                  {i === 0 ? " and " : ""}
                </span>
              ))}
              . Both names stay on the entry for good.
            </span>
          </p>
        </div>
      </section>

      <section className="section wrap crafts-home" aria-labelledby="crafts-h">
        <div className="section-head">
          <h2 id="crafts-h">Eight crafts, one register</h2>
          <Link to="/crafts" className="more">
            All crafts <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="craft-index">
          {crafts.map((c) => (
            <li key={c.slug}>
              <Link to={`/crafts/${c.slug}`}>
                <span className="craft-name">{c.name}</span>
                <span className="craft-short">{c.short}</span>
                <span className="craft-median">
                  median <strong>{money(c.median)}</strong>/day
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-paper" aria-labelledby="register-h">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="register-h">{home.register.title}</h2>
              <p className="section-text">{home.register.text}</p>
            </div>
            <Link to="/talent" className="more">
              Browse all members <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="card-grid">
            {featured.map((t) => (
              <TalentCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap method" aria-labelledby="method-h">
        <div className="method-intro">
          <h2 id="method-h">{home.method.title}</h2>
          <p>{home.method.text}</p>
          <Link to="/how-it-works" className="more">
            How it works, in full <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ol className="steps">
          {home.method.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band-green" aria-labelledby="escrow-h">
        <div className="wrap escrow">
          <div>
            <h2 id="escrow-h">{home.escrow.title}</h2>
            <p>{home.escrow.text}</p>
          </div>
          <div className="escrow-sheet">
            <p className="escrow-project">
              <strong>{escrow.project}</strong>
              <span>with {escrow.member}</span>
            </p>
            <table>
              <caption className="sr-only">
                Milestones for {escrow.project}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Milestone</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {escrow.milestones.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td className="num">{money(m.amount)}</td>
                    <td>
                      <span
                        className="pill"
                        data-status={m.status.toLowerCase()}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Contract total</th>
                  <td className="num">{money(escrowTotal)}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section className="section wrap bench-teaser" aria-labelledby="bench-h">
        <div className="bench-teaser-copy">
          <h2 id="bench-h">{home.benchTeaser.title}</h2>
          <p>{home.benchTeaser.text}</p>
          <Link to="/bench" className="btn btn-ink">
            Open your bench
          </Link>
        </div>
        <Overlap
          crew={sample}
          viewer={-4}
          viewerHours={[9, 17]}
          viewerLabel="New York"
        />
      </section>

      <section className="section band-paper" aria-labelledby="closed-h">
        <div className="wrap closed">
          <div>
            <h2 id="closed-h">{home.commissionsTitle}</h2>
            <table className="ruled">
              <caption className="sr-only">Recently completed projects</caption>
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Craft</th>
                  <th scope="col" className="num">
                    Weeks
                  </th>
                  <th scope="col" className="num">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {home.commissions.map((c) => (
                  <tr key={c.project}>
                    <td>{c.project}</td>
                    <td>{c.craft}</td>
                    <td className="num">{c.weeks}</td>
                    <td className="num">{money(c.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <blockquote className="pull">
            <p>“{home.quote.text}”</p>
            <footer>
              <strong>{home.quote.name}</strong>, {home.quote.role}
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="section wrap members" aria-labelledby="members-h">
        <img
          src={home.members.image}
          alt={home.members.imageAlt}
          width={1600}
          height={1067}
          loading="lazy"
        />
        <div>
          <h2 id="members-h">{home.members.title}</h2>
          <p>{home.members.text}</p>
          <ul className="checks">
            {home.members.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link to="/signup" className="btn btn-ink">
            Apply to join
          </Link>
        </div>
      </section>

      <section className="close wrap" aria-labelledby="close-h">
        <Hallmark
          initials="G"
          register={1}
          craft="Founded in Lisbon 2019"
          size={120}
          className="close-mark"
        />
        <h2 id="close-h">{home.close.title}</h2>
        <p>{home.close.text}</p>
        <div className="close-actions">
          <Link to="/post" className="btn btn-seal btn-lg">
            Post a project
          </Link>
          <Link to="/talent" className="btn btn-line btn-lg">
            Browse talent
          </Link>
        </div>
      </section>
    </>
  );
}
