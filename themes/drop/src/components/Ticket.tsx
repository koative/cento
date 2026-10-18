import type { Drop } from "../content";
import { products } from "../content";
import type { Entry } from "../lib/raffle";
import { dayLabel, drawAt, dropNo, timeLabel } from "../lib/time";
import { Barcode } from "./Barcode";

/** A raffle stub: the specimen on Home, the issued ticket after entry. */
export function Ticket({
  drop,
  entry,
  issued,
}: {
  drop: Drop;
  entry?: Entry;
  issued?: boolean;
}) {
  const product = entry && products.find((p) => p.id === entry.product);
  const draw = drawAt(drop);
  return (
    <div className="ticket" data-issued={issued ? "" : undefined}>
      <div className="ticket-main">
        <p className="ticket-name">{drop.name}</p>
        <dl className="ticket-data">
          <div>
            <dt>Drop</dt>
            <dd className="num">{dropNo(drop)}</dd>
          </div>
          <div>
            <dt>Draw</dt>
            <dd className="num">
              {dayLabel(draw)} {timeLabel(draw)}
            </dd>
          </div>
          {entry && product ? (
            <>
              <div>
                <dt>Piece</dt>
                <dd>{product.name}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{entry.size}</dd>
              </div>
              <div className="ticket-wide">
                <dt>Entrant</dt>
                <dd>{entry.name}</dd>
              </div>
            </>
          ) : (
            <div className="ticket-wide">
              <dt>Entries</dt>
              <dd>One per person, drawn at random</dd>
            </div>
          )}
        </dl>
      </div>
      <div className="ticket-stub">
        <Barcode value={entry?.ticket ?? drop.id} height={60} />
        <p className="num">{entry ? "No. " + entry.ticket : "Admit one"}</p>
      </div>
    </div>
  );
}
