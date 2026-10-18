import { Link } from "../router";
import {
  campaigns,
  causeLabel,
  events,
  type Campaign as CampaignT,
} from "../content";
import { formatDate, money } from "../lib/format";
import { gifts, progress, startGift } from "../lib/giving";
import { Board, Pledge } from "../components/Board";
import { CampaignCard } from "../components/CampaignCard";
import { EventList } from "../components/EventList";

export function Campaign({ campaign }: { campaign: CampaignT }) {
  const { funded, donors } = progress(campaign, gifts.use());
  const related = campaigns
    .filter((c) => c.slug !== campaign.slug && c.raised < c.goal)
    .slice(0, 3);
  const linkedEvents = events.filter((e) => e.campaign === campaign.slug);
  const largest = Math.max(...campaign.budget.map((b) => b.amount));

  return (
    <>
      <header className="campaign-head wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/campaigns">Campaigns</Link> /{" "}
          <span aria-current="page">{campaign.title}</span>
        </nav>
        <div className="campaign-head-grid">
          <div>
            <h1>{campaign.title}</h1>
            <p className="lead">{campaign.lead}</p>
            <dl className="facts">
              <div>
                <dt>Cause</dt>
                <dd>{causeLabel(campaign.cause)}</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{campaign.neighbourhood}</dd>
              </div>
              <div>
                <dt>With</dt>
                <dd>{campaign.partner}</dd>
              </div>
              <div>
                <dt>Closes</dt>
                <dd>{formatDate(campaign.closes)}</dd>
              </div>
            </dl>
          </div>
          <img
            src={campaign.image}
            alt={campaign.imageAlt}
            width={900}
            height={640}
          />
        </div>
      </header>

      <section
        className="section wrap pledge-section"
        aria-labelledby="give-heading"
      >
        {funded ? (
          <div className="pledge-layout">
            <div className="pledge">
              <h2 id="give-heading">Funded. Thank you.</h2>
              <p>
                {donors} neighbours filled this board. We have stopped asking
                for it; anything you give now goes to the general fund, which
                answers small grants within a week.
              </p>
              <button
                type="button"
                className="btn btn-flame"
                onClick={() => {
                  startGift({ campaign: null, amount: 35, monthly: false });
                }}
              >
                Give to the general fund
              </button>
            </div>
            <Board campaign={campaign} />
          </div>
        ) : (
          <Pledge
            campaign={campaign}
            intro={
              <>
                <h2 id="give-heading">Light up the board</h2>
                <p>
                  Pick an amount and watch where it lands. Every milestone on
                  the board is a real purchase, in the order we make it.
                </p>
              </>
            }
          />
        )}
      </section>

      <section className="section wrap story">
        <h2>Why this, why now</h2>
        <div className="prose">
          {campaign.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section wrap budget-section">
        <h2>Where the {money(campaign.goal)} goes</h2>
        <table className="budget">
          <caption className="visually-hidden">
            Budget for {campaign.title}
          </caption>
          <thead>
            <tr>
              <th scope="col">Line</th>
              <th scope="col" className="num">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {campaign.budget.map((b) => (
              <tr key={b.label}>
                <th scope="row">
                  {b.label}
                  <span
                    className="budget-bar"
                    style={{ width: `${(b.amount / largest) * 100}%` }}
                    aria-hidden="true"
                  />
                </th>
                <td className="num">{money(b.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Goal</th>
              <td className="num">{money(campaign.goal)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="section wrap updates">
        <h2>From the board</h2>
        <ol className="update-list">
          {campaign.updates.map((u) => (
            <li key={u.date}>
              <time dateTime={u.date}>
                {formatDate(u.date, { day: "numeric", month: "short" })}
              </time>
              <div>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {linkedEvents.length > 0 && (
        <section className="section wrap">
          <h2>Come along</h2>
          <EventList items={linkedEvents} />
        </section>
      )}

      <section className="section wrap">
        <h2>Also on the board</h2>
        <div className="card-grid">
          {related.map((c) => (
            <CampaignCard key={c.slug} campaign={c} />
          ))}
        </div>
      </section>
    </>
  );
}
