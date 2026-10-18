import { Link } from "../router";
import { causeLabel, type Campaign } from "../content";
import { Bar } from "./Board";

export function CampaignCard({
  campaign,
  eager = false,
}: {
  campaign: Campaign;
  eager?: boolean;
}) {
  return (
    <article className="campaign-card">
      <img
        src={campaign.image}
        alt=""
        width={640}
        height={420}
        loading={eager ? "eager" : "lazy"}
      />
      <div className="campaign-card-body">
        <h3>
          <Link to={`/campaigns/${campaign.slug}`}>{campaign.title}</Link>
        </h3>
        <p className="tag">
          {causeLabel(campaign.cause)} · {campaign.neighbourhood}
        </p>
        <p>{campaign.short}</p>
        <Bar campaign={campaign} />
      </div>
    </article>
  );
}
