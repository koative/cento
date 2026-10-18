import { Snowflake } from "lucide-react";

/** The Ledger debit card, drawn in CSS. Frozen cards frost over. */
export function DebitCard({
  frozen = false,
  holder = "Jamie Davis",
  mask = "0082",
}: {
  frozen?: boolean;
  holder?: string;
  mask?: string;
}) {
  return (
    <div
      className="debit-card"
      data-frozen={frozen ? "" : undefined}
      role="img"
      aria-label={`Ledger debit card ending ${mask}${frozen ? ", frozen" : ""}`}
    >
      <div className="card-top">
        <strong>ledger.</strong>
        <span>Debit</span>
      </div>
      <svg
        className="card-rules"
        viewBox="0 0 200 60"
        aria-hidden
        preserveAspectRatio="none"
      >
        <path d="M0 12h200M0 26h200M0 40h200M0 52h200M0 55h200" />
      </svg>
      <span className="card-chip" aria-hidden />
      <div className="card-bottom">
        <span>
          {holder}
          <small>•••• {mask}</small>
        </span>
        <b>VISA</b>
      </div>
      {frozen && (
        <span className="card-frost">
          <Snowflake size={16} aria-hidden /> Frozen
        </span>
      )}
    </div>
  );
}
