import { trades, type Trade } from "../content";

/** Copper for water, live-yellow for power — the two trades' colour code across the site. */
export function TradeTag({ trade }: { trade: Trade }) {
  return (
    <span className="trade-tag" data-trade={trade}>
      {trades[trade].label}
    </span>
  );
}
