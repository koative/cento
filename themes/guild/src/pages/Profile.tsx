import { Star } from "lucide-react";
import { Link } from "../router";
import { findCraft, findTalent, talent, type Talent } from "../content";
import { hourLabel, localTime, money, utcLabel } from "../lib/util";
import { Hallmark, initialsOf } from "../components/Hallmark";
import { Availability, BenchButton, TalentCard } from "../components/Talent";

export function Profile({ t }: { t: Talent }) {
  const craft = findCraft(t.craft);
  const vouchers = t.vouchedBy.map(findTalent).filter((v): v is Talent => !!v);
  const vouchedFor = talent.filter((o) => o.vouchedBy.includes(t.id));
  const related = [
    ...talent.filter((o) => o.id !== t.id && o.craft === t.craft),
    ...vouchers,
    ...talent.filter((o) => o.id !== t.id && o.craft !== t.craft),
  ]
    .filter((o, i, all) => all.indexOf(o) === i)
    .slice(0, 3);
  const city = t.location.split(",")[0];
  const first = t.name.split(" ")[0];

  return (
    <>
      <nav className="crumbs wrap" aria-label="Breadcrumb">
        <Link to="/talent">Browse talent</Link> /{" "}
        {craft && <Link to={`/crafts/${craft.slug}`}>{craft.name}</Link>} /{" "}
        <span aria-current="page">{t.name}</span>
      </nav>

      <section className="profile-head wrap">
        <div className="profile-photo">
          <img
            src={t.photo}
            alt={`Portrait of ${t.name}`}
            width={640}
            height={800}
          />
          <Hallmark
            className="profile-mark struck"
            initials={initialsOf(t.name)}
            register={t.register}
            craft={craft?.name ?? ""}
            size={128}
          />
        </div>

        <div className="profile-id">
          <h1>{t.name}</h1>
          <p className="profile-title">{t.title}</p>
          <dl className="facts">
            <div>
              <dt>Based in</dt>
              <dd>
                {t.location}, {localTime(t.tz)} there now
              </dd>
            </div>
            <div>
              <dt>Working day</dt>
              <dd>
                {hourLabel(t.hours[0])}–{hourLabel(t.hours[1])} {city} time (
                {utcLabel(t.tz)})
              </dd>
            </div>
            <div>
              <dt>Reviews</dt>
              <dd>
                <Star aria-hidden="true" className="star" />{" "}
                {t.rating.toFixed(1)} from {t.reviews} clients · {t.completed}{" "}
                projects closed
              </dd>
            </div>
            <div>
              <dt>On the register</dt>
              <dd>
                No. {String(t.register).padStart(4, "0")}, since {t.since}
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{t.languages.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <aside className="terms" aria-label={`${first}’s terms`}>
          <p className="terms-rate">
            <strong>{money(t.rate)}</strong>
            <span>per day, published</span>
          </p>
          <Availability t={t} />
          <p className="terms-days">
            {t.days
              ? `Can take ${t.days} ${t.days === 1 ? "day" : "days"} a week`
              : "No days free right now"}
          </p>
          <BenchButton t={t} />
          <Link to={`/post?invite=${t.id}`} className="btn btn-seal">
            Invite {first} to a project
          </Link>
          <p className="terms-note">
            Milestones held in escrow. 5% client fee on the Open plan.
          </p>
        </aside>
      </section>

      <div className="wrap profile-body">
        <section aria-labelledby="about-h" className="profile-about">
          <h2 id="about-h">About {first}</h2>
          <p className="profile-summary">{t.summary}</p>
          {t.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <h3>Skills</h3>
          <ul className="tags">
            {t.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="vouch-h" className="vouches">
          <h2 id="vouch-h">Vouched for by</h2>
          <ul>
            {vouchers.map((v) => (
              <li key={v.id}>
                <Hallmark
                  initials={initialsOf(v.name)}
                  register={v.register}
                  craft={findCraft(v.craft)?.name ?? ""}
                  size={72}
                />
                <span>
                  <Link to={`/talent/${v.id}`}>{v.name}</Link>
                  <span className="muted">{findCraft(v.craft)?.name}</span>
                </span>
              </li>
            ))}
          </ul>
          {vouchedFor.length > 0 && (
            <p className="muted">
              {first} has vouched for{" "}
              {vouchedFor.map((v, i) => (
                <span key={v.id}>
                  <Link to={`/talent/${v.id}`}>{v.name}</Link>
                  {i < vouchedFor.length - 2
                    ? ", "
                    : i === vouchedFor.length - 2
                      ? " and "
                      : ""}
                </span>
              ))}
              .
            </p>
          )}
        </section>
      </div>

      <section className="section wrap" aria-labelledby="work-h">
        <h2 id="work-h">Commissions on record</h2>
        <table className="ruled commissions">
          <caption className="sr-only">Past projects by {t.name}</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Commission</th>
              <th scope="col">Client</th>
              <th scope="col" className="num">
                Weeks
              </th>
            </tr>
          </thead>
          <tbody>
            {t.commissions.map((c) => (
              <tr key={c.title}>
                <td className="year">{c.year}</td>
                <td>
                  <strong>{c.title}</strong>
                  <span className="muted block">{c.note}</span>
                </td>
                <td>{c.client}</td>
                <td className="num">{c.weeks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section band-paper" aria-labelledby="reviews-h">
        <div className="wrap">
          <h2 id="reviews-h">What clients wrote</h2>
          <div className="reviews">
            {t.testimonials.map((r) => (
              <blockquote key={r.name}>
                <p>“{r.quote}”</p>
                <footer>
                  <strong>{r.name}</strong>, {r.role}
                  <span className="muted block">{r.project}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="related-h">
        <h2 id="related-h">Also on the register</h2>
        <div className="card-grid card-grid-3">
          {related.map((o) => (
            <TalentCard key={o.id} t={o} />
          ))}
        </div>
      </section>
    </>
  );
}
