import { money } from "../lib/format";
import { useLedger } from "../lib/store";

/** A money figure that obeys the demo's "hide balances" switch and inks negatives red. */
export function Amount({
  value,
  sign,
  cents = true,
  tone = true,
}: {
  value: number;
  sign?: boolean;
  cents?: boolean;
  tone?: boolean;
}) {
  const { hidden } = useLedger();
  const cls = [
    "num",
    tone && value < 0 ? "neg" : "",
    tone && sign && value > 0 ? "pos" : "",
  ]
    .filter(Boolean)
    .join(" ");
  if (hidden)
    return (
      <span className={cls + " masked"}>
        <span aria-hidden>$••••</span>
        <span className="sr-only">hidden</span>
      </span>
    );
  return <span className={cls}>{money(value, { cents, sign })}</span>;
}
