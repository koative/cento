import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import type { Campaign } from "../content";
import { gifts, progress, startGift } from "../lib/giving";
import { daysUntil, money } from "../lib/format";

function timeLeft(c: Campaign, funded: boolean) {
  if (funded) return "Funded";
  const left = daysUntil(c.closes);
  return left > 0 ? `${left} days left` : "Closed";
}

/**
 * The window board: the painted thermometer that has stood in the shop window since 2009.
 * `pledge` previews a gift on top of the current total, so a donor sees the line move before they give.
 */
export function Board({
  campaign,
  pledge = 0,
}: {
  campaign: Campaign;
  pledge?: number;
}) {
  const { raised, donors, share, funded } = progress(campaign, gifts.use());
  const at = (n: number) => Math.min(n / campaign.goal, 1) * 100;
  const pledgeShare = at(raised + pledge) - share * 100;

  return (
    <figure className="board">
      <figcaption className="board-head">
        <span className="board-title">{campaign.title}</span>
        <span className="board-raised">
          <strong>{money(raised)}</strong> of {money(campaign.goal)}
        </span>
        <span className="board-meta">
          {donors.toLocaleString("en-US")} neighbours ·{" "}
          {timeLeft(campaign, funded)}
        </span>
        {pledge > 0 && (
          <span className="board-pledge">
            With your {money(pledge)}: {money(raised + pledge)}
          </span>
        )}
      </figcaption>
      <div className="board-scale">
        <div
          className="tube"
          role="img"
          aria-label={`${Math.round(share * 100)}% of the ${money(campaign.goal)} goal raised`}
        >
          <span className="tube-fill" style={{ height: `${share * 100}%` }} />
          {pledgeShare > 0 && (
            <span
              className="tube-pledge"
              style={{ bottom: `${share * 100}%`, height: `${pledgeShare}%` }}
            />
          )}
          <span className="tube-bulb" aria-hidden="true">
            {Math.round(share * 100)}%
          </span>
        </div>
        <ol className="milestones">
          {campaign.milestones.map((m) => {
            const reached = raised >= m.at;
            const pledged = !reached && raised + pledge >= m.at;
            return (
              <li
                key={m.at}
                style={{ bottom: `${at(m.at)}%` }}
                data-reached={reached || undefined}
                data-pledged={pledged || undefined}
              >
                <span className="ms-amount">
                  {reached && (
                    <Check size={14} strokeWidth={3} aria-label="Reached:" />
                  )}
                  {money(m.at)}
                </span>
                <span className="ms-label">{m.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}

/** The thin version of the board used on campaign cards. */
export function Bar({ campaign }: { campaign: Campaign }) {
  const { raised, share, funded } = progress(campaign, gifts.use());
  return (
    <div className="bar-block">
      <div
        className="bar"
        role="img"
        aria-label={`${money(raised)} raised of ${money(campaign.goal)}`}
      >
        <span className="bar-fill" style={{ width: `${share * 100}%` }} />
        {campaign.milestones.slice(0, -1).map((m) => (
          <span
            key={m.at}
            className="bar-tick"
            style={{ left: `${(m.at / campaign.goal) * 100}%` }}
          />
        ))}
      </div>
      <p className="bar-text">
        <strong>{money(raised)}</strong> of {money(campaign.goal)}
        <span>{timeLeft(campaign, funded)}</span>
      </p>
    </div>
  );
}

function effect(c: Campaign, raised: number, amount: number) {
  const next = c.milestones.find((m) => m.at > raised);
  if (!next)
    return `Every milestone is lit. Your ${money(amount)} goes into the last stretch.`;
  if (raised + amount >= next.at)
    return `Your ${money(amount)} takes the board past “${next.label}”.`;
  return `After your ${money(amount)}, ${money(next.at - raised - amount)} more lights “${next.label}”.`;
}

/** Signature interaction: pick an amount, watch the board fill, then carry the choice to the donate page. */
export function Pledge({
  campaign,
  intro,
}: {
  campaign: Campaign;
  intro?: ReactNode;
}) {
  const [amount, setAmount] = useState(campaign.impact[1].amount);
  const { raised } = progress(campaign, gifts.use());
  const name = "pledge-" + campaign.slug;

  function give() {
    startGift({ campaign: campaign.slug, amount, monthly: false });
  }

  return (
    <div className="pledge-layout">
      <div className="pledge">
        {intro}
        <fieldset className="pledge-amounts">
          <legend>Choose a gift</legend>
          {campaign.impact.map((i) => (
            <label key={i.amount} className="amount-option">
              <input
                type="radio"
                name={name}
                value={i.amount}
                checked={amount === i.amount}
                onChange={() => setAmount(i.amount)}
              />
              <span className="amount-figure">{money(i.amount)}</span>
              <span className="amount-what">{i.label}</span>
            </label>
          ))}
        </fieldset>
        <div className="pledge-range">
          <label htmlFor={name + "-range"}>
            Or slide to any amount{" "}
            <output htmlFor={name + "-range"}>{money(amount)}</output>
          </label>
          <input
            id={name + "-range"}
            type="range"
            min={5}
            max={1000}
            step={5}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <p className="pledge-effect" aria-live="polite">
          {effect(campaign, raised, amount)}
        </p>
        <button type="button" className="btn btn-flame" onClick={give}>
          Give {money(amount)} to this campaign
        </button>
      </div>
      <Board campaign={campaign} pledge={amount} />
    </div>
  );
}
